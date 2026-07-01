'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getProjects } from '@/lib/services/portfolio.service';
import { projects as fallbackProjects } from '@/lib/data';
import Section from '../ui/Section';
import GlassCard from '../ui/GlassCard';
import RevealOnScroll from '../ui/RevealOnScroll';

export default function FeaturedWork() {
  const [projects, setProjects] = useState(fallbackProjects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const apiProjects = await getProjects();
        setProjects(apiProjects);
      } catch (error) {
        console.log('API not available, using static data');
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);

  return (
    <Section id="work">
      <div className="mb-16">
        <RevealOnScroll>
          <h2 className="mb-3 text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-semibold">
            Selected Projects
          </h2>
        </RevealOnScroll>
        <RevealOnScroll delay={0.1}>
          <h3 className="font-serif-display text-fluid-section font-light">
            Featured Work
          </h3>
        </RevealOnScroll>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-stretch">
        {(projects || fallbackProjects).map((project, index) => (
          <RevealOnScroll key={project.id} delay={index * 0.15} direction={index % 2 === 0 ? 'left' : 'right'} className="h-full">
            <GlassCard 
              variant="subtle"
              className="overflow-hidden group border-zinc-200 dark:border-white/5 glass-card-hover flex flex-col h-full cursor-pointer"
              hover
            >
              {/* Card Click Overlay */}
              {(project.liveUrl || project.githubUrl) && (
                <a 
                  href={project.liveUrl || project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-10 cursor-pointer"
                  aria-label={`View details of project ${project.title}`}
                />
              )}

              {/* Project Image/Gradient */}
              <div className="h-52 w-full relative overflow-hidden bg-zinc-900/50 shrink-0">
                {project.imageUrl ? (
                  <Image
                    src={project.imageUrl}
                    alt={`${project.title} preview`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <>
                    <div className={`
                      absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700
                      ${index % 3 === 0 ? 'bg-gradient-to-br from-blue-500 to-purple-500/30' : ''}
                      ${index % 3 === 1 ? 'bg-gradient-to-br from-purple-500 to-pink-500/30' : ''}
                      ${index % 3 === 2 ? 'bg-gradient-to-br from-emerald-500 to-cyan-500/30' : ''}
                    `} />
                    <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-medium">Project Preview</span>
                    </div>
                  </>
                )}
              </div>

              {/* Project Content */}
              <div className="p-7 flex flex-col flex-grow">
                <div className="mb-3 flex items-center justify-between">
                  <h4 className="font-serif-display text-xl font-normal group-hover:text-blue-400 dark:group-hover:text-blue-400 transition-colors duration-500">
                    {project.title}
                  </h4>
                  <span className="text-[9px] font-medium text-zinc-500 uppercase tracking-[0.15em]">
                    {project.category}
                  </span>
                </div>

                <p className="mb-6 text-xs leading-relaxed line-clamp-2">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="mb-6 flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span key={tech} className="text-[10px] px-2.5 py-0.5 rounded-full bg-zinc-900/5 dark:bg-white/5 border border-zinc-200 dark:border-white/5 text-zinc-500 dark:text-zinc-400 transition-all duration-300 hover:bg-blue-500/10 hover:border-blue-500/20 hover:text-blue-600 dark:hover:text-blue-300 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(59,130,246,0.15)] cursor-default">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-6 mt-auto">
                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors duration-300 relative z-20 after:absolute after:bottom-[-2px] after:left-0 after:h-[1px] after:w-0 after:bg-zinc-900 dark:after:bg-white after:transition-all after:duration-300 group-hover:after:w-full"
                    >
                      View Project
                    </a>
                  )}
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="group/link flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-zinc-300 transition-colors duration-300 relative z-20"
                    >
                      GitHub 
                      <span className="group-hover/link:translate-x-1 transition-transform duration-300">&rarr;</span>
                    </a>
                  )}
                </div>
              </div>
            </GlassCard>
          </RevealOnScroll>
        ))}
      </div>
    </Section>
  );
}
