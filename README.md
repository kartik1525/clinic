# ApexCare Clinic Appointment Booking Website – Functional Demo MVP

A modern, responsive, and functional clinic appointment booking platform designed for demonstration to potential healthcare and clinical clients.

Built with **React (Vite) + Tailwind CSS** on the frontend, and **Node.js + Express + MongoDB (Mongoose)** on the backend.

---

## 1. Project Overview & Key Features

- **Clinic Homepage**:
  - Hero introduction with quick statistics, trust badges, and appointment CTAs.
  - Comprehensive about section explaining clinical philosophies and modern diagnostic capabilities.
  - 6 Medical specialty service cards with symptom breakdowns.
  - Board-certified doctor profiles with medical qualifications, experience, consultation fees, and available days.
  - Fictional patient testimonials with star ratings and verified demo labels.
  - Operating hours schedule and clinic contact/location information.
  - Emergency hotline notices and medical disclaimers.

- **Interactive Appointment Booking Flow**:
  - Patient contact details form (Name, Phone number with format validation, Email, Reason for consultation).
  - Doctor selection dropdown with instant physician profile preview.
  - Date picker with past date prevention.
  - **Dynamic Time Slot Management**: Automatically fetches booked slots for the selected doctor and date (`/api/appointments/booked-slots`), visually flags booked slots, and prevents double-booking.
  - Client-side validation, error banners, and loading indicators.
  - **Database-Level Slot Protection**: Compound unique index (`doctorId`, `appointmentDate`, `appointmentTime`) with `partialFilterExpression: { status: { $ne: 'Cancelled' } }` to strictly enforce concurrency protection while allowing cancelled slots to be rebooked.
  - **Booking Confirmation Card**: Presents a booking reference code (`#APPT-XXXXXXXX`), full appointment breakdown, printable receipt, and navigation options.

- **Demonstration Admin Portal (`/admin`)**:
  - Clearly designated with a non-production demonstration disclaimer.
  - Real-time stat counters: Total Bookings, Pending, Confirmed, Completed, Cancelled.
  - Filtering by status, doctor, date, and keyword search (patient name, phone, email).
  - Live status update dropdowns (`Pending`, `Confirmed`, `Completed`, `Cancelled`) with instant database synchronization via `PATCH /api/appointments/:id/status`.

---

## 2. Project Architecture & Directory Structure

```
d:\clinic\
├── client/                           # React + Vite + Tailwind CSS Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AboutSection.jsx      # Clinic mission and 4 core clinical pillars
│   │   │   ├── BookingConfirmation.jsx # Printable receipt with booking reference
│   │   │   ├── ContactTimingsSection.jsx # Hours table, directions, address
│   │   │   ├── DoctorsSection.jsx    # Doctor profiles with department filters
│   │   │   ├── Footer.jsx            # Clinic footer & demo MVP disclaimers
│   │   │   ├── Hero.jsx              # Hero introduction, stats, primary CTAs
│   │   │   ├── Navbar.jsx            # Sticky responsive nav & helpline header
│   │   │   ├── ServicesSection.jsx   # 6 Medical specialty cards
│   │   │   ├── StatusBadge.jsx       # Color-coded appointment status pills
│   │   │   └── TestimonialsSection.jsx # Fictional demo patient stories
│   │   ├── pages/
│   │   │   ├── AdminPage.jsx         # Demo admin portal with status updates
│   │   │   ├── BookingPage.jsx       # Multi-step booking form & summary sidebar
│   │   │   └── HomePage.jsx          # Assembled clinic landing page
│   │   ├── services/
│   │   │   └── api.js                # Axios client for REST API endpoints
│   │   ├── App.jsx                   # React Router routing & scroll handling
│   │   ├── index.css                 # Tailwind directives & typography
│   │   └── main.jsx                  # Application entry point
│   ├── .env                          # Local client environment config
│   ├── .env.example                  # Template client environment variables
│   ├── index.html                    # Root HTML template
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── server/                           # Node.js + Express + MongoDB Backend
│   ├── config/
│   │   └── db.js                     # Mongoose connection initialization
│   ├── controllers/
│   │   ├── appointmentController.js  # Booking, slot conflict check, status update
│   │   └── doctorController.js       # Doctor listings and detail queries
│   ├── models/
│   │   ├── Appointment.js            # Appointment schema with partial unique index
│   │   └── Doctor.js                 # Doctor profile schema
│   ├── routes/
│   │   ├── appointmentRoutes.js      # Express routes for appointments
│   │   └── doctorRoutes.js           # Express routes for doctors
│   ├── seeds/
│   │   └── seedDoctors.js            # Database seeder with 6 doctors & demo bookings
│   ├── .env                          # Server environment config
│   ├── .env.example                  # Template server environment variables
│   ├── package.json
│   ├── server.js                     # Express app setup, CORS, error handling
│   └── testApi.js                    # Automated integration verification suite
│
├── mongodb-data/                     # Local MongoDB storage directory
├── start-all.bat                     # Single-click launcher for Windows
├── start-mongodb.bat                 # Helper script to launch local mongod
└── README.md                         # Project documentation
```

---

## 3. Environment Configuration

### Backend: `server/.env`
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/clinic_db
CLIENT_URL=http://localhost:5173
```

### Frontend: `client/.env`
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 4. Installation & Setup Instructions

### Prerequisites
- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **MongoDB**: Local MongoDB instance (or MongoDB Atlas connection URI)

### Quick Start (One-Click on Windows)
Simply double-click `start-all.bat` to seed the database and launch both servers!

### Manual Step-by-Step Setup

1. **Start MongoDB**:
   If using local MongoDB:
   ```powershell
   & "C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe" --dbpath "d:\clinic\mongodb-data" --bind_ip 127.0.0.1 --port 27017
   ```
   Or set `MONGODB_URI` in `server/.env` to your MongoDB Atlas connection string.

2. **Setup and Seed Backend**:
   ```bash
   cd d:\clinic\server
   npm install
   npm run seed
   npm run dev
   ```
   *The backend will run on `http://localhost:5000`.*

3. **Setup and Start Frontend**:
   ```bash
   cd d:\clinic\client
   npm install
   npm run dev
   ```
   *The frontend will run on `http://localhost:5173`.*

---

## 5. API Endpoints Documentation

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api/health` | Health check returning MongoDB connection state and timestamp |
| **GET** | `/api/doctors` | Returns all active doctors (optional query: `?department=Cardiology&search=Elena`) |
| **GET** | `/api/doctors/:id` | Returns single doctor profile |
| **GET** | `/api/appointments` | Lists appointments with optional filters (`?status=...&doctorId=...&date=...&search=...`) and dashboard counters |
| **GET** | `/api/appointments/:id` | Returns single appointment populated with doctor data |
| **GET** | `/api/appointments/booked-slots` | Returns array of occupied slot times for a doctor on a given date (`?doctorId=...&date=YYYY-MM-DD`) |
| **POST** | `/api/appointments` | Creates a new appointment; validates fields and prevents duplicate slot conflicts (Returns HTTP 201 or HTTP 409) |
| **PATCH**| `/api/appointments/:id/status` | Updates status (`Pending`, `Confirmed`, `Cancelled`, `Completed`); verifies slot availability if restoring a cancelled booking |

---

## 6. Duplicate Booking Prevention Architecture

To prevent two patients from reserving the same doctor at the same date and time:
1. **Frontend Pre-Check**: The booking page queries `/api/appointments/booked-slots?doctorId=...&date=...` and disables all booked slots in the UI.
2. **Backend Controller Conflict Check**: Before inserting, the controller checks for an existing active appointment (`status != 'Cancelled'`). If found, it returns `HTTP 409 Conflict`.
3. **Database-Level Unique Constraint**: Mongoose registers a compound index on `{ doctorId: 1, appointmentDate: 1, appointmentTime: 1 }` with `partialFilterExpression: { status: { $ne: 'Cancelled' } }`.
   - If an appointment is cancelled, the index ignores it, freeing the slot for another patient.
   - If concurrent requests attempt to book the same slot simultaneously, MongoDB raises error code `11000` which is caught and gracefully translated into a 409 Conflict response.

---

## 7. Limitations Before Production Deployment

This project was built as a clean demonstration MVP. The following items should be addressed before deploying to a clinical production environment:

1. **Authentication & Authorization**:
   - Secure the Admin Portal with JWT/OAuth2 session management.
   - Enforce Role-Based Access Control (RBAC) separating clinic staff, nurses, physicians, and system administrators.
2. **HIPAA & Data Privacy Compliance**:
   - Encrypt Protected Health Information (PHI) at rest and in transit.
   - Restrict CORS origin strictly to trusted domain headers.
   - Implement audit logging for all patient record queries and edits.
3. **Automated Patient Notifications**:
   - Integrate Twilio / SMS gateways for appointment confirmation and SMS reminders.
   - Integrate SendGrid / Amazon SES for email confirmations and calendar `.ics` invites.
4. **Physician Schedule Management**:
   - Allow doctors to define customized shift hours, lunch breaks, and holiday blackouts.
5. **Electronic Medical Records (EMR) Integration**:
   - Connect with HL7 / FHIR compliant clinical management systems (e.g., Epic, Cerner, AthenaHealth).

