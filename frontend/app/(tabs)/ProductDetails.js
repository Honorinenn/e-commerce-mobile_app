import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';

export default function ProductDetails({ product, onBack, user, onEdit }) {
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://fictional-spoon-xxvg46rwgvcxr5-3001.app.github.dev/api/products/${product._id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`, // Include token if required
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        Alert.alert('Error', errorData.error || 'Failed to delete the product.');
        return;
      }

      Alert.alert('Success', 'Product deleted successfully.');
      onBack(); // Navigate back after deletion
    } catch (error) {
      console.error('Error deleting product:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Image source={{ uri: product.images[0] }} style={styles.productImage} />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>

      {user?.role === 'admin' && (
        <>
          <TouchableOpacity style={styles.editButton} onPress={() => onEdit(product)}>
            <Text style={styles.editButtonText}>Edit Product</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.deleteButtonText}>Delete Product</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#71C9F8',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
  },
  productImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 20,
    color: '#888',
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: '#FF6B6B',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  deleteButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
  },
  editButton: {
    backgroundColor: '#FFA500',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  editButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
  },
});

{stage === 'productDetails' && (
  <ProductDetails product={selectedProduct} onBack={onBackToProducts} user={user} />
)}