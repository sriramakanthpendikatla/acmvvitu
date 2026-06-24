"use client";

import { useEffect, useState } from "react";
import { Reveal } from "@/components/Reveal";

type Slide = { quote: string; initials: string; name: string; role: string };

export function TestimonialsSection({ slides }: { slides: Slide[][] }) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, [paused, slides.length]);

  return (
    <section className="section-pad">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal className="mb-10 text-center"><h2 className="text-3xl font-bold text-navy">What our members say</h2></Reveal>
        <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${idx * 100}%)` }}>
              {slides.map((slide, si) => (
                <div key={si} className="grid min-w-full grid-cols-1 gap-5 md:grid-cols-3">
                  {slide.map((t) => (
                    <div key={t.name} className="card-surface p-6">
                      <p className="border-l-2 border-brand pl-4 text-sm italic text-muted-foreground">&ldquo;{t.quote}&rdquo;</p>
                      <div className="mt-4 flex items-center gap-3">
                        <div className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 text-xs font-bold text-brand">{t.initials}</div>
                        <div><div className="text-sm font-semibold text-navy">{t.name}</div><div className="text-xs text-muted-foreground">{t.role}</div></div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 flex justify-center gap-2">
            {slides.map((_, i) => (
              <button key={i} type="button" aria-label={`Slide ${i + 1}`} onClick={() => setIdx(i)} className={`h-2 w-2 rounded-full transition ${idx === i ? "scale-125 bg-brand" : "bg-[#3a4a63]"}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
