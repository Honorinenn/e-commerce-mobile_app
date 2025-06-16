import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const PaymentPage = ({ total, onPay, onBack }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Payment</Text>
    <Text style={styles.amount}>Amount Due: ${total.toFixed(2)}</Text>
    <TouchableOpacity style={styles.payBtn} onPress={onPay}>
      <Text style={styles.payText}>Pay Now</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.backBtn} onPress={onBack}>
      <Text style={styles.backText}>Back to Cart</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 24 },
  amount: { fontSize: 18, color: '#222', marginBottom: 32 },
  payBtn: { backgroundColor: '#3b82f6', borderRadius: 8, padding: 16, marginBottom: 16 },
  payText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  backBtn: { padding: 10 },
  backText: { color: '#3b82f6', fontSize: 15 },
});

export default PaymentPage;
