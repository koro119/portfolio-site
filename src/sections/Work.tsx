import { workConfig } from '../config';
import { Reveal } from '../components/Reveal';
import { Briefcase } from 'lucide-react';

export function Work() {
  return (
    <section id="work" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/20 to-transparent" />
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[300px] bg-fuchsia-600/10 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-5 sm:px-8">
        <div className="max-w-3xl mx-auto">
          <Reveal className="text-center mb-12">
            <span className="section-label">04 · Work</span>
            <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gradient">
              {workConfig.heading}
            </h2>
          </Reveal>

          <Reveal className="text-center mb-10">
            <p className="text-lg text-violet-200/70 leading-relaxed">{workConfig.statement}</p>
          </Reveal>

          <Reveal className="mb-12">
            <p className="text-sm text-violet-200/50 leading-relaxed text-center max-w-xl mx-auto">
              {workConfig.intro}
            </p>
          </Reveal>

          {/* Roles */}
          <div className="space-y-6">
            {workConfig.roles.map((role, i) => (
              <Reveal key={role.role} delay={i * 100}>
                <div className="neo-card p-6 sm:p-7 flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="w-11 h-11 shrink-0 rounded-lg bg-gradient-to-br from-violet-500/25 to-fuchsia-500/25 border border-violet-400/20 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-violet-300" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-3">
                      <h3 className="text-lg font-semibold text-white">{role.role}</h3>
                      <span className="font-mono text-xs text-violet-200/40">{role.dates}</span>
                    </div>
                    <p className="text-sm text-violet-300/80 mb-3">{role.place}</p>
                    <ul className="space-y-1.5">
                      {role.points.map((point, j) => (
                        <li key={j} className="flex gap-2 text-sm text-violet-200/60 leading-relaxed">
                          <span className="text-fuchsia-400 mt-0.5">▸</span>
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
