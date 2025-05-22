import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

const API_URL = 'https://fictional-spoon-xxvg46rwgvcxr5-3001.app.github.dev';
const PRODUCTS_ENDPOINT = API_URL + '/api/products';

const Home = ({ onProductSelect, setActiveTab, user, onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(PRODUCTS_ENDPOINT);
        let data = await res.json();
        // If the response is an object with a 'products' key, use that; otherwise, use the array directly
        if (Array.isArray(data)) {
          setProducts(data);
        } else if (data.products && Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          setProducts([]);
        }
      } catch (err) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <View style={styles.center}><ActivityIndicator size="large" color="#007bff" /></View>;
  }
  if (error) {
    return <View style={styles.center}><Text>{error}</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Products</Text>
      <FlatList
        data={products}
        keyExtractor={item => item._id || item.id?.toString()}
        renderItem={({ item }) => {
          let imageUrl = item.imageUrl || (item.images && item.images[0]);
          if (imageUrl && imageUrl.startsWith('/')) {
            imageUrl = API_URL + imageUrl;
          }
          return (
            <View style={styles.card}>
              <TouchableOpacity style={{ flex: 1 }} onPress={() => onProductSelect(item)}>
                {imageUrl ? (
                  <Image source={{ uri: imageUrl }} style={styles.image} />
                ) : (
                  <View style={[styles.image, { backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center' }]}>
                    <Text>No Image</Text>
                  </View>
                )}
                <View style={styles.info}>
                  <Text style={styles.desc}>{item.name || item.description}</Text>
                  <Text style={styles.price}>${item.price}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cartBtn} onPress={() => onAddToCart(item)}>
                <Text style={styles.cartBtnText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.actionBtn} onPress={() => setActiveTab('Login')}>
          <Text style={styles.actionText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={() => setActiveTab('Register')}>
          <Text style={styles.actionText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={() => setActiveTab('Shopbot')}>
          <Text style={styles.actionText}>Chat with AI</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f8f8f8', borderRadius: 10, marginBottom: 16, padding: 12 },
  image: { width: 80, height: 80, marginRight: 16, borderRadius: 8 },
  info: { flex: 1 },
  desc: { fontSize: 18, fontWeight: 'bold' },
  price: { fontSize: 16, color: '#28a745', marginTop: 4 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 },
  actionBtn: { backgroundColor: '#007bff', padding: 12, borderRadius: 8, flex: 1, marginHorizontal: 5 },
  actionText: { color: '#fff', fontSize: 16, textAlign: 'center' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  cartBtn: { backgroundColor: '#28a745', padding: 8, borderRadius: 8, marginLeft: 10 },
  cartBtnText: { color: '#fff', fontWeight: 'bold' },
});

export default Home;
