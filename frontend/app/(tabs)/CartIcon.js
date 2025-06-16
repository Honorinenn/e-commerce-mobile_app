import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Animated
} from 'react-native';
import { useEffect, useRef } from 'react';

const CartIcon = ({ count, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const prevCount = useRef(count);

  useEffect(() => {
    // Animate badge when count changes and it's positive
    if (count !== prevCount.current) {
      if (count > 0) {
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.3, // Pop out
            duration: 150, // Slightly faster pop
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1, // Settle back
            duration: 150,
            useNativeDriver: true,
          }),
        ]).start();
      } else {
        // If count goes to 0, reset scale immediately without animation
        scaleAnim.setValue(1);
      }
    }
    prevCount.current = count;
  }, [count, scaleAnim]);

  return (
    <TouchableOpacity
      style={styles.cartIconContainer}
      onPress={onPress}
      activeOpacity={0.7}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} // Increase touchable area
      accessibilityLabel={`Shopping cart with ${count} items`}
      accessibilityHint="Taps to view your shopping cart"
    >
      <View style={styles.iconWrapper}>
        {/* Using Emoji for simplicity and broad compatibility */}
        <View style={styles.cartIconSvg}>
          <Text style={styles.cartIconText}>🛒</Text>
        </View>

        {/* Cart Badge - visible only if count > 0 */}
        {count > 0 && (
          <Animated.View
            style={[
              styles.cartBadge,
              {
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            <Text style={styles.cartBadgeText} numberOfLines={1}>
              {count > 99 ? '99+' : count} {/* Display '99+' for counts over 99 */}
            </Text>
          </Animated.View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cartIconContainer: {
    padding: 8,
    position: 'relative',
  },
  iconWrapper: {
    position: 'relative',
  },
  cartIconSvg: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartIconText: {
    fontSize: 24, // Keep emoji size consistent
  },
  cartBadge: {
    position: 'absolute',
    right: -8, // Adjust position
    top: -8,   // Adjust position
    backgroundColor: '#ef4444', // Red badge color
    borderRadius: 10, // Circular shape
    minWidth: 20, // Minimum width for single digit
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6, // Padding for text
    borderWidth: 2,
    borderColor: '#fff', // White border for contrast
    // Platform-specific shadows for better visual depth
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 11, // Small font size for badge
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CartIcon;
