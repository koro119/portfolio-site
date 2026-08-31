import { makingConfig } from '../config';
import { Reveal } from '../components/Reveal';
import { Code2 } from 'lucide-react';

export function MakingOf() {
  return (
    <section id="making" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="relative z-10 container mx-auto px-5 sm:px-8">
        <div className="max-w-3xl mx-auto">
          <Reveal className="text-left mb-12">
            <span className="section-label">05 · Behind the scenes</span>
            <h2 className="mt-4 text-4xl sm:text-5xl font-medium tracking-tight text-foreground">
              {makingConfig.heading}
            </h2>
            <p className="mt-5 text-base sm:text-lg text-meta leading-relaxed">
              {makingConfig.intro}
            </p>
          </Reveal>

          {/* Honest callout */}
          <Reveal>
            <div className="border border-glass-border bg-white/[0.02] px-5 py-4 text-sm text-meta leading-relaxed mb-14">
              <span className="font-medium text-foreground">The honest bit: </span>
              {makingConfig.honest}
            </div>
          </Reveal>

          {/* Timeline */}
          <div className="relative space-y-10">
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-steel/20" />
            {makingConfig.steps.map((step, i) => (
              <Reveal key={step.phase} delay={i * 80}>
                <div className="relative pl-9">
                  <span className="absolute left-0 top-1.5 w-[15px] h-[15px] border-2 border-steel bg-background" />
                  <p className="font-mono text-[0.7rem] tracking-widest text-steel uppercase mb-1.5">
                    {step.phase}
                  </p>
                  <h3 className="text-lg font-medium text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-meta leading-relaxed">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14">
            <div className="flex items-start gap-3 border border-glass-border bg-white/[0.02] px-5 py-4 text-sm text-meta leading-relaxed">
              <Code2 className="w-4 h-4 shrink-0 mt-0.5 text-steel" />
              <p>{makingConfig.closing}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
