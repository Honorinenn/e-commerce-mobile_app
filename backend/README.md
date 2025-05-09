# Backend API Documentation

This is the backend for the e-commerce mobile app. It provides various API endpoints for authentication, product management, chat, recommendations, and more.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```

3. The server will run on the port specified in the `.env` file or default to `3001`.

---

## API Endpoints

### **Base URL**
`http://<server-ip>:<port>`

### **1. `/api/otp`**
Handles OTP-related operations.

- **POST** `/api/otp/request-otp`  
  Request an OTP for a given email.  
  **Input:**  
  ```json
  {
    "email": "user@example.com"
  }
  ```  
  **Output:**  
  ```json
  {
    "message": "OTP sent successfully"
  }
  ```

- **POST** `/api/otp/verify-otp`  
  Verify the OTP for a given email.  
  **Input:**  
  ```json
  {
    "email": "user@example.com",
    "code": "123456"
  }
  ```  
  **Output:**  
  ```json
  {
    "message": "OTP verified successfully"
  }
  ```

---

### **2. `/api/products`**
Handles product-related operations.

- **GET** `/api/products`  
  Fetch all products.  
  **Output:**  
  ```json
  [
    {
      "id": "1",
      "name": "Product A",
      "price": 100
    },
    {
      "id": "2",
      "name": "Product B",
      "price": 200
    }
  ]
  ```

- **POST** `/api/products`  
  Add a new product.  
  **Input:**  
  ```json
  {
    "name": "Product C",
    "price": 300
  }
  ```  
  **Output:**  
  ```json
  {
    "message": "Product added successfully",
    "product": {
      "id": "3",
      "name": "Product C",
      "price": 300
    }
  }
  ```

---

### **3. `/api/auth`**
Handles user authentication.

- **POST** `/api/auth/login`  
  Authenticate a user.  
  **Input:**  
  ```json
  {
    "username": "user1",
    "password": "password123"
  }
  ```  
  **Output:**  
  ```json
  {
    "token": "jwt-token",
    "user": {
      "id": "1",
      "username": "user1"
    }
  }
  ```

- **GET** `/api/auth/users`  
  Fetch all users.  
  **Output:**  
  ```json
  [
    {
      "id": "1",
      "username": "user1"
    },
    {
      "id": "2",
      "username": "user2"
    }
  ]
  ```

- **GET** `/api/auth/users/:username`  
  Fetch a user by username.  
  **Output:**  
  ```json
  {
    "id": "1",
    "username": "user1"
  }
  ```

---

### **4. `/api/recommendations`**
Handles product recommendations.

- **GET** `/api/recommendations`  
  Fetch product recommendations.  
  **Output:**  
  ```json
  [
    {
      "id": "1",
      "product": "Product A",
      "recommendationScore": 0.9
    },
    {
      "id": "2",
      "product": "Product B",
      "recommendationScore": 0.8
    }
  ]
  ```

---

### **5. `/api/posts`**
Handles post-related operations.

- **GET** `/api/posts`  
  Fetch all posts.  
  **Output:**  
  ```json
  [
    {
      "id": "1",
      "title": "Post A",
      "content": "This is post A"
    },
    {
      "id": "2",
      "title": "Post B",
      "content": "This is post B"
    }
  ]
  ```

- **POST** `/api/posts`  
  Add a new post.  
  **Input:**  
  ```json
  {
    "title": "Post C",
    "content": "This is post C"
  }
  ```  
  **Output:**  
  ```json
  {
    "message": "Post added successfully",
    "post": {
      "id": "3",
      "title": "Post C",
      "content": "This is post C"
    }
  }
  ```

---

### **6. `/api/chat`**
Handles chat-related operations.

- **POST** `/api/chat`  
  Send a message to the chat system.  
  **Input:**  
  ```json
  {
    "content": "Hello, how are you?"
  }
  ```  
  **Output (Streamed):**  
  ```json
  {
    "response": "I'm good, thank you!"
  }
  ```

---

### **7. `/api` (Upload Images)**
Handles image uploads.

- **POST** `/api/upload`  
  Upload an image.  
  **Input:** Form-data with an image file.  
  **Output:**  
  ```json
  {
    "message": "Image uploaded successfully",
    "url": "http://example.com/uploads/image.jpg"
  }
  ```

---

## Environment Variables

The following environment variables are required:

- `PORT`: The port on which the server runs.
- `MONGO_URI`: MongoDB connection string.
- `AZURE_STORAGE_CONNECTION_STRING`: Azure Blob Storage connection string.
- `GEMMA_API_URL_LOCAL`: Local URL for the Gemma API.

---

## Development

To start the backend server in development mode, use the following command:

```bash
npm run dev
```

This will start the server with hot-reloading enabled.

---


## Setup AI
### Install and run Ollama with Gemma2:2b:
**Terminal 1**:

### Pull Ollama
```sh
curl -fsSL https://ollama.com/install.sh | sh
```

### Run Ollama
```sh
ollama serve
```

**Terminal 2**:

### Pull Gemma2:2b
```sh
ollama pull gemma2:2b
```

### Run Gemma2:2b
```sh
ollama run gemma2:2b
```
