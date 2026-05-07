'use client';

import { experiences } from '@/lib/data';
import Section from '../ui/Section';
import GlassCard from '../ui/GlassCard';
import RevealOnScroll from '../ui/RevealOnScroll';

export default function ExperienceTimeline() {
  return (
    <Section id="experience">
      <div className="mb-20">
        <RevealOnScroll>
          <h2 className="mb-3 text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-semibold">
            Career Journey
          </h2>
        </RevealOnScroll>
        <RevealOnScroll delay={0.1}>
          <h3 className="font-serif-display text-fluid-section font-light">
            Professional Experience
          </h3>
        </RevealOnScroll>
      </div>

      <div className="relative max-w-3xl">
        {/* Simplified Timeline Line */}
        <div className="absolute left-8 top-0 h-full w-[1px] bg-gradient-to-b from-blue-500/20 via-zinc-800 to-transparent" />
        
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <RevealOnScroll key={exp.id} delay={index * 0.15}>
              <div className="relative flex items-start pl-20">
                {/* Timeline dot */}
                <div className="absolute left-7.5 z-10">
                  <div className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.4)]" />
                </div>

                <div className="w-full">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.15em] text-zinc-500 font-medium">{exp.period}</span>
                    <span className="text-[9px] border border-white/10 px-2.5 py-0.5 rounded-full text-zinc-400 uppercase tracking-[0.1em]">{exp.type}</span>
                  </div>
                  
                  <h4 className="font-serif-display text-xl font-normal mb-1">
                    {exp.title}
                  </h4>
                  <p className="mb-4 text-xs font-medium tracking-wide">{exp.company}</p>
                  <p className="mb-6 text-[13px] leading-relaxed max-w-2xl">{exp.description}</p>
                  
                  <div className="flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech) => (
                      <span 
                        key={tech} 
                        className="text-[10px] px-2.5 py-0.5 rounded-full border border-white/5 bg-white/[0.02] hover:text-zinc-300 dark:hover:text-zinc-100 hover:border-white/10 transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </Section>
  );
}
