import { ChevronDown, ArrowDown } from 'lucide-react';
import { heroConfig } from '../config';
import { Reveal } from '../components/Reveal';

export function Hero() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background: deep violet-black with neon orbs + grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#1a0f33_0%,#08040f_55%,#050208_100%)]" />
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute top-1/4 -left-32 w-[480px] h-[480px] bg-violet-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-32 w-[420px] h-[420px] bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.4s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] bg-fuchsia-600/10 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-5 sm:px-8 py-28 text-center">
        {/* Photo */}
        <Reveal>
          <div className="relative inline-block mb-9">
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-2 border-violet-400/40 shadow-[0_0_40px_rgba(139,92,246,0.20)]">
              <img
                src={heroConfig.photo}
                alt={heroConfig.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-violet-500/25 via-fuchsia-500/15 to-cyan-400/25 blur-xl -z-10 scale-110" />
          </div>
        </Reveal>

        {/* Name */}
        <Reveal delay={100}>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.05]">
            {heroConfig.name.split(' ')[0]}{' '}
            <span className="text-gradient">{heroConfig.name.split(' ').slice(1).join(' ')}</span>
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-5 font-mono text-sm sm:text-base text-cyan-300/80 tracking-wide">
            {heroConfig.tagline}
          </p>
        </Reveal>

        <Reveal delay={300}>
          <p className="mt-6 text-base sm:text-lg text-violet-200/60 max-w-2xl mx-auto leading-relaxed">
            {heroConfig.intro}
          </p>
        </Reveal>

        <Reveal delay={400}>
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => scrollTo(heroConfig.ctaHref)}
              className="group relative px-8 py-3.5 rounded-full bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 text-white font-semibold overflow-hidden transition-transform duration-300 hover:scale-105 shadow-[0_0_24px_rgba(168,85,247,0.22)]"
            >
              <span className="relative z-10 inline-flex items-center gap-2">
                {heroConfig.ctaText} <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </span>
            </button>
            <button
              onClick={() => scrollTo('#work')}
              className="px-8 py-3.5 rounded-full border border-violet-400/25 text-violet-200/80 hover:border-cyan-400/50 hover:text-white transition-all duration-300"
            >
              The human side
            </button>
          </div>
        </Reveal>

        {/* Stats */}
        <Reveal delay={500}>
          <div className="mt-14 grid grid-cols-3 gap-6 max-w-lg mx-auto">
            {heroConfig.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
                <div className="mt-1 text-xs text-violet-200/50">{stat.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Scroll hint */}
      <a
        href="#about"
        onClick={(e) => {
          e.preventDefault();
          scrollTo('#about');
        }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-violet-200/40 hover:text-violet-200/80 transition-colors"
      >
        <span className="text-[0.65rem] font-mono tracking-[0.25em] uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </a>
    </section>
  );
}
