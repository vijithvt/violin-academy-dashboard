
# Violin Class Management Dashboard

A comprehensive web application for managing violin students at a music academy.

## Features

- 🔐 **Admin Authentication**: Secure login system using Firebase Authentication
- 📝 **Student Admission Form**: Collect and store detailed student information
- 🖼️ **Photo Upload**: Upload and store student photos in Firebase Storage
- 📊 **Dashboard**: View all students with details and information
- 🔒 **Protected Routes**: Secure admin-only access to sensitive areas

## Technologies Used

- React with TypeScript
- Tailwind CSS for styling
- Firebase (Authentication, Firestore, Storage)
- React Router for navigation
- React Hook Form with Zod for form validation
- Shadcn UI components

## Setup Instructions

### 1. Firebase Setup

1. Create a new Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Authentication with Email/Password method
3. Create a Firestore database
4. Enable Firebase Storage
5. Get your Firebase configuration and replace the placeholder in `src/lib/firebase.ts`:

```typescript
// Replace with your actual Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 2. Create an Admin User

1. Use Firebase Authentication to create an admin user with email and password
2. Use these credentials to log in to the dashboard

### 3. Usage

- `/admin-login` - Login page for administrators
- `/dashboard` - View all students and access admin functions
- `/admission` - Register new students with the admission form

## Future Enhancements

- Student Progress Tracking
- Attendance Logging
- Fee Management with reminders
- Student login to view their progress
- Export data to CSV

## Project Structure

- `/components` - Reusable UI components
- `/context` - Authentication context for state management
- `/lib` - Firebase configuration and utilities
- `/pages` - Main application pages
