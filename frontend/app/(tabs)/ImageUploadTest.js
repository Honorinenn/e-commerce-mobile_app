import React, { useState } from 'react';
import { View, Text, Button, Alert, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { uploadImage } from './imageService';

const ImageUploadTest = () => {
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);

  const testImageUpload = async () => {
    try {
      setUploading(true);
      setResult(null);

      // Request permission
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Please grant camera roll permissions to upload images.');
        return;
      }

      // Pick image
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: false,
        quality: 0.8,
        allowsEditing: false,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        console.log('Selected asset:', asset);

        // Upload the image
        const uploadResult = await uploadImage(asset);
        console.log('Upload result:', uploadResult);
        
        setResult(uploadResult);
        
        if (uploadResult.success) {
          Alert.alert('Success', `Image uploaded successfully!\nURL: ${uploadResult.imageUrl}`);
        } else {
          Alert.alert('Failed', `Upload failed: ${uploadResult.error}`);
        }
      }
    } catch (error) {
      console.error('Test error:', error);
      Alert.alert('Error', `Test failed: ${error.message}`);
      setResult({ success: false, error: error.message });
    } finally {
      setUploading(false);
    }
  };

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>
        Image Upload Test
      </Text>
      
      <Button 
        title={uploading ? "Uploading..." : "Test Image Upload"} 
        onPress={testImageUpload}
        disabled={uploading}
      />
      
      {result && (
        <View style={{ marginTop: 20, padding: 10, backgroundColor: '#f0f0f0' }}>
          <Text style={{ fontWeight: 'bold' }}>Result:</Text>
          <Text>{JSON.stringify(result, null, 2)}</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default ImageUploadTest;
