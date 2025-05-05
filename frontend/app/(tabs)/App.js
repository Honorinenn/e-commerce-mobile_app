// app/App.js
import React, { useState } from 'react';
import {
  View, Text, Image,
  TouchableOpacity, StyleSheet, Alert
} from 'react-native';

import Login from './Login';
import landingImg from './landing_screen.png';
import AllProducts from './AllProducts';

export default function App() {
  const [stage, setStage] = useState('landing'); // landing → login → home → allProducts
  const [user, setUser] = useState(null); // Store user details after login

  const onGetStarted = () => setStage('login');

  const onLoginSuccess = (userData) => {
    setUser(userData); // Save user data
    setStage('home'); // Navigate to home
  };

  return (
    <View style={styles.container}>
      {stage === 'landing' && (
        <>
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.brandText}>HEH Electronics</Text>

          <Image
            source={landingImg}
            style={styles.image}
            resizeMode="contain"
          />

          <TouchableOpacity
            style={styles.button}
            onPress={onGetStarted}
          >
            <Text style={styles.buttonText}>Get started</Text>
          </TouchableOpacity>
        </>
      )}

      {stage === 'login' && (
        <Login onLoginSuccess={onLoginSuccess} />
      )}

      {stage === 'home' && (
        <View>
          <Text style={styles.homeText}>
            🎉 You’re logged in! Welcome, {user?.username}.
          </Text>
          <Text style={styles.userDetails}>
            Email: {user?.email}
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setStage('allProducts')}
          >
            <Text style={styles.buttonText}>Show All Products</Text>
          </TouchableOpacity>
        </View>
      )}

      {stage === 'allProducts' && (
        <AllProducts onBack={() => setStage('home')} onProductSelect={() => {}} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#D9F3FF',
    alignItems: 'center', justifyContent: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 20, marginBottom: 5, color: '#000',
  },
  brandText: {
    fontSize: 24, fontWeight: 'bold',
    color: '#000', marginBottom: 20,
  },
  image: {
    width: '100%', height: 180, marginBottom: 30,
  },
  button: {
    backgroundColor: '#71C9F8',
    paddingVertical: 12, paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: '#000', fontSize: 16, fontWeight: '500',
  },
  homeText: {
    fontSize: 22, fontWeight: '600', color: '#000',
    marginBottom: 10,
  },
  userDetails: {
    fontSize: 16, color: '#000',
  },
});
