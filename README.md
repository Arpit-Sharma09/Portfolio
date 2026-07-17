# Arpit Sharma Portfolio

A modern, high-performance, and visually rich 3D portfolio website built for **Arpit Sharma** (Cloud Support & Cybersecurity Engineer). It features smooth animations, 3D scenes, and a functional contact form.

---

## 🚀 Technologies (The Stack)

- **Frontend Framework**: Next.js 15 (App Router) with React 19
- **Styling**: TailwindCSS v4
- **3D Graphics**: Three.js via `@react-three/fiber` and `@react-three/drei`
- **Animations**: GSAP (GreenSock) and Lenis (for smooth scrolling)
- **Database**: MongoDB (for contact form submissions)
- **Testing**: Vitest for unit/integration testing

---

## 📂 Project Structure

Key directories and components:
- [src/app/](file:///c:/wamp64/www/public/src/app) - Pages, layouts, and API routes.
  - `page.tsx` - Main page compiling all sections.
  - `layout.tsx` - Global font config, metadata, custom cursor, smooth scrolling, and page loader.
  - `api/contact/route.ts` - Handles contact form submissions (saves to MongoDB and sends notification emails via Web3Forms).
- [src/components/](file:///c:/wamp64/www/public/src/components) - Reusable components.
  - `sections/` - Portfolio sections (Hero, About, Expertise, Projects, Stats, ExplorerHub, Contact, Footer).
  - `ui/` - Interface elements (Navbar, GlobalBackground, HeroScene 3D animation, CustomCursor, PageLoader, ResumeModal).
- [src/lib/](file:///c:/wamp64/www/public/src/lib) - Project helpers.
  - [mongodb.ts](file:///c:/wamp64/www/public/src/lib/mongodb.ts) - MongoDB connection client.

---

## 🛠️ Development & Setup

Follow these steps to set up and run the project locally.

### 1. Prerequisites
Ensure you have Node.js installed on your system.

### 2. Environment Configuration
Create a `.env.local` file in the root directory and define the following variables:

```env
# MongoDB Connection String (Required for saving contact messages)
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB=portfolio # Optional, defaults to "portfolio"

# Web3Forms Access Key (Required for email notifications from the contact form)
WEB3FORMS_ACCESS_KEY=your_web3forms_key
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Running the Development Server
```bash
# Standard local development
npm run dev

# Network-accessible development (exposes to local network)
npm run dev:network
```
Open [http://localhost:3000](http://localhost:3000) with your browser to view the site.

### 5. Running Tests
```bash
# Run tests once
npm run test

# Run tests in watch mode
npm run test:watch
```

### 6. Production Build
To build and start the optimized production package:
```bash
npm run build
npm run start
```
