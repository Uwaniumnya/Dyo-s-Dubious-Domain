module.exports = {
  apps: [{
    name: 'cccc-backend',
    script: 'server.js',
    instances: 1,
    exec_mode: 'cluster',
    cwd: '/var/www/cccc',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3001,
      HOST: '0.0.0.0'
    },
    error_file: '/var/log/pm2/cccc-error.log',
    out_file: '/var/log/pm2/cccc-out.log',
    log_file: '/var/log/pm2/cccc-combined.log',
    time: true,
    max_restarts: 5,
    restart_delay: 4000,
    watch: false,
    ignore_watch: [
      'node_modules',
      'public',
      'src',
      'database.sqlite',
      '.git'
    ]
  }]
};