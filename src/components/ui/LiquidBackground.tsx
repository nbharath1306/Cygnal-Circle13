"use client";

import { useEffect, useRef } from "react";

export function LiquidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track mouse position relative to window
    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    // Create luxury fluid particles/blobs (deep dark blues, dark golds, soft emeralds)
    const blobs = [
      { x: width * 0.25, y: height * 0.25, radius: 250, vx: 0.2, vy: 0.3, color: "rgba(10, 132, 255, 0.15)" }, // iOS Blue
      { x: width * 0.75, y: height * 0.4, radius: 300, vx: -0.3, vy: 0.2, color: "rgba(255, 214, 10, 0.08)" }, // Gold
      { x: width * 0.5, y: height * 0.75, radius: 280, vx: 0.15, vy: -0.25, color: "rgba(48, 209, 88, 0.12)" }, // iOS Green
    ];

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Interpolate mouse movement smoothly
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Draw and animate blobs
      blobs.forEach((blob) => {
        // Move blobs organically
        blob.x += blob.vx;
        blob.y += blob.vy;

        // Wall collisions
        if (blob.x - blob.radius < 0 || blob.x + blob.radius > width) blob.vx *= -1;
        if (blob.y - blob.radius < 0 || blob.y + blob.radius > height) blob.vy *= -1;

        // Gentle pull towards the cursor
        const dx = mouse.x - blob.x;
        const dy = mouse.y - blob.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 800) {
          blob.x += dx * 0.002;
          blob.y += dy * 0.002;
        }

        // Draw radial gradient for the beautiful neon ambient glow
        const gradient = ctx.createRadialGradient(
          blob.x,
          blob.y,
          0,
          blob.x,
          blob.y,
          blob.radius
        );
        gradient.addColorStop(0, blob.color);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-20 w-full h-full pointer-events-none bg-black"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
