import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Expertise from "@/components/sections/Expertise";
import Projects from "@/components/sections/Projects";
import Stats from "@/components/sections/Stats";
import ExplorerHub from "@/components/sections/ExplorerHub";
import GlowingTicker from "@/components/sections/GlowingTicker";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import HudToast from "@/components/ui/HudToast";
import GlobalBackground from "@/components/ui/GlobalBackground";

export default function Home() {
  return (
    <main className="relative min-h-screen text-white bg-[#040506]">
      {/* Global Background Video & 2D Canvas Parallax Particles */}
      <GlobalBackground />

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Expertise />
        <Projects />
        <Stats />
        <ExplorerHub />
        <GlowingTicker />
        <Contact />
        <Footer />
        <HudToast />
      </div>
    </main>
  );
}
