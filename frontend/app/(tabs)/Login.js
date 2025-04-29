// app/Login.js
import React, { useState } from 'react';
import {
  View, Text, TextInput,
  TouchableOpacity, StyleSheet,
  Alert
} from 'react-native';

const API_BASE = 'http://YOUR_SERVER_IP:3000';

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');  // we'll treat this as email
  const [password, setPassword] = useState('');  // unused for now, but left in UI
  const [step, setStep] = useState('credentials'); // or 'otp'
  const [code, setCode] = useState('');

  // 1) Request OTP
  const handleRequestOtp = async () => {
    if (!username) return Alert.alert('Please enter your email');
    try {
      const resp = await fetch(`${API_BASE}/request-otp`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email: username }),
      });
      const data = await resp.json();
      if (resp.ok) {
        Alert.alert('✔️', data.message);
        setStep('otp');
      } else {
        throw new Error(data.error || 'Failed to send OTP');
      }
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };

  // 2) Verify OTP
  const handleVerifyOtp = async () => {
    if (!code) return Alert.alert('Please enter the OTP');
    try {
      const resp = await fetch(`${API_BASE}/verify-otp`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email: username, code }),
      });
      const data = await resp.json();
      if (resp.ok && data.success) {
        Alert.alert('🎉', data.message);
        onLoginSuccess();
      } else {
        throw new Error(data.message || data.error || 'Verification failed');
      }
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };

  return (
    <View style={styles.container}>
      {step === 'credentials' ? (
        <>
          <Text style={styles.title}>Welcome Back!</Text>

          <TextInput
            style={styles.input}
            placeholder="Username or email"
            placeholderTextColor="#000"
            value={username}
            onChangeText={setUsername}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#000"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleRequestOtp}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.title}>Enter OTP Code</Text>

          <TextInput
            style={styles.input}
            placeholder="123456"
            placeholderTextColor="#000"
            keyboardType="number-pad"
            value={code}
            onChangeText={setCode}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleVerifyOtp}
          >
            <Text style={styles.buttonText}>Verify OTP</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D9F3FF',
    flex: 1, alignItems: 'center', justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24, marginBottom: 30, color: '#000',
  },
  input: {
    backgroundColor: '#ddd',
    width: '100%',
    padding: 12,
    marginVertical: 10,
    borderRadius: 6,
    color: '#000',
  },
  button: {
    backgroundColor: '#5BB8E3',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 6,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff', fontWeight: '600', fontSize: 16,
  },
});
