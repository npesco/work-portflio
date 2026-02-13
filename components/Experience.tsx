"use client";

import { useEffect, useRef, useState } from "react";
import { FloatingCode } from "./BackgroundAnimations";

const experiences = [
  {
    title: "Frontend Developer / WordPress Developer",
    company: "B-ticket",
    companyUrl: "https://b-ticket.ph/en",
    period: "2024 - Present",
    type: "Full-time",
    description: [
      "Lead development of scalable web applications using React, Next.js, and Node.js",
      "Architected and implemented microservices handling 100K+ daily requests",
      "Mentored junior developers and conducted code reviews to ensure code quality",
      "Collaborated with cross-functional teams to deliver features on time",
    ],
    technologies: ["React", "Next.js", "TypeScript", "Node.js", "WordPress"],
  },
  {
    title: "Junior Software Engineer",
    company: "UpWard Next Inc.",
    companyUrl: "https://up-ward.info/",
    period: "2022 - 2024",
    type: "Full-time",
    description: [
      "Built and maintained multiple client-facing web applications using modern frameworks",
      "Developed and customized WordPress websites, themes, and plugins for various clients",
      "Implemented RESTful APIs for mobile and web client integrations",
      "Optimized database queries and website performance for improved user experience",
    ],
    technologies: ["WordPress", "PHP", "JavaScript", "MySQL", "React"],
  },
  {
    title: "Java Programmer",
    company: "Solution Exchange Inc.",
    companyUrl: "https://www.sxi.com.ph/",
    period: "2021 - 2022",
    type: "Full-time",
    description: [
      "Developed and maintained enterprise Java applications using Spring Boot and Java EE frameworks",
      "Wrote clean, efficient, and well-documented code following object-oriented programming principles",
      "Designed and implemented RESTful APIs for seamless integration with front-end applications",
      "Collaborated with QA team to identify and fix bugs, ensuring high-quality software delivery",
    ],
    technologies: ["Java", "Spring Boot", "MySQL", "REST APIs", "Git"],
  },
];

export default function Experience() {
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
      id="experience"
      ref={sectionRef}
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Floating Code Snippets */}
      <FloatingCode />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
              Work Experience
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              My Professional Journey
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Career milestones and the companies I&apos;ve had the privilege to
              work with
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-purple-500 to-accent/20 transform md:-translate-x-1/2" />

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div
                  key={exp.company}
                  className={`relative flex flex-col md:flex-row gap-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                  style={{
                    transitionDelay: `${index * 150}ms`,
                  }}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-accent rounded-full transform -translate-x-1/2 md:-translate-x-1/2 border-4 border-background shadow-lg shadow-accent/50 z-10 pulse-ring" />

                  {/* Date badge - Desktop */}
                  <div
                    className={`hidden md:flex flex-1 ${index % 2 === 0 ? "justify-end pr-12" : "justify-start pl-12"}`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <span className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold border border-accent/20 shine-effect">
                        {exp.period}
                      </span>
                      <span className="text-xs text-muted">{exp.type}</span>
                    </div>
                  </div>

                  {/* Content card */}
                  <div
                    className={`flex-1 ml-8 md:ml-0 ${index % 2 === 0 ? "md:pl-12" : "md:pr-12"}`}
                  >
                    <div className="bg-card-bg border border-card-border rounded-2xl p-6 hover-card group tilt-3d gradient-border-hover">
                      {/* Mobile date badge */}
                      <div className="md:hidden flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-semibold">
                          {exp.period}
                        </span>
                        <span className="text-xs text-muted">{exp.type}</span>
                      </div>

                      <h3 className="text-xl font-bold mb-1 group-hover:text-accent transition-colors">
                        {exp.title}
                      </h3>
                      <a
                        href={exp.companyUrl}
                        className="text-accent hover:underline font-medium inline-flex items-center gap-1"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        @ {exp.company}
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>

                      <ul className="mt-4 space-y-3">
                        {exp.description.map((item, i) => (
                          <li key={i} className="flex gap-3 text-muted text-sm">
                            <span className="text-accent mt-0.5 flex-shrink-0">
                              ▸
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2 mt-5">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
