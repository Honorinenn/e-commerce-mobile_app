#!/bin/bash

# Custom start script for React Native/Expo in GitHub Codespaces
# This script starts the development server with public access and displays the Codespaces URL

echo "🚀 Starting React Native/Expo Development Server"
echo "================================================"

# Default port for Expo web - using 8081 for Codespaces
DEFAULT_PORT=8081
PORT=${EXPO_PORT:-$DEFAULT_PORT}

# Check if running in Codespaces
if [ -n "$CODESPACE_NAME" ]; then
    echo "🌐 GitHub Codespaces Environment Detected"
    echo "📍 Codespace Name: $CODESPACE_NAME"
    echo "🔌 Port: $PORT"
    
    # Generate the Codespace URLs
    WEB_URL="https://${CODESPACE_NAME}-${PORT}.app.github.dev"
    
    echo ""
    echo "🎯 ACCESS YOUR APP:"
    echo "┌─────────────────────────────────────────────────────────┐"
    echo "│ 🌐 Web URL: $WEB_URL"
    echo "│ 📱 For mobile: Use Expo Go app with tunnel URL          │"
    echo "│ 🔧 DevTools: Available in web interface                 │"
    echo "└─────────────────────────────────────────────────────────┘"
    echo ""
    
    # Ensure the port is made public in Codespaces
    echo "🔓 Making port $PORT public in Codespaces..."
    
    # Set environment variables for Expo to work in Codespaces
    export EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0
    export EXPO_PACKAGER_LISTEN_ADDRESS=0.0.0.0
    export EXPO_WEB_HOST=0.0.0.0
    export EXPO_WEB_PORT=$PORT
    
    echo "🏃 Starting Expo development server with public access..."
    echo "⏳ Please wait while the server starts..."
    echo ""
    
    # Start Expo with web and tunnel for mobile
    npx expo start --web --host tunnel --port $PORT
    
elif [ -n "$GITPOD_WORKSPACE_URL" ]; then
    # Handle Gitpod environment
    echo "🌐 Gitpod Environment Detected"
    WEB_URL="$(echo $GITPOD_WORKSPACE_URL | sed 's/https:\/\//https:\/\/'$PORT'-/')"
    echo "🔗 Web URL: $WEB_URL"
    
    export EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0
    export EXPO_PACKAGER_LISTEN_ADDRESS=0.0.0.0
    
    npx expo start --web --host 0.0.0.0 --port $PORT
    
else
    # Local development
    echo "🏠 Local Development Environment"
    echo "🔗 Local Web URL: http://localhost:$PORT"
    echo "🔗 Local Network URL: http://$(hostname -I | awk '{print $1}'):$PORT"
    echo ""
    
    # Normal local development
    npx expo start --web --port $PORT
fi
