"use client";

import { useEffect, useRef, useState } from "react";

const experiences = [
  {
    title: "Frontend Developer / Wordpress Developer",
    company: "B-ticket",
    companyUrl: "https://b-ticket.ph/en",
    period: "2024 - Present",
    description: [
      "Lead development of scalable web applications using React, Next.js, and Node.js",
      "Architected and implemented microservices handling 100K+ daily requests",
      "Mentored junior developers and conducted code reviews to ensure code quality",
      "Collaborated with cross-functional teams to deliver features on time",
    ],
  },
  {
    title: "Junior Software Engineer",
    company: "UpWard Next Inc.",
    companyUrl: "https://up-ward.info/",
    period: "2022 - 2024",
    description: [
      "Built and maintained multiple client-facing web applications using modern frameworks",
      "Developed and customized WordPress websites, themes, and plugins for various clients",
      "Implemented RESTful APIs for mobile and web client integrations",
      "Optimized database queries and website performance for improved user experience",
    ],
  },
  {
    title: "Java Programmer",
    company: "Solution Exchange Inc.",
    companyUrl: "https://www.sxi.com.ph/",
    period: "2021 - 2022",
    description: [
      "Developed and maintained enterprise Java applications using Spring Boot and Java EE frameworks",
      "Wrote clean, efficient, and well-documented code following object-oriented programming principles",
      "Designed and implemented RESTful APIs for seamless integration with front-end applications",
      "Collaborated with QA team to identify and fix bugs, ensuring high-quality software delivery",
    ],
  },
];

export default function Experience() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
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
      id="experience"
      ref={sectionRef}
      className="py-24 md:py-32 bg-card-bg/30"
    >
      <div className="max-w-4xl mx-auto px-6">
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="flex items-center gap-4 text-2xl md:text-3xl font-bold mb-12">
            <span className="text-accent font-mono text-xl">02.</span>
            Where I&apos;ve Worked
            <span className="h-px bg-card-border flex-1 max-w-xs" />
          </h2>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Tab buttons */}
            <div className="flex md:flex-col overflow-x-auto md:overflow-visible border-b md:border-b-0 md:border-l border-card-border">
              {experiences.map((exp, index) => (
                <button
                  key={exp.company}
                  onClick={() => setActiveTab(index)}
                  className={`px-5 py-3 text-sm font-mono text-left whitespace-nowrap transition-all duration-200 ${
                    activeTab === index
                      ? "text-accent bg-accent/10 border-b-2 md:border-b-0 md:border-l-2 border-accent md:-ml-px"
                      : "text-muted hover:text-accent hover:bg-accent/5"
                  }`}
                >
                  {exp.company}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="flex-1 min-h-[300px]">
              {experiences.map((exp, index) => (
                <div
                  key={exp.company}
                  className={`transition-all duration-300 ${
                    activeTab === index
                      ? "opacity-100 visible"
                      : "opacity-0 invisible absolute"
                  }`}
                >
                  <h3 className="text-xl font-semibold mb-1">
                    {exp.title}{" "}
                    <a
                      href={exp.companyUrl}
                      className="text-accent hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @ {exp.company}
                    </a>
                  </h3>
                  <p className="text-muted font-mono text-sm mb-6">
                    {exp.period}
                  </p>
                  <ul className="space-y-4">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex gap-3 text-muted">
                        <span className="text-accent mt-1.5">▹</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
