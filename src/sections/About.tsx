import { aboutConfig } from '../config';
import { Reveal } from '../components/Reveal';
import { Quiz } from '../components/Quiz';

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="relative z-10 container mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <div>
            <Reveal>
              <span className="section-label">About</span>
              <h2 className="mt-4 text-4xl sm:text-5xl font-medium tracking-tight text-foreground">
                {aboutConfig.heading}
              </h2>
            </Reveal>

            <div className="mt-6 space-y-5">
              {aboutConfig.paragraphs.map((p, i) => (
                <Reveal key={i} delay={i * 100}>
                  <p className="text-base sm:text-lg text-meta leading-relaxed">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Image */}
          <Reveal delay={150}>
            <div className="relative mx-auto max-w-sm">
              <div className="aspect-[4/5] overflow-hidden border border-glass-border">
                <img
                  src={aboutConfig.image}
                  alt={aboutConfig.imageAlt}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </Reveal>
        </div>

        {/* Quiz widget */}
        <Reveal className="mt-20 sm:mt-24">
          <div className="max-w-2xl mx-auto">
            <Quiz />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
