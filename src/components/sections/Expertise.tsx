"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

const expertise = [
  {
    title: "SYSTEM DIAGNOSTICS & MONITORING",
    name: "Monitoring",
    id: "DIAG_NODE",
    desc: "Predicting hardware/software friction, resolving TCP/IP routing bugs, and analyzing system event logs before escalations arise.",
    color: "cyan-glint",
    img: "https://images.pexels.com/photos/34060047/pexels-photo-34060047.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80",
  },
  {
    title: "INFRASTRUCTURE & CYBERSECURITY",
    name: "Security",
    id: "SEC_CORE",
    desc: "Hardening system listeners, setting up active honeypot traps, and applying iron-clad firewall configurations across Linux & Windows environments.",
    color: "scarlet-accent",
    img: "https://images.pexels.com/photos/17056389/pexels-photo-17056389.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80",
  },
  {
    title: "AWS CLOUD OPERATIONS",
    name: "Cloud Support",
    id: "CLOUD_OPS",
    desc: "Governing complex AWS cloud topologies (EC2, S3, IAM) and troubleshooting cloud services to maintain maximum application uptime.",
    color: "bioluminescent-blue",
    img: "https://images.pexels.com/photos/28320734/pexels-photo-28320734.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80",
  },
  {
    title: "FULL STACK WEB DEVELOPMENT",
    name: "Full Stack Development",
    id: "FULL_STACK",
    desc: "Building highly interactive web applications using React/Next.js alongside robust Node.js/Express APIs and secure MySQL/MongoDB databases.",
    color: "cyan-glint",
    img: "https://images.pexels.com/photos/1181248/pexels-photo-1181248.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80",
  },
];

export default function Expertise() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".expertise-header", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 95%",
        },
      });
    }, sectionRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="expertise" className="relative py-32 bg-[#040506]/35 border-t border-white/5 overflow-hidden z-10">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-glint/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="expertise-header flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-1 h-1 bg-cyan-glint rounded-full" />
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-cyan-glint">
                Core Competencies
              </span>
            </div>
            <h2 className="font-space text-5xl md:text-8xl font-black tracking-tighter mb-8 uppercase leading-[0.85]">
              TECHNICAL<br />
              <span className="text-transparent text-stroke text-white/30">EXPERTISE.</span>
            </h2>
            <p className="text-white/70 text-lg md:text-xl leading-relaxed font-light font-space max-w-xl">
              Mastering foundational disciplines of cloud engineering, infrastructure security, and system diagnostics.
            </p>
          </div>
          <div className="flex flex-col items-end gap-4 mb-2">
            <div className="flex gap-4">
              <div className="px-6 py-3 rounded-full border border-white/10 text-[10px] font-mono tracking-widest uppercase text-white/80 bg-white/2">
                AWS Certified
              </div>
              <div className="px-6 py-3 rounded-full border border-cyan-glint/30 text-[10px] font-mono tracking-widest uppercase text-cyan-glint bg-cyan-glint/5 shadow-[0_0_20px_rgba(0,214,255,0.05)]">
                IT Specialist
              </div>
            </div>
            <span className="font-mono text-[8px] text-white/50 uppercase tracking-[0.5em]">Active Credentials</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 h-[1700px] md:h-[650px] w-full">
          {expertise.map((item, i) => (
            <div 
              key={i}
              className="expertise-banner flex-1 relative overflow-hidden rounded-3xl cursor-pointer group transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:flex-[3.5] border border-white/5 hover:border-cyan-glint/30 shadow-2xl bg-midnight/35 hover:bg-midnight/55"
            >
              {/* Image Container with Parallax-like scale */}
              <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-110">
                <Image 
                  src={item.img} 
                  alt={item.title}
                  fill
                  unoptimized
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 opacity-25 group-hover:opacity-80"
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/30 to-transparent opacity-60 group-hover:opacity-85 transition-all duration-700"></div>
              
              <div className="absolute top-10 right-10 flex flex-col items-end gap-2 font-mono text-[9px] text-white/30 group-hover:text-cyan-glint/70 transition-colors uppercase tracking-[0.3em]">
                <span>Expertise 0{i+1}</span>
                <span className="opacity-50">STATUS: ACTIVE</span>
              </div>

              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-14">
                <div className="mb-8 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all translate-y-0 md:translate-y-8 group-hover:translate-y-0 duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-100">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-12 h-px ${
                      item.color === 'cyan-glint' ? 'bg-cyan-glint' :
                      item.color === 'scarlet-accent' ? 'bg-scarlet-accent' :
                      'bg-bioluminescent-blue'
                    }`} />
                    <span className={`text-[11px] font-mono tracking-[0.4em] uppercase font-bold ${
                      item.color === 'cyan-glint' ? 'text-cyan-glint shadow-[0_0_10px_rgba(0,214,255,0.5)]' :
                      item.color === 'scarlet-accent' ? 'text-scarlet-accent' :
                      'text-bioluminescent-blue'
                    }`}>
                      {item.name}
                    </span>
                  </div>
                  <p className="text-white/80 text-lg md:text-xl max-w-sm font-light leading-relaxed font-space">
                    {item.desc}
                  </p>
                </div>
                
                <h3 className="font-space text-4xl md:text-6xl font-black tracking-tighter text-white group-hover:text-glow-cyan transition-all duration-500 leading-[0.85] uppercase">
                  {item.title.split(' ').map((word, idx) => (
                    <span key={idx} className="block">{word}</span>
                  ))}
                </h3>
              </div>

              {/* HUD corners */}
              <div className="hud-corner corner-tl opacity-0 group-hover:opacity-40 transition-opacity" />
              <div className="hud-corner corner-br opacity-0 group-hover:opacity-40 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
