import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const categories = [
  'Mobile Devices',
  'Computers And Accessories',
  'Audio And Music',
  'Television And Home Entertainment',
  'Gaming',
  'Smart Home Devices',
  'Cameras And Photography',
  'Appliances (Small Electronics)',
  'Networking Devices',
  'Wearable Technology',
  'Software Subscription',
];

const Category = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Categories</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {categories.map((cat, index) => (
          <TouchableOpacity key={index} style={styles.button}>
            <Text style={styles.buttonText}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d4f1ff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
    textAlign: 'center',
  },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  button: {
    backgroundColor: '#6ec1e4',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginVertical: 8,
    width: '100%',
    borderWidth: 1,
    borderColor: '#000',
  },
  buttonText: {
    color: '#000',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 15,
  },
});
