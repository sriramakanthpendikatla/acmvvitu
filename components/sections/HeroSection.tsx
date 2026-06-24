"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";

function revealHero() {
  document.getElementById("loadingScreen")?.classList.add("hidden");
  document.querySelector(".hero-brand")?.classList.add("show");
  document.querySelector(".hero-overlay")?.classList.add("show-ctas");
  document.getElementById("hud")?.classList.add("show");
}

export function HeroSection() {
  const [threeReady, setThreeReady] = useState(false);

  useEffect(() => {
    const onComplete = () => revealHero();
    document.addEventListener("heroIntroComplete", onComplete);

    const fallback = window.setTimeout(() => {
      if (!document.querySelector(".hero-brand.show")) revealHero();
    }, 4500);

    return () => {
      document.removeEventListener("heroIntroComplete", onComplete);
      window.clearTimeout(fallback);
    };
  }, []);

  const scrollToContent = () => {
    document.getElementById("main-content")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero-section" id="hero">
      <div className="loading-screen" id="loadingScreen">
        <div className="hero-loading-title">ACM VVITU</div>
        <div className="hero-loading-subtitle">Student Chapter</div>
        <div className="loading-bar">
          <div className="loading-bar-fill" id="loadingFill" />
        </div>
      </div>

      <canvas id="scene-canvas" />

      <div className="hero-brand" id="heroBrand">
        <div className="hero-brand-panel">
          <div className="hero-title">ACM <span className="hero-title-accent">VVITU</span></div>
          <p className="hero-tagline">
            Student Chapter · Vasireddy Venkatadri Institute of Technology
          </p>
        </div>
      </div>

      <div className="hero-overlay">
        <div className="hero-ctas">
          <Link href="/events" className="hero-btn-primary">
            Explore events
          </Link>
          <Link href="/contact" className="hero-btn-secondary">
            Join ACM
          </Link>
        </div>
      </div>

      <div className="hud" id="hud">
        <button type="button" className="scroll-cue" onClick={scrollToContent} aria-label="Scroll to content">
          <span className="scroll-label">Scroll</span>
          <span className="scroll-line" />
        </button>
      </div>

      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/0.160.0/three.min.js"
        strategy="afterInteractive"
        onLoad={() => setThreeReady(true)}
      />
      {threeReady && <Script src="/scene.js" strategy="afterInteractive" />}
    </section>
  );
}
