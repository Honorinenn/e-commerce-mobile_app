import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  View, Text, Image, TextInput,
  TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator,
  Dimensions, FlatList, Alert, RefreshControl
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// Assuming './api' contains ProductAPIService, ProductDataManager, CONFIG
import { ProductAPIService, ProductDataManager, CONFIG } from './api';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect

const SCREEN_CONFIG = {
  SCREEN_WIDTH: Dimensions.get('window').width,
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes cache duration
};

// Product Card Component
const ProductCard = React.memo(({ product, onProductSelect, onAddToCart }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  // Get product images from data manager, ensuring an array
  const images = ProductDataManager.getProductImages(product) || [];
  const displayImage = imageError || images.length === 0
    ? CONFIG.DEFAULT_IMAGE // Fallback if image errors or no images
    : images[imageIndex] || CONFIG.DEFAULT_IMAGE; // Use current index or default

  // Parse price and sale price safely
  const price = ProductDataManager.parsePrice(product.price);
  const salePrice = product.salePrice ? ProductDataManager.parsePrice(product.salePrice) : null;
  const inStock = product.stock > 0;

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => onProductSelect?.(product)}>
        <Image
          source={{ uri: displayImage }}
          style={styles.image}
          resizeMode="contain" // Use 'contain' to ensure full image is visible
          onError={() => setImageError(true)} // Set error state on image load failure
        />
        {/* Image pagination dots if more than one image */}
        {images.length > 1 && (
          <View style={styles.dotsContainer}>
            {/* Show up to 3 dots for simplicity, can be expanded */}
            {images.slice(0, 3).map((_, idx) => (
              <View
                key={idx}
                style={[styles.dot, imageIndex === idx && styles.activeDot]}
              />
            ))}
          </View>
        )}
        <Text style={styles.title} numberOfLines={2}>
          {product.name || product.description || 'Unnamed Product'} {/* Fallback for title */}
        </Text>

        <View style={styles.priceContainer}>
          {salePrice && ( // Show original price only if sale price exists
            <Text style={styles.originalPrice}>
              ${price.toFixed(2)}
            </Text>
          )}
          <Text style={styles.price}>
            ${(salePrice || price).toFixed(2)} {/* Display sale price if available, else original */}
          </Text>
        </View>

        <Text style={[
          styles.stockText,
          { color: inStock ? '#10B981' : '#EF4444' } // Green for in stock, red for out of stock
        ]}>
          {inStock ? `In Stock (${product.stock})` : 'Out of Stock'}
        </Text>
      </TouchableOpacity>

      {/* Add to Cart Button - now always visible if in stock, isAdmin check removed */}
      <TouchableOpacity
        style={[styles.cartButton, !inStock && styles.disabledCartButton]}
        disabled={!inStock} // Disable button if out of stock
        onPress={() => inStock && onAddToCart && onAddToCart(product)} // Call onAddToCart if in stock
      >
        <Text style={styles.cartButtonText}>
          {inStock ? 'Add to Cart' : 'Out of Stock'}
        </Text>
      </TouchableOpacity>
    </View>
  );
});

// Main Product Component
const Product = ({ onProductSelect, onAddToCart, currentUser, onNavigateToCreateProduct }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const lastFetchTime = useRef(0);

  // Load products from API
  const loadProducts = useCallback(async (forceRefresh = false) => {
    const now = Date.now();

    // Skip fetch if not forced, products exist, and cache is still valid
    if (!forceRefresh && products.length > 0 && (now - lastFetchTime.current) < SCREEN_CONFIG.CACHE_DURATION) {
      setLoading(false); // Ensure loading is false if data is from cache
      setRefreshing(false);
      return;
    }

    if (!refreshing) setLoading(true); // Show loading indicator only if not just refreshing
    setError(null); // Clear previous errors

    const result = await ProductAPIService.fetchProducts();

    if (result.success) {
      setProducts(result.data);
      setFilteredProducts(result.data); // Initialize filtered products with all products
      lastFetchTime.current = now;
    } else {
      setError(result.error || 'Failed to load products');
      if (products.length === 0) { // Only show alert if no products are loaded at all
        Alert.alert('Error', 'Failed to load products. Please try again later.'); // Consider custom modal here too
      }
    }

    setLoading(false);
    setRefreshing(false);
  }, [products.length, refreshing]); // Dependencies for useCallback

  // Fetch products when the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadProducts();
    }, [loadProducts])
  );

  // Handle refresh
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    loadProducts(true); // Force refresh
  }, [loadProducts]);

  // Handle search input change
  const handleSearchChange = useCallback((query) => {
    setSearchQuery(query);

    if (query.trim() === '') {
      setFilteredProducts(products); // Show all products if search query is empty
    } else {
      const searchTerm = query.toLowerCase();
      const filtered = products.filter(product => {
        const name = (product.name || product.description || '').toLowerCase();
        const brand = (product.brand || '').toLowerCase();
        const category = (product.category || '').toLowerCase();

        return name.includes(searchTerm) ||
               brand.includes(searchTerm) ||
               category.includes(searchTerm);
      });
      setFilteredProducts(filtered);
    }
  }, [products]);

  // Handle product selection (for navigating to ProductDetails)
  const handleProductSelect = useCallback((product) => {
    if (onProductSelect && typeof onProductSelect === 'function') {
      // Pass a callback to update the product in the list if details page modifies it
      onProductSelect({
        ...product,
        onProductUpdate: (updatedProduct) => {
          // Update the main products array
          setProducts(prevProducts =>
            prevProducts.map(p =>
              (p._id || p.id) === (updatedProduct._id || updatedProduct.id)
                ? updatedProduct
                : p
            )
          );

          // Update filtered products based on current search query
          setFilteredProducts(prevFiltered =>
            prevFiltered.map(p =>
              (p._id || p.id) === (updatedProduct._id || updatedProduct.id)
                ? updatedProduct
                : p
            )
          );
        }
      });
    }
  }, [onProductSelect]);

  // Initial load of products when component mounts
  useEffect(() => {
    loadProducts();
  }, []); // Empty dependency array ensures it runs only once on mount

  // Render function for each product item in FlatList
  const renderProduct = useCallback(({ item }) => (
    <ProductCard
      product={item}
      onProductSelect={handleProductSelect}
      onAddToCart={onAddToCart} // Pass onAddToCart to ProductCard
      // isAdmin prop removed
    />
  ), [handleProductSelect, onAddToCart]); // isAdmin removed from dependencies

  // Render component for empty list state
  const renderEmpty = useCallback(() => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        {searchQuery.trim() !== ''
          ? 'No products found matching your search.'
          : 'No products available.'}
      </Text>
      <TouchableOpacity style={styles.retryButton} onPress={() => loadProducts(true)}>
        <Text style={styles.retryButtonText}>Retry</Text>
      </TouchableOpacity>
    </View>
  ), [searchQuery, loadProducts]);

  // Loading state display
  if (loading && products.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

  // Error state display
  if (error && products.length === 0) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => loadProducts(true)}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Search Header */}
      <View style={styles.searchCartRow}>
        <TextInput
          style={styles.searchBox}
          placeholder="Search products..."
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={handleSearchChange}
        />
        {/* Search Icon - functional for visual cue */}
        <TouchableOpacity style={styles.iconButton} onPress={() => console.log('Search button pressed')}>
          <Text style={styles.icon}>🔍</Text>
        </TouchableOpacity>
        {/* Cart Icon - direct navigation to cart if needed, but App.js handles this */}
        {/* This icon is redundant if App.js header already has a cart icon, can be removed */}
        {/* <TouchableOpacity style={styles.iconButton} onPress={() => console.log('Cart button pressed in Products')}>
          <Text style={styles.icon}>🛒</Text>
        </TouchableOpacity> */}
      </View>

      {/* "Add Product" button - visible to all authenticated users */}
      {currentUser && (
        <TouchableOpacity style={styles.addButton} onPress={onNavigateToCreateProduct}>
          <Ionicons name="add-circle-outline" size={28} color="#fff" />
          <Text style={styles.addButtonText}>Add Product</Text>
        </TouchableOpacity>
      )}

      {/* Product List using FlatList for performance */}
      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={item => item._id || item.id || Math.random().toString()} // Ensure unique keys
        numColumns={2} // Two columns for grid layout
        columnWrapperStyle={styles.flexGrid} // Styles for row wrapping
        contentContainerStyle={styles.listContainer} // Padding for the entire list
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#007AFF']} // iOS refresh indicator color
            tintColor="#007AFF" // Android refresh indicator color
          />
        }
        ListEmptyComponent={renderEmpty} // Component to render when list is empty
        removeClippedSubviews={true} // Performance optimization
        maxToRenderPerBatch={10} // Performance optimization
        windowSize={10} // Performance optimization
        initialNumToRender={8} // Performance optimization
        // getItemLayout for performance with fixed height items
        getItemLayout={(data, index) => ({
          length: 250, // Approximate height of a product card
          offset: 250 * Math.floor(index / 2),
          index,
        })}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#64748b',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8fafc',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  searchCartRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  searchBox: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  iconButton: {
    padding: 8,
    marginLeft: 4,
  },
  icon: {
    fontSize: 24,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 80, // Add padding to the bottom of the list for better scrollability
  },
  flexGrid: {
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    width: '48%', // Roughly half the width for two columns with spacing
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 120, // Fixed height for images
    borderRadius: 8,
    marginBottom: 8,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#cbd5e1',
    marginHorizontal: 2,
  },
  activeDot: {
    backgroundColor: '#3b82f6',
  },
  title: {
    fontWeight: '600',
    fontSize: 14,
    color: '#1e293b',
    marginBottom: 8,
    minHeight: 36, // Ensure consistent height for titles across cards
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#059669', // Green for prices
  },
  originalPrice: {
    fontSize: 14,
    color: '#94a3b8',
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  stockText: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 8,
  },
  cartButton: {
    backgroundColor: '#fbbf24', // Yellow color for cart button
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  disabledCartButton: {
    backgroundColor: '#e5e7eb', // Grey for disabled button
  },
  cartButtonText: {
    color: '#000000', // Black text for cart button
    fontSize: 14,
    fontWeight: '600',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3b82f6', // Blue background for add button
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginBottom: 16,
    alignSelf: 'flex-start', // Align to the start of the row
  },
  addButtonText: {
    marginLeft: 8,
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Product;
