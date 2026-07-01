'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  as?: 'a' | 'button';
  href?: string;
  download?: boolean;
  target?: string;
  rel?: string;
  onClick?: (e: React.MouseEvent) => void;
  strength?: number;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  suppressHydrationWarning?: boolean;
}

export default function MagneticButton({
  children,
  className = '',
  as = 'a',
  href,
  download,
  target,
  rel,
  onClick,
  strength = 0.3,
  type,
  disabled,
  suppressHydrationWarning,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setPosition({
      x: (e.clientX - centerX) * strength,
      y: (e.clientY - centerY) * strength,
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const Tag = as === 'button' ? motion.button : motion.a;

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <Tag
        href={as === 'a' ? href : undefined}
        download={as === 'a' ? download : undefined}
        target={as === 'a' ? target : undefined}
        rel={as === 'a' ? rel : undefined}
        onClick={onClick as any}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, mass: 0.5 }}
        className={className}
        type={as === 'button' ? type : undefined}
        disabled={as === 'button' ? disabled : undefined}
        suppressHydrationWarning={suppressHydrationWarning}
      >
        {children}
      </Tag>
    </div>
  );
}
