#!/bin/bash

# Simple test script to verify HTTPS setup
# Run this on your server after running add-https.sh

echo "🧪 Testing HTTPS endpoints..."

echo "1. Testing Health endpoint:"
curl -k -s https://62.169.21.243/health && echo " ✅ Health endpoint OK" || echo " ❌ Health endpoint failed"

echo ""
echo "2. Testing API auth endpoint:"  
curl -k -s https://62.169.21.243/api/auth/check && echo " ✅ API endpoint accessible" || echo " ⚠️ API endpoint returned error (normal for auth/check without credentials)"

echo ""
echo "3. Testing HTTP redirect:"
curl -s -o /dev/null -w "%{http_code}" http://62.169.21.243/health

echo ""
echo "4. Checking Nginx status:"
systemctl status nginx --no-pager -l

echo ""
echo "5. Checking backend status:"
pm2 status

echo ""
echo "🎯 If health endpoint returns JSON and API endpoint is accessible, HTTPS is working!"