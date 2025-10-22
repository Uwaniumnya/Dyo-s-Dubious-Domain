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