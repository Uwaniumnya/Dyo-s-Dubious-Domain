# Production Deployment Guide

This guide covers deploying your JAMStack + Express backend to a production server like Contabo VPS.

## Prerequisites

- VPS/Server with Ubuntu 20.04+ or similar
- Domain name pointing to your server IP
- SSH access to your server
- Basic command line familiarity

## Server Setup

### 1. Update Server and Install Dependencies

```bash
# Connect to your server
ssh root@your-server-ip

# Update system
apt update && apt upgrade -y

# Install Node.js (using NodeSource repository for latest LTS)
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
apt-get install -y nodejs

# Install nginx
apt install nginx -y

# Install PM2 globally for process management
npm install -g pm2

# Install git
apt install git -y
```

### 2. Clone and Setup Your Application

```bash
# Navigate to web directory
cd /var/www

# Clone your repository
git clone https://github.com/yourusername/CCCC.git
cd CCCC

# Install dependencies
npm install

# Build the frontend
npm run build
```

### 3. Environment Configuration

```bash
# Copy the environment template
cp .env.example .env

# Edit environment variables
nano .env
```

Configure your `.env` file for production:

```env
NODE_ENV=production
PORT=3000
HOST=127.0.0.1
JWT_SECRET=your-super-secure-random-string-at-least-64-characters-long
DB_PATH=/var/www/CCCC/database.sqlite
DOMAIN=yourdomain.com
SSL_ENABLED=true
SECURE_COOKIES=true
```

**Important:** Generate a secure JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 4. Database Setup

```bash
# Set proper permissions for database directory
chown -R www-data:www-data /var/www/CCCC
chmod 755 /var/www/CCCC
chmod 664 /var/www/CCCC/database.sqlite || true  # In case it doesn't exist yet
```

### 5. PM2 Process Management

Create PM2 ecosystem file:

```bash
nano ecosystem.config.js
```

```javascript
module.exports = {
  apps: [{
    name: 'cccc-backend',
    script: 'server.js',
    instances: 1,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    },
    error_file: '/var/log/pm2/cccc-error.log',
    out_file: '/var/log/pm2/cccc-out.log',
    log_file: '/var/log/pm2/cccc-combined.log',
    time: true
  }]
};
```

Start your application with PM2:

```bash
# Create log directory
mkdir -p /var/log/pm2

# Start application
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
# Follow the command it outputs
```

### 6. Nginx Configuration

Create nginx configuration for your site:

```bash
nano /etc/nginx/sites-available/cccc
```

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;
    
    # SSL Configuration (after setting up certificates)
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    # Frontend (static files)
    location / {
        root /var/www/CCCC/public;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
    
    # Backend API
    location /api/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Static assets with caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        root /var/www/CCCC/public;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Enable the site:

```bash
# Enable site
ln -s /etc/nginx/sites-available/cccc /etc/nginx/sites-enabled/

# Remove default site
rm /etc/nginx/sites-enabled/default

# Test nginx configuration
nginx -t

# Restart nginx
systemctl restart nginx
```

### 7. SSL Certificate Setup

Install Certbot for Let's Encrypt SSL:

```bash
# Install certbot
apt install certbot python3-certbot-nginx -y

# Get SSL certificate
certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Test auto-renewal
certbot renew --dry-run
```

### 8. Firewall Configuration

```bash
# Install UFW if not installed
apt install ufw -y

# Configure firewall
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 'Nginx Full'

# Enable firewall
ufw enable
```

## Deployment Workflow

### Initial Deployment

1. Follow steps 1-8 above
2. Your site should be accessible at `https://yourdomain.com`

### Updates and Redeployment

```bash
# SSH to your server
ssh root@your-server-ip

# Navigate to project directory
cd /var/www/CCCC

# Pull latest changes
git pull origin main

# Install any new dependencies
npm install

# Rebuild frontend
npm run build

# Restart backend
pm2 restart cccc-backend

# Reload nginx (if config changed)
systemctl reload nginx
```

## Monitoring and Maintenance

### Check Application Status

```bash
# Check PM2 processes
pm2 status
pm2 logs cccc-backend

# Check nginx status
systemctl status nginx

# Check SSL certificate expiry
certbot certificates
```

### Backup Strategy

```bash
# Create backup script
nano /root/backup-cccc.sh
```

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/root/backups"
mkdir -p $BACKUP_DIR

# Backup database
cp /var/www/CCCC/database.sqlite $BACKUP_DIR/database_$DATE.sqlite

# Backup environment file
cp /var/www/CCCC/.env $BACKUP_DIR/env_$DATE.backup

# Clean old backups (keep last 7 days)
find $BACKUP_DIR -name "*.sqlite" -mtime +7 -delete
find $BACKUP_DIR -name "*.backup" -mtime +7 -delete

echo "Backup completed: $DATE"
```

```bash
# Make executable
chmod +x /root/backup-cccc.sh

# Add to crontab for daily backups
crontab -e
# Add line: 0 2 * * * /root/backup-cccc.sh
```

## Troubleshooting

### Common Issues

1. **502 Bad Gateway**: Backend not running
   ```bash
   pm2 restart cccc-backend
   pm2 logs cccc-backend
   ```

2. **Database Permission Issues**:
   ```bash
   chown -R www-data:www-data /var/www/CCCC
   chmod 664 /var/www/CCCC/database.sqlite
   ```

3. **CORS Issues**: Check FRONTEND_URL in .env matches your domain

4. **SSL Issues**: Check certificate paths in nginx config

### Log Locations

- PM2 logs: `/var/log/pm2/`
- Nginx logs: `/var/log/nginx/`
- System logs: `journalctl -u nginx` or `journalctl -f`

## Security Considerations

1. **Keep dependencies updated**: Regularly run `npm audit` and update packages
2. **Monitor logs**: Set up log monitoring for suspicious activity
3. **Database backups**: Implement regular automated backups
4. **Firewall**: Only open necessary ports
5. **SSH keys**: Use SSH keys instead of passwords
6. **Updates**: Keep server OS and software updated

## Performance Optimization

1. **Enable gzip compression** in nginx
2. **Use CDN** for static assets if needed
3. **Database optimization**: Add indexes for frequently queried fields
4. **PM2 clustering**: Increase instances based on CPU cores
5. **Rate limiting**: Implement API rate limiting for abuse prevention

Your application should now be fully deployed and accessible at your domain!