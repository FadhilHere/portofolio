"use client";

import { useEffect, useRef } from "react";

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (!ctx) return;

    let raf: number;
    let particles: Array<{
      x: number;
      y: number;
      len: number;
      angle: number;
      speed: number;
      drift: number;
      color: string;
      alpha: number;
    }> = [];

    const colors = ["#3fb950", "#d4af37", "#58a6ff", "#7d8590"];

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth * (window.devicePixelRatio || 1);
      canvas.height = window.innerHeight * (window.devicePixelRatio || 1);
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    }

    function init() {
      particles = Array.from({ length: 80 }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        len: 4 + Math.random() * 8,
        angle: Math.random() * Math.PI * 2,
        speed: 0.1 + Math.random() * 0.25,
        drift: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 0.2 + Math.random() * 0.4,
      }));
    }

    function frame() {
      if (!canvas) return;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (const p of particles) {
        p.drift += 0.004;
        p.x += Math.cos(p.drift) * p.speed;
        p.y += Math.sin(p.drift) * p.speed;

        const dx = p.x - mouse.current.x;
        const dy = p.y - mouse.current.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 100) {
          const f = (100 - dist) / 100;
          p.x += (dx / dist) * f * 1.8;
          p.y += (dy / dist) * f * 1.8;
        }

        if (p.x < -10) p.x = window.innerWidth + 10;
        if (p.x > window.innerWidth + 10) p.x = -10;
        if (p.y < -10) p.y = window.innerHeight + 10;
        if (p.y > window.innerHeight + 10) p.y = -10;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle + p.drift);
        ctx.strokeStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(-p.len / 2, 0);
        ctx.lineTo(p.len / 2, 0);
        ctx.stroke();
        ctx.restore();
      }
      raf = requestAnimationFrame(frame);
    }

    resize();
    init();
    frame();

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    const onLeave = () => {
      mouse.current = { x: -9999, y: -9999 };
    };
    const onResize = () => {
      resize();
      init();
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-screen h-screen pointer-events-none z-0"
    />
  );
}
