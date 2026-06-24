"use client";

import { useState } from "react";
import { Reveal } from "@/components/Reveal";

export function FaqSection({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(1);

  return (
    <section className="section-pad section-alt">
      <div className="mx-auto max-w-2xl px-4">
        <Reveal className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-navy">Common questions</h2>
        </Reveal>
        <Reveal className="space-y-2">
          {items.map((item, i) => (
            <div key={item.q} className={`faq-item card-surface ${open === i ? "open" : ""}`}>
              <button type="button" className="flex w-full items-center justify-between p-4 text-left" onClick={() => setOpen(open === i ? -1 : i)}>
                <span className={`faq-q-text font-semibold text-navy ${open === i ? "text-brand" : ""}`}>{item.q}</span>
                <span className="faq-icon text-xl text-muted-foreground transition">+</span>
              </button>
              <div className="faq-a"><p className="text-sm text-muted-foreground">{item.a}</p></div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
