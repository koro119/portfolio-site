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
      {/* Background: slate base */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#15191d_0%,#0c0e10_55%,#090b0d_100%)]" />

      <div className="relative z-10 container mx-auto px-5 sm:px-8 py-28 text-center">
        {/* Photo */}
        <Reveal>
          <div className="relative inline-block mb-9">
            <div className="w-36 h-36 sm:w-44 sm:h-44 overflow-hidden border border-glass-border">
              <img
                src={heroConfig.photo}
                alt={heroConfig.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </Reveal>

        {/* Name */}
        <Reveal delay={100}>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-medium tracking-tight text-foreground leading-[1.05]">
            {heroConfig.name}
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-5 font-mono text-sm sm:text-base text-steel tracking-wide">
            {heroConfig.tagline}
          </p>
        </Reveal>

        <Reveal delay={300}>
          <p className="mt-6 text-base sm:text-lg text-meta max-w-2xl mx-auto leading-relaxed">
            {heroConfig.intro}
          </p>
        </Reveal>

        <Reveal delay={400}>
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => scrollTo(heroConfig.ctaHref)}
              className="group px-8 py-3.5 bg-btn-fill text-ink font-medium hover:bg-btn-hover transition-colors duration-200"
            >
              <span className="inline-flex items-center gap-2">
                {heroConfig.ctaText} <ArrowDown className="w-4 h-4" />
              </span>
            </button>
            <button
              onClick={() => scrollTo('#work')}
              className="px-8 py-3.5 border border-glass-border text-meta hover:border-steel hover:text-foreground transition-colors duration-200"
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
                <div className="text-2xl sm:text-3xl font-medium text-foreground">{stat.value}</div>
                <div className="mt-1 text-xs text-meta-dim">{stat.label}</div>
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
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-meta-dim hover:text-foreground transition-colors"
      >
        <span className="text-[0.65rem] font-mono tracking-[0.25em] uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </a>
    </section>
  );
}
