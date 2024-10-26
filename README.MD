# KOBBY BLOGS

Kobby Blogs is a backend-only API that enables CRUD operations for blog posts with user authentication, authorization, and a comment management system.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Live Endpount](#live-endpoint)
- [Account verification](#account-verification)

---

## Features

- **Blog CRUD Operations**: Create, retrieve, update, and delete blog posts.
- **User Authentication & Authorization**: Secure API access with JWT-based authentication.
- **Comment Management**: Add, edit, or delete comments on blog posts.

---

## Tech Stack

- **Backend**: Node.js, Express.js, Mongoose, MongoDB

---

## Prerequisites

- **Node.js**: Install [Node.js](https://nodejs.org/) (v20 or later).
- **MongoDB**: Set up MongoDB locally or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
- **Git**: Install [Git](https://git-scm.com/) to clone the repository.

---

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/your-project-name.git
   cd your-project-name
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:
   See the [Environment Variables](#environment-variables) section.

---

## Environment Variables

Create a `.env` file in the root directory and add the following:

```env
MONGO_URI=mongodb://localhost:27017/your-database-name
JWT_SECRET=your-secret-key
JWT_LIFETIME=your-jwt-lifetime
```

---

## API Endpoints

### Auth Routes

- **POST** `/api/v1/auth/register` - Register a new user
- **POST** `/api/v1/auth/login` - User login
- **POST** `/api/v1/auth/verify-email` - Verify email after registration

### Blog Routes

- **POST** `/api/v1/blog` - Create a new blog post
- **GET** `/api/v1/blog` - Get all blog posts
- **GET** `/api/v1/blog/:id` - Get a blog post by ID
- **PATCH** `/api/v1/blog/:id` - Update a blog post
- **DELETE** `/api/v1/blog/:id` - Delete a blog post

### Comments

- **PATCH** `/api/v1/comment/blog/:blogId` - Add a comment to a blog post
- **PATCH** `/api/v1/comment/blog/:blogId/comment/:commentId` - Update a comment
- **DELETE** `/api/v1/comment/blog/:blogId/comment/:commentId` - Delete a comment

---

### Live Endpoint

The live version of the Kobby Blogs API is available at:

Base URL: [https://slightly-techie-0l2t.onrender.com/]

---

## Account Verification

After registering, a verification email will be sent to the user. Since this is a development environment, Ethereal is used for email testing. Follow these steps to verify an account:

1. **Login to Ethereal**: Go to [Ethereal](https://ethereal.email/login) and log in using the credentials below to access the inbox:

   - **User**: `rosalinda.williamson@ethereal.email`
   - **Password**: `PrjHGRmKTmwkNtWY86`

2. **Locate the Verification Email**: In the inbox, find the email with the verification link.

3. **Extract the Token**: Copy the verification token included in the email link (usually found in the URL parameters).

4. **Verify the Account**: Use the token to verify the account via the /api/v1/auth/verify-email endpoint, completing the registration process.

---
