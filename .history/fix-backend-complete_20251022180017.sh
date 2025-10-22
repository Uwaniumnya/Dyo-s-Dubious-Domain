# Test if backend is responding correctly now
curl -I -k https://62.169.21.243/api/auth/check

# Check the response body to see what's happening
curl -k https://62.169.21.243/api/auth/check

# Test a simple backend endpoint
curl -k https://62.169.21.243/api/test 2>/dev/null || echo "No test endpoint"#!/bin/bash

# Backend Status and Fix Script
# This script checks the backend status and applies all necessary fixes

echo "🔧 CCCC Backend Status & Fix Script"
echo "===================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're running as root
if [ "$EUID" -ne 0 ]; then
    print_error "This script must be run as root (use sudo)"
    exit 1
fi

echo
print_status "Step 1: Checking PM2 Backend Status"
echo "====================================="

# Check if PM2 is installed
if ! command -v pm2 &> /dev/null; then
    print_error "PM2 is not installed!"
    print_status "Installing PM2..."
    npm install -g pm2
fi

# Check PM2 processes
print_status "Current PM2 processes:"
pm2 list

# Check if CCCC backend is running
if pm2 describe cccc-backend &> /dev/null; then
    print_success "CCCC backend process exists"
    
    # Get process status
    STATUS=$(pm2 describe cccc-backend | grep "status" | awk '{print $4}')
    print_status "Backend status: $STATUS"
    
    if [ "$STATUS" != "online" ]; then
        print_warning "Backend is not online, restarting..."
        pm2 restart cccc-backend
    fi
else
    print_error "CCCC backend process not found!"
    print_status "Starting backend..."
    
    # Check if server.js exists
    if [ -f "/var/www/cccc/server.js" ]; then
        cd /var/www/cccc
        pm2 start server.js --name cccc-backend
        print_success "Backend started"
    else
        print_error "server.js not found in /var/www/cccc"
        print_status "Available files in /var/www/cccc:"
        ls -la /var/www/cccc/ || print_error "Directory /var/www/cccc not found"
    fi
fi

echo
print_status "Step 2: Checking Port Accessibility"
echo "==================================="

# Check if port 3080 is listening
print_status "Checking if backend is listening on port 3080..."
if netstat -tulpn | grep ":3080" > /dev/null; then
    print_success "Port 3080 is listening"
    netstat -tulpn | grep ":3080"
else
    print_error "Port 3080 is not listening"
    print_status "Checking all listening ports:"
    netstat -tulpn | grep LISTEN
fi

echo
print_status "Step 3: Testing Backend Connectivity"
echo "===================================="

# Test backend locally
print_status "Testing backend locally..."
if curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:3080/api/auth/check | grep -q "200\|401\|403"; then
    print_success "Backend is responding locally"
else
    print_error "Backend is not responding locally"
    print_status "Checking backend logs..."
    pm2 logs cccc-backend --lines 10
fi

echo
print_status "Step 4: Checking Nginx Configuration"
echo "===================================="

# Check if our CORS fix has been applied
if [ -f "nginx-cccc-backend-fixed.conf" ]; then
    print_status "Applying latest CORS-fixed Nginx configuration..."
    
    # Backup current config
    cp /etc/nginx/sites-available/cccc-backend /etc/nginx/sites-available/cccc-backend.backup.$(date +%s)
    
    # Copy new config
    cp nginx-cccc-backend-fixed.conf /etc/nginx/sites-available/cccc-backend
    
    # Test nginx config
    if nginx -t; then
        print_success "Nginx configuration is valid"
        print_status "Reloading Nginx..."
        systemctl reload nginx
        print_success "Nginx reloaded"
    else
        print_error "Nginx configuration test failed"
        print_status "Restoring backup..."
        cp /etc/nginx/sites-available/cccc-backend.backup.* /etc/nginx/sites-available/cccc-backend
    fi
else
    print_warning "nginx-cccc-backend-fixed.conf not found in current directory"
    print_status "Current Nginx configuration:"
    cat /etc/nginx/sites-available/cccc-backend
fi

echo
print_status "Step 5: Testing Full HTTPS Connection"
echo "====================================="

# Test HTTPS endpoint
print_status "Testing HTTPS endpoint..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -k https://62.169.21.243/api/auth/check)
print_status "HTTPS Response code: $HTTP_CODE"

if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "401" ] || [ "$HTTP_CODE" = "403" ]; then
    print_success "HTTPS endpoint is working correctly"
elif [ "$HTTP_CODE" = "502" ]; then
    print_error "502 Bad Gateway - Nginx can't reach backend"
else
    print_warning "Unexpected response code: $HTTP_CODE"
fi

echo
print_status "Step 6: Final Status Summary"
echo "============================"

# Summary
pm2 list
systemctl status nginx --no-pager -l

echo
print_status "Backend fix script completed!"
echo "Check the output above for any remaining issues."
echo
print_status "Next steps:"
echo "1. Test the login page at https://uwaniumnya.github.io/Dyo-s-Dubious-Domain/login/"
echo "2. Check browser console for any remaining CORS errors"
echo "3. If issues persist, check PM2 logs: pm2 logs cccc-backend"