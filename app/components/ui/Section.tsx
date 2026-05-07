import { ReactNode } from 'react';

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  noBorder?: boolean;
}

export default function Section({ id, children, className = '', noBorder = false }: SectionProps) {
  return (
    <section 
      id={id} 
      className={`
        min-h-screen 
        px-6 
        py-24 
        ${className}
      `}
    >
      <div className="mx-auto max-w-6xl">
        {children}
      </div>
    </section>
  );
}
