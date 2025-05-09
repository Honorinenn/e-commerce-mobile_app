# e-commerce-mobile_app

## Overview
This is a full-stack e-commerce mobile application built with React Native for the frontend and Node.js with Express for the backend. The app provides features such as user authentication, product browsing, shopping cart management, and more.

## Project Structure

### Backend
The backend is located in the `backend/` directory and includes:
- **Controllers**: Handle the business logic for various features (e.g., `authController.js`, `productController.js`).
- **Routes**: Define API endpoints (e.g., `authRoutes.js`, `productRoutes.js`).
- **Models**: Define database schemas (e.g., `User.js`, `Product.js`).
- **Utils**: Utility functions (e.g., `email.js`, `otp.js`).
- **Services**: Additional services like AI integration (e.g., `aiService.js`).

### Frontend
The frontend is located in the `frontend/` directory and includes:
- **App**: Contains the main application screens and navigation (e.g., `Login.js`, `ShoppingScreen.js`).
- **Components**: Reusable UI components (e.g., `ThemedText.tsx`, `ParallaxScrollView.tsx`).
- **Constants**: Shared constants (e.g., `Colors.ts`).
- **Hooks**: Custom React hooks (e.g., `useColorScheme.ts`).

## Setup Instructions

### Backend
1. Navigate to the `backend/` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```

### Frontend
1. Navigate to the `frontend/` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the app:
   ```bash
   npx expo start
   ```

## API Endpoints

### Authentication
- `POST /request-otp`: Request a one-time password (OTP).
- `POST /verify-otp`: Verify the OTP.

### Products
- `GET /products`: Fetch all products.
- `GET /products/:id`: Fetch a specific product by ID.

### Users
- `GET /users`: Fetch all users.
- `GET /users/:id`: Fetch a specific user by ID.

## Additional Resources
- **Database Seeding**: Use the scripts in `backend/db/` to seed the database with initial data.
- **Testing**: Test utilities are available in `dev_code_auth/`.


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
