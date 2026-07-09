"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on("scroll", ScrollTrigger.update);

    const updatePhysics = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updatePhysics);

    gsap.ticker.lagSmoothing(0);

    // Global event listener to intercept hash links for smooth scroll animation
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (anchor && anchor.hash && anchor.hash.startsWith("#")) {
        const hash = anchor.hash;
        if (hash === "#") {
          e.preventDefault();
          lenis.scrollTo(0, { duration: 1.2 });
          window.history.pushState(null, "", " ");
          return;
        }
        const targetElement = document.querySelector(hash) as HTMLElement | null;
        if (targetElement) {
          e.preventDefault();
          lenis.scrollTo(targetElement, { offset: 0, duration: 1.2 });
          window.history.pushState(null, "", hash);
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
      gsap.ticker.remove(updatePhysics);
    };
  }, []);

  return <>{children}</>;
}
