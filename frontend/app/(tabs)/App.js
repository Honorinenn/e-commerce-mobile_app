// app/App.js
import React, { useState } from 'react';
import {
  View, Text, Image,
  TouchableOpacity, StyleSheet
} from 'react-native';

import Login from './Login';
import landingImg from './landing_screen.png';

export default function App() {
  const [stage, setStage] = useState('landing');
  // landing → login → home

  const onGetStarted = () => setStage('login');
  const onLoginSuccess = () => setStage('home');

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
        <Text style={styles.homeText}>
          🎉 You’re logged in! Welcome to the app.
        </Text>
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
  },
});
