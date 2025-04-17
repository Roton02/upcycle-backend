# 🚀 Upcycle Backend API

A RESTful API for a secondhand product marketplace built with Node.js, Express, TypeScript, and MongoDB.

## 🛠️ Tech Stack

- Node.js & Express
- TypeScript
- MongoDB with Mongoose
- JWT Authentication
- Zod Validation
- Cookie Parser & CORS
- Error Handling Middleware
- Query Builder Pattern

## 🏗️ Project Structure

```bash
src/
├── app/
│   ├── config/         # Environment configuration
│   ├── error/          # Error handling utilities
│   ├── middleware/     # Express middlewares
│   ├── modules/        # Feature modules
│   │   ├── auth/       # Authentication & User management
│   │   ├── listings/   # Product listings
│   │   ├── messages/   # User messaging system
│   │   └── transactions/ # Purchase transactions
│   ├── utils/          # Utility functions
│   └── router/         # API routes
└── server.ts          # Application entry point
```

## 🔑 Key Features

1. **Authentication**

   - User registration and login
   - JWT-based authentication
   - Role-based access control (User, Admin, Moderator)
   - Password reset functionality

2. **Product Listings**

   - CRUD operations for listings
   - Advanced filtering and search
   - Pagination and sorting
   - Image handling
   - Category management

3. **User Management**

   - Profile management
   - User roles and permissions
   - Account blocking/unblocking
   - User activity tracking

4. **Messaging System**

   - Direct messaging between users
   - Listing-specific conversations
   - Read status tracking
   - Conversation history

5. **Transactions**
   - Purchase management
   - Transaction status tracking
   - Purchase history
   - Sales reporting

## 🌐 Live API

Base URL: https://upcycle-delta.vercel.app/api

## 🛣️ Routes Documentation

### 1. Authentication Routes

```javascript
POST /auth/register     - Register a new user
└── Body: { username, email, phone, password }

POST /auth/login       - Login user
└── Body: { identifire, password }

DELETE /auth/logout    - Logout user

POST /forgot-password  - Request password reset
└── Body: { email }

PATCH /reset-password/:userId - Reset password
└── Body: { password, token }
```

### 2. Listing Routes

```javascript
GET /listings          - Get all listings
└── Query: { search, brand, category, condition, price[gte], price[lte], etc }

GET /listings/:id      - Get listing by ID

POST /listings        - Create new listing
└── Auth: Required
└── Body: { title, description, category, price, condition, images, etc }

PATCH /listings/:id   - Update listing
└── Auth: Required
└── Body: { title?, description?, price?, etc }

DELETE /listings/:id  - Delete listing
└── Auth: Required
```

### 3. Transaction Routes

```javascript
POST /transactions    - Create transaction
└── Auth: Required
└── Body: { itemID, sellerID, price }

GET /transactions/purchases/:userId  - Get user purchases
└── Auth: Required

GET /transactions/sales/:userId     - Get user sales history
└── Auth: Required

PATCH /transactions/:id            - Update transaction status
└── Auth: Required
└── Body: { status }
```

### 4. Message Routes

```javascript
POST /messages       - Send message
└── Auth: Required
└── Body: { receiverID, message, listingID? }

GET /messages/:userId - Get user messages
└── Auth: Required

GET /messages/conversation/:senderId/:receiverId - Get conversation
└── Auth: Required
```

### 5. Admin Routes

```javascript
GET /admin/users     - Get all users
└── Auth: Admin Required

PATCH /admin/users/:userId - Block/Unblock user
└── Auth: Admin Required

DELETE /admin/users/:userId - Delete user
└── Auth: Admin Required
```

## 🔍 API Query & Filtering System

### Query Parameters

| Parameter | Type   | Description            | Example                 |
| --------- | ------ | ---------------------- | ----------------------- |
| search    | string | Full-text search       | `?search=mountain+bike` |
| fields    | string | Select specific fields | `?fields=title,price`   |
| page      | number | Page number            | `?page=1`               |
| limit     | number | Items per page         | `?limit=10`             |

### Filtering Options

| Parameter | Type   | Description              | Example              |
| --------- | ------ | ------------------------ | -------------------- |
| brand     | string | Filter by brand name     | `?brand=Giant`       |
| category  | string | Filter by category       | `?category=Bicycles` |
| condition | string | Filter by item condition | `?condition=Used`    |
| location  | string | Filter by location       | `?location=Dhaka`    |
| status    | string | Filter by listing status | `?status=available`  |

### Price Filtering

| Parameter  | Type   | Description                 | Example            |
| ---------- | ------ | --------------------------- | ------------------ |
| price[gte] | number | Price greater than or equal | `?price[gte]=1000` |
| price[lte] | number | Price less than or equal    | `?price[lte]=5000` |
| price      | number | Exact price match           | `?price=3000`      |

### Sorting Options

| Parameter | Type   | Description      | Example           |
| --------- | ------ | ---------------- | ----------------- |
| sortBy    | string | Field to sort by | `?sortBy=price`   |
| sortOrder | string | Sort direction   | `?sortOrder=desc` |

## 📝 Example API Requests

### Basic Search & Filter

```bash
# Search bikes with price range and sorting
GET /api/listings?search=bike&price[gte]=1000&price[lte]=5000&sortBy=price&sortOrder=asc

# Get listings by category with pagination
GET /api/listings?category=Electronics&page=1&limit=20

# Complex filtering
GET /api/listings?brand=Giant&condition=Used&location=Dhaka&status=available
```

### Field Selection

```bash
# Select specific fields
GET /api/listings?fields=title,price,images,category

# Combine with other filters
GET /api/listings?fields=title,price&category=Bicycles&sortBy=price
```

### Response Format

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Listings retrieved successfully",
  "data": {
    "data": [
      {
        "title": "Mountain Bike",
        "price": 25000,
        "condition": "Used"
      }
    ],
    "meta": {
      "page": 1,
      "limit": 10,
      "total": 45,
      "totalPages": 5
    }
  }
}
```

## 💻 Development

### Prerequisites

- Node.js (>= 14.x)
- MongoDB
- TypeScript
- npm/yarn

### Environment Setup

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

### Database Connection

```typescript
// Configuration in .env
DATABASE_URL=mongodb+srv://<username>:<password>@cluster0.example.net/dbname

// Connection options
{
  retryWrites: true,
  w: 'majority',
  maxPoolSize: 10,
  useNewUrlParser: true,
  useUnifiedTopology: true
}
```

## 🔐 Security Implementations

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt with salt rounds
- **Role-Based Access**: User, Admin, Moderator roles
- **Request Validation**: Zod schema validation
- **CORS Protection**: Configured secure CORS policy
- **Error Handling**: Centralized error management
- **Rate Limiting**: API request rate limiting
- **Input Sanitization**: XSS protection
- **Security Headers**: Helmet middleware integration

## 📈 Performance Optimizations

- **Database Indexing**: Optimized query performance
- **Query Caching**: Response caching implementation
- **Pagination**: Efficient data loading
- **Field Selection**: Selective data retrieval
- **Compression**: Response compression
- **Connection Pooling**: Database connection optimization
