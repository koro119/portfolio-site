import { Reveal } from './Reveal';

interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
  accent?: 'purple' | 'cyan' | 'pink';
}

export function SectionHeader({ label, title, subtitle, accent = 'purple' }: SectionHeaderProps) {
  return (
    <Reveal className="text-center mb-14 sm:mb-20">
      <span className="section-label" data-accent={accent}>{label}</span>
      <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-base sm:text-lg text-violet-200/60 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
