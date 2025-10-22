#!/bin/bash

# Fix mixed content issues - remove HTTP fallbacks from HTTPS pages

echo "🔧 Fixing mixed content issues in frontend files..."

# Remove HTTP fallback from login page
sed -i "s/'http:\/\/62\.169\.21\.243',//g" /tmp/login-fix.njk 2>/dev/null || true

# Create fixed login file
cat > /tmp/login-fix.js << 'EOF'
const fs = require('fs');

// Read login file
let content = fs.readFileSync('src/login.njk', 'utf8');

// Remove HTTP backends array entries
content = content.replace(
  /\/\/ Try both HTTPS and HTTP backends\s*const backends = \[\s*'https:\/\/62\.169\.21\.243',\s*'http:\/\/62\.169\.21\.243'\s*\];/g,
  "// HTTPS backend only (no mixed content)\n  const backends = [\n    'https://62.169.21.243'\n  ];"
);

// Write back
fs.writeFileSync('src/login.njk', content);
console.log('✅ Fixed login.njk mixed content');
EOF

# Run the fix
node /tmp/login-fix.js

echo "✅ Mixed content fixes applied"