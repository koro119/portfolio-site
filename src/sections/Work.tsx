import { workConfig } from '../config';
import { Reveal } from '../components/Reveal';
import { Briefcase } from 'lucide-react';

export function Work() {
  return (
    <section id="work" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="relative z-10 container mx-auto px-5 sm:px-8">
        <div className="max-w-3xl mx-auto">
          <Reveal className="text-left mb-12">
            <span className="section-label">04 · Work</span>
            <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-foreground">
              {workConfig.heading}
            </h2>
          </Reveal>

          <Reveal className="mb-10">
            <p className="text-lg text-meta leading-relaxed">{workConfig.statement}</p>
          </Reveal>

          <Reveal className="mb-12">
            <p className="text-sm text-meta-dim leading-relaxed max-w-xl">
              {workConfig.intro}
            </p>
          </Reveal>

          {/* Roles */}
          <div className="space-y-6">
            {workConfig.roles.map((role, i) => (
              <Reveal key={role.role} delay={i * 100}>
                <div className="glass p-6 sm:p-7 flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="w-11 h-11 shrink-0 border border-glass-border flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-steel" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-3">
                      <h3 className="text-lg font-medium text-foreground">{role.role}</h3>
                      <span className="font-mono text-xs text-meta-dim">{role.dates}</span>
                    </div>
                    <p className="text-sm text-steel-dim mb-3">{role.place}</p>
                    <ul className="space-y-1.5">
                      {role.points.map((point, j) => (
                        <li key={j} className="flex gap-2 text-sm text-meta leading-relaxed">
                          <span className="text-steel mt-0.5">▸</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
