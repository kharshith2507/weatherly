"use client";

import * as React from "react";

export interface GravityStarsBackgroundProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of stars to render */
  starCount?: number;
  /** Base star color */
  starColor?: string;
  /** Radius (px) within which the cursor attracts / repels stars */
  gravityRadius?: number;
  /** Strength of the gravity pull applied near the cursor */
  gravityStrength?: number;
}

interface Star {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  radius: number;
  twinklePhase: number;
  twinkleSpeed: number;
}

export const GravityStarsBackground = React.forwardRef<
  HTMLDivElement,
  GravityStarsBackgroundProps
>(
  (
    {
      className,
      starCount = 160,
      starColor = "255, 255, 255",
      gravityRadius = 140,
      gravityStrength = 0.06,
      style,
      ...props
    },
    ref
  ) => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const starsRef = React.useRef<Star[]>([]);
    const mouseRef = React.useRef<{ x: number; y: number } | null>(null);
    const rafRef = React.useRef<number | undefined>(undefined);

    React.useImperativeHandle(
      ref,
      () => containerRef.current as HTMLDivElement
    );

    React.useEffect(() => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      let width = 0;
      let height = 0;
      const dpr =
        typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

      const initStars = () => {
        const stars: Star[] = [];
        for (let i = 0; i < starCount; i++) {
          const x = Math.random() * width;
          const y = Math.random() * height;
          stars.push({
            x,
            y,
            baseX: x,
            baseY: y,
            vx: 0,
            vy: 0,
            radius: Math.random() * 1.3 + 0.3,
            twinklePhase: Math.random() * Math.PI * 2,
            twinkleSpeed: Math.random() * 0.02 + 0.005,
          });
        }
        starsRef.current = stars;
      };

      const resize = () => {
        const rect = container.getBoundingClientRect();
        width = rect.width;
        height = rect.height;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        initStars();
      };

      const handlePointerMove = (e: PointerEvent) => {
        const rect = container.getBoundingClientRect();
        mouseRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
      };
      const handlePointerLeave = () => {
        mouseRef.current = null;
      };

      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

      const animate = () => {
        ctx.clearRect(0, 0, width, height);
        const mouse = mouseRef.current;

        for (const star of starsRef.current) {
          if (mouse) {
            const dx = mouse.x - star.x;
            const dy = mouse.y - star.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            if (dist < gravityRadius) {
              const force = (1 - dist / gravityRadius) * gravityStrength;
              star.vx += (dx / dist) * force;
              star.vy += (dy / dist) * force;
            }
          }

          // spring back toward home position
          const homeDx = star.baseX - star.x;
          const homeDy = star.baseY - star.y;
          star.vx += homeDx * 0.003;
          star.vy += homeDy * 0.003;

          // damping
          star.vx *= 0.92;
          star.vy *= 0.92;

          star.x += star.vx;
          star.y += star.vy;

          star.twinklePhase += star.twinkleSpeed;
          const twinkle = (Math.sin(star.twinklePhase) + 1) / 2;
          const opacity = 0.25 + twinkle * 0.65;

          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${starColor}, ${opacity.toFixed(3)})`;
          ctx.fill();

          // subtle glow for brighter stars
          if (star.radius > 1.1) {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius * 2.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${starColor}, ${(opacity * 0.12).toFixed(
              3
            )})`;
            ctx.fill();
          }
        }

        rafRef.current = requestAnimationFrame(animate);
      };

      resize();
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(container);

      container.addEventListener("pointermove", handlePointerMove);
      container.addEventListener("pointerleave", handlePointerLeave);

      if (!prefersReducedMotion) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        // draw a single static frame
        animate();
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      }

      return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        resizeObserver.disconnect();
        container.removeEventListener("pointermove", handlePointerMove);
        container.removeEventListener("pointerleave", handlePointerLeave);
      };
    }, [starCount, starColor, gravityRadius, gravityStrength]);

    return (
      <div
        ref={containerRef}
        className={className}
        style={{ overflow: "hidden", pointerEvents: "auto", ...style }}
        aria-hidden="true"
        {...props}
      >
        <canvas ref={canvasRef} style={{ display: "block" }} />
      </div>
    );
  }
);

GravityStarsBackground.displayName = "GravityStarsBackground";
