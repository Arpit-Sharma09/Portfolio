"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { X, Menu } from "lucide-react";
import { gsap } from "gsap";

const navLinks = [
  { href: "#expertise", label: "Expertise", sub: "Capabilities" },
  { href: "#projects", label: "Projects", sub: "Portfolio" },
  { href: "#stats", label: "Stats", sub: "Highlights" },
  { href: "#archive", label: "Archive", sub: "Certifications" },
  { href: "#contact", label: "Contact", sub: "Get in Touch" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const navbarRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuRef.current || !overlayRef.current) return;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, pointerEvents: "auto" });
      gsap.fromTo(
        mobileMenuRef.current,
        { xPercent: 100 },
        { xPercent: 0, duration: 0.5, ease: "power4.out" }
      );
      gsap.from(".mobile-nav-link", {
        opacity: 0,
        x: 40,
        stagger: 0.07,
        delay: 0.2,
        duration: 0.5,
        ease: "power3.out",
      });
    } else {
      document.body.style.overflow = "";
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, pointerEvents: "none" });
      gsap.to(mobileMenuRef.current, {
        xPercent: 100,
        duration: 0.4,
        ease: "power4.in",
      });
    }
  }, [isOpen]);

  return (
    <>
      {/* Fading blurred gradient mask layer behind navbar */}
      <div
        className={`fixed top-0 left-0 w-full h-[120px] pointer-events-none z-[88] bg-gradient-to-b from-black/95 via-black/50 to-transparent backdrop-blur-md [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)] transition-all duration-500 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />

      <nav
        ref={navbarRef}
        className={`fixed top-0 left-0 w-full z-[90] px-6 md:px-10 py-6 flex justify-between items-center transition-all duration-500 hover:backdrop-blur-md ${
          scrolled
            ? "bg-black/20"
            : "bg-transparent"
        }`}
      >
        <Link href="/" className="flex flex-col">
          <span className="font-space text-2xl font-black tracking-tighter text-white">
            ARPIT SHARMA<span className="text-cyan-glint">.</span>
          </span>
          <span className="text-[8px] uppercase tracking-[0.5em] text-cyan-glint opacity-70">
            Cloud & Security Eng
          </span>
        </Link>

        {/* Desktop Nav - Plain text links on the right side */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.slice(0, 4).map((link, i) => {
            const isDimmed = hoveredIndex !== null && hoveredIndex !== i;
            return (
              <div key={link.href} className="relative group flex items-center justify-center">
                {/* Spotlight glow behind active link */}
                <div className="absolute w-24 h-24 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm scale-150 pointer-events-none z-0" />
                
                <Link
                  href={link.href}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`text-[10px] font-mono uppercase tracking-[0.2em] transition-all duration-300 z-10 inline-block hover:text-white hover:scale-130 hover:[text-shadow:0_0_12px_rgba(255,255,255,0.95)] ${
                    isDimmed ? "opacity-25 scale-90" : "text-white/60"
                  }`}
                >
                  {link.label}
                </Link>
              </div>
            );
          })}
          <span className="w-[1px] h-4 bg-white/20" />
          <div className="relative group flex items-center justify-center">
            {/* Spotlight glow behind active button */}
            <div className="absolute w-32 h-20 bg-[radial-gradient(circle_at_center,rgba(0,214,255,0.2)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm scale-150 pointer-events-none z-0" />
            
            <Link
              href="#contact"
              onMouseEnter={() => setHoveredIndex(4)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`text-[11.5px] font-mono uppercase tracking-[0.15em] bg-cyan-glint text-black px-6 py-2.5 rounded-full shadow-[0_0_15px_rgba(0,214,255,0.4)] hover:bg-white hover:scale-115 hover:shadow-[0_0_25px_rgba(255,255,255,0.75)] transition-all duration-300 z-10 inline-block text-center ${
                hoveredIndex !== null && hoveredIndex !== 4 ? "opacity-25 scale-95" : "opacity-100"
              }`}
            >
              Get In Touch
            </Link>
          </div>
        </div>

        {/* Hamburger - Mobile only */}
        <button
          id="menu-toggle"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden w-12 h-12 flex items-center justify-center border border-white/20 rounded-full group hover:border-cyan-glint transition-all bg-black/40 backdrop-blur-sm"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="text-white group-hover:text-cyan-glint w-5 h-5" />
          ) : (
            <Menu className="text-white group-hover:text-cyan-glint w-5 h-5" />
          )}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        ref={overlayRef}
        onClick={() => setIsOpen(false)}
        className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm opacity-0 pointer-events-none"
      />

      {/* Mobile Menu Drawer */}
      <div
        ref={mobileMenuRef}
        className="fixed top-0 right-0 h-full w-[85vw] max-w-sm z-[120] bg-deep-trench border-l border-white/10 flex flex-col px-10 py-12 translate-x-full"
      >
        <div className="mb-12">
          <div className="font-space text-2xl font-black tracking-tighter text-white">
            ARPIT SHARMA<span className="text-cyan-glint">.</span>
          </div>
          <div className="text-[8px] uppercase tracking-[0.5em] text-cyan-glint opacity-70 mt-1">
            Developer Portfolio
          </div>
        </div>

        <div className="flex flex-col gap-1 flex-1">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="mobile-nav-link group flex flex-col py-5 border-b border-white/5 hover:border-cyan-glint/30 transition-all"
            >
              <span className="font-mono text-[9px] uppercase tracking-widest text-white/30 mb-1 group-hover:text-cyan-glint transition-colors">
                {String(i + 1).padStart(2, "0")} / {link.sub}
              </span>
              <span className="font-space text-3xl font-black tracking-tighter text-white group-hover:text-cyan-glint transition-colors uppercase">
                {link.label}
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-[9px] uppercase tracking-[0.4em] text-white/20 font-mono">
          arpit.sharma · online
        </div>
      </div>
    </>
  );
}
