import { Reveal } from './Reveal';

interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
}

export function SectionHeader({ label, title, subtitle }: SectionHeaderProps) {
  return (
    <Reveal className="mb-12 sm:mb-16">
      <span className="section-label">{label}</span>
      <h2 className="mt-4 text-foreground">{title}</h2>
      {subtitle && (
        <p className="mt-5 text-base sm:text-lg text-meta max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
