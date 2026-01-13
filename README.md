# Day 17 / 45: Coding Challenge 🚀

### Project: Full-Stack [MERN] Subscription Platform ("Project 17")

**Date:** January 17, 2026
**Status:** Completed & Deployed

---

## 💡 The Goal
For **Day 17** of my 45 Days of Coding Challenge, I decided to build something complex. I didn't just want a frontend design; I wanted to understand **how companies like Netflix or ChatGPT manage their Free vs Premium users.**

So, I built a fully functional **SaaS (Software as a Service) platform** from scratch. The goal was to create a system where users can sign up, access a dashboard, and are forced to "Upgrade" to see hidden content—secured by both Frontend and Backend logic.

## 🌐 Live Demo
You can test the application here:
- **Live Site:** https://day17-project17.vercel.app/
- **API Endpoint:** ==> https://day17-project17.onrender.com

---

## 🛠️ What I Built (Features)

This isn't just a UI; it has a working brain (Backend).

### 1. The "Cyber" UI (Frontend)
I wanted a futuristic, premium feel, so I avoided Tailwind/Bootstrap and wrote **Pure CSS** with:
- **Glassmorphism:** Translucent cards and blur effects.
- **Animations:** Moving gradients, floating elements, and a sci-fi "Command Center" dashboard.
- **Responsive Design:** Works smoothly on mobile and desktop.

### 2. Security (The Brain)
- **JWT Authentication:** Implemented secure Login/Signup. Users get a "Digital Wristband" (Token) upon login.
- **Password Hashing:** Used `bcryptjs` so even I can't see user passwords in the database.
- **Protected Routes:** You cannot access `/dashboard` without logging in.

### 3. Subscription Logic (The Core)
- **Role-Based Access:** Users start as **FREE**.
- **Feature Gating:** I created a "Classified Vault" that only **PREMIUM** users can open.
- **Upgrade System:** Implemented a simulation where users can click "Upgrade Clearance", pay (simulated), and instantly unlock premium features via API updates.

---

## 💻 Tech Stack Used

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React + Vite (Fast & Modern) |
| **Styling** | Pure CSS3 (Custom Animations) |
| **Backend** | Node.js + Express.js |
| **Database** | MongoDB Atlas (Cloud) |
| **Auth** | JSON Web Tokens (JWT) |

---

## 🚀 How to Run Locally

If you want to check the code or run it on your machine:

1. **Clone the repo**
   ```bash
   git clone [https://github.com/YOUR_USERNAME/project-17.git](https://github.com/YOUR_USERNAME/project-17.git)
