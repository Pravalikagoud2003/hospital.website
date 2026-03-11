# CarePoint Hospital Management System

A simple and efficient hospital website for patient appointments and administrative management.

## 1. Project Explanation
CarePoint Hospital is a full-stack web application designed to bridge the gap between patients and healthcare providers. 
- **Patients** can browse specialized doctors, view their availability, and book appointments through a streamlined form.
- **Administrators** have access to a secure dashboard to manage the hospital's medical staff and oversee all incoming appointments.
- The project emphasizes **User Experience** with smooth animations, a clean "Medical/Clean" aesthetic, and responsive design for all devices.

## 2. Technology Stack
- **Frontend**: React 19, Tailwind CSS 4, Motion (for animations), Lucide React (icons).
- **Backend**: Node.js with Express.
- **Database**: SQLite (via `better-sqlite3`) for lightweight, persistent storage.
- **Tooling**: Vite for fast development and building.

## 3. Database Structure (schema.sql)
The system uses two primary tables:
- `doctors`: `id`, `name`, `specialization`, `available_days`.
- `appointments`: `id`, `patient_name`, `phone`, `email`, `doctor_id`, `appointment_date`, `message`, `created_at`.

## 4. Setup Instructions
1. **Environment**: Ensure Node.js is installed.
2. **Installation**: Run `npm install` to install all required dependencies.
3. **Database Setup**: The database (`hospital.db`) is automatically created and seeded with initial data when you start the server for the first time.
4. **Running the App**:
   - Development: `npm run dev`
   - Production: `npm run build` followed by `npm start`
5. **Admin Access**:
   - URL: Navigate to the "Admin Login" page.
   - Credentials: Username: `admin` | Password: `admin123`

## 5. Source Code Overview
- `server.ts`: Contains the Express API routes, database initialization logic, and Vite middleware integration.
- `src/App.tsx`: The main React component containing the routing logic and all page components (Home, Doctors, Appointment, Contact, Admin).
- `src/index.css`: Global styles and Tailwind configuration.
