import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

const Electronic = (props) => {
  const [isStarted, setIsStarted] = useState(props.initialStarted ?? false);

  return (
    <View style={styles.container}>
      {!isStarted ? (
        <>
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.brandText}>{props.name} Electronics</Text>

          <Image
            source={require('./landing_screen.png')}
            style={styles.image}
            resizeMode="contain"
          />

          <TouchableOpacity style={styles.button} onPress={() => setIsStarted(true)}>
            <Text style={styles.buttonText}>Get started</Text>
          </TouchableOpacity>
        </>
      ) : (
        // Navigate to Login screen
        <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Electronic;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9F3FF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 20,
    marginBottom: 5,
    color: '#000',
  },
  brandText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 180,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#71C9F8',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
  },
  loginText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    backgroundColor: '#71C9F8',
    padding: 10,
    borderRadius: 8,
  },
});
