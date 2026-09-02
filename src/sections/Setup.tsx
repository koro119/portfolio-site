import { setupConfig } from '../config';
import { SectionHeader } from '../components/SectionHeader';
import { Reveal } from '../components/Reveal';

export function Setup() {
  return (
    <section
      id="setup"
      className="relative py-24 sm:py-32"
      style={{ backgroundImage: 'linear-gradient(180deg, rgba(16,20,23,0.44), rgba(15,18,21,0.48))' }}
    >
      <div className="container mx-auto px-5 sm:px-8">
        <SectionHeader
          label="05 — My Setup"
          title={setupConfig.heading}
          subtitle={setupConfig.subtitle}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {setupConfig.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 60}>
              <div className="glass h-full p-6 hover:bg-card-hover hover:border-steel/40 transition-colors duration-200">
                <p className="font-mono text-[11px] tracking-widest text-steel uppercase mb-3">
                  {item.kicker}
                </p>
                <h3 className="text-base text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-meta leading-relaxed">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
