# API Documentation & Testing Guide

This document provides a comprehensive overview of all the API endpoints in the application, their allowed roles, request payloads, and a **Step-by-Step Testing Guide** using Postman.

---

## Step-by-Step Testing Guide (Postman)

To test the entire flow of the application properly, follow these steps in order:

### 1. Register & Login Users
1. **Register Admin:** Call `POST /api/users/register` with `role: "ADMIN"`.
2. **Register Landlord:** Call `POST /api/users/register` with `role: "LANDLORD"`.
3. **Register Tenant:** Call `POST /api/users/register` with `role: "TENANT"`.
4. **Login as Landlord:** Call `POST /api/auth/login` with the Landlord's email. Copy the `token` from the response.
5. **Login as Tenant:** Call `POST /api/auth/login` with the Tenant's email. Copy the `token` from the response.

### 2. Create Category & Property
1. **Create Category (Admin):** Use Admin token. Call `POST /api/categories`. Copy the generated category `id`.
2. **Create Property (Landlord):** Use Landlord token. Call `POST /api/properties`. Use the category ID. Copy the generated property `id`.

### 3. Rental Request Flow
1. **Submit Request (Tenant):** Use Tenant token. Call `POST /api/requests` providing the property `id`.
2. **View Request (Landlord):** Use Landlord token. Call `GET /api/requests/landlord/all` to see the tenant's request. Copy the request `id`.
3. **Approve Request (Landlord):** Use Landlord token. Call `PATCH /api/requests/landlord/:id` with `status: "APPROVED"`.

### 4. Payment Flow (Stripe)
1. **Create Payment Intent (Tenant):** Use Tenant token. Call `POST /api/payments/create` with the approved request `id` and `provider: "STRIPE"`. Copy the `transactionId` (which is the Stripe intent ID).
2. **Confirm Payment (Tenant):** Call `POST /api/payments/confirm` with the `transactionId`. (Note: In a real app, Stripe frontend handles this, but here you can test the webhook/manual confirm).

### 5. Review
1. **Create Review (Tenant):** Use Tenant token. Call `POST /api/reviews` with the rented property `id` and a rating.

---

## 1. Authentication & Users

### Login
- **Endpoint:** `POST /api/auth/login`
- **Roles:** Public
- **Body:** `{ "email": "user@example.com", "password": "password123" }`

### Register User
- **Endpoint:** `POST /api/users/register`
- **Roles:** Public
- **Body:** `{ "name": "John Doe", "email": "john@example.com", "password": "pass", "role": "TENANT" }` *(Roles: TENANT, LANDLORD, ADMIN)*

### Get My Profile
- **Endpoint:** `GET /api/users/me`
- **Roles:** `ADMIN`, `TENANT`, `LANDLORD`

---

## 2. Categories

### Create Category
- **Endpoint:** `POST /api/categories`
- **Roles:** `ADMIN`
- **Body:** `{ "name": "Apartment" }`

### Get All Categories
- **Endpoint:** `GET /api/categories`
- **Roles:** Public

---

## 3. Properties

### Create Property
- **Endpoint:** `POST /api/properties`
- **Roles:** `LANDLORD`
- **Body:** 
  ```json
  {
    "title": "Beautiful Apartment",
    "description": "A spacious 3 bedroom apartment.",
    "price": 1500,
    "location": "New York, NY",
    "bedrooms": 3,
    "bathrooms": 2,
    "categoryId": "uuid",
    "amenities": ["WiFi", "Pool"]
  }
  ```

### Get All Properties
- **Endpoint:** `GET /api/properties`
- **Roles:** Public
- **Query Params:** `location`, `minPrice`, `maxPrice`, `categoryId`, etc.

### Update / Delete Property
- **Endpoint:** `PUT /api/properties/:id` & `DELETE /api/properties/:id`
- **Roles:** `LANDLORD`

---

## 4. Rental Requests

### Submit Rental Request
- **Endpoint:** `POST /api/requests`
- **Roles:** `TENANT`
- **Body:** `{ "propertyId": "uuid" }`

### Get Tenant's Requests
- **Endpoint:** `GET /api/requests`
- **Roles:** `TENANT`

### Get Landlord's Requests
- **Endpoint:** `GET /api/requests/landlord/all`
- **Roles:** `LANDLORD`

### Approve/Reject Request
- **Endpoint:** `PATCH /api/requests/landlord/:id`
- **Roles:** `LANDLORD`
- **Body:** `{ "status": "APPROVED" }` *(Options: PENDING, APPROVED, REJECTED)*

---

## 5. Payments

### Create Payment Intent
- **Endpoint:** `POST /api/payments/create`
- **Roles:** `TENANT`
- **Body:** `{ "rentalRequestId": "uuid", "provider": "STRIPE" }`

### Confirm Payment
- **Endpoint:** `POST /api/payments/confirm`
- **Roles:** `TENANT`
- **Body:** `{ "transactionId": "txn_xxx" }`

### Get Payment History
- **Endpoint:** `GET /api/payments`
- **Roles:** `TENANT`

---

## 6. Reviews

### Create Review
- **Endpoint:** `POST /api/reviews`
- **Roles:** `TENANT`
- **Body:** `{ "propertyId": "uuid", "rating": 5, "comment": "Great place!" }`

### Get Property Reviews
- **Endpoint:** `GET /api/reviews?propertyId=uuid`
- **Roles:** Public

### Update / Delete Review
- **Endpoint:** `PUT /api/reviews/:id` & `DELETE /api/reviews/:id`
- **Roles:** `TENANT`

---

## 7. Admin Module

### Get All Users
- **Endpoint:** `GET /api/admin/users`
- **Roles:** `ADMIN`

### Update User Status (Ban/Unban)
- **Endpoint:** `PATCH /api/admin/users/:id`
- **Roles:** `ADMIN`
- **Body:** `{ "status": "BLOCKED" }` *(Options: ACTIVE, BLOCKED)*

### Get All Properties
- **Endpoint:** `GET /api/admin/properties`
- **Roles:** `ADMIN`

### Get All Rental Requests
- **Endpoint:** `GET /api/admin/rentals`
- **Roles:** `ADMIN`
