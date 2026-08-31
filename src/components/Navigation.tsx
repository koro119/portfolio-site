import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navigationConfig } from '../config';
import { useActiveSection } from '../hooks/useActiveSection';

const SECTION_IDS = navigationConfig.items.map((item) => item.href.replace('#', ''));

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const active = useActiveSection(['hero', ...SECTION_IDS]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0a0612]/85 backdrop-blur-md border-b border-violet-500/10 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          <a
            href="#hero"
            onClick={(e) => go(e, '#hero')}
            className="text-lg font-bold tracking-tight text-white hover:text-violet-300 transition-colors"
          >
            {navigationConfig.logo}
            <span className="text-violet-400">/</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
              zylen
            </span>
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
                    ? 'text-violet-300'
                    : 'text-violet-200/60 hover:text-white'
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-px bg-gradient-to-r from-violet-400 to-cyan-400 transition-all duration-300 ${
                    isActive(item.href) ? 'w-full' : 'w-0'
                  }`}
                />
              </a>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            aria-label="Toggle menu"
            className="lg:hidden w-10 h-10 flex items-center justify-center text-violet-100 hover:text-white transition-colors"
            onClick={() => setIsOpen((v) => !v)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden bg-[#08040f]/97 backdrop-blur-xl transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-7">
          {navigationConfig.items.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => go(e, item.href)}
              className={`text-3xl font-semibold transition-all duration-500 ${
                isActive(item.href) ? 'text-violet-300' : 'text-white hover:text-violet-300'
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
