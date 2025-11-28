# Community Issue Reporter & Resolution Tracker

A modern, feature-rich full-stack web application that enables residents to report local community issues (potholes, water leakage, waste pickup delays, broken streetlights) and allows admins to track, respond, and update their resolution status with real-time notifications.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-18.x-green.svg)
![React](https://img.shields.io/badge/react-18.x-blue.svg)

## Key Highlights

- **Dark Mode Support** - Beautiful light/dark theme toggle
- **Real-time Comments** - Two-way communication between admins and reporters
- **WhatsApp-Style Notifications** - Never miss a response with smart notification badges
- **Modern UI/UX** - Smooth animations, gradients, and contemporary design
- **Fully Responsive** - Optimized for all devices
- **Fast & Efficient** - Built with performance in mind

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Future Enhancements](#future-enhancements)

## Features

### For Residents

#### Issue Reporting
- **Submit Issues** - Report community problems with detailed descriptions
- **Photo Upload** - Attach evidence photos (up to 5MB)
- **Interactive Map** - Pick exact locations using Leaflet maps
- **Contact Info** - Optional name, email, and phone for updates
- **Categorization** - Electricity, Roads, Water, Waste, Safety

#### Issue Tracking
- **View All Issues** - See all community reports in beautiful cards
- **Advanced Filtering** - Filter by category, status, or search keywords
- **Comment & Reply** - Communicate with admins about your issues
- **Get Notified** - See when admins respond with WhatsApp-style badges
- **Mobile Friendly** - Access from any device

### For Admins

#### Dashboard & Analytics
- **Statistics Dashboard** - Real-time issue counts and metrics
- **Visual Charts** - Category-wise distribution with Chart.js
- **Smart Filters** - Quick access to pending/in-progress issues
- **CSV Export** - Export all data for reports

#### Issue Management
- **Update Status** - Change from Pending to In-Progress to Resolved
- **Respond to Issues** - Add official admin comments
- **Delete Issues** - Remove spam or duplicate reports
- **View Reporter Info** - Contact details when provided
- **Notification System** - See new comments from reporters

#### Modern Features
- **Dark Mode** - Toggle between light and dark themes
- **Secure Authentication** - JWT-based admin login
- **Real-time Updates** - Instant UI updates without page refresh
- **Beautiful UI** - Modern design with smooth animations

### Communication System

#### Comments & Notifications
- **Two-way Chat** - Admins and reporters can communicate
- **WhatsApp-Style Badges** - Green pulsing notifications for new messages
- **Unread Tracking** - Separate notification counts for admins and reporters
- **Auto-clear Notifications** - Badges disappear when you view the issue
- **Comment History** - Full conversation thread in issue details

## Tech Stack

### Frontend
- **Framework**: React 18 with Hooks
- **Build Tool**: Vite (Lightning fast)
- **Styling**: TailwindCSS with custom theme
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Maps**: Leaflet + React-Leaflet
- **Charts**: Chart.js + React-Chartjs-2
- **State Management**: Context API

### Backend
- **Runtime**: Node.js 18
- **Framework**: Express.js
- **ORM**: Prisma
- **Database**: PostgreSQL (Supabase)
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **File Upload**: Multer
- **Storage**: Supabase Storage
- **CORS**: CORS middleware

### Database Schema
- **Issues** - Core issue tracking with reporter info
- **Comments** - Threaded comments with author tracking
- **Admins** - Admin authentication and management
- **Notifications** - Last view timestamps for notification tracking

## Screenshots

### Home Page
![Home Page](screenshots/home.png)
*Modern card-based layout with filters and WhatsApp-style notification badges*

### Report Issue
![Report Issue](screenshots/report.png)
*Multi-section form with photo upload, location picker, and reporter info*

### Admin Dashboard
![Admin Dashboard](screenshots/dashboard.png)
*Comprehensive statistics with colorful gradient cards and charts*

### Issue Details & Comments
![Issue Details](screenshots/issue-details.png)
*Modal view with full details, admin actions, and comment thread*

### Dark Mode
![Dark Mode](screenshots/dark-mode.png)
*Beautiful dark theme across the entire application*

> **Note**: Add actual screenshots to a `/screenshots` folder in your repository

## Prerequisites

Before you begin, ensure you have:

- **Node.js** v18+ - [Download](https://nodejs.org/)
- **npm** v9+ - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)
- **Supabase Account** - [Sign up free](https://supabase.com/)

## Quick Start

### 1. Clone & Install

```bash
# Clone the repository
git clone <your-repo-url>
cd community-issue-tracker

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Set Up Environment Variables

**Backend (.env)**
```bash
cd backend
cp .env.example .env
# Edit .env with your Supabase credentials
```

```env
DATABASE_URL="postgresql://user:password@host:port/database"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_KEY="your-supabase-anon-key"
SUPABASE_BUCKET="issue-photos"
PORT=5000
NODE_ENV="development"
FRONTEND_URL="http://localhost:5173"
```

**Frontend (.env)**
```bash
cd frontend
cp .env.example .env
```

```env
VITE_API_URL=http://localhost:5000
```

### 3. Database Setup

```bash
cd backend

# Generate Prisma Client
npx prisma generate

# Run migrations (creates all tables including comments)
npx prisma migrate dev --name init

# Seed database with sample data
npm run seed
```

**Default Admin Credentials:**
- Email: `admin@community.com`
- Password: `admin123`

### 4. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# App runs on http://localhost:5173
```

**Open http://localhost:5173 in your browser!**

## Environment Variables

### Backend Configuration

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string from Supabase | Yes |
| `JWT_SECRET` | Secret key for JWT tokens (use strong random string) | Yes |
| `SUPABASE_URL` | Your Supabase project URL | Yes |
| `SUPABASE_KEY` | Supabase anon/public key | Yes |
| `SUPABASE_BUCKET` | Storage bucket name (create as `issue-photos`) | Yes |
| `PORT` | Server port (default: 5000) | No |
| `NODE_ENV` | Environment: development/production | No |
| `FRONTEND_URL` | Frontend URL for CORS | Yes |

### Frontend Configuration

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_URL` | Backend API URL | Yes |

## Database Setup

### Supabase Setup Steps

1. **Create Project**
   - Go to [Supabase Dashboard](https://app.supabase.com/)
   - Click "New Project"
   - Choose name, password, and region

2. **Get Database URL**
   - Settings → Database → Connection string (URI)
   - Replace `[YOUR-PASSWORD]` with your password

3. **Create Storage Bucket**
   - Go to Storage section
   - Create bucket named `issue-photos`
   - Make it **PUBLIC**

4. **Get API Keys**
   - Settings → API
   - Copy Project URL and anon/public key

### Database Schema Overview

```sql
-- Issues table (with reporter info and notification tracking)
issues:
  - id, title, description, category, location
  - photoUrl, status
  - reporterName, reporterEmail, reporterPhone
  - lastAdminView, lastReporterView (for notifications)
  - createdAt, updatedAt

-- Comments table (for two-way communication)
comments:
  - id, issueId, authorName, authorType (admin/reporter)
  - content, createdAt

-- Admins table
admins:
  - id, email, password, name, createdAt
```

## API Documentation

### Authentication

#### `POST /api/auth/login`
Admin login

**Request:**
```json
{
  "email": "admin@community.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "jwt-token",
  "admin": { "id": 1, "email": "...", "name": "..." }
}
```

### Issues

#### `GET /api/issues`
Get all issues with unread comment counts

**Query Params:**
- `status` - Pending, In-Progress, Resolved
- `category` - Electricity, Roads, Water, Waste, Safety
- `search` - Search in title, description, location

**Response:**
```json
[
  {
    "id": 1,
    "title": "Broken Streetlight",
    "description": "...",
    "category": "Electricity",
    "location": "Main Street #45",
    "photoUrl": "https://...",
    "status": "Pending",
    "reporterName": "John Doe",
    "reporterEmail": "john@example.com",
    "reporterPhone": "+1234567890",
    "totalComments": 3,
    "unreadAdminComments": 1,
    "unreadReporterComments": 0,
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
]
```

#### `GET /api/issues/:id`
Get single issue with all comments

#### `POST /api/issues`
Create new issue (multipart/form-data)

**Form Data:**
- `title` (required)
- `description` (required)
- `category` (required)
- `location` (required)
- `reporterName` (optional)
- `reporterEmail` (optional)
- `reporterPhone` (optional)
- `photo` (optional file)

#### `PATCH /api/issues/:id/status`
Update status (Admin only)

```json
{ "status": "In-Progress" }
```

#### `DELETE /api/issues/:id`
Delete issue (Admin only)

### Comments

#### `GET /api/issues/:id/comments`
Get all comments for an issue

#### `POST /api/issues/:id/comments`
Add a comment

```json
{
  "content": "Working on this issue now",
  "authorName": "Admin",
  "authorType": "admin"
}
```

#### `POST /api/issues/:id/mark-viewed`
Mark issue as viewed (clears notifications)

```json
{
  "viewerType": "admin"
}
```

### Statistics

#### `GET /api/issues/stats`
Get dashboard statistics

#### `GET /api/issues/export/csv`
Export to CSV (Admin only)

## Project Structure

```
community-issue-tracker/
├── backend/
│   ├── config/
│   │   └── supabase.js              # Supabase client
│   ├── controllers/
│   │   ├── authController.js         # Authentication
│   │   └── issueController.js        # Issues + Comments + Notifications
│   ├── middleware/
│   │   └── auth.js                   # JWT middleware
│   ├── prisma/
│   │   ├── schema.prisma             # Database schema (Issues, Comments, Admins)
│   │   ├── migrations/               # Database migrations
│   │   └── seed.js                   # Sample data seeder
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── issueRoutes.js
│   ├── utils/
│   │   └── fileUpload.js
│   ├── .env                          # Environment variables
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CategoryChart.jsx         # Chart.js visualization
│   │   │   ├── CommentsSection.jsx       # Comment thread UI
│   │   │   ├── FilterBar.jsx             # Advanced filters
│   │   │   ├── IssueCard.jsx             # With notification badges
│   │   │   ├── IssueDetailsModal.jsx     # Full issue view + comments
│   │   │   ├── LoadingSpinner.jsx        # Improved spinner
│   │   │   ├── LocationPicker.jsx        # Leaflet map
│   │   │   ├── Navbar.jsx                # With dark mode toggle
│   │   │   ├── StatsWidget.jsx           # Gradient stat cards
│   │   │   └── ThemeToggle.jsx           # Dark mode switch
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── ThemeContext.jsx          # Dark mode state
│   │   ├── pages/
│   │   │   ├── AdminDashboard.jsx        # Enhanced dashboard
│   │   │   ├── Home.jsx                  # With modal integration
│   │   │   ├── Login.jsx                 # Beautiful redesign
│   │   │   └── ReportIssue.jsx           # Multi-section form
│   │   ├── services/
│   │   │   └── api.js                    # API client
│   │   ├── utils/
│   │   │   └── helpers.js
│   │   ├── App.jsx
│   │   ├── index.css                     # Dark mode + animations
│   │   └── main.jsx
│   ├── .env
│   ├── tailwind.config.js                # Custom theme + animations
│   └── package.json
│
└── README.md
```

## Design Features

### Color Palette
- **Primary**: Warm red-orange gradients (#f04a3f to #de3024)
- **Accent**: Orange tones (#f0730a to #e15800)
- **Dark Mode**: Deep grays (#0f172a to #1e293b)

### Animations
- Fade-in entrance animations
- Slide-up card reveals
- Smooth transitions on all interactions
- Pulsing notification badges
- Hover effects with scale transforms

### Typography
- Gradient text for headings
- Clear hierarchy with font weights
- Professional iconography

## Deployment

### Frontend (Netlify)

1. Push to GitHub
2. Connect repository to Netlify
3. Build settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
4. Add env var: `VITE_API_URL` = your backend URL

### Backend (Render)

1. Connect repository to Render
2. Create Web Service:
   - **Root Directory**: `backend`
   - **Build**: `npm install && npx prisma generate && npx prisma migrate deploy`
   - **Start**: `npm start`
3. Add all environment variables
4. Run seed: `npm run seed` (in Render shell)

## Bonus Features Implemented

- **Dark Mode** - Complete light/dark theme with persistence
- **Comments System** - Full two-way communication
- **WhatsApp Notifications** - Smart unread message badges
- **Reporter Contact Info** - Optional contact details
- **Issue Details Modal** - Beautiful full-screen view
- **CSV Export** - Download all data
- **Interactive Map** - Leaflet location picker
- **Data Visualization** - Chart.js analytics
- **Advanced Filtering** - Search + category + status
- **Responsive Design** - Mobile-first approach
- **Smooth Animations** - Modern UX with transitions
- **Production Ready** - Full deployment setup

## Future Enhancements

- [ ] Email/SMS notifications for updates
- [ ] Resident registration system
- [ ] Issue voting/upvoting
- [ ] Priority levels (Low/Medium/High/Critical)
- [ ] Multiple admin roles with permissions
- [ ] Geolocation auto-detection
- [ ] Multi-language support (i18n)
- [ ] Mobile app (React Native)
- [ ] AI-powered issue categorization
- [ ] Social media integration
- [ ] Advanced analytics and reporting
- [ ] Issue templates for common problems
- [ ] Bulk actions for admins
- [ ] Activity feed/timeline

## Usage Guide

### For Residents

1. **Report an Issue**
   - Click "Report Issue"
   - Fill in details (title, description, category, location)
   - Optionally add your contact info
   - Upload a photo if available
   - Submit

2. **Track Your Issues**
   - View all issues on home page
   - Filter to find yours
   - Click to see details
   - Add comments if you have updates
   - Get notified when admin responds (green badge)

### For Admins

1. **Login**
   - Click "Admin Login"
   - Use credentials: admin@community.com / admin123

2. **Manage Issues**
   - View dashboard with statistics
   - See all issues with notification badges
   - Click issue to view full details
   - Update status as you progress
   - Respond to reporters via comments
   - Delete spam/duplicates if needed

3. **Export Data**
   - Click "Export CSV" to download all issues
   - Use for reports or external analysis

## Contributing

This project was built as part of the ProU Technology Full-stack Development Assessment (Track 3).

## License

MIT License - Free to use for learning and development.

## Author

Built for ProU Technology Assessment
- **Track**: Full-stack Development (Track 3)
- **Date**: November 2024

## Acknowledgments

- ProU Technology for the opportunity
- Supabase for excellent cloud services
- The open-source community for amazing tools

---

<div align="center">

**If you found this project helpful, please give it a star!**

Made for the community

</div>
