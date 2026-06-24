"use client";

import { useState } from "react";
import { allEvents } from "@/lib/data";
import { RegistrationModal } from "@/components/RegistrationModal";

export default function EventsPage() {
  const [filter, setFilter] = useState("all");
  const [regOpen, setRegOpen] = useState(false);

  const filtered = allEvents.filter((e) => {
    if (filter === "all") return true;
    if (filter === "upcoming" || filter === "past") return e.status === filter;
    return e.category === filter;
  });

  return (
    <>
      <section className="page-hero">
        <h1 className="text-4xl font-bold text-navy">Events</h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Hackathons, workshops, tech talks, and fests — everything happening at ACM VVITU.</p>
      </section>
      <section className="section-pad">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {["all", "upcoming", "past", "hackathon", "workshop"].map((f) => (
              <button key={f} type="button" onClick={() => setFilter(f)} className={`rounded-full border px-4 py-1.5 text-sm capitalize transition ${filter === f ? "border-brand bg-brand/10 text-brand" : "border-slate-200 text-muted-foreground"}`}>{f}</button>
            ))}
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((e) => (
              <article key={e.id} className="card-surface overflow-hidden">
                <div className={`flex h-36 items-center justify-center bg-gradient-to-br ${e.gradient} text-4xl font-extrabold text-white/15`}>{e.letter}</div>
                <div className="p-4">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${e.status === "upcoming" ? "bg-brand/15 text-brand" : "bg-white/10 text-muted-foreground"}`}>{e.status}</span>
                  <h3 className="mt-2 font-semibold text-navy">{e.title}</h3>
                  <p className="text-sm text-muted-foreground">{e.venue}</p>
                  {e.status === "upcoming" && (
                    <button type="button" onClick={() => setRegOpen(true)} className="mt-4 w-full rounded-full btn-brand !bg-brand py-2 text-sm font-semibold text-white">Register</button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <RegistrationModal open={regOpen} onClose={() => setRegOpen(false)} />
    </>
  );
}
