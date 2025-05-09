import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router'; //  import useRouter

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); //  initialize router

  const handleLogin = () => {
    // Optional: Add validation or API call here
    router.push('/shopping'); // navigate to shopping page
  };

  return (
    <View style={styles.container}>
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

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

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
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
