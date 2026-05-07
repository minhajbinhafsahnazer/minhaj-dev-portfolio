'use client';

import Section from '../ui/Section';
import GlassCard from '../ui/GlassCard';
import RevealOnScroll from '../ui/RevealOnScroll';

const skills = [
  { category: 'Full Stack Development', accent: 'blue', items: ['End-to-end application design', 'RESTful API development', 'Database design & optimization', 'Authentication & authorization'] },
  { category: 'Frontend Excellence', accent: 'cyan', items: ['Responsive web design', 'Component architecture', 'State management', 'Performance optimization'] },
  { category: 'Backend Mastery', accent: 'purple', items: ['Server architecture', 'API design', 'Database management', 'Security best practices'] },
  { category: 'Cloud & DevOps', accent: 'emerald', items: ['AWS deployment', 'CI/CD pipelines', 'Containerization', 'Infrastructure as code'] },
];

const accentMap: Record<string, { text: string; bg: string; border: string }> = {
  blue: { text: 'text-blue-500 dark:text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  cyan: { text: 'text-cyan-600 dark:text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
  purple: { text: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
  emerald: { text: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
};

export default function SkillsSection() {
  return (
    <Section id="skills">
      <div className="mb-16">
        <RevealOnScroll>
          <h2 className="mb-3 text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-semibold">
            Capabilities
          </h2>
        </RevealOnScroll>
        <RevealOnScroll delay={0.1}>
          <h3 className="font-serif-display text-fluid-section font-light">
            Core Competencies
          </h3>
        </RevealOnScroll>
      </div>

      {/* Bento Grid for Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {skills.map((skill, index) => {
          const colors = accentMap[skill.accent] || accentMap.blue;
          return (
            <RevealOnScroll key={skill.category} delay={index * 0.1} direction={index < 2 ? 'up' : 'up'}>
              <GlassCard 
                variant="subtle" 
                className="p-7 h-full border-zinc-200 dark:border-white/5 relative overflow-hidden group"
                hover
              >
                {/* Number accent */}
                <div className={`absolute -right-2 -top-4 font-serif-display text-[80px] font-bold ${colors.text} opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-700 select-none`}>
                  0{index + 1}
                </div>
                <div className="relative">
                  <div className="flex items-center gap-2.5 mb-5">
                    <div className={`h-1.5 w-1.5 rounded-full ${colors.bg} ${colors.border} border`} />
                    <h4 className={`text-[10px] font-semibold uppercase tracking-[0.15em] ${colors.text}`}>
                      {skill.category}
                    </h4>
                  </div>
                  <ul className="space-y-2.5">
                    {skill.items.map((item) => (
                      <li key={item} className="flex items-center gap-2.5">
                        <div className="h-[1px] w-3 bg-zinc-300 dark:bg-zinc-700/50" />
                        <span className="text-[12px] font-medium leading-tight">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </GlassCard>
            </RevealOnScroll>
          );
        })}
      </div>
    </Section>
  );
}