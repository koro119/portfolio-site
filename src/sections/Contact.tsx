import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { contactConfig } from '../config';
import { Mail, Linkedin, Github, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = contentRef.current?.querySelectorAll('.animate-in');
      if (elements) {
        gsap.fromTo(
          elements,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const contactLinks = [
    {
      icon: Mail,
      label: 'Email',
      value: contactConfig.email,
      href: `mailto:${contactConfig.email}`,
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: contactConfig.linkedin,
      href: `https://${contactConfig.linkedin}`,
    },
    {
      icon: Github,
      label: 'GitHub',
      value: contactConfig.github,
      href: `https://${contactConfig.github}`,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-zinc-950" />

      {/* Decorative elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={contentRef} className="max-w-3xl mx-auto text-center">
          {/* Header */}
          <h2 className="animate-in text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            {contactConfig.title}
          </h2>
          <p className="animate-in text-lg text-zinc-400 mb-12">
            {contactConfig.subtitle}
          </p>

          {/* Contact Links */}
          <div className="animate-in grid sm:grid-cols-3 gap-6 mb-12">
            {contactLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-800/50 hover:border-zinc-700/50 transition-all duration-300"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors duration-300">
                    <link.icon className="w-5 h-5 text-zinc-400 group-hover:text-blue-400 transition-colors duration-300" />
                  </div>
                  <h3 className="text-sm font-medium text-zinc-500 mb-1">{link.label}</h3>
                  <p className="text-zinc-300 text-sm truncate max-w-full">{link.value}</p>
                </div>
                
                {/* Hover arrow */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowUpRight className="w-4 h-4 text-zinc-500" />
                </div>

                {/* Glow effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="animate-in">
            <a
              href={`mailto:${contactConfig.email}`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-zinc-200 transition-colors duration-300"
            >
              <Mail className="w-5 h-5" />
              {contactConfig.ctaText}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
