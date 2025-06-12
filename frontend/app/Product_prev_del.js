import React, { useEffect, useState, useCallback } from 'react';
import {
  View, Text, Image, TextInput,
  TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator,
  Dimensions, Platform, FlatList
} from 'react-native';

const API_URL = 'https://special-cod-p9p56v7g94hr5vg-3001.app.github.dev/api/products';
const { width } = Dimensions.get('window');

const Product = ({ onProductSelect }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Track current image index for each product by id
  const [currentImages, setCurrentImages] = useState({});

  const handleImageChange = useCallback((productId, idx) => {
    setCurrentImages(prev => ({ ...prev, [productId]: idx }));
  }, []);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load products');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 40 }} />;
  }
  if (error) {
    return <Text style={{ color: 'red', margin: 20 }}>{error}</Text>;
  }

  const renderProduct = ({ item: product }) => {
    const productId = product._id || product.id;
    const images = (product.images && product.images.length > 0)
      ? product.images.slice(0, 3)
      : product.imageUrls && product.imageUrls.length > 0
        ? product.imageUrls.slice(0, 3)
        : product.imageUrl ? [product.imageUrl] : [];
    const currentImage = currentImages[productId] || 0;
    return (
      <View key={productId} style={styles.card}>
        {images.length > 0 && (
          <View style={styles.imageCarousel}>
            <Image
              source={{ uri: images[currentImage] }}
              style={styles.image}
              resizeMode="contain"
            />
            <View style={styles.dotsContainer}>
              {images.map((_, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={[styles.dot, currentImage === idx && styles.activeDot]}
                  onPress={() => handleImageChange(productId, idx)}
                />
              ))}
            </View>
          </View>
        )}
        <TouchableOpacity onPress={() => onProductSelect && onProductSelect(product)}>
          <Text style={styles.title}>{product.name || product.description}</Text>
        </TouchableOpacity>
        <Text style={styles.price}>{product.price ? `$${product.price}` : ''}</Text>
        <TouchableOpacity style={styles.cartButton}>
          <Text style={styles.cartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
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
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={item => item._id || item.id}
        numColumns={2}
        columnWrapperStyle={styles.flexGrid}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
    </View>
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
  flexGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 10,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 3,
    width: '48%',
  },
  imageCarousel: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 2,
  },
  activeDot: {
    backgroundColor: '#007AFF',
  },
  image: {
    width: 120,
    height: 80,
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#007AFF',
    marginBottom: 5,
    textAlign: 'center',
  },
  price: {
    color: '#111',
    marginBottom: 5,
  },
  cartButton: {
    backgroundColor: '#FFC107',
    paddingVertical: 8,
    marginTop: 5,
    width: '80%',
    borderRadius: 4,
  },
  cartButtonText: {
    textAlign: 'center',
    color: '#000',
    fontWeight: 'bold',
  },
});

