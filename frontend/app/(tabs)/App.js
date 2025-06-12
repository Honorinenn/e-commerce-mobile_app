import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Platform,
  Dimensions,
  Modal, // Import Modal for custom alert
  ActivityIndicator, // For loading state in modal
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { API_BASE } from '../../constants'; // Assuming API_BASE is here

// Import all your components
import Login from './Login';
import Category from './Category';
import Shopbot from './Shopbot';
import Product from './Product';
import ProductDetails from './ProductDetails';
import Posts from './Posts'; // Import Posts component
import PostDetails from './PostDetails'; // Import PostDetails component
import PostCreateForm from './PostCreateForm'; // Import PostCreateForm component
import User from './User';
import Home from './Home';
import Chat from './Chat';
import CartIcon from './CartIcon';
import UserMenu from './UserMenu';
import CartPage from './CartPage';
import PaymentPage from './PaymentPage';
import ProductCreateForm from './ProductCreateFormNew'; // Import the improved form
import Register from './Register'; // Import the Register component

const { width } = Dimensions.get('window');

export default function App() {
  const [activeTab, setActiveTab] = useState('Home'); // Can be 'Home', 'Products', 'Posts', 'Cart', 'Chat', 'Login', 'ProductDetails', 'PostDetails', 'CreateProduct', 'CreatePost', 'Register'
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null); // Add selected post state
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // To store user details
  const [isLoadingAuth, setIsLoadingAuth] = useState(true); // To handle initial auth check

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [modalType, setModalType] = useState('alert'); // 'alert' or 'confirm'
  const [modalCallback, setModalCallback] = useState(null);

  // Custom function to show alerts
  const showAlert = useCallback((title, message, type = 'alert', callback = null) => {
    setModalTitle(title);
    setModalMessage(message);
    setModalType(type);
    setModalCallback(() => callback); // Use a functional update for callback
    setModalVisible(true);
  }, []);

  // Custom function to hide alerts
  const hideAlert = useCallback(() => {
    setModalVisible(false);
    setModalTitle('');
    setModalMessage('');
    setModalType('alert');
    setModalCallback(null);
  }, []);

  // Load cart and auth state from AsyncStorage on mount
  useEffect(() => {
    const loadAppStatus = async () => {
      try {
        const savedCart = await AsyncStorage.getItem('cart');
        if (savedCart) {
          setCart(JSON.parse(savedCart));
        }
        const userToken = await AsyncStorage.getItem('userToken');
        const userDataJson = await AsyncStorage.getItem('userData');
        if (userToken && userDataJson) {
          const userData = JSON.parse(userDataJson);
          // TODO: Optionally validate token with backend here
          setIsAuthenticated(true);
          setCurrentUser(userData);
        }
      } catch (error) {
        console.error('Failed to load app status from storage', error);
        showAlert('Error', 'Failed to load your session. Please try again.', 'alert');
      } finally {
        setIsLoadingAuth(false);
      }
    };
    loadAppStatus();
  }, [showAlert]);

  // Save cart to AsyncStorage whenever it changes
  useEffect(() => {
    const saveCartToStorage = async () => {
      try {
        await AsyncStorage.setItem('cart', JSON.stringify(cart));
      } catch (error) {
        console.error('Failed to save cart to storage', error);
        showAlert('Error', 'Failed to save your cart. Data might be lost.', 'alert');
      }
    };
    saveCartToStorage();
  }, [cart, showAlert]);

  // Add product to cart with quantity management
  const handleAddToCart = useCallback((product) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      let newCart;

      if (existingItem) {
        // Increment quantity if item already exists
        newCart = prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 0) + 1 } // Ensure quantity starts at 0 if undefined
            : item
        );
      } else {
        // Add new item with quantity 1
        newCart = [...prev, { ...product, quantity: 1 }];
      }
      return newCart;
    });
    showAlert('Item Added!', `${product.name} has been added to your cart.`, 'alert');
  }, [showAlert]);

  // Update quantity in cart
  const handleUpdateQuantity = useCallback((id, quantity) => {
    setCart(prev => {
      const updatedCart = prev.map(item => item.id === id ? { ...item, quantity } : item);
      return updatedCart.filter(item => item.quantity > 0); // Remove if quantity drops to 0
    });
  }, []);

  // Remove product from cart
  const handleRemoveFromCart = useCallback((id) => {
    showAlert('Remove Item?', 'Are you sure you want to remove this item from your cart?', 'confirm', () => {
      setCart(prev => prev.filter(item => item.id !== id));
      showAlert('Removed!', 'Item has been removed from your cart.', 'alert');
    });
  }, [showAlert]);

  // Clear cart
  const handleClearCart = useCallback(() => {
    showAlert('Clear Cart?', 'Are you sure you want to clear your entire cart?', 'confirm', () => {
      setCart([]);
      showAlert('Cart Cleared!', 'Your cart has been emptied.', 'alert');
    });
  }, [showAlert]);

  // Handle checkout
  const handleCheckout = useCallback(() => {
    if (cart.length === 0) {
      showAlert('Cart Empty', 'Your cart is empty! Add some items before checking out.', 'alert');
      return;
    }
    setShowCart(false);
    setShowPayment(true);
  }, [cart.length, showAlert]);

  // Handle payment
  const handlePay = useCallback(() => {
    showAlert('Confirm Payment', 'Do you want to proceed with the payment?', 'confirm', () => {
      handleClearCart(); // This will show another alert, consider combining or changing flow
      setShowPayment(false);
      setActiveTab('Home');
      showAlert('Payment Successful!', 'Thank you for your order! Your payment has been processed.', 'alert');
    });
  }, [handleClearCart, showAlert]);

  // Handle navigation back from product details
  const handleBackToProducts = useCallback(() => {
    setSelectedProduct(null);
    setActiveTab('Product');
  }, []);

  const handleNavigateToCreateProduct = useCallback(() => {
    setActiveTab('CreateProduct');
  }, []);

  // Handle post navigation
  const handleNavigateToCreatePost = useCallback(() => {
    setActiveTab('CreatePost');
  }, []);

  // Handle post selection (navigate to post details)
  const handlePostSelect = useCallback((post) => {
    setSelectedPost(post);
    setActiveTab('PostDetails');
  }, []);

  // Handle user menu actions
  const handleProfile = useCallback(() => {
    showAlert('Profile', 'Profile page features coming soon!', 'alert');
  }, [showAlert]);

  const handleLogout = useCallback(() => {
    showAlert('Logout', 'Are you sure you want to log out?', 'confirm', async () => {
      try {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userData');
        // Also clear cart from AsyncStorage on logout
        await AsyncStorage.removeItem('cart');
      } catch (error) {
        console.error('Failed to remove auth data from storage', error);
        // Still proceed with logout in UI
      }
      setIsAuthenticated(false);
      setCurrentUser(null);
      setCart([]); // Clear cart in state
      setActiveTab('Home'); // Go to home after logout
      showAlert('Logged Out', 'You have been logged out successfully!', 'alert');
    });
  }, [showAlert]);

  // Handle login success
  const handleLoginSuccess = useCallback(async (userData, token) => {
    try {
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      setIsAuthenticated(true);
      setCurrentUser(userData);
      setActiveTab('Home'); // Navigate to Home after login
      showAlert('Login Successful', `Welcome back, ${userData.username || 'User'}!`);
    } catch (error) {
      console.error('Failed to save auth data to storage', error);
      showAlert('Error', 'Failed to save your session.', 'alert');
    }
  }, [showAlert]);

  // Navigation handler for registration
  const handleNavigateToRegister = () => {
    setActiveTab('Register');
  };

  const handleRegistrationSuccess = () => {
    Alert.alert("Registration Successful", "You can now log in with your new account.");
    setActiveTab('Login'); // Navigate to login screen after successful registration
  };

  // Calculate cart total
  const getCartTotal = useCallback(() => {
    return cart.reduce((sum, item) => sum + (item.price * (item.quantity || 0)), 0);
  }, [cart]);

  // Get total items count
  const getCartItemsCount = useCallback(() => {
    return cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
  }, [cart]);

  // Render main content based on active state
  const renderContent = () => {
    if (isLoadingAuth) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#3b82f6" />
          <Text>Loading session...</Text>
        </View>
      );
    }

    if (!isAuthenticated && activeTab !== 'Register') {
      // If not authenticated and not on register screen, show Login
      // Pass handleLoginSuccess and handleNavigateToRegister to Login
      return <Login onLoginSuccess={handleLoginSuccess} onNavigateToRegister={handleNavigateToRegister} />;
    }

    if (showCart) {
      return (
        <CartPage
          cart={cart}
          onRemove={handleRemoveFromCart}
          onUpdateQuantity={handleUpdateQuantity}
          onCheckout={handleCheckout}
          onBack={() => setShowCart(false)}
        />
      );
    }

    if (showPayment) {
      const subtotal = getCartTotal();
      const shipping = cart.length > 0 ? 7.99 : 0; // Shipping only if items are in cart
      const tax = subtotal * 0.08; // 8% tax
      const grandTotal = subtotal + shipping + tax;

      return (
        <PaymentPage
          subtotal={subtotal}
          shipping={shipping}
          tax={tax}
          total={grandTotal}
          onPay={handlePay}
          onBack={() => {
            setShowPayment(false);
            setShowCart(true); // Go back to cart page
          }}
        />
      );
    }

    if (activeTab === 'PostDetails' && selectedPost) {
      return (
        <PostDetails
          route={{
            params: {
              post: selectedPost,
              currentUser: currentUser,
              onPostUpdate: (updatedPost) => {
                console.log('Post updated from details:', updatedPost);
              },
            }
          }}
          navigation={{ goBack: () => setActiveTab('Posts') }}
        />
      );
    }

    if (activeTab === 'ProductDetails' && selectedProduct) {
      return (
        <ProductDetails
          route={{
            params: {
              product: selectedProduct,
              currentUser: currentUser, // Add currentUser here
              onProductUpdate: (updatedProduct) => {
                // This callback should ideally update the specific product in the main products list
                // For now, it's a placeholder if ProductDetails modifies product properties.
                console.log('Product updated from details:', updatedProduct);
                // Potentially refresh product list or update the selectedProduct in App.js state
              },
            }
          }}
          navigation={{ goBack: handleBackToProducts }}
        />
      );
    }

    switch (activeTab) {
      case 'Home':
        return (
          <Home
            onGetStarted={() => setActiveTab('Product')}
            onChat={() => setActiveTab('Chat')}
            currentUser={currentUser}
          />
        );      case 'Product':
        return (
          <Product
            onProductSelect={(product) => {
              setSelectedProduct(product);
              setActiveTab('ProductDetails');
            }}
            onAddToCart={handleAddToCart}
            currentUser={currentUser} // Pass currentUser
            onNavigateToCreateProduct={handleNavigateToCreateProduct} // Pass navigation handler
          />
        );
      case 'Posts':
        return (
          <Posts
            onPostSelect={handlePostSelect}
            currentUser={currentUser}
            onNavigateToCreatePost={handleNavigateToCreatePost}
          />
        );
      case 'Chat':
        return <Chat />;
      case 'Login': // Added case for Login
        return <Login onLoginSuccess={handleLoginSuccess} onNavigateToRegister={() => setActiveTab('Register')} />;
      case 'Register':
        return <Register onNavigateToLogin={() => setActiveTab('Login')} onRegistrationSuccess={handleRegistrationSuccess} />;      case 'CreateProduct': // Added case for CreateProduct
        return (
          <ProductCreateForm
            currentUser={currentUser}
            onProductCreated={(createdProduct) => {
              console.log('🎯 === NAVIGATION DEBUG ===');
              console.log('📦 Product created successfully:', createdProduct);
              console.log('🔄 Setting selected product and navigating to details...');
              setSelectedProduct(createdProduct); // Set the created product as selected
              setActiveTab('ProductDetails'); // Navigate to product details page
              console.log('✅ Navigation completed');
            }}
            onCancel={() => setActiveTab('Product')}
          />
        );
      case 'CreatePost': // Added case for CreatePost
        return (
          <PostCreateForm
            currentUser={currentUser}
            onPostCreated={() => {
              setActiveTab('Posts'); // Navigate back to post list after creation
            }}
            onCancel={() => setActiveTab('Posts')}
          />
        );
      /* default:
        return (
          <Home
            onGetStarted={() => setActiveTab('Product')}
            onChat={() => setActiveTab('Chat')}
            currentUser={currentUser} // Pass currentUser here too for safety
          />
        ); */ // Default case might need review based on overall flow
      default: // Fallback to Home if activeTab is unrecognized
        return (
          <Home
            onGetStarted={() => setActiveTab('Product')}
            onChat={() => setActiveTab('Chat')}
            currentUser={currentUser}
          />
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerBar}>
        {/* User Menu */}
        <UserMenu
          onProfile={handleProfile}
          onLogout={handleLogout}
          onLogin={() => setActiveTab('Login')} // Add this to navigate to Login
          isAuthenticated={isAuthenticated} // Pass authentication status
          currentUser={currentUser} // Pass current user for display
        />

        {/* Navigation Links */}
        <View style={styles.navLinks}>
          <TouchableOpacity
            onPress={() => {
              setActiveTab('Home');
              setShowCart(false);
              setShowPayment(false);
            }}
            style={[styles.headerLink, activeTab === 'Home' && styles.activeLink]}
          >
            <Text style={[styles.headerLinkText, activeTab === 'Home' && styles.activeLinkText]}>
              Home
            </Text>
          </TouchableOpacity>          <TouchableOpacity
            onPress={() => {
              setActiveTab('Product');
              setShowCart(false);
              setShowPayment(false);
            }}
            style={[styles.headerLink, activeTab === 'Product' && styles.activeLink]}
          >
            <Text style={[styles.headerLinkText, activeTab === 'Product' && styles.activeLinkText]}>
              Products
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setActiveTab('Posts');
              setShowCart(false);
              setShowPayment(false);
            }}
            style={[styles.headerLink, activeTab === 'Posts' && styles.activeLink]}
          >
            <Text style={[styles.headerLinkText, activeTab === 'Posts' && styles.activeLinkText]}>
              Posts
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setActiveTab('Chat');
              setShowCart(false);
              setShowPayment(false);
            }}
            style={[styles.headerLink, activeTab === 'Chat' && styles.activeLink]}
          >
            <Text style={[styles.headerLinkText, activeTab === 'Chat' && styles.activeLinkText]}>
              Chat
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1 }} /> {/* Spacer */}

        {/* Cart Icon */}
        <CartIcon
          count={getCartItemsCount()}
          onPress={() => {
            setShowCart(true);
            setShowPayment(false);
          }}
        />
      </View>

      {/* Main Content Area */}
      <View style={styles.content}>
        {renderContent()}
      </View>

      {/* Custom Alert/Confirm Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={hideAlert}
      >
        <TouchableOpacity
          style={modalStyles.overlay}
          activeOpacity={1}
          onPressOut={hideAlert} // Allows dismissing by tapping outside for alerts
        >
          <View style={modalStyles.modalContainer}>
            <View style={modalStyles.modalContent}>
              <Text style={modalStyles.modalTitle}>{modalTitle}</Text>
              <Text style={modalStyles.modalMessage}>{modalMessage}</Text>
              <View style={modalStyles.modalButtons}>
                {modalType === 'confirm' && (
                  <TouchableOpacity
                    style={[modalStyles.button, modalStyles.cancelButton]}
                    onPress={hideAlert}
                  >
                    <Text style={modalStyles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={[modalStyles.button, modalStyles.okButton]}
                  onPress={() => {
                    hideAlert();
                    if (modalCallback) {
                      modalCallback();
                    }
                  }}
                >
                  <Text style={modalStyles.buttonText}>{modalType === 'confirm' ? 'Confirm' : 'OK'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'ios' ? 0 : 10,
    paddingBottom: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    minHeight: 60,
  },
  navLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  headerLink: {
    marginHorizontal: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: 'transparent',
  },
  activeLink: {
    backgroundColor: '#eff6ff',
  },
  headerLinkText: {
    fontSize: 16,
    color: '#64748b',
    fontWeight: '600',
  },
  activeLinkText: {
    color: '#3b82f6',
  },
  content: {
    flex: 1,
  },
});

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    maxWidth: 350,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  modalContent: {
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 16,
    color: '#475569',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  okButton: {
    backgroundColor: '#3b82f6',
  },
  cancelButton: {
    backgroundColor: '#cbd5e1',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
