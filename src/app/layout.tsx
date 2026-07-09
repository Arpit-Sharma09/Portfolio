import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import PageLoader from "@/components/ui/PageLoader";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arpit Sharma | Cloud Support & Cybersecurity Engineer",
  description:
    "Computer Science Engineering graduate specializing in cloud support, networking, and cybersecurity. AWS Certified Cloud Support professional building resilient digital systems.",
  keywords: [
    "Arpit Sharma",
    "Cloud Support Engineer",
    "Cybersecurity",
    "Computer Science Engineering",
    "AWS Certified",
    "Network Engineer",
    "Portfolio",
  ],
  authors: [{ name: "Arpit Sharma" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Arpit Sharma | Cloud Support & Cybersecurity Engineer",
    description:
      "Computer Science Engineering graduate specializing in cloud support, networking, and cybersecurity. AWS Certified Cloud Support professional.",
    siteName: "Arpit Sharma Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arpit Sharma | Cloud Support & Cybersecurity Engineer",
    description:
      "Computer Science Engineering graduate specializing in cloud support, networking, and cybersecurity.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${spaceGrotesk.variable} ${dmSans.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <PageLoader />
        <CustomCursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
