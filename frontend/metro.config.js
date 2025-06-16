// Metro configuration for GitHub Codespaces
// This configuration ensures the dev server works properly in cloud environments

const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Enable public access for Codespaces
if (process.env.CODESPACE_NAME) {
  // Configure for Codespaces environment
  config.server = {
    ...config.server,
    host: '0.0.0.0',
    port: parseInt(process.env.EXPO_PORT || '8081'),
  };
}

module.exports = config;
