"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

export default function GlobalBackground() {
  const [videoSrc, setVideoSrc] = useState("");

  useEffect(() => {
    // Delay loading video source until after critical scripts are downloaded and mounted
    const timer = setTimeout(() => {
      setVideoSrc("/bg-video.mp4");
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {videoSrc && (
        <video
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          onEnded={(e) => {
            e.currentTarget.currentTime = 0;
            e.currentTarget.play().catch(() => {});
          }}
          className="w-full h-full object-cover opacity-65 brightness-95 saturate-[1.1]"
          preload="metadata"
        />
      )}
      <HeroScene />
      {/* Bioluminescent glow overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(11,79,255,0.05),transparent_75%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#040506]/10 to-[#040506]/50" />
    </div>
  );
}
