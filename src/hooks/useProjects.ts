import { useEffect, useState } from 'react';

export interface Metric {
  label: string;
  value: string;
}

export interface ArchiveProject {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  /** Process-focused "how I did it" — distinct from the summary. */
  how?: string;
  category: string;
  tags: string[];
  stack: string[];
  status: string;
  dates: string;
  files: number;
  repo: string;
  localPath: string;
  /** Foreground this project in its section. */
  featured?: boolean;
  /** Ordering for featured projects (higher first). */
  sortWeight?: number;
  /** Hard numbers / proof points shown on the card. */
  metrics?: Metric[];
  demoUrl?: string;
  demoGif?: string;
  /** Honest context for the repo's git history. */
  timeline?: string;
}

export interface ProjectsFeed {
  generated: string;
  count: number;
  projects: ArchiveProject[];
}

export interface GroupedProjects {
  vibeCoded: ArchiveProject[];
  fromScratch: ArchiveProject[];
  conceptual: ArchiveProject[];
  all: ArchiveProject[];
}

export interface FeaturedSplit {
  featured: ArchiveProject[];
  rest: ArchiveProject[];
}

/** Splits a group into featured (sorted by sortWeight desc) and the rest. */
export function partitionFeatured(projects: ArchiveProject[]): FeaturedSplit {
  const featured = projects
    .filter((p) => p.featured)
    .sort((a, b) => (b.sortWeight ?? 0) - (a.sortWeight ?? 0));
  const rest = projects.filter((p) => !p.featured);
  return { featured, rest };
}

/**
 * Loads the machine-readable projects feed (/projects.json) and groups
 * projects into the three portfolio sections by their tags.
 *
 * A project with both `conceptual-experiment` and another tag is treated
 * as a conceptual experiment — the finding, not the product.
 */
export function useProjects(): GroupedProjects | null {
  const [feed, setFeed] = useState<ProjectsFeed | null>(null);

  useEffect(() => {
    const url = `${import.meta.env.BASE_URL}projects.json`;
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load ${url}`);
        return res.json();
      })
      .then((data: ProjectsFeed) => setFeed(data))
      .catch((err) => {
        console.error('[projects] failed to load feed:', err);
        setFeed(null);
      });
  }, []);

  if (!feed) return null;

  const all = [...feed.projects];

  // This very site is itself an AI-assisted project — it gets told in the
  // "Making Of" section instead of repeating itself as a card.
  const vibeCoded = all.filter(
    (p) => p.tags.includes('AI-assisted') && !p.tags.includes('conceptual-experiment') && p.slug !== 'portfolio-site'
  );

  const fromScratch = all.filter((p) => p.tags.includes('from-scratch'));

  const conceptual = all.filter((p) => p.tags.includes('conceptual-experiment'));

  return { vibeCoded, fromScratch, conceptual, all };
}
