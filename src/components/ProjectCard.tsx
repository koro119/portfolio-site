import { useState } from 'react';
import { ChevronDown, ExternalLink, FolderGit2 } from 'lucide-react';
import type { ArchiveProject } from '../hooks/useProjects';
import { Reveal } from './Reveal';

type Accent = 'purple' | 'cyan' | 'pink';

const ACCENT_STYLES: Record<
  Accent,
  { bar: string; glow: string; text: string; borderHover: string }
> = {
  purple: {
    bar: 'from-violet-400 to-purple-400',
    glow: 'group-hover:shadow-[0_0_40px_rgba(139,92,246,0.10)]',
    text: 'text-violet-300',
    borderHover: 'group-hover:border-violet-400/40',
  },
  cyan: {
    bar: 'from-cyan-400 to-teal-400',
    glow: 'group-hover:shadow-[0_0_40px_rgba(34,211,238,0.08)]',
    text: 'text-cyan-300',
    borderHover: 'group-hover:border-cyan-400/40',
  },
  pink: {
    bar: 'from-pink-400 to-rose-400',
    glow: 'group-hover:shadow-[0_0_40px_rgba(236,72,153,0.09)]',
    text: 'text-pink-300',
    borderHover: 'group-hover:border-pink-400/40',
  },
};

interface ProjectCardProps {
  project: ArchiveProject;
  accent?: Accent;
  index?: number;
  /** Extra badge shown in the card header, e.g. "no AI scaffolding". */
  badge?: string;
  badgeClass?: string;
  /** Lab-notebook treatment for conceptual experiments. */
  lab?: boolean;
}

export function ProjectCard({ project, accent = 'purple', index = 0, badge, badgeClass, lab }: ProjectCardProps) {
  const [open, setOpen] = useState(false);
  const s = ACCENT_STYLES[accent];

  return (
    <Reveal delay={(index % 3) * 90}>
      <article
        className={`neo-card group h-full flex flex-col overflow-hidden ${
          lab ? 'border-dashed border-pink-400/25' : ''
        } ${s.borderHover} ${s.glow}`}
      >
        {/* Accent bar */}
        <div className={`h-1 w-full bg-gradient-to-r ${s.bar} ${lab ? 'opacity-70' : ''}`} />

        <div className="p-6 sm:p-7 flex flex-col flex-1">
          {/* Header row */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2 min-w-0">
              <FolderGit2 className={`w-4 h-4 shrink-0 ${s.text}`} />
              <h3 className="text-lg font-semibold text-white leading-snug">{project.title}</h3>
            </div>
            {badge ? (
              <span className={`chip shrink-0 ${badgeClass ?? ''}`}>{badge}</span>
            ) : (
              <span className="chip shrink-0">{project.status}</span>
            )}
          </div>

          {lab && (
            <div className="font-mono text-[0.65rem] tracking-widest text-pink-300/70 mb-3">
              EXPERIMENT {String(index + 1).padStart(2, '0')} · {project.category.toUpperCase()}
            </div>
          )}

          <p className="text-sm text-violet-200/70 mb-3">{project.tagline}</p>

          <p className="text-sm text-violet-200/50 leading-relaxed mb-5 line-clamp-3">{project.summary}</p>

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
              <span className="font-mono text-violet-200/40">{project.dates}</span>
              {!badge && (
                <span className={`font-mono ${s.text} opacity-80`}>
                  {project.status}
                </span>
              )}
            </div>

            {/* How I Did It — expandable */}
            <div className="border-t border-violet-400/10 pt-3">
              <button
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                className="w-full flex items-center justify-between text-left text-sm text-violet-200/80 hover:text-white transition-colors"
              >
                <span className="font-medium">How I did it</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${open ? 'rotate-180' : ''} ${s.text}`}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ease-out ${
                  open ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="text-sm text-violet-200/60 leading-relaxed">{project.how ?? project.summary}</p>
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 mt-3 text-sm font-medium ${s.text} hover:brightness-125 transition-all`}
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
