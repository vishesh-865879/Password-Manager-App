# 🔐 Password Manager App

A full-stack Password Manager web application built with the MERN stack (MongoDB, Express, React, Node.js). This app allows users to securely store, organize, and manage passwords across different categories.

## 🌐 Live Demo

🔗 [https://password-manager-app-production.up.railway.app](https://password-manager-app-production.up.railway.app)

## 📁 GitHub Repository

🔗 [https://github.com/vishesh-865879/Password-Manager-App](https://github.com/vishesh-865879/Password-Manager-App)

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React, Vite, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Deployment | Railway |

---

## ✨ Features

- Add, edit, and delete passwords
- Organize passwords by type/category
- Search passwords quickly
- Soft delete with restore functionality
- Permanently delete passwords
- Clean and responsive UI

---

## 📂 Project Structure

```
Password App/
├── backend/
│   ├── controllers/
│   │   └── passwordController.js
│   ├── models/
│   │   └── passwordModel.js
│   ├── routes/
│   │   └── passwordRoutes.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── passwords.js
│   │   ├── components/
│   │   │   ├── EditForm.jsx
│   │   │   ├── PasswordForm.jsx
│   │   │   ├── PasswordList.jsx
│   │   │   └── SearchBar.jsx
│   │   ├── pages/
│   │   │   ├── AddEditPassword.jsx
│   │   │   ├── AllPasswords.jsx
│   │   │   ├── Codes.jsx
│   │   │   ├── Deleted.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Passkeys.jsx
│   │   │   ├── Security.jsx
│   │   │   └── WiFi.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── package.json
```

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js installed
- MongoDB Atlas account

### 1. Clone the repository
```bash
git clone https://github.com/vishesh-865879/Password-Manager-App.git
cd Password-Manager-App
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:
```
PORT=3000
MONGO_URI=your_mongodb_connection_string
```

### 3. Setup Frontend
```bash
cd ../frontend
npm install
```

### 4. Run the App

Start the backend:
```bash
cd backend
node server.js
```

Start the frontend (in a new terminal):
```bash
cd frontend
npm run dev
```

The app will be running at `http://localhost:5173`

---

## 🌍 Deployment

This app is deployed on **Railway** with the following setup:

- **Build Command:** `npm run build`
- **Start Command:** `npm start`
- **Environment Variables:** `MONGO_URI`, `NODE_ENV=production`

---

## 👨‍💻 Developer

Made by **Vishesh Kumar**
