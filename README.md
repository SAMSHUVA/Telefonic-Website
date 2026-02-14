# Telefonic Essentials | Luxury E-Commerce Platform (v4.0)

Telefonic Essentials is a premium, high-end e-commerce platform specializing in luxury iPhones, smartphones, horology, and bespoke accessories. Built with a focus on high-fidelity design, smooth user experience, and a robust administrative backend.

## ✨ Features

- **Dynamic Inventory**: Real-time product management via Supabase.
- **Festival Manager**: Site-wide promotion labels controlled through a central dashboard.
- **Premium UI/UX**:
  - Parallax hero sections.
  - Smooth Lenis scrolling.
  - Framer Motion animations.
  - Glass-morphism design aesthetics.
- **Intelligent Order Flow**: Automated WhatsApp booking system with structured customer data & product context.
- **Admin Dashboard**: Secure interface for CRUD operations, global settings management, and image uploads.

## 🚀 Technical Stack

- **Frontend**: React.js, Tailwind CSS, Vite.
- **Animations**: Framer Motion, GSAP (Canvas), Lenis (Smooth Scroll).
- **Backend & Database**: Supabase (PostgreSQL).
- **Styling**: Vanilla CSS + Tailwind utilities.
- **Hosting**: Netlify/Vercel compatible.

## 🛠️ Developer Guide

### Prerequisites
- Node.js (v18+)
- NPM or Yarn
- Supabase Account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YourUsername/Telefonic-Website.git
   cd Telefonic-Website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Database Setup**
   Execute the `database_setup.sql` script in your Supabase SQL Editor to create the necessary tables (`products`, `settings`) and RLS policies.

5. **Run Locally**
   ```bash
   npm run dev
   ```

### Project Structure
- `/src/components/admin`: Admin Panel components.
- `/src/lib/supabaseClient.js`: Supabase initialization & mock failover.
- `/src/components/ServicePage.jsx`: Dynamic category layout.
- `/src/components/ReservationForm.jsx`: Order handling logic.

## 🤝 Contribution

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

*Handcrafted with precision for Telefonic Essentials.*
