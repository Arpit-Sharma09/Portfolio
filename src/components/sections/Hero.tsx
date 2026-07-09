"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

const roles = [
  "Cloud Support Engineer",
  "Cybersecurity Analyst",
  "Network Specialist",
  "Full-Stack Developer",
];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const scanlineRef = useRef<HTMLDivElement>(null);
  const nameScrollRef = useRef<HTMLDivElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length + 1));
      }, 80);
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length - 1));
      }, 40);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Massive name scaling
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

      heroTl.to(nameScrollRef.current, {
        scale: 0.1,
        y: -window.innerHeight * 0.45,
        opacity: 0,
        ease: "power2.inOut"
      }, 0);

      heroTl.to(".hero-fade-out", {
        opacity: 0,
        y: -50,
        stagger: 0.1,
        ease: "power2.inOut"
      }, 0);

      gsap.from(".hero-reveal", {
        opacity: 0,
        y: 60,
        duration: 1.4,
        stagger: 0.15,
        ease: "power4.out",
        delay: 0.3,
      });

      gsap.to(scanlineRef.current, {
        top: "100%",
        duration: 3,
        repeat: -1,
        ease: "linear",
      });

      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const x = (clientX - window.innerWidth / 2) / 30;
        const y = (clientY - window.innerHeight / 2) / 30;

        gsap.to(hudRef.current, {
          x,
          y,
          duration: 1,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-[160vh] flex flex-col items-center z-10"
    >

      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        <div className="relative z-10 text-center px-6 w-full">
          <div
            ref={hudRef}
            className="relative inline-block p-5 sm:p-10 md:p-20 bg-white/[0.02] border border-white/10 rounded-3xl hero-fade-out shadow-2xl w-full max-w-[90vw] sm:max-w-none sm:w-auto"
          >
            <div className="hud-corner corner-tl opacity-40" />
            <div className="hud-corner corner-tr opacity-40" />
            <div className="hud-corner corner-bl opacity-40" />
            <div className="hud-corner corner-br opacity-40" />
            <div ref={scanlineRef} className="scanline opacity-5" />

            <div className="flex flex-col items-center gap-5 sm:gap-6">
              {/* Status pill */}
              <span className="hero-reveal inline-flex items-center gap-2 sm:gap-3 bg-white/5 border border-white/10 rounded-full px-3 sm:px-5 py-2 max-w-full">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-glint animate-pulse shrink-0" />
                <span className="text-white/80 font-mono text-[8px] sm:text-[10px] tracking-[0.1em] sm:tracking-[0.3em] uppercase text-center">
                  Available for Opportunities / Relocation
                </span>
              </span>

              {/* Name */}
              <div ref={nameScrollRef} className="w-full text-center">
                <h1
                  className="hero-reveal font-space text-[10vw] sm:text-[9vw] md:text-[8vw] font-black leading-none tracking-tighter text-white uppercase sm:whitespace-nowrap text-glow-cyan"
                >
                  ARPIT SHARMA
                </h1>
              </div>

              {/* Typewriter role */}
              <div className="hero-reveal font-mono text-xs sm:text-sm md:text-base text-[#00D6FF] tracking-[0.2em] sm:tracking-[0.4em] uppercase h-6 flex items-center glow-cyan">
                <span className="mr-2">&gt;</span>
                <span>{displayed}</span>
                <span className="w-[2px] h-4 bg-cyan-glint ml-1 animate-pulse" />
              </div>

              {/* Divider */}
              <div className="hero-reveal flex items-center gap-3 sm:gap-6">
                <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#00D6FF] shrink-0 hidden sm:block" />
                <span className="text-white/80 font-mono text-[8px] sm:text-[10px] tracking-wider sm:tracking-widest uppercase text-center">
                  AWS & Cybersecurity Specialized
                </span>
                <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#00D6FF] shrink-0 hidden sm:block" />
              </div>
            </div>
          </div>

          {/* Tagline */}
          <div className="mt-16 flex flex-col items-center gap-6 hero-reveal hero-fade-out">
            <p className="font-space text-lg md:text-xl text-white/70 max-w-2xl font-light leading-relaxed">
              Computer Science Engineer specializing in AWS Cloud Support, Network operations, and Cybersecurity. Building and protecting resilient, high-availability digital infrastructures.
            </p>

            <div className="w-px h-20 bg-gradient-to-b from-cyan-glint to-transparent mt-4 animate-pulse" />
          </div>
        </div>

        {/* Bottom-left status readout */}
        <div className="absolute bottom-10 left-10 hidden lg:block hero-reveal hero-fade-out">
          <div className="font-mono text-[10px] text-white/60 space-y-1 text-left">
            <div>SPECIALIZATION: CLOUD & NETWORKS</div>
            <div>NET_STATUS: SECURE</div>
          </div>
        </div>

        {/* Bottom-right scroll hint */}
        <div className="absolute bottom-10 right-10 hidden lg:block hero-reveal hero-fade-out">
          <div className="flex flex-col items-center gap-2 opacity-70">
            <span className="font-mono text-[9px] uppercase tracking-[0.5em] rotate-90 mb-6 text-white">
              Scroll
            </span>
            <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
