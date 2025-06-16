import React, { useEffect, useState, useCallback } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator,
  Dimensions, FlatList, Alert, RefreshControl, TextInput
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PostAPIService, PostDataManager } from './api';
import { useFocusEffect } from '@react-navigation/native';

const SCREEN_CONFIG = {
  SCREEN_WIDTH: Dimensions.get('window').width,
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes cache duration
};

// Post Card Component
const PostCard = React.memo(({ post, onPostSelect, currentUser }) => {
  const enhancedPost = PostDataManager.enhancePost(post);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPostSelect(post)}
      activeOpacity={0.8}
    >
      {/* Post Header */}
      <View style={styles.postHeader}>
        <Text style={styles.postTitle} numberOfLines={2}>
          {enhancedPost.title}
        </Text>
        <Text style={styles.postDate}>
          {new Date(enhancedPost.createdAt).toLocaleDateString()}
        </Text>
      </View>

      {/* Post Content Preview */}
      <Text style={styles.postContent} numberOfLines={3}>
        {enhancedPost.content}
      </Text>

      {/* Post Footer */}
      <View style={styles.postFooter}>
        <View style={styles.contactInfo}>
          <Ionicons name="person-outline" size={16} color="#666" />
          <Text style={styles.contactText} numberOfLines={1}>
            {enhancedPost.contact}
          </Text>
        </View>
        <View style={styles.imageCount}>
          <Ionicons name="image-outline" size={16} color="#666" />
          <Text style={styles.imageCountText}>
            {enhancedPost.images.length}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});

// Main Posts Component
const Posts = ({ onPostSelect, currentUser, onNavigateToCreatePost }) => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Load posts function
  const loadPosts = useCallback(async (forceRefresh = false) => {
    if (!forceRefresh && posts.length > 0) {
      setLoading(false);
      return;
    }

    setError(null);
    
    try {
      const result = await PostAPIService.fetchPosts();
      
      if (result.success) {
        setPosts(result.data || []);
        setFilteredPosts(result.data || []);
        setError(null);
      } else {
        setError(result.error || 'Failed to load posts');
        if (posts.length === 0) {
          Alert.alert('Error', 'Failed to load posts. Please try again later.');
        }
      }
    } catch (error) {
      console.error('Load posts error:', error);
      setError(error.message || 'Failed to load posts');
      if (posts.length === 0) {
        Alert.alert('Error', 'Failed to load posts. Please try again later.');
      }
    }

    setLoading(false);
    setRefreshing(false);
  }, [posts.length, refreshing]);

  // Fetch posts when the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadPosts();
    }, [loadPosts])
  );

  // Handle refresh
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    loadPosts(true);
  }, [loadPosts]);

  // Handle search input change
  const handleSearchChange = useCallback((query) => {
    setSearchQuery(query);

    if (query.trim() === '') {
      setFilteredPosts(posts);
    } else {
      const searchTerm = query.toLowerCase();
      const filtered = posts.filter(post => {
        const enhancedPost = PostDataManager.enhancePost(post);
        return (
          enhancedPost.title.toLowerCase().includes(searchTerm) ||
          enhancedPost.content.toLowerCase().includes(searchTerm) ||
          enhancedPost.contact.toLowerCase().includes(searchTerm)
        );
      });
      setFilteredPosts(filtered);
    }
  }, [posts]);

  // Handle post selection
  const handlePostSelect = useCallback((post) => {
    if (onPostSelect) {
      onPostSelect(post);
    }
  }, [onPostSelect]);

  // Initial load of posts when component mounts
  useEffect(() => {
    loadPosts();
  }, []);

  // Render function for each post item in FlatList
  const renderPost = useCallback(({ item }) => (
    <PostCard
      post={item}
      onPostSelect={handlePostSelect}
      currentUser={currentUser}
    />
  ), [handlePostSelect, currentUser]);

  // Render component for empty list state
  const renderEmpty = useCallback(() => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        {searchQuery.trim() !== ''
          ? 'No posts found matching your search.'
          : 'No posts available.'}
      </Text>
      <TouchableOpacity style={styles.retryButton} onPress={() => loadPosts(true)}>
        <Text style={styles.retryButtonText}>Retry</Text>
      </TouchableOpacity>
    </View>
  ), [searchQuery, loadPosts]);

  // Loading state display
  if (loading && posts.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading posts...</Text>
      </View>
    );
  }

  // Error state display
  if (error && posts.length === 0) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => loadPosts(true)}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Search Header */}
      <View style={styles.searchCartRow}>
        <TextInput
          style={styles.searchBox}
          placeholder="Search posts..."
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={handleSearchChange}
        />
        <TouchableOpacity style={styles.iconButton} onPress={() => console.log('Search button pressed')}>
          <Text style={styles.icon}>🔍</Text>
        </TouchableOpacity>
      </View>

      {/* "Add Post" button - visible to all authenticated users */}
      {currentUser && (
        <TouchableOpacity style={styles.addButton} onPress={onNavigateToCreatePost}>
          <Ionicons name="add-circle-outline" size={28} color="#fff" />
          <Text style={styles.addButtonText}>Add Post</Text>
        </TouchableOpacity>
      )}

      {/* Posts List using FlatList for performance */}
      <FlatList
        data={filteredPosts}
        renderItem={renderPost}
        keyExtractor={item => item._id || item.id || Math.random().toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#007AFF']}
            tintColor="#007AFF"
          />
        }
        ListEmptyComponent={renderEmpty}
        removeClippedSubviews={true}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};

export default Posts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#64748b',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f8fafc',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  searchCartRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  searchBox: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  iconButton: {
    padding: 8,
    marginLeft: 4,
  },
  icon: {
    fontSize: 24,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10b981',
    marginHorizontal: 16,
    marginBottom: 16,
    paddingVertical: 14,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  postTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginRight: 8,
  },
  postDate: {
    fontSize: 12,
    color: '#64748b',
  },
  postContent: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
    marginBottom: 12,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  contactText: {
    fontSize: 12,
    color: '#64748b',
    marginLeft: 4,
  },
  imageCount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageCountText: {
    fontSize: 12,
    color: '#64748b',
    marginLeft: 4,
  },
});
