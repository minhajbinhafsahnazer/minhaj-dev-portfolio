'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.button
      onClick={toggle}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      className={`
        fixed right-5 top-1/2 -translate-y-1/2 z-50
        flex flex-col items-center gap-3
        rounded-full border px-2.5 py-4
        transition-all duration-300
        ${isDark
          ? 'bg-white/[0.04] border-white/10 text-zinc-400 hover:bg-white/[0.08] hover:text-white hover:border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)]'
          : 'bg-white/80 border-black/10 text-zinc-500 hover:bg-white hover:text-zinc-900 shadow-[0_4px_24px_rgba(0,0,0,0.08)]'
        }
        backdrop-blur-md
      `}
    >
      {/* Icon */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
          transition={{ duration: 0.2 }}
          className="block"
        >
          {isDark ? (
            // Sun
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            // Moon
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </motion.span>
      </AnimatePresence>

      {/* Vertical label */}
      <span
        className="text-[8px] uppercase tracking-[0.2em] font-medium"
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
      >
        {isDark ? 'Light' : 'Dark'}
      </span>
    </motion.button>
  );
}
