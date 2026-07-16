import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import Home from "./page";

// Mock all the subcomponents rendered by the Home page to isolate the page layout test
vi.mock("@/components/ui/Navbar", () => ({
  default: () => <div data-testid="navbar-mock">Navbar</div>,
}));
vi.mock("@/components/sections/Hero", () => ({
  default: () => <div data-testid="hero-mock">Hero</div>,
}));
vi.mock("@/components/sections/About", () => ({
  default: () => <div data-testid="about-mock">About</div>,
}));
vi.mock("@/components/sections/Expertise", () => ({
  default: () => <div data-testid="expertise-mock">Expertise</div>,
}));
vi.mock("@/components/sections/Projects", () => ({
  default: () => <div data-testid="projects-mock">Projects</div>,
}));
vi.mock("@/components/sections/Stats", () => ({
  default: () => <div data-testid="stats-mock">Stats</div>,
}));
vi.mock("@/components/sections/ExplorerHub", () => ({
  default: () => <div data-testid="explorer-hub-mock">ExplorerHub</div>,
}));
vi.mock("@/components/sections/GlowingTicker", () => ({
  default: () => <div data-testid="glowing-ticker-mock">GlowingTicker</div>,
}));
vi.mock("@/components/sections/Contact", () => ({
  default: () => <div data-testid="contact-mock">Contact</div>,
}));
vi.mock("@/components/sections/Footer", () => ({
  default: () => <div data-testid="footer-mock">Footer</div>,
}));
vi.mock("@/components/ui/HudToast", () => ({
  default: () => <div data-testid="hud-toast-mock">HudToast</div>,
}));
vi.mock("@/components/ui/GlobalBackground", () => ({
  default: () => <div data-testid="global-background-mock">GlobalBackground</div>,
}));

describe("Home Page Component", () => {
  it("renders the main layout with proper background styles", () => {
    const { container } = render(<Home />);
    const mainElement = container.querySelector("main");
    
    expect(mainElement).toBeInTheDocument();
    expect(mainElement).toHaveClass("relative");
    expect(mainElement).toHaveClass("min-h-screen");
    expect(mainElement).toHaveClass("text-white");
    expect(mainElement).toHaveClass("bg-[#040506]");
  });

  it("renders all sections and UI components in the correct DOM container hierarchy", () => {
    render(<Home />);

    // Check background is rendered outside the content wrapper
    expect(screen.getByTestId("global-background-mock")).toBeInTheDocument();

    // Check that all section components exist within the page container
    expect(screen.getByTestId("navbar-mock")).toBeInTheDocument();
    expect(screen.getByTestId("hero-mock")).toBeInTheDocument();
    expect(screen.getByTestId("about-mock")).toBeInTheDocument();
    expect(screen.getByTestId("expertise-mock")).toBeInTheDocument();
    expect(screen.getByTestId("projects-mock")).toBeInTheDocument();
    expect(screen.getByTestId("stats-mock")).toBeInTheDocument();
    expect(screen.getByTestId("explorer-hub-mock")).toBeInTheDocument();
    expect(screen.getByTestId("glowing-ticker-mock")).toBeInTheDocument();
    expect(screen.getByTestId("contact-mock")).toBeInTheDocument();
    expect(screen.getByTestId("footer-mock")).toBeInTheDocument();
    expect(screen.getByTestId("hud-toast-mock")).toBeInTheDocument();
  });
});
