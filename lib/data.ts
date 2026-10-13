// lib/data.ts
import { Project, Experience, Technology } from '@/types/portfolio';

export const projects: Project[] = [
  {
    id: '1',
    title: 'Perslace',
    description: 'An AI-powered Performance Incentive Management Platform designed to automate complex commission schemes, handle multi-level approval workflows, and deliver real-time performance insights with full audit traceability.',
    technologies: ['Next.js', 'FastAPI', 'AI Integration', 'Chatbots', 'AWS', 'Docker', 'CI/CD', 'PostgreSQL', 'Redis', 'Real-time Engines', 'Analytics Dashboards', 'CRM Integration', 'Payment Gateway Integration', 'React-ts'],
    category: 'fullstack',
    liveUrl: 'https://perslace.com/',
    imageUrl: '/images/perslace_dashboard.png',
  },
  {
    id: '2',
    title: 'Wazn',
    description: 'A mobile-first personal money OS built for simple everyday finance management. Wazn brings spending, budgets, goals, and debt tracking into a single fast PWA, backed by an offline-first architecture with local persistence, background synchronization, and monthly financial insights.',
    technologies: [
      'React',
      'Fastify',
      'TypeScript',
      'PostgreSQL',
      'Drizzle ORM',
      'TanStack Query',
      'Tailwind CSS',
      'Dexie.js',
      'Offline-First',
      'JWT',
      'Docker',
      'Turborepo'
    ],
    category: 'fullstack',
    imageUrl: '/images/wazn_on_table1.png',
    imagePosition: 'center 15%', // Centers horizontally, shifts down to show phone tops
    liveUrl: 'https://expensio-flax.vercel.app/welcome',
    githubUrl: 'https://github.com/minhajbinhafsahnazer/expensio',
  },
  {
    id: '3',
    title: 'Plant Pot',
    description: 'An e-commerce platform designed for selling designer carpets and home essentials. Features a modern storefront and a seamless shopping experience.',
    technologies: ['Next.js', 'TypeScript', 'Chart.js', 'Django', 'Redis', 'AWS', 'chat bot'],
    category: 'fullstack',
    imageUrl: '/images/plant_pot_lap.png',
    liveUrl: 'https://plantpot-store.vercel.app/',
  },
  // Add more projects
];

export const experiences: Experience[] = [
  {
    id: '1',
    title: 'Full Stack Developer',
    company: 'Apisride',
    period: '2025 - Present',
    description: 'Leading full-stack development of enterprise applications using Next.js and FastAPI, managing AWS deployments and CI/CD pipelines, Worked on 2 CRM grade EU based projects, developed complex features like AI chatbots, analytics dashboards, and real-time engines.',
    technologies: ['Next.js', 'FastAPI', 'Ai-LLM Integration', 'AI Integration', 'Chatbots', 'AWS', 'Cloudflare', 'Docker', 'CI/CD', 'PostgreSQL', 'Redis', 'Real-time Engines', 'Analytics Dashboards', 'Performance Optimization', 'Security', 'Webhooks', 'CRM Integration', 'Payment Gateway Integration', 'SSO', 'SSH', 'Nginx', 'Hosting and Deployment', 'Unit Tests', 'Monitoring', 'JIRA', 'React-ts'],
    type: 'work',
  },
  {
    id: '2',
    title: 'Junior Software Engineer (Backend Core)',
    company: 'Harwex Technologies',
    period: '2025 - 2025',
    description: 'Worked on Payment Gateway Orchestration System, developed REST APIs and frontend interfaces, implemented authentication systems and database optimization.',
    technologies: ['React', 'Django', 'PostgreSQL', 'AWS', 'FastAPI', 'Celery', 'Redis', 'Git', 'Docker', 'Bootstrap', 'API Integrations', 'Postman'],
    type: 'work',
  },
  // Add more experiences
];

export const technologies: Technology[] = [
  // Frontend
  { name: 'Next.js', category: 'frontend' },
  { name: 'React', category: 'frontend' },
  { name: 'TypeScript', category: 'frontend' },
  { name: 'JavaScript', category: 'frontend' },
  { name: 'Tailwind CSS', category: 'frontend' },
  { name: 'Bootstrap', category: 'frontend' },
  { name: 'Framer Motion', category: 'frontend' },
  { name: 'GSAP', category: 'frontend' },
  { name: 'Figma', category: 'frontend' },
  { name: 'jQuery', category: 'frontend' },

  // Backend & Databases
  { name: 'Django', category: 'backend' },
  { name: 'Flask', category: 'backend' },
  { name: 'FastAPI', category: 'backend' },
  { name: 'Python', category: 'backend' },
  { name: 'Rust', category: 'backend' },
  { name: 'REST APIs', category: 'backend' },
  { name: 'MySQL', category: 'backend' },
  { name: 'PostgreSQL', category: 'backend' },
  { name: 'MongoDB', category: 'backend' },

  // Cloud & DevOps
  { name: 'AWS (EC2/ECS/S3)', category: 'cloud' },
  { name: 'Vercel', category: 'cloud' },
  { name: 'Cloudflare', category: 'cloud' },
  { name: 'Docker', category: 'cloud' },
  { name: 'CI/CD Pipelines', category: 'cloud' },
  { name: 'Git', category: 'cloud' },
  { name: 'Postman', category: 'cloud' },
  { name: 'Stripe', category: 'cloud' },
];

export const personalInfo = {
  name: 'Minhaj',
  title: 'Full Stack Developer',
  bio: 'I bring ideas to life through complete tech solutions. From initial concept and design to production deployment, I handle every aspect of full-stack development. Specializing in modern web technologies with React/Next.js on the frontend and Python frameworks on the backend, all deployed seamlessly on AWS infrastructure.',
  email: 'minhajbinhafsahnazer@gmail.com',
  github: 'https://github.com/minhajbinhafsahnazer',
  linkedin: 'https://www.linkedin.com/in/minhajpk/',
};

// Past configs and knowledge base for APISTRIDE
export const apistrideContext = `
## 🧠 Persona & Operating Mode
- **Role:** Senior full-stack engineer and backend architect.
- **Focus:** Production-grade, multi-tenant FastAPI system, zero-trust security, RBAC, bulk data imports.
- **Rules:** Prioritize clarity, correctness, scalability, and security. Ask focused questions when unclear.
- **Debugging:** Always provide root cause, impact, corrected implementation, and prevention tips.

## 📦 Project Context: APISTRIDE
- **Overview:** B2B SaaS platform for managing employee incentive transactions.
- **Features:** Multi-tenant isolation, RBAC (PRIMARY_ADMIN, ADMIN, EMPLOYEE), bulk CSV/Excel imports, duplicate detection (content hashing), soft deletion, Webhooks, CRM bidirectional sync.
- **Security:** Zero-trust (verify user existence, active status, org membership, and role on every request).
- **Auth:** JWT authentication. No role embedded in token (fetch per request).

## 🧱 Architecture & Conventions
- **Tech Stack:** FastAPI (async), SQLAlchemy (async, declarative), PostgreSQL 16 (asyncpg), Alembic, Pydantic v2.
- **Core Principles:** 
  - Async-first (no blocking I/O).
  - Explicit DB transactions (\`db.commit()\`/\`db.rollback()\`) controlled in the service layer.
  - Strict Typing (Pydantic for API I/O).
  - Atomic Operations for multi-step workflows.
  - Audit everything (CUD operations) to \`audit_logs\`.
- **Directory Structure:** routes -> services -> crud -> models
- **Schemas:** \`...Create\`, \`...Update\`, \`...Public\`.
- **Error Handling:** Custom exceptions from \`app.core.exceptions\` in services (do not raise \`HTTPException\` directly in service).

## 🔧 Local Development & DB Inspection
- **Stack:** Docker-compose (\`api\`, \`db\`).
- **Commands:** \`docker-compose exec api alembic upgrade head\`, \`docker-compose exec db psql -U postgres -d apistride_db\`
`;
