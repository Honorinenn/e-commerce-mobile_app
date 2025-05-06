import React from 'react';
import {
  View, Text, Image, TextInput,
  TouchableOpacity, StyleSheet, ScrollView
} from 'react-native';

const products = [
  {
    id: 1,
    image: require('./assets/phone.png'), // Replace with your local image
    description: 'iPhone 14 - 128GB',
    price: '$799',
  },
  {
    id: 2,
    image: require('./assets/tablet.png'), // Replace with your local image
    description: 'iPad 10.2" - Wi-Fi 64GB',
    price: '$329',
  },
];

const Product = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchCartRow}>
        <TextInput
          style={styles.searchBox}
          placeholder="Search EStore"
          placeholderTextColor="#333"
        />
        <TouchableOpacity>
          <Text style={styles.icon}>🔍</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.icon}>🛒</Text>
        </TouchableOpacity>
      </View>

      {products.map(product => (
        <View key={product.id} style={styles.card}>
          <Image source={product.image} style={styles.image} resizeMode="contain" />
          <View style={styles.infoBlock}>
            <Text style={styles.label}>Product Description</Text>
            <Text style={styles.value}>{product.description}</Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.label}>Price</Text>
            <Text style={styles.value}>{product.price}</Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.label}>Quantity</Text>
            <TextInput style={styles.input} placeholder="1" keyboardType="numeric" />
          </View>
          <TouchableOpacity style={styles.cartButton}>
            <Text style={styles.cartButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d4f1ff',
    padding: 10,
  },
  searchCartRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  searchBox: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 4,
    paddingHorizontal: 10,
    marginRight: 10,
    height: 40,
    borderWidth: 1,
    borderColor: '#aaa',
  },
  icon: {
    fontSize: 22,
    marginHorizontal: 5,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 10,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 3,
  },
  image: {
    width: 200,
    height: 120,
    marginBottom: 10,
  },
  infoBlock: {
    width: '100%',
    backgroundColor: '#e0e0e0',
    padding: 8,
    marginVertical: 3,
    borderRadius: 4,
  },
  label: {
    fontWeight: '600',
    color: '#333',
  },
  value: {
    color: '#111',
  },
  input: {
    marginTop: 4,
    backgroundColor: '#fff',
    padding: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  cartButton: {
    backgroundColor: '#FFC107',
    paddingVertical: 10,
    marginTop: 10,
    width: '100%',
    borderRadius: 4,
  },
  cartButtonText: {
    textAlign: 'center',
    color: '#000',
    fontWeight: 'bold',
  },
});
