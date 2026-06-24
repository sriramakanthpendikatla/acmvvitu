"use client";

import { useState } from "react";
import Link from "next/link";
import { members, coreTeam } from "@/lib/data";
import { TeamSection } from "@/components/sections/TeamSection";

export default function MembersPage() {
  const [filter, setFilter] = useState("all");
  const extra = members.filter((m) => m.category !== "core");
  const filtered = extra.filter((m) => filter === "all" || m.category === filter);

  return (
    <>
      <section className="page-hero">
        <h1 className="text-4xl font-bold text-navy">Our Team</h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Core committee and active members who make ACM VVITU happen every semester.</p>
      </section>
      <section className="section-pad">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {["all", "core", "2025", "2024"].map((f) => (
              <button key={f} type="button" onClick={() => setFilter(f)} className={`rounded-full border px-4 py-1.5 text-sm capitalize transition ${filter === f ? "border-brand bg-brand/10 text-brand" : "border-slate-200 text-muted-foreground"}`}>{f === "all" ? "All" : f === "core" ? "Core team" : `Batch ${f}`}</button>
            ))}
          </div>
          {(filter === "all" || filter === "core") && <TeamSection members={coreTeam} />}
          {filter !== "core" && (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {filtered.map((m) => (
                <div key={m.id} className="card-surface p-5 text-center">
                  <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-full border border-slate-200 text-sm font-bold text-brand">{m.initials}</div>
                  <div className="font-semibold text-navy">{m.name}</div>
                  <div className="text-sm text-muted-foreground">{m.role}</div>
                </div>
              ))}
            </div>
          )}
          <p className="mt-10 text-center"><Link href="/contact" className="rounded-full btn-brand !bg-brand px-6 py-2.5 text-sm font-semibold text-white">Join the chapter</Link></p>
        </div>
      </section>
    </>
  );
}
