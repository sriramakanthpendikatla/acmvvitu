import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "VVITU ACM Chapter",
    template: "%s · VVITU ACM",
  },
  description:
    "Official ACM student chapter at VVIT University — events, hackathons, workshops, and 500+ members.",
  openGraph: {
    title: "VVITU ACM Chapter",
    description: "Official ACM student chapter at VVIT University",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
