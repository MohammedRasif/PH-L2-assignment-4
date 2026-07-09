# Development Notes: API Implementation

This document provides a detailed explanation of the logic and implementation details for the recently added API endpoints.

## 1. Rental Request Module
**Files Modified:** `rentalRequest.controller.ts`, `rentalRequest.service.ts`

- **Create Rental Request (`POST /api/requests`):** 
  - Validates that the property exists and is available (`isAvailable: true`).
  - Checks if the tenant already has a `PENDING` request for this property to prevent spam/duplicates.
  - Creates the request with a default status of `PENDING`.

- **Get Landlord Requests (`GET /api/requests/landlord/all`):**
  - Fetches all rental requests where the `property.ownerId` matches the logged-in landlord's ID.
  - This ensures landlords can only see requests made for their own properties.

- **Approve/Reject Request (`PATCH /api/requests/landlord/:id`):**
  - Validates that the request belongs to a property owned by the logged-in landlord.
  - Updates the `status` to `APPROVED` or `REJECTED`. 

## 2. Review Module
**Files Modified:** `review.controller.ts`, `review.service.ts`

- **Create Review (`POST /api/reviews`):**
  - Uses a strict validation: Before allowing a tenant to create a review, it checks the database to ensure the tenant has an `APPROVED` rental request for that specific property.
  - If they haven't rented it, it throws an error: `"You can only review properties you have rented"`.

- **Update/Delete Review (`PUT`, `DELETE /api/reviews/:id`):**
  - Checks that the user trying to modify the review is the original author (`tenantId`).
  - For deletion, it also allows `ADMIN` users to delete any review (for moderation purposes).

## 3. Admin Module
**Files Created:** `admin.route.ts`, `admin.controller.ts`, `admin.service.ts`
**Files Modified:** `app.ts`

- **Architecture:** Created a dedicated `/api/admin` route prefix to group all admin functionalities.
- **User Management (`GET`, `PATCH`, `DELETE /api/admin/users`):**
  - `GET /api/admin/users` fetches all users across all roles (Tenant, Landlord, Admin) and excludes passwords for security.
  - `PATCH /api/admin/users/:id` allows changing the `ActiveStatus` to `BLOCKED` (banning a user) or `ACTIVE` (unbanning).
- **Properties & Rentals (`GET /api/admin/properties`, `GET /api/admin/rentals`):**
  - These endpoints fetch *all* properties and *all* rental requests in the system, bypassing ownership checks, allowing the Admin a full overview of platform activity.

## Summary of Data Flow
1. **Request -> Route:** The Express router intercepts the path (e.g. `/api/admin/users`).
2. **Middleware:** The `auth(Role.ADMIN)` middleware runs, verifies the JWT token, and attaches `req.user`. It rejects non-admins.
3. **Controller:** Extracts the payload (e.g. `req.body` or `req.params`) and passes it to the Service layer.
4. **Service:** Executes business logic and performs Prisma ORM calls to the PostgreSQL database.
5. **Response:** Returns the data back through the Controller via the standard `sendResponse` utility format.
