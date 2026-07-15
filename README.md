# 🌹 The Luxe Yatra Worldwide Travels & Resorts

Welcome to **The Luxe Yatra Worldwide Travels**, a luxury boutique hospitality and membership portal built on a modern stack. This platform offers seamless property exploration, custom curated experiences, membership enrolment via **Club Elevate**, and immersive travel stories.

---

## ✨ Features

- **🌐 Interactive Hero & Booking Bar**: Seamlessly search and explore 200+ global destinations with real-time feedback and booking inputs using [Home.tsx](./components/Home/Home.tsx).
- **🏝️ Curated Resorts & Destinations**: A visually gorgeous catalog showcasing luxury villas, private beaches, and unique accommodations.
- **✨ Experiences Portal**: Discover a tailored list of local adventures divided into:
  - **National**: Experiences inside the country.
  - **International**: Exotic travel routes and global exploration packages.
- **💎 Club Elevate Membership**: Exclusive rewards, luxury concierge access, and private rates. Interactive enrollment form and program highlights.
- **📰 Travel Blog**: Curated journals, design reviews, and guidebooks written by luxury travel writers.
- **🔒 Secure Member Authentication**: User login and sign-up portals to access tailored membership profiles.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 16](./package.json) (App Router configuration)
- **Library**: [React 19](./package.json)
- **Styling**: [Tailwind CSS v4](./package.json) & [PostCSS](./postcss.config.mjs)
- **Animations**: [Framer Motion](./package.json)
- **Icons**: [Lucide React](./package.json)
- **Configuration**: [TypeScript](./tsconfig.json)

---

## 📁 Key Directories & Files

### App Routing System

- [app/layout.tsx](./app/layout.tsx) — Main layout featuring fonts, meta tags, and root wrapper.
- [app/page.tsx](./app/page.tsx) — Landing Home page combining all key sections.
- [app/resorts/page.tsx](./app/resorts/page.tsx) — Collection of top-tier resort properties.
- [app/experiences/page.tsx](./app/experiences/page.tsx) — Gateway page for domestic and global travel experiences.
- [app/clubelevate/page.tsx](./app/clubelevate/page.tsx) — Dedicated Club Elevate page detailing luxury membership benefits.
- [app/blogs/page.tsx](./app/blogs/page.tsx) — The official The Luxe Yatra blog.
- [app/join/page.tsx](./app/join/page.tsx) — Club Elevate member signup application form.
- [app/login/page.tsx](./app/login/page.tsx) & [app/signup/page.tsx](./app/signup/page.tsx) — Authentication flow for members.

### Core Layout Components

- [components/Navbar.tsx](./components/Navbar.tsx) — A glassmorphic capsule navbar with spring-animated search toggle and interactive dropdowns.
- [components/Heading.tsx](./components/Heading.tsx) — Reusable, fully responsive hero page header component.

### Home Page Interactive Sections

- [components/Home/Home.tsx](./components/Home/Home.tsx) — Hero element with a dynamic booking input form (Destination, Dates, Travelers).
- [components/Home/Destinations.tsx](./components/Home/Destinations.tsx) — Beautiful destinations grid with hover animations.
- [components/Home/Properties.tsx](./components/Home/Properties.tsx) — Featured hotels and resort estates.
- [components/Home/Activities.tsx](./components/Home/Activities.tsx) — Guided resort experiences showcase.
- [components/Home/Clientsec.tsx](./components/Home/Clientsec.tsx) — Interactive testimonials carousel.

### Feature specific components

- [components/Club/](./components/Club) — Modular sub-components for Club Elevate detail page, FAQ accordions, and signup layout forms.
- [components/Resort/](./components/Resort) — Resort browsing section components.
- [components/Experience/](./components/Experience) — Grid, layout, and descriptions of travel experiences.

---

## 🚀 Getting Started

### 1. Clone the project and navigate to the directory

```bash
cd my-app
```

### 2. Install dependencies

Ensure that you are running Node.js 18.x or above.

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the live build.

### 4. Build for Production

To optimize the bundle and produce static assets, run:

```bash
npm run build
```

Then start the production server:

```bash
npm run start
```

---

## 🎨 Styling Guideline

This application strictly adopts modern UI principles:

- **Tailwind CSS v4**: Built-in CSS variables, modern grids, flex layouts, and custom viewport sizing.
- **Glassmorphism**: Elegant blur effects using `backdrop-blur` for navigational headers and cards.
- **Micro-interactions**: Subtle hover states, animated dropdown menus, and spring layout transitions powered by Framer Motion.
