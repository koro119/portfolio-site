import { ArrowDown } from 'lucide-react';
import { heroConfig } from '../config';
import { Reveal } from '../components/Reveal';
import { Countdown } from '../components/Countdown';

export function Hero() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const [first, ...rest] = heroConfig.name.split(' ');

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundImage: 'linear-gradient(180deg, rgba(26,30,34,0), rgba(23,27,31,0.12))' }}
    >
      <div className="relative z-10 container mx-auto px-5 sm:px-8 py-28">
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-5">
          {/* Left panel — eyebrow, name, intro, one CTA */}
          <Reveal className="glass p-8 sm:p-12 flex flex-col justify-center">
            <span className="section-label">{heroConfig.tagline}</span>
            <h1 className="mt-6 text-foreground">
              {first}
              <br />
              {rest.join(' ')}
            </h1>
            <p className="mt-7 text-base sm:text-lg text-meta leading-relaxed">
              {heroConfig.intro}
            </p>
            <div className="mt-9">
              <button
                onClick={() => scrollTo(heroConfig.ctaHref)}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-btn-fill text-ink font-medium hover:bg-btn-hover active:scale-[0.98] transition-all duration-200"
              >
                {heroConfig.ctaText} <ArrowDown className="w-4 h-4" />
              </button>
            </div>
          </Reveal>

          {/* Right column — stats, photo, countdown */}
          <div className="flex flex-col gap-5">
            {/* Stat row */}
            <Reveal delay={100}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {heroConfig.stats.map((stat) => (
                  <div key={stat.label} className="glass p-5 sm:p-6">
                    <div className="text-2xl sm:text-3xl font-medium text-foreground">
                      {stat.value}
                    </div>
                    <div className="mt-2 text-xs text-meta-dim">{stat.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Photo panel */}
            <Reveal delay={200}>
              <div className="glass overflow-hidden">
                <img
                  src={heroConfig.photo}
                  alt={heroConfig.name}
                  className="w-full aspect-[4/3] object-cover object-top"
                />
              </div>
            </Reveal>

            {/* Countdown panel */}
            <Reveal delay={300}>
              <div className="glass p-6" id="countdown">
                <Countdown />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
