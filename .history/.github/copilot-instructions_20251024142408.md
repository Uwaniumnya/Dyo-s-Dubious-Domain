# CCCC - Comprehensive Chemical Compendium & Community

## Project Architecture

This is a **dual-stack application** combining an Eleventy (11ty) static site generator for the frontend with an Express.js backend for user management. The project serves as a comprehensive substance information database with user profiles and experience tracking.

### Core Components
- **Frontend**: Eleventy static site (`src/` → `public/`) with Nunjucks templates
- **Backend**: Express.js API server (`server.js`) with SQLite database
- **Search**: Client-side Lunr.js search with comprehensive substance data
- **Content**: 1500+ substance profiles in structured Nunjucks format

## Development Workflow

### Essential Commands
```bash
npm run dev          # Start both frontend (dev server) + backend API
npm run build        # Build static site to public/
npm run server       # Backend only (port 3000)
npm start           # Frontend dev server only (port 8080)
npm run prod        # Build + start production server
```

### Dual Development Pattern
- Frontend serves on `localhost:8080` (Eleventy dev server)
- Backend API serves on `localhost:3000` (Express server)
- Both run concurrently via `npm run dev` using `concurrently`
- Static files in `public/` are served by both servers

## Content Management Patterns

### Substance Profile Structure
Each substance is a `.njk` file in `src/dyos-domain/substances/` with frontmatter:
```yaml
---
title: "Substance Name - Complete Profile"
substance: "Substance Name"
chemical_name: "Chemical Name"
category: "Category"
legal_status: "Status"
description: "Brief description"
permalink: "/dyos-domain/substances/slug/"
---
```

### Search Integration
- `public/search.json` is auto-generated from all substance profiles
- Alternative names are extracted via custom Eleventy filter `extractAlternativeNames`
- Search indexes: title (10×), alternativeNames (15×), tags (8×), category (2×)

### File Organization
- **Substance profiles**: `src/dyos-domain/substances/*.njk`
- **Category pages**: `src/dyos-domain/*.njk` (browse, cannabinoids, etc.)
- **Templates**: `src/_includes/base.njk` (main layout)
- **Assets**: `src/assets/` (images, JS, CSS) → copied to `public/assets/`

## Database & User System

### SQLite Schema
- `users` - Authentication (username, email, password, created_at)
- `user_profiles` - Display profiles (display_name, bio, location, website, avatar_url, banner_url)
- `user_experiences` - Substance experience logs with ratings and comments
- `user_substances` - User's substance collection (substance_name, added_at)
- `user_ratings` - Substance ratings (1-10 scale) with optional comments and timestamps
- `wishlist` - User wishlist for substances to try (priority, notes)

### Backend Server Architecture (`server.js`)
- **Framework**: Express.js with comprehensive middleware stack
- **Database**: SQLite with automatic backups every 6 hours (10 backup retention)
- **Authentication**: JWT tokens in secure HTTP-only cookies
- **Image Storage**: Base64 encoded images stored directly in database
- **CORS**: Configured for cross-origin requests from GitHub Pages
- **Security**: Trust proxy settings for HTTPS detection behind nginx

### API Authentication System
- JWT tokens stored in HTTP-only cookies (`auth_token`)
- Middleware: `authenticateToken()` for protected routes
- Session management with express-session
- Automatic HTTPS redirect for mobile browsers
- Enhanced cookie security with dynamic protocol detection

### Complete API Endpoints
#### Authentication
- `POST /api/register` - User registration with validation
- `POST /api/login` - User login with enhanced mobile support
- `POST /api/logout` - Secure logout with cookie clearing
- `GET /api/auth/check` - Verify authentication status

#### User Profile Management
- `GET /api/profile` - Get complete user profile with images
- `PUT /api/profile` - Update profile (bio, images, display name)
- Profile images automatically resized and stored as base64

#### Substance Collections
- `GET /api/substances` - Get user's substance collection
- `POST /api/substances` - Add substance to collection
- `DELETE /api/substances/:id` - Remove substance from collection

#### Rating System
- `GET /api/ratings` - Get all user ratings
- `POST /api/ratings` - Submit substance rating (1-10) with comments
- Ratings include timestamp and are used for analytics

#### Wishlist Management
- `GET /api/wishlist` - Get user's substance wishlist
- `POST /api/wishlist` - Add substance to wishlist with priority
- `PUT /api/wishlist/:id` - Update wishlist item
- `DELETE /api/wishlist/:id` - Remove from wishlist

#### Debug & Monitoring
- `GET /debug/auth-info` - Mobile authentication debugging endpoint
- Comprehensive logging for authentication and profile operations

## Eleventy Configuration Specifics

### Custom Collections
```javascript
// Substances collection (sorted alphabetically)
eleventyConfig.addCollection("substances", function(collectionApi) {
  return collectionApi.getFilteredByTag("substance-profile")
    .sort((a, b) => a.data.substance.localeCompare(b.data.substance));
});
```

### Custom Filters
- `extractAlternativeNames` - Parses HTML content for substance aliases
- Enables comprehensive search functionality across naming variations

### Pass-through Copy
- `src/style.css` → `public/style.css`
- `src/assets/**` → `public/assets/**`
- `node_modules/lunr/lunr.min.js` → `public/js/lunr.min.js`

## Deployment & Production

### Production Server Setup (Contabo VPS)
- **Server**: Ubuntu VPS at `vmd175967.contaboserver.net`
- **Process Manager**: PM2 for backend process management
- **Web Server**: Nginx as reverse proxy with SSL termination
- **SSL**: Let's Encrypt certificates with automatic renewal
- **Domain**: HTTPS enforced for all traffic

### PM2 Configuration (`ecosystem.config.js`)
- Process name: `cccc-backend`
- Single cluster instance for backend stability
- Logs to `/root/.pm2/logs/cccc-backend-*.log`
- Auto-restart with delay for stability
- Environment detection and configuration

### Nginx Configuration
- **Static Files**: Served from `/var/www/cccc/public/`
- **API Proxy**: `/api/*` requests proxied to `localhost:3000`
- **SSL Setup**: Full HTTPS with proper header forwarding
- **CORS**: Headers configured for GitHub Pages frontend
- **Proxy Headers**: Proper HTTPS detection with trust proxy
- **Security**: HSTS, XSS protection, content type sniffing prevention

### Backend Environment Configuration
```bash
NODE_ENV=production
PORT=3000
JWT_SECRET=<64-char-random-string>
DB_PATH=./database.sqlite
FRONTEND_URL=https://uwaniumnya.github.io
IS_PRODUCTION=true
```

### Database Backup System
- **Automatic Backups**: Every 6 hours via cron-style scheduler
- **Retention**: 10 most recent backups kept
- **Location**: `/var/www/cccc/backups/`
- **Format**: `users_backup_YYYY-MM-DDTHH-mm-ss-sssZ.db`
- **Logging**: Backup creation logged to console

### Deployment Workflow
1. **Local Development**: Changes made and tested locally
2. **Git Push**: Code pushed to GitHub repository
3. **Server Update**: `git pull origin main` on production server
4. **Process Restart**: `pm2 restart cccc-backend` to apply changes
5. **Nginx Reload**: `systemctl reload nginx` for config changes

### Mobile Authentication Fixes
- **HTTPS Detection**: Enhanced proxy header parsing
- **Cookie Security**: Dynamic secure flag based on protocol
- **Mobile Redirects**: Automatic HTTP→HTTPS for mobile browsers
- **Debug Tools**: Mobile-specific debugging endpoints

## Content Patterns

### Substance Categories
- psychedelics, stimulants, depressants, dissociatives
- cannabinoids, empathogens, nootropics, opioids
- Each category has browse page + individual substance profiles

### Frontend JavaScript Integration
- `search.js` - Lunr.js search implementation
- `substance-integration.js` - Add substances to user profiles
- `profile.js` - User profile management
- `interaction-checker.js` - Drug interaction warnings

## Common Development Tasks

### Adding New Substances
1. Create `.njk` file in `src/dyos-domain/substances/`
2. Follow existing frontmatter structure
3. Include `<div class="alternative-names">` with aliases
4. Add to appropriate category pages if needed
5. Images go in `src/assets/substances/`

### Database Changes
- Modify schema in `initializeDatabase()` function
- Handle existing data migration manually
- Test with fresh database creation

### Frontend Changes
- Templates in `src/` with `.njk` extension
- Static assets copied from `src/assets/`
- CSS in `src/style.css` (single file approach)
- Run `npm run build` to regenerate `public/`

## Security Considerations
- Passwords hashed with bcryptjs (10 rounds)
- CORS configured for specific origins
- Input validation on all API endpoints
- SQL injection prevention with parameterized queries
- XSS prevention through proper template escaping