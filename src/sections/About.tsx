import { aboutConfig } from '../config';
import { Reveal } from '../components/Reveal';
import { Quiz } from '../components/Quiz';

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-violet-600/5 to-transparent" />

      <div className="relative z-10 container mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <div>
            <Reveal>
              <span className="section-label">About</span>
              <h2 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-white">
                {aboutConfig.heading}
              </h2>
            </Reveal>

            <div className="mt-6 space-y-5">
              {aboutConfig.paragraphs.map((p, i) => (
                <Reveal key={i} delay={i * 100}>
                  <p className="text-base sm:text-lg text-violet-200/60 leading-relaxed">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Image */}
          <Reveal delay={150}>
            <div className="relative mx-auto max-w-sm">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-violet-400/25 shadow-[0_0_70px_rgba(139,92,246,0.25)]">
                <img
                  src={aboutConfig.image}
                  alt={aboutConfig.imageAlt}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 w-32 h-32 border-2 border-fuchsia-500/30 rounded-2xl -z-10" />
              <div className="absolute -top-5 -left-5 w-24 h-24 bg-gradient-to-br from-cyan-400/25 to-violet-500/25 rounded-full blur-2xl -z-10" />
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
