🚀 Labour Hub – MERN Job Portal Application

📌 Project Overview

Labour Hub is a full-stack MERN application that connects employers with skilled workers. Employers can send job requests, and workers can accept or reject them.

The system tracks worker behavior and automatically triggers reminders, warnings, and blocking actions for inactive users.

It also includes a powerful Admin Dashboard for managing users, monitoring activity, sending WhatsApp notifications, and exporting reports.

🎯 Core Features

👨‍💼 Employer

Send job requests
Track worker responses
Manage hiring workflow
👷 Worker

Accept / Reject job requests
View assigned jobs
🛡️ Admin (Main Highlight)

Manage all users
Dashboard analytics
Send Reminder / Warning
Block inactive users
Export reports (CSV / PDF)
WhatsApp Notification system
⚙️ Smart Automation System Ignored Jobs Action 1 📌 Missed Job 2 🔔 Reminder 3 ⚠️ Warning 4+ 🚫 Block User 👉 Built using MongoDB aggregation + backend logic

🛠️ Tech Stack

Frontend

React.js
Tailwind CSS
Axios
Backend

Node.js
Express.js
Database

MongoDB
Tools

JWT Authentication
REST APIs
Postman
WhatsApp Cloud API
🔐 Authentication

JWT-based authentication
Protected routes
Middleware-based security
📊 Admin Dashboard Includes

Total Users
Active Workers
Pending Requests
Blocked Users
Employer & Labour count

📁 Project Structure

labour_hub/
├── frontend/
├── backend/
├── screenshots/
├── README.md
└── .gitignore

🏠 Dashboard

"Dashboard" (./screenshots/dashboard.png)Screenshot_25-4-2026_135515_localhost

👥 User Management

"Users" (./screenshots/users.png)Screenshot_25-4-2026_135718_localhost

⚠️ Reminder System

"Reminder" (./screenshots/reminder.png)Screenshot_25-4-2026_135728_localhost

🔌 API Endpoints (Sample)

Auth

"POST /admin/login"
"POST /admin/google-login"
Users

"GET /admin/all-users"
"GET /admin/user/:id"
"PUT /admin/all-users/:id/status"
Automation

"POST /admin/send-reminder-bulk"
"POST /admin/send-warning-bulk"
"PUT /admin/block-all-inactive"
⚡ Installation

Clone Repo

git clone https://github.com/ashutoshnath100-png/Labour_hub_Job-Portal-Application.git cd Labour_hub_Job-Portal-Application

Backend

cd backend npm install npm start/nodemon server.js

Frontend

cd frontend npm install npm run dev

🔑 Environment Variables

Create ".env" in backend:

PORT=4000 MONGO_URI=your_mongodb_url SECRET_KEY=your_secret WHATSAPP_TOKEN=your_token

🚀 Deployment

Layer| Platform Frontend| Vercel Backend| Render Database| MongoDB

📈 Future Improvements

IVR Integration
Real-time notifications (Socket.io)
Payment system
Worker rating system
Mobile app
👨‍💻 My Contribution

Built Admin Panel (Frontend + Backend)
Developed REST APIs
Implemented JWT authentication
Created automation system (Reminder/Warning/Block)
Integrated WhatsApp API
Designed UI using Tailwind CSS
📬 Contact

Ashutosh Nath GitHub: https://github.com/ashutoshnath100-png

⭐ Final Note

This project demonstrates real-world full-stack development using MERN with automation logic and admin control system.

Last Updated: April 2026
Labour_hub_Job-Portal-Application
MERN stack job portal connecting employers with workers, featuring real-time hiring, admin dashboard, and automated reminder & warning system.

