import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView
} from 'react-native';

import Login from './Login';
import Category from './Category';
import Shopbot from './Shopbot';
import Product from './Product';
import User from './User';
import Cart from './Cart';
import styles from './styles';
import Home from './Home';
import SplashScreen from './SplashScreen';
import ProductDetails from './ProductDetails';
import Register from './Register';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState('Home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [navStack, setNavStack] = useState(['Home']);
  const [user, setUser] = useState(null); // user state
  const [cart, setCart] = useState([]); // cart state

  const pushToStack = (tab) => {
    setNavStack((prev) => [...prev, tab]);
    setActiveTab(tab);
  };

  const popFromStack = () => {
    setNavStack((prev) => {
      if (prev.length > 1) {
        const newStack = prev.slice(0, -1);
        setActiveTab(newStack[newStack.length - 1]);
        return newStack;
      }
      return prev;
    });
    setSelectedProduct(null);
  };

  if (showSplash) {
    return <SplashScreen onStart={() => setShowSplash(false)} />;
  }

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    pushToStack('ProductDetails');
  };

  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (existing) {
        return prev.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const renderContent = () => {
    if (activeTab === 'ProductDetails' && selectedProduct) {
      return <ProductDetails product={selectedProduct} onBack={popFromStack} onAddToCart={handleAddToCart} />;
    }
    switch (activeTab) {
      case 'Home':
        return <Home onProductSelect={handleProductSelect} setActiveTab={pushToStack} user={user} onAddToCart={handleAddToCart} />;
      case 'Categories':
        return <Category />;
      case 'Shopbot':
        return <Shopbot />;
      case 'Product':
        return <Product />;
      case 'Cart':
        return <Cart cart={cart} setCart={setCart} />;
      case 'User':
        return <User />;
      case 'Login':
        return <Login setUser={setUser} onSuccess={() => pushToStack('Home')} />;
      case 'Register':
        return <Register onSuccess={() => pushToStack('Login')} />;
      default:
        return <Home onProductSelect={handleProductSelect} setActiveTab={pushToStack} user={user} onAddToCart={handleAddToCart} />;
    }
  };

  const tabs = ['Home', 'Categories', 'Shopbot', 'Product', 'Cart', 'User', 'Login', 'Register'];

  return (
    <View style={styles.container}>
      {/* Username and Cart Icon Row */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', padding: 8, backgroundColor: '#fff' }}>
        {user && (
          <Text style={{ fontWeight: 'bold', marginRight: 10 }}>Hi, {user.username}</Text>
        )}
        <TouchableOpacity onPress={() => pushToStack('Cart')} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 22 }}>🛒</Text>
          {cart.length > 0 && (
            <View style={{ backgroundColor: 'red', borderRadius: 8, marginLeft: -8, marginTop: -10, paddingHorizontal: 5 }}>
              <Text style={{ color: '#fff', fontSize: 12 }}>{cart.reduce((sum, item) => sum + item.quantity, 0)}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      {/* Breadcrumb/Stack Navigation Bar */}
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 8, backgroundColor: '#f0f0f0' }}>
        {navStack.map((tab, idx) => (
          <React.Fragment key={idx}>
            <TouchableOpacity onPress={() => {
              if (idx < navStack.length - 1) {
                setNavStack(navStack.slice(0, idx + 1));
                setActiveTab(tab);
                if (tab !== 'ProductDetails') setSelectedProduct(null);
              }
            }}>
              <Text style={{ color: idx === navStack.length - 1 ? '#007bff' : '#333', fontWeight: idx === navStack.length - 1 ? 'bold' : 'normal' }}>{tab}</Text>
            </TouchableOpacity>
            {idx < navStack.length - 1 && <Text style={{ marginHorizontal: 4 }}>&gt;</Text>}
          </React.Fragment>
        ))}
      </View>
      {/* Tab Bar */}
      <View style={styles.tabBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tabButton,
                activeTab === tab && styles.activeTab
              ]}
              onPress={() => {
                setSelectedProduct(null);
                pushToStack(tab);
              }}
            >
              <Text style={styles.tabText}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.content}>
        {renderContent()}
      </View>
    </View>
  );
}
