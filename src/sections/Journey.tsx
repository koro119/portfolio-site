import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { journeyConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

export function Journey() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image sharpening effect on scroll
      gsap.fromTo(
        imageRef.current,
        { filter: 'blur(10px) grayscale(100%)', scale: 0.9 },
        {
          filter: 'blur(0px) grayscale(0%)',
          scale: 1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            end: 'center center',
            scrub: 1,
          },
        }
      );

      // Steps animation
      const steps = stepsRef.current?.querySelectorAll('.journey-step');
      if (steps) {
        steps.forEach((step, index) => {
          gsap.fromTo(
            step,
            { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              scrollTrigger: {
                trigger: step,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }
    }, sectionRef);

    // Particle animation
    const canvas = particlesRef.current;
    if (canvas) {
      const ctx2d = canvas.getContext('2d');
      if (ctx2d) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles: { x: number; y: number; size: number; speedX: number; speedY: number; opacity: number }[] = [];
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            opacity: Math.random() * 0.5 + 0.2,
          });
        }

        let animationId: number;
        const animate = () => {
          ctx2d.clearRect(0, 0, canvas.width, canvas.height);

          particles.forEach((particle) => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = canvas.height;
            if (particle.y > canvas.height) particle.y = 0;

            ctx2d.beginPath();
            ctx2d.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx2d.fillStyle = `rgba(100, 200, 255, ${particle.opacity})`;
            ctx2d.fill();
          });

          // Draw connections
          particles.forEach((p1, i) => {
            particles.slice(i + 1).forEach((p2) => {
              const dx = p1.x - p2.x;
              const dy = p1.y - p2.y;
              const distance = Math.sqrt(dx * dx + dy * dy);

              if (distance < 100) {
                ctx2d.beginPath();
                ctx2d.moveTo(p1.x, p1.y);
                ctx2d.lineTo(p2.x, p2.y);
                ctx2d.strokeStyle = `rgba(100, 200, 255, ${0.1 * (1 - distance / 100)})`;
                ctx2d.stroke();
              }
            });
          });

          animationId = requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);

        return () => {
          cancelAnimationFrame(animationId);
          window.removeEventListener('resize', handleResize);
        };
      }
    }

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      {/* Particle canvas */}
      <canvas
        ref={particlesRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.6 }}
      />

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-zinc-950" />

      <div ref={containerRef} className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            {journeyConfig.title}
          </h2>
          <p className="text-lg text-zinc-400">{journeyConfig.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Profile Image with sharpening effect */}
          <div ref={imageRef} className="relative flex justify-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80">
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-zinc-800">
                <img
                  src={journeyConfig.profileImage}
                  alt="Journey"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Orbiting elements */}
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
                <div className="absolute -top-2 left-1/2 w-4 h-4 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50" />
              </div>
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
                <div className="absolute top-1/2 -right-2 w-3 h-3 bg-cyan-500 rounded-full shadow-lg shadow-cyan-500/50" />
              </div>
              {/* Glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 blur-2xl -z-10 scale-125" />
            </div>
          </div>

          {/* Journey Steps */}
          <div ref={stepsRef} className="space-y-8">
            {journeyConfig.steps.map((step, index) => (
              <div
                key={index}
                className="journey-step relative pl-8 border-l-2 border-zinc-800"
              >
                {/* Step indicator */}
                <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 bg-zinc-900 border-2 border-blue-500 rounded-full" />
                
                <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-800/50 hover:border-zinc-700/50 transition-colors duration-300">
                  <p className="text-lg sm:text-xl text-zinc-300">
                    {step.text.split(step.highlight).map((part, i, arr) => (
                      <span key={i}>
                        {part}
                        {i < arr.length - 1 && (
                          <span className="text-blue-400 font-semibold">
                            {step.highlight}
                          </span>
                        )}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
