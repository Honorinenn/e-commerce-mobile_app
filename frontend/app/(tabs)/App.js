import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView
} from 'react-native';

import Login from './Login';
import Category from './Category';
import Shopbot from './Shopbot';
import Product from './Product';
import User from './User';

export default function App() {
  const [activeTab, setActiveTab] = useState('Login');

  const renderContent = () => {
    switch (activeTab) {
      case 'Login':
        return <Login />;
      case 'Categories':
        return <Category />;
      case 'Shopbot':
        return <Shopbot />;
      case 'Product':
        return <Product />;
      case 'User':
        return <User />;
      default:
        return <Login />;
    }
  };

  const tabs = ['Login', 'Categories', 'Shopbot', 'Product', 'User'];

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tabButton,
                activeTab === tab && styles.activeTab
              ]}
              onPress={() => setActiveTab(tab)}
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
