"use client";

import { useEffect, useRef, useState } from "react";
import { FloatingShapes } from "./BackgroundAnimations";
import { useParallax } from "./useParallax";

const highlights = [
  {
    icon: "🎯",
    title: "Problem Solver",
    desc: "Turning complex requirements into elegant solutions",
  },
  {
    icon: "🚀",
    title: "Performance Focused",
    desc: "Building fast, optimized web applications",
  },
  {
    icon: "🤝",
    title: "Team Player",
    desc: "Collaborating effectively with cross-functional teams",
  },
  {
    icon: "📚",
    title: "Continuous Learner",
    desc: "Always exploring new technologies and best practices",
  },
];

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const parallax = useParallax(sectionRef, { speed: 0.15, scaleEffect: true });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 md:py-32 bg-section-alt relative overflow-hidden"
    >
      {/* Floating Geometric Shapes with Parallax */}
      <div
        className="absolute inset-0 z-0"
        style={{
          transform: `translateY(${parallax.y * 2}px)`,
        }}
      >
        <FloatingShapes />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
              About Me
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get to know me and what I do
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Passionate developer with a love for creating impactful digital
              experiences
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Image/Avatar */}
            <div className="relative order-2 lg:order-1">
              <div className="relative z-10 max-w-md mx-auto lg:mx-0">
                {/* Main card */}
                <div className="bg-card-bg rounded-2xl border border-card-border p-8 shadow-xl tilt-3d animated-border">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center text-4xl shadow-lg shine-effect morph-blob">
                      👨‍💻
                    </div>
                    <div>
                      <h3 className="text-xl font-bold gradient-text-animated">
                        Neil Patrick Escobar
                      </h3>
                      <p className="text-accent font-medium">
                        Full-Stack Developer
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-muted">
                      <svg
                        className="w-5 h-5 text-accent"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span>Philippines</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted">
                      <svg
                        className="w-5 h-5 text-accent"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <span>neilescobar1211@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted">
                      <svg
                        className="w-5 h-5 text-accent"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <span>3+ years experience</span>
                    </div>
                  </div>

                  <a
                    href="https://drive.google.com/file/d/1gLICD8GxHnfmWK19JHf2wliuy-kXLRFy/view?usp=drive_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 w-full px-6 py-3 bg-accent hover:bg-accent-hover text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Download Resume
                  </a>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/10 rounded-full blur-xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500/10 rounded-full blur-xl" />
              </div>
            </div>

            {/* Right side - Content */}
            <div className="order-1 lg:order-2 space-y-6">
              <div className="inline-flex items-center gap-2 text-accent font-semibold">
                <span className="w-12 h-0.5 bg-accent" />
                Who I Am
              </div>

              <h3 className="text-2xl md:text-3xl font-bold leading-tight">
                Turning ideas into reality through code and creativity
              </h3>

              <div className="space-y-4 text-muted text-lg leading-relaxed">
                <p>
                  Hello! I&apos;m Patrick, a passionate full-stack developer
                  based in the Philippines. I enjoy creating things that live on
                  the internet, whether that be websites, applications, or
                  anything in between.
                </p>
                <p>
                  I graduated with a bachelor&apos;s degree in Information
                  Technology and have been working in the software industry,
                  building scalable web applications and services. I&apos;ve had
                  the privilege of working with startups and established
                  companies, contributing to projects that serve thousands of
                  users.
                </p>
              </div>

              {/* Tech I work with */}
              <div className="pt-4">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted mb-4">
                  Tech I Work With
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "JavaScript",
                    "TypeScript",
                    "React",
                    "Next.js",
                    "Node.js",
                    "WordPress",
                    "PHP",
                    "MySQL",
                  ].map((tech) => (
                    <span key={tech} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 stagger-fade-in">
            {highlights.map((item, index) => (
              <div
                key={item.title}
                className="bg-card-bg border border-card-border rounded-xl p-6 hover-card tilt-3d gradient-border-hover"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className="text-3xl mb-4 bounce-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {item.icon}
                </div>
                <h4 className="font-semibold mb-2">{item.title}</h4>
                <p className="text-sm text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
