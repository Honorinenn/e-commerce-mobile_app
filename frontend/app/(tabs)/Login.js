// app/Login.js
import React, { useState } from 'react';
import {
  View, Text, TextInput,
  TouchableOpacity, StyleSheet, Alert
} from 'react-native';
import { RollInLeft } from 'react-native-reanimated';

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    try {
      // Use the REACT_APP_API_AUTH_URL environment variable
      const apiUrl = process.env.REACT_APP_API_AUTH_URL || 'https://fictional-spoon-xxvg46rwgvcxr5-3001.app.github.dev/api/auth';

      // const response = await fetch(`${apiUrl}/login`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password }),
      // });

      // if (!response.ok) {
      //   const errorData = await response.json();
      //   Alert.alert('Login Failed', errorData.error || 'Invalid credentials.');
      //   return;
      // }

      // const data = await response.json();

      // if (!data.user) {
      //   Alert.alert('Login Failed', 'User data is missing in the response.');
      //   return;
      // }

      const mockUser = {
        id: '12345',
        username: 'admin',
        email: 'admin@example.com',
        role: 'admin', // or 'admin' based on your mock data
      };

      onLoginSuccess(mockUser); // data.user Pass user data to parent
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    padding: 20, backgroundColor: '#fff',
  },
  title: {
    fontSize: 24, fontWeight: 'bold', marginBottom: 20,
  },
  input: {
    width: '100%', padding: 10, marginBottom: 15,
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
  },
  button: {
    backgroundColor: '#71C9F8',
    paddingVertical: 12, paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: '#000', fontSize: 16, fontWeight: '500',
  },
});
