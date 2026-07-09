"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function GlowingTicker() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textLeftRef = useRef<HTMLDivElement>(null);
  const textRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const textLeft = textLeftRef.current;
    const textRight = textRightRef.current;

    if (!container || !textLeft || !textRight) return;

    const ctx = gsap.context(() => {
      // Line 1: scroll-triggered horizontal movement (left)
      gsap.fromTo(
        textLeft,
        { x: "-10%" },
        {
          x: "-45%",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );

      // Line 2: scroll-triggered horizontal movement (right)
      gsap.fromTo(
        textRight,
        { x: "-45%" },
        {
          x: "-10%",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );

      // Line 1: Neon Cyan glow transition linked to scroll
      gsap.fromTo(
        textLeft,
        { 
          opacity: 0.15,
          filter: "drop-shadow(0 0 0px rgba(0, 214, 255, 0))",
        },
        {
          opacity: 0.95,
          filter: "drop-shadow(0 0 12px rgba(0, 214, 255, 0.85))",
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            end: "center 45%",
            scrub: 1,
          },
        }
      );

      // Line 2: Neon Scarlet glow transition linked to scroll
      gsap.fromTo(
        textRight,
        { 
          opacity: 0.15,
          filter: "drop-shadow(0 0 0px rgba(255, 62, 62, 0))",
        },
        {
          opacity: 0.95,
          filter: "drop-shadow(0 0 12px rgba(255, 62, 62, 0.85))",
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            end: "center 45%",
            scrub: 1,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  const repeatTextLeft = Array(4).fill(
    "SYSTEM SECURED · FIREWALL AUDITED · PACKET FILTERED · INCIDENT RESPONDED · ENDPOINT HARDENED · APIS MONITORED · "
  ).join("");

  const repeatTextRight = Array(4).fill(
    "AWS DEPLOYED · CLOUD SUPPORTED · HIGH AVAILABILITY · LOAD BALANCED · CONTAINERIZED · DOCKERIZED · SYSTEM TUNED · "
  ).join("");

  return (
    <div
      ref={containerRef}
      className="w-full bg-[#040506]/35 py-12 md:py-20 border-t border-b border-white/5 overflow-hidden flex flex-col justify-center gap-6 md:gap-8 select-none relative z-10"
    >
      {/* HUD-style vertical grid lines */}
      <div className="absolute inset-y-0 left-[10vw] w-[1px] bg-white/5 pointer-events-none" />
      <div className="absolute inset-y-0 right-[10vw] w-[1px] bg-white/5 pointer-events-none" />

      {/* Row 1: Left Ticker (Cyan) */}
      <div className="whitespace-nowrap flex overflow-hidden">
        <div
          ref={textLeftRef}
          className="text-4xl md:text-7xl font-space font-black tracking-tighter uppercase text-transparent text-stroke text-cyan-glint/50 transition-all duration-300"
          style={{ willChange: "transform, filter" }}
        >
          {repeatTextLeft}
        </div>
      </div>

      {/* Row 2: Right Ticker (Scarlet) */}
      <div className="whitespace-nowrap flex overflow-hidden">
        <div
          ref={textRightRef}
          className="text-4xl md:text-7xl font-space font-black tracking-tighter uppercase text-transparent text-stroke text-scarlet-accent/50 transition-all duration-300"
          style={{ willChange: "transform, filter" }}
        >
          {repeatTextRight}
        </div>
      </div>
    </div>
  );
}
