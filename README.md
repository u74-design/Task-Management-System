# TaskList MERN Application

A full-stack Task Management application built using the MERN stack.
Users can sign up, log in, add tasks, view tasks, and delete tasks.

## Tech Stack
Frontend: React, Vite, Tailwind CSS, Axios  
Backend: Node.js, Express.js  
Database: MongoDB Atlas  
Auth: Express Session, bcryptjs  

## Features
- User Authentication (Signup / Login / Logout)
- Session-based Authentication
- Add, View, Delete Tasks
- Secure password hashing
- MongoDB Atlas cloud database
- Environment variables for security

## Project Structure
```
Judix Assignment/
├── Backend/
├── judix/
└── README.md
```

## Environment Variables
Create a `.env` file inside the backend folder:
```
PORT=3001
MONGO_URI=your_mongodb_atlas_url
SESSION_SECRET=your_secret_key
```
Do not push `.env` to GitHub.

## Setup
Backend:
```
cd backend
npm install
npm start
```

Frontend:
```
cd judix
npm install
npm run dev
```

## Deployment
Frontend: Vercel / Netlify  
Backend: Render / Railway  
Database: MongoDB Atlas  

## Author
Umesh Dilip Jhurke – Full Stack Software Developer | MERN | JavaScript Proficient
