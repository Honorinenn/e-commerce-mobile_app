import React, { useState } from 'react';
import {
  View, Text, Image,
  TouchableOpacity, StyleSheet
} from 'react-native';

import Login from './Login';
import landingImg from './landing_screen.png';

export default function App() {
  const [stage, setStage] = useState('landing'); // 'landing' | 'login' | 'home'
  const [activeTab, setActiveTab] = useState('Login'); // 'Login' | 'Categories' | 'Shopbot'

  const onGetStarted = () => setStage('login');
  const onLoginSuccess = () => setStage('home');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Login':
        return <Text style={styles.tabContent}>Customer Login Screen</Text>;
      case 'Categories':
        return <Text style={styles.tabContent}>📦 Categories of Electronics</Text>;
      case 'Shopbot':
        return <Text style={styles.tabContent}>🤖 Chat with Shopbot</Text>;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {stage === 'landing' && (
        <>
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.brandText}>HEH Electronics</Text>

          <Image
            source={landingImg}
            style={styles.image}
            resizeMode="contain"
          />

          <TouchableOpacity
            style={styles.button}
            onPress={onGetStarted}
          >
            <Text style={styles.buttonText}>Get started</Text>
          </TouchableOpacity>
        </>
      )}

      {stage === 'login' && (
        <Login onLoginSuccess={onLoginSuccess} />
      )}

      {stage === 'home' && (
        <View style={{ flex: 1, width: '100%' }}>
          {/* Tab Bar */}
          <View style={styles.tabBar}>
            {['Login', 'Categories', 'Shopbot'].map(tab => (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.tabButton,
                  activeTab === tab && styles.activeTab
                ]}
                onPress={() => setActiveTab(tab)}
              >
                <Text style={[
                  styles.tabButtonText,
                  activeTab === tab && styles.activeTabText
                ]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Tab Content */}
          <View style={styles.tabContentContainer}>
            {renderTabContent()}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#D9F3FF',
    alignItems: 'center', justifyContent: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 20, marginBottom: 5, color: '#000',
  },
  brandText: {
    fontSize: 24, fontWeight: 'bold',
    color: '#000', marginBottom: 20,
  },
  image: {
    width: '100%', height: 180, marginBottom: 30,
  },
  button: {
    backgroundColor: '#71C9F8',
    paddingVertical: 12, paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: '#000', fontSize: 16, fontWeight: '500',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#C2ECFF',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#aaa',
  },
  tabButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  tabButtonText: {
    fontSize: 16,
    color: '#333',
  },
  activeTab: {
    backgroundColor: '#71C9F8',
  },
  activeTabText: {
    fontWeight: 'bold',
    color: '#000',
  },
  tabContentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContent: {
    fontSize: 20,
    color: '#000',
  },
});
