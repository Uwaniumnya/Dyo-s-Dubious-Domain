# GitHub Pages Deployment Guide

## Current Status
✅ GitHub Actions workflow created  
✅ API URLs updated for production  
🔄 Waiting for domain configuration  

## Next Steps

### 1. Configure GitHub Pages
1. Go to repository Settings → Pages
2. Select "GitHub Actions" as source
3. Workflow will automatically deploy on push to main branch

### 2. Update Backend Domain
Replace `your-contabo-domain.com` in these files with your actual domain:
- `src/assets/js/profile.js` (line 8)
- `src/assets/js/friends.js` (line 8)

Example: If your domain is `example.com`, change to:
```javascript
return 'https://example.com';
```

### 3. Update Backend CORS Settings
Add your GitHub Pages URL to the CORS configuration in `server.js`:
```javascript
// In server.js, update FRONTEND_URL environment variable
FRONTEND_URL=https://username.github.io/repository-name
```

### 4. Deploy Your Site
1. Update the domain in JS files
2. Commit and push changes
3. GitHub Actions will automatically build and deploy
4. Your site will be available at: `https://uwaniumnya.github.io/Dyo-s-Dubious-Domain`

## Architecture Overview
- **Frontend**: GitHub Pages (Static hosting)
- **Backend**: Contabo server (Express.js + SQLite)
- **Build**: GitHub Actions (Eleventy static site generator)

## Troubleshooting
- Check GitHub Actions tab for build logs
- Verify CORS settings if API calls fail
- Ensure domain names match in all configurations