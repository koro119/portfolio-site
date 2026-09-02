import { ExternalLink } from 'lucide-react';
import type { ArchiveProject } from '../hooks/useProjects';
import { Reveal } from './Reveal';

interface ProjectRowProps {
  project: ArchiveProject;
  index?: number;
  badge?: string;
}

const isCoursework = (p: ArchiveProject) => p.category === 'University coursework';

/** Full-width row layout for the From Scratch section (90px / 1.1fr / 200px). */
export function ProjectRow({ project, index = 0, badge }: ProjectRowProps) {
  return (
    <Reveal>
      <article className="glass grid grid-cols-1 md:grid-cols-[90px_1.1fr_200px] gap-5 p-6 sm:p-7 hover:bg-card-hover hover:border-steel/40 transition-colors duration-200">
        {/* Index */}
        <div className="font-mono text-steel">
          {String(index + 1).padStart(2, '0')}
        </div>

        {/* Title + tagline */}
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-lg font-medium text-foreground leading-snug">{project.title}</h3>
            {badge && <span className="chip shrink-0">{badge}</span>}
            {isCoursework(project) && (
              <span className="chip chip-coursework shrink-0">coursework</span>
            )}
          </div>
          <p className="mt-2 text-sm text-meta">{project.tagline}</p>

          {/* Metrics / proof */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {project.metrics.map((m) => (
                <div key={m.label} className="border border-glass-border px-2.5 py-1.5">
                  <span className="font-mono text-steel tabular-nums">{m.value}</span>
                  <span className="text-[11px] text-meta-dim ml-1.5 uppercase tracking-wider">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-3 text-sm font-medium text-teal hover:brightness-125 transition-all"
            >
              Live demo <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        {/* Stack + meta */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-1.5">
            {project.stack.slice(0, 4).map((tech) => (
              <span key={tech} className="chip">
                {tech}
              </span>
            ))}
            {project.stack.length > 4 && <span className="chip">+{project.stack.length - 4}</span>}
          </div>
          <div className="mt-auto space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-meta-dim">{project.dates}</span>
              {project.status && <span className="font-mono text-steel">{project.status}</span>}
            </div>
            {project.timeline && (
              <div className="text-xs font-mono text-meta-dim">{project.timeline}</div>
            )}
          </div>
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-steel hover:brightness-125 transition-all"
            >
              View on GitHub <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </article>
    </Reveal>
  );
}
