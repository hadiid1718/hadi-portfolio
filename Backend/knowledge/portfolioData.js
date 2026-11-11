
// Static knowledge about Hadeed Ul Hassan, sourced from his CV and portfolio copy.
// This is combined at request time with live data pulled from MongoDB (Work, Service, Course)
// so the chatbot always reflects both his fixed background and the site's current content.

const profile = {
  name: 'Hadeed Ul Hassan',
  title: 'Full-Stack Developer (MERN)',
  location: 'Islamabad, Pakistan',
  email: 'hadeed.hassan189@gmail.com',
  phone: '+92 326 9908189',
  summary:
    'Full Stack Developer specializing in the MERN stack (MongoDB, Express.js, React.js, Node.js) with hands-on experience designing secure REST APIs, automating backend workflows, and delivering production-ready web platforms. Skilled in authentication systems, role-based access control, payment integrations, and cloud deployment, with a track record of building and shipping complete systems across startup, freelance, and contract engagements.'
};

const skills = {
  frontend: ['React.js', 'TypeScript', 'JavaScript (ES6+)', 'Tailwind CSS', 'Bootstrap', 'Material UI', 'Shadcn UI', 'HTML', 'CSS'],
  backend: ['Node.js', 'Express.js', 'REST API Design', 'JWT & OAuth Authentication', 'Role-Based Access Control (RBAC)'],
  databases: ['MongoDB (Mongoose)', 'PostgreSQL (Drizzle ORM)', 'Neon'],
  devops: ['Docker', 'Docker Compose', 'Git/GitHub', 'CI/CD basics'],
  integrations: ['Stripe', 'Cloudinary', 'Nodemailer', 'Upstash', 'Arcjet', 'Zod', 'Winston', 'Commander.js', 'Inquirer.js'],
  ai: ['FastAPI', 'LangGraph', 'CrewAI', 'Google Gemini (agentic AI backends)']
};

const experience = [
  {
    role: 'Junior Backend Developer',
    company: 'Softly, Lahore',
    period: 'Oct 2025 – Jan 2026',
    details:
      'Developed and maintained backend features and REST API endpoints using Node.js and Express.js within a live production codebase. Integrated REST APIs with frontend components, ensuring reliable data flow and consistent request/response handling across the full stack. Built and maintained Express.js route handlers and middleware, strengthening code structure, error handling, and overall backend reliability.'
  },
  {
    role: 'Backend Engineer (Intern)',
    company: 'Jaynext IT, Lahore',
    period: 'Jul 2025 – Sep 2025',
    details:
      'Engineered authentication systems and centralized error-handling middleware for backend services using Node.js and Express.js. Implemented bot and abuse detection using Arcjet and automated background workflows with Upstash, improving backend performance and reliability.'
  },
  {
    role: 'Freelancer Full Stack Developer',
    company: 'Alnoor Abaya (Freelance, Islamabad)',
    period: 'Mar 2025 – May 2025',
    details:
      'Delivered a full-stack e-commerce platform end to end, covering product catalog, shopping cart, and checkout flows for a retail client. Managed the engagement independently as a freelance contractor, from requirements gathering through deployment.'
  }
];

const featuredProjects = [
  {
    name: 'U Sleep — Job Proposal Automation Platform (Final Year Project)',
    period: 'Feb 2026 – Jul 2026',
    details:
      'A MERN SaaS platform automating freelance proposal submissions through a 7-step pipeline covering job fetching, proposal generation, and automated sending, integrated with the Freelancer.com API (Upwork integration planned). Validated end-to-end with 2 test user accounts, fetching 20+ live jobs, auto-generating proposals for all listings, and auto-sending 10+ proposals per user. Implemented Stripe subscription billing and centralized Express error-handling middleware mapping Mongoose errors to consistent JSON responses with structured Winston logging.',
    tech: ['Node.js', 'Express', 'MongoDB', 'React', 'Vite', 'Tailwind CSS', 'Stripe', 'Upstash']
  },
  {
    name: 'Zenora — LMS Platform',
    period: 'Jan 2026 – Feb 2026',
    details:
      'A full-stack LMS supporting 3 role-based access levels (admin, instructor, student), covering course creation, enrollment, cart, payments, and usage analytics. Designed enrollment logic enabling students to hold up to 3 active courses concurrently before purchasing more, with Stripe-integrated checkout.',
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Redis', 'Stripe', 'Cloudinary', 'JWT']
  },
  {
    name: 'Acquisitions — Secure REST API',
    period: 'Dec 2025',
    details:
      'Architected 4 role-based REST endpoints with JWT authentication and access control, rate-limited to 150 requests per minute, returning consistent 4xx/5xx JSON responses. Implemented request validation with Zod, bot and attack protection with Arcjet, structured logging with Winston; passed all 8 Jest test cases and containerized the service with Docker.',
    tech: ['Node.js', 'Express.js', 'PostgreSQL', 'Drizzle ORM', 'Neon', 'JWT', 'Zod', 'Arcjet', 'Docker', 'Jest']
  },
  {
    name: 'Readme Generator — README Generator SaaS',
    period: 'Oct 2025 – Nov 2025',
    details:
      'A full-stack README Generator SaaS enabling developers to generate polished project documentation quickly. Implemented authentication, plan-based template access, and a live Markdown preview for real-time editing. Integrated Stripe-powered plan upgrades to support premium template tiers.',
    tech: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Stripe']
  }
];

const education = {
  institution: 'Quaid-i-Azam University, Islamabad',
  degree: 'Bachelor of Science in Information Technology (BSIT)',
  period: 'Sep 2022 – Jun 2026',
  coursework: ['Web Programming', 'Database Management Systems', 'Advanced Web Engineering', 'Software Engineering', 'Cybersecurity Fundamentals']
};

const certifications = [
  'Backend Engineer (Node.js & Express.js) — KG Coding with Prashant',
  'FastAPI — NAVTTAC',
  'Silver Award — Final Year Project, Director IIT, Quaid-i-Azam University',
  'DevOps — Coursera'
];

const siteMap = [
  { path: '/', description: 'Home page — hero intro, impact highlights, and stats' },
  { path: '/services', description: 'Services offered' },
  { path: '/work', description: 'Portfolio of projects/work' },
  { path: '/contact', description: 'Contact form to reach Hadeed directly' },
  { path: '/resume', description: "Hadeed's resume/CV page" }
];

// Renders everything above into one block of text for the LLM system prompt.
const buildStaticKnowledgeText = () => {
  return `
PROFILE
Name: ${profile.name}
Title: ${profile.title}
Location: ${profile.location}
Contact email: ${profile.email}
Phone: ${profile.phone}
Summary: ${profile.summary}

SKILLS
Frontend: ${skills.frontend.join(', ')}
Backend: ${skills.backend.join(', ')}
Databases: ${skills.databases.join(', ')}
DevOps & Tooling: ${skills.devops.join(', ')}
Integrations & Libraries: ${skills.integrations.join(', ')}
Agentic AI: ${skills.ai.join(', ')}

EXPERIENCE
${experience.map(e => `- ${e.role} at ${e.company} (${e.period}): ${e.details}`).join('\n')}

FEATURED PROJECTS
${featuredProjects.map(p => `- ${p.name} (${p.period}) — Tech: ${p.tech.join(', ')}. ${p.details}`).join('\n')}

EDUCATION
${education.degree}, ${education.institution} (${education.period}). Relevant coursework: ${education.coursework.join(', ')}.

CERTIFICATIONS
${certifications.map(c => `- ${c}`).join('\n')}

SITE MAP
${siteMap.map(s => `- ${s.path}: ${s.description}`).join('\n')}
`.trim();
};

module.exports = {
  profile,
  skills,
  experience,
  featuredProjects,
  education,
  certifications,
  siteMap,
  buildStaticKnowledgeText
};