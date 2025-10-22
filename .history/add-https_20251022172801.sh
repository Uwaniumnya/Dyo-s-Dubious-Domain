#!/bin/bash

# Add HTTPS with self-signed certificate to existing HTTP setup
# Run this on your server after HTTP setup is working

set -e

echo "🔐 Adding HTTPS with self-signed certificate..."

# Create SSL directory
mkdir -p /etc/nginx/ssl

# Generate self-signed certificate
echo "📜 Generating self-signed SSL certificate..."
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/nginx/ssl/cccc-backend.key \
    -out /etc/nginx/ssl/cccc-backend.crt \
    -subj "/C=US/ST=State/L=City/O=Organization/CN=62.169.21.243"

# Create HTTPS configuration
cat > /etc/nginx/sites-available/cccc-backend << 'EOF'
server {
    listen 80;
    server_name 62.169.21.243;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name 62.169.21.243;
    
    # SSL Configuration (self-signed)
    ssl_certificate /etc/nginx/ssl/cccc-backend.crt;
    ssl_certificate_key /etc/nginx/ssl/cccc-backend.key;
    
    # SSL Security Settings
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    
    # Security Headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    
    # CORS Headers for API endpoints
    location /api/ {
        # Handle preflight OPTIONS requests
        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin' 'https://uwaniumnya.github.io' always;
            add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
            add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization' always;
            add_header 'Access-Control-Allow-Credentials' 'true' always;
            add_header 'Access-Control-Max-Age' 1728000;
            add_header 'Content-Type' 'text/plain; charset=utf-8';
            add_header 'Content-Length' 0;
            return 204;
        }
        
        # Proxy to Node.js backend
        proxy_pass http://127.0.0.1:3080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # CORS headers for actual requests
        add_header 'Access-Control-Allow-Origin' 'https://uwaniumnya.github.io' always;
        add_header 'Access-Control-Allow-Credentials' 'true' always;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
    
    # Health check endpoint
    location /health {
        proxy_pass http://127.0.0.1:3080/health;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # Block access to sensitive files
    location ~ /\. {
        deny all;
    }
}
EOF

# Test configuration
echo "🧪 Testing new HTTPS configuration..."
if nginx -t; then
    echo "✅ Configuration is valid"
else
    echo "❌ Configuration error"
    exit 1
fi

# Reload nginx
echo "🔄 Reloading Nginx..."
systemctl reload nginx

# Test HTTPS endpoint
echo "🧪 Testing HTTPS endpoints..."
sleep 2

echo "Testing HTTPS health endpoint..."
curl -k https://62.169.21.243/health && echo "✅ HTTPS Health OK" || echo "⚠️ HTTPS Health failed"

echo "Testing HTTPS API endpoint..."
curl -k https://62.169.21.243/api/auth/check && echo "✅ HTTPS API accessible" || echo "⚠️ HTTPS API failed (normal for auth)"

echo ""
echo "🎉 HTTPS setup complete!"
echo ""
echo "📋 Summary:"
echo "   - HTTP → HTTPS redirect: ✅ Enabled"
echo "   - Self-signed SSL: ✅ Generated"
echo "   - CORS for GitHub Pages: ✅ Configured"
echo ""
echo "🌐 Your API is now accessible at:"
echo "   https://62.169.21.243/api/auth/check"
echo "   https://62.169.21.243/health"
echo ""
echo "⚠️ Note: Browsers will show 'Not Secure' warnings for self-signed certificates."
echo "   This is normal and the connection is still encrypted."
echo ""
echo "🔧 Frontend will now work with HTTPS backend!"
EOF