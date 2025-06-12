import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

const Home = (props) => {  return (
    <View style={styles.container}>
      {props.currentUser && props.currentUser.username ? (
        <Text style={styles.welcomeText}>Welcome back, {props.currentUser.username}!</Text>
      ) : (
        <Text style={styles.welcomeText}>Welcome to</Text>
      )}
      <Text style={styles.brandText}>{props.name || 'Shop'} Electronics</Text>
      <Image
        source={require('./landing_screen.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <TouchableOpacity style={styles.button} onPress={props.onGetStarted}>
        <Text style={styles.buttonText}>Get started</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.chatButton} onPress={props.onChat}>
        <Text style={styles.chatButtonText}>Chat with Gemma AI</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

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
    marginBottom: 16,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
  },
  chatButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  chatButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});
