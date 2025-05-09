# Database Seeder

This directory contains the `seedDbWithProducts.js` script used to seed the MongoDB database with initial product data.

## Prerequisites

- Node.js installed
- MongoDB connection details in the `.env` file located in the `backend` directory

## Usage

1. Ensure you have the necessary dependencies installed. If not, run:

   ```sh
   npm install
   ```

2. Make sure your MongoDB server is running and the connection details are correctly specified in the `.env` file:

   ```
   MONGO_URI=mongodb://your_mongo_uri_here
   ```

3. Run the `seedDbWithProducts.js` script to seed the database:

   ```sh
   node seedDbWithProducts.js
   ```
   or
   ```sh
   node /workspaces/e-commerce-mobile_app/backend/db/seedDbWithProducts.js
   ```
   
   This script will:
   - Connect to the MongoDB database using the connection details from the `.env` file.
   - Check for existing products with the same name and skip them if they already exist.
   - Insert new products from the `productsData.js` file.

4. After running the script, you should see logs indicating the status of each product insertion.

## Notes

- The script ensures that no duplicate product names are inserted into the database.
- If an error occurs during the seeding process, the script will log the error and exit.

## Example

```sh
$ node seedDbWithProducts.js
✅ MongoDB connected
⚠️ Product with name "Apple iPhone 16 Pro" already exists. Skipping...
✅ Product with name "Wireless Headphones" inserted.
✅ Product with name "Gaming Laptop" inserted.
✅ MongoDB disconnected
```

## Data Source

The product data is stored in the `productsData.js` file located in the `data` directory. This file contains an array of product objects with the following structure:

```javascript
{
  name: "Product Name",
  description: "Product Description",
  price: 99.99,
  stock: 100,
  images: ["image1.jpg", "image2.jpg"],
  category: "Category Name",
  brand: "Brand Name",
  dimensions: { length: 10, width: 5, height: 2 },
  weight: 1.5,
  barcodes: ["123456789012"],
  ratings: 4.5,
  reviews: [],
  isFeatured: true,
  tags: ["tag1", "tag2"],
  createdAt: new Date(),
  updatedAt: new Date(),
}
```

## Additional Information

- Ensure the `productsData.js` file is properly formatted and contains valid product data.
- The script is idempotent, meaning it will not insert duplicate products based on the product name.
