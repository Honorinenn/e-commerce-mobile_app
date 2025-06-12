#!/bin/bash

# Codespaces Port Configuration Helper
# This script helps configure ports for public access in GitHub Codespaces

PORT=${1:-8081}

echo "🔧 Configuring Codespaces for React Native/Expo"
echo "=============================================="

if [ -n "$CODESPACE_NAME" ]; then
    echo "📍 Codespace: $CODESPACE_NAME"
    echo "🔌 Port: $PORT"
    
    # The Codespaces URL format
    CODESPACE_URL="https://${CODESPACE_NAME}-${PORT}.app.github.dev"
    
    echo ""
    echo "✅ Configuration Complete!"
    echo "📋 Environment Variables:"
    echo "   - CODESPACE_NAME: $CODESPACE_NAME"
    echo "   - PORT: $PORT"
    echo ""
    echo "🌐 Your app will be available at:"
    echo "   $CODESPACE_URL"
    echo ""
    echo "💡 Pro Tips:"
    echo "   • Use 'npm start' or 'npm run start-public' to launch"
    echo "   • Port $PORT will be automatically made public"
    echo "   • Use tunnel mode for mobile device testing"
    echo ""
    
    # Create a .env file with the configuration
    cat > .env.local << EOF
# GitHub Codespaces Configuration
EXPO_PORT=$PORT
EXPO_WEB_HOST=0.0.0.0
EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0
EXPO_PACKAGER_LISTEN_ADDRESS=0.0.0.0
CODESPACE_URL=$CODESPACE_URL
EOF
    
    echo "📄 Created .env.local with Codespace configuration"
    
else
    echo "⚠️  Not running in GitHub Codespaces"
    echo "🏠 This script is designed for Codespaces environment"
    echo ""
    echo "For local development, use:"
    echo "   npm run start-local"
fi
