import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';

const API_URL = 'https://fictional-spoon-xxvg46rwgvcxr5-3001.app.github.dev';
const CATEGORIES_ENDPOINT = API_URL + '/api/products/categories';
const PRODUCTS_ENDPOINT = API_URL + '/api/products';
const numColumns = 2;

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await fetch(CATEGORIES_ENDPOINT);
        const data = await res.json();
        if (Array.isArray(data.categories)) {
          setCategories(data.categories);
        } else if (Array.isArray(data)) {
          setCategories(data);
        } else {
          setCategories([]);
        }
      } catch (err) {
        setError('Failed to load categories');
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const fetchProductsByCategory = async (category) => {
    setLoadingProducts(true);
    setProducts([]);
    try {
      const res = await fetch(PRODUCTS_ENDPOINT + `?category=${encodeURIComponent(category)}`);
      let data = await res.json();
      if (Array.isArray(data)) {
        setProducts(data);
      } else if (data.products && Array.isArray(data.products)) {
        setProducts(data.products);
      } else {
        setProducts([]);
      }
    } catch (err) {
      setProducts([]);
    } finally {
      setLoadingProducts(false);
    }
  };

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
    fetchProductsByCategory(category);
  };

  if (loading) {
    return <View style={styles.center}><ActivityIndicator size="large" color="#007bff" /></View>;
  }
  if (error) {
    return <View style={styles.center}><Text>{error}</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product Categories</Text>
      <FlatList
        data={categories}
        keyExtractor={(item, idx) => item + idx}
        numColumns={numColumns}
        columnWrapperStyle={styles.categoryRow}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.categoryCard, selectedCategory === item && styles.selectedCategory]}
            onPress={() => handleCategoryPress(item)}
            activeOpacity={0.8}
          >
            <Text style={[styles.categoryText, selectedCategory === item && styles.selectedCategoryText]}>{item}</Text>
          </TouchableOpacity>
        )}
        style={{ marginBottom: 24 }}
      />
      {selectedCategory && (
        <Text style={styles.subtitle}>Products in "{selectedCategory}"</Text>
      )}
      {loadingProducts ? (
        <View style={styles.center}><ActivityIndicator size="large" color="#007bff" /></View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={item => item._id || item.id?.toString()}
          renderItem={({ item }) => {
            let imageUrl = item.imageUrl || (item.images && item.images[0]);
            if (imageUrl && imageUrl.startsWith('/')) {
              imageUrl = API_URL + imageUrl;
            }
            return (
              <View style={styles.productCard}>
                {imageUrl ? (
                  <Image source={{ uri: imageUrl }} style={styles.productImage} />
                ) : (
                  <View style={[styles.productImage, { backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center' }]}>
                    <Text>No Image</Text>
                  </View>
                )}
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text style={styles.productPrice}>${item.price}</Text>
                </View>
              </View>
            );
          }}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      )}
    </View>
  );
};

const CARD_WIDTH = (Dimensions.get('window').width - 60) / numColumns;
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  subtitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  categoryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  categoryCard: { backgroundColor: '#f8f8f8', borderRadius: 12, paddingVertical: 24, paddingHorizontal: 10, marginBottom: 8, alignItems: 'center', justifyContent: 'center', width: CARD_WIDTH, elevation: 2 },
  selectedCategory: { backgroundColor: '#007bff', elevation: 4 },
  categoryText: { fontSize: 18, color: '#007bff', fontWeight: 'bold', textAlign: 'center' },
  selectedCategoryText: { color: '#fff' },
  productCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f4f4f4', borderRadius: 12, marginBottom: 18, padding: 14, elevation: 2 },
  productImage: { width: 70, height: 70, borderRadius: 10, marginRight: 18 },
  productInfo: { flex: 1 },
  productName: { fontSize: 17, fontWeight: 'bold' },
  productPrice: { fontSize: 15, color: '#28a745', marginTop: 2 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default Category;
