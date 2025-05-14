import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const Checkout = () => {
  // Dummy cart items (you can replace this with real props/state)
  const cartItems = [
    { id: '1', name: 'Wireless Headphones', price: 49.99 },
    { id: '2', name: 'Smartphone Case', price: 15.99 },
    { id: '3', name: 'Bluetooth Speaker', price: 29.99 },
  ];

  const total = cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  const handlePlaceOrder = () => {
    Alert.alert('Order Placed', 'Your order has been successfully submitted!');
    // You can navigate to Payment screen or Order Summary here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
          </View>
        )}
        ListFooterComponent={
          <View style={styles.totalRow}>
            <Text style={styles.totalText}>Total:</Text>
            <Text style={styles.totalAmount}>${total}</Text>
          </View>
        }
      />

      <TouchableOpacity style={styles.button} onPress={handlePlaceOrder}>
        <Text style={styles.buttonText}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9F3FF',
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
    color: '#000',
    textAlign: 'center',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  itemName: {
    fontSize: 16,
    color: '#000',
  },
  itemPrice: {
    fontSize: 16,
    color: '#000',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingVertical: 12,
    borderTopColor: '#000',
    borderTopWidth: 1,
  },
  totalText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  button: {
    backgroundColor: '#5BB8E3',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
