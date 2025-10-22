# 🔧 Nginx Reverse Proxy Setup for CCCC Backend

This setup configures Nginx as a reverse proxy to make your Node.js backend accessible via HTTPS on standard ports.

## 📋 Prerequisites

- Ubuntu/Debian server with root access
- Domain/IP: `62.169.21.243`
- Node.js backend running on port 3080 via PM2
- SSH access to the server

## 🚀 Installation Steps

### 1. Upload Files to Server

```bash
# Copy files to your server
scp nginx-cccc-backend.conf root@62.169.21.243:/var/www/cccc/
scp setup-nginx.sh root@62.169.21.243:/var/www/cccc/
```

### 2. Run the Setup Script

```bash
# SSH into your server
ssh root@62.169.21.243

# Navigate to your project directory
cd /var/www/cccc

# Make the script executable
chmod +x setup-nginx.sh

# Run the setup script
sudo ./setup-nginx.sh
```

## 🔍 What the Setup Does

1. **Installs Nginx** (if not already installed)
2. **Configures reverse proxy** to forward `/api/*` requests to your Node.js backend
3. **Sets up HTTPS redirect** (HTTP → HTTPS)
4. **Configures CORS** for GitHub Pages domain
5. **Installs SSL certificate** via Let's Encrypt
6. **Adds security headers**
7. **Creates health check endpoint**

## 🌐 Architecture

```
GitHub Pages (Frontend)
       ↓ HTTPS
62.169.21.243:443 (Nginx)
       ↓ HTTP
127.0.0.1:3080 (Node.js Backend)
```

## 🧪 Testing

After setup, test these endpoints:

```bash
# Health check
curl https://62.169.21.243/health

# API endpoint
curl https://62.169.21.243/api/auth/check

# HTTP redirect test
curl -I http://62.169.21.243/api/auth/check
```

## 📝 Configuration Details

### Nginx Features
- ✅ HTTP to HTTPS redirect
- ✅ CORS headers for GitHub Pages
- ✅ Security headers (HSTS, XSS protection, etc.)
- ✅ Proxy timeouts and connection handling
- ✅ SSL/TLS configuration
- ✅ Static file serving (optional)

### CORS Configuration
- **Allowed Origin**: `https://uwaniumnya.github.io`
- **Credentials**: Enabled for cookies/authentication
- **Methods**: GET, POST, PUT, DELETE, OPTIONS
- **Headers**: Standard + Authorization

## 🔧 Manual SSL Setup (if automated setup fails)

If the automatic SSL certificate generation fails:

```bash
# Install certbot manually
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d 62.169.21.243

# Test auto-renewal
sudo certbot renew --dry-run
```

## 📊 Monitoring

### Check Nginx Status
```bash
sudo systemctl status nginx
sudo nginx -t  # Test configuration
```

### Check Backend Status
```bash
pm2 status
pm2 logs cccc-backend
```

### View Logs
```bash
# Nginx access logs
sudo tail -f /var/log/nginx/access.log

# Nginx error logs
sudo tail -f /var/log/nginx/error.log

# Backend logs
pm2 logs cccc-backend
```

## 🔥 Troubleshooting

### Common Issues

1. **SSL Certificate Failed**
   ```bash
   sudo certbot --nginx -d 62.169.21.243
   ```

2. **Backend Not Responding**
   ```bash
   pm2 restart cccc-backend
   curl http://127.0.0.1:3080/health
   ```

3. **CORS Errors**
   - Check Nginx config: `/etc/nginx/sites-available/cccc-backend`
   - Verify origin URL matches exactly

4. **Port 443 Not Accessible**
   ```bash
   sudo ufw allow 443
   sudo ufw allow 80
   ```

### Configuration Files

- **Nginx Config**: `/etc/nginx/sites-available/cccc-backend`
- **Nginx Enabled**: `/etc/nginx/sites-enabled/cccc-backend`
- **SSL Certificates**: `/etc/letsencrypt/live/62.169.21.243/`

## 🎯 Next Steps

After successful setup:

1. ✅ **Test from GitHub Pages**: Visit your login page
2. ✅ **Monitor logs**: Check for any errors
3. ✅ **Set up monitoring**: Consider tools like Uptime Robot
4. ✅ **Backup**: Save your SSL certificates and Nginx config

## 🔄 Updates

To update the Nginx configuration:

```bash
# Edit the config
sudo nano /etc/nginx/sites-available/cccc-backend

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

---

**🎉 Once complete, your backend will be accessible at `https://62.169.21.243/api/*` with proper SSL and CORS configuration!**