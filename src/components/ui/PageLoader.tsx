"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

export default function PageLoader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(TextPlugin);
    const lines = [
      "> ESTABLISHING SECURE CONNECTION...",
      "> FETCHING CREDENTIALS REGISTRY... [OK]",
      "> INITIALIZING ENCRYPTION PROTOCOLS... [OK]",
      "> RETRIEVING PORTFOLIO DATA... [OK]",
      "> INTEGRITY CHECK: VERIFIED",
      "> BOOTING ARPIT SHARMA PORTFOLIO..."
    ];

    const tl = gsap.timeline({
      onComplete: () => setDone(true),
    });

    lines.forEach((line, i) => {
      tl.to(".boot-text", {
        duration: 0.1,
        text: {
          value: (document.querySelector(".boot-text")?.innerHTML || "") + line + "<br/>",
        },
        ease: "none",
        delay: i === 0 ? 0.15 : 0.02
      });
    });

    tl.to(".boot-box", {
      scale: 20,
      opacity: 0,
      duration: 0.5,
      ease: "power4.inOut"
    }, "+=0.1")
      .to(loaderRef.current, {
        autoAlpha: 0,
        duration: 0.3,
      }, "-=0.3");
  }, []);

  if (done) return null;

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] bg-midnight flex items-center justify-center font-mono p-6 overflow-hidden"
    >
      <div className="boot-box w-full max-w-xl bg-black border border-cyan-glint/30 p-6 relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-cyan-glint/20 pb-2 mb-4">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
          </div>
          <span className="text-[9px] uppercase tracking-widest text-cyan-glint/50 font-mono">
            SECURE PORTFOLIO GATEWAY
          </span>
        </div>
        <div className="boot-text text-cyan-glint text-sm leading-relaxed min-h-[160px] font-mono whitespace-pre-wrap">
          {/* GSAP TextPlugin will fill this */}
        </div>
        <div className="scanline opacity-10" />
      </div>
    </div>
  );
}
