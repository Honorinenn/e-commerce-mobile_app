// ShoppingScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const ShoppingScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.navButtons}>
        <TouchableOpacity style={styles.navButton}>
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text>Category</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>World Class service</Text>

      <Image
        source={require('./category02.png')} // Replace with your actual image
        style={styles.image}
        resizeMode="cover"
      />

      <TouchableOpacity style={styles.shopBotButton}>
        <Text style={styles.shopBotText}>Shopbot</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ShoppingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9F3FF',
    alignItems: 'center',
    paddingTop: 50,
  },
  navButtons: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  navButton: {
    backgroundColor: '#71C9F8',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 6,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 15,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 30,
  },
  shopBotButton: {
    backgroundColor: '#78B09E',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 40,
    right: 30,
  },
  shopBotText: {
    color: '#fff',
    fontWeight: '600',
  },
});
