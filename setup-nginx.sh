#!/bin/bash

# CCCC Backend Nginx Setup Script
# Run this script on your server (62.169.21.243) as root or with sudo

set -e  # Exit on any error

echo "🚀 Setting up Nginx reverse proxy for CCCC Backend..."

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo "❌ Please run this script as root or with sudo"
    exit 1
fi

# Install Nginx if not already installed
if ! command -v nginx &> /dev/null; then
    echo "📦 Installing Nginx..."
    apt update
    apt install -y nginx
else
    echo "✅ Nginx is already installed"
fi

# Stop nginx temporarily
systemctl stop nginx

# Backup existing default config if it exists
if [ -f /etc/nginx/sites-enabled/default ]; then
    echo "🔄 Backing up existing default config..."
    mv /etc/nginx/sites-enabled/default /etc/nginx/sites-enabled/default.backup
fi

# Copy our configuration
echo "📝 Installing CCCC backend configuration..."
cp nginx-cccc-backend.conf /etc/nginx/sites-available/cccc-backend

# Enable the site
ln -sf /etc/nginx/sites-available/cccc-backend /etc/nginx/sites-enabled/cccc-backend

# Test Nginx configuration
echo "🧪 Testing Nginx configuration..."
if nginx -t; then
    echo "✅ Nginx configuration is valid"
else
    echo "❌ Nginx configuration has errors. Please check the config file."
    exit 1
fi

# Install Certbot for SSL certificates (Let's Encrypt)
if ! command -v certbot &> /dev/null; then
    echo "🔐 Installing Certbot for SSL certificates..."
    apt install -y certbot python3-certbot-nginx
else
    echo "✅ Certbot is already installed"
fi

# Generate SSL certificate
echo "🔐 Generating SSL certificate..."
echo "Note: This will modify the Nginx config to include SSL settings"

# First, start nginx without SSL to pass domain verification
systemctl start nginx

# Get SSL certificate
certbot --nginx -d 62.169.21.243 --non-interactive --agree-tos --email admin@62.169.21.243 || {
    echo "⚠️  SSL certificate generation failed. You can run this manually later:"
    echo "   sudo certbot --nginx -d 62.169.21.243"
    echo "   For now, the site will work with HTTP only."
}

# Start/restart services
echo "🔄 Starting services..."
systemctl enable nginx
systemctl restart nginx

# Check if PM2 backend is running
if pgrep -f "cccc-backend" > /dev/null; then
    echo "✅ CCCC Backend is running"
else
    echo "⚠️  CCCC Backend is not running. Starting it..."
    cd /var/www/cccc
    pm2 start ecosystem.config.js --env production
fi

# Verify everything is working
echo "🧪 Testing the setup..."

# Test HTTP redirect
echo "Testing HTTP redirect..."
curl -I http://62.169.21.243/api/auth/check 2>/dev/null | head -1

# Test API endpoint
echo "Testing API endpoint..."
curl -I https://62.169.21.243/api/auth/check 2>/dev/null | head -1 || {
    echo "⚠️  HTTPS test failed. This is normal if SSL certificate generation failed."
    echo "   You can set up SSL manually later with: sudo certbot --nginx -d 62.169.21.243"
}

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📋 Summary:"
echo "   - Nginx reverse proxy: ✅ Configured"
echo "   - HTTP → HTTPS redirect: ✅ Configured"
echo "   - CORS for GitHub Pages: ✅ Configured"
echo "   - SSL Certificate: 🔐 Check above for status"
echo ""
echo "🔧 Manual steps if SSL failed:"
echo "   1. Run: sudo certbot --nginx -d 62.169.21.243"
echo "   2. Follow the prompts to get your SSL certificate"
echo ""
echo "🌐 Your API should now be accessible at:"
echo "   https://62.169.21.243/api/auth/check"
echo ""
echo "📝 Next steps:"
echo "   1. Test the API from your GitHub Pages site"
echo "   2. Monitor logs: sudo tail -f /var/log/nginx/access.log"
echo "   3. Check backend logs: pm2 logs cccc-backend"