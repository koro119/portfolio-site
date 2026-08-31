import { useEffect, useState } from 'react';

const TARGET_MS = Date.UTC(2027, 6, 1, 10, 0, 0); // 1 July 2027, 10:00 UTC

const pad = (n: number) => String(n).padStart(2, '0');

export function Countdown() {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const remaining = Math.max(0, TARGET_MS - now);
  const days = Math.floor(remaining / 86_400_000);
  const hours = Math.floor((remaining % 86_400_000) / 3_600_000);
  const minutes = Math.floor((remaining % 3_600_000) / 60_000);
  const seconds = Math.floor((remaining % 60_000) / 1000);

  return (
    <div>
      <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-meta-dim mb-3">
        Graduation
      </p>
      <p className="font-mono text-4xl sm:text-5xl text-steel leading-none tabular-nums">
        {days}
      </p>
      <p className="mt-2 font-mono text-lg sm:text-xl text-foreground tabular-nums">
        {pad(hours)}:{pad(minutes)}:{pad(seconds)}
      </p>
      <p className="mt-3 text-xs text-meta-dim">
        days · hrs · min · sec until July 2027
      </p>
    </div>
  );
}
