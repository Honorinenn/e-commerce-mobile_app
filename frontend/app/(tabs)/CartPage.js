import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  Platform
} from 'react-native';

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  // Ensure item.quantity is a number, default to 1 if not present or invalid
  const quantity = typeof item.quantity === 'number' && item.quantity > 0 ? item.quantity : 1;

  const handleIncrement = () => {
    onUpdateQuantity(item.id, quantity + 1);
  };

  const handleDecrement = () => {
    const newQuantity = quantity - 1;
    if (newQuantity > 0) {
      onUpdateQuantity(item.id, newQuantity);
    } else {
      // If quantity drops to 0, remove the item
      onRemove(item.id);
    }
  };

  // Ensure item.price is a number, default to 0 if not present or invalid
  const itemPrice = typeof item.price === 'number' ? item.price : 0;
  const itemTotal = itemPrice * quantity;

  return (
    <View style={styles.itemCard}>
      <Image
        source={{ uri: item.image || 'https://via.placeholder.com/100' }} // Fallback image
        style={styles.image}
        resizeMode="cover"
        onError={(e) => console.log('Image loading error:', e.nativeEvent.error)} // Log image errors
      />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName} numberOfLines={2}>
          {item.name || 'Unnamed Product'} {/* Fallback for product name */}
        </Text>
        <Text style={styles.itemPrice}>
          ${itemPrice.toFixed(2)} each
        </Text>

        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={handleDecrement}
            activeOpacity={0.7}
            accessibilityLabel={`Decrease quantity of ${item.name}`}
          >
            <Text style={styles.quantityButtonText}>−</Text>
          </TouchableOpacity>

          <Text style={styles.quantity}>{quantity}</Text>

          <TouchableOpacity
            style={styles.quantityButton}
            onPress={handleIncrement}
            activeOpacity={0.7}
            accessibilityLabel={`Increase quantity of ${item.name}`}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.itemRight}>
        <Text style={styles.itemTotal}>${itemTotal.toFixed(2)}</Text>
        <TouchableOpacity
          onPress={() => onRemove(item.id)}
          style={styles.removeButton}
          activeOpacity={0.7}
          accessibilityLabel={`Remove ${item.name} from cart`}
        >
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CartPage = ({ cart, onRemove, onUpdateQuantity, onCheckout, onBack }) => {
  // Ensure cart is an array and items have valid prices and quantities for calculations
  const safeCart = Array.isArray(cart) ? cart : [];

  const subtotal = safeCart.reduce((sum, item) => {
    const price = typeof item.price === 'number' ? item.price : 0;
    const quantity = typeof item.quantity === 'number' && item.quantity > 0 ? item.quantity : 0;
    return sum + (price * quantity);
  }, 0);

  const shipping = safeCart.length > 0 ? 7.99 : 0;
  const taxRate = 0.08; // 8% tax
  const tax = subtotal * taxRate;
  const grandTotal = subtotal + shipping + tax;
  const totalItems = safeCart.reduce((sum, item) => sum + (typeof item.quantity === 'number' && item.quantity > 0 ? item.quantity : 0), 0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton} accessibilityLabel="Back to previous page">
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Shopping Cart</Text>
        <View style={styles.placeholder} /> {/* Placeholder to balance title alignment */}
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {safeCart.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🛒</Text>
            <Text style={styles.emptyText}>Your cart is empty</Text>
            <Text style={styles.emptySubtext}>
              Looks like you haven't added anything to your cart yet.
              Start shopping to find great deals!
            </Text>
            <TouchableOpacity
              style={styles.continueShoppingButton}
              onPress={onBack}
              activeOpacity={0.8}
              accessibilityLabel="Continue Shopping"
            >
              <Text style={styles.continueShoppingText}>Continue Shopping</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.itemsContainer}>
              <Text style={styles.itemsCount}>
                {totalItems} {totalItems === 1 ? 'item' : 'items'} in cart
              </Text>
              {safeCart.map((item) => (
                <CartItem
                  key={item.id} // Ensure unique key for each item
                  item={item}
                  onRemove={onRemove}
                  onUpdateQuantity={onUpdateQuantity}
                />
              ))}
            </View>

            <View style={styles.summaryContainer}>
              <Text style={styles.summaryTitle}>Order Summary</Text>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Shipping & Handling</Text>
                <Text style={styles.summaryValue}>${shipping.toFixed(2)}</Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Tax ({taxRate * 100}%)</Text>
                <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.summaryRow}>
                <Text style={styles.totalLabel}>Order Total</Text>
                <Text style={styles.totalValue}>${grandTotal.toFixed(2)}</Text>
              </View>
            </View>
          </>
        )}
      </ScrollView>

      {/* Footer with Checkout Button, visible only if cart has items */}
      {safeCart.length > 0 && (
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={onCheckout}
            activeOpacity={0.8}
            accessibilityLabel={`Proceed to Checkout for a total of $${grandTotal.toFixed(2)}`}
          >
            <Text style={styles.checkoutText}>
              Proceed to Checkout (${grandTotal.toFixed(2)})
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  backButton: {
    padding: 8,
  },
  backText: {
    fontSize: 16,
    color: '#3b82f6',
    fontWeight: '600',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  placeholder: {
    width: 60, // Match back button width for centering title
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Platform.OS === 'ios' ? 100 : 120, // Adjust padding for footer
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100, // Push content down for better centering on empty state
    paddingHorizontal: 20,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: 20,
    opacity: 0.7,
  },
  emptyText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  continueShoppingButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  continueShoppingText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  itemsContainer: {
    padding: 16,
  },
  itemsCount: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 12,
    fontWeight: '500',
  },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    alignItems: 'center', // Vertically center items in the card
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#f1f5f9', // Placeholder background
  },
  itemInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center', // Center content vertically
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: '#64748b',
    // marginBottom: 8, // Removed to reduce spacing above quantity
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8, // Add some space from price
  },
  quantityButton: {
    width: 36,
    height: 36,
    backgroundColor: '#f1f5f9',
    borderRadius: 18, // Make it circular
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  quantityButtonText: {
    fontSize: 22,
    color: '#475569',
    fontWeight: '600',
    lineHeight: 22, // Adjust line height for better vertical centering
  },
  quantity: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginHorizontal: 16,
    minWidth: 30,
    textAlign: 'center',
  },
  itemRight: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: '100%', // Take full height to align total and remove button
    paddingVertical: 5, // Small padding for better alignment
  },
  itemTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 10, // Space between total and remove
  },
  removeButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6, // Slightly rounded remove button
    backgroundColor: '#ffeaea', // Light red background
  },
  removeText: {
    color: '#ef4444',
    fontSize: 13,
    fontWeight: '600',
  },
  summaryContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 8,
    padding: 20,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 15,
    color: '#64748b',
  },
  summaryValue: {
    fontSize: 15,
    color: '#1e293b',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 }, // Adjust shadow for footer
    shadowOpacity: 0.1,
    shadowRadius: 8,
    paddingBottom: Platform.OS === 'ios' ? 34 : 16, // Adjust for iOS safe area
  },
  checkoutButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 10, // More rounded button
    paddingVertical: 16,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  checkoutText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
});

export default CartPage;
