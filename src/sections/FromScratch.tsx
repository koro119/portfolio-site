import { useProjects } from '../hooks/useProjects';
import { SectionHeader } from '../components/SectionHeader';
import { ProjectRow } from '../components/ProjectRow';
import { Reveal } from '../components/Reveal';

export function FromScratch() {
  const projects = useProjects();

  return (
    <section id="from-scratch" className="relative py-24 sm:py-32">
      <div className="container mx-auto px-5 sm:px-8">
        <SectionHeader
          label="03 — From Scratch"
          title="Hand-written, fundamentals first"
          subtitle="No AI scaffolding here — these prove the core computer science: data structures, algorithms, compilers, models written line by line."
        />

        {projects ? (
          <div className="grid gap-5">
            {projects.fromScratch.map((project, i) => (
              <ProjectRow
                key={project.slug}
                project={project}
                index={i}
                badge="no AI scaffolding"
              />
            ))}
          </div>
        ) : (
          <p className="text-meta-dim font-mono text-sm">
            loading projects.json…
          </p>
        )}

        <Reveal className="mt-10">
          <p className="text-sm text-meta-dim max-w-xl">
            The earliest entry here is a colour-blindness game from 2023 — plain HTML, CSS and JS,
            where it all started. The coursework is grouped here because that's what it was:
            fundamentals, by hand.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
