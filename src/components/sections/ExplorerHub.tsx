"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Folder, Code2, ExternalLink } from "lucide-react";
import Image from "next/image";

const terminalLines = [
  { text: "Initializing credential verification system...", color: "text-cyan-glint/80", delay: 0 },
  { text: "Checking AWS training registries... [OK]", color: "text-white/70", delay: 300 },
  { text: "Checking academic certification records... [OK]", color: "text-white/70", delay: 600 },
  { text: "Retrieving verified badges...", color: "text-cyan-glint/80", delay: 900 },
  { text: "✔ AWS Cloud Support Essentials [VERIFIED]", color: "text-green-400/90", delay: 1200 },
  { text: "✔ AWS Technical Essentials [VERIFIED]", color: "text-green-400/90", delay: 1400 },
  { text: "✔ Infosys Information Security Fundamentals [VERIFIED]", color: "text-green-400/90", delay: 1600 },
  { text: "✔ NPTEL Software Conceptual Design [VERIFIED]", color: "text-green-400/90", delay: 1800 },
  { text: "✔ TCIL-IT Machine Learning Essentials [VERIFIED]", color: "text-green-400/90", delay: 2000 },
  { text: "✔ CS Infotech PHP Web Development [VERIFIED]", color: "text-green-400/90", delay: 2200 },
  { text: "All 6 credentials verified successfully.", color: "text-cyan-glint/80", delay: 2500 },
];

const explorerCards = [
  {
    tag: "Certification 01",
    title: "AWS CLOUD SUPPORT",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&w=800&q=80&fit=crop",
    color: "cyan-glint",
    desc: "AWS Cloud Support Essentials Certified",
    link: "https://www.coursera.org/account/accomplishments/records/56FE4NFTPA6C",
  },
  {
    tag: "Certification 02",
    title: "AWS TECHNICAL ESSENTIALS",
    img: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&w=800&q=80&fit=crop",
    color: "scarlet-accent",
    desc: "AWS Cloud Infrastructure Fundamentals Certified",
    link: "https://www.coursera.org/account/accomplishments/verify/L3WE91XE4S2C",
  },
  {
    tag: "Certification 03",
    title: "INFO SECURITY",
    img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&w=800&q=80&fit=crop",
    color: "bioluminescent-blue",
    desc: "Infosys Information Security Fundamentals Certified",
    link: "/infosys-security-cert.pdf",
  },
  {
    tag: "Certification 04",
    title: "PHP WEB DEVELOPMENT",
    img: "https://images.unsplash.com/photo-1599507591144-667d4f3ff3a2?auto=format&w=800&q=80&fit=crop",
    color: "cyan-glint",
    desc: "CS Infotech PHP Dev & MySQL Certified",
    link: "https://github.com/Arpit-Sharma09",
  },
  {
    tag: "Certification 05",
    title: "SOFTWARE DESIGN",
    img: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&w=800&q=80&fit=crop",
    color: "scarlet-accent",
    desc: "NPTEL Software Conceptual Design Certified",
    link: "/nptel-software-design-cert.pdf",
  },
  {
    tag: "Certification 06",
    title: "MACHINE LEARNING",
    img: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?auto=format&w=800&q=80&fit=crop",
    color: "bioluminescent-blue",
    desc: "TCIL-IT Machine Learning Essentials Certified",
    link: "https://github.com/Arpit-Sharma09",
  },
];

export default function ExplorerHub() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleLines, setVisibleLines] = useState(0);
  const [terminalTriggered, setTerminalTriggered] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".terminal-window", {
        scale: 0.97,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          onEnter: () => setTerminalTriggered(true),
        },
      });
    }, sectionRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  // Typewriter terminal lines
  useEffect(() => {
    if (!terminalTriggered) return;

    terminalLines.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines((prev) => Math.max(prev, i + 1));
      }, line.delay);
    });
  }, [terminalTriggered]);

  return (
    <section ref={sectionRef} id="archive" className="py-32 bg-[#08101A]/35 border-t border-white/5 relative z-10">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Left column */}
          <div className="lg:col-span-4 space-y-10">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-cyan-glint block mb-4">
                Credentials & Projects
              </span>
              <h2 className="font-space text-5xl md:text-6xl font-bold tracking-tighter uppercase leading-none">
                CERTIFICATIONS
                <br />
                & ARCHIVE
              </h2>
            </div>
            <p className="text-white/70 text-lg leading-relaxed font-light">
              A verified catalog of professional cloud and development credentials, academic achievements, and side projects.
            </p>

            <div className="space-y-2">
              <a
                href="https://github.com/Arpit-Sharma09"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group cursor-pointer p-4 rounded-xl hover:bg-white/5 transition-all border border-transparent hover:border-white/5"
              >
                <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-cyan-glint group-hover:bg-cyan-glint/10 transition-all">
                  <Folder className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm uppercase tracking-widest mb-1">
                    Prototypes
                  </h4>
                  <p className="text-[10px] text-white/60 uppercase">
                    14 Items · 2.4 GB
                  </p>
                </div>
                <ExternalLink className="w-4 h-4 text-white/50 group-hover:text-cyan-glint transition-colors" />
              </a>
              <a
                href="https://github.com/Arpit-Sharma09?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group cursor-pointer p-4 rounded-xl hover:bg-white/5 transition-all border border-transparent hover:border-white/5"
              >
                <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-scarlet-accent group-hover:bg-scarlet-accent/10 transition-all">
                  <Code2 className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm uppercase tracking-widest mb-1">
                    Open Source
                  </h4>
                  <p className="text-[10px] text-white/60 uppercase">
                    32 Repos · 1.2k Stars
                  </p>
                </div>
                <ExternalLink className="w-4 h-4 text-white/50 group-hover:text-scarlet-accent transition-colors" />
              </a>
            </div>
          </div>

          {/* Right column */}
          <div className="lg:col-span-8 space-y-8">
            {/* Terminal */}
            <div className="terminal-window rounded-2xl overflow-hidden group relative">
              <div className="terminal-header flex items-center justify-between p-4 bg-white/3 border-b border-white/5 backdrop-blur-md">
                <div className="flex items-center gap-4">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/40" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/40" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/40" />
                  </div>
                  <span className="font-mono text-[9px] text-white/40 uppercase tracking-[0.2em]">
                    Credential Verification Ledger
                  </span>
                </div>
                <div className="w-2 h-2 rounded-full bg-cyan-glint/20 animate-pulse" />
              </div>
              <div className="p-8 font-mono text-sm space-y-2 min-h-[240px] bg-black/40 backdrop-blur-xl">
                {terminalLines.slice(0, visibleLines).map((line, i) => (
                  <div key={i} className={`flex gap-4 ${line.color}`}>
                    <span className="text-white/10 select-none w-6 shrink-0 text-right">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="leading-relaxed">{line.text}</span>
                  </div>
                ))}
                {terminalTriggered && visibleLines < terminalLines.length && (
                  <div className="flex gap-4 text-cyan-glint/80">
                    <span className="text-white/10 select-none w-6 shrink-0 text-right">
                      {String(visibleLines + 1).padStart(2, '0')}
                    </span>
                    <span className="w-2 h-4 bg-cyan-glint animate-pulse inline-block" />
                  </div>
                )}
              </div>
              
              <div className="hud-corner corner-tl opacity-20" />
              <div className="hud-corner corner-br opacity-20 group-hover:opacity-60 transition-opacity" />
            </div>

            {/* Explorer Grid */}
            <div className="explorer-grid grid grid-cols-1 sm:grid-cols-2 gap-6">
              {explorerCards.map((card, i) => (
                <a
                  key={i}
                  href={card.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="explorer-card relative group h-64 rounded-3xl overflow-hidden border border-white/5 hover:border-cyan-glint/20 block cursor-pointer transition-all duration-500 bg-glass"
                >
                  <Image
                    src={card.img}
                    alt={card.title}
                    fill
                    unoptimized
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100 opacity-50 group-hover:opacity-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/20 to-transparent group-hover:via-midnight/40 transition-all" />
                  
                  <div className="absolute top-6 right-6 flex items-center gap-1.5 font-mono text-[8px] text-white/50 group-hover:text-cyan-glint transition-all uppercase tracking-widest">
                    <span>Verify</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </div>

                  <div className="absolute bottom-8 left-8 right-8">
                    <span
                      className={`font-mono text-[9px] uppercase block mb-2 tracking-[0.2em] ${
                        card.color === "cyan-glint"
                          ? "text-cyan-glint"
                          : card.color === "scarlet-accent"
                          ? "text-scarlet-accent"
                          : "text-cyan-glint"
                      }`}
                    >
                      {card.tag}
                    </span>
                    <h4 className="font-space text-2xl font-black uppercase leading-none tracking-tighter text-white group-hover:text-glow-cyan transition-all">
                      {card.title}
                    </h4>
                    <p className="text-white/90 text-[11px] mt-3 font-normal leading-relaxed font-space">
                      {card.desc}
                    </p>
                  </div>
                  
                  <div className="hud-corner corner-tl opacity-0 group-hover:opacity-20 transition-opacity" />
                  <div className="hud-corner corner-br opacity-0 group-hover:opacity-20 transition-opacity" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
