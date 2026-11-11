# 🚀 Hadeed's Portfolio

A modern, fully responsive portfolio website built with React, Vite, and Tailwind CSS. Showcasing projects, services, and professional experience with an elegant dark theme design.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Available Scripts](#available-scripts)
- [Pages](#pages)
- [Components](#components)
- [Services Offered](#services-offered)
- [Featured Projects](#featured-projects)

---

## 🎯 Overview

This portfolio is a professional web application that demonstrates modern web development practices. It serves as both a portfolio and a marketing platform, showcasing expertise in full-stack development, cloud architecture, and scalable solutions.

**Profile:** Frontend & Backend Engineer  
**Experience:** 2+ Years  
**Projects Completed:** 5+  
**Technologies Mastered:** 6+

---

## ✨ Features

- **🎨 Modern Design** - Clean, professional dark theme with smooth animations
- **📱 Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- **⚡ Fast Performance** - Built with Vite for lightning-fast builds
- **🧭 Smooth Navigation** - Hash-based routing for seamless page transitions
- **📊 Interactive Sections** - Stats, impact sections, and showcase
- **💼 Services Showcase** - Detailed service offerings with technology stacks
- **🎯 Project Portfolio** - Featured work with descriptions and links
- **📧 Contact Form** - Easy way for clients to get in touch
- **📄 Resume Section** - Interactive resume display with tabbed content

---

## 🛠 Tech Stack

### Frontend
- **React** (^19.1.1) - UI library
- **Vite** (^7.1.7) - Build tool and dev server
- **Tailwind CSS** (^4.1.14) - Utility-first CSS framework
- **React Router DOM** (^7.9.4) - Client-side routing
- **Lucide React** (^0.546.0) - Icon library

### Development Tools
- **ESLint** (^9.36.0) - Code quality and linting
- **TypeScript** (^5.9.3) - Type safety
- **Vite Plugin React** (^5.0.4) - Fast refresh for development

### Styling & UI
- **Tailwind CSS Vite** (^4.1.14) - Vite integration for Tailwind

---

## 📁 Project Structure

```
portfolio/
├── public/                          # Static files
├── src/
│   ├── assets/                      # Images, PDFs, and media files
│   │   ├── profile.jpg
│   │   ├── Hadeed_CV.pdf
│   │   ├── admin_dashboard.png
│   │   ├── shades.png
│   │   ├── zentry.png
│   │   ├── u-slepp.png
│   │   ├── statement.png
│   │   └── vs.png
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navigation.jsx       # Top navigation bar with mobile menu
│   │   │   ├── Footer.jsx           # Footer component
│   │   │   └── Link.jsx             # Custom link component
│   │   │
│   │   ├── home/
│   │   │   ├── HeroSection.jsx      # Hero section with profile
│   │   │   ├── ImpactSection.jsx    # Key achievements display
│   │   │   └── StatsSection.jsx     # Statistics showcase
│   │   │
│   │   ├── Contact/
│   │   │   ├── ContactForm.jsx      # Contact form component
│   │   │   └── ContactInfo.jsx      # Contact information display
│   │   │
│   │   ├── resume/
│   │   │   ├── ResdumeContent.jsx   # Resume content display
│   │   │   └── ResumeSidebar.jsx    # Resume navigation sidebar
│   │   │
│   │   ├── services/
│   │   │   └── ServiceCard.jsx      # Individual service card
│   │   │
│   │   ├── work/
│   │   │   └── ProjectCard.jsx      # Individual project card
│   │   │
│   │   ├── courses/
│   │   │   ├── CourseTabs.jsx       # Course tabs component
│   │   │   └── Topics/              # Course topic components
│   │   │
│   │   └── utils/
│   │       ├── Constants.jsx        # Navigation links, services, projects data
│   │       └── Router.jsx           # Custom router implementation
│   │
│   ├── pages/
│   │   ├── HomePage.jsx             # Landing page
│   │   ├── ServicePage.jsx          # Services listing page
│   │   ├── WorkPAge.jsx             # Portfolio/work showcase page
│   │   ├── ResumePage.jsx           # Resume page
│   │   ├── CoursePage.jsx           # Courses page
│   │   └── Contact.jsx              # Contact page
│   │
│   ├── App.jsx                      # Main application component
│   ├── App.css                      # App-level styles
│   ├── index.css                    # Global styles
│   └── main.jsx                     # Application entry point
│
├── index.html                       # HTML template
├── package.json                     # Project dependencies
├── vite.config.js                   # Vite configuration
├── eslint.config.js                 # ESLint configuration
└── README.md                        # This file
```

---

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/hadiid1718/pro-hadeed-file.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5173` (or the URL shown in terminal)

---

## 📖 Usage

### Development

Start the development server with hot module replacement:
```bash
npm run dev
```

### Build

Create an optimized production build:
```bash
npm run build
```

### Preview

Preview the production build locally:
```bash
npm run preview
```

### Linting

Check code quality and styling:
```bash
npm run lint
```

---

## 📝 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build optimized production bundle |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

---

## 📄 Pages

### Home Page (`/`)
- **Hero Section** - Introduction with profile image and CV download
- **Impact Section** - Key achievements and highlights
- **Stats Section** - Statistics showing experience and expertise
- **Navigation** - Fixed header with smooth scroll behavior

### Services Page (`/services`)

**Full Stack Development**
- End-to-end application development
- Technologies: React, Node.js, MongoDB, SQL, Next.js, Express

**Frontend Development**
- Beautiful, responsive interfaces
- Technologies: React, JavaScript, Tailwind CSS, Redux, Webpack

**Backend Development**
- Robust server-side applications
- Technologies: Node.js, Express, Docker, Redis

### Work Page (`/work`)

Showcase of featured projects:
1. **Universal File Converter and Image Compression** (MERN) - 500K+ users, 99.9% uptime
2. **Departmental Voting System** (MERN) - Secure admin dashboard with voter management
3. **U Sleep - Upwork Automation Tool** (MERN) - Auto-fetch jobs and generate proposals
4. **Shades - UI/UX Customization** (Frontend) - Interactive UI customization platform
5. **Zentry Gaming** (Frontend) - Animated gaming website with smooth scrolling
6. **Statement Converter** (MERN) - Bank statement to PDF converter with analytics

### Resume Page (`/resume`)
- Interactive resume with tabbed navigation
- Organized resume sections
- Sidebar navigation for quick access

### Courses Page (`/courses`)
- Educational content and tutorials
- Course tabs and topic organization
- Structured learning materials

### Contact Page (`/contact`)
- Contact form for inquiries
- Contact information display
- Easy communication channel

---

## 🎨 Components

### Common Components
- **Navigation** - Responsive navigation with mobile menu
- **Footer** - Footer with social links
- **Link** - Custom routing component

### Home Components
- **HeroSection** - Main hero with intro and CTA
- **ImpactSection** - Key achievements display
- **StatsSection** - Statistics showcase

### Reusable Components
- **ServiceCard** - Service showcase cards
- **ProjectCard** - Project showcase cards
- **CourseTabs** - Course organization tabs

---

## 💼 Services Offered

### 1. Full Stack Development
- MERN/MEAN Stack Development
- Database Architecture & Design
- API Development & Integration
- Real-time Applications
- Progressive Web Apps (PWA)
- Performance Optimization

### 2. Frontend Development
- Responsive Web Design
- React Development
- UI/UX Implementation
- Component Libraries
- State Management
- Cross-browser Compatibility

### 3. Backend Development
- RESTful & GraphQL APIs
- Microservices Architecture
- Cloud Infrastructure (AWS/Azure)
- Database Optimization
- Authentication & Security
- CI/CD Pipeline Setup

---

## 🎯 Featured Projects

| Project | Category | Technologies | Status | Link |
|---------|----------|--------------|--------|------|
| Universal File Converter | MERN Stack | React, Node, Express, Socket.io, Redis | Complete | [GitHub](https://github.com/hadiid1718/extention-converter) |
| Departmental Voting System | MERN Stack | Node, Express, MongoDB, React, Redux | Complete | [GitHub](https://github.com/hadiid1718/voting_system) |
| U Sleep - Upwork Automation | MERN Stack | React, REST API, GraphQL, Socket.io | Working | [GitHub](https://github.com/hadiid1718/u-sleep) |
| Shades - UI Customization | Frontend | HTML5, CSS3, JavaScript ES6 | Complete | [Demo](https://createyourownui.netlify.app) |
| Zentry Gaming | Frontend | React, Tailwind, GSAP, Framer Motion | Complete | [Demo](https://zentrygaming.netlify.app) |
| Statement Converter | MERN Stack | React, Node, Express, MongoDB | Complete | [GitHub](https://github.com/hadiid1718/zentrygaming) |

---

## 📊 Key Statistics

- **2+** Years of Experience
- **5+** Projects Completed
- **6+** Technologies Mastered
- **200+** Code Commits

---

## 🌐 Routing

The application uses a custom hash-based router implementation for client-side navigation:

```jsx
<Router>
  <Route path="/">
    <HomePage />
  </Route>
  <Route path="/services">
    <ServicesPage />
  </Route>
  <Route path="/work">
    <WorkPage />
  </Route>
  <Route path="/contact">
    <ContactPage />
  </Route>
  <Route path="/resume">
    <ResumePage />
  </Route>
</Router>
```

**Navigation Links:**
- `/` - Home
- `/services` - Services
- `/work` - Featured Work
- `/contact` - Contact
- `/resume` - Resume
- `/courses` - Courses

---

## 🎨 Styling

- **Tailwind CSS** - Utility-first CSS framework for responsive design
- **Dark Theme** - Professional dark slate color scheme
- **Blue Accents** - Consistent use of blue for highlights and CTAs
- **Responsive** - Mobile-first approach with breakpoints for all devices

### Color Palette
- **Primary Background**: Slate-950
- **Secondary Background**: Slate-900
- **Accent Color**: Blue-400 / Blue-600
- **Text**: White / Slate-300
- **Highlights**: Green-400 (for accent text)

---

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints for:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

All pages and components are optimized for all screen sizes using Tailwind's responsive utilities.

---

## 🔄 Deployment

The portfolio can be deployed to various platforms:

### Netlify
```bash
npm run build
# Deploy the dist/ folder to Netlify
```

### Vercel
```bash
npm run build
# Connect your GitHub repository to Vercel
```

### GitHub Pages
```bash
npm run build
# Deploy dist/ folder to GitHub Pages
```

---

## 🤝 Contact & Social

- **Email**: Via contact form on website
- **GitHub**: [hadiid1718](https://github.com/hadiid1718)
- **Repository**: [pro-hadeed-file](https://github.com/hadiid1718/pro-hadeed-file)

---

## 📄 License

This project is open source and available under the MIT License.

---

## 🙏 Acknowledgments

- React community for excellent documentation
- Tailwind CSS for utility-first CSS framework
- Lucide React for beautiful icon library
- Vite team for blazing fast build tool
- Framer Motion and GSAP for smooth animations

---

## 📌 Notes

- Portfolio is actively maintained and updated with new projects
- CV is available for download from the hero section
- All project links are included for reference
- Contact page for collaboration opportunities

---

**Last Updated:** December 14, 2025

**Built with ❤️ by Hadeed**
