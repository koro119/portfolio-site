import { Mail, Github, Linkedin, ArrowUp } from 'lucide-react';
import { footerConfig, siteConfig, navigationConfig } from '../config';

export function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative border-t border-violet-500/10">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050208]" />

      <div className="relative z-10 container mx-auto px-5 sm:px-8 py-14">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-white">Zylen Saldahna</h3>
            <p className="mt-1.5 text-sm text-violet-200/50 max-w-xs">
              {footerConfig.tagline}
            </p>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navigationConfig.items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-violet-200/60 hover:text-white transition-colors"
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
              className="w-10 h-10 rounded-full border border-violet-400/20 flex items-center justify-center text-violet-200/70 hover:text-white hover:border-violet-400/60 hover:shadow-[0_0_18px_rgba(139,92,246,0.18)] transition-all"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-10 h-10 rounded-full border border-violet-400/20 flex items-center justify-center text-violet-200/70 hover:text-white hover:border-cyan-400/60 hover:shadow-[0_0_18px_rgba(34,211,238,0.18)] transition-all"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              aria-label="Email"
              className="w-10 h-10 rounded-full border border-violet-400/20 flex items-center justify-center text-violet-200/70 hover:text-white hover:border-pink-400/60 hover:shadow-[0_0_18px_rgba(236,72,153,0.18)] transition-all"
            >
              <Mail className="w-5 h-5" />
            </a>
            <button
              onClick={scrollTop}
              aria-label="Back to top"
              className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-400 to-purple-400 flex items-center justify-center text-white hover:scale-110 transition-transform shadow-[0_0_18px_rgba(168,85,247,0.25)]"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-violet-500/10 text-center">
          <p className="text-xs text-violet-200/30">{footerConfig.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
