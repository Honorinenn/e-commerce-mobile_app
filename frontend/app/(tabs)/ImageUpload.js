import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { uploadImage, validateImage } from './imageService';

const ImageUpload = ({
  imageUrls = [],
  onImagesChange,
  maxImages = 5,
  showUrlInput = true, // Enable URL input like reference app
}) => {
  const [uploading, setUploading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [urlInput, setUrlInput] = useState('');
  const [showUrlModal, setShowUrlModal] = useState(false);
  const [expandedImage, setExpandedImage] = useState(null);

  const handleImagePicker = async () => {
    console.log('🖼️ === IMAGE PICKER START ===');
    
    try {
      console.log('📋 Step 1: Checking image limit...');
      if (imageUrls.length >= maxImages) {
        const errorMsg = `Image limit reached: ${imageUrls.length}/${maxImages}`;
        console.log('❌ Step 1 Failed:', errorMsg);
        Alert.alert('Limit Reached', `You can upload a maximum of ${maxImages} images.`);
        return;
      }
      console.log('✅ Step 1: Image limit check passed');

      console.log('🔐 Step 2: Requesting media library permissions...');
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      console.log('📱 Permission status:', status);
      
      if (status !== 'granted') {
        console.log('❌ Step 2 Failed: Permission denied');
        Alert.alert('Permission Required', 'Please grant camera roll permissions to upload images.');
        return;
      }
      console.log('✅ Step 2: Permissions granted');

      console.log('🎯 Step 3: Launching image picker...');
      const pickerOptions = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        selectionLimit: maxImages - imageUrls.length,
        quality: 0.8,
        allowsEditing: false,
      };
      console.log('⚙️ Picker options:', pickerOptions);
      
      const result = await ImagePicker.launchImageLibraryAsync(pickerOptions);
      console.log('📊 Picker result:', {
        canceled: result.canceled,
        assetsCount: result.assets ? result.assets.length : 0
      });

      if (!result.canceled && result.assets) {
        console.log('✅ Step 3: Image picker completed successfully');
        console.log('📸 Raw ImagePicker result:', result);
        console.log('📊 Assets count:', result.assets.length);
        
        result.assets.forEach((asset, index) => {
          console.log(`📱 Asset ${index + 1} - Complete object:`, asset);
          console.log(`📱 Asset ${index + 1} - Detailed analysis:`, {
            uri: asset.uri,
            uriType: typeof asset.uri,
            uriLength: asset.uri ? asset.uri.length : 0,
            uriStart: asset.uri ? asset.uri.substring(0, 50) : 'undefined',
            type: asset.type,
            mimeType: asset.mimeType,
            fileName: asset.fileName,
            filename: asset.filename,
            fileSize: asset.fileSize,
            width: asset.width,
            height: asset.height,
            allKeys: Object.keys(asset)
          });
        });
        
        await handleImageUpload(result.assets);
      } else {
        console.log('ℹ️ Step 3: Image picker was canceled by user');
      }
    } catch (error) {
      console.error('💥 IMAGE PICKER FAILED:', error);
      Alert.alert('Error', `Image picker failed: ${error.message}`);
    }
  };

  const handleCameraCapture = async () => {
    console.log('📷 === CAMERA CAPTURE START ===');
    
    try {
      console.log('📋 Step 1: Checking image limit...');
      if (imageUrls.length >= maxImages) {
        const errorMsg = `Image limit reached: ${imageUrls.length}/${maxImages}`;
        console.log('❌ Step 1 Failed:', errorMsg);
        Alert.alert('Limit Reached', `You can upload a maximum of ${maxImages} images.`);
        return;
      }
      console.log('✅ Step 1: Image limit check passed');

      console.log('🔐 Step 2: Requesting camera permissions...');
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      console.log('📱 Camera permission status:', status);
      
      if (status !== 'granted') {
        console.log('❌ Step 2 Failed: Camera permission denied');
        Alert.alert('Permission Required', 'Please grant camera permissions to take photos.');
        return;
      }
      console.log('✅ Step 2: Camera permissions granted');

      console.log('📸 Step 3: Launching camera...');
      const cameraOptions = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        allowsEditing: true,
        aspect: [4, 3],
      };
      console.log('⚙️ Camera options:', cameraOptions);
      
      const result = await ImagePicker.launchCameraAsync(cameraOptions);
      console.log('📊 Camera result:', {
        canceled: result.canceled,
        assetsCount: result.assets ? result.assets.length : 0
      });

      if (!result.canceled && result.assets) {
        console.log('✅ Step 3: Camera capture completed successfully');
        console.log('📸 Captured asset:', result.assets.map(asset => ({
          uri: asset.uri,
          type: asset.type,
          fileName: asset.fileName,
          fileSize: asset.fileSize
        })));
        
        await handleImageUpload(result.assets);
      } else {
        console.log('ℹ️ Step 3: Camera capture was canceled by user');
      }
    } catch (error) {
      console.error('💥 CAMERA CAPTURE FAILED:', error);
      Alert.alert('Error', `Camera capture failed: ${error.message}`);
    }
  };

  const handleImageUpload = async (assets) => {
    console.log('🚀 === BATCH IMAGE UPLOAD START ===');
    console.log('📊 Upload batch size:', assets.length);
    
    setUploading(true);
    const uploadedUrls = [];
    const previews = [];
    let currentAssetIndex = 0;

    try {
      console.log('📋 Step 1: Pre-upload validation...');
      
      if (!assets || assets.length === 0) {
        throw new Error('❌ STEP 1 FAILED: No assets provided for upload');
      }
      
      console.log('✅ Step 1: Pre-upload validation passed');
      
      for (const asset of assets) {
        currentAssetIndex++;
        console.log(`\n🔄 === PROCESSING ASSET ${currentAssetIndex}/${assets.length} ===`);
        
        try {
          console.log('📸 Asset preview creation...');
          if (!asset.uri) {
            throw new Error('❌ Asset missing URI for preview');
          }
          previews.push(asset.uri);
          console.log('✅ Preview created for asset');

          console.log('⬆️ Starting upload for asset...');
          const uploadStartTime = Date.now();
          
          const response = await uploadImage(asset);
          
          const uploadDuration = Date.now() - uploadStartTime;
          console.log(`⏱️ Upload completed in ${uploadDuration}ms`);
          console.log('📊 Upload response summary:', {
            success: response.success,
            hasImageUrl: !!response.imageUrl,
            errorPresent: !!response.error
          });
          
          if (response.success && response.imageUrl) {
            uploadedUrls.push(response.imageUrl);
            console.log(`✅ Asset ${currentAssetIndex} uploaded successfully`);
            console.log('🔗 URL:', response.imageUrl);
          } else {
            const errorDetails = response.error || 'Unknown upload error';
            console.error(`❌ Asset ${currentAssetIndex} upload failed:`, errorDetails);
            throw new Error(`Upload failed for asset ${currentAssetIndex}: ${errorDetails}`);
          }
          
        } catch (assetError) {
          console.error(`💥 Asset ${currentAssetIndex} processing failed:`, assetError);
          throw new Error(`Asset ${currentAssetIndex} failed: ${assetError.message}`);
        }
      }

      console.log('🔄 Step 2: Updating component state...');
      try {
        const newUrls = [...imageUrls, ...uploadedUrls];
        const newPreviews = [...imagePreviews, ...previews];
        
        console.log('📊 State update details:', {
          previousUrls: imageUrls.length,
          newlyUploaded: uploadedUrls.length,
          totalUrls: newUrls.length
        });
        
        setImagePreviews(newPreviews);
        onImagesChange(newUrls);
        console.log('✅ Step 2: Component state updated successfully');
      } catch (stateError) {
        throw new Error(`❌ STEP 2 FAILED: Could not update component state - ${stateError.message}`);
      }

      console.log('🎉 === BATCH UPLOAD COMPLETED SUCCESSFULLY ===');
      console.log(`📊 Final results: ${uploadedUrls.length}/${assets.length} assets uploaded`);
      
      Alert.alert(
        'Success', 
        `${uploadedUrls.length} image(s) uploaded successfully!`,
        [{ text: 'OK', onPress: () => console.log('✅ Success alert acknowledged') }]
      );
      
    } catch (error) {
      console.error('💥 === BATCH UPLOAD FAILED ===');
      console.error('❌ Failure details:', {
        message: error.message,
        failedAtAsset: currentAssetIndex,
        totalAssets: assets.length,
        successfulUploads: uploadedUrls.length,
        stack: error.stack
      });
      
      Alert.alert(
        'Upload Failed', 
        `Could not upload images: ${error.message}\n\nFailed at asset ${currentAssetIndex}/${assets.length}`,
        [{ text: 'OK', onPress: () => console.log('❌ Error alert acknowledged') }]
      );
    } finally {
      setUploading(false);
      console.log('🏁 Upload process completed (success or failure)');
    }
  };

  const handleRemoveImage = (index) => {
    const newUrls = imageUrls.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    
    setImagePreviews(newPreviews);
    onImagesChange(newUrls);
  };

  const handleAddImageUrl = () => {
    if (imageUrls.length >= maxImages) {
      Alert.alert('Limit Reached', `You can upload a maximum of ${maxImages} images.`);
      return;
    }
    setShowUrlModal(true);
  };

  const handleConfirmUrl = () => {
    if (!urlInput.trim()) {
      Alert.alert('Invalid URL', 'Please enter a valid image URL.');
      return;
    }

    // Basic URL validation
    const urlPattern = /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i;
    if (!urlPattern.test(urlInput.trim())) {
      Alert.alert('Invalid URL', 'Please enter a valid image URL ending with .jpg, .png, .gif, or .webp');
      return;
    }

    const newUrls = [...imageUrls, urlInput.trim()];
    onImagesChange(newUrls);
    setUrlInput('');
    setShowUrlModal(false);
    Alert.alert('Success', 'Image URL added successfully!');
  };

  const handleExpandImage = (uri) => {
    setExpandedImage(uri);
  };

  const renderImagePreview = (uri, index) => (
    <View key={index} style={styles.imageContainer}>
      <Image source={{ uri }} style={styles.imagePreview} />
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => handleRemoveImage(index)}
      >
        <Ionicons name="close-circle" size={24} color="#ff4444" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Images ({imageUrls.length}/{maxImages})</Text>
      
      {/* Upload Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.uploadButton, uploading && styles.uploadButtonDisabled]}
          onPress={handleImagePicker}
          disabled={uploading || imageUrls.length >= maxImages}
        >
          {uploading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Ionicons name="image" size={20} color="#fff" />
          )}
          <Text style={styles.uploadButtonText}>
            {uploading ? 'Uploading...' : 'Gallery'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.uploadButton, uploading && styles.uploadButtonDisabled]}
          onPress={handleCameraCapture}
          disabled={uploading || imageUrls.length >= maxImages}
        >
          <Ionicons name="camera" size={20} color="#fff" />
          <Text style={styles.uploadButtonText}>Camera</Text>
        </TouchableOpacity>

        {showUrlInput && (
          <TouchableOpacity
            style={[styles.uploadButton, styles.urlButton]}
            onPress={handleAddImageUrl}
            disabled={imageUrls.length >= maxImages}
          >
            <Ionicons name="link" size={20} color="#fff" />
            <Text style={styles.uploadButtonText}>URL</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Image Previews */}
      {(imageUrls.length > 0 || imagePreviews.length > 0) && (
        <ScrollView horizontal style={styles.previewContainer} showsHorizontalScrollIndicator={false}>
          {imagePreviews.map((uri, index) => (
            <TouchableOpacity key={`preview-${index}`} onPress={() => handleExpandImage(uri)}>
              {renderImagePreview(uri, index)}
            </TouchableOpacity>
          ))}
          {imageUrls.map((url, index) => {
            if (index >= imagePreviews.length) {
              return (
                <TouchableOpacity key={`url-${index}`} onPress={() => handleExpandImage(url)}>
                  {renderImagePreview(url, index)}
                </TouchableOpacity>
              );
            }
            return null;
          })}
        </ScrollView>
      )}

      {imageUrls.length === 0 && (
        <View style={styles.emptyState}>
          <Ionicons name="image-outline" size={48} color="#ccc" />
          <Text style={styles.emptyStateText}>No images selected</Text>
          <Text style={styles.emptyStateSubtext}>
            Tap Gallery, Camera{showUrlInput ? ', or URL' : ''} to add images
          </Text>
        </View>
      )}

      {/* URL Input Modal */}
      <Modal
        visible={showUrlModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowUrlModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Image URL</Text>
            <TextInput
              style={styles.urlInput}
              value={urlInput}
              onChangeText={setUrlInput}
              placeholder="https://example.com/image.jpg"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelModalButton]}
                onPress={() => {
                  setUrlInput('');
                  setShowUrlModal(false);
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmModalButton]}
                onPress={handleConfirmUrl}
              >
                <Text style={styles.confirmButtonText}>Add URL</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Image Expansion Modal */}
      <Modal
        visible={!!expandedImage}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setExpandedImage(null)}
      >
        <View style={styles.expandModalOverlay}>
          <TouchableOpacity
            style={styles.expandModalContent}
            activeOpacity={1}
            onPress={() => setExpandedImage(null)}
          >
            <Image
              source={{ uri: expandedImage }}
              style={styles.expandedImage}
              resizeMode="contain"
            />
            <TouchableOpacity
              style={styles.closeExpandButton}
              onPress={() => setExpandedImage(null)}
            >
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
    flex: 1,
    justifyContent: 'center',
  },
  uploadButtonDisabled: {
    backgroundColor: '#ccc',
  },
  uploadButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  urlButton: {
    backgroundColor: '#6c757d',
  },
  previewContainer: {
    marginTop: 8,
  },
  imageContainer: {
    position: 'relative',
    marginRight: 12,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  removeButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e9ecef',
    borderStyle: 'dashed',
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6c757d',
    marginTop: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#adb5bd',
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  urlInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelModalButton: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  confirmModalButton: {
    backgroundColor: '#007AFF',
  },
  cancelButtonText: {
    color: '#6c757d',
    fontWeight: '600',
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  expandModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  expandModalContent: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  expandedImage: {
    width: '90%',
    height: '70%',
  },
  closeExpandButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 8,
  },
});

export default ImageUpload;
