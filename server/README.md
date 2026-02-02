# Novarride Backend

An Express.js backend API for Novarride, a ride-sharing/booking platform. It exposes authentication, user, car, and service-related endpoints. It also handles validation, error handling, and integrates with a data layer (MongoDB or similar based on the models present).

## Table of Contents
- Overview
- Key Features
- Tech Stack
- Project Structure
- Getting Started
- Available Scripts
- Environment Variables
- API Overview
- Error Handling
- Middleware
- Models
- Contributing
- License

## Overview
The backend provides RESTful endpoints consumed by the frontend. It supports user registration/login, protected routes via auth middleware, and CRUD endpoints around cars and related resources.

## Key Features
- JWT-based authentication and authorization
- User registration and login
- Car listing and details endpoints
- Structured error handling using custom AppError and catchAsync utilities
- Organized routers and controllers
- Email utility scaffold (for notifications or verification)

## Tech Stack
- Node.js + Express
- MongoDB with Mongoose models (user.model.js, car.model.js)
- JSON Web Tokens (JWT)
- Nodemailer (via utils/email.js) or similar for email

## Project Structure
```
server/
  controllers/
    auth.controller.js
    car.controller.js
    error.controller.js
    User.controller.js
  data/
    carsApi.js
  middleware/
    auth.middleware.js
  models/
    car.model.js
    user.model.js
  routers/
    auth.router.js
    car.router.js
    user.router.js
  utils/
    AppError.js
    catchAsync.js
    email.js
  app.js
  package.json
  README.md
```

## Getting Started

Prerequisites:
- Node.js 18+
- MongoDB instance (local or hosted)

Install dependencies:
```
npm install
```

Start development server (with nodemon if configured):
```
npm run dev
```

Start production server:
```
npm start
```

## Available Scripts
- start: run the server
- dev: run in development mode with auto-restart
- lint/test (if configured): quality checks

Refer to server/package.json for the exact script names.

## Environment Variables
Create a `.env` in the server root. Common variables:
- PORT=5000
- NODE_ENV=development
- DATABASE_URI=mongodb://localhost:27017/novarride
- JWT_SECRET=your-strong-secret
- JWT_EXPIRES_IN=7d
- EMAIL_FROM=notifications@novarride.com
- EMAIL_HOST=smtp.example.com
- EMAIL_PORT=587
- EMAIL_USER=your-smtp-user
- EMAIL_PASS=your-smtp-pass

Example `.env`:
```
PORT=5000
NODE_ENV=development
DATABASE_URI=mongodb://localhost:27017/novarride
JWT_SECRET=supersecret
JWT_EXPIRES_IN=7d
EMAIL_FROM=no-reply@novarride.com
EMAIL_HOST=smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USER=your_user
EMAIL_PASS=your_pass
```

## API Overview

Note: Inspect the routers under `routers/` for the authoritative routes. The following endpoints are inferred from the structure:

### Auth
- POST /api/auth/register — Create a new user
- POST /api/auth/login — Authenticate and receive a JWT
- GET  /api/auth/me — Get current user (requires Authorization: Bearer <token>)

### Users
- GET    /api/users — List users (admin/protected)
- GET    /api/users/:id — Get user details
- PATCH  /api/users/:id — Update a user (self/admin)
- DELETE /api/users/:id — Remove a user (admin)

### Cars
- GET    /api/cars — List all cars (with optional filtering)
- GET    /api/cars/:id — Get a car by ID
- POST   /api/cars — Create a car (protected)
- PATCH  /api/cars/:id — Update a car (protected)
- DELETE /api/cars/:id — Delete a car (protected)

### Services (if implemented)
- GET    /api/services — List services
- GET    /api/services/:id — Service details

Refer to the specific controllers for payloads and responses. Common response structure uses JSON with message and data fields.

## Error Handling
Centralized error handling uses:
- utils/AppError.js — custom error class with status codes
- utils/catchAsync.js — wraps async controller functions
- controllers/error.controller.js — formats and sends error responses

Errors are returned as JSON with HTTP status codes and helpful messages.

## Middleware
- middleware/auth.middleware.js — Verifies JWT tokens, attaches user to request, protects routes
- Additional middleware in app.js — CORS, JSON parsing, logging (depending on configuration)

## Models
- models/user.model.js — User schema (name, email, password hash, roles, etc.)
- models/car.model.js — Car schema (type, make, model, price, availability, etc.)

## Contributing
- Keep controllers small; business logic in services if added
- Validate payloads and sanitize inputs
- Document new endpoints and environment variables
- Maintain consistent error shapes and HTTP codes

## License
This project is proprietary to Novarride unless otherwise stated in the root LICENSE file.
