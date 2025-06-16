import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Dimensions,
  Alert,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { API_BASE } from '../../constants/index.js';
import Markdown from 'react-native-markdown-display';

// Utility Classes
class MessageProcessor {
  static splitSentences(text) {
    return text.match(/[^.!?\n]+[.!?\n]+|[^.!?\n]+$/g) || [];
  }

  static formatTimestamp(date = new Date()) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  static generateMessageId() {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

class StreamProcessor {
  constructor(onMessageUpdate, onComplete) {
    this.onMessageUpdate = onMessageUpdate;
    this.onComplete = onComplete;
    this.buffer = '';
    this.lastSentenceEnd = 0;
    this.displayed = '';
    this.fullMessage = '';
  }

  processChunk(chunk) {
    try {
      const textData = new TextDecoder().decode(chunk);
      console.log('[StreamProcessor] Raw chunk:', textData.substring(0, 200) + '...');
      
      // Split by lines and process each line
      const lines = textData.split(/\r?\n/);
      
      for (const line of lines) {
        if (line.trim() === '') continue;
        
        // Handle Server-Sent Events format
        if (line.startsWith('data: ')) {
          const jsonData = line.substring(6); // Remove 'data: ' prefix
          
          // Skip if it's the end marker
          if (jsonData === '[DONE]') {
            console.log('[StreamProcessor] Received DONE marker');
            continue;
          }
          
          try {
            const data = JSON.parse(jsonData);
            console.log('[StreamProcessor] Parsed SSE data:', data);
            
            // Extract the response text from the data
            if (typeof data.response === 'string') {
              this.fullMessage += data.response;
              console.log('[StreamProcessor] Added to message:', data.response);
              console.log('[StreamProcessor] Full message so far:', this.fullMessage);
              
              // Update display in real-time
              this.updateDisplayedContent();
            }
            
            // Check if this is the final chunk
            if (data.done === true) {
              console.log('[StreamProcessor] Received done=true, finalizing');
              this.finalize();
              return;
            }
          } catch (parseError) {
            console.warn('[StreamProcessor] Failed to parse SSE JSON:', jsonData, parseError);
          }
        } else {
          // Handle non-SSE format (fallback)
          try {
            const data = JSON.parse(line);
            if (typeof data.response === 'string') {
              this.fullMessage += data.response;
              this.updateDisplayedContent();
            }
          } catch (err) {
            console.log('[StreamProcessor] Line not JSON, treating as plain text:', line);
            this.fullMessage += line;
            this.updateDisplayedContent();
          }
        }
      }
    } catch (error) {
      console.error('[StreamProcessor] Error processing chunk:', error);
    }
  }

  updateDisplayedContent() {
    // For real-time updates, show the full message as it builds
    if (this.fullMessage !== this.displayed) {
      this.displayed = this.fullMessage;
      console.log('[StreamProcessor] Updating display with:', this.displayed.substring(0, 100) + '...');
      this.onMessageUpdate(this.displayed);
    }
  }

  finalize() {
    console.log('[StreamProcessor] Finalizing with full message:', this.fullMessage.substring(0, 100) + '...');
    this.onComplete(this.fullMessage);
  }
}

class ChatAPI {
  static async sendMessage(content) {
    try {
      const response = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/event-stream',
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return response;
    } catch (error) {
      console.error('[ChatAPI] Request failed:', error);
      throw new Error('Failed to connect to chat service');
    }
  }
}

// Custom Hooks
const useAnimatedValue = (initialValue = 0) => {
  const animatedValue = useRef(new Animated.Value(initialValue)).current;
  return animatedValue;
};

const useTypingAnimation = (isTyping) => {
  const dotOpacity = useAnimatedValue(0);

  useEffect(() => {
    if (isTyping) {
      const animation = Animated.loop(
        Animated.sequence([
          Animated.timing(dotOpacity, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(dotOpacity, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
          }),
        ])
      );
      animation.start();
      return () => animation.stop();
    }
  }, [isTyping, dotOpacity]);

  return dotOpacity;
};

// Markdown Styles Configuration
const getMarkdownStyles = () => ({
  body: { 
    color: '#2D3748', 
    fontSize: 16, 
    lineHeight: 22,
    fontFamily: Platform.OS === 'ios' ? 'San Francisco' : 'Roboto',
  },
  code_inline: { 
    backgroundColor: '#EDF2F7', 
    borderRadius: 4, 
    padding: 4, 
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 14,
  },
  code_block: {
    backgroundColor: '#EDF2F7',
    borderRadius: 8,
    padding: 12,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 14,
    marginVertical: 8,
  },
  fence: {
    backgroundColor: '#EDF2F7',
    borderRadius: 8,
    padding: 12,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 14,
    marginVertical: 8,
  },
  strong: { fontWeight: '700' },
  em: { fontStyle: 'italic' },
  link: { color: '#3182CE', textDecorationLine: 'underline' },
  heading1: { fontSize: 20, fontWeight: '700', marginVertical: 8 },
  heading2: { fontSize: 18, fontWeight: '600', marginVertical: 6 },
  paragraph: { marginVertical: 4 },
});

// Subcomponents
const TypingIndicator = ({ visible }) => {
  const dotOpacity = useTypingAnimation(visible);

  if (!visible) return null;

  return (
    <View style={styles.typingContainer}>
      <View style={styles.typingDots}>
        <Animated.View style={[styles.dot, { opacity: dotOpacity }]} />
        <Animated.View style={[styles.dot, { opacity: dotOpacity }]} />
        <Animated.View style={[styles.dot, { opacity: dotOpacity }]} />
      </View>
      <Text style={styles.typingText}>Gemma is typing</Text>
    </View>
  );
};

const MessageBubble = React.memo(({ message, isUser }) => {
  const markdownStyles = useMemo(() => getMarkdownStyles(), []);
  
  const bubbleStyle = [
    styles.messageBubble,
    isUser ? styles.userBubble : styles.aiBubble,
  ];

  const textStyle = [
    styles.messageText,
    isUser ? styles.userText : styles.aiText,
  ];

  return (
    <View style={bubbleStyle}>
      {isUser ? (
        <Text style={textStyle}>{message.content}</Text>
      ) : (
        <Markdown style={markdownStyles}>{message.content}</Markdown>
      )}
      <Text style={styles.timestamp}>{message.timestamp}</Text>
    </View>
  );
});

const MessagesList = ({ messages, aiTyping, scrollViewRef }) => (
  <ScrollView
    ref={scrollViewRef}
    style={styles.messagesContainer}
    contentContainerStyle={styles.messagesContent}
    showsVerticalScrollIndicator={false}
    onContentSizeChange={() => 
      scrollViewRef.current?.scrollToEnd({ animated: true })
    }
  >
    {messages.map((message) => (
      <MessageBubble
        key={message.id}
        message={message}
        isUser={message.sender === 'user'}
      />
    ))}
    <TypingIndicator visible={aiTyping} />
  </ScrollView>
);

const InputSection = ({ 
  input, 
  setInput, 
  onSend, 
  loading, 
  placeholder = "Type your message..." 
}) => {
  const [inputHeight, setInputHeight] = useState(40);
  const maxInputHeight = 120;
  const minInputHeight = 40;

  const handleContentSizeChange = useCallback((event) => {
    const { height } = event.nativeEvent.contentSize;
    const newHeight = Math.min(Math.max(height, minInputHeight), maxInputHeight);
    setInputHeight(newHeight);
  }, []);

  const handleSubmit = useCallback(() => {
    if (input.trim() && !loading) {
      onSend();
    }
  }, [input, loading, onSend]);

  const handleKeyPress = useCallback((event) => {
    if (event.nativeEvent.key === 'Enter') {
      // Check if Shift key is pressed
      if (event.nativeEvent.shiftKey) {
        // Shift + Enter: Allow new line (default behavior)
        return;
      } else {
        // Enter only: Send message
        event.preventDefault();
        handleSubmit();
      }
    }
  }, [handleSubmit]);

  return (
    <View style={styles.inputSection}>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.textInput, { height: inputHeight }]}
          value={input}
          onChangeText={setInput}
          placeholder={placeholder}
          placeholderTextColor="#999"
          multiline
          textAlignVertical="top"
          editable={!loading}
          onKeyPress={handleKeyPress}
          blurOnSubmit={false}
          onContentSizeChange={handleContentSizeChange}
          returnKeyType="default"
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            (!input.trim() || loading) && styles.sendButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={!input.trim() || loading}
          activeOpacity={0.7}
        >
          <Text style={[
            styles.sendButtonText,
            (!input.trim() || loading) && styles.sendButtonTextDisabled,
          ]}>
            {loading ? '...' : 'Send'}
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.inputHint}>
        Press Enter to send • Shift + Enter for new line
      </Text>
    </View>
  );
};

// Main Chat Component
const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiTyping, setAiTyping] = useState(false);
  const scrollViewRef = useRef();

  const createMessage = useCallback((sender, content) => ({
    id: MessageProcessor.generateMessageId(),
    sender,
    content,
    timestamp: MessageProcessor.formatTimestamp(),
    createdAt: new Date(),
  }), []);

  const addMessage = useCallback((message) => {
    setMessages(prevMessages => [...prevMessages, message]);
  }, []);

  const updateLastMessage = useCallback((content) => {
    setMessages(prevMessages => {
      const updated = [...prevMessages];
      if (updated.length > 0 && updated[updated.length - 1].sender === 'ai') {
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          content,
        };
      }
      return updated;
    });
  }, []);

  const handleStreamedResponse = useCallback(async (response) => {
    console.log('[Chat] Starting streamed response handling');
    const aiMessage = createMessage('ai', '');
    addMessage(aiMessage);
    
    const streamProcessor = new StreamProcessor(
      (content) => {
        console.log('[Chat] Updating message with content:', content.substring(0, 50) + '...');
        updateLastMessage(content);
      },
      (finalContent) => {
        console.log('[Chat] Final content received:', finalContent.substring(0, 50) + '...');
        updateLastMessage(finalContent);
      }
    );

    try {
      const reader = response.body.getReader();
      let done = false;
      let chunkCount = 0;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        
        if (value) {
          chunkCount++;
          console.log('[Chat] Processing chunk', chunkCount, 'size:', value.length);
          streamProcessor.processChunk(value);
        }
      }

      console.log('[Chat] Stream complete, processed', chunkCount, 'chunks');
      streamProcessor.finalize();
    } catch (error) {
      console.error('[Chat] Streaming error:', error);
      updateLastMessage('Error: Failed to receive complete response.');
    }
  }, [createMessage, addMessage, updateLastMessage]);

  const handleNonStreamedResponse = useCallback(async (response) => {
    console.log('[Chat] Handling non-streamed response');
    try {
      const json = await response.json();
      console.log('[Chat] Response JSON:', json);
      const content = json.content || json.message || json.response || 'No response received.';
      console.log('[Chat] Extracted content:', content);
      const aiMessage = createMessage('ai', content);
      addMessage(aiMessage);
    } catch (error) {
      console.error('[Chat] JSON parsing error:', error);
      const errorMessage = createMessage('ai', 'Error: Invalid response format.');
      addMessage(errorMessage);
    }
  }, [createMessage, addMessage]);

  const sendMessage = useCallback(async () => {
    if (!input.trim()) return;

    const userMessage = createMessage('user', input.trim());
    addMessage(userMessage);
    
    const messageContent = input.trim();
    setInput('');
    setLoading(true);
    setAiTyping(true);

    console.log('[Chat] Sending message:', messageContent);

    try {
      const response = await ChatAPI.sendMessage(messageContent);
      console.log('[Chat] Response received, status:', response.status);
      console.log('[Chat] Response headers:', Object.fromEntries(response.headers.entries()));
      
      const contentType = response.headers.get('content-type') || '';
      const isStreamed = contentType.includes('text/event-stream') || contentType.includes('text/plain');
      
      console.log('[Chat] Content type:', contentType, 'Is streamed:', isStreamed);

      if (isStreamed && response.body) {
        console.log('[Chat] Processing as streamed response');
        await handleStreamedResponse(response);
      } else {
        console.log('[Chat] Processing as non-streamed response');
        await handleNonStreamedResponse(response);
      }
    } catch (error) {
      console.error('[Chat] Send message error:', error);
      const errorMessage = createMessage('ai', `Error: ${error.message}`);
      addMessage(errorMessage);
      
      Alert.alert(
        'Connection Error',
        'Unable to send message. Please check your connection and try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setLoading(false);
      setAiTyping(false);
    }
  }, [input, createMessage, addMessage, handleStreamedResponse, handleNonStreamedResponse]);



  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Chat with Gemma</Text>
          <Text style={styles.headerSubtitle}>
            {messages.length} messages
          </Text>
        </View>
        
        <MessagesList
          messages={messages}
          aiTyping={aiTyping}
          scrollViewRef={scrollViewRef}
        />
        
        <InputSection
          input={input}
          setInput={setInput}
          onSend={sendMessage}
          loading={loading}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// Styles
const { width: screenWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A202C',
    fontFamily: Platform.OS === 'ios' ? 'San Francisco' : 'Roboto',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#718096',
    marginTop: 2,
    fontFamily: Platform.OS === 'ios' ? 'San Francisco' : 'Roboto',
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  messagesContent: {
    paddingVertical: 16,
  },
  messageBubble: {
    maxWidth: screenWidth * 0.8,
    marginVertical: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#3182CE',
    borderBottomRightRadius: 8,
  },
  aiBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: Platform.OS === 'ios' ? 'San Francisco' : 'Roboto',
  },
  userText: {
    color: '#FFFFFF',
  },
  aiText: {
    color: '#2D3748',
  },
  timestamp: {
    fontSize: 11,
    marginTop: 6,
    opacity: 0.7,
    fontFamily: Platform.OS === 'ios' ? 'San Francisco' : 'Roboto',
  },
  typingContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderBottomLeftRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  typingDots: {
    flexDirection: 'row',
    marginRight: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#718096',
    marginHorizontal: 1,
  },
  typingText: {
    fontSize: 14,
    color: '#718096',
    fontStyle: 'italic',
    fontFamily: Platform.OS === 'ios' ? 'San Francisco' : 'Roboto',
  },
  inputSection: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 12,
    fontSize: 16,
    backgroundColor: '#F7FAFC',
    fontFamily: Platform.OS === 'ios' ? 'San Francisco' : 'Roboto',
    maxHeight: 120,
  },
  sendButton: {
    backgroundColor: '#3182CE',
    borderRadius: 22,
    paddingHorizontal: 20,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 60,
    shadowColor: '#3182CE',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  sendButtonDisabled: {
    backgroundColor: '#CBD5E0',
    shadowOpacity: 0,
    elevation: 0,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'San Francisco' : 'Roboto',
  },
  sendButtonTextDisabled: {
    color: '#A0AEC0',
  },
  inputHint: {
    fontSize: 12,
    color: '#718096',
    textAlign: 'center',
    marginTop: 8,
    fontFamily: Platform.OS === 'ios' ? 'San Francisco' : 'Roboto',
    fontStyle: 'italic',
  },
});

export default Chat;