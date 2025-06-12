import React, { useCallback, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './PostDetails.styles';
import { PostDataManager } from './api';

const CONFIG = {
  MAX_IMAGE_URLS: 5,
};

const ImageURLEditor = React.memo(({ images, onImagesChange, loading }) => {
  const [urlErrors, setUrlErrors] = useState({});

  const handleImageUrlChange = useCallback((index, value) => {
    const newImages = [...images];
    newImages[index] = value;
    onImagesChange(newImages);
    
    // Clear error for this field
    setUrlErrors(prev => ({ ...prev, [index]: false }));
  }, [images, onImagesChange]);

  const handleAddImageUrl = useCallback(() => {
    if (images.length < CONFIG.MAX_IMAGE_URLS) {
      onImagesChange([...images, '']);
    }
  }, [images, onImagesChange]);

  const handleRemoveImageUrl = useCallback((index) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages.length > 0 ? newImages : ['']);
    
    // Remove error for this index
    const newErrors = { ...urlErrors };
    delete newErrors[index];
    setUrlErrors(newErrors);
  }, [images, onImagesChange, urlErrors]);

  const validateUrl = useCallback((index) => {
    const url = images[index];
    if (url && !PostDataManager.validateImageUrl(url)) {
      setUrlErrors(prev => ({ ...prev, [index]: true }));
    }
  }, [images]);

  return (
    <View style={styles.imageEditorContainer}>
      <Text style={styles.sectionTitle}>Post Images (Max {CONFIG.MAX_IMAGE_URLS})</Text>
      {images.map((url, idx) => (
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
            {idx === images.length - 1 && images.length < CONFIG.MAX_IMAGE_URLS && (
              <TouchableOpacity 
                onPress={handleAddImageUrl} 
                style={[styles.urlButton, styles.addButton]}
                disabled={loading}
              >
                <Ionicons name="add" size={20} color="#059669" />
              </TouchableOpacity>
            )}
            {images.length > 1 && (
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
        {images.length}/{CONFIG.MAX_IMAGE_URLS} image URLs
      </Text>
    </View>
  );
});

const PostEditForm = React.memo(({ 
  editPost, 
  onPostChange, 
  onImagesChange, 
  onSave, 
  onCancel, 
  loading 
}) => {
  const handleFieldChange = useCallback((field, value) => {
    onPostChange({ ...editPost, [field]: value });
  }, [editPost, onPostChange]);

  const handleSave = useCallback(() => {
    // Basic validation
    if (!editPost.title.trim()) {
      Alert.alert('Validation Error', 'Post title is required');
      return;
    }
    
    if (!editPost.content.trim()) {
      Alert.alert('Validation Error', 'Post content is required');
      return;
    }
    
    if (!editPost.contact.trim()) {
      Alert.alert('Validation Error', 'Contact information is required');
      return;
    }

    // Validate all image URLs
    const invalidUrls = editPost.images.filter(url => url && !PostDataManager.validateImageUrl(url));
    if (invalidUrls.length > 0) {
      Alert.alert('Validation Error', 'Please check your image URLs. Some are invalid.');
      return;
    }

    onSave();
  }, [editPost, onSave]);

  return (
    <View style={styles.editFormContainer}>
      <Text style={styles.sectionTitle}>Edit Post Details</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Post Title *</Text>
        <TextInput
          style={styles.input}
          value={editPost.title}
          onChangeText={text => handleFieldChange('title', text)}
          placeholder="Enter post title"
          placeholderTextColor="#9CA3AF"
          editable={!loading}
          maxLength={100}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Content *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={editPost.content}
          onChangeText={text => handleFieldChange('content', text)}
          placeholder="Enter post content"
          placeholderTextColor="#9CA3AF"
          multiline
          numberOfLines={4}
          editable={!loading}
          maxLength={1000}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Contact Information *</Text>
        <TextInput
          style={styles.input}
          value={editPost.contact}
          onChangeText={text => handleFieldChange('contact', text)}
          placeholder="Enter contact information"
          placeholderTextColor="#9CA3AF"
          editable={!loading}
          maxLength={100}
        />
      </View>

      <ImageURLEditor
        images={editPost.images}
        onImagesChange={onImagesChange}
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

export default PostEditForm;
