<<<<<<< HEAD
# 💼 Labour Hub - Worker Management Platform
**Developed & Maintained by:**

BrainTech Technology Pvt Ltd

**Copyright © 2026 BrainTech Technology Pvt Ltd. All Rights Reserved.**

</div>

A comprehensive web application for managing labor and worker resources efficiently. This platform connects employers with workers and provides advanced management features for administrators.

## 📋 Overview

Labour Hub is a full-featured worker management system built with modern web technologies. It facilitates the connection between employers seeking workers and workers looking for opportunities, with administrative oversight and user management capabilities.

## ✨ Key Features

### 🔐 Authentication & Authorization
- Secure user login system
- Role-based access control
- Protected routes for authenticated users
- Session management

### 👥 Worker Management
- Browse and search available workers
- View detailed worker profiles
- Worker registration and verification
- Similar worker recommendations

### 📊 Admin Dashboard
- Comprehensive dashboard with real-time statistics
- Active workers tracking
- Pending approvals management
- Recent registrations monitoring
- Platform status overview
- Employer management
- User management interface

### 🏢 User Management
- User profile management
- Role-based permissions
- User activity tracking
- Account status management

### 📱 Responsive UI
- Mobile-friendly design
- Clean and intuitive interface
- Statistics cards for quick insights
- Organized navigation

## 🛠️ Technology Stack

### Frontend Framework
- **React 19.2.0** - UI library
- **Vite 7.2.4** - Build tool and dev server
- **React Router DOM 7.12.0** - Client-side routing

### Styling
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **PostCSS 8.5.6** - CSS processing

### Development Tools
- **TypeScript** - Type-safe JavaScript
- **ESLint** - Code quality and consistency
- **Babel/SWC** - JavaScript transpilation

## 📁 Project Structure

```
labour_hub/
├── src/
│   ├── auth/                      # Authentication & authorization
│   │   ├── AuthContext.jsx       # Auth state management
│   │   └── RequireAuth.jsx       # Protected route component
│   ├── components/
│   │   ├── cards/                # Reusable card components
│   │   │   ├── StatCard.tsx      # Statistics display card
│   │   │   └── WorkerCard.tsx    # Worker profile card
│   │   └── common/               # Shared components
│   │       ├── Footer.tsx
│   │       └── Header.tsx
│   ├── data/
│   │   └── mockData.js           # Mock data for development
│   ├── layout/
│   │   ├── AdminLayout.jsx       # Admin page layout
│   │   └── Navbar.jsx            # Navigation component
│   ├── pages/
│   │   ├── Dashboard.tsx         # Main dashboard page
│   │   ├── FindLabour.tsx        # Worker search page
│   │   ├── auth/
│   │   │   └── Login.jsx         # Login page
│   │   ├── dashboard/            # Admin dashboard sub-pages
│   │   │   ├── ActiveWorkers.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Employers.jsx
│   │   │   ├── PendingApprovals.jsx
│   │   │   ├── PlatformStatus.jsx
│   │   │   ├── RecentRegistrations.jsx
│   │   │   ├── SimilarWorkers.jsx
│   │   │   └── TotalUsers.jsx
│   │   └── users/
│   │       └── UserManagement.jsx # User admin interface
│   ├── routes/
│   │   └── AppRoutes.jsx         # Route configuration
│   ├── App.jsx                   # Main App component
│   ├── main.jsx                  # Application entry point
│   └── index.css                 # Global styles
├── public/                        # Static assets
├── package.json                   # Project dependencies
├── vite.config.js                # Vite configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
├── eslint.config.js              # ESLint rules
├── postcss.config.js             # PostCSS configuration
└── index.html                    # HTML entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd labour_hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   The application will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
# or
yarn build
```

The optimized production build will be created in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run start` | Start development server |
| `npm run dev` | Development mode with HMR |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint code quality checks |
| `npm run preview` | Preview production build locally |

## 🔄 Routing

The application uses React Router for client-side routing. Main routes include:

- `/` - Login page
- `/dashboard` - Main dashboard
- `/find-labour` - Worker search and discovery
- `/admin/dashboard` - Admin dashboard with various sub-routes
- `/admin/users` - User management
- `/admin/active-workers` - Active workers list
- `/admin/pending-approvals` - Pending worker approvals
- `/admin/recent-registrations` - New registrations
- `/admin/platform-status` - Platform statistics
- `/admin/employers` - Employer management

## 🎨 UI Components

### Reusable Components
- **StatCard** - Display statistics and metrics
- **WorkerCard** - Show worker profile information
- **Header** - Top navigation and branding
- **Footer** - Application footer
- **AdminLayout** - Layout wrapper for admin pages

## 📊 Mock Data

The application includes mock data for development purposes. Mock data is stored in `src/data/mockData.js` and can be used to test functionality without a backend.

## 🔒 Security Features

- Protected routes requiring authentication
- Role-based access control (RBAC)
- Context-based state management for auth

## 🌐 Responsive Design

The application is fully responsive and built with Tailwind CSS, ensuring:
- Mobile-first design approach
- Optimized layouts for all screen sizes
- Touch-friendly interface elements

## 📦 Dependencies Management

All dependencies are pinned to specific versions in `package.json` for stability. Regular updates are recommended for security patches.

### Main Dependencies
- **react** - UI library
- **react-dom** - React DOM rendering
- **react-router-dom** - Routing library
- **tailwindcss** - Styling framework

### Dev Dependencies
- **vite** - Build tool
- **@vitejs/plugin-react** - React plugin for Vite
- **eslint** - Code linting
- **TypeScript** - Type safety

## 🐛 Development

### Code Quality
- ESLint configuration included for code consistency
- Support for TypeScript for type safety
- Prettier integration available (can be added)

### Hot Module Replacement (HMR)
The development server supports HMR for instant updates during development without full page reload.

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
3. Push to the branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## 📄 License

This project is proprietary and confidential.

**© 2026 BrainTech Technology Pvt Ltd**

This project and all of its contents, including but not limited to code, documentation, and design, are the exclusive intellectual property of **BrainTech Technology Pvt Ltd**. 

### Ownership & Rights
- **Company:** BrainTech Technology Pvt Ltd
- **Product:** Labour Hub Worker Management Platform
- **Copyright:** © 2026 BrainTech Technology Pvt Ltd. All Rights Reserved.
- **Status:** Proprietary and Confidential

Unauthorized copying, distribution, modification, or use of this project is strictly prohibited without express written permission from BrainTech Technology Pvt Ltd.

For licensing inquiries, please contact: BrainTech Technology Pvt Ltd

## 📞 Support & Contact

For support or questions regarding the Labour Hub platform, please contact:

**BrainTech Technology Pvt Ltd**
- Official Website: www.braintechtechnology.com
- Email: support@braintechtechnology.com
- For internal queries: Contact the development team

## 🎯 Future Enhancements

- [ ] Backend API integration
- [ ] Real-time notifications
- [ ] Payment gateway integration
- [ ] Worker ratings and reviews system
- [ ] Advanced search filters
- [ ] Mobile app version
- [ ] Email verification system
- [ ] Two-factor authentication

## 📅 Version History

**v0.0.0** - Initial project setup with basic structure and components

---

**Last Updated:** January 2026
=======
# Labour_hub_Job-Portal-Application
MERN stack job portal connecting employers with workers, featuring real-time hiring, admin dashboard, and automated reminder &amp; warning system.
>>>>>>> 7d820b1086b690bdaca735d00b5e20d44c460c93
