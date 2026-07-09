"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  z: number;
  size: number;
  color: string;
}

export default function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Create particles
    const particleCount = 200;
    const particles: Particle[] = [];
    const colors = ["#00D6FF", "#0B4FFF", "#00F5FF"];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        // Distribute in a 3D sphere/box
        x: (Math.random() - 0.5) * width * 1.5,
        y: (Math.random() - 0.5) * height * 1.5,
        z: Math.random() * 1000 - 500, // Depth between -500 and 500
        size: Math.random() * 1.5 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    // Handle mouse movement for parallax
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -0.5 to 0.5
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 40;
      mouseRef.current.targetY = (e.clientY / window.innerHeight - 0.5) * 40;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Handle window resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const fov = 400; // Focal length

    // Render loop
    const render = () => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse follow
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Rotation angles (slow drifting)
      const angleY = 0.0008;
      const angleX = 0.0003;

      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      // Sort particles by depth Z (painter's algorithm) so back particles are drawn first
      particles.sort((a, b) => b.z - a.z);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // 3D rotations
        // Rotate around Y axis
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.z * cosY + p.x * sinY;

        // Rotate around X axis
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + p.y * sinX;

        p.x = x1;
        p.y = y2;
        p.z = z2;

        // Perspective Projection
        // Offset by mouse parallax
        const screenX = ((p.x + mouseRef.current.x) * fov) / (p.z + fov + 600) + width / 2;
        const screenY = ((p.y + mouseRef.current.y) * fov) / (p.z + fov + 600) + height / 2;

        // Only draw if within screen boundaries plus some margin
        if (screenX >= 0 && screenX <= width && screenY >= 0 && screenY <= height) {
          // Opacity based on depth (z ranges from -500 to 500, translate to 0.15 to 0.7)
          const zDepth = p.z + 500; // 0 to 1000
          const alpha = Math.min(Math.max(1 - zDepth / 1000, 0.15), 0.7);
          const size = p.size * (fov / (p.z + fov + 600)) * 1.5;

          ctx.beginPath();
          ctx.arc(screenX, screenY, Math.max(size, 0.5), 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = alpha;
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
}
