"use client";

import { useEffect, useRef, useState } from "react";

const projects = [
  // Featured React/Next.js Projects
  {
    title: "B-Ticket",
    description:
      "A comprehensive ticketing platform for events and entertainment. Provides seamless ticket purchasing, event discovery, and user account management.",
    image: "🎫",
    technologies: ["React", "Next.js", "TypeScript", "REST API"],
    github: null,
    live: "https://b-ticket.ph/en",
    featured: true,
  },
  {
    title: "B-Merchant",
    description:
      "A merchant management platform enabling businesses to manage their operations, track sales, and handle transactions efficiently.",
    image: "💼",
    technologies: ["React", "Next.js", "TypeScript", "Dashboard"],
    github: null,
    live: "https://b-merchant.ph/en",
    featured: true,
  },
  // Other Web Projects
  {
    title: "Tokyo 23 FC",
    description:
      "Official website for Tokyo 23 Football Club. Features team information, match schedules, news, and fan engagement.",
    image: "⚽",
    technologies: ["WordPress", "PHP", "JavaScript", "CSS"],
    github: null,
    live: "https://tokyo23fc.jp/",
    featured: false,
  },
  {
    title: "Medishin ACP",
    description:
      "Healthcare and medical services website providing information about advanced care planning and medical consultations.",
    image: "🏥",
    technologies: ["WordPress", "PHP", "JavaScript", "CSS"],
    github: null,
    live: "https://medishin-acp.com/",
    featured: false,
  },
  {
    title: "Medishin INDIBA",
    description:
      "Specialized medical treatment service page featuring INDIBA therapy information and booking capabilities.",
    image: "💆",
    technologies: ["WordPress", "PHP", "JavaScript", "CSS"],
    github: null,
    live: "https://medishin-acp.com/indiba",
    featured: false,
  },
  {
    title: "Kimono Rental Online",
    description:
      "Online kimono rental service platform allowing customers to browse, select, and rent traditional Japanese kimonos.",
    image: "👘",
    technologies: ["WordPress", "PHP", "WooCommerce", "CSS"],
    github: null,
    live: "https://kimono-rental.online/",
    featured: false,
  },
  {
    title: "Best Trading",
    description:
      "Corporate website for a trading company showcasing their services, products, and business information.",
    image: "📈",
    technologies: ["WordPress", "PHP", "JavaScript", "CSS"],
    github: null,
    live: "https://best-trading.co.jp/",
    featured: false,
  },
  {
    title: "Always Royal",
    description:
      "Professional corporate website featuring company services, portfolio, and contact information with elegant design.",
    image: "👑",
    technologies: ["WordPress", "PHP", "JavaScript", "CSS"],
    github: null,
    live: "https://www.always-royal.co.jp/",
    featured: false,
  },
  {
    title: "Rinkai South",
    description:
      "Business website providing comprehensive information about services and company offerings.",
    image: "🏢",
    technologies: ["WordPress", "PHP", "JavaScript", "CSS"],
    github: null,
    live: "https://rinkai-south.jp/",
    featured: false,
  },
  {
    title: "Hareke",
    description:
      "Modern web platform with clean design and user-friendly interface for seamless browsing experience.",
    image: "🌸",
    technologies: ["WordPress", "PHP", "JavaScript", "CSS"],
    github: null,
    live: "https://hareke.com/",
    featured: false,
  },
  {
    title: "DRE-CLI",
    description:
      "Professional website for clinic or medical services, featuring appointment booking and service information.",
    image: "🩺",
    technologies: ["WordPress", "PHP", "JavaScript", "CSS"],
    github: null,
    live: "https://dre-cli.com/",
    featured: false,
  },
];

export default function Projects() {
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

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" ref={sectionRef} className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="flex items-center gap-4 text-2xl md:text-3xl font-bold mb-12">
            <span className="text-accent font-mono text-xl">03.</span>
            Some Things I&apos;ve Built
            <span className="h-px bg-card-border flex-1 max-w-xs" />
          </h2>

          {/* Featured Projects */}
          <div className="space-y-16 mb-24">
            {featuredProjects.map((project, index) => (
              <div
                key={project.title}
                className={`group relative bg-card-bg border border-card-border rounded-xl overflow-hidden hover-card ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`flex flex-col lg:flex-row ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
                >
                  {/* Project Image */}
                  <div className="lg:w-1/2 relative">
                    <div className="relative aspect-video lg:aspect-auto lg:h-full bg-gradient-to-br from-accent/20 to-purple-500/20 flex items-center justify-center min-h-[250px]">
                      <span className="text-8xl group-hover:scale-110 transition-transform duration-300">
                        {project.image}
                      </span>
                      <div className="absolute inset-0 bg-accent/10 group-hover:bg-transparent transition-all duration-300" />
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col justify-center">
                    <p className="text-accent font-mono text-sm mb-2">
                      Featured Project
                    </p>
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted mb-6 leading-relaxed">
                      {project.description}
                    </p>
                    <ul className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech) => (
                        <li
                          key={tech}
                          className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-mono"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                    <div className="flex gap-4">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-muted hover:text-accent transition-colors"
                          aria-label="GitHub"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                          </svg>
                          <span className="text-sm">Code</span>
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-muted hover:text-accent transition-colors"
                          aria-label="Live Demo"
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
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                          <span className="text-sm">Live Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Other Projects */}
          <div>
            <h3 className="text-xl font-bold text-center mb-8">
              Other Noteworthy Projects
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project) => (
                <div
                  key={project.title}
                  className="bg-card-bg border border-card-border rounded-xl p-6 hover-card group flex flex-col h-full"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">{project.image}</span>
                    </div>
                    <div className="flex gap-3">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted hover:text-accent transition-colors p-2 hover:bg-accent/10 rounded-lg"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                          </svg>
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted hover:text-accent transition-colors p-2 hover:bg-accent/10 rounded-lg"
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
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold mb-3 group-hover:text-accent transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-muted text-sm mb-4 flex-grow leading-relaxed">
                    {project.description}
                  </p>
                  <ul className="flex flex-wrap gap-2 mt-auto">
                    {project.technologies.map((tech) => (
                      <li
                        key={tech}
                        className="text-xs font-mono text-muted bg-card-border/50 px-2 py-1 rounded"
                      >
                        {tech}
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
