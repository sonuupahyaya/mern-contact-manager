# 📇 ContactHub - Professional Contact Management System

A production-ready MERN Stack Contact Management Application built for technical interviews. This project demonstrates real-world software engineering practices including RESTful APIs, MongoDB integration, form validation, and modern React patterns.

![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)
![License](https://img.shields.io/badge/License-MIT-blue)
![Node](https://img.shields.io/badge/Node-18+-brightgreen)

## 🚀 Live Demo

- **Frontend**: [https://contacthub-app.vercel.app](https://contacthub-app.vercel.app)
- **Backend API**: [https://contacthub-api.onrender.com](https://contacthub-api.onrender.com)

## ✨ Features

### Core Features
- ✅ Create, Read, Delete contacts (Full CRUD)
- ✅ Real-time form validation with error messages
- ✅ MongoDB Atlas integration with Mongoose ODM
- ✅ RESTful API with Express.js
- ✅ Responsive mobile-first design

### Bonus Features
- 🔍 Search contacts by name, email, or phone
- 📊 Sort by newest/oldest/name
- 🗑️ Delete contacts with confirmation
- 🔔 Toast notifications for all actions
- ⏳ Loading skeletons for better UX
- ❌ Comprehensive error handling
- 📱 Fully responsive design

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, Vite, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| Styling | Custom CSS (no frameworks) |
| Notifications | react-hot-toast |
| Validation | express-validator |

## 📁 Project Structure

```
contact/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API service layer
│   │   ├── App.jsx         # Main app component
│   │   └── index.css       # Global styles
│   ├── package.json
│   └── vite.config.js
│
├── server/                 # Express Backend
│   ├── config/
│   │   └── db.js          # MongoDB connection
│   ├── controllers/
│   │   └── contactController.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── models/
│   │   └── Contact.js     # Mongoose schema
│   ├── routes/
│   │   └── contactRoutes.js
│   ├── server.js          # Express app entry
│   └── package.json
│
└── README.md
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/contacts` | Get all contacts (supports search & sort) |
| POST | `/api/contacts` | Create a new contact |
| DELETE | `/api/contacts/:id` | Delete a contact by ID |
| GET | `/api/health` | Health check endpoint |

### Query Parameters (GET /api/contacts)

| Parameter | Type | Description |
|-----------|------|-------------|
| search | string | Search by name, email, or phone |
| sortBy | string | Field to sort by (default: createdAt) |
| order | string | Sort order: asc or desc (default: desc) |

### Request Body (POST /api/contacts)

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1 555-123-4567",
  "message": "Optional message"
}
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/contact-management.git
cd contact-management
```

### 2. Setup Backend

```bash
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your MongoDB URI
# MONGODB_URI=your_mongodb_connection_string

# Start development server
npm run dev
```

Server runs on `http://localhost:5000`

### 3. Setup Frontend

```bash
cd client

# Install dependencies
npm install

# Create .env file (optional - defaults to localhost:5000)
cp .env.example .env

# Start development server
npm run dev
```

Client runs on `http://localhost:3000`

## 🌍 Deployment Guide

### Deploy Backend to Render

1. Create a new **Web Service** on [Render](https://render.com)
2. Connect your GitHub repository
3. Configure:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `NODE_ENV`: `production`
5. Deploy!

### Deploy Frontend to Vercel

1. Create a new project on [Vercel](https://vercel.com)
2. Connect your GitHub repository
3. Configure:
   - **Root Directory**: `client`
   - **Framework Preset**: Vite
4. Add environment variable:
   - `VITE_API_URL`: Your Render backend URL (e.g., `https://your-api.onrender.com/api`)
5. Deploy!

### MongoDB Atlas Setup

1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a database user with password
3. Whitelist IP addresses (use `0.0.0.0/0` for all IPs)
4. Get your connection string and add to `.env`

## 🧪 Testing

### Test API with Postman

Import the Postman collection from `postman/ContactHub.postman_collection.json`

### Manual API Testing

```bash
# Health Check
curl http://localhost:5000/api/health

# Get all contacts
curl http://localhost:5000/api/contacts

# Create contact
curl -X POST http://localhost:5000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","phone":"+1234567890"}'

# Search contacts
curl "http://localhost:5000/api/contacts?search=john"

# Delete contact
curl -X DELETE http://localhost:5000/api/contacts/CONTACT_ID
```

## 📋 MongoDB Schema

```javascript
{
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    match: /email-regex/
  },
  phone: {
    type: String,
    required: true,
    match: /phone-regex/
  },
  message: {
    type: String,
    maxlength: 1000,
    default: ''
  },
  createdAt: {
    type: Date,
    auto: true
  },
  updatedAt: {
    type: Date,
    auto: true
  }
}
```

## 🔒 Security Features

- Input validation on both frontend and backend
- MongoDB injection prevention via Mongoose
- CORS configuration for production
- Environment variables for sensitive data
- Request body size limiting

## 📝 Scripts

### Backend
```bash
npm start      # Start production server
npm run dev    # Start development server with nodemon
```

### Frontend
```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run preview # Preview production build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Sonu Upadhyay**

- GitHub: [@sonuupadhyay](https://github.com/sonuupadhyay)
- LinkedIn: [Sonu Upadhyay](https://linkedin.com/in/sonuupadhyay)

---

⭐ Star this repository if you found it helpful!
