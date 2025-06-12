#!/bin/bash

# Check if .env exists, if not, create it with default values
if [ ! -f .env ]; then
  # Dynamically set GEMMA_API_URL based on Codespace name and port 11434
  if [ -n "$CODESPACE_NAME" ]; then
    GEMMA_API_URL="https://${CODESPACE_NAME}-11434.app.github.dev/api/generate"
  else
    GEMMA_API_URL="https://localhost:11434/api/generate"
  fi
  cat <<EOL > .env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
PORT=3001
GEMMA_API_URL=${GEMMA_API_URL}
GEMMA_API_URL_LOCAL=http://localhost:11434/api/generate
MONGO_URI=mongodb+srv://hieu0211:62stYkAXJ6tRFU58@cluster0.ayq1u.mongodb.net/
AZURE_STORAGE_CONNECTION_STRING=DefaultEndpointsProtocol=https;AccountName=sa25proj;AccountKey=3pBzm1w5YpSh+UpWhwxbc5x5rjqL2yveL49IlhblJnZdPoMHCGAsHHROp7ha4QCr+SLxM8HbMMjz+AStCCqjxw==;EndpointSuffix=core.windows.net
JWT_SECRET=eCommerceSecretKey
JWT_EXPIRATION=1h
JWT_REFRESH_SECRET=RefreshSecretKey
JWT_REFRESH_EXPIRATION=30d
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your-redis-password
REDIS_DB=0
EOL
  echo ".env file created with default values. Please update sensitive values as needed."
fi

# Update the .env file with the correct GitHub Codespaces URL and port
CODESPACE_URL="https://${CODESPACE_NAME}-11434.app.github.dev/api/generate"
sed -i "s|^GEMMA_API_URL=.*|GEMMA_API_URL=${CODESPACE_URL}|" .env

# Start the server
cross-env NODE_OPTIONS=--openssl-legacy-provider PORT=3001 node server.js &

# Wait for the server to start
sleep 5

# Make the port public
gh codespace ports visibility 3001:public -c $CODESPACE_NAME

# Keep the script running
wait

# chmod +x start.sh