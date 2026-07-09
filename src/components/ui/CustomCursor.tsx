"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
    if (isTouchDevice) {
      setIsTouch(true);
      return;
    }

    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });
      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const onMouseEnterInteractive = () => setIsHovering(true);
    const onMouseLeaveInteractive = () => setIsHovering(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const interactives = document.querySelectorAll(
      "a, button, [data-cursor-hover]"
    );
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterInteractive);
      el.addEventListener("mouseleave", onMouseLeaveInteractive);
    });

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterInteractive);
        el.removeEventListener("mouseleave", onMouseLeaveInteractive);
      });
    };
  }, [isVisible]);

  if (isTouch) return null;

  return (
    <>
      {/* Dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.3s" }}
      >
        <div
          className="rounded-full bg-white transition-all duration-200"
          style={{
            width: isHovering ? "12px" : "6px",
            height: isHovering ? "12px" : "6px",
          }}
        />
      </div>

      {/* Ring */}
      <div
        ref={cursorRingRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2"
        style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.3s" }}
      >
        <div
          className="rounded-full border border-cyan-glint transition-all duration-300"
          style={{
            width: isHovering ? "52px" : "36px",
            height: isHovering ? "52px" : "36px",
            borderColor: isHovering ? "#00D6FF" : "rgba(0,214,255,0.5)",
            boxShadow: isHovering ? "0 0 15px rgba(0,214,255,0.3)" : "none",
          }}
        />
      </div>
    </>
  );
}
