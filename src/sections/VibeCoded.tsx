import { useEffect, useState } from 'react';
import { useProjects } from '../hooks/useProjects';
import { SectionHeader } from '../components/SectionHeader';
import { ProjectCard } from '../components/ProjectCard';
import { Reveal } from '../components/Reveal';

const FILTERS = [
  { id: 'all', label: 'all' },
  { id: 'AI-assisted', label: 'AI-assisted' },
  { id: 'from-scratch', label: 'from-scratch' },
  { id: 'conceptual-experiment', label: 'conceptual-experiment' },
] as const;

type FilterId = (typeof FILTERS)[number]['id'];

function readFilterFromHash(): FilterId {
  if (typeof window === 'undefined') return 'all';
  const match = window.location.hash.match(/^#filter=(.+)$/);
  if (match && FILTERS.some((f) => f.id === match[1])) {
    return match[1] as FilterId;
  }
  return 'all';
}

export function VibeCoded() {
  const projects = useProjects();
  const [filter, setFilter] = useState<FilterId>(readFilterFromHash);

  useEffect(() => {
    const onHashChange = () => setFilter(readFilterFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const applyFilter = (id: FilterId) => {
    setFilter(id);
    // replaceState avoids the native anchor-scroll side effect of setting the hash.
    history.replaceState(null, '', `#filter=${id}`);
  };

  // portfolio-site is told in the "Making Of" section, not repeated as a card.
  const pool = projects?.all.filter((p) => p.slug !== 'portfolio-site') ?? [];
  const visible = filter === 'all' ? pool : pool.filter((p) => p.tags.includes(filter));

  return (
    <section
      id="AI-assisted"
      className="relative py-24 sm:py-32"
      style={{ backgroundImage: 'linear-gradient(180deg, rgba(21,25,29,0.20), rgba(19,23,27,0.28))' }}
    >
      <div className="container mx-auto px-5 sm:px-8">
        <SectionHeader
          label="02 — AI-Assisted"
          title="Built with AI — and proud of it"
          subtitle="These were built fast, with heavy AI assistance and my direction. I'm transparent about it on purpose: fast execution that ships a working product is a strength, not a secret."
        />

        {/* Honesty note */}
        <Reveal className="max-w-2xl mb-12">
          <div className="glass px-5 py-4 text-sm text-meta leading-relaxed">
            <span className="font-medium text-foreground">How to read this section: </span>
            AI tools do the typing; I do the architecture, the direction and the review. Every repo below
            is mine — the tool is the co-pilot, the decisions are mine.
          </div>
        </Reveal>

        {/* Tag filter */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => applyFilter(f.id)}
              className={`inline-flex items-center font-mono text-xs uppercase tracking-wider px-4 min-h-[44px] border transition-colors duration-200 ${
                filter === f.id
                  ? 'bg-btn-fill text-ink border-btn-fill'
                  : 'border-glass-border text-meta hover:border-steel hover:text-foreground'
              }`}
            >
              {f.label}
            </button>
          ))}
          <span className="ml-auto font-mono text-xs text-meta-dim tabular-nums">
            {projects ? `${visible.length} of ${projects.all.length}` : ''}
          </span>
        </div>

        {projects ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {visible.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
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
