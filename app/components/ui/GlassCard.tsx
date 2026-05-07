import { ReactNode, useRef, useState } from 'react';

interface GlassCardProps {
  children: ReactNode;
  variant?: 'subtle' | 'normal' | 'strong' | 'ultra';
  className?: string;
  hover?: boolean;
  glow?: 'blue' | 'purple' | 'pink' | 'none';
  shimmer?: boolean;
  spotlight?: boolean;
}

export default function GlassCard({ 
  children, 
  variant = 'normal', 
  className = '', 
  hover = false,
  glow = 'none',
  shimmer = false,
  spotlight = true
}: GlassCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || !spotlight) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  const variantClasses = {
    subtle: 'glass-subtle',
    normal: 'glass',
    strong: 'glass-strong',
    ultra: 'glass-ultra',
  };

  const glowClasses = {
    blue: 'glow-blue',
    purple: 'glow-purple',
    pink: 'glow-pink',
    none: '',
  };

  const hoverClass = hover 
    ? 'transition-glass hover:bg-black/5 dark:hover:bg-white/10 hover:border-black/10 dark:hover:border-white/20' 
    : '';

  const shimmerClass = shimmer ? 'shimmer' : '';

  return (
    <div 
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`
        relative overflow-hidden
        ${variantClasses[variant]} 
        ${glowClasses[glow]}
        ${hoverClass} 
        ${shimmerClass}
        rounded-xl 
        border border-black/[0.08] dark:border-white/[0.08]
        ${className}
      `}
    >
      {spotlight && (
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 spotlight-overlay"
          style={{
            opacity,
            '--x': `${position.x}px`,
            '--y': `${position.y}px`,
          } as any}
        />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
