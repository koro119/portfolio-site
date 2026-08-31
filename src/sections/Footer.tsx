import { Mail, Github, Linkedin, ArrowUp } from 'lucide-react';
import { footerConfig, siteConfig, navigationConfig } from '../config';

export function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative border-t border-glass-border">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0c0e]" />

      <div className="relative z-10 container mx-auto px-5 sm:px-8 py-14">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-medium text-foreground">Zylen Saldahna</h3>
            <p className="mt-1.5 text-sm text-meta-dim max-w-xs">
              {footerConfig.tagline}
            </p>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navigationConfig.items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-meta hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Contact */}
          <div className="flex items-center gap-4">
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-10 h-10 border border-glass-border flex items-center justify-center text-meta hover:text-foreground hover:border-steel transition-all"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-10 h-10 border border-glass-border flex items-center justify-center text-meta hover:text-foreground hover:border-steel transition-all"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              aria-label="Email"
              className="w-10 h-10 border border-glass-border flex items-center justify-center text-meta hover:text-foreground hover:border-steel transition-all"
            >
              <Mail className="w-5 h-5" />
            </a>
            <button
              onClick={scrollTop}
              aria-label="Back to top"
              className="w-10 h-10 bg-btn-fill flex items-center justify-center text-ink hover:bg-btn-hover transition-colors"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-glass-border text-center">
          <p className="text-xs text-meta-dim">{footerConfig.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
