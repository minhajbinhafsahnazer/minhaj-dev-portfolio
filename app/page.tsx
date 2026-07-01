// app/page.tsx
'use client';

import { useState, useEffect, useLayoutEffect } from 'react';
import AboutSection from './components/sections/AboutSection';
import FeaturedWork from './components/sections/FeaturedWork';
import ExperienceTimeline from './components/sections/ExperienceTimeline';
import TechStack from './components/sections/TechStack';
import ContactSection from './components/sections/ContactSection';
import SkillsSection from './components/sections/SkillsSection';
import GlassCard from './components/ui/GlassCard';
import ThemeToggle from './components/ui/ThemeToggle';

const useSafeLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [introPhase, setIntroPhase] = useState<'playing' | 'exiting' | 'done'>('playing');

  // Prevent flash by setting done state synchronously on mount if already played
  useSafeLayoutEffect(() => {
    const hasPlayed = sessionStorage.getItem('introPlayed');
    if (hasPlayed === 'true') {
      setIntroPhase('done');
    }
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem('introPlayed') === 'true') {
      return;
    }
    // Phase 1: play intro for 2.2s, then start exit
    const exitTimer = setTimeout(() => setIntroPhase('exiting'), 2200);
    // Phase 2: remove overlay after exit animation (0.8s)
    const doneTimer = setTimeout(() => {
      setIntroPhase('done');
      sessionStorage.setItem('introPlayed', 'true');
    }, 3000);
    return () => { clearTimeout(exitTimer); clearTimeout(doneTimer); };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock scroll during intro
  useEffect(() => {
    if (introPhase !== 'done') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [introPhase]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const y = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const siteReady = introPhase === 'done';

  return (
    <div className="relative min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 noise-overlay page-root">
      <ThemeToggle />

      {/* ── Intro Overlay ── */}
      {introPhase !== 'done' && (
        <div
          className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 transition-all duration-700 ease-[cubic-bezier(0.7,0,0.3,1)] ${
            introPhase === 'exiting' ? 'opacity-0 -translate-y-10 scale-[1.02]' : 'opacity-100'
          }`}
        >
          {/* Ambient glow */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-500/[0.04] blur-[120px] intro-glow" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-purple-500/[0.06] blur-[80px] intro-glow-delayed" />
          </div>

          {/* Horizontal line sweep */}
          <div className="absolute top-1/2 left-0 w-full h-px intro-line-sweep">
            <div className="h-full bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
          </div>

          {/* Name */}
          <h1 className="relative font-serif-display text-5xl md:text-7xl font-light tracking-[-0.04em] text-zinc-900 dark:text-white intro-name">
            MINHAJ
          </h1>

          {/* Tagline */}
          <p className="relative mt-4 text-[11px] md:text-xs uppercase tracking-[0.35em] text-zinc-500 font-medium intro-tagline">
            Full Stack Developer
          </p>

          {/* Thin progress bar */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-32 h-[2px] rounded-full bg-white/5 overflow-hidden">
            <div className="h-full bg-blue-500/60 rounded-full intro-progress" />
          </div>
        </div>
      )}
      {/* Animated gradient background */}
      <div className="mesh-gradient" />
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="gradient-animated absolute inset-0 opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-zinc-950 to-zinc-950" />
      </div>

      {/* Glassmorphic Navigation */}
      <nav className={`
        fixed top-0 z-50 w-full transition-all duration-500
        ${scrolled ? 'py-3 translate-y-0' : 'py-5 translate-y-2'}
        ${siteReady ? 'animate-nav-enter' : 'opacity-0'}
      `}>
        <div className="mx-auto max-w-5xl px-6">
          <div className={`
            mx-auto transition-all duration-500 rounded-full border
            ${scrolled 
              ? 'dark:bg-black/60 bg-white/80 backdrop-blur-2xl dark:border-white/[0.06] border-black/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.12)] px-8 py-3' 
              : 'bg-transparent border-transparent px-0 py-0'
            }
          `}>
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold tracking-tighter text-zinc-900 dark:text-white font-serif-display text-lg">
                MINHAJ
              </h2>
              <div className="flex gap-10 items-center">
                {['About', 'Work', 'Experience', 'Skills', 'Contact'].map((item) => (
                  <a 
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={(e) => scrollToSection(e, item.toLowerCase())}
                    className="text-[10px] font-medium uppercase tracking-[0.15em] text-zinc-500 transition-all duration-300 hover:text-white relative after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-0 after:bg-blue-400 after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {item}
                  </a>
                ))}
                <a
                  href="/MINHAJ.pdf"
                  download
                  className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-blue-400 hover:bg-blue-500/20 hover:border-blue-400/40 transition-all"
                >
                  Resume
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className={`pt-0 ${siteReady ? 'animate-content-enter' : 'opacity-0'}`}>
        <AboutSection />
        <FeaturedWork />
        <ExperienceTimeline />
        <TechStack />
        <div className="bg-zinc-900/10 backdrop-blur-3xl py-12">
          <SkillsSection />
        </div>
        <ContactSection />     
      </main>

      {/* Elite Footer */}
      <footer className="relative border-t border-white/[0.04] dark:border-white/[0.04] border-black/[0.04] py-24 dark:bg-black/80 bg-zinc-100/90 backdrop-blur-xl overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/[0.03] blur-[120px] rounded-full" />
        </div>
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div>
              <h3 className="font-serif-display text-2xl font-light text-white mb-3">Minhaj</h3>
              <p className="text-xs text-zinc-500 leading-relaxed max-w-xs">
                Full Stack Developer crafting complete digital solutions from concept to production.
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-semibold mb-4">Navigation</p>
              <div className="flex flex-col gap-2">
                {['About', 'Work', 'Experience', 'Skills', 'Contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={(e) => scrollToSection(e, item.toLowerCase())}
                    className="text-xs text-zinc-500 hover:text-white transition-colors w-fit"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-semibold mb-4">Connect</p>
              <div className="flex flex-col gap-2">
                <a href="mailto:minhajbinhafsahnazer@gmail.com" className="text-xs text-zinc-500 hover:text-white transition-colors w-fit">Email</a>
                <a href="https://github.com/minhajbinhafsahnazer" target="_blank" rel="noopener noreferrer" className="text-xs text-zinc-500 hover:text-white transition-colors w-fit">GitHub</a>
                <a href="https://www.linkedin.com/in/minhajpk/" target="_blank" rel="noopener noreferrer" className="text-xs text-zinc-500 hover:text-white transition-colors w-fit">LinkedIn</a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/[0.04] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-700 font-medium">
              Designed & Engineered by Minhaj
            </p>
            <p className="text-[10px] text-zinc-800">
              © 2026 • All rights reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
