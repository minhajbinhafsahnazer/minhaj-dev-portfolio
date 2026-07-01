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
    title: 'Plant Pot',
    description: 'Interactive dashboard with real-time data visualization using Chart.js and WebSocket connections.',
    technologies: ['Next.js', 'TypeScript', 'Chart.js', 'Django', 'Redis', 'AWS', 'chat bot'],
    category: 'fullstack',
    imageUrl: '/images/plant_pot.png',
    liveUrl: '#',
  },
  // Add more projects
];

export const experiences: Experience[] = [
  {
    id: '1',
    title: 'Full Stack Developer',
    company: 'Apisride',
    period: '2024 - Present',
    description: 'Leading full-stack development of enterprise applications using Next.js and FastAPI, managing AWS deployments and CI/CD pipelines, Worked on 2 CRM grade EU based projects, developed complex features like AI chatbots, analytics dashboards, and real-time engines.',
    technologies: ['Next.js', 'FastAPI', 'Ai-LLM Integration', 'AI Integration', 'Chatbots', 'AWS', 'Cloudflare', 'Docker', 'CI/CD', 'PostgreSQL', 'Redis', 'Real-time Engines', 'Analytics Dashboards', 'Performance Optimization', 'Security', 'Webhooks', 'CRM Integration', 'Payment Gateway Integration', 'SSO', 'SSH', 'Nginx', 'Hosting and Deployment', 'Unit Tests', 'Monitoring', 'JIRA', 'React-ts'],
    type: 'work',
  },
  {
    id: '2',
    title: 'Junior Software Engineer (Backend Core)',
    company: 'Harwex Technologies',
    period: '2022 - 2024',
    description: 'Worked on Payment Gateway Orchestration System, developed REST APIs and frontend interfaces, implemented authentication systems and database optimization.',
    technologies: ['React', 'Django', 'PostgreSQL', 'AWS', 'FastAPI', 'Celery', 'Redis', 'Git', 'Docker', 'Bootstrap',  'API Integrations', 'Postman'],
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
