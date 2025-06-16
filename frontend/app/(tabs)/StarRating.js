import React, { useCallback } from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './ProductDetails.styles';

const StarRating = React.memo(({ rating }) => {
  const renderStars = useCallback(() => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Ionicons key={`star-${i}`} name="star" size={16} color="#FFD700" />
      );
    }
    if (hasHalfStar) {
      stars.push(
        <Ionicons key="half-star" name="star-half" size={16} color="#FFD700" />
      );
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Ionicons key={`empty-${i}`} name="star-outline" size={16} color="#D1D5DB" />
      );
    }
    return stars;
  }, [rating]);
  return (
    <View style={styles.starsContainer}>
      {renderStars()}
    </View>
  );
});

export default StarRating;
