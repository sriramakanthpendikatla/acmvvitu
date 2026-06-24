import Link from "next/link";
import { featuredEvents } from "@/lib/data";
import { Reveal } from "@/components/Reveal";

type EventItem = { slug?: string; title: string; subtitle: string; letter: string; gradient: string };

export function EventsSection({ compact = false, featured = featuredEvents }: { compact?: boolean; featured?: EventItem[] }) {
  return (
    <section className={`section-pad ${compact ? "" : "section-alt"}`}>
      <div className="mx-auto max-w-6xl px-4">
        <Reveal className="mb-10 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">What&apos;s on</span>
          <h2 className="mt-3 text-3xl font-bold text-navy">Featured events</h2>
          {compact && <p className="mx-auto mt-3 max-w-lg text-muted-foreground">Hackathons, tech fests, and guest sessions that define our chapter.</p>}
        </Reveal>
        <Reveal className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((e) => (
            <Link key={e.title} href="/events" className="card-surface group overflow-hidden transition hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/30">
              <div className={`flex h-36 items-center justify-center bg-gradient-to-br ${e.gradient} text-4xl font-extrabold text-white/15`}>{e.letter}</div>
              <div className="p-4">
                <div className="font-semibold text-navy">{e.title}</div>
                <div className="text-sm text-muted-foreground">{e.subtitle}</div>
              </div>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
