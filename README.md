# MakeMyCottage - Premium Wooden Home Builders Website

A premium, modern, conversion-focused website for **Make My Cottage Infra Pvt. Ltd.** — wooden home builders in Hyderabad, India.

## 🏗️ Tech Stack

### Frontend
- **React 18** with Vite
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Router** for routing
- **React Helmet** for SEO

### Backend
- **Node.js** + **Express**
- **MongoDB** with Mongoose
- **JWT** authentication
- **Multer** for file uploads

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### 1. Clone and install

```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 2. Configure environment

```bash
# Copy .env.example to .env in the server directory
cp server/.env.example server/.env
```

Edit `server/.env` with your MongoDB URI and JWT secret.

### 3. Seed the database

```bash
cd server
npm run seed
```

This creates:
- Admin user (admin@makemycottage.com / Admin@123)
- 6 sample projects
- 6 services
- 8 gallery items
- 4 testimonials
- Site content

### 4. Run the application

```bash
# Terminal 1: Start backend
cd server
npm run dev

# Terminal 2: Start frontend
cd client
npm run dev
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Admin Panel: http://localhost:3000/admin/login

## 📁 Project Structure

```
makemycottage/
├── client/                    # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/        # Reusable components
│   │   │   └── layout/        # Navbar, Footer, Layout
│   │   ├── pages/
│   │   │   ├── admin/         # Admin dashboard pages
│   │   │   ├── HomePage.jsx
│   │   │   ├── ProjectDetailPage.jsx
│   │   │   ├── AboutPage.jsx
│   │   │   ├── ServicesPage.jsx
│   │   │   ├── GalleryPage.jsx
│   │   │   └── ContactPage.jsx
│   │   └── utils/
│   └── index.html
├── server/                    # Express backend
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seed/
│   └── server.js
└── README.md
```

## 🔐 Admin Panel

Access the admin dashboard at `/admin/login`:
- **Email:** admin@makemycottage.com
- **Password:** Admin@123

Features:
- Dashboard overview
- Project CRUD management
- Enquiry management with status tracking
- Gallery management
- Testimonial management

## 📞 Contact

**Make My Cottage Infra Pvt. Ltd.**
- Phone: 9902050007
- Instagram: @makemycottageinfrapvtltd
- Website: www.makemycottage.com
- Location: Shamshabad, Hyderabad, Telangana
