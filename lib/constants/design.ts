// Design System Constants
export const COLORS = {
  gradients: {
    primary: 'from-blue-400 via-purple-400 to-pink-400',
    blue: 'from-blue-400 to-cyan-400',
    purple: 'from-purple-400 to-pink-400',
    pink: 'from-pink-400 to-rose-400',
  },
  glass: {
    subtle: 'rgba(255, 255, 255, 0.02)',
    light: 'rgba(255, 255, 255, 0.05)',
    medium: 'rgba(255, 255, 255, 0.1)',
    strong: 'rgba(255, 255, 255, 0.15)',
  },
} as const;

export const ANIMATIONS = {
  transitions: {
    fast: 'transition-all duration-150',
    normal: 'transition-all duration-300',
    slow: 'transition-all duration-500',
  },
  easings: {
    smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
    elastic: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
} as const;

export const SPACING = {
  section: 'px-6 py-24',
  container: 'mx-auto max-w-6xl',
} as const;
