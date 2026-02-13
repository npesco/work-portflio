"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";

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

// Hook to track mouse position within a section
function useMousePosition(containerRef: React.RefObject<HTMLElement | null>) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, isActive: false });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        isActive: true,
      });
    };

    const handleMouseLeave = () => {
      setMousePos((prev) => ({ ...prev, isActive: false }));
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [containerRef]);

  return mousePos;
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

// Floating Geometric Shapes with Mouse Interaction
export function FloatingShapes() {
  const isDark = useDarkMode();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left - rect.width / 2) / rect.width,
        y: (e.clientY - rect.top - rect.height / 2) / rect.height,
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const shapes = [
    { type: "circle", size: 60, color: "accent", parallaxFactor: 30 },
    { type: "square", size: 40, color: "purple", parallaxFactor: 50 },
    { type: "triangle", size: 50, color: "pink", parallaxFactor: 20 },
    { type: "circle", size: 30, color: "blue", parallaxFactor: 40 },
    { type: "square", size: 50, color: "accent", parallaxFactor: 35 },
    { type: "circle", size: 45, color: "purple", parallaxFactor: 25 },
  ];

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      style={{ pointerEvents: "auto" }}
    >
      {shapes.map((shape, i) => {
        const opacity = isDark ? "0.15" : "0.2";
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

        // Calculate mouse-based offset for parallax effect
        const offsetX = mousePos.x * shape.parallaxFactor;
        const offsetY = mousePos.y * shape.parallaxFactor;

        return (
          <div
            key={i}
            className="absolute animate-float-shape transition-transform duration-300 ease-out"
            style={{
              ...positions[i],
              transform: `translate(${offsetX}px, ${offsetY}px)`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${8 + i * 2}s`,
            }}
          >
            {shape.type === "circle" && (
              <div
                className="rounded-full transition-all duration-300"
                style={{
                  width: shape.size,
                  height: shape.size,
                  backgroundColor: colorMap[shape.color],
                  opacity,
                  filter: "blur(1px)",
                  boxShadow: `0 0 ${20 + Math.abs(offsetX) * 0.5}px ${colorMap[shape.color]}40`,
                }}
              />
            )}
            {shape.type === "square" && (
              <div
                className="rotate-45 transition-all duration-300"
                style={{
                  width: shape.size,
                  height: shape.size,
                  backgroundColor: colorMap[shape.color],
                  opacity,
                  filter: "blur(1px)",
                  boxShadow: `0 0 ${20 + Math.abs(offsetX) * 0.5}px ${colorMap[shape.color]}40`,
                }}
              />
            )}
            {shape.type === "triangle" && (
              <div
                className="transition-all duration-300"
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: `${shape.size / 2}px solid transparent`,
                  borderRight: `${shape.size / 2}px solid transparent`,
                  borderBottom: `${shape.size}px solid ${colorMap[shape.color]}`,
                  opacity,
                  filter: `blur(1px) drop-shadow(0 0 ${10 + Math.abs(offsetX) * 0.3}px ${colorMap[shape.color]}60)`,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// Network/Circuit Animation with Mouse Interaction
export function NetworkAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDark = useDarkMode();
  const nodesRef = useRef<{ x: number; y: number; vx: number; vy: number }[]>(
    [],
  );
  const mouseRef = useRef({ x: 0, y: 0, isActive: false });
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        isActive: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.isActive = false;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

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
    const mouseLineColor = isDark
      ? "rgba(139, 92, 246, 0.4)"
      : "rgba(124, 58, 237, 0.3)";

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;

      // Update positions with mouse interaction
      nodes.forEach((node) => {
        // Mouse attraction/repulsion effect
        if (mouse.isActive) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 200 && distance > 0) {
            // Gentle attraction towards mouse
            const force = ((200 - distance) / 200) * 0.02;
            node.vx += (dx / distance) * force;
            node.vy += (dy / distance) * force;
          }
        }

        // Apply velocity with damping
        node.vx *= 0.99;
        node.vy *= 0.99;

        // Ensure minimum movement
        const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
        if (speed < 0.2) {
          node.vx += (Math.random() - 0.5) * 0.1;
          node.vy += (Math.random() - 0.5) * 0.1;
        }

        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
      });

      // Draw connections between nodes
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

      // Draw connections to mouse cursor
      if (mouse.isActive) {
        nodes.forEach((node) => {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 180) {
            const opacity = (1 - distance / 180) * 0.6;
            ctx.strokeStyle = isDark
              ? `rgba(139, 92, 246, ${opacity})`
              : `rgba(124, 58, 237, ${opacity})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        });

        // Draw mouse cursor glow
        const gradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          100,
        );
        gradient.addColorStop(
          0,
          isDark ? "rgba(139, 92, 246, 0.3)" : "rgba(124, 58, 237, 0.2)",
        );
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 100, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw nodes
      ctx.fillStyle = nodeColor;
      nodes.forEach((node) => {
        // Nodes near mouse are bigger and brighter
        let radius = 3;
        if (mouse.isActive) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 150) {
            radius = 3 + (1 - distance / 150) * 4;
            ctx.fillStyle = isDark
              ? `rgba(139, 92, 246, ${0.6 + (1 - distance / 150) * 0.4})`
              : `rgba(124, 58, 237, ${0.5 + (1 - distance / 150) * 0.5})`;
          } else {
            ctx.fillStyle = nodeColor;
          }
        }
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    window.addEventListener("resize", resizeCanvas);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-60"
      style={{ pointerEvents: "auto" }}
    />
  );
}

// Floating Code Snippets with Mouse Interaction
export function FloatingCode() {
  const isDark = useDarkMode();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left - rect.width / 2) / rect.width,
        y: (e.clientY - rect.top - rect.height / 2) / rect.height,
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const codeSnippets = [
    { code: "const dev = 'Patrick';", parallax: 25 },
    { code: "npm run build", parallax: 40 },
    { code: "git push origin main", parallax: 15 },
    { code: "<Component />", parallax: 35 },
    { code: "async/await", parallax: 50 },
    { code: "{ ...props }", parallax: 20 },
    { code: "export default", parallax: 45 },
    { code: "useState()", parallax: 30 },
    { code: "interface Props", parallax: 55 },
    { code: "return <>...</>;", parallax: 25 },
  ];

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      style={{ pointerEvents: "auto" }}
    >
      {codeSnippets.map((item, i) => {
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

        const offsetX = mousePos.x * item.parallax;
        const offsetY = mousePos.y * item.parallax;

        return (
          <div
            key={i}
            className={`absolute font-mono text-xs animate-float-code transition-all duration-300 ease-out ${
              isDark ? "text-accent/30" : "text-accent/40"
            }`}
            style={{
              ...positions[i],
              transform: `translate(${offsetX}px, ${offsetY}px)`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${12 + i * 1.5}s`,
              textShadow: `0 0 ${10 + Math.abs(offsetX) * 0.3}px currentColor`,
            }}
          >
            {item.code}
          </div>
        );
      })}
    </div>
  );
}

// Gradient Orbs Animation with Mouse Interaction
export function GradientOrbs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left - rect.width / 2) / rect.width,
        y: (e.clientY - rect.top - rect.height / 2) / rect.height,
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const orbs = [
    {
      className: "top-1/4 left-1/4",
      size: "w-96 h-96",
      color: "bg-accent/10",
      parallax: 40,
    },
    {
      className: "bottom-1/4 right-1/4",
      size: "w-80 h-80",
      color: "bg-purple-500/10",
      parallax: 60,
      delay: "1.5s",
    },
    {
      className: "top-1/2 right-1/3",
      size: "w-72 h-72",
      color: "bg-pink-500/10",
      parallax: 30,
      delay: "3s",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      style={{ pointerEvents: "auto" }}
    >
      {orbs.map((orb, i) => (
        <div
          key={i}
          className={`absolute ${orb.className} ${orb.size} ${orb.color} rounded-full animate-pulse-slow transition-transform duration-500 ease-out`}
          style={{
            filter: "blur(100px)",
            animationDelay: orb.delay || "0s",
            transform: `translate(${mousePos.x * orb.parallax}px, ${mousePos.y * orb.parallax}px)`,
          }}
        />
      ))}
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
