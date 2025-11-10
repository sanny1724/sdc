# Life Code – Emergency QR Identification System

A complete MERN stack application that allows users to register their emergency information and generate a QR code. When scanned, the QR code opens a public web page displaying critical information like blood group, emergency contacts, and allergies.

## 🎯 Features

### Backend
- ✅ User registration with emergency information
- ✅ Get emergency profile by ID (public access)
- ✅ Update user data
- ✅ Delete user profile
- ✅ Generate QR code linked to user profile
- ✅ MongoDB database with Mongoose
- ✅ RESTful API with Express.js
- ✅ CORS enabled for frontend communication

### Frontend
- ✅ Beautiful, responsive UI with Tailwind CSS
- ✅ Home page with project introduction
- ✅ Registration form with all required fields
- ✅ QR code generation and download
- ✅ Dashboard for viewing and editing profile
- ✅ Public emergency profile page (accessible via QR scan)
- ✅ About page with project information
- ✅ React Router for navigation
- ✅ Axios for API calls

## 📦 Project Structure

```
lifecode/
├── backend/
│   ├── controllers/
│   │   ├── userController.js
│   │   └── qrController.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   └── qrRoutes.js
│   ├── utils/
│   │   └── qrGenerator.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── QRCard.jsx
│   │   │   └── ProfileCard.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ViewProfile.jsx
│   │   │   └── About.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
└── README.md
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables in `.env`:**
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/lifecode
   FRONTEND_URL=http://localhost:3000
   ```
   
   For MongoDB Atlas, use:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lifecode
   ```

5. **Start the backend server:**
   ```bash
   npm start
   ```
   
   For development with auto-reload:
   ```bash
   npm run dev
   ```

   The backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file (optional):**
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
   
   If not set, it defaults to `http://localhost:5000/api`

4. **Start the development server:**
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:3000`

## 📝 API Endpoints

### User Routes
- `POST /api/user/register` - Register a new user
- `GET /api/user/:id` - Get user by ID (public emergency profile)
- `PUT /api/user/:id` - Update user data
- `DELETE /api/user/:id` - Delete user

### QR Routes
- `GET /api/qr/:id` - Generate QR code for user profile

### Health Check
- `GET /api/health` - Check API status

## 🎨 Usage

1. **Register a User:**
   - Navigate to `/register`
   - Fill in all required fields (name, age, blood group, emergency contact)
   - Submit the form
   - Your QR code will be generated automatically

2. **Download QR Code:**
   - After registration, click "Download QR Code"
   - Save the QR code image
   - Print it or save it on your phone

3. **Manage Profile:**
   - Go to `/dashboard/:id` (ID is shown after registration)
   - View your profile information
   - Edit your details
   - Delete your profile if needed

4. **View Public Profile:**
   - Scan the QR code with any QR scanner
   - Or visit `/profile/:id` directly
   - See the emergency information page

## 🌐 Deployment

### Frontend (Vercel)

1. **Build the frontend:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Vercel:**
   - Push code to GitHub
   - Import project in Vercel
   - Set environment variable: `VITE_API_URL=https://your-backend-url.com/api`
   - Deploy

### Backend (Render)

1. **Prepare for deployment:**
   - Ensure `.env` file has production MongoDB URI
   - Update `FRONTEND_URL` to your Vercel frontend URL

2. **Deploy to Render:**
   - Create a new Web Service
   - Connect your GitHub repository
   - Set build command: `npm install`
   - Set start command: `npm start`
   - Add environment variables:
     - `PORT` (auto-assigned by Render)
     - `MONGODB_URI` (your MongoDB connection string)
     - `FRONTEND_URL` (your Vercel frontend URL)
   - Deploy

## 🛠️ Technologies Used

- **Frontend:**
  - React 18
  - React Router DOM
  - Tailwind CSS
  - Axios
  - Vite

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
  - QRCode (qrcode package)
  - CORS
  - dotenv

## 📄 License

This project is open source and available for educational purposes.

## 👤 Developer

Built as a MERN stack project for emergency identification and medical information access.

---

**Note:** This is a demonstration project. For production use, consider adding authentication, encryption, and additional security measures.

