// constants/index.js
import { Platform } from 'react-native';

function getApiBase() {
  const LOCAL_DEV_IP_PLACEHOLDER = 'YOUR_LOCAL_MACHINE_IP';
  // IMPORTANT: Replace with your actual local IP address if running backend locally and testing on a physical device.
  const LOCAL_DEV_IP = 'YOUR_LOCAL_MACHINE_IP'; // E.g., '192.168.1.100'
  const codespaceNameEnv = process.env.CODESPACE_NAME;

  // 1. Codespace environment (priority for all platforms: mobile, web)
  if (codespaceNameEnv) {
    const apiUrl = `https://${codespaceNameEnv}-3001.app.github.dev/api`;
    console.log(`Codespace environment detected (CODESPACE_NAME: ${codespaceNameEnv}). API Base for ${Platform.OS || 'web'}: ${apiUrl}`);
    return apiUrl;
  }

  // 2. Mobile device connecting to local backend (only if not in a Codespace)
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    if (LOCAL_DEV_IP !== LOCAL_DEV_IP_PLACEHOLDER && LOCAL_DEV_IP && LOCAL_DEV_IP.trim() !== '') {
      const apiUrl = `http://${LOCAL_DEV_IP}:3001/api`;
      console.log(`Mobile platform (${Platform.OS}) detected (NOT in Codespace). Using configured local IP for backend: ${apiUrl}`);
      return apiUrl;
    } else {
      // This is the critical warning if the placeholder is still in use on mobile and not in Codespace
      console.error(`!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!`);
      console.error(`!!! CRITICAL WARNING: Mobile platform (${Platform.OS}) detected (NOT in Codespace), BUT !!!`);
      console.error(`!!! LOCAL_DEV_IP in frontend/constants/index.js is still '${LOCAL_DEV_IP_PLACEHOLDER}' or empty. !!!`);
      console.error(`!!! You MUST replace it with your computer's actual local IP address for local dev.  !!!`);
      console.error(`!!! The app will try to use localhost, which WILL FAIL on a physical device.   !!!`);
      console.error(`!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!`);
      // Let it fall through to localhost, which will have its own warning for mobile.
    }
  }

  // 3. Web client in Codespace (hostname based) - Fallback if CODESPACE_NAME somehow isn't set.
  const isWebInCodespace = typeof window !== 'undefined' && window.location?.hostname?.includes('.app.github.dev');
  if (isWebInCodespace) {
    // This implies CODESPACE_NAME was not set, which is unusual for a .app.github.dev URL.
    const host = window.location.hostname.replace(/-\d+\./, '-3001.'); // Adjust port for backend
    const apiUrl = `https://${host}/api`;
    console.log(`Web client in Codespace detected by hostname (CODESPACE_NAME was not set). API Base: ${apiUrl}`);
    return apiUrl;
  }

  // 4. Fallback: Local web development OR mobile app where LOCAL_DEV_IP is NOT set (and not in Codespace)
  const apiUrl = 'http://localhost:3001/api';
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    // This warning is for mobile devices that didn't match CODESPACE_NAME and didn't have a valid LOCAL_DEV_IP.
    console.warn(`Mobile platform (${Platform.OS}) falling back to ${apiUrl}. This is likely due to LOCAL_DEV_IP not being correctly set in constants/index.js and not running in a Codespace.`);
  } else {
    console.log(`Local web development or unspecified environment (NOT in Codespace). API Base: ${apiUrl}`);
  }
  return apiUrl;
}

export const API_BASE = getApiBase();
console.log('Final API_BASE configured as:', API_BASE);