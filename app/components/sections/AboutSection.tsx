'use client';

import { personalInfo } from '@/lib/data';
import Section from '../ui/Section';
import GlassCard from '../ui/GlassCard';
import RevealOnScroll from '../ui/RevealOnScroll';
import MagneticButton from '../ui/MagneticButton';
import Hyperspeed from './Hyperspeed';
import { useTheme } from '../ui/ThemeProvider';

export default function AboutSection() {
  const { theme } = useTheme();
  return (
    <Section id="about" className="relative overflow-hidden !pt-32 !pb-12">
      {/* Hyperspeed Background — hidden in light mode */}
      <div className={`absolute inset-0 z-0 transition-opacity duration-500 ${(theme === 'light') ? 'opacity-0 pointer-events-none' : 'opacity-80'}`}>
        <Hyperspeed
          effectOptions={{
            distortion: 'turbulentDistortion',
            length: 400,
            roadWidth: 10,
            islandWidth: 2,
            lanesPerRoad: 3,
            fov: 90,
            fovSpeedUp: 150,
            speedUp: 2,
            carLightsFade: 0.4,
            totalSideLightSticks: 20,
            lightPairsPerRoadWay: 40,
            shoulderLinesWidthPercentage: 0.05,
            brokenLinesWidthPercentage: 0.1,
            brokenLinesLengthPercentage: 0.5,
            lightStickWidth: [0.12, 0.5],
            lightStickHeight: [1.3, 1.7],
            movingAwaySpeed: [60, 80],
            movingCloserSpeed: [-120, -160],
            carLightsLength: [12, 80],
            carLightsRadius: [0.05, 0.14],
            carWidthPercentage: [0.3, 0.5],
            carShiftX: [-0.8, 0.8],
            carFloorSeparation: [0, 5],
            colors: {
              roadColor: 0x080808,
              islandColor: 0x0a0a0a,
              background: 0x000000,
              shoulderLines: 0x131318,
              brokenLines: 0x131318,
              leftCars: [0xd856bf, 0x6750a2, 0xc247ac],
              rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],
              sticks: 0x03b3c3,
            },
          }}
        />
      </div>

      <div className="relative z-10">
        <div className="mb-8 flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
          {/* Hero Text */}
          <div className="flex flex-col gap-6 flex-1">
            <div className="space-y-5">
              <RevealOnScroll delay={0.1}>
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                  <h1 className="font-serif-display text-fluid-hero font-light tracking-tight">
                    Hi, I am <span className="font-medium">{personalInfo.name}</span>
                  </h1>
                  <div className="mb-4">
                    <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                      <p className="text-[10px] uppercase tracking-[0.25em] font-medium text-blue-400">
                        Full Stack Developer
                      </p>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
              <RevealOnScroll delay={0.2}>
                <p className="text-fluid-body max-w-2xl leading-relaxed">
                  I build high-performance digital solutions with a focus on clean architecture and exceptional user experiences.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.3}>
                <div className="flex gap-4 mt-3">
                  <MagneticButton
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-6 py-2.5 text-xs font-bold uppercase tracking-[0.15em] text-zinc-300 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    Get In Touch
                  </MagneticButton>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>

        {/* About Bio & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <RevealOnScroll delay={0.1} className="lg:col-span-8">
            <GlassCard variant="subtle" className="p-8 h-full bg-black/40 backdrop-blur-md" hover>
              <h2 className="mb-4 text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-semibold">
                About Me
              </h2>
              <p className="text-fluid-body leading-relaxed">
                {personalInfo.bio}
              </p>
            </GlassCard>
          </RevealOnScroll>

          <div className="lg:col-span-4 grid grid-cols-1 gap-4">
            {[
              { value: '2+', label: 'Years Experience' },
              { value: '4+', label: 'Projects Delivered' },
              { value: 'LinkedIn', label: 'Connect on LinkedIn', href: 'https://www.linkedin.com/in/minhajpk' },
            ].map((stat, i) => {
              const content = (
                <div className="p-6 rounded-xl border border-white/5 bg-black/40 backdrop-blur-md flex flex-col justify-center hover:border-white/10 transition-all duration-500 group h-full">
                  <div className="font-serif-display text-3xl font-light text-white group-hover:text-blue-400 transition-colors duration-500">{stat.value}</div>
                  <div className="text-[10px] uppercase tracking-[0.15em] text-zinc-500 font-medium mt-1">{stat.label}</div>
                </div>
              );

              return (
                <RevealOnScroll key={stat.label} delay={0.2 + i * 0.1} direction="right">
                  {stat.href ? (
                    <a href={stat.href} target="_blank" rel="noopener noreferrer" className="block h-full cursor-pointer">
                      {content}
                    </a>
                  ) : (
                    content
                  )}
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
