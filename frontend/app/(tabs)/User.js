import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';

const User = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSave = () => {
    if (name && email && address) {
      setSubmitted(true);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/user.png')} // 👈 Local image here
        style={styles.avatar}
      />

      <Text style={styles.title}>User Info</Text>

      {!submitted ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="#555"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#555"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your address"
            placeholderTextColor="#555"
            value={address}
            onChangeText={setAddress}
          />
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>👤 Name: {name}</Text>
          <Text style={styles.infoText}>📧 Email: {email}</Text>
          <Text style={styles.infoText}>🏠 Address: {address}</Text>
        </View>
      )}
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9F3FF',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#5BB8E3',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
    color: '#000',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    color: '#000',
    width: '100%',
  },
  button: {
    backgroundColor: '#5BB8E3',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  infoContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    width: '100%',
  },
  infoText: {
    fontSize: 16,
    marginVertical: 5,
    color: '#000',
  },
});
