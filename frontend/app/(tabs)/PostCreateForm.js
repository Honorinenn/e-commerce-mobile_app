import React, { useState } from 'react';
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
import { PostAPIService } from './api';

const PostCreateForm = ({ currentUser, onPostCreated, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [contact, setContact] = useState('');
  const [images, setImages] = useState(['']);
  const [loading, setLoading] = useState(false);

  const handleAddImageUrl = () => {
    if (images.length < 5) { // Limit to 5 images
      setImages([...images, '']);
    } else {
      Alert.alert('Limit Reached', 'You can add a maximum of 5 image URLs.');
    }
  };

  const handleRemoveImageUrl = (index) => {
    if (images.length > 1) {
      const newImages = images.filter((_, i) => i !== index);
      setImages(newImages);
    } else {
      setImages(['']); // Keep at least one empty field
    }
  };

  const handleImageUrlChange = (index, value) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  const validateImageUrl = (url) => {
    if (!url.trim()) return true; // Allow empty URLs
    try {
      new URL(url);
      return /\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i.test(url);
    } catch {
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim() || !contact.trim()) {
      Alert.alert('Missing Fields', 'Please fill in all required fields: Title, Content, and Contact.');
      return;
    }

    // Validate image URLs
    const nonEmptyImages = images.filter(img => img.trim() !== '');
    const invalidImages = nonEmptyImages.filter(img => !validateImageUrl(img));
    
    if (invalidImages.length > 0) {
      Alert.alert('Invalid Image URLs', 'Please check your image URLs. Some are not valid image URLs.');
      return;
    }

    setLoading(true);
    const postData = {
      title: title.trim(),
      content: content.trim(),
      contact: contact.trim(),
      images: nonEmptyImages.length > 0 ? nonEmptyImages : [],
    };

    try {
      const result = await PostAPIService.createPost(postData);
      if (result.success) {
        Alert.alert('Success', 'Post created successfully!');
        onPostCreated(result.data);
        // Reset form
        setTitle('');
        setContent('');
        setContact('');
        setImages(['']);
      } else {
        Alert.alert('Creation Failed', result.error || 'Could not create post.');
      }
    } catch (error) {
      console.error('Create post error:', error);
      Alert.alert('Error', 'An unexpected error occurred while creating the post.');
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return (
      <View style={styles.centeredMessage}>
        <Ionicons name="lock-closed-outline" size={64} color="#6b7280" />
        <Text style={styles.unauthorizedText}>
          Please log in to create posts.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Create New Post</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Title*</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="e.g., Looking for apartment recommendations"
          maxLength={100}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Content*</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={content}
          onChangeText={setContent}
          placeholder="Detailed description of your post..."
          multiline
          numberOfLines={4}
          maxLength={1000}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Contact Information*</Text>
        <TextInput
          style={styles.input}
          value={contact}
          onChangeText={setContact}
          placeholder="e.g., email@example.com or phone number"
          maxLength={100}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Image URLs (Optional, up to 5)</Text>
        {images.map((imageUrl, index) => (
          <View key={index} style={styles.imageUrlRow}>
            <TextInput
              style={[styles.input, styles.imageUrlInput]}
              value={imageUrl}
              onChangeText={(text) => handleImageUrlChange(index, text)}
              placeholder={`Image URL #${index + 1}`}
              autoCapitalize="none"
              autoCorrect={false}
            />
            {index === images.length - 1 && images.length < 5 && (
              <TouchableOpacity onPress={handleAddImageUrl} style={[styles.urlButton, styles.addButton]}>
                <Ionicons name="add" size={20} color="#059669" />
              </TouchableOpacity>
            )}
            {images.length > 1 && (
              <TouchableOpacity onPress={() => handleRemoveImageUrl(index)} style={[styles.urlButton, styles.removeButton]}>
                <Ionicons name="remove" size={20} color="#ef4444" />
              </TouchableOpacity>
            )}
          </View>
        ))}
        <Text style={styles.limitText}>
          {images.filter(img => img.trim() !== '').length}/5 image URLs
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.submitButton]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Create Post</Text>
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
    fontWeight: '500',
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
  imageUrlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  imageUrlInput: {
    flex: 1,
    marginBottom: 0,
    marginRight: 8,
  },
  urlButton: {
    padding: 8,
    borderRadius: 6,
    marginLeft: 4,
  },
  addButton: {
    backgroundColor: '#d1fae5',
  },
  removeButton: {
    backgroundColor: '#fee2e2',
  },
  limitText: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 4,
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
    backgroundColor: '#10b981',
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

export default PostCreateForm;
