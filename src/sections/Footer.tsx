import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { footerConfig } from '../config';

export function Footer() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (marqueeRef.current) {
      const content = marqueeRef.current.querySelector('.marquee-content');
      if (content) {
        gsap.to(content, {
          x: '-50%',
          duration: 20,
          ease: 'none',
          repeat: -1,
        });
      }
    }
  }, []);

  return (
    <footer className="relative overflow-hidden">
      {/* Marquee */}
      <div
        ref={marqueeRef}
        className="py-8 border-t border-zinc-800/50 overflow-hidden"
      >
        <div className="marquee-content flex whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              className="text-6xl sm:text-7xl lg:text-8xl font-bold text-zinc-800/50 mx-8"
            >
              {footerConfig.marqueeText}
            </span>
          ))}
        </div>
      </div>

      {/* Footer content */}
      <div className="py-12 border-t border-zinc-800/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Logo/Name */}
            <div className="text-center sm:text-left">
              <h3 className="text-2xl font-bold text-white mb-1">Zylen Saldahna</h3>
              <p className="text-sm text-zinc-500">{footerConfig.tagline}</p>
            </div>

            {/* Navigation */}
            <nav className="flex flex-wrap justify-center gap-6">
              {['About', 'Projects', 'Skills', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm text-zinc-400 hover:text-white transition-colors duration-300"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-zinc-800/50 text-center">
            <p className="text-sm text-zinc-600">{footerConfig.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
