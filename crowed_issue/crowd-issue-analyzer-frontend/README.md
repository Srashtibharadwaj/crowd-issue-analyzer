This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
=======
# Crowd Issue Analyzer Frontend

A React application built with Vite for managing crowd-sourced issues with AI-powered analysis.

## Features

- Firebase Authentication with Google Sign-in
- Role-based access control (User/Admin)
- Issue upload and management
- Heat map visualization
- Responsive design with Tailwind CSS

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase project

### Firebase Setup

1. **Create a Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or use an existing one

2. **Enable Authentication**
   - Go to Authentication > Sign-in method
   - Enable Google as a sign-in provider

3. **Enable Firestore Database**
   - Go to Firestore Database
   - Create a database in production mode

4. **Get Firebase Configuration**
   - Go to Project Settings > General
   - Scroll down to "Your apps" section
   - Copy the Firebase config object

5. **Environment Variables**
   - Update the `.env` file with your Firebase config:
   ```
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   ```

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Firebase** - Authentication and database
- **React Router** - Client-side routing

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── PrivateRoute.jsx # Route protection
│   ├── AdminRoute.jsx   # Admin-only routes
│   ├── Navbar.jsx       # Navigation
│   ├── HeatMap.jsx      # Data visualization
│   └── IssueUpload.jsx  # File upload component
├── pages/               # Page components
│   ├── Login.jsx        # Authentication
│   ├── Home.jsx         # Dashboard home
│   ├── Dashboard.jsx    # User dashboard
│   └── AdminDashboard.jsx # Admin panel
├── context/             # React context providers
│   └── AuthContext.jsx  # Authentication state
├── services/            # API and Firebase services
│   ├── api.js           # Backend API calls
│   └── firebase.js      # Firebase configuration
└── main.jsx             # App entry point
```
