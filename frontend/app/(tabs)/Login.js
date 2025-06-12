import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator
} from 'react-native';
import { API_BASE } from '../../constants';

const Login = ({ onLoginSuccess, onNavigateToRegister }) => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!emailOrUsername.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both email/username and password.');
      return;
    }
    setLoading(true);
    try {
      // Determine if input is email or username (basic check)
      const isEmail = emailOrUsername.includes('@');
      const loginPayload = isEmail ? { email: emailOrUsername, password } : { username: emailOrUsername, password };
      
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginPayload),
      });

      const data = await response.json();

      if (response.ok && data.token && data.user) {
        if (onLoginSuccess) {
          onLoginSuccess(data.user, data.token);
        }
      } else {
        // More detailed error for failed login attempt (e.g., wrong credentials)
        const errorMessage = data.message || data.error || 'Invalid credentials or server error.';
        console.error(`Login Failed: ${response.status}, ${errorMessage}, API: ${API_BASE}/auth/login, Payload: ${JSON.stringify(loginPayload)}`);
        Alert.alert(
          'Login Failed',
          `${errorMessage}\\n(Status: ${response.status})\\nAttempted to reach: ${API_BASE}/auth/login`
        );
      }
    } catch (error) {
      // More detailed error for network issues or other exceptions
      console.error('Login API error:', error);
      let detailedErrorMessage = 'An error occurred while trying to log in. Please try again.';
      if (error instanceof TypeError && error.message === 'Network request failed') {
        detailedErrorMessage = `Network request failed. This often means the app could not reach the server.\\n\\nAttempted API endpoint: ${API_BASE}/auth/login\\n\\nPlease ensure the server is running and accessible, and that the API_BASE in constants/index.js is correctly configured for your network setup (especially if using a physical device).`;
      } else if (error.message) {
        detailedErrorMessage = `Error: ${error.message}\\n\\nAttempted API endpoint: ${API_BASE}/auth/login`;
      } else {
        detailedErrorMessage = `An unexpected error occurred.\\n\\nAttempted API endpoint: ${API_BASE}/auth/login\\nDetails: ${JSON.stringify(error)}`;
      }
      Alert.alert('Login Error', detailedErrorMessage);
    } finally {
      setLoading(false);
    }
  };

  const populateAdminCredentials = () => {
    setEmailOrUsername('jane.davis@example.com');
    setPassword('Jane@Davis2024');
  };

  const populateUserCredentials = () => {
    setEmailOrUsername('mike.smith@example.com');
    setPassword('MikeSmith#2024');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>

      <TextInput
        style={styles.input}
        placeholder="Username or email"
        placeholderTextColor="#555" // Darker placeholder
        value={emailOrUsername}
        onChangeText={setEmailOrUsername}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#555" // Darker placeholder
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.disabledButton]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.presetButton]}
        onPress={populateAdminCredentials}
      >
        <Text style={styles.buttonText}>Test: Sign in as Admin</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.presetButton]}
        onPress={populateUserCredentials}
      >
        <Text style={styles.buttonText}>Test: Sign in as User</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onNavigateToRegister} style={styles.registerLink}>
        <Text style={styles.registerLinkText}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D9F3FF',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    color: '#000',
  },
  input: {
    backgroundColor: '#fff', // Changed background
    width: '100%',
    padding: 15, // Increased padding
    marginVertical: 10,
    borderRadius: 8, // More rounded
    color: '#000',
    borderWidth: 1, // Added border
    borderColor: '#ccc', // Border color
  },
  button: {
    backgroundColor: '#5BB8E3',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 6,
    marginTop: 20,
    alignItems: 'center', // Ensure text is centered
  },
  presetButton: {
    backgroundColor: '#4A90E2', // A different color for preset buttons
    marginTop: 10, // Adjust margin as needed
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: '#a0aec0', // Gray out when disabled
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  registerLink: {
    marginTop: 15,
    alignItems: 'center',
  },
  registerLinkText: {
    color: 'blue',
  },
});

export default Login;
