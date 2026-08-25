<h1 align="center">Vivek V Ron — AI/ML Engineer Portfolio</h1>

<p align="center">
  A high-performance, interactive 3D portfolio and custom headless CMS built for the modern web.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js" alt="Next.js 15" />
  <img src="https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Three.js-black?style=flat-square&logo=three.js&logoColor=white" alt="Three.js" />
  <img src="https://img.shields.io/badge/GSAP-88CE02?style=flat-square&logo=greensock&logoColor=white" alt="GSAP" />
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white" alt="Supabase" />
</p>

## ✨ Overview

This repository hosts the source code for my personal portfolio. It is designed to be visually striking, highly interactive, and engineered with a robust, custom-built Content Management System (CMS) that allows for seamless, real-time updates without touching the codebase or redeploying.

## 🚀 Key Features

- **Interactive 3D Graphics**: Utilizes **Three.js** via **React Three Fiber / Drei** to render performant WebGL interactive spheres and geometries that respond to scroll and cursor events.
- **Cinematic Animations**: Powered by **GSAP (GreenSock)** and **Framer Motion** for buttery-smooth scroll triggers, parallax effects, and page transitions.
- **Custom Headless CMS (`/admin`)**: A password-protected bespoke dashboard built directly into the application. It dynamically manages data for Projects, Certifications, Education, Research, and Hackathons.
- **Serverless Vercel Architecture**: The CMS is engineered to gracefully handle Vercel's read-only serverless environment by intelligently routing database writes to ephemeral `/tmp` storage in production.
- **Secure Supabase Integration**: Features a contact form wired to a **PostgreSQL** database via Supabase. Includes a custom Inbox UI in the admin panel to read and manage messages using secure Row Level Security (RLS) policies.
- **Multilingual Support (i18n)**: Fully localized in 6 languages—English, Kannada, Hindi, Telugu, Tamil, and Malayalam.
- **Smart Image Processing**: Includes a custom interceptor that automatically transforms standard Google Drive share links into raw, embeddable image streams to prevent CORS and rendering errors.

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **3D Rendering**: Three.js, React Three Fiber, React Three Drei
- **Animations**: GSAP, Framer Motion
- **Database / Backend**: Supabase (PostgreSQL)
- **Deployment**: Vercel

## 📂 Project Structure

- `src/app/` — Next.js 15 App Router routes, API endpoints, and Server Actions.
- `src/components/` — React components, including the 3D canvas (`*Sphere.tsx`), main layout (`Portfolio.tsx`), and the CMS interface (`AdminDashboardClient.tsx`).
- `src/data/` — Local JSON fallback storage for the Headless CMS.
- `src/translations/` — Localization dictionaries for the multi-language UI.

## ⚙️ Local Development Setup

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/VIVEKVRON/Portfolio.git
   cd Portfolio
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Configure Environment Variables**
   Create a \`.env.local\` file in the root directory and add your Supabase and Admin credentials:
   \`\`\`env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ADMIN_PASSWORD=your_secure_admin_password
   \`\`\`

4. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`
   Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## 🛡️ Admin Dashboard

To access the CMS and Inbox:
1. Navigate to \`/admin\`.
2. Authenticate using the configured \`ADMIN_PASSWORD\`.
3. Use the bespoke dashboard to arrange (UP/DOWN), create, update, or delete portfolio items.

---
*Designed & Engineered by Vivek V Ron.*
