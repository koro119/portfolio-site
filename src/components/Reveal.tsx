import { useEffect, useRef, type ReactNode, type CSSProperties } from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Transition delay in ms — used for stagger effects. */
  delay?: number;
  as?: keyof HTMLElementTagNameMap;
}

/** Wraps content in a scroll-into-view reveal animation (IntersectionObserver + CSS). */
export function Reveal({ children, className = '', delay = 0, as = 'div' }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-visible');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Tag = as as 'div';
  const style: CSSProperties = delay ? ({ '--reveal-delay': `${delay}ms` } as CSSProperties) : {};

  return (
    <Tag ref={ref as never} className={`reveal ${className}`} style={style}>
      {children}
    </Tag>
  );
}
