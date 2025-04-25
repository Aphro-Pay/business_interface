# AphroPay - Bookings and Payments Management Service

A modern web application built with React and Ionic for managing business appointments and bookings. This application provides a seamless interface for businesses to handle their daily operations, client bookings, and service management.

## Project Overview

This application serves as a business management platform with the following key features:

- User authentication and authorization
- Appointment scheduling and management
- Service catalog management
- Staff management
- Real-time booking updates
- Business metrics and analytics

## Architecture

The application is built using:

- **Frontend**: React with Ionic Framework for cross-platform compatibility
- **State Management**: React Context API for global state management
- **Authentication**: Firebase Authentication
- **Database**: Firebase Firestore for real-time data storage
- **Styling**: CSS Modules for component-specific styles

### Key Components

1. **Authentication System**

   - Secure login/signup flow
   - Role-based access control
   - Session management

2. **Booking Management**

   - Real-time appointment tracking
   - Service-based booking system
   - Staff assignment
   - Calendar integration

3. **Business Dashboard**

   - Daily appointment overview
   - Business metrics and analytics
   - Service management
   - Staff management

4. **Client Interface**
   - Booking link generation
   - Service selection
   - Appointment scheduling
   - Client information management

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account

### Installation

1. Clone the repository

```bash
git clone [repository-url]
```

2. Install dependencies

```bash
npm install
```

3. Set up Firebase configuration

   - Create a Firebase project
   - Add your Firebase configuration to `src/firebase.js`

4. Start the development server

```bash
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Available Scripts

### `npm start`

Runs the app in development mode.

### `npm run build`

Builds the app for production.

### `npm test`

Launches the test runner.

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
