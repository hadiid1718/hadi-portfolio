
export const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Work', path: '/work' },
  { name: 'Contact', path: '/contact' },
  { name: 'Resume', path: '/resume' },
];

export const authRoutes = [
  { name: 'Admin Login', path: '/admin-login' }
];


export const impactItems = [
  {
    title: "U Sleep",
    description:
      "Validated the pipeline end-to-end across 10,000 users, fetching live jobs, automatically generating proposals for all listings, and sending them to clients on the selected platform. Implemented Stripe subscription billing and centralized Express error-handling middleware, mapping Mongoose errors to consistent JSON responses with structured Winston logging and error reporting."
  },
  {
    title: "Acquisitions - Secure REST API",
    description:
      "Architected four role-based REST API endpoints with JWT authentication and access control, rate-limited to 150 requests per minute, returning consistent 4xx/5xx JSON responses. Implemented request validation with Zod, bot protection with Arcjet, structured logging with Winston, and containerized the service using Docker."
  },
  {
    title: "README Generator SaaS",
    description:
      "Implemented authentication, plan-based template access, and a live Markdown preview for real-time editing. Integrated Stripe-powered plan upgrades to support premium template tiers. Implemented bot protection with Arcjet, structured logging with Winston, a CI/CD pipeline using GitHub Actions, and containerized the service using Docker."
  }
];

export const stats = [
  { number: '3+', label: 'Years of Experience' },
  { number: '10+', label: 'Projects Completed' },
  { number: '14+', label: 'Technologies Mastered' },
  { number: '200+', label: 'Code Commits' }
];





