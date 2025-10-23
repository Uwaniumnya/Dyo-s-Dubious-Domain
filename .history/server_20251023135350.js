const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

// Load environment variables
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';
const DB_PATH = process.env.DB_PATH || './users.db';
const FRONTEND_URL = process.env.FRONTEND_URL || `http://localhost:8080`;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

// Middleware
app.use(cors({
  origin: IS_PRODUCTION ? 
    ['https://uwaniumnya.github.io', FRONTEND_URL] : 
    ['http://localhost:8080', 'http://localhost:3000', 'https://uwaniumnya.github.io'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  exposedHeaders: ['Set-Cookie']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET || JWT_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: IS_PRODUCTION && process.env.SECURE_COOKIES === 'true', 
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: IS_PRODUCTION ? 'none' : 'lax'  // Changed from 'strict' to 'none' for mobile compatibility
  }
}));

// Serve static files from public directory
app.use(express.static('public'));

// Initialize SQLite database
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log(`Connected to SQLite database at ${DB_PATH}`);
    initializeDatabase();
    setupBackupSystem();
  }
});

// Create tables if they don't exist
function initializeDatabase() {
  db.serialize(() => {
    // Users table
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // User profiles table
    db.run(`CREATE TABLE IF NOT EXISTS user_profiles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      display_name TEXT,
      bio TEXT,
      avatar_url TEXT,
      banner_url TEXT,
      location TEXT,
      website TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )`);

    // User experiences table
    db.run(`CREATE TABLE IF NOT EXISTS user_experiences (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      substance_name TEXT NOT NULL,
      dosage TEXT,
      roa TEXT,
      date TEXT NOT NULL,
      duration INTEGER,
      rating INTEGER,
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )`);

    // User substances table (collection)
    db.run(`CREATE TABLE IF NOT EXISTS user_substances (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      substance_name TEXT NOT NULL,
      added_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id),
      UNIQUE(user_id, substance_name)
    )`);

    // User ratings table
    db.run(`CREATE TABLE IF NOT EXISTS user_ratings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      substance_name TEXT NOT NULL,
      category TEXT,
      rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 10),
      comment TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )`);

    // Friends table
    db.run(`CREATE TABLE IF NOT EXISTS friends (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      friend_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id),
      FOREIGN KEY (friend_id) REFERENCES users (id),
      UNIQUE(user_id, friend_id)
    )`);

    // Friend requests table
    db.run(`CREATE TABLE IF NOT EXISTS friend_requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sender_id INTEGER NOT NULL,
      receiver_id INTEGER NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending', 'accepted', 'declined')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (sender_id) REFERENCES users (id),
      FOREIGN KEY (receiver_id) REFERENCES users (id),
      UNIQUE(sender_id, receiver_id)
    )`);

    // User wishlist table
    db.run(`CREATE TABLE IF NOT EXISTS user_wishlist (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      substance_name TEXT NOT NULL,
      category TEXT,
      chemical_name TEXT,
      priority INTEGER NOT NULL CHECK(priority >= 1 AND priority <= 5),
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id),
      UNIQUE(user_id, substance_name)
    )`);
  });
}

// Database backup system
function setupBackupSystem() {
  const fs = require('fs');
  const path = require('path');
  
  function createBackup() {
    try {
      const backupDir = path.join(__dirname, 'backups');
      if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir);
      }
      
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupPath = path.join(backupDir, `users_backup_${timestamp}.db`);
      
      fs.copyFileSync(DB_PATH, backupPath);
      console.log(`Database backup created: ${backupPath}`);
      
      // Keep only last 10 backups
      const backups = fs.readdirSync(backupDir)
        .filter(file => file.startsWith('users_backup_'))
        .sort()
        .reverse();
      
      if (backups.length > 10) {
        for (let i = 10; i < backups.length; i++) {
          fs.unlinkSync(path.join(backupDir, backups[i]));
          console.log(`Deleted old backup: ${backups[i]}`);
        }
      }
    } catch (error) {
      console.error('Backup creation failed:', error);
    }
  }
  
  // Create backup on startup
  createBackup();
  
  // Create backup every 6 hours
  setInterval(createBackup, 6 * 60 * 60 * 1000);
}

// Authentication middleware
function authenticateToken(req, res, next) {
  const token = req.cookies.auth_token || req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
}

// Auth Routes
app.post('/api/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Create backup before important operations (if function exists)
    if (typeof db.backupBeforeOperation === 'function') {
      db.backupBeforeOperation();
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    db.run(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, `${username}@local.app`, hashedPassword], // Generate a fake email for compatibility
      function(err) {
        if (err) {
          if (err.message.includes('UNIQUE constraint failed')) {
            return res.status(400).json({ error: 'Username already exists' });
          }
          return res.status(500).json({ error: 'Failed to create user' });
        }

        const userId = this.lastID;
        
        // Create default profile
        db.run(
          'INSERT INTO user_profiles (user_id, display_name) VALUES (?, ?)',
          [userId, username],
          (err) => {
            if (err) {
              console.error('Error creating profile:', err);
            }
          }
        );

        const token = jwt.sign({ userId, username }, JWT_SECRET, { expiresIn: '24h' });
        res.cookie('auth_token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        
        res.status(201).json({
          message: 'User created successfully',
          user: { id: userId, username }
        });
      }
    );
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    db.get(
      'SELECT * FROM users WHERE username = ? OR email = ?',
      [username, username],
      async (err, user) => {
        if (err) {
          return res.status(500).json({ error: 'Database error' });
        }

        if (!user) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, { expiresIn: '24h' });
        res.cookie('auth_token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

        res.json({
          message: 'Login successful',
          user: { id: user.id, username: user.username }
        });
      }
    );
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/logout', (req, res) => {
  res.clearCookie('auth_token');
  req.session.destroy((err) => {
    if (err) {
      console.error('Session destruction error:', err);
    }
    res.json({ message: 'Logout successful' });
  });
});

// Protected Routes
app.get('/api/profile', authenticateToken, (req, res) => {
  console.log('Profile GET request for user:', req.user.userId);
  console.log('Executing SQL:', 'SELECT u.username, u.email, p.* FROM users u LEFT JOIN user_profiles p ON u.id = p.user_id WHERE u.id = ?');
  console.log('With parameter:', [req.user.userId]);
  
  db.get(
    `SELECT u.username, u.email, p.* 
     FROM users u 
     LEFT JOIN user_profiles p ON u.id = p.user_id 
     WHERE u.id = ?`,
    [req.user.userId],
    (err, profile) => {
      if (err) {
        console.error('Profile retrieval error:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      console.log('Profile retrieved for user', req.user.userId, ':', {
        username: profile?.username,
        display_name: profile?.display_name,
        bio: profile?.bio ? profile.bio.substring(0, 50) + '...' : undefined,
        avatar_url: profile?.avatar_url ? 'Image data present (' + profile.avatar_url.length + ' chars)' : null,
        banner_url: profile?.banner_url ? 'Image data present (' + profile.banner_url.length + ' chars)' : null
      });
      res.json(profile || {});
    }
  );
});

app.put('/api/profile', authenticateToken, (req, res) => {
  console.log('Profile update request received from user:', req.user.userId);
  console.log('Request body keys:', Object.keys(req.body));
  console.log('Profile data received:', {
    display_name: req.body.display_name,
    bio: req.body.bio ? req.body.bio.substring(0, 50) + '...' : undefined,
    profilePicture: req.body.profilePicture ? 'Image data present (' + req.body.profilePicture.length + ' chars)' : undefined,
    bannerImage: req.body.bannerImage ? 'Image data present (' + req.body.bannerImage.length + ' chars)' : undefined
  });
  
  const { display_name, bio, location, website, profilePicture, bannerImage, avatar_url, banner_url, username } = req.body;
  
  // Use username as display_name if display_name is not provided
  const finalDisplayName = display_name || username;
  
  // First get current profile to preserve existing images
  db.get(
    'SELECT avatar_url, banner_url FROM user_profiles WHERE user_id = ?',
    [req.user.userId],
    (err, currentProfile) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to get current profile' });
      }
      
      // Use new image if provided, otherwise keep existing
      const newAvatarUrl = profilePicture || avatar_url || (currentProfile ? currentProfile.avatar_url : null);
      const newBannerUrl = bannerImage || banner_url || (currentProfile ? currentProfile.banner_url : null);
      
      console.log('Updating profile with:', {
        display_name: finalDisplayName,
        bio: bio,
        avatar_url: newAvatarUrl ? 'Image data present (' + newAvatarUrl.length + ' chars)' : null,
        banner_url: newBannerUrl ? 'Image data present (' + newBannerUrl.length + ' chars)' : null
      });
      
      console.log('Executing SQL:', 'INSERT OR REPLACE INTO user_profiles (user_id, display_name, bio, location, website, avatar_url, banner_url, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)');
      console.log('With parameters:', [req.user.userId, finalDisplayName, bio, location, website, newAvatarUrl ? 'IMAGE_DATA' : null, newBannerUrl ? 'IMAGE_DATA' : null]);
      
      db.run(
        `INSERT OR REPLACE INTO user_profiles 
         (user_id, display_name, bio, location, website, avatar_url, banner_url, updated_at) 
         VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
        [req.user.userId, finalDisplayName, bio, location, website, newAvatarUrl, newBannerUrl],
        function(err) {
          if (err) {
            console.error('Database update error:', err);
            return res.status(500).json({ error: 'Failed to update profile' });
          }
          console.log('Profile updated successfully in database');
          res.json({ message: 'Profile updated successfully' });
        }
      );
    }
  );
});

// Experience Routes
app.get('/api/experiences', authenticateToken, (req, res) => {
  db.all(
    'SELECT * FROM user_experiences WHERE user_id = ? ORDER BY date DESC',
    [req.user.userId],
    (err, experiences) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(experiences || []);
    }
  );
});

app.post('/api/experiences', authenticateToken, (req, res) => {
  const { substance_name, dosage, roa, date, duration, rating, notes } = req.body;
  
  db.run(
    `INSERT INTO user_experiences (user_id, substance_name, dosage, roa, date, duration, rating, notes) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [req.user.userId, substance_name, dosage, roa, date, duration, rating, notes],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to add experience' });
      }
      res.status(201).json({ id: this.lastID, message: 'Experience added successfully' });
    }
  );
});

// Substance Collection Routes
app.get('/api/substances', authenticateToken, (req, res) => {
  db.all(
    'SELECT * FROM user_substances WHERE user_id = ? ORDER BY added_at DESC',
    [req.user.userId],
    (err, substances) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(substances || []);
    }
  );
});

app.post('/api/substances', authenticateToken, (req, res) => {
  const { substance_name } = req.body;
  
  db.run(
    'INSERT INTO user_substances (user_id, substance_name) VALUES (?, ?)',
    [req.user.userId, substance_name],
    function(err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(400).json({ error: 'Substance already in collection' });
        }
        return res.status(500).json({ error: 'Failed to add substance' });
      }
      res.status(201).json({ id: this.lastID, message: 'Substance added to collection' });
    }
  );
});

app.delete('/api/substances/:id', authenticateToken, (req, res) => {
  db.run(
    'DELETE FROM user_substances WHERE id = ? AND user_id = ?',
    [req.params.id, req.user.userId],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to remove substance' });
      }
      res.json({ message: 'Substance removed from collection' });
    }
  );
});

// Rating Routes
app.get('/api/ratings', authenticateToken, (req, res) => {
  db.all(
    'SELECT * FROM user_ratings WHERE user_id = ? ORDER BY created_at DESC',
    [req.user.userId],
    (err, ratings) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(ratings || []);
    }
  );
});

app.post('/api/ratings', authenticateToken, (req, res) => {
  const { substanceName, category, rating, comment } = req.body;
  
  // Validate rating
  if (!rating || rating < 1 || rating > 10) {
    return res.status(400).json({ error: 'Rating must be between 1 and 10' });
  }
  
  // Validate comment length (30 words max)
  if (comment) {
    const wordCount = comment.trim().split(/\s+/).filter(word => word.length > 0).length;
    if (wordCount > 30) {
      return res.status(400).json({ error: 'Comment must be 30 words or less' });
    }
  }
  
  db.run(
    'INSERT INTO user_ratings (user_id, substance_name, category, rating, comment) VALUES (?, ?, ?, ?, ?)',
    [req.user.userId, substanceName, category || null, rating, comment || null],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to add rating' });
      }
      res.status(201).json({ id: this.lastID, message: 'Rating added successfully' });
    }
  );
});

app.delete('/api/ratings/:id', authenticateToken, (req, res) => {
  db.run(
    'DELETE FROM user_ratings WHERE id = ? AND user_id = ?',
    [req.params.id, req.user.userId],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to delete rating' });
      }
      res.json({ message: 'Rating deleted successfully' });
    }
  );
});

// Wishlist Routes

// Get user's wishlist
app.get('/api/wishlist', authenticateToken, (req, res) => {
  db.all(
    'SELECT * FROM user_wishlist WHERE user_id = ? ORDER BY priority DESC, created_at DESC',
    [req.user.userId],
    (err, wishlist) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(wishlist || []);
    }
  );
});

// Add substance to wishlist
app.post('/api/wishlist', authenticateToken, (req, res) => {
  const { substanceName, category, chemicalName, priority, notes } = req.body;
  
  // Validate required fields
  if (!substanceName || !priority) {
    return res.status(400).json({ error: 'Substance name and priority are required' });
  }
  
  // Validate priority
  if (priority < 1 || priority > 5) {
    return res.status(400).json({ error: 'Priority must be between 1 and 5' });
  }
  
  db.run(
    'INSERT INTO user_wishlist (user_id, substance_name, category, chemical_name, priority, notes) VALUES (?, ?, ?, ?, ?, ?)',
    [req.user.userId, substanceName, category || null, chemicalName || null, priority, notes || null],
    function(err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(400).json({ error: 'Substance already in wishlist' });
        }
        return res.status(500).json({ error: 'Failed to add to wishlist' });
      }
      res.status(201).json({ id: this.lastID, message: 'Added to wishlist successfully' });
    }
  );
});

// Update wishlist item priority or notes
app.put('/api/wishlist/:id', authenticateToken, (req, res) => {
  const { priority, notes } = req.body;
  
  // Validate priority if provided
  if (priority !== undefined && (priority < 1 || priority > 5)) {
    return res.status(400).json({ error: 'Priority must be between 1 and 5' });
  }
  
  // Build update query dynamically
  const updates = [];
  const values = [];
  
  if (priority !== undefined) {
    updates.push('priority = ?');
    values.push(priority);
  }
  
  if (notes !== undefined) {
    updates.push('notes = ?');
    values.push(notes);
  }
  
  if (updates.length === 0) {
    return res.status(400).json({ error: 'No valid fields to update' });
  }
  
  updates.push('updated_at = CURRENT_TIMESTAMP');
  values.push(req.params.id, req.user.userId);
  
  db.run(
    `UPDATE user_wishlist SET ${updates.join(', ')} WHERE id = ? AND user_id = ?`,
    values,
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to update wishlist item' });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Wishlist item not found' });
      }
      res.json({ message: 'Wishlist item updated successfully' });
    }
  );
});

// Remove substance from wishlist
app.delete('/api/wishlist/:id', authenticateToken, (req, res) => {
  db.run(
    'DELETE FROM user_wishlist WHERE id = ? AND user_id = ?',
    [req.params.id, req.user.userId],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to remove from wishlist' });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Wishlist item not found' });
      }
      res.json({ message: 'Removed from wishlist successfully' });
    }
  );
});

// Friends Routes

// Search users by username
app.get('/api/users/search', authenticateToken, (req, res) => {
  const { query } = req.query;
  
  if (!query || query.trim().length < 2) {
    return res.status(400).json({ error: 'Search query must be at least 2 characters' });
  }
  
  db.all(
    `SELECT u.id, u.username, p.display_name, p.avatar_url 
     FROM users u 
     LEFT JOIN user_profiles p ON u.id = p.user_id 
     WHERE u.username LIKE ? AND u.id != ? 
     LIMIT 20`,
    [`%${query.trim()}%`, req.user.userId],
    (err, users) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(users || []);
    }
  );
});

// Get public user profile
app.get('/api/users/:userId', authenticateToken, (req, res) => {
  const { userId } = req.params;
  
  db.get(
    `SELECT u.id, u.username, u.created_at, p.display_name, p.bio, p.avatar_url, p.banner_url 
     FROM users u 
     LEFT JOIN user_profiles p ON u.id = p.user_id 
     WHERE u.id = ?`,
    [userId],
    (err, user) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      // Get user's substance collection count and recent ratings
      db.get(
        'SELECT COUNT(*) as substance_count FROM user_substances WHERE user_id = ?',
        [userId],
        (err, substanceCount) => {
          if (err) {
            return res.status(500).json({ error: 'Database error' });
          }
          
          db.all(
            'SELECT substance_name, rating, comment, created_at FROM user_ratings WHERE user_id = ? ORDER BY created_at DESC LIMIT 10',
            [userId],
            (err, recentRatings) => {
              if (err) {
                return res.status(500).json({ error: 'Database error' });
              }
              
              // Check friendship status
              db.get(
                'SELECT * FROM friends WHERE user_id = ? AND friend_id = ?',
                [req.user.userId, userId],
                (err, friendship) => {
                  if (err) {
                    return res.status(500).json({ error: 'Database error' });
                  }
                  
                  // Check pending friend request status
                  db.get(
                    `SELECT * FROM friend_requests 
                     WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?) 
                     AND status = 'pending'`,
                    [req.user.userId, userId, userId, req.user.userId],
                    (err, pendingRequest) => {
                      if (err) {
                        return res.status(500).json({ error: 'Database error' });
                      }
                      
                      res.json({
                        ...user,
                        substance_count: substanceCount.substance_count,
                        recent_ratings: recentRatings || [],
                        is_friend: !!friendship,
                        pending_request: pendingRequest ? {
                          id: pendingRequest.id,
                          sent_by_me: pendingRequest.sender_id === req.user.userId
                        } : null
                      });
                    }
                  );
                }
              );
            }
          );
        }
      );
    }
  );
});

// Send friend request
app.post('/api/friends/request', authenticateToken, (req, res) => {
  const { userId } = req.body;
  
  if (!userId || userId === req.user.userId) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }
  
  // Check if users are already friends
  db.get(
    'SELECT * FROM friends WHERE user_id = ? AND friend_id = ?',
    [req.user.userId, userId],
    (err, existingFriendship) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      
      if (existingFriendship) {
        return res.status(400).json({ error: 'Already friends with this user' });
      }
      
      // Check if there's already a pending request
      db.get(
        `SELECT * FROM friend_requests 
         WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?) 
         AND status = 'pending'`,
        [req.user.userId, userId, userId, req.user.userId],
        (err, existingRequest) => {
          if (err) {
            return res.status(500).json({ error: 'Database error' });
          }
          
          if (existingRequest) {
            return res.status(400).json({ error: 'Friend request already exists' });
          }
          
          // Create friend request
          db.run(
            'INSERT INTO friend_requests (sender_id, receiver_id) VALUES (?, ?)',
            [req.user.userId, userId],
            function(err) {
              if (err) {
                return res.status(500).json({ error: 'Failed to send friend request' });
              }
              
              res.status(201).json({ message: 'Friend request sent successfully' });
            }
          );
        }
      );
    }
  );
});

// Get friend requests (incoming)
app.get('/api/friends/requests', authenticateToken, (req, res) => {
  db.all(
    `SELECT fr.id, fr.sender_id, fr.created_at, u.username, p.display_name, p.avatar_url
     FROM friend_requests fr
     JOIN users u ON fr.sender_id = u.id
     LEFT JOIN user_profiles p ON u.id = p.user_id
     WHERE fr.receiver_id = ? AND fr.status = 'pending'
     ORDER BY fr.created_at DESC`,
    [req.user.userId],
    (err, requests) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(requests || []);
    }
  );
});

// Accept/decline friend request
app.put('/api/friends/requests/:requestId', authenticateToken, (req, res) => {
  const { requestId } = req.params;
  const { action } = req.body; // 'accept' or 'decline'
  
  if (!['accept', 'decline'].includes(action)) {
    return res.status(400).json({ error: 'Invalid action' });
  }
  
  // Get the friend request
  db.get(
    'SELECT * FROM friend_requests WHERE id = ? AND receiver_id = ? AND status = \'pending\'',
    [requestId, req.user.userId],
    (err, request) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      
      if (!request) {
        return res.status(404).json({ error: 'Friend request not found' });
      }
      
      if (action === 'accept') {
        // Create friendship (bidirectional)
        db.serialize(() => {
          db.run('BEGIN TRANSACTION');
          
          // Add friendship for both users
          db.run(
            'INSERT INTO friends (user_id, friend_id) VALUES (?, ?)',
            [req.user.userId, request.sender_id]
          );
          
          db.run(
            'INSERT INTO friends (user_id, friend_id) VALUES (?, ?)',
            [request.sender_id, req.user.userId]
          );
          
          // Update request status
          db.run(
            'UPDATE friend_requests SET status = \'accepted\', updated_at = CURRENT_TIMESTAMP WHERE id = ?',
            [requestId],
            function(err) {
              if (err) {
                db.run('ROLLBACK');
                return res.status(500).json({ error: 'Failed to accept friend request' });
              }
              
              db.run('COMMIT');
              res.json({ message: 'Friend request accepted' });
            }
          );
        });
      } else {
        // Decline request
        db.run(
          'UPDATE friend_requests SET status = \'declined\', updated_at = CURRENT_TIMESTAMP WHERE id = ?',
          [requestId],
          function(err) {
            if (err) {
              return res.status(500).json({ error: 'Failed to decline friend request' });
            }
            
            res.json({ message: 'Friend request declined' });
          }
        );
      }
    }
  );
});

// Get friends list
app.get('/api/friends', authenticateToken, (req, res) => {
  db.all(
    `SELECT f.friend_id as id, f.created_at as friendship_date, u.username, 
            p.display_name, p.avatar_url, p.bio
     FROM friends f
     JOIN users u ON f.friend_id = u.id
     LEFT JOIN user_profiles p ON u.id = p.user_id
     WHERE f.user_id = ?
     ORDER BY f.created_at DESC`,
    [req.user.userId],
    (err, friends) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(friends || []);
    }
  );
});

// Remove friend
app.delete('/api/friends/:friendId', authenticateToken, (req, res) => {
  const { friendId } = req.params;
  
  // Remove friendship (bidirectional)
  db.serialize(() => {
    db.run('BEGIN TRANSACTION');
    
    db.run(
      'DELETE FROM friends WHERE user_id = ? AND friend_id = ?',
      [req.user.userId, friendId]
    );
    
    db.run(
      'DELETE FROM friends WHERE user_id = ? AND friend_id = ?',
      [friendId, req.user.userId],
      function(err) {
        if (err) {
          db.run('ROLLBACK');
          return res.status(500).json({ error: 'Failed to remove friend' });
        }
        
        db.run('COMMIT');
        res.json({ message: 'Friend removed successfully' });
      }
    );
  });
});

// Check authentication status
app.get('/api/auth/check', authenticateToken, (req, res) => {
  res.json({ authenticated: true, user: req.user });
});

// Static files and fallback routing
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login', 'index.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register', 'index.html'));
});

app.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'profile', 'index.html'));
});

app.get('/user/:userId', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'profile', 'index.html'));
});

// Debug endpoint to check user existence (temporary)
app.get('/debug/user/:username', (req, res) => {
  const { username } = req.params;
  db.get(
    'SELECT id, username, email, created_at FROM users WHERE username = ? OR email = ?',
    [username, username],
    (err, user) => {
      if (err) {
        return res.status(500).json({ error: 'Database error', details: err.message });
      }
      if (!user) {
        return res.json({ exists: false, message: 'User not found' });
      }
      res.json({ 
        exists: true, 
        user: { 
          id: user.id, 
          username: user.username, 
          email: user.email, 
          created_at: user.created_at 
        } 
      });
    }
  );
});

// Debug endpoint to test password (temporary)
app.post('/debug/test-password', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    db.get(
      'SELECT id, username, password FROM users WHERE username = ? OR email = ?',
      [username, username],
      async (err, user) => {
        if (err) {
          return res.status(500).json({ error: 'Database error', details: err.message });
        }
        
        if (!user) {
          return res.json({ 
            userExists: false, 
            message: 'User not found in database' 
          });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        res.json({
          userExists: true,
          userId: user.id,
          username: user.username,
          passwordMatch: validPassword,
          hashPreview: user.password.substring(0, 20) + '...'
        });
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// Database status and integrity check endpoint
app.get('/debug/database-status', (req, res) => {
  const fs = require('fs');
  
  try {
    // Check database file info
    const dbStats = fs.statSync(DB_PATH);
    
    // Count users
    db.get('SELECT COUNT(*) as user_count FROM users', (err, userCount) => {
      if (err) {
        return res.status(500).json({ error: 'Database query error', details: err.message });
      }
      
      // Check for backups
      const backupDir = path.join(__dirname, 'backups');
      let backupInfo = { exists: false, count: 0, latest: null };
      
      if (fs.existsSync(backupDir)) {
        const backups = fs.readdirSync(backupDir)
          .filter(file => file.startsWith('users_backup_'))
          .sort()
          .reverse();
        
        backupInfo = {
          exists: true,
          count: backups.length,
          latest: backups[0] || null
        };
      }
      
      res.json({
        database: {
          path: DB_PATH,
          size: dbStats.size,
          modified: dbStats.mtime,
          user_count: userCount.user_count
        },
        backups: backupInfo,
        server_uptime: process.uptime(),
        timestamp: new Date().toISOString()
      });
    });
  } catch (error) {
    res.status(500).json({ error: 'Database status check failed', details: error.message });
  }
});

// Health check endpoint for Nginx
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    service: 'cccc-backend'
  });
});

// Start server
app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Frontend URL: ${FRONTEND_URL}`);
});

module.exports = app;