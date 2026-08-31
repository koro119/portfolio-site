import { useEffect, useState } from 'react';

/**
 * Tracks which page section is currently in view for nav highlighting.
 * Returns the id of the section whose top is nearest above the upper
 * third of the viewport (or the last section when scrolled to the bottom).
 */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? '');

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;

    const compute = () => {
      const probe = Math.min(window.scrollY + window.innerHeight * 0.35, document.body.scrollHeight - 4);
      let current = ids[0] ?? '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= probe) current = id;
      }
      setActive(current);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    if (isReduced) compute();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ids.join('|')]);

  return active;
}
