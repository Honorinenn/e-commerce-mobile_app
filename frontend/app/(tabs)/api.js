import { API_BASE } from '../../constants/index.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// API Service and Data Manager for ProductDetails

const CONFIG = {
  API_URL: API_BASE + '/products',
  DEFAULT_IMAGE: 'https://via.placeholder.com/400x300?text=No+Image',
  MAX_IMAGE_URLS: 10,
};

// Helper function to get authorization headers
const getAuthHeaders = async () => {
  const token = await AsyncStorage.getItem('userToken');
  if (token) {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
  }
  return {
    'Content-Type': 'application/json',
  };
};

export class ProductAPIService {
  static async fetchProducts() {
    try {
      const headers = await getAuthHeaders();
      const response = await fetch(CONFIG.API_URL, {
        method: 'GET',
        headers: headers,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Fetch products error:', error);
      return { success: false, error: error.message };
    }
  }

  static async createProduct(productData) {
    try {
      const headers = await getAuthHeaders();
      const response = await fetch(CONFIG.API_URL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Create product error:', error);
      return { success: false, error: error.message };
    }
  }

  static async updateProduct(productId, productData) {
    try {
      const headers = await getAuthHeaders();
      const response = await fetch(`${CONFIG.API_URL}/${productId}`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(productData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Update product error:', error);
      return { success: false, error: error.message };
    }
  }

  static async deleteProduct(productId) {
    console.log(`[ProductAPIService] Attempting to delete product with ID: ${productId}`);
    try {
      const headers = await getAuthHeaders();
      if (!headers.Authorization) {
        console.error('[ProductAPIService] Delete product error: No authorization token found before sending request.');
        return { success: false, error: 'Authorization token not found. Please log in again.' };
      }
      console.log('[ProductAPIService] Sending DELETE request to:', `${CONFIG.API_URL}/${productId}`);
      console.log('[ProductAPIService] Request headers:', JSON.stringify(headers));

      const response = await fetch(`${CONFIG.API_URL}/${productId}`, {
        method: 'DELETE',
        headers: headers,
      });

      console.log(`[ProductAPIService] Delete product response status: ${response.status}`);
      const responseText = await response.text(); // Get response as text first
      console.log('[ProductAPIService] Delete product response text:', responseText);

      if (!response.ok) {
        let errorData = {};
        try {
          errorData = JSON.parse(responseText); // Try to parse the text as JSON
          console.error('[ProductAPIService] Delete product error response (parsed JSON):', errorData);
        } catch (e) {
          console.error('[ProductAPIService] Failed to parse error response as JSON. Text was:', responseText);
          errorData = { message: responseText || `HTTP error! status: ${response.status}` };
        }
        const errorMessage = errorData.message || errorData.error || `Failed to delete product. Status: ${response.status}`;
        console.error(`[ProductAPIService] Full error message constructed: ${errorMessage}`);
        // Return the actual error message from the backend if available
        return { success: false, error: errorMessage }; 
      }
      
      // Check if response has content before trying to parse JSON for success cases
      if (responseText && responseText.length > 0) {
        try {
          const data = JSON.parse(responseText);
          return { success: true, data };
        } catch (e) {
          // If parsing fails but status was ok, assume success with no specific JSON body
          console.warn('[ProductAPIService] Response was OK but failed to parse JSON body for success. Text was:', responseText);
          return { success: true, data: { message: 'Product deleted successfully (non-JSON response)' } };
        }
      } else {
        // Handle cases where DELETE might return 200/204 OK with no content
        return { success: true, data: { message: 'Product deleted successfully' } };
      }
    } catch (error) {
      // This catch block handles network errors or errors thrown before/after the fetch call itself
      console.error('[ProductAPIService] Delete product error (outer catch block):', error.toString());
      return { success: false, error: error.message || 'An unexpected network error occurred.' };
    }
  }

  static async registerUser(userData) {
    try {
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Register user error:', error);
      return { success: false, error: error.message };
    }
  }
}

export class ProductDataManager {
  static parsePrice(val) {
    if (typeof val === 'number') return Math.max(0, val);
    if (typeof val === 'string') {
      const parsed = parseFloat(val.replace(/[^0-9.]/g, ''));
      return isNaN(parsed) ? 0 : Math.max(0, parsed);
    }
    return 0;
  }

  static getProductImages(product) {
    // Priority: images array > imageUrls array > imageUrl > default
    if (product.images && Array.isArray(product.images) && product.images.length > 0) {
      return product.images.filter(url => url && url.trim() !== '');
    }
    
    if (product.imageUrls && Array.isArray(product.imageUrls) && product.imageUrls.length > 0) {
      return product.imageUrls.filter(url => url && url.trim() !== '');
    }
    
    if (product.imageUrl && product.imageUrl.trim() !== '') {
      return [product.imageUrl];
    }
    
    return [CONFIG.DEFAULT_IMAGE];
  }

  static validateImageUrl(url) {
    if (!url || typeof url !== 'string') return false;
    const urlPattern = /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i;
    return urlPattern.test(url.trim());
  }

  static sanitizeImageUrls(urls) {
    if (!Array.isArray(urls)) return [];
    return urls
      .map(url => (typeof url === 'string' ? url.trim() : ''))
      .filter(url => url !== '')
      .slice(0, CONFIG.MAX_IMAGE_URLS);
  }

  static enhanceProduct(product) {
    return {
      id: product.id || product._id || '1',
      name: product.name || product.description || 'Unnamed Product',
      description: product.description || '',
      price: this.parsePrice(product.price),
      salePrice: product.salePrice ? this.parsePrice(product.salePrice) : null,
      images: this.getProductImages(product),
      brand: product.brand || 'Brand Name',
      category: product.category || 'Electronics',
      rating: product.rating || 4.5,
      reviewCount: product.reviewCount || 128,
      inStock: product.inStock !== false && (product.stock || 0) > 0,
      stockQuantity: product.stock || product.stockQuantity || 10,
      specifications: product.specifications || {
        'Model': 'Latest Model',
        'Warranty': '1 Year',
        'Color': 'Multiple Colors Available',
        'Weight': 'Lightweight Design',
      },
    };
  }

  static prepareUpdateData(editProduct) {
    const sanitizedUrls = this.sanitizeImageUrls(editProduct.imageUrls);
    return {
      name: editProduct.name.trim(),
      description: editProduct.description.trim(),
      price: parseFloat(editProduct.price) || 0,
      images: sanitizedUrls,
      imageUrls: sanitizedUrls, // Support both field names
      imageUrl: sanitizedUrls.length > 0 ? sanitizedUrls[0] : null, // Backward compatibility
    };
  }
}

// Post API Configuration
const POST_CONFIG = {
  API_URL: API_BASE + '/posts',
  DEFAULT_IMAGE: 'https://via.placeholder.com/400x300?text=No+Image',
  MAX_IMAGE_URLS: 5,
};

export class PostAPIService {
  static async fetchPosts() {
    try {
      const headers = await getAuthHeaders();
      const response = await fetch(POST_CONFIG.API_URL, {
        method: 'GET',
        headers: headers,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Fetch posts error:', error);
      return { success: false, error: error.message };
    }
  }

  static async createPost(postData) {
    try {
      const headers = await getAuthHeaders();
      const response = await fetch(POST_CONFIG.API_URL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Create post error:', error);
      return { success: false, error: error.message };
    }
  }

  static async updatePost(postId, postData) {
    try {
      const headers = await getAuthHeaders();
      const response = await fetch(`${POST_CONFIG.API_URL}/${postId}`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(postData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Update post error:', error);
      return { success: false, error: error.message };
    }
  }

  static async deletePost(postId) {
    try {
      const headers = await getAuthHeaders();
      const response = await fetch(`${POST_CONFIG.API_URL}/${postId}`, {
        method: 'DELETE',
        headers: headers,
      });

      if (!response.ok) {
        if (response.status === 204 || response.headers.get("content-length") === "0") {
          return { success: true, data: { message: 'Post deleted successfully' } };
        }
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || errorData.error || `HTTP error! status: ${response.status}`);
      }
      
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const data = await response.json();
        return { success: true, data };
      } else {
        return { success: true, data: { message: 'Post deleted successfully' } };
      }
    } catch (error) {
      console.error('Delete post error:', error);
      return { success: false, error: error.message };
    }
  }

  static async registerUser(userData) {
    try {
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Register user error:', error);
      return { success: false, error: error.message };
    }
  }
}

export class PostDataManager {
  static validateImageUrl(url) {
    try {
      new URL(url);
      return /\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i.test(url);
    } catch {
      return false;
    }
  }

  static sanitizeImageUrls(urls) {
    if (!Array.isArray(urls)) return [];
    return urls
      .filter(url => url && typeof url === 'string' && url.trim() !== '')
      .map(url => url.trim())
      .slice(0, POST_CONFIG.MAX_IMAGE_URLS);
  }

  static getPostImages(post) {
    if (post.images && Array.isArray(post.images) && post.images.length > 0) {
      return post.images.filter(url => url && url.trim() !== '');
    }
    return [POST_CONFIG.DEFAULT_IMAGE];
  }

  static enhancePost(post) {
    return {
      id: post.id || post._id || '1',
      title: post.title || 'Untitled Post',
      content: post.content || '',
      images: this.getPostImages(post),
      contact: post.contact || 'No contact info',
      createdAt: post.createdAt || new Date().toISOString(),
      updatedAt: post.updatedAt || new Date().toISOString(),
    };
  }

  static prepareUpdateData(editPost) {
    const sanitizedUrls = this.sanitizeImageUrls(editPost.images);
    return {
      title: editPost.title.trim(),
      content: editPost.content.trim(),
      contact: editPost.contact.trim(),
      images: sanitizedUrls,
    };
  }
}

export { CONFIG };