"use client";

import { useEffect, useMemo, useRef, useState } from "react";

// Hook to detect dark mode
function useDarkMode() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return isDark;
}

// Floating Particles Animation
export function FloatingParticles({
  count = 30,
  color = "accent",
}: {
  count?: number;
  color?: "accent" | "purple" | "blue" | "green";
}) {
  const isDark = useDarkMode();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const colorMap = {
    accent: isDark ? "bg-accent/20" : "bg-accent/30",
    purple: isDark ? "bg-purple-500/20" : "bg-purple-500/30",
    blue: isDark ? "bg-blue-500/20" : "bg-blue-500/30",
    green: isDark ? "bg-green-500/20" : "bg-green-500/30",
  };

  // Generate particles only on client side
  const particles = useMemo(() => {
    if (!mounted) return [];
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      width: Math.random() * 10 + 4,
      height: Math.random() * 10 + 4,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 10,
    }));
  }, [count, mounted]);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`absolute rounded-full ${colorMap[color]} animate-float-particle`}
          style={{
            width: `${particle.width}px`,
            height: `${particle.height}px`,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

// Floating Geometric Shapes
export function FloatingShapes() {
  const isDark = useDarkMode();

  const shapes = [
    { type: "circle", size: 60, color: "accent" },
    { type: "square", size: 40, color: "purple" },
    { type: "triangle", size: 50, color: "pink" },
    { type: "circle", size: 30, color: "blue" },
    { type: "square", size: 50, color: "accent" },
    { type: "circle", size: 45, color: "purple" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape, i) => {
        const opacity = isDark ? "0.1" : "0.15";
        const positions = [
          { left: "10%", top: "20%" },
          { left: "85%", top: "15%" },
          { left: "75%", top: "70%" },
          { left: "15%", top: "75%" },
          { left: "50%", top: "10%" },
          { left: "60%", top: "85%" },
        ];

        const colorMap: Record<string, string> = {
          accent: isDark ? "#6366f1" : "#4f46e5",
          purple: isDark ? "#a855f7" : "#9333ea",
          pink: isDark ? "#ec4899" : "#db2777",
          blue: isDark ? "#3b82f6" : "#2563eb",
        };

        return (
          <div
            key={i}
            className="absolute animate-float-shape"
            style={{
              ...positions[i],
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${8 + i * 2}s`,
            }}
          >
            {shape.type === "circle" && (
              <div
                className="rounded-full"
                style={{
                  width: shape.size,
                  height: shape.size,
                  backgroundColor: colorMap[shape.color],
                  opacity,
                  filter: "blur(1px)",
                }}
              />
            )}
            {shape.type === "square" && (
              <div
                className="rotate-45"
                style={{
                  width: shape.size,
                  height: shape.size,
                  backgroundColor: colorMap[shape.color],
                  opacity,
                  filter: "blur(1px)",
                }}
              />
            )}
            {shape.type === "triangle" && (
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: `${shape.size / 2}px solid transparent`,
                  borderRight: `${shape.size / 2}px solid transparent`,
                  borderBottom: `${shape.size}px solid ${colorMap[shape.color]}`,
                  opacity,
                  filter: "blur(1px)",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// Network/Circuit Animation
export function NetworkAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDark = useDarkMode();
  const nodesRef = useRef<{ x: number; y: number; vx: number; vy: number }[]>(
    [],
  );
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      }
    };
    resizeCanvas();

    // Create nodes only once
    if (nodesRef.current.length === 0) {
      nodesRef.current = Array.from({ length: 40 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      }));
    }

    const nodes = nodesRef.current;

    const nodeColor = isDark
      ? "rgba(99, 102, 241, 0.6)"
      : "rgba(79, 70, 229, 0.5)";
    const lineColor = isDark
      ? "rgba(99, 102, 241, 0.15)"
      : "rgba(79, 70, 229, 0.1)";

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update positions
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
      });

      // Draw connections
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      ctx.fillStyle = nodeColor;
      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    window.addEventListener("resize", resizeCanvas);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-50 pointer-events-none"
    />
  );
}

// Floating Code Snippets
export function FloatingCode() {
  const isDark = useDarkMode();

  const codeSnippets = [
    "const dev = 'Patrick';",
    "npm run build",
    "git push origin main",
    "<Component />",
    "async/await",
    "{ ...props }",
    "export default",
    "useState()",
    "interface Props",
    "return <>...</>;",
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {codeSnippets.map((code, i) => {
        const positions = [
          { left: "5%", top: "15%" },
          { left: "80%", top: "10%" },
          { left: "70%", top: "80%" },
          { left: "10%", top: "70%" },
          { left: "90%", top: "45%" },
          { left: "3%", top: "45%" },
          { left: "45%", top: "5%" },
          { left: "55%", top: "90%" },
          { left: "25%", top: "85%" },
          { left: "85%", top: "25%" },
        ];

        return (
          <div
            key={i}
            className={`absolute font-mono text-xs animate-float-code ${
              isDark ? "text-accent/30" : "text-accent/40"
            }`}
            style={{
              ...positions[i],
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${12 + i * 1.5}s`,
            }}
          >
            {code}
          </div>
        );
      })}
    </div>
  );
}

// Gradient Orbs Animation
export function GradientOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full animate-pulse-slow"
        style={{ filter: "blur(100px)" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full animate-pulse-slow"
        style={{ animationDelay: "1.5s", filter: "blur(100px)" }}
      />
      <div
        className="absolute top-1/2 right-1/3 w-72 h-72 bg-pink-500/10 rounded-full animate-pulse-slow"
        style={{ animationDelay: "3s", filter: "blur(100px)" }}
      />
    </div>
  );
}

// Animated Grid Background
export function AnimatedGrid() {
  const isDark = useDarkMode();

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `linear-gradient(${isDark ? "rgba(99, 102, 241, 0.03)" : "rgba(79, 70, 229, 0.05)"} 1px, transparent 1px),
          linear-gradient(90deg, ${isDark ? "rgba(99, 102, 241, 0.03)" : "rgba(79, 70, 229, 0.05)"} 1px, transparent 1px)`,
        backgroundSize: "50px 50px",
        animation: "gridMove 20s linear infinite",
      }}
    />
  );
}

// Binary Rain (lighter version of Matrix for variety)
export function BinaryRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dropsRef = useRef<number[]>([]);
  const isDark = useDarkMode();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      }
    };
    resizeCanvas();

    const fontSize = 12;
    const columns = Math.floor(canvas.width / fontSize);

    // Initialize drops only once
    if (dropsRef.current.length !== columns) {
      dropsRef.current = Array(columns)
        .fill(1)
        .map(() => Math.floor(Math.random() * -100));
    }

    const drops = dropsRef.current;
    const chars = "01";

    const draw = () => {
      ctx.fillStyle = isDark
        ? "rgba(0, 0, 0, 0.05)"
        : "rgba(255, 255, 255, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = isDark
        ? "rgba(99, 102, 241, 0.4)"
        : "rgba(79, 70, 229, 0.3)";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.98) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 80);
    window.addEventListener("resize", resizeCanvas);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-40 pointer-events-none"
    />
  );
}
