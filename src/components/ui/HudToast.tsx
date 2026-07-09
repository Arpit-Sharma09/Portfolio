"use client";

import { useEffect, useState } from "react";
import { X, AlertCircle } from "lucide-react";
import { gsap } from "gsap";

export default function HudToast() {
  const [active, setActive] = useState(false);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    const handleMockClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      
      // If it's a link with href="#"
      if (anchor && anchor.getAttribute("href") === "#") {
        e.preventDefault();
        
        let label = anchor.innerText.trim() || anchor.getAttribute("aria-label") || "SYSTEM_LINK";
        // Normalize label for aesthetic
        label = label.toUpperCase().replace(/\s+/g, "_");
        
        setTitle(`ACCESS_ATTEMPT: ${label}`);
        setMessage("DECRYPTING PORTAL... ACCESS RESTRICTED. [ERR_AUTH_LEVEL_1] - Please initiate contact protocol to request secure credentials.");
        setActive(true);
      }
    };

    document.addEventListener("click", handleMockClick);
    return () => document.removeEventListener("click", handleMockClick);
  }, []);

  useEffect(() => {
    if (active) {
      // Play a quick reveal animation using gsap
      gsap.fromTo(
        "#hud-toast-container",
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.5)" }
      );
      
      // Auto close after 6 seconds
      const timer = setTimeout(() => {
        handleClose();
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [active]);

  const handleClose = () => {
    gsap.to("#hud-toast-container", {
      y: 20,
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => setActive(false),
    });
  };

  if (!active) return null;

  return (
    <div
      id="hud-toast-container"
      className="fixed bottom-6 right-6 z-[9999] max-w-sm w-full bg-midnight/95 border border-scarlet-accent/40 rounded-xl p-5 shadow-[0_0_30px_rgba(255,70,85,0.15)] backdrop-blur-md"
    >
      {/* Corner markers */}
      <div className="hud-corner corner-tl" style={{ borderColor: '#FF4655' }} />
      <div className="hud-corner corner-tr" style={{ borderColor: '#FF4655' }} />
      <div className="hud-corner corner-bl" style={{ borderColor: '#FF4655' }} />
      <div className="hud-corner corner-br" style={{ borderColor: '#FF4655' }} />
      
      <div className="flex gap-4 items-start">
        <div className="w-10 h-10 rounded-lg bg-scarlet-accent/10 border border-scarlet-accent/30 flex items-center justify-center text-scarlet-accent shrink-0 animate-pulse">
          <AlertCircle className="w-5 h-5" />
        </div>
        <div className="flex-1 space-y-1">
          <div className="font-mono text-[9px] uppercase tracking-widest text-scarlet-accent font-bold">
            {title}
          </div>
          <p className="font-mono text-[10px] text-white/70 leading-relaxed uppercase">
            {message}
          </p>
          <div className="pt-2">
            <a
              href="#contact"
              onClick={handleClose}
              className="inline-block font-mono text-[9px] uppercase tracking-wider text-cyan-glint hover:text-white transition-colors"
            >
              &gt; GO_TO_CONTACT_PROTOCOL
            </a>
          </div>
        </div>
        <button
          onClick={handleClose}
          className="text-white/30 hover:text-white transition-colors shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
