# 🏠 Rental Property Management System — Backend API

A full-featured **Property Rental Management REST API** built with **Node.js**, **TypeScript**, **Express**, **Prisma ORM**, and **PostgreSQL**. Includes Stripe payment integration, role-based access control (RBAC), and JWT authentication.

---

## 🚀 Tech Stack

| Technology       | Purpose                        |
|------------------|--------------------------------|
| Node.js          | Runtime environment            |
| TypeScript       | Type-safe development          |
| Express.js       | HTTP server & routing          |
| Prisma ORM       | Database access & migrations   |
| PostgreSQL (Neon)| Relational database            |
| Stripe           | Payment gateway                |
| JWT              | Authentication & authorization |
| bcryptjs         | Password hashing               |
| Zod              | Input validation               |

---

## 📁 Project Structure

```
src/
├── app.ts                    # Express app setup & route mounting
├── server.ts                 # Server entry point
├── config/                   # Environment config
├── lib/
│   └── prisma.ts             # Prisma client instance
├── middlewares/
│   └── auth.ts               # JWT auth middleware (RBAC)
├── utils/
│   ├── catchAsync.ts         # Async error wrapper
│   └── sendResponse.ts       # Unified response helper
└── modules/
    ├── auth/                 # Login & token refresh
    ├── user/                 # Registration & profile
    ├── profile/              # Profile management
    ├── category/             # Property categories
    ├── property/             # Property CRUD
    ├── rentalRequest/        # Rental request management
    ├── payment/              # Stripe payment & webhook
    ├── review/               # Property reviews
    └── admin/                # Admin management panel

prisma/
└── schema/
    ├── schema.prisma         # Main Prisma config
    ├── user.prisma           # User model
    ├── property.prisma       # Property model
    ├── rentalRequest.prisma  # RentalRequest model
    ├── payment.prisma        # Payment model
    ├── review.prisma         # Review model
    └── enums.prisma          # Shared enums
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL=postgresql://...
PORT=5000
APP_URL=http://localhost:5000

JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

BCRYPT_SALT_ROUNDS=12
```

---

## 🏁 Getting Started

```bash
# Install dependencies
npm install

# Push Prisma schema to database
npx prisma db push

# Generate Prisma client
npx prisma generate

# Start development server
npm run dev
```

Server will start at: `http://localhost:5000`

---

## 👥 User Roles

| Role       | Description                                      |
|------------|--------------------------------------------------|
| `TENANT`   | Can rent properties, make payments, write reviews |
| `LANDLORD` | Can list & manage their own properties            |
| `ADMIN`    | Full access to all modules and operations         |

---

## 🔑 Authentication

All protected routes require a Bearer token in the `Authorization` header:

```
Authorization: Bearer <access_token>
```

---

## 📡 API Endpoints

### 1. Auth Module

| Method | Endpoint              | Access  | Description                |
|--------|-----------------------|---------|----------------------------|
| POST   | `/api/auth/login`     | Public  | Login and get tokens       |
| POST   | `/api/auth/refresh-token` | Public | Refresh access token   |

**Login Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

---

### 2. User Module

| Method | Endpoint             | Access             | Description       |
|--------|----------------------|--------------------|-------------------|
| POST   | `/api/users/register` | Public            | Register new user |
| GET    | `/api/users/me`      | All Roles          | Get own profile   |

**Register Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "TENANT"
}
```

---

### 3. Profile Module

| Method | Endpoint             | Access    | Description              |
|--------|----------------------|-----------|--------------------------|
| GET    | `/api/profile/me`    | All Roles | Get my full profile      |
| PATCH  | `/api/profile/me`    | All Roles | Update profile photo etc |
| PATCH  | `/api/profile/me/info` | All Roles | Update name, phone etc |

---

### 4. Category Module

| Method | Endpoint               | Access           | Description         |
|--------|------------------------|------------------|---------------------|
| GET    | `/api/categories`      | Public           | Get all categories  |
| GET    | `/api/categories/:id`  | Public           | Get category by ID  |
| POST   | `/api/categories`      | `ADMIN`          | Create category     |
| PUT    | `/api/categories/:id`  | `ADMIN`          | Update category     |
| DELETE | `/api/categories/:id`  | `ADMIN`          | Delete category     |

---

### 5. Property Module

| Method | Endpoint                        | Access               | Description              |
|--------|---------------------------------|----------------------|--------------------------|
| GET    | `/api/properties`               | Public               | List all properties      |
| GET    | `/api/properties/:id`           | Public               | Get property details     |
| POST   | `/api/properties`               | `LANDLORD`, `ADMIN`  | Create property          |
| PUT    | `/api/properties/:id`           | `LANDLORD`, `ADMIN`  | Update property          |
| DELETE | `/api/properties/:id`           | `LANDLORD`, `ADMIN`  | Delete property          |
| PATCH  | `/api/properties/:id/availability` | `LANDLORD`, `ADMIN` | Toggle availability   |

**Query Filters (GET /api/properties):**
```
?location=Dhaka&minPrice=5000&maxPrice=30000&bedrooms=3&categoryId=uuid&amenities=WiFi,Gym
```

---

### 6. Rental Request Module

| Method | Endpoint                      | Access                    | Description                            |
|--------|-------------------------------|---------------------------|----------------------------------------|
| POST   | `/api/requests`               | `TENANT`, `ADMIN`         | Create a rental request                |
| GET    | `/api/requests`               | `TENANT`, `ADMIN`         | Get my rental requests                 |
| GET    | `/api/requests/:id`           | `TENANT`, `LANDLORD`, `ADMIN` | Get request by ID                |
| GET    | `/api/requests/landlord/all`  | `LANDLORD`, `ADMIN`       | Get all requests for landlord's properties |
| PATCH  | `/api/requests/landlord/:id`  | `LANDLORD`, `ADMIN`       | Approve / Reject a request             |
| GET    | `/api/requests/admin/all`     | `ADMIN`                   | Get all rental requests (admin)        |

**Create Request Body:**
```json
{
  "propertyId": "uuid"
}
```

**Update Status Body (LANDLORD/ADMIN):**
```json
{
  "status": "APPROVED"
}
```
> Status options: `PENDING` | `APPROVED` | `REJECTED` | `COMPLETED`

---

### 7. Payment Module

> ⚠️ Rental request must be `APPROVED` before creating a payment.

| Method | Endpoint                    | Access              | Description                      |
|--------|-----------------------------|---------------------|----------------------------------|
| POST   | `/api/payments/create`      | `TENANT`, `ADMIN`   | Create Stripe Checkout session   |
| POST   | `/api/payments/confirm`     | `TENANT`, `ADMIN`   | Manually confirm payment         |
| GET    | `/api/payments`             | `TENANT`, `ADMIN`   | Get payment history              |
| GET    | `/api/payments/:id`         | `TENANT`, `ADMIN`   | Get payment by ID                |
| POST   | `/api/payments/stripe/webhook` | Public (Stripe)  | Stripe webhook handler           |

**Create Payment Body:**
```json
{
  "rentalRequestId": "uuid"
}
```

**Confirm Payment Body:**
```json
{
  "transactionId": "cs_test_..."
}
```

**Payment Flow:**
```
TENANT → POST /payments/create → Get checkoutUrl
       → Complete payment on Stripe
       → Stripe sends webhook → status auto-updates to COMPLETED
       → (Optional) POST /payments/confirm → Manual confirmation
```

---

### 8. Reviews Module

> ⚠️ Tenant must have a **COMPLETED** payment for the property to submit a review.

| Method | Endpoint             | Access              | Description              |
|--------|----------------------|---------------------|--------------------------|
| POST   | `/api/reviews`       | `TENANT`, `ADMIN`   | Create a review          |
| GET    | `/api/reviews`       | Public              | Get reviews for property |
| PUT    | `/api/reviews/:id`   | `TENANT`, `ADMIN`   | Update a review          |
| DELETE | `/api/reviews/:id`   | `TENANT`, `ADMIN`   | Delete a review          |

**Create Review Body:**
```json
{
  "propertyId": "uuid",
  "rating": 5,
  "comment": "Amazing place to live!"
}
```

**Get Property Reviews:**
```
GET /api/reviews?propertyId=uuid
```

---

### 9. Admin Module

> 🔐 All `/api/admin/*` routes require `ADMIN` role.

| Method | Endpoint                  | Description                            |
|--------|---------------------------|----------------------------------------|
| GET    | `/api/admin/users`        | Get all users                          |
| PATCH  | `/api/admin/users/:id`    | Ban / Unban user (auto-toggle)         |
| DELETE | `/api/admin/users/:id`    | Delete a user                          |
| GET    | `/api/admin/properties`   | Get all properties                     |
| GET    | `/api/admin/rentals`      | Get all rental requests                |

**Ban/Unban User:**
- Send `PATCH /api/admin/users/:id` with **no body** → auto-toggles ACTIVE ↔ BLOCKED
- Or send `{ "status": "BLOCKED" }` to set explicitly

---

## 💳 Stripe Webhook Setup (Local Dev)

Use **ngrok** to expose your local server to Stripe:

```bash
ngrok http 5000
```

Add the generated ngrok URL as the webhook endpoint in your [Stripe Dashboard](https://dashboard.stripe.com/test/webhooks):

```
https://<ngrok-id>.ngrok.io/api/payments/stripe/webhook
```

**Webhook Events to listen to:**
- `checkout.session.completed`
- `checkout.session.expired`

---

## 🗃️ Database Schema Overview

```
User ──────┬── Profile
           ├── Property (as LANDLORD)
           ├── RentalRequest (as TENANT)
           └── Review (as TENANT)

Property ──┬── Category
           ├── RentalRequest
           └── Review

RentalRequest ── Payment (1-to-1)
```

---

## 📌 Status Enums

**RequestStatus:** `PENDING` → `APPROVED` / `REJECTED` → `COMPLETED`

**PaymentStatus:** `PENDING` → `COMPLETED` / `FAILED`

**ActiveStatus (User):** `ACTIVE` | `BLOCKED`

**Role:** `TENANT` | `LANDLORD` | `ADMIN`

---

## 🧪 Testing with Postman

Import `Assignment 4.postman_collection.json` into Postman for pre-configured API requests.

---

## 👨‍💻 Author

**Mohammad Rasif**  
Full-Stack Developer | Node.js · TypeScript · Prisma · React
