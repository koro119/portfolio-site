import { makingConfig } from '../config';
import { Reveal } from '../components/Reveal';
import { Code2 } from 'lucide-react';

export function MakingOf() {
  return (
    <section id="making" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/10 to-transparent" />

      <div className="relative z-10 container mx-auto px-5 sm:px-8">
        <div className="max-w-3xl mx-auto">
          <Reveal className="text-center mb-12">
            <span className="section-label">05 · Behind the scenes</span>
            <h2 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-white">
              {makingConfig.heading}
            </h2>
            <p className="mt-5 text-base sm:text-lg text-violet-200/60 leading-relaxed">
              {makingConfig.intro}
            </p>
          </Reveal>

          {/* Honest callout */}
          <Reveal>
            <div className="rounded-xl border border-cyan-400/20 bg-cyan-500/5 px-5 py-4 text-sm text-cyan-100/75 leading-relaxed mb-14">
              <span className="font-semibold text-cyan-200">The honest bit: </span>
              {makingConfig.honest}
            </div>
          </Reveal>

          {/* Timeline */}
          <div className="relative space-y-10">
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-violet-500/50 via-fuchsia-500/40 to-cyan-400/50" />
            {makingConfig.steps.map((step, i) => (
              <Reveal key={step.phase} delay={i * 80}>
                <div className="relative pl-9">
                  <span className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 border-violet-400 bg-[#0a0612] shadow-[0_0_12px_rgba(139,92,246,0.6)]" />
                  <p className="font-mono text-[0.7rem] tracking-widest text-cyan-300/70 uppercase mb-1.5">
                    {step.phase}
                  </p>
                  <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-violet-200/60 leading-relaxed">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14">
            <div className="flex items-start gap-3 rounded-xl border border-violet-400/20 bg-violet-500/5 px-5 py-4 text-sm text-violet-100/75 leading-relaxed">
              <Code2 className="w-4 h-4 shrink-0 mt-0.5 text-violet-300" />
              <p>{makingConfig.closing}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
