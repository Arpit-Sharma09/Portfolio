"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, Award, Lock, Network, ChartNoAxesColumn, Globe, Users, CupSoda } from "lucide-react";

const stats = [
  {
    label: "Professional Certs",
    value: 6,
    suffix: "",
    sub: "AWS, Infosys, NPTEL, TCIL",
    icon: ShieldCheck,
    color: "cyan-glint",
  },
  {
    label: "Projects Completed",
    value: 5,
    suffix: "",
    sub: "LMS, Honeypot, OCR & Bus",
    icon: Network,
    color: "bioluminescent-blue",
  },
  {
    label: "Intermediate Score",
    value: 81.6,
    suffix: "%",
    sub: "CBSE Class XII (81.6%)",
    icon: Award,
    color: "scarlet-accent",
  },
  {
    label: "B.Tech CSE Graduate",
    value: 2026,
    suffix: "",
    sub: "CGC Landran · 7.8 CGPA",
    icon: Lock,
    color: "cyan-glint",
  },
];

function AnimatedCounter({
  target,
  suffix,
  rawDisplay,
  color,
  triggered,
}: {
  target: number;
  suffix: string;
  rawDisplay?: string;
  color: string;
  triggered: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!triggered || rawDisplay) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current * 10) / 10);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [triggered, target, rawDisplay]);

  const colorClass =
    color === "cyan-glint"
      ? "text-cyan-glint"
      : color === "bioluminescent-blue"
      ? "text-bioluminescent-blue"
      : "text-scarlet-accent";

  return (
    <div className={`font-space text-5xl md:text-6xl font-black ${colorClass}`}>
      {rawDisplay ? rawDisplay : `${count}${suffix}`}
    </div>
  );
}


const certs = [
  { icon: Award, label: "AWS Cloud Support Essentials" },
  { icon: Award, label: "AWS Technical Essentials" },
  { icon: ShieldCheck, label: "Infosys Information Security Fundamentals" },
  { icon: Lock, label: "NPTEL Software Conceptual Design" },
  { icon: Network, label: "TCIL-IT Machine Learning Essentials" },
  { icon: ShieldCheck, label: "CS Infotech PHP Web Development" },
];

function CertificationsTicker() {
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".ticker-content", {
        xPercent: -50,
        repeat: -1,
        duration: 30,
        ease: "none",
      });
    }, tickerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={tickerRef} className="relative py-24 bg-black/65 backdrop-blur-[1px] border-y border-white/5 overflow-hidden mt-32">
      <div className="ticker-content flex items-center gap-16 whitespace-nowrap">
        {[...certs, ...certs].map((cert, i) => (
          <div key={i} className="flex items-center gap-6">
            <cert.icon className="w-8 h-8 text-cyan-glint opacity-70" />
            <span className="font-space text-3xl md:text-5xl font-black uppercase tracking-tighter text-white/70 hover:text-cyan-glint transition-colors duration-500 cursor-default">
              {cert.label}
            </span>
            <div className="w-2 h-2 rounded-full bg-cyan-glint/20" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="stats"
      className="py-32 bg-[#040506]/35 relative overflow-hidden z-10 border-t border-white/5"
    >
      {/* Radial glow bg */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-bioluminescent-blue),transparent_70%)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24 relative">
          {/* Ghost text */}
          <h2 className="font-space text-[10vw] font-black italic tracking-tighter leading-none text-white/[0.04] absolute -top-10 left-1/2 -translate-x-1/2 pointer-events-none select-none whitespace-nowrap uppercase">
            Milestones
          </h2>
          <h2 className="font-space text-5xl md:text-6xl font-bold tracking-tighter mb-4 uppercase relative z-10">
            METRICS & MILESTONES
          </h2>
          <p className="text-white/70 uppercase tracking-[0.5em] text-xs">
            Academic & Professional Highlights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`bounty-card h-full flex flex-col justify-between group transition-all duration-700 cursor-default ${
                stat.color === "cyan-glint"
                  ? "hover:border-cyan-glint/40"
                  : stat.color === "bioluminescent-blue"
                  ? "hover:border-bioluminescent-blue/40"
                  : "hover:border-scarlet-accent/40"
              } ${
                triggered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{
                transitionDelay: `${i * 100}ms`,
                transitionProperty: "opacity, transform, border-color",
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span
                    className={`font-mono text-[10px] uppercase tracking-widest ${
                      stat.color === "cyan-glint"
                        ? "text-cyan-glint"
                        : stat.color === "bioluminescent-blue"
                        ? "text-bioluminescent-blue"
                        : "text-scarlet-accent"
                    }`}
                  >
                    {stat.label}
                  </span>
                  <stat.icon
                    className={`w-4 h-4 opacity-70 ${
                      stat.color === "cyan-glint"
                        ? "text-cyan-glint"
                        : stat.color === "bioluminescent-blue"
                        ? "text-bioluminescent-blue"
                        : "text-scarlet-accent"
                    }`}
                  />
                </div>

                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  rawDisplay={(stat as { rawDisplay?: string }).rawDisplay}
                  color={stat.color}
                  triggered={triggered}
                />
              </div>

              <div>
                <div className="mt-8 flex items-center justify-between text-white/60 text-[10px] font-mono border-t border-white/5 pt-4">
                  <span>{stat.sub}</span>
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    stat.color === "cyan-glint"
                      ? "bg-cyan-glint"
                      : stat.color === "bioluminescent-blue"
                      ? "bg-bioluminescent-blue"
                      : "bg-scarlet-accent"
                  } animate-pulse`} />
                </div>
              </div>

              {/* Hover glow */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div
                  className={`absolute top-0 right-0 w-32 h-32 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 ${
                    stat.color === "cyan-glint"
                      ? "bg-cyan-glint/10"
                      : stat.color === "bioluminescent-blue"
                      ? "bg-bioluminescent-blue/10"
                      : "bg-scarlet-accent/10"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <CertificationsTicker />
    </section>
  );
}
