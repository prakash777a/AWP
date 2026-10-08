# Tour & Travels Appointment and Booking System

## Project Objective
A full-stack application to browse and book tour packages and destinations. Phase 1 focuses on setting up the project foundation.

## Technology Stack
- Frontend: React, Vite, React Router, Axios
- Backend: Java, Spring Boot, MySQL

## Setup & Running

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### MySQL Setup
Configure the database credentials in `backend/src/main/resources/application.properties`. Ensure the MySQL server is running locally.

## Phase 1 Scope
- Setting up project structure for React and Spring Boot.
- Basic frontend routing and placeholder components without backend integration or hardcoded business data.
- Foundational backend packages and test API.
- CORS configuration setup for React development server.

## Future Phases
- User authentication and authorization (JWT)
- Complex application logic for bookings, payments, and reviews
- Admin Dashboard

## API Documentation
Base URL: `/api`

### Users
- `POST /api/users` - Create user
- `GET /api/users` - Get all users
- `GET /api/users/{id}` - Get user by ID
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

### Destinations
- `POST /api/destinations` - Create destination
- `GET /api/destinations` - Get all destinations
- `GET /api/destinations/{id}` - Get destination by ID
- `PUT /api/destinations/{id}` - Update destination
- `DELETE /api/destinations/{id}` - Delete destination

### Packages
- `POST /api/packages` - Create package
- `GET /api/packages` - Get packages (supports `?destinationId`, `?available`, `?minPrice`, `?maxPrice`)
- `GET /api/packages/{id}` - Get package by ID
- `PUT /api/packages/{id}` - Update package
- `DELETE /api/packages/{id}` - Delete package
- `GET /api/destinations/{id}/packages` - Get packages by destination

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/{id}` - Get booking by ID
- `PUT /api/bookings/{id}` - Update booking
- `DELETE /api/bookings/{id}` - Delete booking
- `GET /api/users/{userId}/bookings` - Get bookings for user

### Payments
- `POST /api/payments` - Create payment
- `GET /api/payments/{id}` - Get payment by ID
- `GET /api/bookings/{bookingId}/payment` - Get payment for booking

### Reviews
- `POST /api/reviews` - Create review
- `GET /api/reviews/{id}` - Get review by ID
- `GET /api/packages/{packageId}/reviews` - Get reviews for package
- `PUT /api/reviews/{id}` - Update review
- `DELETE /api/reviews/{id}` - Delete review
