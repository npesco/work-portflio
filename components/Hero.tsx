"use client";

import { useEffect, useState, useRef } from "react";
import { FloatingParticles } from "./BackgroundAnimations";
import { ParallaxLayer } from "./useParallax";

const roles = [
  "Full-Stack Developer",
  "React/Next.js Developer",
  "WordPress Developer",
  "UI/UX Enthusiast",
];

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < currentRole.length) {
            setDisplayText(currentRole.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 50 : 100,
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-purple-500/5 to-pink-500/5" />

      {/* Animated background shapes with parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <ParallaxLayer speed={0.15}>
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] animate-pulse-slow" />
        </ParallaxLayer>
        <ParallaxLayer speed={0.25}>
          <div
            className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] animate-pulse-slow"
            style={{ animationDelay: "1s" }}
          />
        </ParallaxLayer>
        <ParallaxLayer speed={0.35}>
          <div
            className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-pink-500/10 rounded-full blur-[100px] animate-pulse-slow"
            style={{ animationDelay: "2s" }}
          />
        </ParallaxLayer>
      </div>

      {/* Floating Particles */}
      <FloatingParticles count={40} color="accent" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-6xl mx-auto px-6 py-32 relative z-10">
        <div
          className={`transition-all duration-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-block mb-6">
                <span className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium border border-accent/20">
                  👋 Hello, my name is
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                <span className="gradient-text-animated">
                  Neil Patrick Escobar
                </span>
              </h1>

              <div className="h-16 md:h-20 flex items-center justify-center lg:justify-start mb-6">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-muted">
                  {displayText}
                  <span className="typewriter-cursor" />
                </h2>
              </div>

              <p className="max-w-xl text-muted text-lg leading-relaxed mb-8 mx-auto lg:mx-0">
                I build scalable, efficient, and user-friendly web applications
                with a focus on clean architecture and exceptional user
                experiences.
              </p>

              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <a
                  href="#projects"
                  className="group px-8 py-4 bg-accent hover:bg-accent-hover text-white rounded-xl font-medium transition-all duration-300 flex items-center gap-2 glow-button shine-effect"
                >
                  View My Work
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
                <a
                  href="#contact"
                  className="px-8 py-4 border-2 border-card-border text-foreground rounded-xl font-medium outline-btn-hover"
                >
                  Contact Me
                </a>
              </div>

              {/* Quick stats */}
              <div className="flex flex-wrap gap-8 mt-12 justify-center lg:justify-start">
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text">3+</div>
                  <div className="text-sm text-muted">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text">15+</div>
                  <div className="text-sm text-muted">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text">10+</div>
                  <div className="text-sm text-muted">Happy Clients</div>
                </div>
              </div>
            </div>

            {/* Right side - Decorative element */}
            <div className="hidden lg:flex flex-1 justify-center">
              <div className="relative">
                <div className="w-80 h-80 rounded-full bg-gradient-to-br from-accent/20 to-purple-500/20 flex items-center justify-center animate-float morph-blob">
                  <div
                    className="w-64 h-64 rounded-full bg-gradient-to-br from-accent/30 to-purple-500/30 flex items-center justify-center morph-blob"
                    style={{ animationDelay: "-2s" }}
                  >
                    <div className="w-48 h-48 rounded-full bg-card-bg border border-card-border flex items-center justify-center shadow-2xl pulse-ring neon-box">
                      <span className="monogram text-4xl">NPE</span>
                    </div>
                  </div>
                </div>
                {/* Floating tech icons */}
                <div
                  className="absolute -top-4 right-0 p-3 bg-card-bg rounded-xl shadow-lg border border-card-border animate-float"
                  style={{ animationDelay: "0.5s" }}
                >
                  <span className="text-2xl">⚛️</span>
                </div>
                <div
                  className="absolute top-1/4 -left-8 p-3 bg-card-bg rounded-xl shadow-lg border border-card-border animate-float"
                  style={{ animationDelay: "1s" }}
                >
                  <span className="text-2xl">🔷</span>
                </div>
                <div
                  className="absolute bottom-1/4 -right-4 p-3 bg-card-bg rounded-xl shadow-lg border border-card-border animate-float"
                  style={{ animationDelay: "1.5s" }}
                >
                  <span className="text-2xl">🚀</span>
                </div>
                <div
                  className="absolute -bottom-4 left-1/4 p-3 bg-card-bg rounded-xl shadow-lg border border-card-border animate-float"
                  style={{ animationDelay: "2s" }}
                >
                  <span className="text-2xl">💻</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 text-muted">
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <div className="w-6 h-10 border-2 border-muted rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-accent rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
