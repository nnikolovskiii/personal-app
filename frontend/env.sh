#!/bin/sh

# Create a config file with environment variables
cat <<EOF > /usr/share/nginx/html/config.js
window.ENV = {
  VITE_API_URL: "${VITE_API_URL:-http://localhost:8000}"
};
EOF

# Start Nginx
exec "$@"