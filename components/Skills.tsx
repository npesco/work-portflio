"use client";

import { useEffect, useRef, useState } from "react";

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "React", level: 95 },
      { name: "Next.js", level: 90 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 95 },
      { name: "HTML/CSS", level: 95 },
      { name: "WordPress", level: 90 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", level: 90 },
      { name: "Python", level: 85 },
      { name: "Express.js", level: 85 },
      { name: "FastAPI", level: 80 },
      { name: "GraphQL", level: 80 },
    ],
  },
  {
    title: "Database",
    skills: [
      { name: "PostgreSQL", level: 85 },
      { name: "MongoDB", level: 85 },
      { name: "Redis", level: 75 },
      { name: "MySQL", level: 80 },
      { name: "Prisma", level: 85 },
    ],
  },
  {
    title: "DevOps & Tools",
    skills: [
      { name: "Docker", level: 85 },
      { name: "AWS", level: 80 },
      { name: "Git", level: 95 },
      { name: "CI/CD", level: 80 },
      { name: "Linux", level: 80 },
    ],
  },
];

export default function Skills() {
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
    <section
      id="skills"
      ref={sectionRef}
      className="py-24 md:py-32 bg-card-bg/30"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="flex items-center gap-4 text-2xl md:text-3xl font-bold mb-12">
            <span className="text-accent font-mono text-xl">04.</span>
            Skills & Technologies
            <span className="h-px bg-card-border flex-1 max-w-xs" />
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <div
                key={category.title}
                className="bg-card-bg border border-card-border rounded-lg p-6"
                style={{
                  animationDelay: `${categoryIndex * 100}ms`,
                }}
              >
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full" />
                  {category.title}
                </h3>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">
                          {skill.name}
                        </span>
                        <span className="text-sm text-muted">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-2 bg-card-border rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-accent to-purple-500 rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: isVisible ? `${skill.level}%` : "0%",
                            transitionDelay: `${
                              categoryIndex * 100 + skillIndex * 50
                            }ms`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Additional skills as tags */}
          <div className="mt-12">
            <h3 className="text-lg font-semibold mb-6 text-center">
              Other Technologies
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "REST APIs",
                "WebSockets",
                "JWT",
                "OAuth",
                "Webpack",
                "Vite",
                "Jest",
                "Cypress",
                "Figma",
                "Vercel",
                "Netlify",
                "Firebase",
                "Supabase",
                "Stripe",
                "Socket.io",
                "Zustand",
                "Redux",
                "React Query",
                "PHP",
                "WooCommerce",
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-card-bg border border-card-border rounded-full text-sm text-muted hover:text-accent hover:border-accent transition-all duration-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
