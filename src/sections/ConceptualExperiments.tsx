import { useProjects } from '../hooks/useProjects';
import { SectionHeader } from '../components/SectionHeader';
import { ProjectCard } from '../components/ProjectCard';
import { Reveal } from '../components/Reveal';
import { FlaskConical, Plus } from 'lucide-react';

export function ConceptualExperiments() {
  const projects = useProjects();

  // Neonate (the learning agent) is the flagship experiment: feature it first.
  const conceptual = projects?.conceptual ?? [];
  const featured = conceptual.find((p) => p.slug === 'idea-50-sim');
  const rest = conceptual.filter((p) => p.slug !== 'idea-50-sim');

  return (
    <section id="experiments" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-950/15 to-transparent" />
      <div className="absolute top-1/4 -right-32 w-[400px] h-[400px] bg-pink-600/10 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-5 sm:px-8">
        <SectionHeader
          label="03 · Conceptual Experiments"
          title="The lab notebook"
          subtitle="Ambitious, idea-first projects where the value is the thinking — not a polished product. These are experiments: the result is the finding."
        />

        {/* Lab-notebook framing note */}
        <Reveal className="max-w-2xl mx-auto mb-14">
          <div className="flex items-start gap-3 rounded-xl border border-dashed border-pink-400/25 bg-pink-500/5 px-5 py-4 text-sm text-pink-100/70 leading-relaxed">
            <FlaskConical className="w-4 h-4 shrink-0 mt-0.5 text-pink-300" />
            <p>
              <span className="font-semibold text-pink-200">Lab rules: </span>
              entries here are sketched, prototyped and often left unfinished on purpose. The
              architecture and the core idea are mine; the build was collaborative with AI tools.
              If it reads like a journal, that's correct.
            </p>
          </div>
        </Reveal>

        {projects ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured && (
              <div className="md:col-span-2 lg:col-span-3">
                <ProjectCard
                  project={featured}
                  accent="pink"
                  index={0}
                  badge="flagship experiment"
                  badgeClass="chip-pink"
                  lab
                />
              </div>
            )}
            {rest.map((project, i) => (
              <ProjectCard
                key={project.slug}
                project={project}
                accent="pink"
                index={i + 1}
                lab
              />
            ))}

            {/* Open slots for future experiments */}
            <Reveal delay={150}>
              <div className="neo-card border-dashed border-violet-400/20 h-full min-h-[240px] flex flex-col items-center justify-center text-center p-8">
                <div className="w-11 h-11 rounded-full border border-dashed border-violet-400/40 flex items-center justify-center mb-4">
                  <Plus className="w-5 h-5 text-violet-300/70" />
                </div>
                <p className="text-sm font-medium text-violet-200/70 mb-1">Next experiments brewing</p>
                <p className="text-xs text-violet-200/40 leading-relaxed max-w-[220px]">
                  ZEO, Athena and other agent-type projects — slots open on the bench.
                </p>
              </div>
            </Reveal>
          </div>
        ) : (
          <p className="text-center text-violet-200/50 font-mono text-sm">
            loading projects.json…
          </p>
        )}
      </div>
    </section>
  );
}
