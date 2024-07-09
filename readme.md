<div align="center">
  <h1>Project Overview</h1>
</div>

---

# Project Name: Camper Shop Backend

## Introduction

**Campers Shop:** Your Ultimate Destination for Quality Camping Gear and Outdoor Essentials

## Project Description

Campers Shop is an e-commerce platform dedicated to catering to the needs of camping enthusiasts. It aims to provide a comprehensive range of high-quality camping gear and outdoor essentials to enhance the camping experience for individuals and families alike.

The primary purpose of Campers Shop is to offer a convenient and reliable online marketplace where customers can find everything they need for their camping trips. From tents and sleeping bags to cooking gear, electronics, and hiking essentials, the platform aims to be a one-stop shop for all camping needs.

## Features

### Product Management:

- **Create Product:** Allows creating new products with details like name, description, price, stock, category, etc.
- **Get All Products:** Retrieves all products available in the inventory.
- **Update Product:** Updates details of a specific product identified by its unique ID.
- **Delete Product:** Removes a product from the inventory based on its ID.
- **Get Single Product:** Fetches details of a single product using its ID.
- **Get Best Selling Products:** Retrieves the top-selling products based on sales count.
- **Get Products by Query:** Fetches products based on various query parameters like search item, category, price range, sorting, pagination, etc.
- **Get All Categories:** Retrieves all available product categories.

### Order Management:

- **Create Order:** Allows creating new orders for products.

### Search and Filtering:

- **Search Products:** Provides functionality to search for products based on keywords.
- **Filter Products:** Allows filtering products by category and price range.

### Error Handling:

- **Error Responses:** Provides appropriate error responses with HTTP status codes and messages for invalid requests or operations.

### Response Formatting:

- **Uniform Responses:** Standardizes API responses with consistent structure (status code, success indicator, message, data).

## Technology Stack

The technology stack used in the Camper Shop project includes:

- **Backend:**

  - Node.js
  - Express.js
  - MongoDB (as the database)
  - Mongoose (ODM library for MongoDB)
  - TypeScript (for type safety)

- **Other Tools and Libraries:**
  - HTTP Status: Used for standard HTTP status codes in responses.
  - dotenv: For loading environment variables from a `.env` file.
  - Other dependencies specific to your backend implementation.

## Installation Guideline

### Prerequisites

- **Node.js:** Ensure Node.js is installed on your machine. You can download it from [nodejs.org](https://nodejs.org/) and follow the installation instructions.

- **npm (Node Package Manager):** npm comes bundled with Node.js installation. Check that npm is installed by running:
  ```bash
  npm -v
  ```

### Installation Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/solayman-bd/Campers-shop-backend.git

   ```

2. Create a `.env` file in the root directory of the project.
3. Add necessary configuration variables in the `.env` file.
   Example:
   ```bash
   NODE_ENV=development
   PORT=5000
   DATABASE_URL=
   ```
4. run command:

```bash
   npm run start:dev

```
