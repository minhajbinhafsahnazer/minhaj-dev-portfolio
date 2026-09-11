'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroLoaderProps {
  onComplete: () => void;
}

export default function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const finishIntro = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 600);
  }, [onComplete]);

  // Smooth, fast, elegant progress (~1.8s)
  useEffect(() => {
    const startTime = performance.now();
    const duration = 5000;
    let animationFrameId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      
      // Smooth cubic bezier easing
      const eased = t < 0.5 
        ? 4 * t * t * t 
        : 1 - Math.pow(-2 * t + 2, 3) / 2;

      const current = Math.min(Math.round(eased * 100), 100);
      setProgress(current);

      if (t < 1) {
        animationFrameId = requestAnimationFrame(tick);
      } else {
        setProgress(100);
        setTimeout(() => {
          finishIntro();
        }, 150);
      }
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationFrameId);
  }, [finishIntro]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="intro-overlay"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: -20,
            transition: { duration: 0.6, ease: [0.65, 0, 0.35, 1] }
          }}
          className="intro-loader-container fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050507] text-white select-none overflow-hidden"
          onClick={finishIntro}
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
            <div className="w-[500px] h-[500px] rounded-full bg-blue-500/[0.04] blur-[120px]" />
          </div>

          {/* Center Brand Identity */}
          <div className="relative z-10 flex flex-col items-center text-center px-6">
            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="intro-loader-letter font-serif-display text-5xl sm:text-6xl md:text-7xl font-light tracking-[0.06em] text-white"
            >
              MINHAJ
            </motion.h1>

            {/* Minimal Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-3 text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-zinc-400 font-medium"
            >
              Full Stack Developer
            </motion.p>

            {/* Sleek Hairline Progress Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="mt-10 flex flex-col items-center gap-3"
            >
              <div className="w-32 sm:w-40 h-[2px] rounded-full bg-white/[0.08] overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-75 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Discreet Counter */}
              <span className="text-[10px] font-mono tracking-widest text-zinc-500">
                {progress}%
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
