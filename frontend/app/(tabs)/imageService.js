import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE } from '../../constants';

/**
 * Upload an image to Azure Blob Storage via backend API
 * @param {Object} asset - Image asset from ImagePicker
 * @returns {Promise<Object>} Upload result with success status and imageUrl
 */
export const uploadImage = async (asset) => {
  try {
    console.log('🚀 === UPLOAD IMAGE START ===');
    console.log('📱 Step 1: Validating input asset...');
    
    // Detailed asset validation
    if (!asset) {
      throw new Error('❌ STEP 1 FAILED: No asset provided to uploadImage function');
    }
    
    if (!asset.uri) {
      throw new Error('❌ STEP 1 FAILED: Asset missing required uri property');
    }
    
    console.log('✅ Step 1: Asset validation passed');
    console.log('📊 Asset details:', {
      uri: asset.uri,
      type: asset.type || asset.mimeType || 'undefined',
      fileName: asset.fileName || asset.filename || 'undefined',
      fileSize: asset.fileSize || 'undefined',
      width: asset.width || 'undefined',
      height: asset.height || 'undefined'
    });
    
    console.log('🌐 Step 2: Checking API configuration...');
    console.log('🔗 API_BASE:', API_BASE);
    
    if (!API_BASE) {
      throw new Error('❌ STEP 2 FAILED: API_BASE is not configured');
    }
    
    if (!API_BASE.includes('http')) {
      throw new Error('❌ STEP 2 FAILED: API_BASE does not contain valid protocol (http/https)');
    }
    
    console.log('✅ Step 2: API configuration valid');
    
    console.log('📦 Step 3: Creating FormData...');
    
    // Create FormData for multipart upload
    const formData = new FormData();
    
    // React Native requires a specific format for file objects in FormData
    // The object must have uri, type, and name properties (not fileName)
    
    // First, let's validate and normalize the asset properties
    const assetUri = asset.uri;
    const assetType = asset.mimeType || asset.type || asset.mimetype || 'image/jpeg';
    const assetName = asset.fileName || asset.filename || asset.name || `image_${Date.now()}.jpg`;
    
    console.log('🔍 Asset property extraction:');
    console.log('  - Original asset.uri:', asset.uri);
    console.log('  - Original asset.type:', asset.type);
    console.log('  - Original asset.mimeType:', asset.mimeType);
    console.log('  - Original asset.fileName:', asset.fileName);
    console.log('  - Original asset.filename:', asset.filename);
    console.log('  - Normalized uri:', assetUri);
    console.log('  - Normalized type:', assetType);
    console.log('  - Normalized name:', assetName);
    
    // Web-specific asset analysis
    console.log('🌐 Web environment asset analysis:');
    console.log('  - URI starts with blob:', assetUri.startsWith('blob:'));
    console.log('  - URI starts with data:', assetUri.startsWith('data:'));
    console.log('  - URI starts with file:', assetUri.startsWith('file:'));
    console.log('  - URI starts with http:', assetUri.startsWith('http'));
    console.log('  - Full URI type analysis:', {
      length: assetUri.length,
      firstChars: assetUri.substring(0, 20),
      isUrl: /^https?:\/\//.test(assetUri),
      isBlob: /^blob:/.test(assetUri),
      isData: /^data:/.test(assetUri),
      isFile: /^file:/.test(assetUri)
    });
    
    // Validate required properties
    if (!assetUri) {
      throw new Error('❌ STEP 3 FAILED: Asset missing uri property');
    }
    
    if (!assetUri.startsWith('file://') && !assetUri.startsWith('content://') && !assetUri.startsWith('ph://')) {
      console.log('⚠️ Warning: Asset URI might not be a valid file URI:', assetUri);
    }
    
    // Create the properly formatted image file object for React Native FormData
    // Ensure all properties are primitive values (strings) to avoid [Object object] issue
    const imageFile = {
      uri: String(assetUri),
      type: String(assetType),
      name: String(assetName),
    };
    
    console.log('🖼️ Final image file object created:', imageFile);
    console.log('🔍 Property types check:');
    console.log('  - uri type:', typeof imageFile.uri);
    console.log('  - type type:', typeof imageFile.type);
    console.log('  - name type:', typeof imageFile.name);
    
    // Additional validation to prevent [Object object]
    if (imageFile.uri.includes('[object') || imageFile.type.includes('[object') || imageFile.name.includes('[object')) {
      throw new Error('❌ STEP 3 FAILED: One of the image properties contains [object] - asset data is corrupted');
    }
    console.log('🔍 Validating image file object properties:');
    console.log('  - uri:', typeof imageFile.uri, imageFile.uri ? '✅' : '❌');
    console.log('  - type:', typeof imageFile.type, imageFile.type ? '✅' : '❌');
    console.log('  - name:', typeof imageFile.name, imageFile.name ? '✅' : '❌');
    
    try {
      // In React Native, FormData.append expects the file object to have specific properties
      // For Expo Web, we need to handle File objects differently
      
      console.log('🔄 Detecting platform and FormData approach...');
      
      // Check if we're running in a web environment
      const isWeb = typeof window !== 'undefined' && typeof window.File !== 'undefined';
      console.log('🌐 Platform detection:', isWeb ? 'Web/Browser' : 'Native React Native');
      
      if (isWeb) {
        console.log('🔄 Web environment detected - using File/Blob approach');
        
        try {
          // For web environment, we need to convert the asset to a proper File object
          let fileObject;
          
          if (imageFile.uri.startsWith('blob:') || imageFile.uri.startsWith('data:')) {
            console.log('📄 Asset is already a blob/data URL');
            
            // Convert blob/data URL to File object
            const response = await fetch(imageFile.uri);
            const blob = await response.blob();
            fileObject = new File([blob], imageFile.name, { type: imageFile.type });
            
            console.log('✅ Created File object from blob:', {
              name: fileObject.name,
              size: fileObject.size,
              type: fileObject.type
            });
            
          } else if (imageFile.uri.startsWith('file://')) {
            console.log('❌ file:// URIs not supported in web environment');
            throw new Error('File URIs are not supported in web browsers. Please use a different image source.');
            
          } else {
            console.log('🔄 Attempting to fetch remote URI as file...');
            
            try {
              const response = await fetch(imageFile.uri);
              const blob = await response.blob();
              fileObject = new File([blob], imageFile.name, { 
                type: blob.type || imageFile.type 
              });
              
              console.log('✅ Created File object from remote URI:', {
                name: fileObject.name,
                size: fileObject.size,
                type: fileObject.type
              });
              
            } catch (fetchError) {
              throw new Error(`Cannot fetch image from URI: ${fetchError.message}`);
            }
          }
          
          // Append the proper File object to FormData
          formData.append('image', fileObject);
          console.log('✅ Web FormData: File object appended successfully');
          
        } catch (webError) {
          throw new Error(`Web FormData creation failed: ${webError.message}`);
        }
        
      } else {
        console.log('🔄 Native environment detected - using React Native approach');
        
        // Native React Native approach
        console.log('🔄 Attempting FormData.append with method 1: Direct object');
        try {
          formData.append('image', imageFile);
          console.log('✅ Method 1 successful: Direct object append');
        } catch (method1Error) {
          console.log('❌ Method 1 failed:', method1Error.message);
          
          console.log('🔄 Attempting FormData.append with method 2: Explicit object');
          try {
            // Try with a more explicit object definition
            const explicitImageFile = Object.assign({}, {
              uri: imageFile.uri,
              type: imageFile.type,
              name: imageFile.name
            });
            formData.append('image', explicitImageFile);
            console.log('✅ Method 2 successful: Explicit object append');
          } catch (method2Error) {
            console.log('❌ Method 2 failed:', method2Error.message);
            
            console.log('🔄 Attempting FormData.append with method 3: String conversion check');
            // Check if the object is being converted to string
            const objectString = JSON.stringify(imageFile);
            console.log('🔍 Object as string would be:', objectString);
            
            throw new Error(`All FormData methods failed. Object: ${objectString}`);
          }
        }
      }
      
      console.log('✅ Step 3: FormData created successfully');
      console.log('🔍 FormData contents check...');
      
      // Debug: Check if FormData was created properly
      console.log('📊 FormData._parts length:', formData._parts ? formData._parts.length : 'undefined');
      if (formData._parts && formData._parts.length > 0) {
        console.log('📋 FormData parts:', formData._parts.map((part, index) => ({
          index,
          fieldName: part[0],
          valueType: typeof part[1],
          isObject: typeof part[1] === 'object' && part[1] !== null,
          hasUri: part[1] && part[1].uri ? '✅' : '❌',
          hasType: part[1] && part[1].type ? '✅' : '❌',
          hasName: part[1] && part[1].name ? '✅' : '❌',
          stringValue: typeof part[1] === 'string' ? part[1] : 'not-string',
          isFile: part[1] instanceof File ? '✅ File object' : '❌ Not File object'
        })));
      } else {
        console.log('📋 FormData structure (web):', {
          hasEntries: typeof formData.entries === 'function',
          entriesCount: formData.entries ? Array.from(formData.entries()).length : 'unknown'
        });
        
        if (typeof formData.entries === 'function') {
          const entries = Array.from(formData.entries());
          console.log('🔍 FormData entries:', entries.map(([key, value]) => ({
            key,
            valueType: typeof value,
            isFile: value instanceof File,
            fileName: value instanceof File ? value.name : 'not-file',
            fileSize: value instanceof File ? value.size : 'not-file'
          })));
        }
      }
      
    } catch (formDataError) {
      throw new Error(`❌ STEP 3 FAILED: Could not append image to FormData - ${formDataError.message}`);
    }

    const uploadUrl = `${API_BASE}/uploadimages/upload`;
    console.log('🌐 Step 4: Initiating network request...');
    console.log('📡 Upload URL:', uploadUrl);
    
    let response;
    try {
      response = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
        // Don't set Content-Type header - let React Native handle it automatically
      });
      console.log('✅ Step 4: Network request completed');
      console.log('📊 Response status:', response.status);
      console.log('📋 Response headers:', Object.fromEntries(response.headers.entries()));
    } catch (networkError) {
      throw new Error(`❌ STEP 4 FAILED: Network request failed - ${networkError.message}`);
    }

    console.log('📄 Step 5: Parsing response...');
    let result;
    try {
      const responseText = await response.text();
      console.log('📝 Raw response text:', responseText);
      
      try {
        result = JSON.parse(responseText);
        console.log('✅ Step 5: Response parsed successfully');
        console.log('📊 Parsed response:', result);
      } catch (jsonError) {
        throw new Error(`❌ STEP 5 FAILED: Invalid JSON response - ${jsonError.message}. Raw response: ${responseText}`);
      }
    } catch (responseError) {
      throw new Error(`❌ STEP 5 FAILED: Could not read response - ${responseError.message}`);
    }

    console.log('🔍 Step 6: Validating response...');
    
    if (!response.ok) {
      const errorMsg = `❌ STEP 6 FAILED: Server returned error status ${response.status}`;
      const serverError = result.message || result.error || result.details || 'Unknown server error';
      throw new Error(`${errorMsg} - ${serverError}`);
    }
    
    if (!result.imageUrl) {
      throw new Error('❌ STEP 6 FAILED: Server response missing imageUrl field');
    }
    
    // Validate the returned URL
    try {
      new URL(result.imageUrl);
      console.log('✅ Step 6: Response validation passed');
    } catch (urlError) {
      throw new Error(`❌ STEP 6 FAILED: Server returned invalid URL: ${result.imageUrl}`);
    }

    console.log('🎉 UPLOAD SUCCESSFUL!');
    console.log('🔗 Final image URL:', result.imageUrl);
    
    return {
      success: true,
      imageUrl: result.imageUrl,
    };
    
  } catch (error) {
    console.error('💥 === UPLOAD IMAGE FAILED ===');
    console.error('❌ Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    return {
      success: false,
      error: error.message || 'Unknown upload error',
      errorType: error.name || 'UnknownError'
    };
  }
};

/**
 * Upload an image specifically for products (requires authentication)
 * @param {Object} asset - Image asset from ImagePicker
 * @returns {Promise<Object>} Upload result with success status and imageUrl
 */
export const uploadProductImage = async (asset) => {
  try {
    // Get authentication token
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      throw new Error('Authentication required. Please log in.');
    }

    // Create FormData for multipart upload
    const formData = new FormData();
    
    // Add the image file with proper React Native format
    const imageFile = {
      uri: asset.uri,
      type: asset.mimeType || asset.type || 'image/jpeg',
      name: asset.fileName || asset.filename || `product_${Date.now()}.jpg`,
    };
    
    formData.append('image', imageFile);

    console.log('Uploading product image to:', `${API_BASE}/products/upload-image`);
    
    // Upload to the product-specific endpoint (requires auth)
    const response = await fetch(`${API_BASE}/products/upload-image`, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${token}`,
        // Don't set Content-Type header - let React Native handle it automatically
      },
    });

    const result = await response.json();

    if (response.ok && result.imageUrl) {
      console.log('Product image uploaded successfully:', result.imageUrl);
      return {
        success: true,
        imageUrl: result.imageUrl,
      };
    } else {
      throw new Error(result.message || result.error || 'Upload failed');
    }
  } catch (error) {
    console.error('Error uploading product image:', error);
    return {
      success: false,
      error: error.message || 'Unknown upload error',
    };
  }
};

/**
 * Upload multiple images in parallel
 * @param {Array} assets - Array of image assets from ImagePicker
 * @param {boolean} useProductEndpoint - Whether to use product-specific endpoint
 * @returns {Promise<Object>} Upload result with success status and array of imageUrls
 */
export const uploadMultipleImages = async (assets, useProductEndpoint = false) => {
  try {
    const uploadPromises = assets.map(asset => 
      useProductEndpoint ? uploadProductImage(asset) : uploadImage(asset)
    );

    const results = await Promise.allSettled(uploadPromises);
    
    const successfulUploads = [];
    const failedUploads = [];

    results.forEach((result, index) => {
      if (result.status === 'fulfilled' && result.value.success) {
        successfulUploads.push(result.value.imageUrl);
      } else {
        failedUploads.push({
          index,
          error: result.value?.error || result.reason?.message || 'Upload failed'
        });
      }
    });

    return {
      success: failedUploads.length === 0,
      imageUrls: successfulUploads,
      failedCount: failedUploads.length,
      totalCount: assets.length,
      errors: failedUploads,
    };
  } catch (error) {
    console.error('Error uploading multiple images:', error);
    return {
      success: false,
      error: error.message || 'Unknown upload error',
      imageUrls: [],
      failedCount: assets.length,
      totalCount: assets.length,
    };
  }
};

/**
 * Validate image before upload
 * @param {Object} asset - Image asset from ImagePicker
 * @returns {Object} Validation result
 */
export const validateImage = (asset) => {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  
  // Check file size
  if (asset.fileSize && asset.fileSize > maxSize) {
    return {
      valid: false,
      error: 'Image must be smaller than 10MB'
    };
  }
  
  // Check file type
  if (asset.type && !allowedTypes.includes(asset.type.toLowerCase())) {
    return {
      valid: false,
      error: 'Image must be JPEG, PNG, GIF, or WebP format'
    };
  }
  
  return {
    valid: true
  };
};
