"use client";

import { useEffect, useRef, useState } from "react";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
    <section id="about" ref={sectionRef} className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="flex items-center gap-4 text-2xl md:text-3xl font-bold mb-12">
            <span className="text-accent font-mono text-xl">01.</span>
            About Me
            <span className="h-px bg-card-border flex-1 max-w-xs" />
          </h2>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-4 text-muted">
              <p className="text-lg leading-relaxed">
                Hello! I&apos;m Patrick, a passionate full-stack developer based
                in the Philippines. I enjoy creating things that live on the
                internet, whether that be websites, applications, or anything in
                between. My goal is to always build products that provide
                pixel-perfect, performant experiences.
              </p>
              <p className="text-lg leading-relaxed">
                I graduated with a bachelor's degree in Information Technology
                and have been working in the software industry, building
                scalable web applications and services. I&apos;ve had the
                privilege of working with startups and established companies,
                contributing to projects that serve thousands of users.
              </p>
              <p className="text-lg leading-relaxed">
                When I&apos;m not coding, you can find me exploring new
                technologies, contributing to open-source projects, or sharing
                knowledge with the developer community.
              </p>

              <div className="pt-4">
                <p className="text-foreground font-medium mb-4">
                  Here are a few technologies I&apos;ve been working with
                  recently:
                </p>
                <ul className="grid grid-cols-2 gap-2 font-mono text-sm">
                  {[
                    "JavaScript (ES6+)",
                    "TypeScript",
                    "React / Next.js",
                    "Node.js",
                    "Python",
                    "PostgreSQL",
                    "AWS / GCP",
                    "Docker",
                  ].map((tech) => (
                    <li key={tech} className="flex items-center gap-2">
                      <span className="text-accent">▹</span>
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="relative group">
              <div className="relative z-10 rounded-lg overflow-hidden">
                <div className="w-full aspect-square bg-gradient-to-br from-accent/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                  <div className="text-8xl">👨‍💻</div>
                </div>
                <div className="absolute inset-0 bg-accent/10 group-hover:bg-transparent transition-all duration-300" />
              </div>
              <div className="absolute inset-0 border-2 border-accent rounded-lg translate-x-4 translate-y-4 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-all duration-300" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
