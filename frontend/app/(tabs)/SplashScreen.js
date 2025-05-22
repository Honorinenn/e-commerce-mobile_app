import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const SplashScreen = ({ onStart }) => (
  <View style={styles.container}>
    <Image source={require('../../assets/images/icon.png')} style={styles.logo} />
    <Text style={styles.title}>E-Store</Text>
    <TouchableOpacity style={styles.button} onPress={onStart}>
      <Text style={styles.buttonText}>Get Started</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  logo: { width: 120, height: 120, marginBottom: 30 },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 40, color: '#007bff' },
  button: { backgroundColor: '#007bff', paddingVertical: 15, paddingHorizontal: 40, borderRadius: 8 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

export default SplashScreen;
