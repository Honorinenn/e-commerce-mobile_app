import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProductAPIService, ProductDataManager, CONFIG as ProductConfig } from './api';
import ImageUpload from './ImageUpload';


const ProductCreateForm = ({ currentUser, onProductCreated, onCancel }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [imageUrls, setImageUrls] = useState([]);
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  
  const [loading, setLoading] = useState(false);

  const handlePickImage = async () => {
    if (imageUrls.length >= ProductConfig.MAX_IMAGE_URLS) {
      Alert.alert('Limit Reached', `You can upload a maximum of ${ProductConfig.MAX_IMAGE_URLS} images.`);
      return;
    }

    // Request permission for media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Sorry, we need camera roll permissions to make this work!');
      return;
    }

    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8, // Lower quality for faster uploads
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const pickedImageUri = result.assets[0].uri;
        await uploadImageToBackend(pickedImageUri);
      }
    } catch (error) {
      console.error("Image picking error:", error);
      Alert.alert('Image Error', 'Could not pick image. Please try again.');
    }
  };
  
  const uploadImageToBackend = async (imageUri) => {
    if (!imageUri) return;

    setUploadingImages(true);
    const filename = imageUri.split('/').pop();
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : `image`;

    const formData = new FormData();
    formData.append('image', { uri: imageUri, name: filename, type });

    try {
      const token = await AsyncStorage.getItem('userToken'); // Assuming token is stored
      const response = await fetch(IMAGE_UPLOAD_URL, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`, // Important for backend auth
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to upload image. Server error.' }));
        throw new Error(errorData.message || `HTTP error ${response.status}`);
      }

      const responseData = await response.json();
      if (responseData.imageUrl) {
        setImageUrls(prev => [...prev, responseData.imageUrl]);
        Alert.alert('Success', 'Image uploaded and URL added!');
      } else {
        throw new Error('Image URL not found in server response.');
      }
    } catch (error) {
      console.error('Image upload error:', error);
      Alert.alert('Upload Failed', `Could not upload image: ${error.message}`);
    } finally {
      setUploadingImages(false);
    }
  };


  const handleRemoveImage = (indexToRemove) => {
    setImageUrls(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async () => {
    if (!name.trim() || !description.trim() || !price.trim() || !stockQuantity.trim()) {
      Alert.alert('Missing Fields', 'Please fill in all required fields: Name, Description, Price, and Stock Quantity.');
      return;
    }
    
    const parsedPrice = parseFloat(price);
    const parsedStock = parseInt(stockQuantity, 10);

    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      Alert.alert('Invalid Price', 'Please enter a valid price greater than 0.');
      return;
    }
    if (isNaN(parsedStock) || parsedStock < 0) {
      Alert.alert('Invalid Stock', 'Please enter a valid stock quantity (0 or more).');
      return;
    }

    setLoading(true);
    const productData = {
      name: name.trim(),
      description: description.trim(),
      price: parsedPrice,
      stockQuantity: parsedStock,
      images: imageUrls.length > 0 ? imageUrls : [ProductConfig.DEFAULT_IMAGE], // Use default if no images
      brand: brand.trim() || 'Generic Brand',
      category: category.trim() || 'General',
      // Add other fields as necessary, e.g., specifications
    };

    try {
      const result = await ProductAPIService.createProduct(productData);
      if (result.success) {
        // Success message with navigation hint
        Alert.alert(
          'Success', 
          'Product created successfully! Redirecting to product details...', 
          [{ text: 'OK', onPress: () => onProductCreated(result.data) }]
        );
        // Reset form fields
        setName('');
        setDescription('');
        setPrice('');
        setStockQuantity('');
        setImageUrls([]);
        setBrand('');
        setCategory('');
      } else {
        Alert.alert('Creation Failed', result.error || 'Could not create product.');
      }
    } catch (error) {
      console.error('Create product error:', error);
      Alert.alert('Error', 'An unexpected error occurred while creating the product.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Create New Product</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Product Name*</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="e.g., Wireless Headphones"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Description*</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Detailed product description"
          multiline
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Price (USD)*</Text>
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          placeholder="e.g., 99.99"
          keyboardType="numeric"
        />
      </View>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Stock Quantity*</Text>
        <TextInput
          style={styles.input}
          value={stockQuantity}
          onChangeText={setStockQuantity}
          placeholder="e.g., 100"
          keyboardType="number-pad"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Brand</Text>
        <TextInput
          style={styles.input}
          value={brand}
          onChangeText={setBrand}
          placeholder="e.g., Sony, Apple"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Category</Text>
        <TextInput
          style={styles.input}
          value={category}
          onChangeText={setCategory}
          placeholder="e.g., Electronics, Books"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Product Images (up to {ProductConfig.MAX_IMAGE_URLS})</Text>
        <TouchableOpacity style={styles.imagePickerButton} onPress={handlePickImage} disabled={uploadingImages || imageUrls.length >= ProductConfig.MAX_IMAGE_URLS}>
          <Ionicons name="camera-outline" size={22} color="#fff" />
          <Text style={styles.imagePickerButtonText}>Add Image from Library</Text>
          {uploadingImages && <ActivityIndicator size="small" color="#fff" style={{ marginLeft: 10}} />}
        </TouchableOpacity>
        
        <View style={styles.imagePreviewContainer}>
          {imageUrls.map((url, index) => (
            <View key={index} style={styles.imagePreviewItem}>
              <Text numberOfLines={1} style={styles.imageUrlText}>{url.split('/').pop()}</Text>
              <TouchableOpacity onPress={() => handleRemoveImage(index)} style={styles.removeImageButton}>
                <Ionicons name="close-circle" size={24} color="#EF4444" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>


      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.submitButton]}
          onPress={handleSubmit}
          disabled={loading || uploadingImages}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Create Product</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={onCancel}
          disabled={loading || uploadingImages}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 12 : 10,
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  imagePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 5,
    justifyContent: 'center',
    marginBottom: 10,
  },
  imagePickerButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
  imagePreviewContainer: {
    marginTop: 10,
  },
  imagePreviewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#e9ecef',
    padding: 10,
    borderRadius: 5,
    marginBottom: 8,
  },
  imageUrlText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    marginRight: 10,
  },
  removeImageButton: {
    padding: 5,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'column',
  },
  button: {
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#28a745',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  centeredMessage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  unauthorizedText: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
});

export default ProductCreateForm;
