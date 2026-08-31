import { makingConfig } from '../config';
import { Reveal } from '../components/Reveal';
import { SectionHeader } from '../components/SectionHeader';
import { Code2 } from 'lucide-react';

export function MakingOf() {
  return (
    <section
      id="making"
      className="relative py-24 sm:py-32"
      style={{ backgroundImage: 'linear-gradient(180deg, rgba(15,18,21,0.52), rgba(14,20,21,0.60))' }}
    >
      <div className="container mx-auto px-5 sm:px-8">
        <SectionHeader
          label="06 — Behind the scenes"
          title={makingConfig.heading}
          subtitle={makingConfig.intro}
        />

        {/* Honest callout */}
        <Reveal className="max-w-2xl mb-12">
          <div className="glass px-5 py-4 text-sm text-meta leading-relaxed">
            <span className="font-medium text-foreground">The honest bit: </span>
            {makingConfig.honest}
          </div>
        </Reveal>

        {/* Steps — five equal columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
          {makingConfig.steps.map((step, i) => (
            <Reveal key={step.phase} delay={i * 60}>
              <div className="glass h-full p-6 hover:bg-card-hover">
                <p className="font-mono text-[11px] tracking-widest text-steel uppercase mb-3">
                  {step.phase}
                </p>
                <h3 className="text-base text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-meta leading-relaxed">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Closing statement — teal accent */}
        <Reveal className="mt-5">
          <div className="glass border-teal flex items-start gap-3 px-5 py-4 text-sm text-meta leading-relaxed">
            <Code2 className="w-4 h-4 shrink-0 mt-0.5 text-teal" />
            <p>{makingConfig.closing}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
