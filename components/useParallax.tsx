"use client";

import { useEffect, useState, useCallback, RefObject } from "react";

interface ParallaxValues {
  y: number;
  opacity: number;
  scale: number;
}

export function useParallax(
  ref: RefObject<HTMLElement | null>,
  options: {
    speed?: number;
    direction?: "up" | "down";
    fadeOut?: boolean;
    scaleEffect?: boolean;
  } = {},
): ParallaxValues {
  const {
    speed = 0.3,
    direction = "up",
    fadeOut = false,
    scaleEffect = false,
  } = options;
  const [values, setValues] = useState<ParallaxValues>({
    y: 0,
    opacity: 1,
    scale: 1,
  });

  const handleScroll = useCallback(() => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Calculate how far the element is from the center of the viewport
    const elementCenter = rect.top + rect.height / 2;
    const viewportCenter = windowHeight / 2;
    const distanceFromCenter = elementCenter - viewportCenter;

    // Calculate parallax offset
    const multiplier = direction === "up" ? -1 : 1;
    const y = distanceFromCenter * speed * multiplier;

    // Calculate opacity based on visibility
    let opacity = 1;
    if (fadeOut) {
      const visibleRatio = Math.min(
        Math.max((windowHeight - rect.top) / windowHeight, 0),
        Math.max(rect.bottom / windowHeight, 0),
      );
      opacity = Math.min(visibleRatio * 1.5, 1);
    }

    // Calculate scale effect
    let scale = 1;
    if (scaleEffect) {
      const progress = 1 - Math.abs(distanceFromCenter) / windowHeight;
      scale = 0.95 + progress * 0.05;
    }

    setValues({ y, opacity, scale });
  }, [ref, speed, direction, fadeOut, scaleEffect]);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [handleScroll]);

  return values;
}

// Parallax layer component for background elements
interface ParallaxLayerProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxLayer({
  children,
  speed = 0.5,
  className = "",
}: ParallaxLayerProps) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * speed);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return (
    <div
      className={`will-change-transform ${className}`}
      style={{ transform: `translateY(${offset}px)` }}
    >
      {children}
    </div>
  );
}
