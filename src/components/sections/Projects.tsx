"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const projects = [
  {
    tag: "Project_01",
    title: "HONEYPOT SYSTEM",
    desc: "Deployed a network monitoring system capturing and logging unauthorized access attempts on SSH and HTTP. Managed event logging, system configuration hardening, incident reporting, and real-time performance diagnostics.",
    tech: ["Python", "Flask", "Paramiko", "Linux"],
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&w=1200&q=80&fit=crop",
    color: "cyan-glint",
    bgColor: "deep-trench",
    link: "https://github.com/Arpit-Sharma09",
  },
  {
    tag: "Project_02",
    title: "SHIKSHARTHEE E-LEARNING",
    desc: "Engineered a full-stack Learning Management System (LMS) with role-based student/instructor dashboards. Developed RESTful APIs, JWT user auth, assignment quizzes, progress analytics, and Google Gemini AI assessments.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Gemini API"],
    img: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&w=1200&q=80&fit=crop",
    color: "scarlet-accent",
    bgColor: "midnight",
    link: "https://github.com/Arpit-Sharma09",
  },
  {
    tag: "Project_03",
    title: "BUS MANAGEMENT SYSTEM",
    desc: "Designed and engineered a centralized booking and routing management system for bus transit operations, optimizing fleet dispatch, seat allocations, real-time ticket availability, and schedule synchronization.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Redux"],
    img: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&w=1200&q=80&fit=crop",
    color: "cyan-glint",
    bgColor: "deep-trench",
    link: "https://github.com/Arpit-Sharma09",
  },
  {
    tag: "Project_04",
    title: "OPTICAL CHARACTER RECOGNIZER",
    desc: "Built a Python-based Optical Character Recognition desktop application parsing camera feed or uploaded images with spell checks, processing image filtering, and text outputting.",
    tech: ["Python", "EasyOCR", "OpenCV", "Tkinter"],
    img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&w=1200&q=80&fit=crop",
    color: "bioluminescent-blue",
    bgColor: "",
    link: "https://github.com/Arpit-Sharma09",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const track = trackRef.current;
    if (!track) return;

    const mm = gsap.matchMedia();

    // Horizontal pin-scroll scroll animation on desktop (MD screens and above)
    mm.add("(min-width: 768px)", () => {
      const tl = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tl.kill();
      };
    });

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);

    return () => {
      clearTimeout(timer);
      mm.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const colorClassMap: Record<string, string> = {
    "cyan-glint": "bg-cyan-glint/10 text-cyan-glint border-cyan-glint/20",
    "scarlet-accent": "bg-scarlet-accent/10 text-scarlet-accent border-scarlet-accent/20",
    "bioluminescent-blue": "bg-bioluminescent-blue/10 text-bioluminescent-blue border-bioluminescent-blue/20",
  };

  return (
    <section ref={sectionRef} id="projects" className="relative md:h-screen md:overflow-hidden h-auto py-16 md:py-0 bg-[#040506]/35 border-t border-white/5 z-10">
      <div
        ref={trackRef}
        className="project-track flex flex-col md:flex-row items-stretch md:items-center h-auto md:h-full px-6 md:px-[10vw] gap-12 md:gap-[5vw]"
      >
        {/* Intro Slide */}
        <div className="project-slide shrink-0 w-full md:w-[40vw] flex flex-col justify-center py-6 md:py-0">
          <span className="font-mono text-[10px] text-cyan-glint tracking-[0.5em] uppercase mb-6 md:mb-8">
            Project Showcase
          </span>
          <h2 className="font-space text-5xl sm:text-6xl md:text-9xl text-white tracking-tighter leading-[0.9] md:leading-[0.8] mb-8 md:mb-12 uppercase font-black">
            Featured<br />
            <span className="text-transparent text-stroke text-white/60">Projects</span>
          </h2>
          <p className="font-space text-white/95 text-lg md:text-xl max-w-sm font-light leading-relaxed">
            Selected cloud architectures, full-stack systems, and cybersecurity applications.
          </p>

          <div className="mt-10 md:mt-16 md:flex hidden items-center gap-6 opacity-60">
            <div className="w-12 h-[1px] bg-white" />
            <span className="font-mono text-[9px] uppercase tracking-widest animate-pulse">Scroll to explore</span>
          </div>
        </div>

        {projects.map((project, i) => (
          <div
            key={i}
            className="project-slide shrink-0 w-full md:w-[65vw] h-auto md:h-[70vh] bg-midnight/35 hover:bg-midnight/55 rounded-3xl p-6 sm:p-10 md:p-16 relative overflow-hidden group border border-white/5 shadow-2xl transition-colors duration-700 ease-out"
          >
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-full md:w-1/2 h-full opacity-65 md:opacity-30 md:group-hover:opacity-85 transition-all duration-1000 pointer-events-none">
              <Image
                src={project.img}
                alt={project.title}
                fill
                unoptimized
                className="object-cover"
              />
              {/* Gradient overlay to guarantee absolute text legibility */}
              <div className="absolute inset-0 bg-gradient-to-r from-midnight via-midnight/60 to-transparent md:block hidden" />
              <div className="absolute inset-0 bg-midnight/55 md:hidden block" />
            </div>

            <div className="relative z-10 h-full flex flex-col justify-between gap-12 md:gap-0">
              <div className="space-y-6 md:space-y-10">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-white/80 text-[10px] tracking-[0.4em] uppercase">
                    Project 0{i + 1}
                  </span>
                  <span className={`px-3 py-1 font-mono text-[9px] rounded-full border uppercase ${colorClassMap[project.color] || "bg-white/10 text-white border-white/20"}`}>
                    COMPLETED
                  </span>
                </div>

                <h3 className="font-space text-3xl sm:text-4xl md:text-7xl text-white font-black tracking-tighter leading-none">
                  {project.title}
                </h3>

                <p className="font-space text-sm sm:text-base md:text-xl text-white max-w-xl font-light leading-relaxed">
                  {project.desc}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 md:gap-8 pt-8 md:pt-12 border-t border-white/5">
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {project.tech.map((t, idx) => (
                    <span key={idx} className="px-3 py-1.5 md:px-4 md:py-2 bg-white/5 border border-white/10 text-[8px] sm:text-[9px] font-mono font-bold uppercase tracking-widest text-white/95">
                      {t}
                    </span>
                  ))}
                </div>

                <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group/btn cursor-pointer shrink-0">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/70 group-hover/btn:text-cyan-glint transition-colors">
                    View Project
                  </span>
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover/btn:border-cyan-glint transition-all">
                    <ArrowRight className="w-4 h-4 text-white/70 group-hover/btn:text-cyan-glint" />
                  </div>
                </a>
              </div>
            </div>

            <div className="hud-corner corner-tl opacity-20" />
            <div className="hud-corner corner-br opacity-20" />
          </div>
        ))}

        <div className="project-slide shrink-0 w-0 md:w-[15vw]" />
      </div>
    </section>
  );
}
