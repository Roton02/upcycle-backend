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

## 🚀 API Endpoints

### Authentication
