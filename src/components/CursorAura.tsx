import { useEffect, useRef } from 'react';

type Kind = 'core' | 'halo' | 'ring' | 'pool';

interface Follower {
  x: number;
  y: number;
  size: number;
  lerp: number;
  color: [number, number, number];
  alpha: number;
  kind: Kind;
}

/**
 * A page-wide cursor wave painted behind all content. Four lagging followers
 * are composited into a single multi-background each frame — no React state
 * is touched per frame. The layer is absolutely positioned (never fixed), so
 * it keeps working below the fold even where a backdrop-filter ancestor would
 * otherwise re-anchor a fixed layer.
 */
export function CursorAura() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let raf = 0;
    let mx = -100000;
    let my = -100000;

    const followers: Follower[] = [
      { x: mx, y: my, size: 170, lerp: 0.16, color: [214, 230, 240], alpha: 0.22, kind: 'core' },
      { x: mx, y: my, size: 240, lerp: 0.09, color: [160, 190, 205], alpha: 0.13, kind: 'halo' },
      { x: mx, y: my, size: 300, lerp: 0.05, color: [214, 224, 232], alpha: 0.09, kind: 'ring' },
      { x: mx, y: my, size: 360, lerp: 0.028, color: [63, 125, 120], alpha: 0.1, kind: 'pool' },
    ];

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
    };

    const render = (t: number) => {
      const time = t / 1000;

      for (const f of followers) {
        f.x += (mx - f.x) * f.lerp;
        f.y += (my - f.y) * f.lerp;
      }

      const layers = followers.map((f) => {
        const [r, g, b] = f.color;

        if (f.kind === 'core') {
          // Radius pulses ±6% at 1.6 rad/s
          const size = f.size * (1 + 0.06 * Math.sin(time * 1.6));
          return `radial-gradient(circle ${size}px at ${f.x}px ${f.y}px, rgba(${r},${g},${b},${f.alpha}) 0%, rgba(${r},${g},${b},0) 70%)`;
        }

        if (f.kind === 'ring') {
          // Transparent → colour → transparent, stops oscillating at 1.9 rad/s
          const osc = Math.sin(time * 1.9);
          const inner = f.size * (0.5 + 0.1 * osc);
          const outer = f.size * (0.72 + 0.1 * osc);
          return `radial-gradient(circle ${f.size}px at ${f.x}px ${f.y}px, transparent ${inner}px, rgba(${r},${g},${b},${f.alpha}) ${outer}px, transparent ${f.size}px)`;
        }

        return `radial-gradient(circle ${f.size}px at ${f.x}px ${f.y}px, rgba(${r},${g},${b},${f.alpha}) 0%, rgba(${r},${g},${b},0) 70%)`;
      });

      el.style.background = layers.join(', ');
      raf = requestAnimationFrame(render);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    raf = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none z-[-1]"
    />
  );
}
