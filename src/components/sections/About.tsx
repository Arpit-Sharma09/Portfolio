"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ResumeModal from "../ui/ResumeModal";

const skillGroups = [
  {
    title: "Frontend Development",
    id: "FRONTEND_NODE",
    skills: [
      { name: "HTML5 & CSS3", status: "95%" },
      { name: "JavaScript (ES6+)", status: "90%" },
      { name: "React.js", status: "85%" },
      { name: "Responsive UI", status: "92%" },
    ],
    icon: "🎨",
    span: "md:col-span-2 col-span-1",
  },
  {
    title: "Backend Development",
    id: "BACKEND_KERN",
    skills: [
      { name: "Node.js / Express", status: "88%" },
      { name: "MongoDB", status: "82%" },
      { name: "REST APIs", status: "90%" },
      { name: "JWT Auth", status: "85%" },
    ],
    icon: "⚙️",
    span: "md:col-span-1 col-span-1",
  },
  {
    title: "Cloud & DevOps",
    id: "CLOUD_DEV",
    skills: [
      { name: "AWS (EC2/S3/Lambda)", status: "80%" },
      { name: "Git / GitHub", status: "92%" },
      { name: "Docker Containers", status: "75%" },
      { name: "CI/CD Pipelines", status: "78%" },
    ],
    icon: "☁️",
    span: "md:col-span-1 col-span-1",
  },
  {
    title: "IT Support & Security",
    id: "SUPPORT_SEC",
    skills: [
      { name: "Network Diagnostics", status: "88%" },
      { name: "InfoSec Fundamentals", status: "Certified" },
      { name: "Win/Linux Support", status: "Expert" },
      { name: "Troubleshooting", status: "95%" },
    ],
    icon: "🛡️",
    span: "md:col-span-2 col-span-1",
  },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".about-title", {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from(".skill-card", {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".skills-bento",
          start: "top 80%",
        },
      });

      if (textRef.current) {
        const words = textRef.current.querySelectorAll(".word");
        gsap.from(words, {
          opacity: 0,
          y: 20,
          stagger: 0.03,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const bioText = "I am a motivated Computer Science Engineering student specializing in full-stack development, AWS cloud operations, networking, and security diagnostics. Certified in AWS Cloud Support Essentials and Infosys Security Fundamentals, I build high-availability architectures and troubleshoot system layers. I apply a highly organized approach to IT support, system audits, and clean code execution.";

  return (
    <section ref={sectionRef} id="about" className="py-32 bg-[#08101A]/35 border-t border-white/5 relative overflow-hidden z-10">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(0,214,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,214,255,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px"
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-start mb-32">
          {/* Left: System Profile Card (Variant 3) */}
          <div className="lg:col-span-4 space-y-8">
            <div className="terminal-window p-8 relative overflow-hidden group">
              <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-cyan-glint">Profile Details</h3>
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              </div>
              <div className="space-y-6 font-mono">
                  <div className="flex flex-col gap-1">
                      <span className="text-[9px] opacity-60 uppercase">Cloud & DevOps Mastery</span>
                      <div className="w-full h-1 bg-white/5">
                          <div className="w-[85%] h-full bg-cyan-glint shadow-[0_0_10px_#00D6FF]" />
                      </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-[10px]">
                      <div className="flex justify-between border-b border-white/5 pb-1">
                          <span className="opacity-60 uppercase text-[8px]">Name:</span>
                          <span className="text-white">Arpit Sharma</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-1">
                          <span className="opacity-60 uppercase text-[8px]">Availability:</span>
                          <span className="text-green-500">Open to Work</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-1">
                          <span className="opacity-60 uppercase text-[8px]">Specialty:</span>
                          <span className="text-white">Cloud & Sec</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-1">
                          <span className="opacity-60 uppercase text-[8px]">SLA:</span>
                          <span className="text-white">99.9% Uptime</span>
                      </div>
                  </div>
              </div>
              <div className="hud-corner corner-tl opacity-40" />
              <div className="hud-corner corner-br opacity-40" />
            </div>

            <div className="p-8 border border-white/5 bg-black/20 rounded-2xl">
               <h4 className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/50 mb-4">Key.Milestones</h4>
               <div className="space-y-4">
                  <div className="flex justify-between items-end">
                     <span className="font-mono text-[10px] text-white/70 uppercase">Projects Deployed</span>
                     <span className="font-space text-3xl font-black text-white">4</span>
                  </div>
                  <div className="h-px bg-white/5 w-full" />
                  <div className="flex justify-between items-end">
                     <span className="font-mono text-[10px] text-white/70 uppercase">Cloud Nodes</span>
                     <span className="font-space text-3xl font-black text-white">50+</span>
                  </div>
               </div>
            </div>
          </div>

          {/* Right: Bio Text (Variant 1) */}
          <div className="lg:col-span-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-cyan-glint mb-6 block">
              Profile Summary
            </span>
            <h2 className="about-title font-space text-5xl md:text-8xl font-black tracking-tighter leading-[0.85] uppercase mb-12">
              Architecting<br />
              <span className="text-transparent text-stroke text-white/40">Digital</span><br />
              <span className="text-cyan-glint text-glow-cyan">Resilience.</span>
            </h2>
            <p ref={textRef} className="text-white/80 text-xl md:text-3xl leading-relaxed font-light font-space max-w-3xl">
              {bioText.split(" ").map((word, i) => (
                <span key={i} className="word inline-block mr-[0.3em]">
                  {word}
                </span>
              ))}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button
                onClick={() => setIsResumeOpen(true)}
                className="px-6 py-3 border border-cyan-glint text-cyan-glint font-bold text-xs uppercase tracking-widest hover:bg-cyan-glint hover:text-black transition-all duration-300 rounded cursor-pointer"
              >
                View Full Resume
              </button>
              <a
                href="/resume.pdf"
                download="Arpit_Sharma_Resume.pdf"
                className="px-6 py-3 bg-white/5 border border-white/10 hover:border-white/20 text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 rounded flex items-center gap-2"
              >
                Download CV
              </a>
            </div>
          </div>
        </div>

        {/* Bento Grid Skills */}
        <div className="skills-bento grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillGroups.map((group, i) => (
            <div
              key={i}
              className={`skill-card terminal-window p-8 relative group overflow-hidden ${group.span}`}
            >
              <div className="absolute top-0 right-0 p-4 font-mono text-[8px] opacity-20 uppercase tracking-widest">
                Skills // 0{i + 1}
              </div>
              
              <div className="flex items-center gap-4 mb-8">
                <span className="text-2xl">{group.icon}</span>
                <h3 className="font-mono text-lg font-bold text-cyan-glint uppercase tracking-tighter">
                  {group.title}
                </h3>
              </div>

              <div className="space-y-4">
                {group.skills.map((skill, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-black/40 p-3 border border-white/5 group-hover:border-cyan-glint/20 transition-colors">
                    <span className="font-mono text-[11px] uppercase text-white/70">{skill.name}</span>
                    <span className={`font-mono text-[9px] px-2 py-0.5 rounded-sm font-bold ${
                      skill.status === 'Certified' || skill.status === 'Expert' || skill.status === '95%'
                        ? 'bg-green-500/10 text-green-500'
                        : 'bg-cyan-glint/10 text-cyan-glint'
                    }`}>
                      {skill.status}
                    </span>
                  </div>
                ))}
              </div>

              <div className="hud-corner corner-tl opacity-20" />
              <div className="hud-corner corner-br opacity-20 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 pointer-events-none bg-linear-to-b from-transparent via-cyan-glint/5 to-transparent bg-[length:100%_4px] animate-scanline opacity-0 group-hover:opacity-20 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </section>
  );
}
