# Novarride Frontend

A modern React (Vite) frontend for Novarride, a ride-sharing/booking platform. It provides a responsive user interface for browsing cars, booking rides, managing user accounts, and interacting with services offered by the platform.

## Table of Contents
- Overview
- Key Features
- Tech Stack
- Project Structure
- Getting Started
- Available Scripts
- Environment Variables
- Routing Overview
- State Management
- UI/UX Notes
- Folder Details
- Contributing
- License

## Overview
The frontend consumes backend APIs to present a seamless booking experience. Users can register, log in, browse available cars, filter by type, view services, and manage their profiles. The app is built with React, bundled with Vite for fast development, and organized into reusable components and contexts.

## Key Features
- Responsive UI built with React and CSS
- Authentication pages: Register and Authorization (Login)
- Browse cars with types and details (Cars, Car, CarType components)
- Services listing and service details pages
- Profile page for user-related info
- Context-driven state management (Cars, Services, User)
- LocalStorage helpers for persistence
- Graceful loading states (FallBack/Loading)

## Tech Stack
- React + Vite
- React Router
- Context API for state management
- CSS modules and global CSS (App.css, index.css)

## Project Structure
```
client/
  public/
  src/
    assets/                # Images and illustrations
    components/            # Reusable UI components
      FallBack/Loading.jsx
      Car.jsx
      CarType.jsx
      Footer.jsx
      Map.jsx
      Media.jsx
      Nav.jsx
      Service.jsx
    context/               # Context providers
      CarContext.jsx
      ServiceContext.jsx
      UserContext.jsx
    pages/                 # Route-level pages
      About.jsx
      Authorization.jsx
      Car.jsx
      Cars.jsx
      Contact.jsx
      Home.jsx
      profile.jsx
      Register.jsx
      ServicePage.jsx
    utils/
      LocalStorage.js      # Persistence helpers
    App.css
    App.jsx                # Routes and shell
    index.css
    main.jsx               # App bootstrap
  index.html
  package.json
  vite.config.js
  README.md
```

## Getting Started

Prerequisites:
- Node.js 18+
- npm or yarn

Install dependencies:
```
npm install
```

Start development server:
```
npm run dev
```
This starts Vite on a local port (e.g., http://localhost:5173).

Build for production:
```
npm run build
```

Preview production build locally:
```
npm run preview
```

## Available Scripts
- dev: start Vite dev server
- build: build production assets
- preview: preview production build
- lint (if configured): run linting

Refer to package.json for the exact script names.

## Environment Variables
Create a `.env` file in the client root if needed. Common variables:
- VITE_API_BASE_URL: Base URL for the backend API (e.g., http://localhost:5000/api)

Example `.env`:
```
VITE_API_BASE_URL=http://localhost:5000/api
```

## Routing Overview
Typical routes as inferred from pages:
- /           → Home
- /about      → About
- /contact    → Contact
- /cars       → Cars listing
- /cars/:id   → Car details
- /services   → Services listing
- /auth       → Authorization/Login
- /register   → Register
- /profile    → User profile

Note: Check `App.jsx` for the definitive set of routes.

## State Management
The app uses React Contexts to manage core slices of state:
- UserContext: authentication state, current user, tokens
- CarContext: available cars, selected car, filtering
- ServiceContext: available services, service details

LocalStorage.js is used to persist tokens or user preferences between sessions.

## UI/UX Notes
- Navigation via components/Nav.jsx
- Footer, Media, and Map components enhance the layout and content
- Loading.jsx gives a smooth experience during async calls
- Global styles in index.css and App.css

## Folder Details
- components/Car.jsx, CarType.jsx, Service.jsx: Present car/service items
- pages/Cars.jsx, pages/Car.jsx: List and detail pages for cars
- pages/Authorization.jsx, pages/Register.jsx: Auth pages
- pages/ServicePage.jsx: Service details view
- pages/profile.jsx: User profile dashboard

## Contributing
- Follow consistent code style and naming conventions
- Keep components small and reusable
- Co-locate related tests and stories if you add them
- Document new environment variables and routes

## License
This project is proprietary to Novarride unless otherwise stated in the root LICENSE file.
