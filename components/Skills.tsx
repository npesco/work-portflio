"use client";

import { useEffect, useRef, useState } from "react";

const skillCategories = [
  {
    title: "Frontend",
    icon: "🎨",
    color: "from-blue-500 to-cyan-500",
    skills: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 95 },
      { name: "HTML / CSS", level: 95 },
      { name: "JavaScript", level: 92 },
    ],
  },
  {
    title: "Backend",
    icon: "⚙️",
    color: "from-green-500 to-emerald-500",
    skills: [
      { name: "Node.js", level: 90 },
      { name: "PHP / WordPress", level: 90 },
      { name: "Express.js", level: 85 },
      { name: "REST APIs", level: 90 },
      { name: "Python", level: 80 },
    ],
  },
  {
    title: "Database & Tools",
    icon: "🗄️",
    color: "from-purple-500 to-pink-500",
    skills: [
      { name: "MySQL", level: 88 },
      { name: "PostgreSQL", level: 85 },
      { name: "MongoDB", level: 82 },
      { name: "Git", level: 95 },
      { name: "Docker", level: 78 },
    ],
  },
  {
    title: "Other Skills",
    icon: "🚀",
    color: "from-orange-500 to-red-500",
    skills: [
      { name: "Figma", level: 75 },
      { name: "AWS / Vercel", level: 80 },
      { name: "CI/CD", level: 78 },
      { name: "Agile / Scrum", level: 85 },
      { name: "Problem Solving", level: 90 },
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
      { threshold: 0.1 },
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
      className="py-24 md:py-32 bg-section-alt"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
              Skills & Expertise
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Technologies and Tools I Use
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              I bring ideas to life with modern technologies and best practices
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {skillCategories.map((category, categoryIndex) => (
              <div
                key={category.title}
                className="bg-card-bg border border-card-border rounded-2xl p-6 hover-card"
                style={{
                  transitionDelay: `${categoryIndex * 100}ms`,
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-2xl shadow-lg`}
                  >
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold">{category.title}</h3>
                </div>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">
                          {skill.name}
                        </span>
                        <span className="text-sm text-accent font-semibold">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="skill-progress">
                        <div
                          className="skill-progress-bar"
                          style={{
                            width: isVisible ? `${skill.level}%` : "0%",
                            transitionDelay: `${
                              categoryIndex * 150 + skillIndex * 80
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
          <div className="mt-16 text-center">
            <h3 className="text-lg font-semibold mb-6">
              Other Technologies & Tools
            </h3>
            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
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
                "Redux",
                "React Query",
                "WooCommerce",
                "SEO",
                "Responsive Design",
              ].map((skill, index) => (
                <span
                  key={skill}
                  className="tech-tag cursor-default"
                  style={{
                    animationDelay: `${index * 30}ms`,
                  }}
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
