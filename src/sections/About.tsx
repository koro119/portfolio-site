import { aboutConfig } from '../config';
import { Reveal } from '../components/Reveal';
import { SectionHeader } from '../components/SectionHeader';
import { Quiz } from '../components/Quiz';

export function About() {
  return (
    <section
      id="about"
      className="relative py-24 sm:py-32"
      style={{ backgroundImage: 'linear-gradient(180deg, rgba(23,27,31,0.12), rgba(21,25,29,0.20))' }}
    >
      <div className="container mx-auto px-5 sm:px-8">
        <SectionHeader label="01 — About" title={aboutConfig.heading} />

        <div className="grid lg:grid-cols-2 gap-5 items-start">
          {/* Text panel */}
          <Reveal>
            <div className="glass p-8 sm:p-10">
              <div className="space-y-5">
                {aboutConfig.paragraphs.map((p, i) => (
                  <p key={i} className="text-base sm:text-lg text-meta leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Personality analyser quiz */}
          <Reveal delay={100}>
            <Quiz />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
