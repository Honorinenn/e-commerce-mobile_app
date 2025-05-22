import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const Cart = ({ navigation }) => {
  // Dummy cart items (replace with real state/API)
  const [cartItems, setCartItems] = useState([
    { id: '1', name: 'iPhone 16', price: 1299, quantity: 1 },
    { id: '2', name: 'iPad 10.2"', price: 329, quantity: 2 },
  ]);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  const handleRemove = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    Alert.alert('Proceed to Checkout', 'Navigating to checkout screen...');
    if (navigation) navigation.navigate('Checkout');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping Cart</Text>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>${item.price} x {item.quantity}</Text>
            <TouchableOpacity onPress={() => handleRemove(item.id)}>
              <Text style={styles.removeBtn}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
        ListFooterComponent={
          <View style={styles.totalRow}>
            <Text style={styles.totalText}>Total:</Text>
            <Text style={styles.totalAmount}>${total}</Text>
          </View>
        }
      />
      <TouchableOpacity style={styles.button} onPress={handleCheckout}>
        <Text style={styles.buttonText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  itemName: { fontSize: 16 },
  itemPrice: { fontSize: 16, color: '#333' },
  removeBtn: { color: 'red', marginLeft: 10 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  totalText: { fontSize: 18, fontWeight: 'bold' },
  totalAmount: { fontSize: 18, fontWeight: 'bold' },
  button: { backgroundColor: '#007bff', padding: 15, borderRadius: 8, marginTop: 30 },
  buttonText: { color: '#fff', fontSize: 18, textAlign: 'center' },
});
