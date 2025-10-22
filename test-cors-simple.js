// Simple Node.js script to test CORS headers directly
// Run with: node test-cors-simple.js

const https = require('https');
const http = require('http');

// Test both HTTP and HTTPS
const backends = [
  { protocol: 'https', port: 443, url: 'https://62.169.21.243' },
  { protocol: 'http', port: 80, url: 'http://62.169.21.243' }
];

function testBackend(backend) {
  return new Promise((resolve, reject) => {
    console.log(`\n🔍 Testing ${backend.url}...`);
    
    const options = {
      hostname: '62.169.21.243',
      port: backend.port,
      path: '/api/auth/check',
      method: 'GET',
      headers: {
        'Origin': 'https://uwaniumnya.github.io',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 5000
    };
    
    // Disable SSL verification for self-signed certificates
    if (backend.protocol === 'https') {
      options.rejectUnauthorized = false;
    }
    
    const lib = backend.protocol === 'https' ? https : http;
    
    const req = lib.request(options, (res) => {
      console.log(`Status: ${res.statusCode}`);
      console.log('Headers:', JSON.stringify(res.headers, null, 2));
      
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log('Response:', data);
        resolve({ 
          url: backend.url, 
          status: res.statusCode, 
          headers: res.headers, 
          data: data,
          success: true
        });
      });
    });
    
    req.on('error', (err) => {
      console.log(`❌ Error: ${err.message}`);
      resolve({ 
        url: backend.url, 
        error: err.message, 
        success: false 
      });
    });
    
    req.on('timeout', () => {
      console.log('⏰ Request timed out');
      req.destroy();
      resolve({ 
        url: backend.url, 
        error: 'Timeout', 
        success: false 
      });
    });
    
    req.end();
  });
}

async function testAllBackends() {
  console.log('🧪 Testing CORS headers from all backends...\n');
  
  for (const backend of backends) {
    const result = await testBackend(backend);
    
    if (result.success) {
      console.log(`✅ ${result.url} is accessible`);
      
      // Check for CORS headers
      const corsHeaders = [
        'access-control-allow-origin',
        'access-control-allow-credentials',
        'access-control-allow-methods',
        'access-control-allow-headers'
      ];
      
      console.log('\n🔍 CORS Headers:');
      corsHeaders.forEach(header => {
        if (result.headers[header]) {
          console.log(`  ${header}: ${result.headers[header]}`);
        } else {
          console.log(`  ${header}: ❌ MISSING`);
        }
      });
    } else {
      console.log(`❌ ${result.url} failed: ${result.error}`);
    }
    
    console.log('\n' + '='.repeat(50));
  }
}

testAllBackends().catch(console.error);