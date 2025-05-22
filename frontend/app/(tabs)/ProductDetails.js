import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const API_URL = 'https://fictional-spoon-xxvg46rwgvcxr5-3001.app.github.dev';

const ProductDetails = ({ product, onBack, onAddToCart }) => {
  if (!product) return null;
  let imageUrl = product.imageUrl || (product.images && product.images[0]);
  if (imageUrl && imageUrl.startsWith('/')) {
    imageUrl = API_URL + imageUrl;
  }
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={onBack} style={styles.backBtn}>
        <Text style={styles.backText}>{'< Back'}</Text>
      </TouchableOpacity>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="contain" />
      ) : null}
      <Text style={styles.title}>{product.name || product.description}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.sectionTitle}>Details</Text>
      <Text style={styles.details}>{product.details || product.description || 'No additional details.'}</Text>
      <TouchableOpacity style={styles.cartBtn} onPress={() => onAddToCart(product)}>
        <Text style={styles.cartBtnText}>Add to Cart</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  backBtn: { marginBottom: 10 },
  backText: { color: '#007bff', fontSize: 16 },
  image: { width: '100%', height: 220, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  price: { fontSize: 20, color: '#28a745', marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 8 },
  details: { fontSize: 16, color: '#333' },
  cartBtn: { backgroundColor: '#28a745', padding: 14, borderRadius: 8, marginTop: 20, alignItems: 'center' },
  cartBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
});

export default ProductDetails;
