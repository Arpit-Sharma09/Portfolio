"use client";

import { Anchor } from "lucide-react";
import Link from "next/link";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/Arpit-Sharma09",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/arpit-sharma-812624244",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "https://x.com/arpit56665",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

const footerLinks = [
  {
    heading: "Navigate",
    links: [
      { label: "Expertise", href: "#expertise" },
      { label: "Projects", href: "#projects" },
      { label: "Stats", href: "#stats" },
      { label: "Archive", href: "#archive" },
    ],
  },
  {
    heading: "Connect",
    links: [
      { label: "GitHub", href: "https://github.com/Arpit-Sharma09" },
      { label: "LinkedIn", href: "https://linkedin.com/in/arpit-sharma-812624244" },
      { label: "Twitter / X", href: "https://x.com/arpit56665" },
    ],
  },
  {
    heading: "Contact",
    links: [
      { label: "arpit56665@gmail.com", href: "mailto:arpit56665@gmail.com" },
      { label: "Hamirpur, HP, India", href: "#" },
      { label: "Available for Work", href: "#contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative pt-20 pb-10 bg-black/55 overflow-hidden border-t border-white/5 z-10">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-bioluminescent-blue/3 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Top Row */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 pb-16 border-b border-white/5">
          {/* Brand */}
          <div className="space-y-6 md:max-w-sm">
            <Link href="/" className="inline-block group">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-lg border border-cyan-glint/20 flex items-center justify-center bg-cyan-glint/5 group-hover:border-cyan-glint transition-all duration-500 overflow-hidden">
                  <Anchor className="w-5 h-5 text-cyan-glint" />
                  <div className="absolute inset-0 bg-scanline opacity-20 group-hover:opacity-40" />
                </div>
                <div className="flex flex-col">
                  <span className="font-space text-2xl font-black tracking-tighter text-white leading-none">
                    ARPIT SHARMA<span className="text-cyan-glint">.</span>
                  </span>
                  <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-cyan-glint mt-1">
                    IT.PORTFOLIO
                  </span>
                </div>
              </div>
            </Link>
            <p className="text-white/60 text-base font-light leading-relaxed font-space">
              Computer Science Engineer specializing in AWS Cloud Support, Network Operations, and Cybersecurity. Building and protecting resilient digital infrastructures.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4 pt-2">
              {socialLinks.map(({ svg, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-12 h-12 rounded-xl border border-white/5 bg-white/2 flex items-center justify-center text-white/60 hover:border-cyan-glint hover:text-cyan-glint hover:bg-cyan-glint/5 transition-all duration-300 group"
                >
                  <div className="group-hover:scale-110 transition-transform">{svg}</div>
                </a>
              ))}
            </div>
            
            {/* System Status Indicator */}
            <div className="inline-flex items-center gap-4 px-4 py-2 border border-white/5 rounded-full bg-white/2">
               <div className="flex gap-1">
                  <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                  <div className="w-1 h-1 rounded-full bg-green-500/40" />
                  <div className="w-1 h-1 rounded-full bg-green-500/20" />
               </div>
               <span className="font-mono text-[9px] uppercase tracking-widest text-white/60">
                  Status: Online
               </span>
            </div>
          </div>

          {/* Links grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
            {footerLinks.map((col) => (
              <div key={col.heading} className="space-y-5">
                <h5 className="text-[9px] font-bold uppercase tracking-[0.5em] text-cyan-glint">
                  {col.heading}
                </h5>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-xs font-light text-white/60 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/40">
            © 2026 Arpit Sharma. All rights reserved.
          </div>
          <div className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/40">
            Built with Next.js & Tailwind CSS
          </div>
        </div>
      </div>
    </footer>
  );
}
