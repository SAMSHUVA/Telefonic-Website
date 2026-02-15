# Telefonic Essentials | Luxury E-Commerce Platform

[![version](https://img.shields.io/badge/version-7.0.0-blue.svg)](https://github.com/SAMSHUVA/Telefonic-Website)
[![React](https://img.shields.io/badge/React-18.0-61DAFB.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF.svg)](https://vitejs.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38B2AC.svg)](https://tailwindcss.com/)

**Telefonic Essentials** is a premium, high-fidelity e-commerce platform curated for elite technology and luxury lifestyle products. Designed with a "Digital First" mentality, it blends high-performance animations with a robust administrative backbone.

[Features](#-features) • [What's New](#-whats-new-v70) • [Developer Guide](#-developer-setup) • [Non-Tech Guide](#-non-tech-guide)

---

## ✨ Features

- **Luxury User Interface**: Parallax hero sections, smooth Lenis scrolling, and custom Framer Motion transitions.
- **Dynamic Inventory Management**: Real-time product syncing using Supabase PostgreSQL.
- **Intelligent Order Routing**: Seamless WhatsApp integration that captures product context and user data for instant booking.
- **Pro-Grade Admin Dashboard**: Secure, centralized control over inventory, marketing festivals, and site-wide settings.
- **Performance Optimized**: Optimized image delivery, reduced DOM complexity, and premium preloader experience.

---

## 🚀 What's New (v7.0)

| Feature | Description |
| :--- | :--- |
| **New Support Hub** | Fully custom support page with specific "Track Order" and "Reliability" modules. |
| **Premium Preloader** | Luxury-aligned loading sequences replacing technical jargon with brand-centric messages. |
| **Vercel Optimization** | Cleaned up tracking and removed legacy Netlify configuration for better deployment performance. |
| **Security Hardened** | Environment variables are now secured and no longer tracked in public version control. |
| **WhatsApp v2.0** | All contact CTAs standardized to the dedicated business support line (+91 96552 06555). |

---

## 🛠 Developer Setup

### Prerequisites
- Node.js (v18 or higher)
- A Supabase Project (URL & Anon Key)
- Git installed on your local machine

### Installation Steps
1. **Clone the Project**
   ```bash
   git clone https://github.com/SAMSHUVA/Telefonic-Website.git
   cd Telefonic-Website
   ```

2. **Initialize Environment**
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_project_url
   VITE_SUPABASE_ANON_KEY=your_anon_key
   ```

3. **Deploy Dependencies**
   ```bash
   npm install
   ```

4. **Launch Local Server**
   ```bash
   npm run dev
   ```

---

## 💼 Non-Tech Guide

### Accessing the Inventory
To manage products without touching code:
1. Log in to the **Admin Dashboard** via `/admin`.
2. Navigate to **Inventory Manager** to add, edit, or remove iPhones and accessories.
3. Your changes will reflect on the live site instantly upon saving.

### Managing Sales & Promotions
The **Festival Manager** allows you to toggle event banners (e.g., "Holiday Sale") across the entire site from a single switch in the admin panel.

### Handling Support
All customer inquiries from the **Support Page** are routed directly to your business WhatsApp. Ensure the business mobile is logged in to receive real-time notifications.

---

## 🤝 Contribution & License

Interested in contributing? Please fork the repository and submit a pull request for review.

*Handcrafted with precision for Telefonic Essentials.*
