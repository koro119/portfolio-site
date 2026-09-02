import { useProjects, partitionFeatured } from '../hooks/useProjects';
import { SectionHeader } from '../components/SectionHeader';
import { ProjectCard } from '../components/ProjectCard';
import { AlsoExplored } from '../components/AlsoExplored';
import { Reveal } from '../components/Reveal';

export function VibeCoded() {
  const projects = useProjects();
  const { featured, rest } = projects
    ? partitionFeatured(projects.vibeCoded)
    : { featured: [], rest: [] };

  return (
    <section
      id="AI-assisted"
      className="relative py-24 sm:py-32"
      style={{ backgroundImage: 'linear-gradient(180deg, rgba(21,25,29,0.20), rgba(19,23,27,0.28))' }}
    >
      <div className="container mx-auto px-5 sm:px-8">
        <SectionHeader
          label="02 — AI-Assisted"
          title="Built fast — and proud of it"
          subtitle="These shipped fast because I moved fast — the architecture, direction and review are mine, and I use every tool that gets me there. Speed that ships is a strength."
        />

        {/* Honesty note */}
        <Reveal className="max-w-2xl mb-12">
          <div className="glass px-5 py-4 text-sm text-meta leading-relaxed">
            <span className="font-medium text-foreground">How to read this section: </span>
            Every repo below is mine — I designed it, directed it and reviewed it. I use the best tools
            available, but the ownership is mine.
          </div>
        </Reveal>

        {projects ? (
          <>
            <div className="grid md:grid-cols-2 gap-5">
              {featured.map((project, i) => (
                <ProjectCard key={project.slug} project={project} index={i} />
              ))}
            </div>
            <AlsoExplored projects={rest} />
          </>
        ) : (
          <p className="text-meta-dim font-mono text-sm">
            loading projects.json…
          </p>
        )}
      </div>
    </section>
  );
}
