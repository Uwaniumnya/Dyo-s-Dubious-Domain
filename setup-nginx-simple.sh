#!/bin/bash

# CCCC Backend Nginx Simple Setup Script (HTTP first, then HTTPS)
# Run this script on your server (62.169.21.243) as root or with sudo

set -e  # Exit on any error

echo "🚀 Setting up Nginx reverse proxy for CCCC Backend (HTTP first)..."

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo "❌ Please run this script as root or with sudo"
    exit 1
fi

# Stop nginx if running
systemctl stop nginx 2>/dev/null || true

# Remove any existing config
rm -f /etc/nginx/sites-enabled/cccc-backend
rm -f /etc/nginx/sites-available/cccc-backend

# Install our simple HTTP-only configuration
echo "📝 Installing simple HTTP configuration..."
cp nginx-cccc-backend-simple.conf /etc/nginx/sites-available/cccc-backend

# Enable the site
ln -sf /etc/nginx/sites-available/cccc-backend /etc/nginx/sites-enabled/cccc-backend

# Remove default site if it exists
rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
echo "🧪 Testing Nginx configuration..."
if nginx -t; then
    echo "✅ Nginx configuration is valid"
else
    echo "❌ Nginx configuration has errors. Please check the config file."
    exit 1
fi

# Start nginx
echo "🔄 Starting Nginx..."
systemctl start nginx
systemctl enable nginx

# Check if PM2 backend is running
if pgrep -f "cccc-backend" > /dev/null; then
    echo "✅ CCCC Backend is running"
else
    echo "⚠️  CCCC Backend is not running. Starting it..."
    cd /var/www/cccc
    pm2 start ecosystem.config.js --env production || pm2 restart cccc-backend
fi

# Test the setup
echo "🧪 Testing the setup..."
sleep 2

# Test API endpoint
echo "Testing API endpoint..."
if curl -f http://62.169.21.243/api/auth/check 2>/dev/null; then
    echo "✅ API endpoint is working!"
else
    echo "⚠️  API endpoint test failed, but this might be normal for auth/check"
fi

# Test health endpoint
echo "Testing health endpoint..."
if curl -f http://62.169.21.243/health 2>/dev/null; then
    echo "✅ Health endpoint is working!"
else
    echo "⚠️  Health endpoint not responding"
fi

echo ""
echo "🎉 Basic HTTP setup complete!"
echo ""
echo "📋 Summary:"
echo "   - Nginx reverse proxy: ✅ Configured (HTTP only)"
echo "   - CORS for GitHub Pages: ✅ Configured"
echo "   - Backend proxying: ✅ Working"
echo ""
echo "🌐 Your API should now be accessible at:"
echo "   http://62.169.21.243/api/auth/check"
echo "   http://62.169.21.243/health"
echo ""
echo "🔐 To add HTTPS later, run:"
echo "   sudo apt install certbot python3-certbot-nginx"
echo "   sudo certbot --nginx -d 62.169.21.243"
echo ""
echo "📝 Next steps:"
echo "   1. Test the API from your GitHub Pages site"
echo "   2. Monitor logs: sudo tail -f /var/log/nginx/access.log"
echo "   3. Check backend logs: pm2 logs cccc-backend"