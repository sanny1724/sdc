# Quick Setup Guide

## Step 1: Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/lifecode
FRONTEND_URL=http://localhost:3000
```

Start the backend:
```bash
npm start
```

## Step 2: Frontend Setup

Open a new terminal:
```bash
cd frontend
npm install
```

Start the frontend:
```bash
npm run dev
```

## Step 3: Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Important Notes

1. Make sure MongoDB is running locally, or update `MONGODB_URI` in `.env` to use MongoDB Atlas
2. The backend must be running before using the frontend
3. After registration, save your user ID to access the dashboard

