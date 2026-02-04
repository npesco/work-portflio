"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/10" />

      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-32 relative z-10">
        <div
          className={`transition-all duration-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-accent font-mono text-sm md:text-base mb-4">
            Hi, my name is
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
            <span className="gradient-text">Neil Patrick Escobar.</span>
          </h1>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-muted mb-6">
            I build things for the web.
          </h2>
          <p className="max-w-xl text-muted text-lg md:text-xl mb-10 leading-relaxed">
            I&apos;m a full-stack developer specializing in building exceptional
            digital experiences. Currently focused on creating accessible,
            human-centered products that make an impact.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="px-8 py-4 bg-accent hover:bg-accent-hover text-white rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:shadow-accent/25"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-8 py-4 border border-card-border hover:border-accent text-foreground rounded-lg font-medium transition-all duration-200"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-muted"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
