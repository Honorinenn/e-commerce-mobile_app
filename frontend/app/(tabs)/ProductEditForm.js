import React, { useCallback, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './ProductDetails.styles';
import { ProductDataManager } from './api';
import ImageUpload from './ImageUpload';

const CONFIG = {
  MAX_IMAGE_URLS: 5, // Reduced for better performance
};

const ImageEditorWithUpload = React.memo(({ imageUrls, onImageUrlsChange, loading }) => {
  const [urlErrors, setUrlErrors] = useState({});

  const handleImageUrlChange = useCallback((index, value) => {
    const newImageUrls = [...imageUrls];
    newImageUrls[index] = value;
    onImageUrlsChange(newImageUrls);
    
    // Clear error for this field
    setUrlErrors(prev => ({ ...prev, [index]: false }));
  }, [imageUrls, onImageUrlsChange]);

  const handleAddImageUrl = useCallback(() => {
    if (imageUrls.length < CONFIG.MAX_IMAGE_URLS) {
      onImageUrlsChange([...imageUrls, '']);
    }
  }, [imageUrls, onImageUrlsChange]);

  const handleRemoveImageUrl = useCallback((index) => {
    const newImageUrls = imageUrls.filter((_, i) => i !== index);
    onImageUrlsChange(newImageUrls.length > 0 ? newImageUrls : ['']);
    
    // Remove error for this index
    const newErrors = { ...urlErrors };
    delete newErrors[index];
    setUrlErrors(newErrors);
  }, [imageUrls, onImageUrlsChange, urlErrors]);

  const validateUrl = useCallback((index) => {
    const url = imageUrls[index];
    if (url && !ProductDataManager.validateImageUrl(url)) {
      setUrlErrors(prev => ({ ...prev, [index]: true }));
    }
  }, [imageUrls]);

  // Handle new images from upload component
  const handleImagesUpload = useCallback((newImageUrls) => {
    console.log('🖼️ ImageEditorWithUpload: Received new image URLs:', newImageUrls);
    
    // If newImageUrls is the complete array, use it directly
    if (Array.isArray(newImageUrls)) {
      const limitedUrls = newImageUrls.slice(0, CONFIG.MAX_IMAGE_URLS);
      console.log('🔄 ImageEditorWithUpload: Setting URLs to:', limitedUrls);
      onImageUrlsChange(limitedUrls);
    }
  }, [onImageUrlsChange]);

  return (
    <View style={styles.imageEditorContainer}>
      <Text style={styles.sectionTitle}>Product Images (Max {CONFIG.MAX_IMAGE_URLS})</Text>
      
      {/* Image Upload Component */}
      <ImageUpload
        imageUrls={imageUrls}
        onImagesChange={handleImagesUpload}
        maxImages={CONFIG.MAX_IMAGE_URLS}
        showUrlInput={true}
      />
      
      {/* Manual URL Entry */}
      <Text style={[styles.sectionTitle, { fontSize: 16, marginTop: 16, marginBottom: 8 }]}>
        Or Enter Image URLs Manually
      </Text>
      
      {imageUrls.map((url, idx) => (
        <View key={idx}>
          <View style={styles.imageUrlRow}>
            <TextInput
              style={[
                styles.input, 
                styles.imageUrlInput,
                urlErrors[idx] && { borderColor: '#EF4444' }
              ]}
              value={url}
              onChangeText={text => handleImageUrlChange(idx, text)}
              onBlur={() => validateUrl(idx)}
              placeholder={`Image URL #${idx + 1}`}
              placeholderTextColor="#9CA3AF"
              editable={!loading}
              autoCapitalize="none"
              autoCorrect={false}
            />
            {idx === imageUrls.length - 1 && imageUrls.length < CONFIG.MAX_IMAGE_URLS && (
              <TouchableOpacity 
                onPress={handleAddImageUrl} 
                style={[styles.urlButton, styles.addButton]}
                disabled={loading}
              >
                <Ionicons name="add" size={20} color="#059669" />
              </TouchableOpacity>
            )}
            {imageUrls.length > 1 && (
              <TouchableOpacity 
                onPress={() => handleRemoveImageUrl(idx)} 
                style={[styles.urlButton, styles.removeButton]}
                disabled={loading}
              >
                <Ionicons name="remove" size={20} color="#EF4444" />
              </TouchableOpacity>
            )}
          </View>
          {urlErrors[idx] && (
            <Text style={styles.errorText}>Please enter a valid image URL</Text>
          )}
        </View>
      ))}
      <Text style={styles.limitText}>
        {imageUrls.length}/{CONFIG.MAX_IMAGE_URLS} image URLs
      </Text>
    </View>
  );
});

const ProductEditForm = React.memo(({ 
  editProduct, 
  onProductChange, 
  onImageUrlsChange, 
  onSave, 
  onCancel, 
  loading 
}) => {
  const handleFieldChange = useCallback((field, value) => {
    onProductChange({ ...editProduct, [field]: value });
  }, [editProduct, onProductChange]);

  const handleSave = useCallback(() => {
    // Basic validation
    if (!editProduct.name.trim()) {
      Alert.alert('Validation Error', 'Product name is required');
      return;
    }
    
    if (!editProduct.price || isNaN(parseFloat(editProduct.price)) || parseFloat(editProduct.price) <= 0) {
      Alert.alert('Validation Error', 'Please enter a valid price greater than 0');
      return;
    }

    // Validate all image URLs
    const invalidUrls = editProduct.imageUrls.filter(url => url && !ProductDataManager.validateImageUrl(url));
    if (invalidUrls.length > 0) {
      Alert.alert('Validation Error', 'Please check your image URLs. Some are invalid.');
      return;
    }

    onSave();
  }, [editProduct, onSave]);

  return (
    <View style={styles.editFormContainer}>
      <Text style={styles.sectionTitle}>Edit Product Details</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Product Name *</Text>
        <TextInput
          style={styles.input}
          value={editProduct.name}
          onChangeText={text => handleFieldChange('name', text)}
          placeholder="Enter product name"
          placeholderTextColor="#9CA3AF"
          editable={!loading}
          maxLength={100}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={editProduct.description}
          onChangeText={text => handleFieldChange('description', text)}
          placeholder="Enter product description"
          placeholderTextColor="#9CA3AF"
          multiline
          numberOfLines={3}
          editable={!loading}
          maxLength={500}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Price *</Text>
        <TextInput
          style={styles.input}
          value={editProduct.price}
          onChangeText={text => handleFieldChange('price', text)}
          placeholder="0.00"
          placeholderTextColor="#9CA3AF"
          keyboardType="decimal-pad"
          editable={!loading}
        />
      </View>

      <ImageEditorWithUpload
        imageUrls={editProduct.imageUrls}
        onImageUrlsChange={onImageUrlsChange}
        loading={loading}
      />

      <View style={styles.editButtonContainer}>
        <TouchableOpacity
          style={[styles.editButton, styles.cancelButton]}
          onPress={onCancel}
          disabled={loading}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.editButton, styles.saveButton]}
          onPress={handleSave}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.saveButtonText}>Save Changes</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
});

export default ProductEditForm;