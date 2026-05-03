🚀 Labour Hub – MERN Job Portal Application

📌 Project Overview

Labour Hub is a full-stack MERN application that connects employers with skilled workers. Employers can send job requests, and workers can accept or reject them.

The system tracks worker behavior and automatically triggers reminders, warnings, and blocking actions for inactive users.

It also includes a powerful Admin Dashboard for managing users, monitoring activity, sending WhatsApp notifications, and exporting reports.

---

🎯 Core Features

👨‍💼 Employer

- Send job requests
- Track worker responses
- Manage hiring workflow

👷 Worker

- Accept / Reject job requests
- View assigned jobs

🛡️ Admin (Main Highlight)

- Manage all users
- Dashboard analytics
- Send Reminder / Warning
- Block inactive users
- Export reports (CSV / PDF)
- WhatsApp Notification system

---

⚙️ Automation Logic (Key Highlight)

Ignored Jobs| System Action
1| Missed Job
2| Reminder
3| Warning
4+| Block User

---

🛠️ Tech Stack

Frontend

- React.js
- Tailwind CSS
- Axios

Backend

- Node.js
- Express.js

Database

- MongoDB

Tools

- JWT Authentication
- REST APIs
- Postman
- WhatsApp Cloud API

---

🔐 Authentication

- JWT-based authentication
- Protected routes
- Middleware-based security

---

📊 Admin Dashboard Includes

- Total Users
- Active Workers
- Pending Requests
- Blocked Users
- Employer & Labour count

---

📁 Project Structure

labour_hub/
├── frontend/
├── backend/
├── README.md
└── .gitignore

---


🏠 Dashboard

"Dashboard"-  <img width="1763" height="1358" alt="Screenshot_25-4-2026_135515_localhost" src="https://github.com/user-attachments/assets/a2bf511f-5a7d-4b23-bdae-5aa17c34a390" />


👥 User Management

"Users"-  <img width="1763" height="1746" alt="Screenshot_25-4-2026_135718_localhost" src="https://github.com/user-attachments/assets/e63a3a2d-3dc2-4785-a731-97d29d4948fb" />


⚠️ Reminder System

"Reminder"-  <img width="1763" height="805" alt="Screenshot_25-4-2026_135728_localhost" src="https://github.com/user-attachments/assets/39de3cb1-e457-44c5-b86e-ea38d8c5f5fb" />

🔌 API Endpoints (Sample)

Auth

- "POST /admin/login"
- "POST /admin/google-login"

Users

- "GET /admin/all-users"
- "GET /admin/user/:id"
- "PUT /admin/all-users/:id/status"

Automation

- "POST /admin/send-reminder-bulk"
- "POST /admin/send-warning-bulk"
- "PUT /admin/block-all-inactive"

---

⚡ Installation

Clone Repo

git clone https://github.com/ashutoshnath100-png/Labour_hub_Job-Portal-Application.git
cd Labour_hub_Job-Portal-Application

Backend

cd backend
npm install
npm start

Frontend

cd frontend
npm install
npm run dev

---

🔑 Environment Variables

Create ".env" in backend:

PORT=4000
MONGO_URI=your_mongodb_url
SECRET_KEY=your_secret
WHATSAPP_TOKEN=your_token

---

🚀 Deployment

Layer| Platform
Frontend| Vercel
Backend| Render
Database| MongoDB

---

📈 Future Improvements

- IVR Integration
- Real-time notifications (Socket.io)
- Payment system
- Worker rating system
- Mobile app

---

👨‍💻 My Contribution

- Built Admin Panel (Frontend + Backend)
- Developed REST APIs
- Implemented JWT authentication
- Created automation system (Reminder/Warning/Block)
- Integrated WhatsApp API
- Designed UI using Tailwind CSS

---

📬 Contact

Ashutosh Nath
GitHub: https://github.com/ashutoshnath100-png

---

⭐ Final Note

This project demonstrates real-world full-stack development using MERN with automation logic and admin control system.
