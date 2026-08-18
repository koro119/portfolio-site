import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skillsConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

export function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Categories animation
      const categories = categoriesRef.current?.querySelectorAll('.skill-category');
      if (categories) {
        categories.forEach((category, catIndex) => {
          gsap.fromTo(
            category,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: catIndex * 0.15,
              scrollTrigger: {
                trigger: category,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );

          // Animate progress bars
          const progressBars = category.querySelectorAll('.progress-bar');
          progressBars.forEach((bar, barIndex) => {
            const level = parseInt(bar.getAttribute('data-level') || '0');
            gsap.fromTo(
              bar,
              { width: '0%' },
              {
                width: `${level}%`,
                duration: 1,
                delay: catIndex * 0.15 + barIndex * 0.1 + 0.3,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: category,
                  start: 'top 85%',
                  toggleActions: 'play none none reverse',
                },
              }
            );
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            {skillsConfig.title}
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            {skillsConfig.subtitle}
          </p>
        </div>

        {/* Skills Grid */}
        <div
          ref={categoriesRef}
          className="grid md:grid-cols-2 gap-8 lg:gap-12"
        >
          {skillsConfig.categories.map((category, catIndex) => (
            <div
              key={catIndex}
              className="skill-category bg-zinc-900/30 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-zinc-800/50"
            >
              <h3 className="text-xl font-semibold mb-6 text-white">
                {category.name}
              </h3>

              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-zinc-300 text-sm">{skill.name}</span>
                      <span className="text-zinc-500 text-sm">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="progress-bar h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                        data-level={skill.level}
                        style={{ width: '0%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Skill tags */}
        <div className="mt-16 flex flex-wrap justify-center gap-3">
          {['Python', 'Machine Learning', 'Computer Vision', 'Raspberry Pi', 'Git', 'Linux', 'OOP', 'CNN', 'OpenCV'].map((tag, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded-full text-sm text-zinc-300 hover:bg-zinc-700/50 hover:border-zinc-600/50 transition-all duration-300 cursor-default"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
