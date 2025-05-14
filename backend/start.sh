#!/bin/bash

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