import { workConfig } from '../config';
import { Reveal } from '../components/Reveal';
import { SectionHeader } from '../components/SectionHeader';

export function Work() {
  return (
    <section
      id="work"
      className="relative py-24 sm:py-32"
      style={{ backgroundImage: 'linear-gradient(180deg, rgba(15,18,21,0.48), rgba(15,18,21,0.52))' }}
    >
      <div className="container mx-auto px-5 sm:px-8">
        <SectionHeader label="06 — Work" title={workConfig.heading} />

        <Reveal className="max-w-2xl">
          <p className="text-lg text-meta leading-relaxed">{workConfig.statement}</p>
          <p className="mt-4 text-sm text-meta-dim leading-relaxed">{workConfig.intro}</p>
        </Reveal>

        {/* Roles */}
        <div className="mt-12 grid gap-5">
          {workConfig.roles.map((role, i) => (
            <Reveal key={role.role} delay={i * 60}>
              <article className="glass grid grid-cols-1 md:grid-cols-[260px_1fr_200px] gap-5 p-6 sm:p-7 hover:bg-card-hover">
                <div>
                  <h3 className="text-lg font-medium text-foreground">{role.role}</h3>
                  <p className="mt-1 text-sm text-steel-dim">{role.place}</p>
                </div>

                <ul className="space-y-1.5">
                  {role.points.map((point, j) => (
                    <li key={j} className="flex gap-2 text-sm text-meta leading-relaxed">
                      <span className="text-steel mt-0.5">▸</span>
                      {point}
                    </li>
                  ))}
                </ul>

                <div className="font-mono text-xs text-meta-dim md:text-right">{role.dates}</div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
