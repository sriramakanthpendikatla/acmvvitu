"use client";

import { useState } from "react";
import Link from "next/link";
import { daysUntil } from "@/lib/utils";

const calendarEvents = [
  { day: 12, month: "Aug", title: "Webinar: Cloud 101", meta: "Online · 6:00 PM IST", cd: "2025-08-12T18:00:00" },
  { day: 24, month: "Aug", title: "Udgama 2.0 Hackathon", meta: "Main Auditorium · All day", cd: "2025-08-24T09:00:00" },
  { day: 5, month: "Sep", title: "Aavega Speed Event", meta: "Lab Block · 2:00 PM", cd: "2025-09-05T14:00:00" },
  { day: 18, month: "Sep", title: "Git & Open Source Workshop", meta: "Seminar Hall · 10:00 AM", cd: "2025-09-18T10:00:00" },
  { day: 12, month: "Oct", title: "Spardha 2025", meta: "Campus-wide · 2 days", cd: "2025-10-12T09:00:00" },
];

export default function CalendarPage() {
  const [viewDate, setViewDate] = useState(new Date(2025, 7, 1));
  const eventDays = [12, 24, 5];

  const y = viewDate.getFullYear();
  const m = viewDate.getMonth();
  const first = new Date(y, m, 1).getDay();
  const days = new Date(y, m + 1, 0).getDate();
  const label = viewDate.toLocaleString("en", { month: "long", year: "numeric" });

  return (
    <>
      <section className="page-hero">
        <h1 className="text-4xl font-bold text-navy">Calendar</h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">All upcoming ACM VVITU events at a glance.</p>
      </section>
      <section className="section-pad">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-[320px_1fr]">
          <div className="card-surface p-6">
            <div className="mb-4 flex items-center justify-between">
              <button type="button" onClick={() => setViewDate(new Date(y, m - 1, 1))} className="grid h-8 w-8 place-items-center rounded border border-slate-200 text-muted-foreground hover:border-brand">‹</button>
              <h3 className="font-semibold text-navy">{label}</h3>
              <button type="button" onClick={() => setViewDate(new Date(y, m + 1, 1))} className="grid h-8 w-8 place-items-center rounded border border-slate-200 text-muted-foreground hover:border-brand">›</button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (<div key={d} className="p-1 font-semibold text-muted-foreground">{d}</div>))}
              {Array.from({ length: first }).map((_, i) => (<div key={`e${i}`} />))}
              {Array.from({ length: days }).map((_, i) => {
                const d = i + 1;
                const has = eventDays.includes(d) && m === 7;
                return (<div key={d} className={`rounded p-1 ${has ? "bg-brand/15 font-semibold text-brand" : "text-[#c8d2dc]"}`}>{d}</div>);
              })}
            </div>
          </div>
          <div>
            {calendarEvents.map((e) => (
              <div key={e.title} className="card-surface mb-4 flex flex-wrap items-center gap-4 p-5">
                <div className="min-w-[60px] rounded-lg border border-slate-200 p-2 text-center">
                  <div className="text-xl font-bold text-navy">{e.day}</div>
                  <div className="text-[10px] uppercase text-muted-foreground">{e.month}</div>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-navy">{e.title}</div>
                  <div className="text-sm text-muted-foreground">{e.meta}</div>
                  <div className="mt-1 text-xs text-amber-500">{daysUntil(e.cd)}</div>
                </div>
                <Link href="/events" className="rounded-full border border-white/15 px-4 py-2 text-sm hover:border-brand">Details</Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
