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

  const handleImagesChange = useCallback((newImageUrls) => {
    console.log('🖼️ === PRODUCT FORM IMAGE CHANGE ===');
    console.log('📊 Previous image URLs:', imageUrls.length);
    console.log('📊 New image URLs:', newImageUrls.length);
    console.log('🔗 Image URLs updated:', newImageUrls);
    
    setImageUrls(newImageUrls);
    console.log('✅ Product form state updated with new image URLs');
  }, [imageUrls.length]);

  const handleSubmit = async () => {
    console.log('🛒 === PRODUCT CREATION START ===');
    
    try {
      console.log('📋 Step 1: Form validation...');
      
      const formData = {
        name: name.trim(),
        description: description.trim(),
        price: price.trim(),
        stockQuantity: stockQuantity.trim(),
        imageUrls: imageUrls
      };
      
      console.log('📊 Form data:', formData);
      
      if (!formData.name || !formData.description || !formData.price || !formData.stockQuantity) {
        const missingFields = [];
        if (!formData.name) missingFields.push('Name');
        if (!formData.description) missingFields.push('Description');
        if (!formData.price) missingFields.push('Price');
        if (!formData.stockQuantity) missingFields.push('Stock Quantity');
        
        const errorMsg = `Missing required fields: ${missingFields.join(', ')}`;
        console.log('❌ Step 1 Failed:', errorMsg);
        Alert.alert('Missing Fields', 'Please fill in all required fields: Name, Description, Price, and Stock Quantity.');
        return;
      }
      console.log('✅ Step 1: Required fields validation passed');
      
      console.log('🔢 Step 2: Number validation...');
      const parsedPrice = parseFloat(formData.price);
      const parsedStock = parseInt(formData.stockQuantity, 10);

      console.log('📊 Parsed numbers:', { parsedPrice, parsedStock });

      if (isNaN(parsedPrice) || parsedPrice <= 0) {
        console.log('❌ Step 2 Failed: Invalid price');
        Alert.alert('Invalid Price', 'Please enter a valid price greater than 0.');
        return;
      }
      if (isNaN(parsedStock) || parsedStock < 0) {
        console.log('❌ Step 2 Failed: Invalid stock');
        Alert.alert('Invalid Stock', 'Please enter a valid stock quantity (0 or more).');
        return;
      }
      console.log('✅ Step 2: Number validation passed');

      console.log('🖼️ Step 3: Image URLs processing...');
      console.log('📊 Current image URLs:', imageUrls);
      
      const finalImageUrls = imageUrls.length > 0 ? imageUrls : [ProductConfig.DEFAULT_IMAGE];
      console.log('📊 Final image URLs:', finalImageUrls);
      
      setLoading(true);
      console.log('🔄 Step 4: Creating product data...');
      
      const productData = {
        name: formData.name,
        description: formData.description,
        price: parsedPrice,
        stockQuantity: parsedStock,
        images: finalImageUrls,
        brand: brand.trim() || 'Generic Brand',
        category: category.trim() || 'General',
      };

      console.log('📦 Final product data:', productData);
      console.log('⬆️ Step 5: Sending to API...');
      
      const apiStartTime = Date.now();
      const result = await ProductAPIService.createProduct(productData);
      const apiDuration = Date.now() - apiStartTime;
      
      console.log(`⏱️ API call completed in ${apiDuration}ms`);
      console.log('📊 API result:', result);
      
      if (result.success) {
        console.log('🎉 Step 5: Product creation successful!');
        console.log('🆔 Product ID:', result.data?._id || result.data?.id);
        
        // Success message with navigation hint
        Alert.alert(
          'Success', 
          'Product created successfully! Redirecting to product details...', 
          [{ 
            text: 'OK', 
            onPress: () => {
              console.log('✅ User acknowledged success, calling onProductCreated');
              onProductCreated(result.data);
            }
          }]
        );
        
        console.log('🔄 Step 6: Resetting form...');
        // Reset form fields
        setName('');
        setDescription('');
        setPrice('');
        setStockQuantity('');
        setImageUrls([]);
        setBrand('');
        setCategory('');
        console.log('✅ Step 6: Form reset completed');
        
      } else {
        console.log('❌ Step 5 Failed: API returned error');
        console.log('🚨 API error:', result.error);
        Alert.alert('Creation Failed', result.error || 'Could not create product.');
      }
      
    } catch (error) {
      console.error('💥 === PRODUCT CREATION FAILED ===');
      console.error('❌ Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      Alert.alert('Error', 'An unexpected error occurred while creating the product.');
    } finally {
      setLoading(false);
      console.log('🏁 Product creation process completed');
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

      {/* New ImageUpload Component */}
      <ImageUpload
        imageUrls={imageUrls}
        onImagesChange={handleImagesChange}
        maxImages={ProductConfig.MAX_IMAGE_URLS}
        showUrlInput={false}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.submitButton]}
          onPress={handleSubmit}
          disabled={loading}
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
          disabled={loading}
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
});

export default ProductCreateForm;
