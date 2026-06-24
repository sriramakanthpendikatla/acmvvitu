"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Reveal } from "@/components/Reveal";

function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let started = false;
    const run = () => {
      if (started) return;
      started = true;
      const duration = 1800;
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        el.textContent = Math.round(value * (1 - Math.pow(1 - p, 3))) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && run(), { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

export function StatsSection() {
  return (
    <section className="section-pad" id="stats">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">By the numbers</span>
          <h2 className="mt-3 text-3xl font-bold text-navy md:text-4xl">Growing every semester</h2>
        </Reveal>
        <Reveal className="grid gap-5 md:grid-cols-3">
          <div className="card-surface p-8 text-center transition hover:-translate-y-1"><div className="text-4xl font-bold text-navy"><CountUp value={500} suffix="+" /></div><div className="mt-2 text-sm text-muted-foreground">Members</div></div>
          <div className="card-surface p-8 text-center transition hover:-translate-y-1"><div className="text-4xl font-bold text-navy"><CountUp value={25} suffix="+" /></div><div className="mt-2 text-sm text-muted-foreground">Events hosted</div></div>
          <div className="card-surface p-8 text-center transition hover:-translate-y-1"><div className="text-4xl font-bold text-navy">8<span className="text-brand"> yrs</span></div><div className="mt-2 text-sm text-muted-foreground">Active since 2017</div></div>
        </Reveal>
      </div>
    </section>
  );
}

export function TickerSection() {
  const items = ["Udgama 1.0 — 200+ participants", "AUNSF 3.0 — 2nd place", "Hour of Code 2024", "VIVA VVIT 2024", "ACM global affiliation", "500+ members milestone"];
  const track = [...items, ...items];
  return (
    <section className="section-pad">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-navy">What we&apos;ve accomplished</h2>
        </Reveal>
        <div className="ticker-wrap overflow-hidden">
          <div className="ticker-track flex w-max animate-marquee gap-4">
            {track.map((item, i) => (<span key={i} className="whitespace-nowrap rounded-full border border-slate-200 bg-card px-4 py-2 text-sm">{item}</span>))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function GallerySection() {
  const cells = [
    { title: "Udgama Hackathon", tall: true, g: "#0099e5" },
    { title: "Spardha Fest", g: "#1a365d" },
    { title: "Tech Talk", g: "#0077b6" },
    { title: "Workshop", g: "#2d4a73" },
    { title: "Team Meet", g: "#0099e5" },
  ];
  return (
    <section className="section-pad section-alt">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal className="mb-10 text-center"><h2 className="text-3xl font-bold text-navy">Moments from our events</h2></Reveal>
        <Reveal className="grid auto-rows-[120px] grid-cols-1 gap-3 sm:grid-cols-3">
          {cells.map((c) => (
            <Link key={c.title} href="/events" className={`group relative overflow-hidden rounded-lg border border-slate-200 ${c.tall ? "sm:row-span-2" : ""}`} style={{ minHeight: c.tall ? 248 : 120, background: `linear-gradient(160deg,${c.g},#1a365d)` }}>
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-navy/90 to-transparent p-4 opacity-0 transition group-hover:opacity-100"><span className="text-sm font-semibold text-white">{c.title}</span></div>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export function TimelineSection() {
  const timeline = [
    { year: 2017, text: "ACM VVIT chapter founded", past: true },
    { year: 2019, text: "First Udgama hackathon — 120 participants", past: true },
    { year: 2021, text: "ACM global recognition · Hour of Code", past: true },
    { year: 2022, text: "Spardha tech fest launched", past: true },
    { year: 2024, text: "AUNSF 3.0 — 2nd place nationwide", past: true },
    { year: 2025, text: "500+ members milestone · website v2", past: false },
  ];
  const mid = 3;
  return (
    <section className="section-pad section-alt">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal className="mb-10 text-center"><h2 className="text-3xl font-bold text-navy">Chapter timeline</h2></Reveal>
        <Reveal className="grid gap-8 md:grid-cols-2">
          {[timeline.slice(0, mid), timeline.slice(mid)].map((col, ci) => (
            <div key={ci} className="border-l-2 border-slate-200 pl-6">
              {col.map((t) => (
                <div key={t.year} className="relative mb-7 pl-4">
                  <div className={`absolute -left-[1.65rem] top-1 h-3 w-3 rounded-full border-2 border-deep ${t.past ? "bg-[#3a4a63]" : "bg-brand"}`} />
                  <div className={`text-xs font-bold ${t.past ? "text-muted-foreground" : "text-brand"}`}>{t.year}</div>
                  <p className="mt-1 text-sm text-muted-foreground">{t.text}</p>
                </div>
              ))}
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export function CalendarStrip() {
  const events = [
    { day: 12, month: "Aug", title: "Webinar: Cloud 101", meta: "Online · 6:00 PM", cd: "2025-08-12T18:00:00", soon: true },
    { day: 24, month: "Aug", title: "Udgama 2.0", meta: "Campus · All day", cd: "2025-08-24T09:00:00", soon: false },
    { day: 5, month: "Sep", title: "Aavega Speed Event", meta: "Lab Block · 2:00 PM", cd: "2025-09-05T14:00:00", soon: false },
  ];
  return (
    <section className="section-pad">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal className="mb-10 text-center"><h2 className="text-3xl font-bold text-navy">Events on the horizon</h2></Reveal>
        <Reveal className="grid gap-5 md:grid-cols-3">
          {events.map((e) => (
            <div key={e.title} className="card-surface flex gap-4 p-5">
              <div className={`shrink-0 rounded-lg border px-3 py-2 text-center ${e.soon ? "border-brand" : "border-slate-200"}`}>
                <div className={`text-xl font-bold ${e.soon ? "text-brand" : "text-navy"}`}>{e.day}</div>
                <div className="text-[10px] uppercase text-muted-foreground">{e.month}</div>
              </div>
              <div><div className="font-semibold text-navy">{e.title}</div><div className="text-sm text-muted-foreground">{e.meta}</div></div>
            </div>
          ))}
        </Reveal>
        <p className="mt-8 text-center"><Link href="/calendar" className="text-sm text-brand hover:underline">View full calendar →</Link></p>
      </div>
    </section>
  );
}

export function BlogSection() {
  const posts = [
    { tag: "AI/ML", title: "Getting started with neural networks", date: "Jun 10, 2025 · 5 min read" },
    { tag: "Hackathon", title: "Udgama 1.0 — what we built", date: "May 28, 2025 · 4 min read" },
    { tag: "Career", title: "How to crack your first tech internship", date: "Apr 14, 2025 · 7 min read" },
  ];
  return (
    <section className="section-pad section-alt">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal className="mb-10 text-center"><h2 className="text-3xl font-bold text-navy">Latest articles</h2></Reveal>
        <Reveal className="grid gap-5 md:grid-cols-3">
          {posts.map((p) => (
            <article key={p.title} className="card-surface overflow-hidden">
              <div className="h-28 bg-gradient-to-br from-brand to-navy" />
              <div className="p-4"><span className="rounded bg-brand/10 px-2 py-0.5 text-[10px] font-semibold text-brand">{p.tag}</span><h3 className="mt-2 font-semibold text-navy">{p.title}</h3><p className="mt-1 text-xs text-muted-foreground">{p.date}</p></div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export function AlumniSection() {
  const alumni = [
    { i: "NK", n: "Nikhil K.", r: "SDE II", c: "Amazon" },
    { i: "DP", n: "Divya P.", r: "ML Engineer", c: "Google" },
    { i: "SR", n: "Sai R.", r: "Backend Dev", c: "Zoho" },
    { i: "TV", n: "Tejal V.", r: "Data Scientist", c: "Microsoft" },
    { i: "RB", n: "Rahul B.", r: "Founder", c: "Startup" },
    { i: "KM", n: "Kavya M.", r: "DevOps Eng.", c: "Infosys" },
    { i: "PS", n: "Pranav S.", r: "Full-stack Dev", c: "TCS" },
    { i: "AA", n: "Ananya A.", r: "Product Mgr", c: "Flipkart" },
  ];
  return (
    <section className="section-pad">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal className="mb-10 text-center"><h2 className="text-3xl font-bold text-navy">Where are they now</h2></Reveal>
        <Reveal className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {alumni.map((a) => (
            <div key={a.n} className="card-surface p-5 text-center">
              <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full border-2 border-brand/35 text-sm font-bold text-brand">{a.i}</div>
              <div className="font-semibold text-navy">{a.n}</div>
              <div className="text-sm text-muted-foreground">{a.r}</div>
              <div className="mt-1 text-sm text-brand">{a.c}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
