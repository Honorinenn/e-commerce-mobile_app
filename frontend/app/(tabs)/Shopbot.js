import React, { useState } from 'react';
import {
  View, Text, TextInput,
  TouchableOpacity, FlatList, StyleSheet
} from 'react-native';

export default function Shopbot() {
  const [messages, setMessages] = useState([
    { id: '1', text: '👋 Hello! I’m ShopBot. How can I assist you today?', sender: 'bot' },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim() === '') return;

    const userMessage = {
      id: `${Date.now()}`,
      text: input,
      sender: 'user',
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simple canned response logic
    setTimeout(() => {
      const botResponse = {
        id: `${Date.now() + 1}`,
        text: generateResponse(input),
        sender: 'bot',
      };
      setMessages(prev => [...prev, botResponse]);
    }, 500);
  };

  const generateResponse = (inputText) => {
    const lower = inputText.toLowerCase();
    if (lower.includes('iphone')) return '📱 iPhone 14 starts at $799.';
    if (lower.includes('ipad')) return '📝 The latest iPad starts at $329.';
    if (lower.includes('shipping')) return '🚚 We offer free shipping on orders over $50.';
    if (lower.includes('return')) return '↩️ You can return products within 30 days.';
    return '🤖 Sorry, I didn’t quite get that. Can you ask another way?';
  };

  const renderItem = ({ item }) => (
    <View style={[
      styles.message,
      item.sender === 'user' ? styles.userMsg : styles.botMsg
    ]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🛍️ ShopBot</Text>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.messageContainer}
      />

      <View style={styles.inputContainer}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Ask me anything..."
          style={styles.input}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D4F1FF',
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  messageContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  message: {
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    maxWidth: '80%',
  },
  userMsg: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  botMsg: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#71C9F8',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  sendText: {
    color: '#000',
    fontWeight: 'bold',
  },
});
