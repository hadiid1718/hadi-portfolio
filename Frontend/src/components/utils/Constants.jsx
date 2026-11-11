
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
    title: "U Sleep — Job Automation Platform",
    description:
      "Built and validated an automated job-search and proposal pipeline across 10,000 users. The platform fetches live job listings, generates proposals automatically, and sends them to clients. Integrated Stripe subscription billing and centralized Express error handling with structured Winston logging and error reporting."
  },

  {
    title: "Acquisitions — Secure REST API",
    description:
      "Designed and implemented a secure role-based REST API with JWT authentication, access control, Zod request validation, and rate limiting. Added Arcjet bot protection, Winston structured logging, consistent API error responses, and Docker-based containerization for reliable deployment."
  },

  {
    title: "README Generator SaaS",
    description:
      "Built a SaaS platform for generating and editing project documentation with authentication, plan-based template access, and live Markdown preview. Integrated Stripe subscriptions for premium features, Arcjet bot protection, Winston logging, GitHub Actions CI/CD, and Docker containerization."
  }
];

export const stats = [
  { number: '1+', label: 'Years of Experience' },
  { number: '10+', label: 'Projects Completed' },
  { number: '14+', label: 'Technologies Mastered' },
  { number: '200+', label: 'Code Commits' }
];




export const experience = [
  {
    id: 1,
    start: "2026-03",
    end: "2026-06",
    title: "AI Engineer",
    company: "Relvyn",
    location: "Islamabad, Pakistan",
    description: [
      "Designed and built Relvyn, a multi-agent engineering intelligence platform that layers AI agents on top of a team's existing GitHub, Jira, and Confluence workflow to surface risk and blockers before they turn into fires.",
      "Architected three purpose-built agents: a PR Risk Agent (LangGraph) that flags risky pull requests before merge, a Sprint Blocker Agent (CrewAI) that identifies what's actually slowing a sprint down, and a Postmortem Agent (LangGraph + RAG) that turns past incidents into searchable, actionable retrospectives.",
      "Built the agent service as a standalone FastAPI/Python layer running alongside a Node/Express/MongoDB/Kafka backend and React frontend, so agents operate independently while staying in sync with the core platform.",
      "Traced a silent RAG retrieval failure to a missing vector search index and a trailing-space environment variable, then rebuilt the embedding pipeline to populate vector storage with 768-dimensional embeddings using Gemini's text-embedding-004 model.",
      "Ported the platform's AES-256-GCM credential decryption logic from Node to Python so the agent layer could securely access each organization's encrypted GitHub and Jira tokens.",
    ],
  },
  {
    id: 2,
    start: "2025-10",
    end: "2026-04",
    title: "Junior Full Stack Developer",
    company: "Softly",
    location: "Islamabad, Pakistan",
    description: [
      "Built and maintained backend features and REST endpoints in Node.js and Express within a live production codebase.",
      "Connected those APIs to the frontend, keeping data flow and request/response handling consistent across the stack.",
      "Wrote and maintained Express route handlers and middleware, tightening error handling and overall backend structure.",
    ],
  },
];

export const projects = [
  {
    id: 1,
    start: "2026-07",
    end: "2026-08",
    title: "GCC Real Estate WhatsApp Agent",
    company: "Code Celix Company",
    description: [
      "Designed and built a production-style conversational backend that qualifies real estate leads over WhatsApp in English and Arabic.",
      "Implemented secure Meta Cloud API webhooks with HMAC-SHA256 verification and two-layer idempotency, plus a LangGraph agent that extracts budget, intent and timeline and books consultation calls.",
      "Delivered a paginated CRM admin API with 135 automated tests and an end-to-end security validation suite.",
    ],
  },
  {
    id: 2,
    start: "2025-12",
    end: "2026-01",
    title: "AI Resume Scanner",
    company: "Resume screening & candidate matching",
    description: [
      "Built a resume screening service with FastAPI, LangGraph, and LangChain that evaluates candidates against job descriptions.",
      "Used GPT-4o to turn that evaluation into structured scores and short qualification summaries for each candidate.",
      "Built the matching engine that parses resume content and compares it against job requirements to speed up first-pass screening.",
    ],
  },
];





