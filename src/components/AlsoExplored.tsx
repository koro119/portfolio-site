import { useState } from 'react';
import { ChevronDown, ExternalLink } from 'lucide-react';
import type { ArchiveProject } from '../hooks/useProjects';

const isCoursework = (p: ArchiveProject) => p.category === 'University coursework';

/** Collapsible strip for non-featured projects, kept compact and out of the way. */
export function AlsoExplored({ projects }: { projects: ArchiveProject[] }) {
  const [open, setOpen] = useState(false);
  if (projects.length === 0) return null;

  return (
    <div className="mt-6">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-meta hover:text-foreground min-h-[44px] transition-colors"
      >
        Also explored ({projects.length})
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          {projects.map((p) => (
            <a
              key={p.slug}
              href={p.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="glass p-4 flex flex-col gap-1.5 hover:bg-card-hover hover:border-steel/40 transition-colors duration-200"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-medium text-foreground">{p.title}</span>
                <span className="flex items-center gap-2 shrink-0">
                  {isCoursework(p) && <span className="chip chip-coursework">coursework</span>}
                  {p.status && <span className="font-mono text-xs text-meta-dim">{p.status}</span>}
                </span>
              </div>
              <span className="text-sm text-meta">{p.tagline}</span>
              <span className="inline-flex items-center gap-1 text-xs text-steel">
                GitHub <ExternalLink className="w-3 h-3" />
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
