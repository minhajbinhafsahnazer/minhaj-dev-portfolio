'use client';

import { useState, useEffect } from 'react';
import Section from '../ui/Section';
import GlassCard from '../ui/GlassCard';
import RevealOnScroll from '../ui/RevealOnScroll';
import LogoLoop, { LogoItem } from '../ui/LogoLoop';
import Masonry, { MasonryItem } from '../ui/Masonry';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, 
  SiNodedotjs, SiPython, SiPostgresql, SiDocker, 
  SiFramer, SiThreedotjs, SiGit, SiVercel 
} from 'react-icons/si';

const backendExtras = [
  { name: 'JWT', delay: 0 },
  { name: 'Celery', delay: 0.05 },
  { name: 'RBAC', delay: 0.1 },
  { name: 'Caching', delay: 0.15 },
  { name: 'WebSocket', delay: 0.2 },
  { name: 'Webhooks', delay: 0.25 },
  { name: 'OAuth', delay: 0.3 },
  { name: 'AI Engines', delay: 0.35 },
  { name: 'Dashboard', delay: 0.4 },
  { name: 'Monitoring', delay: 0.45 },
  { name: 'API Integration', delay: 0.5 },
  { name: 'UI/UX', delay: 0.55 },


];

export default function TechStack() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const technologyGroups = {
    frontend: [
      { label: 'Frameworks', items: ['Next.js', 'React'] },
      { label: 'Languages', items: ['TypeScript', 'JavaScript', 'jQuery'] },
      { label: 'Styling', items: ['Tailwind CSS', 'Bootstrap'] },
      { label: 'Animations', items: ['Framer Motion', 'GSAP'] },
      { label: 'Design & UI', items: ['Figma'] },
    ],
    backend: [
      { label: 'Frameworks', items: ['Django', 'Flask', 'FastAPI'] },
      { label: 'Languages', items: ['Python', 'Rust'] },
      { label: 'API Development', items: ['REST APIs'] },
      { label: 'Databases', items: ['PostgreSQL', 'MySQL', 'MongoDB'] },
    ],
    cloud: [
      { label: 'Cloud Platforms', items: ['AWS (EC2/ECS/S3)', 'Vercel', 'Cloudflare'] },
      { label: 'DevOps', items: ['Docker', 'CI/CD Pipelines', 'Automated Workflows'] },
      { label: 'Tools', items: ['Git', 'Postman', 'Swagger', 'Stripe'] },
    ],
  };

  const techLogos: LogoItem[] = [
    { node: <SiReact title="React" />, title: "React" },
    { node: <SiNextdotjs title="Next.js" />, title: "Next.js" },
    { node: <SiTypescript title="TypeScript" />, title: "TypeScript" },
    { node: <SiTailwindcss title="Tailwind CSS" />, title: "Tailwind CSS" },
    { node: <SiNodedotjs title="Node.js" />, title: "Node.js" },
    { node: <SiPython title="Python" />, title: "Python" },
    { node: <SiPostgresql title="PostgreSQL" />, title: "PostgreSQL" },
    { node: <SiDocker title="Docker" />, title: "Docker" },
    { node: <SiVercel title="Vercel" />, title: "Vercel" },
    { node: <SiFramer title="Framer Motion" />, title: "Framer Motion" },
    { node: <SiThreedotjs title="Three.js" />, title: "Three.js" },
    { node: <SiGit title="Git" />, title: "Git" },
  ];

  const expertItems: MasonryItem[] = [
    {
      id: "1",
      img: "/images/masonry/dark1.jpg",
      url: "#",
      height: 400,
    },
    {
      id: "2",
      img: "/images/masonry/dark1.jpg",
      url: "#",
      height: 250,
    },
    {
      id: "3",
      img: "/images/masonry/dark1.jpg",
      url: "#",
      height: 600,
    },
    {
      id: "4",
      img: "/images/masonry/dark1.jpg",
      url: "#",
      height: 350,
    },
    {
      id: "5",
      img: "/images/masonry/dark1.jpg",
      url: "#",
      height: 500,
    },
    {
      id: "6",
      img: "/images/masonry/dark1.jpg",
      url: "#",
      height: 300,
    },
  ];

  return (
    <Section id="tech">
      <div className="mb-16">
        <RevealOnScroll>
          <h2 className="mb-3 text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-semibold">
            Toolkit
          </h2>
        </RevealOnScroll>
        <RevealOnScroll delay={0.1}>
          <h3 className="font-serif-display text-fluid-section font-light text-zinc-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:via-white dark:to-zinc-500">
            Tech Stack
          </h3>
        </RevealOnScroll>
      </div>

      {/* Technical Expertise Cards */}
      <div className="flex flex-col gap-8 max-w-6xl mx-auto">
        
        {/* Frontend Focus */}
        <RevealOnScroll delay={0}>
          <GlassCard variant="subtle" className="p-8 md:p-10 group border-zinc-300/50 dark:border-white/10 bg-white/70 dark:bg-zinc-900/60 shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-500 relative overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-10" hover spotlight>
            <div className="absolute -right-10 -top-10 w-64 h-64 rounded-full bg-blue-500/[0.04] blur-[80px] group-hover:bg-blue-500/[0.08] transition-all duration-1000" />
            
            <div className="relative flex-1 transition-transform duration-500 group-hover:translate-x-1">
              <div className="mb-2 flex items-center gap-3">
                <span className="h-[1px] w-8 bg-blue-500/30"></span>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-600/70 dark:text-blue-400/70">Frontend Expertise</span>
              </div>

              <p className="text-sm max-w-md leading-relaxed font-light mb-6 text-zinc-600 dark:text-zinc-400">
                Engineering high-performance architectures with <span className="text-zinc-900 dark:text-zinc-200 font-medium">Next.js</span> and <span className="text-zinc-900 dark:text-zinc-200 font-medium">TypeScript</span> for seamless user experiences.
              </p>
            </div>

            <div className="relative flex flex-wrap gap-x-8 gap-y-6 lg:max-w-2xl">
              {technologyGroups.frontend.map((group, idx) => (
                <div 
                  key={group.label} 
                  className="space-y-3 transition-all duration-500 group-hover:translate-y-[-2px]"
                  style={{ transitionDelay: `${idx * 40}ms` }}
                >
                  <h5 className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-500">{group.label}</h5>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span 
                        key={item} 
                        className="px-3 py-1.5 rounded-full text-[10px] font-medium border border-zinc-200 dark:border-white/10 bg-white/60 dark:bg-white/[0.04] shadow-sm backdrop-blur-sm transition-all duration-300 hover:scale-[1.04] hover:bg-blue-500/5 hover:border-blue-500/20 hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </RevealOnScroll>

        {/* Backend Focus */}
        <RevealOnScroll delay={0.1}>
          <GlassCard variant="subtle" className="p-8 md:p-10 group border-zinc-300/50 dark:border-white/10 bg-white/70 dark:bg-zinc-900/60 shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-500 relative overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-10" hover spotlight>
            <div className="absolute -right-10 -top-10 w-64 h-64 rounded-full bg-purple-500/[0.04] blur-[80px] group-hover:bg-purple-500/[0.08] transition-all duration-1000" />
            
            {/* Subtle Gradient Sweep Effect */}
            <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-purple-500/[0.03] to-transparent skew-x-12 pointer-events-none" />

            <div className="relative flex-1 transition-transform duration-500 group-hover:translate-x-1">
              <div className="mb-2 flex items-center gap-3">
                <span className="h-[1px] w-8 bg-purple-500/30"></span>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-purple-600/70 dark:text-purple-400/70">Backend & Systems</span>
              </div>
              <p className="text-sm max-w-md leading-relaxed font-light mb-6 text-zinc-600 dark:text-zinc-400">
                Developing reliable server-side systems and APIs that power complex data interactions with <span className="text-zinc-900 dark:text-zinc-200 font-medium">Node.js</span> and <span className="text-zinc-900 dark:text-zinc-200 font-medium">Python</span>.
              </p>
            </div>

            <div className="relative flex flex-wrap gap-x-8 gap-y-6 lg:max-w-2xl">
              {technologyGroups.backend.map((group, idx) => (
                <div 
                  key={group.label} 
                  className="space-y-3 transition-all duration-500 group-hover:translate-y-[-2px]"
                  style={{ transitionDelay: `${idx * 40}ms` }}
                >
                  <h5 className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-500">{group.label}</h5>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span 
                        key={item} 
                        className="px-3 py-1.5 rounded-full text-[10px] font-medium border border-zinc-200 dark:border-white/10 bg-white/60 dark:bg-white/[0.04] shadow-sm backdrop-blur-sm transition-all duration-300 hover:scale-[1.04] hover:bg-purple-500/5 hover:border-purple-500/20 hover:text-purple-600 dark:hover:text-purple-400"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Refined Hover Extras: Circular Skill Pills */}
            <div className="absolute right-[-240px] top-1/2 -translate-y-1/2 pointer-events-none flex items-center pr-0 overflow-visible h-full">
              <div className="relative h-64 w-32 flex items-center justify-end">
                {backendExtras.map((skill, idx) => {
                  // Calculate circular position (arc shifted even further right)
                  const total = backendExtras.length;
                  // Arc only the rightmost 120 degrees (from -60deg to +60deg)
                  const arcSpan = (6 * Math.PI) / 3.3; // 120deg in radians
                  const startAngle = -arcSpan / 2; // -60deg
                  const angle = startAngle + (idx / (total - 1)) * arcSpan;
                  const radius = 120;
                  const xPos = Math.cos(angle) * radius + 80; // Shift arc further right
                  const yPos = Math.sin(angle) * radius;

                  if (!mounted) return null;

                  return (
                    <div
                      key={skill.name}
                      className="absolute opacity-0 scale-[0.8] group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                      style={{ 
                        transitionDelay: `${100 + skill.delay * 1000}ms`,
                        right: '0px',
                        top: '50%',
                        transform: `translate(${xPos}px, calc(-50% + ${yPos}px))`
                      }}
                    >
                      <div 
                        className="h-10 w-10 md:h-12 md:w-12 rounded-full border border-white/10 bg-white/[0.05] backdrop-blur-md flex items-center justify-center shadow-lg border-t-white/20"
                      >
                        <span className="text-[7px] md:text-[8px] font-bold uppercase tracking-tighter text-zinc-300">
                          {skill.name}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </GlassCard>
        </RevealOnScroll>

        {/* Infrastructure Focus */}
        <RevealOnScroll delay={0.2}>
          <GlassCard variant="subtle" className="p-8 md:p-10 group border-zinc-300/50 dark:border-white/10 bg-white/70 dark:bg-zinc-900/60 shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-500 relative overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-10" hover spotlight>
            <div className="absolute -right-10 -top-10 w-64 h-64 rounded-full bg-emerald-500/[0.04] blur-[80px] group-hover:bg-emerald-500/[0.08] transition-all duration-1000" />
            
            <div className="relative flex-1 transition-transform duration-500 group-hover:translate-x-1">
              <div className="mb-2 flex items-center gap-3">
                <span className="h-[1px] w-8 bg-emerald-500/30"></span>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-600/70 dark:text-emerald-400/70">Cloud & Architecture</span>
              </div>
              <p className="text-sm max-w-md leading-relaxed font-light mb-6 text-zinc-600 dark:text-zinc-400">
                Optimizing performance and ensuring high availability using <span className="text-zinc-900 dark:text-zinc-200 font-medium">AWS</span> and automated CI/CD workflows.
              </p>
            </div>

            <div className="relative flex flex-wrap gap-x-8 gap-y-6 lg:max-w-2xl">
              {technologyGroups.cloud.map((group, idx) => (
                <div 
                  key={group.label} 
                  className="space-y-3 transition-all duration-500 group-hover:translate-y-[-2px]"
                  style={{ transitionDelay: `${idx * 40}ms` }}
                >
                  <h5 className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-500">{group.label}</h5>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span 
                        key={item} 
                        className="px-3 py-1.5 rounded-full text-[10px] font-medium border border-zinc-200 dark:border-white/10 bg-white/60 dark:bg-white/[0.04] shadow-sm backdrop-blur-sm transition-all duration-300 hover:scale-[1.04] hover:bg-emerald-500/5 hover:border-emerald-500/20 hover:text-emerald-600 dark:hover:text-emerald-400"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </RevealOnScroll>
      </div>

      {/* Technology Logo Loop */}
      <RevealOnScroll delay={0.4}>
        <div className="mt-20 py-10 border-y border-white/[0.03] relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <div className="mb-8 flex justify-center">
            <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-zinc-600 group-hover:text-zinc-400 transition-colors duration-500">
              Technology Ecosystem
            </span>
          </div>

          <div className="relative h-[80px] flex items-center">
            <LogoLoop
              logos={techLogos}
              speed={110}
              direction="left"
              logoHeight={32}
              gap={80}
              hoverSpeed={20}
              scaleOnHover
              fadeOut
              fadeOutColor="transparent"
              className="tech-logo-loop text-zinc-500 hover:text-white transition-colors duration-500"
            />
          </div>
        </div>
      </RevealOnScroll>

      {/* Expertise Masonry Section */}
      <RevealOnScroll delay={0.5}>
        <div className="mt-20">
          <div className="mb-12 text-center">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-2 dark:text-zinc-600">
              Deep Expertise
            </h4>
            <h3 className="text-3xl font-serif-display">Project Case Studies</h3>
          </div>
          <div className="w-full">
            <Masonry
              items={expertItems}
              ease="power3.out"
              duration={0.6}
              stagger={0.05}
              animateFrom="bottom"
              scaleOnHover
              hoverScale={0.95}
              blurToFocus
              colorShiftOnHover={false}
            />
          </div>
        </div>
      </RevealOnScroll>
    </Section>
  );
}
