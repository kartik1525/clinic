# Cloud Deployment Guide: Vercel & Render

This guide outlines step-by-step instructions to deploy the **ApexCare Clinic Appointment Booking Platform** to production using **Vercel** (Frontend) and **Render** (Backend API), connected to a cloud **MongoDB Atlas** database.

---

## Architecture Overview

```
                      ┌────────────────────────────────┐
                      │      Vercel (Static Site)      │
                      │  React + Vite + Tailwind CSS   │
                      │  https://apexcare.vercel.app   │
                      └───────────────┬────────────────┘
                                      │
                                      │ HTTPS API Requests
                                      ▼
                      ┌────────────────────────────────┐
                      │    Render (Node.js Service)    │
                      │       Express.js Server        │
                      │  https://apexcare.onrender.com │
                      └───────────────┬────────────────┘
                                      │
                                      │ Mongoose Driver (TLS)
                                      ▼
                      ┌────────────────────────────────┐
                      │       MongoDB Atlas Cluster    │
                      │      Free Tier (M0 Sandbox)    │
                      └────────────────────────────────┘
```

---

## Step 1: Set Up Cloud MongoDB Atlas (Free)

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) and sign up for a free account.
2. Create a free **M0 Shared Cluster**.
3. Under **Security > Database Access**:
   - Create a database user with username and password (e.g., `clinic_admin`).
4. Under **Security > Network Access**:
   - Add IP Access: `0.0.0.0/0` (Allow access from anywhere, required for cloud services like Render).
5. Under **Database > Connect > Drivers**:
   - Copy the connection string:
     ```
     mongodb+srv://clinic_admin:<password>@cluster0.mongodb.net/clinic_db?retryWrites=true&w=majority
     ```

---

## Step 2: Deploy Backend to Render

### Option A: Using the `render.yaml` Blueprint (Recommended)

1. Push your project to GitHub or GitLab.
2. Log in to [render.com](https://render.com).
3. Click **New +** and select **Blueprint**.
4. Connect your repository. Render will automatically detect [`render.yaml`](file:///d:/clinic/render.yaml).
5. Render will show the detected services:
   - `apexcare-clinic-api` (Web Service)
   - `apexcare-clinic-ui` (Static Site)
6. Supply the required environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string.
7. Click **Apply**. Render will build and deploy the services!

### Option B: Manual Web Service Setup on Render

1. On the Render Dashboard, click **New + > Web Service**.
2. Connect your Git repository.
3. Configure the settings:
   - **Name**: `apexcare-clinic-api`
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: `Free`
4. Add Environment Variables:
   - `NODE_ENV`: `production`
   - `PORT`: `10000`
   - `MONGODB_URI`: `mongodb+srv://...` (your Atlas URI)
   - `CLIENT_URL`: `https://apexcare-clinic.vercel.app` (or `*`)
5. Click **Create Web Service**.
6. Once deployed, run the seed script once to populate doctors:
   - Open the **Shell** tab on Render and run:
     ```bash
     npm run seed
     ```
7. Note down your backend URL (e.g., `https://apexcare-clinic-api.onrender.com`).

---

## Step 3: Deploy Frontend to Vercel

### Option A: Via Vercel Dashboard

1. Push your project to GitHub or GitLab.
2. Go to [vercel.com](https://vercel.com) and click **Add New > Project**.
3. Import your clinic repository.
4. In the **Configure Project** window:
   - **Framework Preset**: `Vite`
   - **Root Directory**: Click *Edit* and select `client` (or leave as root; our root [`vercel.json`](file:///d:/clinic/vercel.json) handles both!).
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Under **Environment Variables**, add:
   - `VITE_API_URL`: Your Render backend API URL + `/api`
     *(Example: `https://apexcare-clinic-api.onrender.com/api`)*
6. Click **Deploy**.
7. Vercel will build and deploy your application with global edge CDN caching and automatic HTTPS.

### Option B: Via Vercel CLI

```bash
cd d:\clinic\client
npm install -g vercel
vercel
```
Follow the interactive prompts, selecting Vite and adding `VITE_API_URL`.

---

## Verification Checklist After Deployment

- [ ] Open frontend URL: `https://<your-project>.vercel.app`
- [ ] Verify doctors are retrieved on the homepage from your cloud MongoDB
- [ ] Test the booking form at `/book`: submit an appointment
- [ ] Verify the booking reference ID is generated
- [ ] Test `/admin`: verify the new booking appears and status can be updated
- [ ] Test duplicate booking rejection: attempt to book the exact same doctor and slot
- [ ] Test direct page refresh on `/book` and `/admin` (verifies `vercel.json` SPA rewrites)

