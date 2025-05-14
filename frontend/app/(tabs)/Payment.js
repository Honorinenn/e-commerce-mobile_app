import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const Payment = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');

  const handlePayment = () => {
    if (cardNumber && expiryDate && cvv && nameOnCard) {
      Alert.alert('Payment Successful', 'Thank you for your purchase!');
      setCardNumber('');
      setExpiryDate('');
      setCvv('');
      setNameOnCard('');
    } else {
      Alert.alert('Missing Info', 'Please fill in all fields');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Information</Text>

      <TextInput
        style={styles.input}
        placeholder="Name on Card"
        value={nameOnCard}
        onChangeText={setNameOnCard}
        placeholderTextColor="#555"
      />
      <TextInput
        style={styles.input}
        placeholder="Card Number"
        value={cardNumber}
        onChangeText={setCardNumber}
        keyboardType="numeric"
        placeholderTextColor="#555"
      />
      <TextInput
        style={styles.input}
        placeholder="Expiry Date (MM/YY)"
        value={expiryDate}
        onChangeText={setExpiryDate}
        placeholderTextColor="#555"
      />
      <TextInput
        style={styles.input}
        placeholder="CVV"
        value={cvv}
        onChangeText={setCvv}
        secureTextEntry
        keyboardType="numeric"
        placeholderTextColor="#555"
      />

      <TouchableOpacity style={styles.button} onPress={handlePayment}>
        <Text style={styles.buttonText}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9F3FF',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
    color: '#000',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    marginVertical: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    color: '#000',
  },
  button: {
    backgroundColor: '#5BB8E3',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
