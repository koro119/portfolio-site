import { useState } from 'react';
import { ChevronDown, ExternalLink, FolderGit2 } from 'lucide-react';
import type { ArchiveProject } from '../hooks/useProjects';
import { Reveal } from './Reveal';

interface ProjectCardProps {
  project: ArchiveProject;
  index?: number;
  /** Extra badge shown in the card header, e.g. "no AI scaffolding". */
  badge?: string;
  /** Lab-notebook treatment for conceptual experiments. */
  lab?: boolean;
}

export function ProjectCard({ project, index = 0, badge, lab }: ProjectCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <Reveal delay={(index % 3) * 90}>
      <article
        className={`glass group h-full flex flex-col overflow-hidden ${
          lab ? 'border-dashed border-glass-border' : ''
        }`}
      >
        <div className="p-6 sm:p-7 flex flex-col flex-1">
          {/* Header row */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2 min-w-0">
              <FolderGit2 className="w-4 h-4 shrink-0 text-steel" />
              <h3 className="text-lg font-medium text-foreground leading-snug">{project.title}</h3>
            </div>
            {badge ? (
              <span className="chip shrink-0">{badge}</span>
            ) : (
              <span className="chip shrink-0">{project.status}</span>
            )}
          </div>

          {lab && (
            <div className="font-mono text-[0.65rem] tracking-widest text-steel mb-3">
              EXPERIMENT {String(index + 1).padStart(2, '0')} · {project.category.toUpperCase()}
            </div>
          )}

          <p className="text-sm text-meta mb-3">{project.tagline}</p>

          <p className="text-sm text-meta leading-relaxed mb-5 line-clamp-3">{project.summary}</p>

          {/* Stack */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.stack.slice(0, 5).map((tech) => (
              <span key={tech} className="chip">
                {tech}
              </span>
            ))}
            {project.stack.length > 5 && <span className="chip">+{project.stack.length - 5}</span>}
          </div>

          {/* Footer */}
          <div className="mt-auto space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-meta-dim">{project.dates}</span>
              {!badge && (
                <span className="font-mono text-steel">
                  {project.status}
                </span>
              )}
            </div>

            {/* How I Did It — expandable */}
            <div className="border-t border-glass-border pt-3">
              <button
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                className="w-full flex items-center justify-between text-left text-sm min-h-[44px] text-meta hover:text-foreground transition-colors"
              >
                <span className="font-medium">How I did it</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${open ? 'rotate-180' : ''} text-steel`}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ease-out ${
                  open ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="text-sm text-meta leading-relaxed">{project.how ?? project.summary}</p>
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-3 text-sm font-medium text-steel hover:brightness-125 transition-all"
                    >
                      View on GitHub <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
