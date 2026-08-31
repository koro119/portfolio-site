import { useProjects } from '../hooks/useProjects';
import { SectionHeader } from '../components/SectionHeader';
import { ProjectCard } from '../components/ProjectCard';
import { Reveal } from '../components/Reveal';

export function FromScratch() {
  const projects = useProjects();

  return (
    <section id="from-scratch" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/15 to-transparent" />
      <div className="absolute bottom-1/4 -right-40 w-[420px] h-[420px] bg-cyan-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-5 sm:px-8">
        <SectionHeader
          label="02 · From Scratch"
          title="Hand-written, fundamentals first"
          subtitle="No AI scaffolding here — these prove the core computer science: data structures, algorithms, compilers, models written line by line. A different accent so you can tell the sections apart at a glance."
        />

        {projects ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.fromScratch.map((project, i) => (
              <ProjectCard
                key={project.slug}
                project={project}
                accent="cyan"
                index={i}
                badge="no AI scaffolding"
                badgeClass="chip-cyan"
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-violet-200/50 font-mono text-sm">
            loading projects.json…
          </p>
        )}

        <Reveal className="mt-12 text-center">
          <p className="text-sm text-violet-200/50 max-w-xl mx-auto">
            The earliest entry here is a colour-blindness game from 2023 — plain HTML, CSS and JS,
            where it all started. The coursework is grouped here because that's what it was:
            fundamentals, by hand.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
