import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Share,
  Platform,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import PostEditForm from './PostEditForm';
import { PostAPIService, PostDataManager } from './api';
import styles from './PostDetails.styles';

const PostDetails = ({ route, navigation }) => {
  const { post, currentUser } = route.params;
  const scrollViewRef = useRef(null);

  // State Management
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [enhancedPost, setEnhancedPost] = useState(null);
  const [editPost, setEditPost] = useState(null);
  const [updateInProgress, setUpdateInProgress] = useState(false);
  const [deleteInProgress, setDeleteInProgress] = useState(false);

  // Initialize enhanced post data
  useEffect(() => {
    const enhanced = PostDataManager.enhancePost(post);
    setEnhancedPost(enhanced);
    setEditPost({
      title: enhanced.title,
      content: enhanced.content,
      contact: enhanced.contact,
      images: enhanced.images.filter(img => img !== 'https://via.placeholder.com/400x300?text=No+Image'),
    });
  }, [post]);

  const handleShare = useCallback(async () => {
    try {
      await Share.share({
        message: `Check out this post: ${enhancedPost?.title}\n\n${enhancedPost?.content}\n\nContact: ${enhancedPost?.contact}`,
      });
    } catch (error) {
      console.error('Share error:', error);
    }
  }, [enhancedPost]);

  const handleToggleEditMode = useCallback(() => {
    if (updateInProgress) return;
    
    setEditMode(prev => !prev);
    if (!editMode && enhancedPost) {
      setEditPost({
        title: enhancedPost.title,
        content: enhancedPost.content,
        contact: enhancedPost.contact,
        images: enhancedPost.images.filter(img => img !== 'https://via.placeholder.com/400x300?text=No+Image'),
      });
      
      // Scroll to top when entering edit mode
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
      }, 100);
    }
  }, [editMode, enhancedPost, updateInProgress]);

  const handlePostChange = useCallback((newPostData) => {
    setEditPost(newPostData);
  }, []);

  const handleImagesChange = useCallback((newImages) => {
    setEditPost(prev => ({ ...prev, images: newImages }));
  }, []);

  const handleUpdatePost = useCallback(async () => {
    if (updateInProgress) return;
    
    setUpdateInProgress(true);
    try {
      const updateData = PostDataManager.prepareUpdateData(editPost);
      const result = await PostAPIService.updatePost(
        enhancedPost?.id || post?.id || post?._id, 
        updateData
      );
      
      if (result.success) {
        // Update local state with new data
        const updatedEnhanced = PostDataManager.enhancePost(result.data);
        setEnhancedPost(updatedEnhanced);
        
        // Update parent component if callback exists
        if (route.params?.onPostUpdate) {
          route.params.onPostUpdate(result.data);
        }
        
        Alert.alert('Success', 'Post updated successfully!', [
          { text: 'OK', onPress: () => setEditMode(false) }
        ]);
      } else {
        Alert.alert('Error', result.error || 'Failed to update post');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setUpdateInProgress(false);
    }
  }, [editPost, enhancedPost?.id, post, route.params]);

  // Handler for deleting a post
  const handleDeletePost = useCallback(async () => {
    if (deleteInProgress) return;

    Alert.alert(
      'Confirm Delete',
      `Are you sure you want to delete "${enhancedPost?.title}"? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            setDeleteInProgress(true);
            try {
              const result = await PostAPIService.deletePost(enhancedPost?.id || post?.id || post?._id);
              if (result.success) {
                Alert.alert('Success', 'Post deleted successfully!', [
                  { text: 'OK', onPress: () => navigation.goBack() }
                ]);
                // Optionally, call a refresh function passed via route.params if post list needs update
                if (route.params?.onPostDelete) {
                    route.params.onPostDelete(enhancedPost?.id || post?.id || post?._id);
                }
              } else {
                Alert.alert('Error', result.error || 'Failed to delete post. Please try again.');
              }
            } catch (error) {
              console.error('Delete post error:', error);
              Alert.alert('Error', 'An unexpected error occurred while deleting the post.');
            } finally {
              setDeleteInProgress(false);
            }
          },
        },
      ]
    );
  }, [enhancedPost, post, deleteInProgress, navigation, route.params]);

  // Loading state
  if (!enhancedPost) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 24}
      >
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation?.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color="#3B82F6" />
            </TouchableOpacity>
            <View style={styles.headerActions}>
              {/* Show Edit and Delete buttons for all users when not in edit mode */}
              {!editMode && (
                <>
                  <TouchableOpacity 
                    style={[styles.actionButton, { marginRight: 10 }]} 
                    onPress={handleToggleEditMode}
                    disabled={updateInProgress || deleteInProgress}
                  >
                    <Ionicons name="create-outline" size={24} color="#3B82F6" />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.actionButton} 
                    onPress={handleDeletePost}
                    disabled={updateInProgress || deleteInProgress}
                  >
                    <Ionicons name="trash-outline" size={24} color="#EF4444" />
                  </TouchableOpacity>
                </>
              )}
              {/* Show Cancel when in edit mode */}
              {editMode && (
                 <TouchableOpacity 
                    style={[styles.actionButton, { marginRight: 10 }]} 
                    onPress={handleToggleEditMode} // This will act as cancel
                    disabled={updateInProgress || deleteInProgress}
                  >
                    <Ionicons name="close-circle-outline" size={24} color="#EF4444" />
                  </TouchableOpacity>
              )}
              {/* Share button - always visible */}
              <TouchableOpacity style={[styles.actionButton, { marginLeft: editMode ? 0 : 10 }]} onPress={handleShare}>
                  <Ionicons name="share-outline" size={24} color="#3B82F6" />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView
            ref={scrollViewRef}
            style={styles.scrollContainer}
            contentContainerStyle={{ paddingBottom: editMode ? 40 : 80 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Post Information */}
            <View style={styles.postInfo}>
              {/* Post Title */}
              <Text style={styles.postTitle}>{enhancedPost?.title}</Text>

              {/* Post Meta */}
              <View style={styles.metaContainer}>
                <View style={styles.dateContainer}>
                  <Ionicons name="calendar-outline" size={16} color="#64748b" />
                  <Text style={styles.dateText}>
                    {new Date(enhancedPost?.createdAt).toLocaleDateString()}
                  </Text>
                </View>
                <View style={styles.contactContainer}>
                  <Ionicons name="person-outline" size={16} color="#64748b" />
                  <Text style={styles.contactText}>{enhancedPost?.contact}</Text>
                </View>
              </View>

              {/* Post Content */}
              {!editMode && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Content</Text>
                  <Text style={styles.content}>{enhancedPost?.content}</Text>
                </View>
              )}

              {/* Post Images */}
              {!editMode && enhancedPost?.images.length > 0 && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Images</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageGallery}>
                    {enhancedPost.images.map((imageUrl, index) => (
                      <Image
                        key={index}
                        source={{ uri: imageUrl }}
                        style={styles.postImage}
                        resizeMode="cover"
                      />
                    ))}
                  </ScrollView>
                </View>
              )}

              {/* Edit Form */}
              {editMode && (
                <PostEditForm
                  editPost={editPost}
                  onPostChange={handlePostChange}
                  onImagesChange={handleImagesChange}
                  onSave={handleUpdatePost}
                  onCancel={handleToggleEditMode}
                  loading={updateInProgress}
                />
              )}
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PostDetails;
