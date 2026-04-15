import type { CSSProperties, ReactNode } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import './RevealOnScroll.css';

export interface RevealOnScrollProps {
  children: ReactNode;
  delay?: number;
  as?: 'div' | 'section' | 'article' | 'li';
  className?: string;
  style?: CSSProperties;
}

export function RevealOnScroll({
  children,
  delay = 0,
  as = 'div',
  className = '',
  style,
}: RevealOnScrollProps) {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>();
  const Component = as as 'div';

  return (
    <Component
      ref={ref}
      className={`reveal ${isVisible ? 'reveal--visible' : ''} ${className}`}
      style={{ ...style, transitionDelay: `${delay}ms` }}
    >
      {children}
    </Component>
  );
}
