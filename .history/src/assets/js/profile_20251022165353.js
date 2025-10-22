// Profile management system for Dyo's Domain with Backend Authentication
console.log('Profile.js loaded!');

// Helper function to get the correct site URL for redirects
function getSitePath(path) {
  const basePath = window.SITE_BASE_PATH || '/';
  // Remove leading slash from path if basePath already has one
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  return basePath + cleanPath;
}

// Helper function to get the correct backend URL
function getBackendUrl() {
  // If running locally, use local backend
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://127.0.0.1:3000';
  }
  
  // For GitHub Pages, use your production backend
  return 'https://62.169.21.243';
}

class ProfileManager {
  constructor() {
    this.currentUser = null;
    this.profileData = null;
    this.substances = [];
    this.ratings = [];
    this.wishlist = [];
    
    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.checkAuthentication();
    });
  }

  // Helper method to get current profile data
  getProfile() {
    return this.profileData || {};
  }

  // Authentication check
  async checkAuthentication() {
    try {
      // Check if we're viewing a specific user profile
      const path = window.location.pathname;
      const userIdMatch = path.match(/^\/user\/(\d+)$/);
      
      if (userIdMatch) {
        // This is handled by the friends manager
        return;
      }
      
      const response = await fetch(`${getBackendUrl()}/api/auth/check`, {
        credentials: 'include'
      });
      
      if (response.ok) {
        const result = await response.json();
        this.currentUser = result.user;
        
        // Load all data in sequence
        await this.loadSubstanceSuggestions(); // Load available substances first
        await this.loadProfile();
        await this.loadRatings();
        await this.loadSubstances(); // This now depends on availableSubstances being loaded
        
        // Update UI after all data is loaded
        this.updateProfileDisplay();
        this.showProfileContent();
        this.setupEventListeners();
      } else {
        this.redirectToLogin();
      }
    } catch (error) {
      console.error('Authentication check failed:', error);
      this.redirectToLogin();
    }
  }

  redirectToLogin() {
    window.location.href = getSitePath('login/');
  }

  showProfileContent() {
    document.getElementById('auth-check').style.display = 'none';
    document.getElementById('profile-content').style.display = 'block';
  }

  // Profile data management
  async loadProfile() {
    try {
      const response = await fetch(`${getBackendUrl()}/api/profile`, {
        credentials: 'include'
      });
      
      if (response.ok) {
        this.profileData = await response.json();
        this.displayProfile();
        await this.loadRatings();
        await this.loadSubstances();
        await this.loadWishlist();
      } else {
        console.error('Failed to load profile');
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  }

  async saveProfile(profileData) {
    try {
      console.log('Saving profile data:', {
        profilePicture: profileData.profilePicture ? profileData.profilePicture.substring(0, 50) + '...' : 'none',
        bannerImage: profileData.bannerImage ? profileData.bannerImage.substring(0, 50) + '...' : 'none',
        avatar_url: profileData.avatar_url ? profileData.avatar_url.substring(0, 50) + '...' : 'none',
        banner_url: profileData.banner_url ? profileData.banner_url.substring(0, 50) + '...' : 'none'
      });
      
      const response = await fetch(`${getBackendUrl()}/api/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
        credentials: 'include'
      });

      if (response.ok) {
        await this.loadProfile(); // Reload to get updated data
        return true;
      } else {
        const error = await response.json();
        console.error('Failed to save profile:', error);
        return false;
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      return false;
    }
  }

  // Rating management
  async loadRatings() {
    try {
      const response = await fetch(`${getBackendUrl()}/api/ratings`, {
        credentials: 'include'
      });
      
      if (response.ok) {
        this.ratings = await response.json();
        console.log('Loaded ratings:', this.ratings);
      } else {
        console.error('Failed to load ratings');
        this.ratings = [];
      }
    } catch (error) {
      console.error('Error loading ratings:', error);
      this.ratings = [];
    }
  }

  async addRating(ratingData) {
    try {
      const response = await fetch(`${getBackendUrl()}/api/ratings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ratingData),
        credentials: 'include'
      });

      if (response.ok) {
        await this.loadRatings(); // Reload ratings
        return true;
      } else {
        const error = await response.json();
        console.error('Failed to add rating:', error);
        return false;
      }
    } catch (error) {
      console.error('Error adding rating:', error);
      return false;
    }
  }

  // Wishlist management
  async loadWishlist() {
    try {
      const response = await fetch(`${getBackendUrl()}/api/wishlist`, {
        credentials: 'include'
      });
      
      if (response.ok) {
        this.wishlist = await response.json();
        this.updateWishlistDisplay(this.wishlist);
      } else {
        console.error('Failed to load wishlist');
        this.wishlist = [];
      }
    } catch (error) {
      console.error('Error loading wishlist:', error);
      this.wishlist = [];
    }
  }

  async addToWishlist(wishlistData) {
    try {
      const response = await fetch(`${getBackendUrl()}/api/wishlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(wishlistData)
      });

      if (response.ok) {
        await this.loadWishlist(); // Reload wishlist
        return true;
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to add to wishlist');
        return false;
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      return false;
    }
  }

  async updateWishlistItem(itemId, updates) {
    try {
      const response = await fetch(`${getBackendUrl()}/api/wishlist/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(updates)
      });

      if (response.ok) {
        await this.loadWishlist(); // Reload wishlist
        return true;
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to update wishlist item');
        return false;
      }
    } catch (error) {
      console.error('Error updating wishlist item:', error);
      return false;
    }
  }

  async removeFromWishlist(itemId) {
    try {
      const response = await fetch(`${getBackendUrl()}/api/wishlist/${itemId}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (response.ok) {
        await this.loadWishlist(); // Reload wishlist
        return true;
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to remove from wishlist');
        return false;
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      return false;
    }
  }

  // Substance collection management
  async loadSubstances() {
    try {
      const response = await fetch(`${getBackendUrl()}/api/substances`, {
        credentials: 'include'
      });
      
      if (response.ok) {
        const dbSubstances = await response.json();
        
        // Transform database substances to match frontend expectations
        this.substances = dbSubstances.map(dbSubstance => {
          // Find matching substance from available substances to get category and chemical name
          const substanceInfo = this.availableSubstances ? 
            this.availableSubstances.find(s => s.title.toLowerCase() === dbSubstance.substance_name.toLowerCase()) : null;
          
          return {
            id: dbSubstance.id,
            name: dbSubstance.substance_name,
            category: substanceInfo ? substanceInfo.category : 'Uncategorized',
            chemicalName: substanceInfo ? substanceInfo.chemicalName : '',
            notes: '', // Not stored in database yet
            dateAdded: dbSubstance.added_at
          };
        });
        
        this.updateSubstancesDisplay(this.substances);
        this.updateStats(this.substances);
      } else {
        console.error('Failed to load substances');
        this.substances = [];
        this.updateSubstancesDisplay(this.substances);
        this.updateStats(this.substances);
      }
    } catch (error) {
      console.error('Error loading substances:', error);
      this.substances = [];
      this.updateSubstancesDisplay(this.substances);
      this.updateStats(this.substances);
    }
  }

  async addSubstance(substanceName) {
    try {
      const response = await fetch(`${getBackendUrl()}/api/substances`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ substance_name: substanceName }),
        credentials: 'include'
      });

      if (response.ok) {
        await this.loadSubstances(); // Reload substances
        return true;
      } else {
        const error = await response.json();
        console.error('Failed to add substance:', error);
        alert(error.error || 'Failed to add substance');
        return false;
      }
    } catch (error) {
      console.error('Error adding substance:', error);
      return false;
    }
  }

  async removeSubstance(substanceId) {
    try {
      const response = await fetch(`${getBackendUrl()}/api/substances/${substanceId}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (response.ok) {
        await this.loadSubstances(); // Reload substances
        return true;
      } else {
        const error = await response.json();
        console.error('Failed to remove substance:', error);
        return false;
      }
    } catch (error) {
      console.error('Error removing substance:', error);
      return false;
    }
  }

  // Display methods
  displayProfile() {
    if (!this.profileData) return;

    // Update profile display elements
    const usernameElement = document.getElementById('profile-username');
    const bioElement = document.getElementById('profile-bio');

    if (usernameElement) {
      usernameElement.textContent = this.profileData.display_name || this.profileData.username || 'Anonymous';
    }
    
    if (bioElement) {
      bioElement.textContent = this.profileData.bio || 'No bio set yet.';
    }

    // Update other profile elements...
    this.updateProfileStats();
  }

  updateProfileStats() {
    const ratingCount = this.ratings ? this.ratings.length : 0;
    const substanceCount = this.substances ? this.substances.length : 0;
    const joinDate = this.profileData?.created_at ? new Date(this.profileData.created_at).toLocaleDateString() : 'Unknown';

    // Update stats in the UI
    const ratingCountEl = document.getElementById('experience-count');
    const subCountEl = document.getElementById('substance-count');
    const joinDateEl = document.getElementById('join-date');
    
    if (ratingCountEl) ratingCountEl.textContent = ratingCount;
    if (subCountEl) subCountEl.textContent = substanceCount;
    if (joinDateEl) joinDateEl.textContent = joinDate;
  }

  // Logout functionality
  async logout() {
    try {
      const response = await fetch(`${getBackendUrl()}/api/logout`, {
        method: 'POST',
        credentials: 'include'
      });
      
      if (response.ok) {
        sessionStorage.removeItem('user');
        window.location.href = getSitePath('login/');
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Force redirect anyway
      window.location.href = getSitePath('login/');
    }
  }

  // UI Updates
  updateProfileDisplay() {
    const profile = this.profileData;
    if (!profile) return;
    
    // Update username and bio
    const usernameEl = document.getElementById('profile-username');
    const bioEl = document.getElementById('profile-bio');
    
    if (usernameEl) usernameEl.textContent = profile.username || this.currentUser?.username || 'User';
    if (bioEl) bioEl.textContent = profile.bio || 'No bio set yet.';

    // Update profile picture (check both property names for compatibility)
    this.updateProfilePicture(profile.profilePicture || profile.avatar_url);
    
    // Update banner (check both property names for compatibility)
    this.updateBanner(profile.bannerImage || profile.banner_url);
    
    // Update substances
    this.updateSubstancesDisplay(this.substances);
    
    // Update stats
    this.updateStats(this.substances);
    
    // Update activity timeline
    this.updateActivityTimeline(this.substances);
  }

  updateProfilePicture(imageData) {
    const avatarEl = document.getElementById('profile-avatar');
    if (!avatarEl) return;

    if (imageData) {
      avatarEl.innerHTML = `<img src="${imageData}" alt="Profile Picture" class="avatar-img">`;
    } else {
      avatarEl.innerHTML = `
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="default-avatar">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      `;
    }
  }

  updateBanner(imageData) {
    const bannerEl = document.getElementById('profile-banner');
    if (!bannerEl) return;

    if (imageData) {
      bannerEl.style.backgroundImage = `url("${imageData}")`;
      bannerEl.style.backgroundSize = 'cover';
      bannerEl.style.backgroundPosition = 'center';
    } else {
      bannerEl.style.backgroundImage = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
  }

  updateSubstancesDisplay(substances) {
    const gridEl = document.getElementById('substances-grid');
    if (!gridEl) return;

    const substancesList = substances || [];

    if (substancesList.length === 0) {
      gridEl.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🌿</div>
          <h3>No substances logged yet</h3>
          <p>Start building your collection by adding substances you've researched or experienced.</p>
          <button class="add-substance-btn">Add Your First Substance</button>
        </div>
      `;
      
      // Re-attach event listener for the new button
      const addBtn = gridEl.querySelector('.add-substance-btn');
      if (addBtn) {
        addBtn.addEventListener('click', () => this.openAddSubstanceModal());
      }
      return;
    }

    const substanceCards = substancesList.map(substance => this.createSubstanceCard(substance)).join('');
    gridEl.innerHTML = substanceCards;
    
    // Add event listeners to remove buttons
    gridEl.querySelectorAll('.remove-substance').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const substanceId = e.target.closest('.substance-card').dataset.substanceId;
        this.removeSubstance(substanceId);
      });
    });

    // Add event listeners to rating buttons
    gridEl.querySelectorAll('.rate-substance-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const substanceName = e.target.dataset.substanceName;
        const category = e.target.dataset.category;
        const chemicalName = e.target.dataset.chemical;
        this.openRatingModal(substanceName, category, chemicalName);
      });
    });

    gridEl.querySelectorAll('.view-ratings-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const substanceName = e.target.dataset.substanceName;
        this.openViewRatingsModal(substanceName);
      });
    });
  }

  createSubstanceCard(substance) {
    const dateAdded = new Date(substance.dateAdded).toLocaleDateString();
    const categoryColor = this.getCategoryColor(substance.category);
    
    // Get ratings for this substance
    const substanceRatings = (this.ratings || []).filter(rating => 
      rating && rating.substance_name && rating.substance_name.toLowerCase() === substance.name.toLowerCase()
    );
    
    return `
      <div class="substance-card compact" data-substance-id="${substance.id}" data-category="${substance.category}">
        <div class="substance-header">
          <div class="substance-info">
            <h3 class="substance-name">${substance.name}</h3>
            <div class="substance-category" style="background-color: ${categoryColor}">
              ${substance.category || 'Uncategorized'}
            </div>
            ${substance.chemicalName ? `<span class="chemical-name">${substance.chemicalName}</span>` : ''}
          </div>
          <div class="substance-meta">
            <button class="remove-substance" title="Remove from profile">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
        <div class="substance-bottom">
          ${substance.notes ? `<p class="substance-notes">${substance.notes}</p>` : ''}
          <div class="substance-actions">
            <button class="rate-substance-btn compact" data-substance-name="${substance.name}" data-category="${substance.category}" data-chemical="${substance.chemicalName || ''}">
              ⭐ Rate
            </button>
            ${substanceRatings.length > 0 ? `
              <button class="view-ratings-btn compact" data-substance-name="${substance.name}">
                📊 ${substanceRatings.length}
              </button>
            ` : ''}
            <span class="date-added">Added ${dateAdded}</span>
          </div>
        </div>
      </div>
    `;
  }

  getCategoryColor(category) {
    const colors = {
      'Stimulants': '#ff6b6b',
      'Psychedelics': '#4ecdc4',
      'Depressants': '#45b7d1',
      'Empathogens': '#f9ca24',
      'Dissociatives': '#6c5ce7',
      'Cannabinoids': '#a8e6cf',
      'Nootropics': '#fd79a8',
      'Research Chemicals': '#fdcb6e'
    };
    return colors[category] || '#95a5a6';
  }

  generateStars(rating, maxStars = 5) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);
    
    let stars = '';
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars += '<span class="star full">★</span>';
    }
    
    // Half star
    if (hasHalfStar) {
      stars += '<span class="star half">★</span>';
    }
    
    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars += '<span class="star empty">☆</span>';
    }
    
    return stars;
  }

  updateStats(substances) {
    const profile = this.profileData;
    const ratings = this.ratings || [];
    const substancesList = substances || [];
    
    const substancesCount = document.getElementById('substances-count');
    const categoriesCount = document.getElementById('categories-count');
    const recentCount = document.getElementById('recent-count');
    const avgRatingEl = document.getElementById('avg-rating');

    if (substancesCount) {
      substancesCount.textContent = substancesList.length;
    }

    if (categoriesCount) {
      const uniqueCategories = new Set(substancesList.map(s => s.category).filter(Boolean));
      categoriesCount.textContent = uniqueCategories.size;
    }

    if (recentCount) {
      const oneMonthAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
      const recentRatings = ratings.filter(rating => new Date(rating.created_at).getTime() > oneMonthAgo);
      recentCount.textContent = recentRatings.length;
    }

    // Add average rating stat
    if (avgRatingEl && ratings.length > 0) {
      const totalRating = ratings.reduce((sum, rating) => sum + (rating.rating || 0), 0);
      const avgRating = totalRating / ratings.length;
      avgRatingEl.innerHTML = `${this.generateStars(avgRating, 10)} <span class="rating-text">${avgRating.toFixed(1)}/10</span>`;
    } else if (avgRatingEl) {
      avgRatingEl.innerHTML = '<span class="text-muted">No ratings yet</span>';
    }

    // Update stat labels to reflect rating tracking
    const recentLabel = document.querySelector('#recent-count + .stat-label');
    if (recentLabel) {
      recentLabel.textContent = 'Ratings This Month';
    }

    // Update rating analytics
    this.updateRatingAnalytics(ratings);
  }

  updateRatingAnalytics(ratings) {
    // Update rating timeline chart
    this.updateRatingTimeline(ratings);
    
    // Update top-rated substances
    this.updateTopRatedSubstances(ratings);
    
    // Update recent activity with ratings
    this.updateRecentRatingActivity(ratings);
  }

  updateRatingTimeline(ratings) {
    const timelineEl = document.getElementById('experience-timeline');
    if (!timelineEl) return;

    if (ratings.length === 0) {
      timelineEl.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🧬</div>
          <h4>No exploration data</h4>
          <p>Your substance journey map will appear here once you rate some substances.</p>
        </div>
      `;
      return;
    }

    // Create substance journey map
    this.createSubstanceJourneyMap(ratings, timelineEl);
  }

  createSubstanceJourneyMap(ratings, container) {
    // Group ratings by category and calculate stats
    const categoryData = {};
    const categoryColors = {
      'Stimulants': { color: '#ff6b6b', emoji: '⚡', shape: 'triangle' },
      'Psychedelics': { color: '#4ecdc4', emoji: '🌈', shape: 'star' },
      'Depressants': { color: '#45b7d1', emoji: '🌙', shape: 'circle' },
      'Empathogens': { color: '#f9ca24', emoji: '💝', shape: 'heart' },
      'Dissociatives': { color: '#6c5ce7', emoji: '🌀', shape: 'diamond' },
      'Cannabinoids': { color: '#a8e6cf', emoji: '🍃', shape: 'leaf' },
      'Nootropics': { color: '#fd79a8', emoji: '🧠', shape: 'hexagon' },
      'Research Chemicals': { color: '#fdcb6e', emoji: '🧪', shape: 'square' }
    };

    ratings.forEach(rating => {
      const category = this.getCategoryFromSubstance(rating.substance_name) || 'Research Chemicals';
      if (!categoryData[category]) {
        categoryData[category] = {
          ratings: [],
          totalRating: 0,
          avgRating: 0,
          substances: new Set()
        };
      }
      
      categoryData[category].ratings.push(rating);
      categoryData[category].totalRating += rating.rating || 0;
      categoryData[category].substances.add(rating.substance_name);
    });

    // Calculate averages and sort by exploration level
    const explorationMap = Object.entries(categoryData)
      .map(([category, data]) => ({
        category,
        ...data,
        avgRating: data.totalRating / data.ratings.length,
        substanceCount: data.substances.size,
        explorationLevel: data.ratings.length * data.substances.size, // More ratings + more substances = higher exploration
        ...categoryColors[category]
      }))
      .sort((a, b) => b.explorationLevel - a.explorationLevel);

    const maxExploration = Math.max(...explorationMap.map(cat => cat.explorationLevel), 1);

    container.innerHTML = `
      <h4>🧬 Substance Journey Map</h4>
      <div class="journey-map-container">
        <div class="journey-map">
          ${explorationMap.map((cat, index) => this.createJourneyNode(cat, index, maxExploration)).join('')}
          ${this.createJourneyConnections(explorationMap)}
        </div>
        <div class="journey-legend">
          <div class="legend-item">
            <div class="legend-symbol large-node"></div>
            <span>High Exploration</span>
          </div>
          <div class="legend-item">
            <div class="legend-symbol medium-node"></div>
            <span>Moderate Exploration</span>
          </div>
          <div class="legend-item">
            <div class="legend-symbol small-node"></div>
            <span>Light Exploration</span>
          </div>
        </div>
      </div>
    `;

    // Add hover interactions
    this.setupJourneyMapInteractions(container, explorationMap);
  }

  createJourneyNode(categoryData, index, maxExploration) {
    const explorationRatio = categoryData.explorationLevel / maxExploration;
    const nodeSize = Math.max(explorationRatio * 50 + 70, 80); // Size range: 80-120px
    
    // Better distribution across the full container
    const totalNodes = Math.min(8, Object.keys(categoryData).length); // Max 8 categories
    const positions = this.calculateOptimalPositions(totalNodes, index);
    
    return `
      <div class="journey-node circle" 
           data-category="${categoryData.category}"
           style="
             left: ${positions.x}%; 
             top: ${positions.y}%; 
             width: ${nodeSize}px; 
             height: ${nodeSize}px;
             background: linear-gradient(135deg, ${categoryData.color}, ${categoryData.color}dd);
             border: 3px solid ${categoryData.color};
             transform: translate(-50%, -50%);
           ">
        <div class="node-emoji">${categoryData.emoji}</div>
        <div class="node-pulse" style="border-color: ${categoryData.color};"></div>
        <div class="node-tooltip">
          <strong>${categoryData.category}</strong><br>
          ${categoryData.substanceCount} substances<br>
          ${categoryData.ratings.length} ratings<br>
          ⭐ ${categoryData.avgRating.toFixed(1)}/10 avg
        </div>
      </div>
    `;
  }

  calculateOptimalPositions(totalNodes, index) {
    // Predefined positions moved significantly down to better fill container
    const positions = [
      { x: 20, y: 65 },   // Middle left
      { x: 50, y: 55 },   // Upper center
      { x: 80, y: 70 },   // Middle right
      { x: 75, y: 95 },   // Lower right
      { x: 45, y: 105 },   // Bottom center
      { x: 25, y: 100 },   // Bottom left
      { x: 15, y: 85 },   // Lower left
      { x: 60, y: 80 }    // Lower center
    ];
    
    // Return position for this index, cycling if we have more nodes than positions
    return positions[index % positions.length];
  }

  createJourneyConnections(explorationMap) {
    // Create connecting lines between highly explored categories
    let connections = '';
    const highlyExplored = explorationMap.filter(cat => cat.explorationLevel > 5);
    
    for (let i = 0; i < highlyExplored.length - 1; i++) {
      const strength = Math.min(highlyExplored[i].explorationLevel / 20, 1);
      connections += `
        <div class="journey-connection" 
             data-from="${highlyExplored[i].category}" 
             data-to="${highlyExplored[i + 1].category}"
             style="opacity: ${strength * 0.3 + 0.1};">
        </div>
      `;
    }
    
    return connections;
  }

  getCategoryFromSubstance(substanceName) {
    // Map substance names to categories (simplified)
    const categoryMap = {
      'MDMA': 'Empathogens',
      'LSD': 'Psychedelics',
      '2C-B-FLY': 'Psychedelics',
      '2C-E': 'Psychedelics',
      '2C-I': 'Psychedelics',
      '2C-T-7': 'Psychedelics',
      '3-CMC': 'Stimulants',
      '3-MMC': 'Stimulants',
      '4-CMC': 'Stimulants',
      '4-CEC': 'Stimulants',
      '4-MMC': 'Stimulants',
      'DMT': 'Psychedelics',
      'Psilocybin': 'Psychedelics',
      'Cocaine': 'Stimulants',
      'Amphetamine': 'Stimulants',
      'Methamphetamine': 'Stimulants',
      'Caffeine': 'Stimulants',
      'Hexen': 'Stimulants',
      'Carisoprodol': 'Depressants',
      'Alcohol': 'Depressants',
      'THC': 'Cannabinoids',
      'CBD': 'Cannabinoids',
      'Ketamine': 'Dissociatives',
      'DXM': 'Dissociatives',
      'PCP': 'Dissociatives',
      'Modafinil': 'Nootropics',
      'Nicotine': 'Stimulants',
      'Alkyl Nitrites': 'Inhalant',
      'Anabolic Steroids': 'Stimulants',
      'Aerosols': 'Depressants',
      'Chlorodiazepoxide': 'Depressants',
      'Triazolam': 'Depressants',
      'Phenazepam': 'Depressants',
      'Rohypnol': 'Depressants',
      'Quetiapine': 'Depressants',
      'PMMA/PMA': 'Stimulants',
      'Synthetic Cathinones': 'Stimulants',
      'Tianeptine': 'Nootropics',
      'U-47700': 'Depressants',
      'Xylazine': 'Depressants',
      'Lean': 'Depressants'
    };
    
    // Try exact match first
    if (categoryMap[substanceName]) {
      return categoryMap[substanceName];
    }
    
    // Try partial matches
    const name = substanceName.toLowerCase();
    if (name.includes('lsd') || name.includes('dmt') || name.includes('psilocybin') || name.includes('mescaline')) {
      return 'Psychedelics';
    }
    if (name.includes('mdma') || name.includes('mda')) {
      return 'Empathogens';
    }
    if (name.includes('thc') || name.includes('cbd') || name.includes('cannabis')) {
      return 'Cannabinoids';
    }
    if (name.includes('ketamine') || name.includes('dxm') || name.includes('pcp')) {
      return 'Dissociatives';
    }
    if (name.includes('amphetamine') || name.includes('cocaine') || name.includes('caffeine') || name.includes('pmma') || name.includes('pma') || name.includes('steroid') || name.includes('anabolic') || name.includes('testosterone') || name.includes('roid') || name.includes('juice') || name.includes('gear')) {
      return 'Stimulants';
    }
    if (name.includes('alcohol') || name.includes('benzod') || name.includes('xanax') || name.includes('phenazepam') || name.includes('rohypnol') || name.includes('flunitrazepam') || name.includes('quetiapine') || name.includes('seroquel') || name.includes('diazepam') || name.includes('clonazepam') || name.includes('chlorodiazepoxide') || name.includes('librium') || name.includes('triazolam') || name.includes('halcion') || name.includes('aerosol') || name.includes('inhalant') || name.includes('huffing') || name.includes('duster') || name.includes('lean') || name.includes('purple drank') || name.includes('sizzurp') || name.includes('dirty sprite') || name.includes('purple lean') || name.includes('syrup') || name.includes('drank') || name.includes('barre') || name.includes('wock') || name.includes('tris') || name.includes('mud') || name.includes('oil') || name.includes('sippin') || name.includes('actavis') || name.includes('codeine') || name.includes('promethazine')) {
      return 'Depressants';
    }
    if (name.includes('poppers') || name.includes('nitrite') || name.includes('alkyl nitrite')) {
      return 'Inhalant';
    }
    
    return 'Research Chemicals'; // Default category
  }

  setupJourneyMapInteractions(container, explorationMap) {
    const nodes = container.querySelectorAll('.journey-node');
    
    nodes.forEach(node => {
      node.addEventListener('mouseenter', () => {
        // Highlight node and show tooltip
        node.classList.add('highlighted');
        const tooltip = node.querySelector('.node-tooltip');
        if (tooltip) {
          tooltip.style.opacity = '1';
          tooltip.style.transform = 'translateY(-10px)';
        }
        
        // Dim other nodes
        nodes.forEach(otherNode => {
          if (otherNode !== node) {
            otherNode.style.opacity = '0.3';
          }
        });
      });
      
      node.addEventListener('mouseleave', () => {
        // Remove highlights
        node.classList.remove('highlighted');
        const tooltip = node.querySelector('.node-tooltip');
        if (tooltip) {
          tooltip.style.opacity = '0';
          tooltip.style.transform = 'translateY(0)';
        }
        
        // Restore opacity
        nodes.forEach(otherNode => {
          otherNode.style.opacity = '1';
        });
      });
    });
  }

  updateTopRatedSubstances(ratings) {
    const topRatedEl = document.getElementById('top-rated-substances');
    if (!topRatedEl) return;

    if (ratings.length === 0) {
      topRatedEl.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">⭐</div>
          <h4>No ratings yet</h4>
          <p>Your top-rated substances will appear here.</p>
        </div>
      `;
      return;
    }

    // Calculate average ratings by substance
    const substanceRatings = {};
    ratings.forEach(rating => {
      if (!substanceRatings[rating.substance_name]) {
        substanceRatings[rating.substance_name] = { total: 0, count: 0 };
      }
      substanceRatings[rating.substance_name].total += rating.rating || 0;
      substanceRatings[rating.substance_name].count += 1;
    });

    const topRated = Object.entries(substanceRatings)
      .map(([name, data]) => ({
        name,
        avgRating: data.total / data.count,
        count: data.count
      }))
      .sort((a, b) => b.avgRating - a.avgRating)
      .slice(0, 5);

    topRatedEl.innerHTML = `
      <h4>Top-Rated Substances</h4>
      <div class="top-rated-list">
        ${topRated.map((substance, index) => `
          <div class="top-rated-item">
            <span class="rank">#${index + 1}</span>
            <div class="substance-info">
              <span class="substance-name">${substance.name}</span>
              <div class="rating-info">
                <div class="stars">${this.generateStars(substance.avgRating, 10)}</div>
                <span class="rating-text">${substance.avgRating.toFixed(1)}/10 (${substance.count} ratings)</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  updateRecentRatingActivity(ratings) {
    const activityEl = document.getElementById('recent-experience-activity');
    if (!activityEl) return;

    if (ratings.length === 0) {
      activityEl.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🕐</div>
          <h4>No ratings yet</h4>
          <p>All your ratings will appear here.</p>
        </div>
      `;
      return;
    }

    // Show all ratings sorted by rating value (highest first), then by date for ties
    const allRatings = [...ratings]
      .sort((a, b) => {
        const ratingDiff = (b.rating || 0) - (a.rating || 0);
        if (ratingDiff !== 0) return ratingDiff;
        return new Date(b.created_at) - new Date(a.created_at);
      });

    // Create collapsible structure
    activityEl.innerHTML = `
      <div class="ratings-header" style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0; cursor: pointer; border-bottom: 1px solid #ddd; margin-bottom: 1rem;">
        <h4 style="margin: 0;">All Ratings (${allRatings.length})</h4>
        <span class="collapse-toggle" style="font-size: 1.2rem; transition: transform 0.2s ease;">▼</span>
      </div>
      <div class="ratings-content">
        <div class="recent-activity-list">
          ${allRatings.map(rating => {
            const date = new Date(rating.created_at);
            const timeAgo = this.getTimeAgo(date);
            return `
              <div class="activity-item">
                <div class="activity-icon">⭐</div>
                <div class="activity-content">
                  <div class="activity-title">Rated ${rating.substance_name}</div>
                  <div class="activity-details">
                    <div class="stars">${this.generateStars(rating.rating || 0, 10)}</div>
                    <span class="rating-text">${rating.rating}/10</span>
                    <span class="activity-time">${timeAgo}</span>
                  </div>
                  ${rating.comment ? `
                    <div class="activity-comment">
                      <span class="comment-text">"${rating.comment}"</span>
                    </div>
                  ` : ''}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
    
    // Add toggle function to the header
    const header = activityEl.querySelector('.ratings-header');
    if (header) {
      header.onclick = () => {
        const content = activityEl.querySelector('.ratings-content');
        const toggle = header.querySelector('.collapse-toggle');
        
        if (content.style.display === 'none') {
          content.style.display = 'block';
          toggle.style.transform = 'rotate(0deg)';
        } else {
          content.style.display = 'none';
          toggle.style.transform = 'rotate(-90deg)';
        }
      };
    }
  }

  getTimeAgo(date) {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return date.toLocaleDateString();
  }

  updateWishlistDisplay(wishlist) {
    const wishlistEl = document.getElementById('wishlist-section');
    if (!wishlistEl) return;

    const wishlistItems = wishlist || [];

    if (wishlistItems.length === 0) {
      wishlistEl.innerHTML = `
        <div class="wishlist-header">
          <h4>🌟 Substance Wishlist</h4>
          <button class="add-to-wishlist-btn" id="add-to-wishlist-btn">+ Add to Wishlist</button>
        </div>
        <div class="empty-state">
          <div class="empty-icon">✨</div>
          <h3>Your wishlist is empty</h3>
          <p>Add substances you're curious about and prioritize your exploration journey.</p>
          <button class="add-to-wishlist-btn">Add Your First Wish</button>
        </div>
      `;
    } else {
      // Sort by priority (highest first), then by date added
      const sortedWishlist = [...wishlistItems].sort((a, b) => {
        if (b.priority !== a.priority) return b.priority - a.priority;
        return new Date(b.created_at) - new Date(a.created_at);
      });

      wishlistEl.innerHTML = `
        <div class="wishlist-header">
          <h4>🌟 Substance Wishlist (${wishlistItems.length})</h4>
          <button class="add-to-wishlist-btn" id="add-to-wishlist-btn">+ Add to Wishlist</button>
        </div>
        <div class="wishlist-grid">
          ${sortedWishlist.map(item => this.createWishlistCard(item)).join('')}
        </div>
      `;
    }

    // Add event listeners
    this.setupWishlistEventListeners();
  }

  createWishlistCard(item) {
    const priorityStars = this.generatePriorityStars(item.priority);
    const priorityLabel = this.getPriorityLabel(item.priority);
    const categoryColor = this.getCategoryColor(item.category);
    
    return `
      <div class="wishlist-card compact" data-wishlist-id="${item.id}" data-priority="${item.priority}">
        <div class="wishlist-content">
          <div class="wishlist-main">
            <div class="substance-info">
              <h4 class="substance-name">${item.substance_name}</h4>
              ${item.category ? `<span class="substance-category" style="background-color: ${categoryColor}">${item.category}</span>` : ''}
            </div>
            <div class="priority-display">
              <div class="priority-stars">${priorityStars}</div>
              <span class="priority-label">${priorityLabel}</span>
            </div>
          </div>
          <div class="wishlist-actions">
            <button class="edit-wishlist-item" title="Edit" data-id="${item.id}">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
            </button>
            <button class="move-to-collection compact" data-substance="${item.substance_name}" data-category="${item.category || ''}" data-chemical="${item.chemical_name || ''}" title="Add to Collection">
              📚
            </button>
            <button class="remove-from-wishlist" title="Remove" data-id="${item.id}">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
        ${item.notes ? `<div class="wishlist-notes compact">${item.notes}</div>` : ''}
      </div>
    `;
  }

  generatePriorityStars(priority) {
    const maxStars = 5;
    let stars = '';
    
    for (let i = 1; i <= maxStars; i++) {
      if (i <= priority) {
        stars += '<span class="star filled">★</span>';
      } else {
        stars += '<span class="star empty">☆</span>';
      }
    }
    
    return stars;
  }

  getPriorityLabel(priority) {
    const labels = {
      5: 'Highest',
      4: 'High',
      3: 'Medium',
      2: 'Low',
      1: 'Lowest'
    };
    return labels[priority] || 'Unknown';
  }

  setupWishlistEventListeners() {
    // Add to wishlist buttons
    document.querySelectorAll('.add-to-wishlist-btn').forEach(btn => {
      btn.addEventListener('click', () => this.openAddToWishlistModal());
    });

    // Remove from wishlist buttons
    document.querySelectorAll('.remove-from-wishlist').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const id = e.currentTarget.dataset.id;
        if (confirm('Remove this substance from your wishlist?')) {
          await this.removeFromWishlist(id);
        }
      });
    });

    // Edit wishlist item buttons
    document.querySelectorAll('.edit-wishlist-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        this.openEditWishlistModal(id);
      });
    });

    // Move to collection buttons
    document.querySelectorAll('.move-to-collection').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const substance = e.currentTarget.dataset.substance;
        const category = e.currentTarget.dataset.category;
        const chemical = e.currentTarget.dataset.chemical;
        
        // Add to collection
        const added = await this.addSubstance(substance);
        if (added) {
          // Remove from wishlist
          const wishlistItem = this.wishlist.find(item => item.substance_name === substance);
          if (wishlistItem) {
            await this.removeFromWishlist(wishlistItem.id);
          }
        }
      });
    });
  }

  updateActivityTimeline(substances) {
    const timelineEl = document.getElementById('activity-timeline');
    if (!timelineEl) return;

    const substancesList = substances || [];

    if (substancesList.length === 0) {
      timelineEl.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">📅</div>
          <h3>No recent activity</h3>
          <p>Your recent substance additions and profile updates will appear here.</p>
        </div>
      `;
      return;
    }

    // Sort substances by date added (most recent first)
    const sortedSubstances = [...substancesList].sort((a, b) => b.dateAdded - a.dateAdded);
    const recentSubstances = sortedSubstances.slice(0, 5);

    const timelineItems = recentSubstances.map(substance => {
      const date = new Date(substance.dateAdded);
      const timeAgo = this.getTimeAgo(date);
      
      return `
        <div class="timeline-item">
          <div class="timeline-icon">🧪</div>
          <div class="timeline-content">
            <p><strong>Added ${substance.name}</strong> to collection</p>
            <small class="timeline-date">${timeAgo}</small>
          </div>
        </div>
      `;
    }).join('');

    timelineEl.innerHTML = timelineItems;
  }

  getTimeAgo(date) {
    const now = new Date();
    const diffInMs = now - date;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays === 0) {
      if (diffInHours === 0) return 'Just now';
      return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    } else if (diffInDays < 30) {
      return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString();
    }
  }

  // Event listeners
  setupEventListeners() {
    // Logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => this.logout());
    }

    // Edit profile button
    const editProfileBtn = document.getElementById('edit-profile-btn');
    if (editProfileBtn) {
      editProfileBtn.addEventListener('click', () => this.openEditProfileModal());
    }

    // Avatar upload
    const editAvatarBtn = document.getElementById('edit-avatar-btn');
    const avatarUpload = document.getElementById('avatar-upload');
    if (editAvatarBtn && avatarUpload) {
      editAvatarBtn.addEventListener('click', () => avatarUpload.click());
      avatarUpload.addEventListener('change', (e) => this.handleImageUpload(e, 'avatar'));
    }

    // Banner upload
    const editBannerBtn = document.getElementById('edit-banner-btn');
    const bannerUpload = document.getElementById('banner-upload');
    if (editBannerBtn && bannerUpload) {
      editBannerBtn.addEventListener('click', () => bannerUpload.click());
      bannerUpload.addEventListener('change', (e) => this.handleImageUpload(e, 'banner'));
    }

    // Add substance button
    const addSubstanceBtns = document.querySelectorAll('.add-substance-btn');
    addSubstanceBtns.forEach(btn => {
      btn.addEventListener('click', () => this.openAddSubstanceModal());
    });

    // Modal close buttons
    this.setupModalListeners();

    // Filter buttons
    this.setupFilterListeners();
  }

  setupModalListeners() {
    // Edit profile modal
    const editModal = document.getElementById('edit-profile-modal');
    const closeEditModal = document.getElementById('close-edit-modal');
    const cancelEdit = document.getElementById('cancel-edit');
    const editForm = document.getElementById('edit-profile-form');

    if (closeEditModal) {
      closeEditModal.addEventListener('click', () => this.closeModal(editModal));
    }
    
    if (cancelEdit) {
      cancelEdit.addEventListener('click', () => this.closeModal(editModal));
    }

    if (editForm) {
      editForm.addEventListener('submit', (e) => this.handleEditProfileSubmit(e));
    }

    // Add substance modal
    const substanceModal = document.getElementById('add-substance-modal');
    const closeSubstanceModal = document.getElementById('close-substance-modal');
    const cancelSubstance = document.getElementById('cancel-substance');
    const substanceForm = document.getElementById('add-substance-form');

    if (closeSubstanceModal) {
      closeSubstanceModal.addEventListener('click', () => this.closeModal(substanceModal));
    }
    
    if (cancelSubstance) {
      cancelSubstance.addEventListener('click', () => this.closeModal(substanceModal));
    }

    if (substanceForm) {
      substanceForm.addEventListener('submit', (e) => this.handleAddSubstanceSubmit(e));
    }

    // Rating modal
    const ratingModal = document.getElementById('rate-substance-modal');
    const closeRatingModal = document.getElementById('close-rating-modal');
    const cancelRating = document.getElementById('cancel-rating');
    const ratingForm = document.getElementById('rate-substance-form');

    if (closeRatingModal) {
      closeRatingModal.addEventListener('click', () => this.closeModal(ratingModal));
    }
    
    if (cancelRating) {
      cancelRating.addEventListener('click', () => this.closeModal(ratingModal));
    }

    if (ratingForm) {
      ratingForm.addEventListener('submit', (e) => this.handleRatingSubmit(e));
    }

    // Initialize star rating input
    this.initializeStarRating();

    // View ratings modal event listeners
    const viewRatingsModal = document.getElementById('view-ratings-modal');
    const closeViewRatings = document.getElementById('close-ratings-modal');
    
    if (closeViewRatings) {
      closeViewRatings.addEventListener('click', () => this.closeModal(viewRatingsModal));
    }

    // Wishlist modals
    const addToWishlistModal = document.getElementById('add-to-wishlist-modal');
    const closeAddToWishlist = document.getElementById('close-add-to-wishlist-modal');
    const cancelAddToWishlist = document.getElementById('cancel-add-to-wishlist');
    const addToWishlistForm = document.getElementById('add-to-wishlist-form');
    
    if (closeAddToWishlist) {
      closeAddToWishlist.addEventListener('click', () => this.closeModal(addToWishlistModal));
    }
    
    if (cancelAddToWishlist) {
      cancelAddToWishlist.addEventListener('click', () => this.closeModal(addToWishlistModal));
    }
    
    if (addToWishlistForm) {
      addToWishlistForm.addEventListener('submit', (e) => this.handleAddToWishlistSubmit(e));
    }

    const editWishlistModal = document.getElementById('edit-wishlist-modal');
    const closeEditWishlist = document.getElementById('close-edit-wishlist-modal');
    const cancelEditWishlist = document.getElementById('cancel-edit-wishlist');
    const editWishlistForm = document.getElementById('edit-wishlist-form');
    
    if (closeEditWishlist) {
      closeEditWishlist.addEventListener('click', () => this.closeModal(editWishlistModal));
    }
    
    if (cancelEditWishlist) {
      cancelEditWishlist.addEventListener('click', () => this.closeModal(editWishlistModal));
    }
    
    if (editWishlistForm) {
      editWishlistForm.addEventListener('submit', (e) => this.handleEditWishlistSubmit(e));
    }

    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal')) {
        this.closeModal(e.target);
      }
    });
  }

  initializeStarRating() {
    const starRating = document.getElementById('star-rating');
    const ratingInput = document.getElementById('substance-rating');
    
    if (!starRating || !ratingInput) return;
    
    const stars = starRating.querySelectorAll('.star');
    
    stars.forEach((star, index) => {
      star.addEventListener('click', () => {
        const rating = index + 1;
        ratingInput.value = rating;
        
        // Update visual state
        stars.forEach((s, i) => {
          if (i < rating) {
            s.classList.add('active');
          } else {
            s.classList.remove('active');
          }
        });
      });
      
      star.addEventListener('mouseenter', () => {
        const rating = index + 1;
        
        // Highlight stars on hover
        stars.forEach((s, i) => {
          if (i < rating) {
            s.classList.add('hover');
          } else {
            s.classList.remove('hover');
          }
        });
      });
    });
    
    // Remove hover effects when leaving the star rating area
    starRating.addEventListener('mouseleave', () => {
      stars.forEach(s => s.classList.remove('hover'));
    });
    
    // Initialize word count for comment
    const commentTextarea = document.getElementById('substance-comment');
    const wordCountSpan = document.getElementById('word-count');
    
    if (commentTextarea && wordCountSpan) {
      commentTextarea.addEventListener('input', () => {
        const words = commentTextarea.value.trim().split(/\s+/).filter(word => word.length > 0);
        const wordCount = words.length;
        wordCountSpan.textContent = wordCount;
        
        // Warn if approaching limit
        if (wordCount > 30) {
          wordCountSpan.style.color = '#ff6b6b';
          // Trim to 30 words
          const limitedWords = words.slice(0, 30);
          commentTextarea.value = limitedWords.join(' ');
          wordCountSpan.textContent = '30';
        } else if (wordCount > 25) {
          wordCountSpan.style.color = '#f39c12';
        } else {
          wordCountSpan.style.color = '#666';
        }
      });
    }
  }

  async handleRatingSubmit(event) {
    event.preventDefault();
    
    const modal = document.getElementById('rate-substance-modal');
    const substanceName = modal.dataset.substanceName;
    const category = modal.dataset.category;
    
    // Get form data
    const rating = parseInt(document.getElementById('substance-rating').value) || 0;
    const comment = document.getElementById('substance-comment').value.trim();
    
    // Validate rating
    if (rating === 0) {
      alert('Please select a rating (1-10 stars).');
      return;
    }
    
    // Validate comment word count
    if (comment) {
      const words = comment.split(/\s+/).filter(word => word.length > 0);
      if (words.length > 30) {
        alert('Comment must be 30 words or less.');
        return;
      }
    }
    
    const ratingData = {
      substanceName: substanceName,
      category: category,
      rating: rating,
      comment: comment,
      created_at: new Date().toISOString()
    };

    try {
      const success = await this.addRating(ratingData);
      
      if (success) {
        // Reload substances to update display
        await this.loadSubstances();
        this.closeModal(modal);
        
        // Reset form
        document.getElementById('rate-substance-form').reset();
        document.getElementById('substance-rating').value = '0';
        document.querySelectorAll('#star-rating .star').forEach(star => star.classList.remove('active'));
        document.getElementById('word-count').textContent = '0';
        
        alert(`Rating submitted for ${substanceName}!`);
      } else {
        alert('Failed to submit rating. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert('Error submitting rating. Please try again.');
    }
  }

  setupFilterListeners() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        // Update active state
        filterBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        
        // Filter substances
        const category = e.target.dataset.category;
        this.filterSubstances(category);
      });
    });
  }

  filterSubstances(category) {
    const cards = document.querySelectorAll('.substance-card');
    cards.forEach(card => {
      if (category === 'all' || card.dataset.category === category) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // Image handling
  handleImageUpload(event, type) {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.');
      return;
    }

    // Validate file size (max 2MB)
    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('Image size must be less than 2MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = e.target.result;
      
      // Update internal state
      if (!this.profileData) {
        this.profileData = {};
      }
      
      // Create a targeted update object that only includes the changed image
      const updateData = {
        display_name: this.profileData.display_name,
        bio: this.profileData.bio,
        location: this.profileData.location,
        website: this.profileData.website
      };
      
      if (type === 'avatar') {
        this.profileData.profilePicture = imageData;
        this.profileData.avatar_url = imageData;
        updateData.profilePicture = imageData; // Send as profilePicture for backend compatibility
        this.updateProfilePicture(imageData);
        console.log('Avatar uploaded, saving profile with targeted update');
      } else if (type === 'banner') {
        this.profileData.bannerImage = imageData;
        this.profileData.banner_url = imageData;
        updateData.bannerImage = imageData; // Send as bannerImage for backend compatibility
        this.updateBanner(imageData);
        console.log('Banner uploaded, saving profile with targeted update');
      }
      
      // Save only the targeted update
      this.saveProfile(updateData);
    };
    
    reader.readAsDataURL(file);
  }

  // Profile editing
  openEditProfileModal() {
    const modal = document.getElementById('edit-profile-modal');
    const profile = this.getProfile();
    
    // Populate form with current values
    document.getElementById('edit-username').value = profile.username;
    document.getElementById('edit-bio').value = profile.bio;
    
    modal.style.display = 'block';
  }

  handleEditProfileSubmit(event) {
    event.preventDefault();
    
    const username = document.getElementById('edit-username').value.trim();
    const bio = document.getElementById('edit-bio').value.trim();
    
    if (!username) {
      alert('Username is required.');
      return;
    }
    
    const profile = this.getProfile();
    profile.username = username;
    profile.bio = bio || 'No bio set yet.';
    
    if (this.saveProfile(profile)) {
      this.loadProfile();
      this.closeModal(document.getElementById('edit-profile-modal'));
    }
  }

  // Substance management
  openAddSubstanceModal() {
    const modal = document.getElementById('add-substance-modal');
    modal.style.display = 'block';
    
    // Focus on search input
    setTimeout(() => {
      document.getElementById('substance-search').focus();
    }, 100);
  }

  async loadSubstanceSuggestions() {
    try {
      // Comprehensive list matching ALL substance files from the substances folder
      const availableSubstances = [
        { title: '2C-B', category: 'Psychedelics', chemicalName: '2-(4-bromo-2,5-dimethoxyphenyl)ethanamine' },
        { title: '2C-B-FLY', category: 'Psychedelics', chemicalName: '2-(8-bromo-2,3,6,7-tetrahydrobenzo[1,2-b:4,5-b\']difuran-4-yl)ethanamine' },
        { title: '2C-E', category: 'Psychedelics', chemicalName: '2-(2,5-dimethoxy-4-ethylphenyl)ethanamine' },
        { title: '2C-I', category: 'Psychedelics', chemicalName: '2,5-Dimethoxy-4-iodophenethylamine' },
        { title: '2C-T-7', category: 'Psychedelics', chemicalName: '2,5-Dimethoxy-4-(n)-propylthiophenethylamine' },
        { title: '3-CMC', category: 'Stimulants', chemicalName: '3-Chloromethcathinone' },
        { title: '3-MMC', category: 'Stimulants', chemicalName: '3-Methylmethcathinone' },
        { title: '4-CMC', category: 'Stimulants', chemicalName: '4-Chloromethcathinone' },
        { title: '4-CEC', category: 'Stimulants', chemicalName: '4-Chloroethcathinone' },
        { title: '4-MMC', category: 'Stimulants', chemicalName: '4-Methylmethcathinone' },
        { title: '3-MeO-PCP', category: 'Dissociatives', chemicalName: '1-[1-(3-methoxyphenyl)cyclohexyl]piperidine' },
        { title: '4-Fluoroamphetamine', category: 'Stimulants', chemicalName: '1-(4-fluorophenyl)propan-2-amine' },
        { title: '5-MeO-AMT', category: 'Psychedelics', chemicalName: '5-methoxy-α-methyltryptamine' },
        { title: '5-MeO-DiPT', category: 'Psychedelics', chemicalName: '5-methoxy-N,N-diisopropyltryptamine' },
        { title: '5-MeO-DMT', category: 'Psychedelics', chemicalName: '5-methoxy-N,N-dimethyltryptamine' },
        { title: '6-APB', category: 'Empathogens', chemicalName: '1-(benzofuran-6-yl)propan-2-amine' },
        { title: 'Absinthe', category: 'Depressants', chemicalName: 'Wormwood-based alcoholic beverage' },
        { title: 'Acacia', category: 'Psychedelics', chemicalName: 'Various DMT-containing species' },
        { title: 'Acetaminophen', category: 'Nootropics', chemicalName: 'N-(4-hydroxyphenyl)acetamide' },
        { title: 'Aerosols', category: 'Depressants', chemicalName: 'Various volatile hydrocarbons' },
        { title: 'Acetylfentanyl', category: 'Depressants', chemicalName: 'N-(1-phenethylpiperidin-4-yl)-N-phenylacetamide' },
        { title: 'Adrenochrome', category: 'Research Chemicals', chemicalName: '3-Hydroxy-1-methyl-2,3-dihydro-1H-indole-5,6-dione' },
        { title: 'AET', category: 'Psychedelics', chemicalName: 'Alpha-ethyltryptamine' },
        { title: 'Alcohol', category: 'Depressants', chemicalName: 'Ethanol' },
        { title: 'Alkyl Nitrites', category: 'Inhalant', chemicalName: 'Various alkyl nitrite esters' },
        { title: 'Alpha-PVP', category: 'Stimulants', chemicalName: 'α-Pyrrolidinopentiophenone' },
        { title: 'Alprazolam', category: 'Depressants', chemicalName: '8-chloro-1-methyl-6-phenyl-4H-[1,2,4]triazolo[4,3-a][1,4]benzodiazepine' },
        { title: 'Amitriptyline', category: 'Nootropics', chemicalName: '3-(10,11-dihydro-5H-dibenzo[a,d]cyclohepten-5-ylidene)-N,N-dimethylpropan-1-amine' },
        { title: 'Amphetamine', category: 'Stimulants', chemicalName: '(RS)-1-phenylpropan-2-amine' },
        { title: 'Anabolic Steroids', category: 'Stimulants', chemicalName: 'Various synthetic testosterone derivatives' },
        { title: 'AMT', category: 'Psychedelics', chemicalName: 'Alpha-methyltryptamine' },
        { title: 'Ayahuasca', category: 'Psychedelics', chemicalName: 'Dimethyltryptamine + MAOIs' },
        { title: 'Barbiturates', category: 'Depressants', chemicalName: 'Various barbituric acid derivatives' },
        { title: 'Belladonna', category: 'Dissociatives', chemicalName: 'Scopolamine, Atropine, Hyoscyamine' },
        { title: 'Blue Lotus', category: 'Nootropics', chemicalName: 'Nuciferine, N-nornuciferine' },
        { title: 'Datura', category: 'Dissociatives', chemicalName: 'Scopolamine, Hyoscyamine, Atropine (Tropane Alkaloids)' },
        { title: 'Bromazepam', category: 'Depressants', chemicalName: '7-bromo-1,3-dihydro-5-(2-pyridyl)-2H-1,4-benzodiazepin-2-one' },
        { title: 'Bufotenin', category: 'Psychedelics', chemicalName: '5-hydroxy-N,N-dimethyltryptamine' },
        { title: 'Buprenorphine', category: 'Depressants', chemicalName: '(2S)-2-[(5R,6R,7R,14S)-9α-cyclopropylmethyl-4,5-epoxy-6,14-ethano-3-hydroxy-6-methoxymorphinan-7α-yl]-3,3-dimethylbutan-2-ol' },
        { title: 'BZP', category: 'Stimulants', chemicalName: '1-benzylpiperazine' },
        { title: 'Caffeine', category: 'Stimulants', chemicalName: '1,3,7-trimethylxanthine' },
        { title: 'Cannabis Concentrates', category: 'Cannabinoids', chemicalName: 'Concentrated cannabis extracts' },
        { title: 'Carbogen', category: 'Dissociatives', chemicalName: 'Carbon dioxide + oxygen mixture' },
        { title: 'Carisoprodol', category: 'Depressants', chemicalName: 'N-isopropyl-2-methyl-2-propyl-1,3-propanediol dicarbamate' },
        { title: 'Cathinone', category: 'Stimulants', chemicalName: '(S)-2-amino-1-phenyl-1-propanone' },
        { title: 'CBD', category: 'Cannabinoids', chemicalName: 'Cannabidiol' },
        { title: 'CBN', category: 'Cannabinoids', chemicalName: 'Cannabinol' },
        { title: 'Chloral Hydrate', category: 'Depressants', chemicalName: '2,2,2-trichloro-1,1-ethanediol' },
        { title: 'Chlorodiazepoxide', category: 'Depressants', chemicalName: '7-Chloro-2-(methylamino)-5-phenyl-3H-1,4-benzodiazepin-4-oxide' },
        { title: 'Chloroform', category: 'Dissociatives', chemicalName: 'Trichloromethane' },
        { title: 'Clonazepam', category: 'Depressants', chemicalName: '5-(2-chlorophenyl)-1,3-dihydro-7-nitro-2H-1,4-benzodiazepin-2-one' },
        { title: 'Cocaine', category: 'Stimulants', chemicalName: 'Methyl (1R,2R,3S,5S)-3-(benzoyloxy)-8-methyl-8-azabicyclo[3.2.1]octane-2-carboxylate' },
        { title: 'Erythroxylum Coca', category: 'Stimulants', chemicalName: 'Cocaine, ecgonine, cinnamoylcocaine, and tropane alkaloids in natural plant matrix' },
        { title: 'Codeine', category: 'Depressants', chemicalName: '(5α,6α)-7,8-didehydro-4,5-epoxy-3-methoxy-17-methylmorphinan-6-ol' },
        { title: 'Delta-8-THC', category: 'Cannabinoids', chemicalName: 'Delta-8-tetrahydrocannabinol' },
        { title: 'Desomorphine', category: 'Depressants', chemicalName: '4,5α-epoxy-17-methylmorphinan-3-ol' },
        { title: 'Diazepam', category: 'Depressants', chemicalName: '7-chloro-1,3-dihydro-1-methyl-5-phenyl-2H-1,4-benzodiazepin-2-one' },
        { title: 'Dihydrocodeine', category: 'Depressants', chemicalName: '(5α,6α)-4,5-epoxy-3-methoxy-17-methylmorphinan-6-ol' },
        { title: 'Dimenhydrinate', category: 'Dissociatives', chemicalName: '2-(diphenylmethoxy)-N,N-dimethylethanamine' },
        { title: 'Diphenhydramine', category: 'Dissociatives', chemicalName: '2-(diphenylmethoxy)-N,N-dimethylethanamine' },
        { title: 'DMT', category: 'Psychedelics', chemicalName: 'N,N-Dimethyltryptamine' },
        { title: 'DOM', category: 'Psychedelics', chemicalName: '2,5-dimethoxy-4-methylamphetamine' },
        { title: 'Dronabinol', category: 'Cannabinoids', chemicalName: 'Synthetic THC' },
        { title: 'DXM', category: 'Dissociatives', chemicalName: 'Dextromethorphan' },
        { title: 'Ephedrine', category: 'Stimulants', chemicalName: '(1R,2S)-2-(methylamino)-1-phenylpropan-1-ol' },
        { title: 'Ether', category: 'Dissociatives', chemicalName: 'Diethyl ether' },
        { title: 'Ethylphenidate', category: 'Stimulants', chemicalName: 'Ethyl 2-phenyl-2-(piperidin-2-yl)acetate' },
        { title: 'Fentanyl', category: 'Depressants', chemicalName: 'N-(1-(2-phenylethyl)-4-piperidinyl)-N-phenylpropanamide' },
        { title: 'Gabapentin', category: 'Nootropics', chemicalName: '2-[1-(aminomethyl)cyclohexyl]acetic acid' },
        { title: 'GHB', category: 'Depressants', chemicalName: 'γ-Hydroxybutyric acid' },
        { title: 'Hexen', category: 'Stimulants', chemicalName: 'N-Ethylhexedrone' },
        { title: 'Heroin', category: 'Depressants', chemicalName: 'Diacetylmorphine' },
        { title: 'HHC', category: 'Cannabinoids', chemicalName: 'Hexahydrocannabinol' },
        { title: 'Hydrocodone', category: 'Depressants', chemicalName: '(4R,4aS,7aR,12bS)-9-methoxy-3-methyl-2,4,4a,5,6,7a-hexahydro-1H-4,12-methanobenzofuro[3,2-e]isoquinoline-7-one' },
        { title: 'Hydromorphone', category: 'Depressants', chemicalName: '(5α)-4,5-epoxy-3-hydroxy-17-methylmorphinan-6-one' },
        { title: 'Ibogaine', category: 'Psychedelics', chemicalName: '12-methoxyibogamine' },
        { title: 'JWH-018', category: 'Cannabinoids', chemicalName: '1-pentyl-3-(1-naphthoyl)indole' },
        { title: 'Kava', category: 'Depressants', chemicalName: 'Kavalactones (Kavain, Dihydrokavain, Methysticin)' },
        { title: 'Kratom', category: 'Depressants', chemicalName: 'Mitragynine, 7-Hydroxymitragynine, Speciogynine' },
        { title: 'Khat', category: 'Stimulants', chemicalName: 'Cathinone, Cathine, Norephedrine' },
        { title: 'Ketamine', category: 'Dissociatives', chemicalName: '2-(2-Chlorophenyl)-2-(methylamino)cyclohexanone' },
        { title: 'Lean', category: 'Depressants', chemicalName: 'Codeine/Promethazine Syrup' },
        { title: 'Lion\'s Tail', category: 'Nootropics', chemicalName: 'Leonurine, Stachydrine, Leonotinin' },
        { title: 'Lorazepam', category: 'Depressants', chemicalName: '7-chloro-5-(2-chlorophenyl)-1,3-dihydro-3-hydroxy-2H-1,4-benzodiazepin-2-one' },
        { title: 'LSA', category: 'Psychedelics', chemicalName: 'Lysergic acid amide' },
        { title: 'LSD', category: 'Psychedelics', chemicalName: 'Lysergic acid diethylamide' },
        { title: 'MAOIs', category: 'Nootropics', chemicalName: 'Monoamine oxidase inhibitors' },
        { title: 'MBDB', category: 'Empathogens', chemicalName: 'N-methyl-1-(1,3-benzodioxol-5-yl)-2-butanamine' },
        { title: 'mCPP', category: 'Stimulants', chemicalName: '1-(3-chlorophenyl)piperazine' },
        { title: 'MDA', category: 'Empathogens', chemicalName: '3,4-methylenedioxyamphetamine' },
        { title: 'MDMA', category: 'Empathogens', chemicalName: '3,4-Methylenedioxymethamphetamine' },
        { title: 'MDPV', category: 'Stimulants', chemicalName: 'Methylenedioxypyrovalerone' },
        { title: 'Melatonin', category: 'Nootropics', chemicalName: 'N-[2-(5-methoxy-1H-indol-3-yl)ethyl]acetamide' },
        { title: 'Mescal Bean', category: 'Psychedelics', chemicalName: 'Cytisine, Anagyrine, N-Methylcytisine' },
        { title: 'Mimosa spp.', category: 'Psychedelics', chemicalName: 'N,N-DMT, 5-MeO-DMT, NMT, Yuremamine' },
        { title: 'Morning Glory', category: 'Psychedelics', chemicalName: 'LSA, Ergine, Isoergine, Ergot Alkaloids' },
        { title: 'Mandrake', category: 'Dissociatives', chemicalName: 'Scopolamine, Atropine, Hyoscyamine' },
        { title: 'Mucuna Pruriens', category: 'Nootropics', chemicalName: 'L-DOPA (L-3,4-dihydroxyphenylalanine)' },
        { title: 'Mescaline', category: 'Psychedelics', chemicalName: '3,4,5-trimethoxyphenethylamine' },
        { title: 'Methadone', category: 'Depressants', chemicalName: '6-(dimethylamino)-4,4-diphenylheptan-3-one' },
        { title: 'Methamphetamine', category: 'Stimulants', chemicalName: 'N-methyl-1-phenylpropan-2-amine' },
        { title: 'Methaqualone', category: 'Depressants', chemicalName: '2-methyl-3-(2-methylphenyl)quinazolin-4-one' },
        { title: 'Methoxetamine', category: 'Dissociatives', chemicalName: '2-(ethylamino)-2-(3-methoxyphenyl)cyclohexanone' },
        { title: 'Methoxphenidine', category: 'Dissociatives', chemicalName: '1-(1-(3-methoxyphenyl)cyclohexyl)piperidine' },
        { title: 'Methylphenidate', category: 'Stimulants', chemicalName: 'Methyl 2-phenyl-2-(piperidin-2-yl)acetate' },
        { title: 'Morphine', category: 'Depressants', chemicalName: '(5α,6α)-7,8-didehydro-4,5-epoxy-17-methylmorphinan-3,6-diol' },
        { title: 'Naloxone', category: 'Nootropics', chemicalName: '(5α)-4,5-epoxy-3,14-dihydroxy-17-(2-propen-1-yl)morphinan-6-one' },
        { title: 'NBOMe', category: 'Psychedelics', chemicalName: 'N-benzylphenethylamine derivatives' },
        { title: 'Nicotine', category: 'Stimulants', chemicalName: '(S)-3-(1-methylpyrrolidin-2-yl)pyridine' },
        { title: 'Nitrous Oxide', category: 'Dissociatives', chemicalName: 'Dinitrogen monoxide' },
        { title: 'Nutmeg', category: 'Dissociatives', chemicalName: 'Myristicin, Elemicin, Safrole' },
        { title: 'Opium', category: 'Depressants', chemicalName: 'Various opiate alkaloids' },
        { title: 'Opium Poppy', category: 'Depressants', chemicalName: 'Morphine, Codeine, Thebaine, Papaverine, Noscapine' },
        { title: 'Oxycodone', category: 'Depressants', chemicalName: '(5R,9R,13S,14S)-4,5α-epoxy-14-hydroxy-3-methoxy-5-methylmorphinan-6-one' },
        { title: 'Oxymorphone', category: 'Depressants', chemicalName: '(5α)-4,5-epoxy-3,14-dihydroxy-17-methylmorphinan-6-one' },
        { title: 'Passionflower', category: 'Nootropics', chemicalName: 'Chrysin, Vitexin, Apigenin, Flavonoids' },
        { title: 'Phenazepam', category: 'Depressant', chemicalName: '7-bromo-5-(2-chlorophenyl)-1,3-dihydro-2H-1,4-benzodiazepin-2-one' },
        { title: 'Rohypnol', category: 'Depressants', chemicalName: 'Flunitrazepam' },
        { title: 'PMMA/PMA', category: 'Stimulant', chemicalName: 'para-Methoxymethamphetamine / para-Methoxyamphetamine' },
        { title: 'Peyote', category: 'Psychedelics', chemicalName: 'Mescaline, Beta-Phenethylamine Alkaloids' },
        { title: 'PCP', category: 'Dissociatives', chemicalName: '1-(1-phenylcyclohexyl)piperidine' },
        { title: 'Piperazines', category: 'Stimulants', chemicalName: 'Various piperazine compounds' },
        { title: 'Pregabalin', category: 'Nootropics', chemicalName: '(S)-3-(aminomethyl)-5-methylhexanoic acid' },
        { title: 'Quetiapine', category: 'Depressants', chemicalName: 'Quetiapine fumarate' },
        { title: 'Psilocybin/Psilocin', category: 'Psychedelics', chemicalName: '4-phosphoryloxy-N,N-dimethyltryptamine' },
        { title: 'Psychoactive Amanitas', category: 'Dissociatives', chemicalName: 'Muscimol, Ibotenic Acid, Muscarine' },
        { title: 'Psychoactive Cacti', category: 'Psychedelics', chemicalName: 'Mescaline, Phenylethylamine Alkaloids' },
        { title: 'Salvia Divinorum', category: 'Psychedelics', chemicalName: 'Salvinorin A' },
        { title: 'Hawaiian Baby Woodrose', category: 'Psychedelics', chemicalName: 'LSA (Lysergic Acid Amide), Ergot Alkaloids' },
        { title: 'Kanna', category: 'Nootropics', chemicalName: 'Mesembrine, Mesembrenone, Mesembrenol (SSRI-like alkaloids)' },
        { title: 'Scopolamine', category: 'Dissociatives', chemicalName: '(1S,3s,5R,6R,7S,8s)-6,7-epoxy-8-methyl-3-oxa-8-azabicyclo[3.2.1]octane' },
        { title: 'Sildenafil', category: 'Nootropics', chemicalName: '5-[2-ethoxy-5-(4-methylpiperazin-1-yl)sulfonylphenyl]-1-methyl-3-propyl-1,6-dihydro-7H-pyrazolo[4,3-d]pyrimidin-7-one' },
        { title: 'Spice/K2', category: 'Cannabinoids', chemicalName: 'Synthetic cannabinoids' },
        { title: 'Synthetic Cathinones', category: 'Stimulants', chemicalName: 'Various substituted cathinone derivatives' },
        { title: 'SSRIs', category: 'Nootropics', chemicalName: 'Selective serotonin reuptake inhibitors' },
        { title: 'Tianeptine', category: 'Nootropics', chemicalName: 'Methyl 7-[(3-chloro-6,11-dihydro-6-methyldibenzo[c,f][1,2]thiazepin-11-yl)amino]heptanoate' },
        { title: 'THC', category: 'Cannabinoids', chemicalName: 'Tetrahydrocannabinol' },
        { title: 'Tilidin', category: 'Depressants', chemicalName: '(1RS,2RS)-2-(dimethylamino)-1-phenylcyclohex-3-en-1-yl propanoate' },
        { title: 'Toad Venom', category: 'Psychedelics', chemicalName: '5-MeO-DMT + Bufotenin' },
        { title: 'Tramadol', category: 'Depressants', chemicalName: '(±)-2-[(dimethylamino)methyl]-1-(3-methoxyphenyl)cyclohexanol' },
        { title: 'Triazolam', category: 'Depressants', chemicalName: '8-chloro-6-(2-chlorophenyl)-1-methyl-4H-[1,2,4]triazolo[4,3-a][1,4]benzodiazepine' },
        { title: 'U-47700', category: 'Depressants', chemicalName: '3,4-dichloro-N-[2-(dimethylamino)cyclohexyl]-N-methylbenzamide' },
        { title: 'Xylazine', category: 'Depressants', chemicalName: 'N-(2,6-dimethylphenyl)-5,6-dihydro-4H-1,3-thiazin-2-amine' },
        { title: 'Zolpidem', category: 'Depressants', chemicalName: 'N,N,6-trimethyl-2-(4-methylphenyl)imidazo[1,2-a]pyridine-3-acetamide' }
      ];
      
      this.availableSubstances = availableSubstances.sort((a, b) => a.title.localeCompare(b.title));
      console.log('Loaded', this.availableSubstances.length, 'available substances');
      this.setupSubstanceSearch();
    } catch (error) {
      console.error('Error loading substance suggestions:', error);
      this.availableSubstances = [];
      this.setupSubstanceSearch();
    }
  }

  setupSubstanceSearch() {
    const searchInput = document.getElementById('substance-search');
    const dropdownEl = document.getElementById('substance-dropdown');
    
    if (!searchInput || !dropdownEl) return;

    let selectedIndex = -1;
    let filteredSubstances = [];

    // Initially show all substances
    this.updateDropdownDisplay(this.availableSubstances, dropdownEl, searchInput);

    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      selectedIndex = -1;
      
      if (query.length === 0) {
        // Show all substances when no search query
        filteredSubstances = this.availableSubstances;
      } else {
        // Filter substances based on query
        filteredSubstances = this.availableSubstances.filter(substance => 
          substance.title.toLowerCase().includes(query) ||
          (substance.chemicalName && substance.chemicalName.toLowerCase().includes(query)) ||
          substance.category.toLowerCase().includes(query)
        );
      }

      this.updateDropdownDisplay(filteredSubstances, dropdownEl, searchInput);
      dropdownEl.style.display = 'block';
    });

    // Keyboard navigation
    searchInput.addEventListener('keydown', (e) => {
      const items = dropdownEl.querySelectorAll('.dropdown-item:not(.no-results)');
      
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
        this.updateSelection(items, selectedIndex);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedIndex = Math.max(selectedIndex - 1, -1);
        this.updateSelection(items, selectedIndex);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (selectedIndex >= 0 && items[selectedIndex]) {
          this.selectSubstance(items[selectedIndex], searchInput, dropdownEl);
        }
      } else if (e.key === 'Escape') {
        dropdownEl.style.display = 'none';
        selectedIndex = -1;
      }
    });

    // Show dropdown on focus
    searchInput.addEventListener('focus', () => {
      const query = searchInput.value.toLowerCase().trim();
      filteredSubstances = query.length === 0 ? this.availableSubstances : 
        this.availableSubstances.filter(substance => 
          substance.title.toLowerCase().includes(query) ||
          (substance.chemicalName && substance.chemicalName.toLowerCase().includes(query)) ||
          substance.category.toLowerCase().includes(query)
        );
      
      this.updateDropdownDisplay(filteredSubstances, dropdownEl, searchInput);
      dropdownEl.style.display = 'block';
    });

    // Hide dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.substance-search-container')) {
        dropdownEl.style.display = 'none';
        selectedIndex = -1;
      }
    });
  }

  updateDropdownDisplay(substances, dropdownEl, searchInput) {
    if (substances.length === 0) {
      dropdownEl.innerHTML = '<div class="dropdown-item no-results">No substances found</div>';
      return;
    }

    // Show all substances - no limit for complete coverage
    const displaySubstances = substances;
    
    const dropdownHtml = displaySubstances.map(substance => `
      <div class="dropdown-item" 
           data-name="${substance.title}" 
           data-category="${substance.category}" 
           data-chemical="${substance.chemicalName || ''}">
        <div class="substance-name">${substance.title}</div>
        <div class="substance-details">
          <span class="substance-category">${substance.category}</span>
          ${substance.chemicalName ? `<span class="substance-chemical">${substance.chemicalName}</span>` : ''}
        </div>
      </div>
    `).join('');

    dropdownEl.innerHTML = dropdownHtml;

    // Add click listeners to dropdown items
    dropdownEl.querySelectorAll('.dropdown-item:not(.no-results)').forEach(item => {
      item.addEventListener('click', () => {
        this.selectSubstance(item, searchInput, dropdownEl);
      });
    });
  }

  updateSelection(items, selectedIndex) {
    items.forEach((item, index) => {
      if (index === selectedIndex) {
        item.classList.add('selected');
      } else {
        item.classList.remove('selected');
      }
    });
  }

  selectSubstance(item, searchInput, dropdownEl) {
    searchInput.value = item.dataset.name;
    document.getElementById('substance-category').value = item.dataset.category;
    dropdownEl.style.display = 'none';
    
    // Store the selected substance data for later use
    searchInput.dataset.selectedSubstance = JSON.stringify({
      name: item.dataset.name,
      category: item.dataset.category,
      chemicalName: item.dataset.chemical
    });
  }

  setupWishlistSubstanceSearch() {
    const searchInput = document.getElementById('wishlist-substance-search');
    const dropdownEl = document.getElementById('wishlist-substance-dropdown');
    
    if (!searchInput || !dropdownEl) return;

    let selectedIndex = -1;
    let filteredSubstances = [];

    // Initially show all substances
    this.updateWishlistDropdownDisplay(this.availableSubstances, dropdownEl, searchInput);

    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      selectedIndex = -1;
      
      if (query.length === 0) {
        // Show all substances when no search query
        filteredSubstances = this.availableSubstances;
      } else {
        // Filter substances based on query
        filteredSubstances = this.availableSubstances.filter(substance => 
          substance.title.toLowerCase().includes(query) ||
          (substance.chemicalName && substance.chemicalName.toLowerCase().includes(query)) ||
          substance.category.toLowerCase().includes(query)
        );
      }

      this.updateWishlistDropdownDisplay(filteredSubstances, dropdownEl, searchInput);
      dropdownEl.style.display = 'block';
    });

    // Keyboard navigation
    searchInput.addEventListener('keydown', (e) => {
      const items = dropdownEl.querySelectorAll('.dropdown-item:not(.no-results)');
      
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
        this.updateSelection(items, selectedIndex);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedIndex = Math.max(selectedIndex - 1, -1);
        this.updateSelection(items, selectedIndex);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (selectedIndex >= 0 && items[selectedIndex]) {
          this.selectWishlistSubstance(items[selectedIndex], searchInput, dropdownEl);
        }
      } else if (e.key === 'Escape') {
        dropdownEl.style.display = 'none';
      }
    });

    // Hide dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !dropdownEl.contains(e.target)) {
        dropdownEl.style.display = 'none';
      }
    });

    // Show dropdown when focusing on search input
    searchInput.addEventListener('focus', () => {
      const query = searchInput.value.toLowerCase().trim();
      if (query.length === 0) {
        this.updateWishlistDropdownDisplay(this.availableSubstances, dropdownEl, searchInput);
      }
      dropdownEl.style.display = 'block';
    });
  }

  updateWishlistDropdownDisplay(substances, dropdownEl, searchInput) {
    if (!substances || substances.length === 0) {
      dropdownEl.innerHTML = '<div class="dropdown-item no-results">No substances found</div>';
      return;
    }

    // Show all substances in the dropdown
    const dropdownHtml = substances.map(substance => `
      <div class="dropdown-item" 
           data-name="${substance.title}" 
           data-category="${substance.category}" 
           data-chemical="${substance.chemicalName || ''}">
        <div class="substance-name">${substance.title}</div>
        <div class="substance-details">
          <span class="substance-category">${substance.category}</span>
          ${substance.chemicalName ? `<span class="substance-chemical">${substance.chemicalName}</span>` : ''}
        </div>
      </div>
    `).join('');

    dropdownEl.innerHTML = dropdownHtml;

    // Add click listeners to dropdown items
    dropdownEl.querySelectorAll('.dropdown-item:not(.no-results)').forEach(item => {
      item.addEventListener('click', () => {
        this.selectWishlistSubstance(item, searchInput, dropdownEl);
      });
    });
  }

  selectWishlistSubstance(item, searchInput, dropdownEl) {
    searchInput.value = item.dataset.name;
    document.getElementById('wishlist-category').value = item.dataset.category;
    dropdownEl.style.display = 'none';
    
    // Store the selected substance data for later use
    searchInput.dataset.selectedSubstance = JSON.stringify({
      name: item.dataset.name,
      category: item.dataset.category,
      chemicalName: item.dataset.chemical
    });
  }

  async handleAddSubstanceSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('substance-search').value.trim();
    const category = document.getElementById('substance-category').value;
    const notes = document.getElementById('substance-notes').value.trim();
    
    if (!name) {
      alert('Please enter a substance name.');
      return;
    }
    
    try {
      // Add substance using the substances endpoint
      const response = await fetch(`${getBackendUrl()}/api/substances`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ substance_name: name }),
        credentials: 'include'
      });

      if (response.ok) {
        // Reload substances to update the display
        await this.loadSubstances();
        this.closeModal(document.getElementById('add-substance-modal'));
        
        // Reset form
        document.getElementById('add-substance-form').reset();
        
        alert('Substance added successfully!');
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to add substance');
      }
    } catch (error) {
      console.error('Error adding substance:', error);
      alert('Error adding substance. Please try again.');
    }
  }

  // Utility methods
  closeModal(modal) {
    if (modal) {
      modal.style.display = 'none';
    }
  }

  openViewExperiencesModal(substanceName) {
    const modal = document.getElementById('view-experiences-modal');
    const title = document.getElementById('experiences-modal-title');
    const experiencesList = document.getElementById('experiences-list');
    const noExperiences = document.getElementById('no-experiences');
    
    // Set title
    title.textContent = `${substanceName} Experience History`;
    
    // Get experiences for this substance
    const profile = this.getProfile();
    const substanceExperiences = profile.experiences.filter(exp => 
      exp.substanceName.toLowerCase() === substanceName.toLowerCase()
    );
    
    if (substanceExperiences.length === 0) {
      experiencesList.style.display = 'none';
      noExperiences.style.display = 'block';
      
      // Set up the "add first experience" button
      const addFirstBtn = document.getElementById('add-first-experience');
      addFirstBtn.onclick = () => {
        this.closeModal(modal);
        this.openLogExperienceModal(substanceName, '');
      };
    } else {
      experiencesList.style.display = 'block';
      noExperiences.style.display = 'none';
      this.displayExperiencesList(substanceExperiences, experiencesList);
    }
    
    this.showModal(modal);
  }

  displayExperiencesList(experiences, container) {
    // Sort experiences by date (newest first)
    const sortedExperiences = experiences.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    container.innerHTML = sortedExperiences.map(exp => this.createExperienceCard(exp)).join('');
    
    // Add event listeners for experience actions
    container.querySelectorAll('.delete-experience').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const experienceId = e.target.dataset.experienceId;
        if (confirm('Are you sure you want to delete this experience?')) {
          this.deleteExperience(experienceId);
        }
      });
    });
  }

  createExperienceCard(experience) {
    const date = new Date(experience.date).toLocaleDateString();
    const effects = experience.effects && experience.effects.length > 0 
      ? experience.effects.slice(0, 3).join(', ') + (experience.effects.length > 3 ? '...' : '')
      : 'No effects logged';
    
    return `
      <div class="experience-card" data-experience-id="${experience.id}">
        <div class="experience-header">
          <div class="experience-date">${date}</div>
          <div class="experience-rating">
            <div class="stars">${this.generateStars(experience.overallRating || 0)}</div>
            <span class="rating-value">${experience.overallRating || 0}/5</span>
          </div>
          <button class="delete-experience" data-experience-id="${experience.id}" title="Delete experience">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3,6 5,6 21,6"></polyline>
              <path d="M19,6L17,20a2,2 0 01-2,2H9a2,2 0 01-2-2L5,6"></path>
              <path d="M10,11v6"></path>
              <path d="M14,11v6"></path>
            </svg>
          </button>
        </div>
        <div class="experience-details">
          ${experience.dosage ? `<div class="dosage-info"><strong>Dosage:</strong> ${experience.dosage} ${experience.dosageUnit || ''}</div>` : ''}
          ${experience.setting ? `<div class="setting-info"><strong>Setting:</strong> ${experience.setting}</div>` : ''}
          ${experience.duration ? `<div class="duration-info"><strong>Duration:</strong> ${experience.duration}</div>` : ''}
          <div class="effects-info"><strong>Effects:</strong> ${effects}</div>
          ${experience.notes ? `<div class="notes-preview">${experience.notes.substring(0, 150)}${experience.notes.length > 150 ? '...' : ''}</div>` : ''}
        </div>
        <div class="experience-ratings">
          <div class="rating-item">
            <span class="rating-label">Intensity:</span>
            <div class="stars small">${this.generateStars(experience.intensityRating || 0)}</div>
          </div>
          <div class="rating-item">
            <span class="rating-label">Visual:</span>
            <div class="stars small">${this.generateStars(experience.visualRating || 0)}</div>
          </div>
          <div class="rating-item">
            <span class="rating-label">Body:</span>
            <div class="stars small">${this.generateStars(experience.bodyRating || 0)}</div>
          </div>
        </div>
      </div>
    `;
  }

  deleteExperience(experienceId) {
    const profile = this.getProfile();
    profile.experiences = profile.experiences.filter(exp => exp.id !== experienceId);
    
    if (this.saveProfile(profile)) {
      this.loadProfile(); // Refresh the main profile view
      
      // Refresh the experiences modal if it's open
      const modal = document.getElementById('view-experiences-modal');
      if (modal.style.display !== 'none') {
        const title = document.getElementById('experiences-modal-title').textContent;
        const substanceName = title.replace(' Experience History', '');
        this.openViewExperiencesModal(substanceName);
      }
    }
  }

  removeSubstance(substanceId) {
    if (!confirm('Are you sure you want to remove this substance from your profile?')) {
      return;
    }
    
    // Note: This should also remove all ratings for this substance
    // We'll let the backend handle this relationship
    
    this.removeSubstanceFromProfile(substanceId);
  }

  async removeSubstanceFromProfile(substanceId) {
    try {
      const response = await fetch(`${getBackendUrl()}/api/substances/${substanceId}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (response.ok) {
        await this.loadSubstances(); // Reload substances
        await this.loadRatings(); // Reload ratings in case any were deleted
        return true;
      } else {
        const error = await response.json();
        console.error('Failed to remove substance:', error);
        return false;
      }
    } catch (error) {
      console.error('Error removing substance:', error);
      return false;
    }
  }

  // Rating management methods
  openRatingModal(substanceName, category, chemicalName) {
    const modal = document.getElementById('rate-substance-modal');
    
    // Populate substance info
    document.getElementById('rating-substance-name').textContent = substanceName;
    
    // Reset form
    document.getElementById('rate-substance-form').reset();
    document.getElementById('substance-rating').value = '0';
    
    // Reset star display
    const stars = document.querySelectorAll('#star-rating .star');
    stars.forEach(star => star.classList.remove('active'));
    
    // Store substance info for submission
    modal.dataset.substanceName = substanceName;
    modal.dataset.category = category;
    modal.dataset.chemicalName = chemicalName;
    
    modal.style.display = 'block';
  }

  openViewRatingsModal(substanceName) {
    const modal = document.getElementById('view-ratings-modal');
    const title = document.getElementById('ratings-modal-title');
    const ratingsList = document.getElementById('ratings-list');
    const noRatings = document.getElementById('no-ratings');
    
    // Set title
    document.getElementById('ratings-substance-name').textContent = substanceName;
    
    // Get ratings for this substance
    const substanceRatings = this.ratings.filter(rating => 
      rating.substance_name.toLowerCase() === substanceName.toLowerCase()
    );
    
    if (substanceRatings.length === 0) {
      ratingsList.style.display = 'none';
      noRatings.style.display = 'block';
      
      // Set up the "add first rating" button
      const addFirstBtn = document.getElementById('add-first-rating');
      addFirstBtn.onclick = () => {
        this.closeModal(modal);
        this.openRatingModal(substanceName, '');
      };
    } else {
      ratingsList.style.display = 'block';
      noRatings.style.display = 'none';
      this.displayRatingsList(substanceRatings, ratingsList);
    }
    
    modal.style.display = 'block';
  }

  displayRatingsList(ratings, container) {
    // Sort ratings by stars given (highest first), then by date for ties
    const sortedRatings = ratings.sort((a, b) => {
      const ratingDiff = (b.rating || 0) - (a.rating || 0);
      if (ratingDiff !== 0) return ratingDiff;
      return new Date(b.created_at) - new Date(a.created_at);
    });
    
    // Create collapsible structure
    const ratingsHtml = `
      <div class="ratings-header" style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0; cursor: pointer; border-bottom: 1px solid #ddd; margin-bottom: 1rem;">
        <h4 style="margin: 0;">All Ratings (${sortedRatings.length})</h4>
        <span class="collapse-toggle" style="font-size: 1.2rem; transition: transform 0.2s ease;">▼</span>
      </div>
      <div class="ratings-content">
        ${sortedRatings.map(rating => this.createRatingCard(rating)).join('')}
      </div>
    `;
    
    container.innerHTML = ratingsHtml;
    
    // Add toggle function to the header
    const header = container.querySelector('.ratings-header');
    if (header) {
      header.onclick = () => {
        const content = container.querySelector('.ratings-content');
        const toggle = header.querySelector('.collapse-toggle');
        
        if (content.style.display === 'none') {
          content.style.display = 'block';
          toggle.style.transform = 'rotate(0deg)';
        } else {
          content.style.display = 'none';
          toggle.style.transform = 'rotate(-90deg)';
        }
      };
    }
    
    // Add event listeners for rating actions
    container.querySelectorAll('.delete-rating').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const ratingId = e.currentTarget.dataset.ratingId;
        if (confirm('Are you sure you want to delete this rating?')) {
          this.deleteRating(ratingId);
        }
      });
    });
  }

  createRatingCard(rating) {
    const date = new Date(rating.created_at).toLocaleDateString();
    const stars = this.generateStars(rating.rating || 0, 10);
    
    return `
      <div class="rating-card" data-rating-id="${rating.id}">
        <div class="rating-header">
          <div class="rating-date">${date}</div>
          <div class="rating-value">
            <div class="stars">${stars}</div>
            <span class="rating-number">${rating.rating || 0}/10</span>
          </div>
          <button class="delete-rating" data-rating-id="${rating.id}" title="Delete rating">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3,6 5,6 21,6"></polyline>
              <path d="M19,6L17,20a2,2 0 01-2,2H9a2,2 0 01-2-2L5,6"></path>
              <path d="M10,11v6"></path>
              <path d="M14,11v6"></path>
            </svg>
          </button>
        </div>
        
        ${rating.comment ? `
          <div class="rating-comment">
            <p>${rating.comment}</p>
          </div>
        ` : ''}
      </div>
    `;
  }

  async deleteRating(ratingId) {
    try {
      const response = await fetch(`${getBackendUrl()}/api/ratings/${ratingId}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (response.ok) {
        await this.loadRatings(); // Reload ratings
        this.updateSubstancesDisplay(this.substances);
        this.updateStats(this.substances);
        
        // Refresh the ratings modal if it's open
        const modal = document.getElementById('view-ratings-modal');
        if (modal.style.display !== 'none') {
          const substanceName = document.getElementById('ratings-substance-name').textContent;
          this.openViewRatingsModal(substanceName);
        }
        
        return true;
      } else {
        const error = await response.json();
        console.error('Failed to delete rating:', error);
        return false;
      }
    } catch (error) {
      console.error('Error deleting rating:', error);
      return false;
    }
  }

  // Wishlist modal methods
  openAddToWishlistModal() {
    const modal = document.getElementById('add-to-wishlist-modal');
    if (modal) {
      // Reset form
      document.getElementById('wishlist-substance-search').value = '';
      document.getElementById('wishlist-category').value = '';
      document.getElementById('wishlist-priority').value = '3';
      document.getElementById('wishlist-notes').value = '';
      
      // Setup substance search for wishlist
      this.setupWishlistSubstanceSearch();
      
      modal.style.display = 'block';
    }
  }

  openEditWishlistModal(itemId) {
    const modal = document.getElementById('edit-wishlist-modal');
    const wishlistItem = this.wishlist.find(item => item.id == itemId);
    
    if (modal && wishlistItem) {
      // Populate form with current values
      document.getElementById('edit-wishlist-priority').value = wishlistItem.priority;
      document.getElementById('edit-wishlist-notes').value = wishlistItem.notes || '';
      
      // Store the item ID for the update
      modal.dataset.itemId = itemId;
      
      modal.style.display = 'block';
    }
  }

  async handleAddToWishlistSubmit(event) {
    event.preventDefault();
    
    const searchInput = document.getElementById('wishlist-substance-search');
    const substanceName = searchInput.value.trim();
    const category = document.getElementById('wishlist-category').value;
    const priority = parseInt(document.getElementById('wishlist-priority').value);
    const notes = document.getElementById('wishlist-notes').value.trim();
    
    if (!substanceName) {
      alert('Please select a substance');
      return;
    }
    
    if (!priority || priority < 1 || priority > 5) {
      alert('Please select a valid priority (1-5)');
      return;
    }
    
    // Get chemical name from selected substance data if available
    let chemicalName = null;
    try {
      const selectedData = JSON.parse(searchInput.dataset.selectedSubstance || '{}');
      chemicalName = selectedData.chemicalName;
    } catch (e) {
      // If no selected data, that's fine
    }
    
    const wishlistData = {
      substanceName: substanceName,
      category: category || null,
      chemicalName: chemicalName,
      priority: priority,
      notes: notes || null
    };
    
    const success = await this.addToWishlist(wishlistData);
    if (success) {
      this.closeModal(document.getElementById('add-to-wishlist-modal'));
    }
  }

  async handleEditWishlistSubmit(event) {
    event.preventDefault();
    
    const modal = document.getElementById('edit-wishlist-modal');
    const itemId = modal.dataset.itemId;
    const priority = parseInt(document.getElementById('edit-wishlist-priority').value);
    const notes = document.getElementById('edit-wishlist-notes').value.trim();
    
    if (!priority || priority < 1 || priority > 5) {
      alert('Please select a valid priority (1-5)');
      return;
    }
    
    const updates = {
      priority: priority,
      notes: notes || null
    };
    
    const success = await this.updateWishlistItem(itemId, updates);
    if (success) {
      this.closeModal(modal);
    }
  }

  // Utility methods
  closeModal(modal) {
    if (modal) {
      modal.style.display = 'none';
    }
  }
}

// Initialize profile manager
const profileManager = new ProfileManager();