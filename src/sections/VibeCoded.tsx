import { useProjects } from '../hooks/useProjects';
import { SectionHeader } from '../components/SectionHeader';
import { ProjectCard } from '../components/ProjectCard';
import { Reveal } from '../components/Reveal';

export function VibeCoded() {
  const projects = useProjects();

  return (
    <section id="AI-assisted" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="relative z-10 container mx-auto px-5 sm:px-8">
        <SectionHeader
          label="01 · AI-Assisted"
          title="Built with AI — and proud of it"
          subtitle="These were built fast, with heavy AI assistance and my direction. I'm transparent about it on purpose: fast execution that ships a working product is a strength, not a secret."
        />

        {/* Honesty note */}
        <Reveal className="max-w-2xl mx-auto mb-14">
          <div className="border border-glass-border bg-white/[0.02] px-5 py-4 text-sm text-meta leading-relaxed">
            <span className="font-medium text-foreground">How to read this section: </span>
            AI tools do the typing; I do the architecture, the direction and the review. Every repo below
            is mine — the tool is the co-pilot, the decisions are mine.
          </div>
        </Reveal>

        {projects ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.vibeCoded.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </div>
        ) : (
          <p className="text-center text-meta-dim font-mono text-sm">
            loading projects.json…
          </p>
        )}
      </div>
    </section>
  );
}
