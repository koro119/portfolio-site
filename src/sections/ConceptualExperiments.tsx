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
    <section
      id="experiments"
      className="relative py-24 sm:py-32"
      style={{ backgroundImage: 'linear-gradient(180deg, rgba(17,21,25,0.36), rgba(16,20,23,0.44))' }}
    >
      <div className="container mx-auto px-5 sm:px-8">
        <SectionHeader
          label="04 — Conceptual Experiments"
          title="The lab notebook"
          subtitle="Ambitious, idea-first projects where the value is the thinking — not a polished product. These are experiments: the result is the finding."
        />

        {/* Lab-notebook framing note */}
        <Reveal className="max-w-2xl mb-12">
          <div className="glass border-dashed flex items-start gap-3 px-5 py-4 text-sm text-meta leading-relaxed">
            <FlaskConical className="w-4 h-4 shrink-0 mt-0.5 text-steel" />
            <p>
              <span className="font-medium text-foreground">Lab rules: </span>
              entries here are sketched, prototyped and often left unfinished on purpose. The
              architecture and the core idea are mine; the build was collaborative with AI tools.
              If it reads like a journal, that's correct.
            </p>
          </div>
        </Reveal>

        {projects ? (
          <div className="grid md:grid-cols-2 gap-5">
            {featured && (
              <div className="md:col-span-2">
                <ProjectCard
                  project={featured}
                  index={0}
                  badge="flagship experiment"
                  lab
                />
              </div>
            )}
            {rest.map((project, i) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={i + 1}
                lab
              />
            ))}

            {/* Open slots for future experiments */}
            <Reveal delay={150}>
              <div className="glass border-dashed h-full min-h-[240px] flex flex-col items-center justify-center text-center p-8">
                <div className="w-11 h-11 border border-dashed border-glass-border flex items-center justify-center mb-4">
                  <Plus className="w-5 h-5 text-steel" />
                </div>
                <p className="text-sm font-medium text-meta mb-1">Next experiments brewing</p>
                <p className="text-xs text-meta-dim leading-relaxed max-w-[220px]">
                  ZEO, Athena and other agent-type projects — slots open on the bench.
                </p>
              </div>
            </Reveal>
          </div>
        ) : (
          <p className="text-meta-dim font-mono text-sm">
            loading projects.json…
          </p>
        )}
      </div>
    </section>
  );
}
