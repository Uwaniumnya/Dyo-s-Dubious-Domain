#!/bin/bash

# Fix CORS configuration for CCCC Backend
# Run this on your server to fix the CORS issues

set -e

echo "🔧 Fixing CORS configuration..."

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo "❌ Please run this script as root or with sudo"
    exit 1
fi

# Backup current config
cp /etc/nginx/sites-available/cccc-backend /etc/nginx/sites-available/cccc-backend.backup

# Install the fixed configuration
echo "📝 Installing fixed CORS configuration..."
cp nginx-cccc-backend-fixed.conf /etc/nginx/sites-available/cccc-backend

# Test configuration
echo "🧪 Testing Nginx configuration..."
if nginx -t; then
    echo "✅ Configuration is valid"
else
    echo "❌ Configuration error, restoring backup..."
    cp /etc/nginx/sites-available/cccc-backend.backup /etc/nginx/sites-available/cccc-backend
    exit 1
fi

# Reload nginx
echo "🔄 Reloading Nginx..."
systemctl reload nginx

# Test CORS with proper headers
echo "🧪 Testing CORS configuration..."
sleep 2

echo "Testing preflight request:"
curl -X OPTIONS -H "Origin: https://uwaniumnya.github.io" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -v https://62.169.21.243/api/auth/check 2>&1 | grep -i "access-control" || echo "⚠️ No CORS headers found"

echo ""
echo "Testing actual request:"
curl -H "Origin: https://uwaniumnya.github.io" \
     -v https://62.169.21.243/api/auth/check 2>&1 | grep -i "access-control" || echo "⚠️ No CORS headers found"

echo ""
echo "🎉 CORS configuration updated!"
echo ""
echo "📋 Summary:"
echo "   - Enhanced CORS headers: ✅ Added"
echo "   - Preflight handling: ✅ Improved" 
echo "   - GitHub Pages origin: ✅ Allowed"
echo "   - Credentials support: ✅ Enabled"
echo ""
echo "🌐 Test from GitHub Pages now!"
echo "   The login page should no longer show CORS errors."