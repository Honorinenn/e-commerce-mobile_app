import React, { useState, useCallback } from 'react';
import { View, Image, ScrollView, TouchableOpacity } from 'react-native';
import styles from './ProductDetails.styles';

const CONFIG = {
  DEFAULT_IMAGE: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Example.jpg',
};

const ImageGallery = React.memo(({ images = [], onImageSelect }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImageSelect = useCallback((index) => {
    setSelectedImageIndex(index);
    onImageSelect?.(index);
  }, [onImageSelect]);

  const displayImages = images.length > 0 ? images : [CONFIG.DEFAULT_IMAGE];
  const currentImage = displayImages[selectedImageIndex] || CONFIG.DEFAULT_IMAGE;

  return (
    <View style={styles.imageContainer}>
      <View style={styles.mainImageContainer}>
        <Image
          source={{ uri: currentImage }}
          style={styles.mainImage}
          resizeMode="contain"
        />
      </View>
      {displayImages.length > 1 && (
        <ScrollView
          horizontal
          style={styles.thumbnailContainer}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.thumbnailScrollContent}
        >
          {displayImages.map((image, index) => (
            <TouchableOpacity
              key={`thumb-${index}`}
              style={[
                styles.thumbnail,
                selectedImageIndex === index && styles.selectedThumbnail
              ]}
              onPress={() => handleImageSelect(index)}
              activeOpacity={0.8}
            >
              <Image 
                source={{ uri: image }} 
                style={styles.thumbnailImage}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
});

ImageGallery.displayName = 'ImageGallery';

export default ImageGallery;