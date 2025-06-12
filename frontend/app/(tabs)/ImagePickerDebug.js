import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ImagePickerDebug = () => {
  const [assetInfo, setAssetInfo] = useState(null);

  const testImagePicker = async () => {
    try {
      console.log('🔍 === IMAGE PICKER DEBUG TEST ===');
      
      // Request permission
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Please grant camera roll permissions.');
        return;
      }

      // Pick image
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: false,
        quality: 0.8,
        allowsEditing: false,
      });

      console.log('📊 ImagePicker raw result:', result);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        
        console.log('📸 Selected asset - FULL OBJECT:');
        console.log(JSON.stringify(asset, null, 2));
        
        console.log('📊 Asset properties analysis:');
        Object.keys(asset).forEach(key => {
          console.log(`  - ${key}:`, typeof asset[key], asset[key]);
        });
        
        // Test FormData creation
        console.log('🧪 Testing FormData creation...');
        const formData = new FormData();
        
        const imageFile = {
          uri: asset.uri,
          type: asset.mimeType || asset.type || 'image/jpeg',
          name: asset.fileName || asset.filename || `test_${Date.now()}.jpg`,
        };
        
        console.log('🖼️ Image file object for FormData:', imageFile);
        
        try {
          formData.append('image', imageFile);
          console.log('✅ FormData creation successful');
          
          if (formData._parts) {
            console.log('📋 FormData._parts:', formData._parts);
          }
        } catch (formDataError) {
          console.error('❌ FormData creation failed:', formDataError);
        }
        
        setAssetInfo({
          original: asset,
          processed: imageFile,
          timestamp: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('💥 Image picker test failed:', error);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>
        🔍 Image Picker Debug
      </Text>
      
      <TouchableOpacity
        style={{
          backgroundColor: '#007AFF',
          padding: 15,
          borderRadius: 8,
          marginBottom: 20
        }}
        onPress={testImagePicker}
      >
        <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
          Test Image Picker
        </Text>
      </TouchableOpacity>
      
      {assetInfo && (
        <View style={{ backgroundColor: '#f0f0f0', padding: 15, borderRadius: 8 }}>
          <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>
            Asset Info ({assetInfo.timestamp}):
          </Text>
          <Text style={{ fontFamily: 'monospace', fontSize: 12 }}>
            {JSON.stringify(assetInfo, null, 2)}
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default ImagePickerDebug;
