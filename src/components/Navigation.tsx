import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navigationConfig } from '../config';
import { useActiveSection } from '../hooks/useActiveSection';

const SECTION_IDS = navigationConfig.items.map((item) => item.href.replace('#', ''));

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const active = useActiveSection(['hero', ...SECTION_IDS]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  const isActive = (href: string) => active === href.replace('#', '');

  return (
    <>
      <nav
        style={{
          background: 'rgba(18, 21, 24, 0.55)',
          backdropFilter: 'blur(56px) saturate(1.35)',
          WebkitBackdropFilter: 'blur(56px) saturate(1.35)',
          boxShadow: '0 10px 30px rgba(8, 10, 12, 0.30)',
        }}
        className="sticky top-0 z-50 border-b border-glass-border py-3"
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          <a
            href="#hero"
            onClick={(e) => go(e, '#hero')}
            className="text-lg font-medium text-foreground hover:text-steel transition-colors"
          >
            <span className="font-mono typewriter">{navigationConfig.logo}</span>
            <span className="typewriter-caret" aria-hidden="true" />
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navigationConfig.items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => go(e, item.href)}
                className={`relative text-sm transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-steel'
                    : 'text-meta hover:text-foreground'
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-px bg-steel transition-all duration-300 ${
                    isActive(item.href) ? 'w-full' : 'w-0'
                  }`}
                />
              </a>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            aria-label="Toggle menu"
            className="lg:hidden w-10 h-10 flex items-center justify-center text-foreground/90 hover:text-foreground transition-colors"
            onClick={() => setIsOpen((v) => !v)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden bg-[#0c0e10]/97 backdrop-blur-xl transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-7">
          {navigationConfig.items.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => go(e, item.href)}
              className={`text-3xl font-medium transition-all duration-500 ${
                isActive(item.href) ? 'text-steel' : 'text-foreground hover:text-steel'
              }`}
              style={{
                transform: isOpen ? 'translateY(0)' : 'translateY(24px)',
                opacity: isOpen ? 1 : 0,
                transitionDelay: `${i * 0.06}s`,
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
