import Link from "next/link";
import { coreTeam } from "@/lib/data";
import { Reveal } from "@/components/Reveal";

type Member = { initials: string; name: string; role: string; bio: string };

export function TeamSection({ compact = false, members = coreTeam }: { compact?: boolean; members?: Member[] }) {
  return (
    <section className="section-pad">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal className="mb-10 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Leadership</span>
          <h2 className="mt-3 text-3xl font-bold text-navy">Core team — current board</h2>
        </Reveal>
        <Reveal className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((m) => (
            <div key={m.initials + m.name} className="flip-card">
              <div className="flip-inner">
                <div className="flip-front">
                  <div className="mb-3 grid h-14 w-14 place-items-center rounded-full border-2 border-brand/20 bg-brand-muted text-sm font-bold text-brand">{m.initials}</div>
                  <div className="font-semibold text-navy">{m.name}</div>
                  <div className="text-sm text-muted-foreground">{m.role}</div>
                </div>
                <div className="flip-back"><p className="text-sm text-muted-foreground">{m.bio}</p></div>
              </div>
            </div>
          ))}
        </Reveal>
        {compact && <p className="mt-8 text-center"><Link href="/members" className="text-sm text-brand hover:underline">Meet the full team →</Link></p>}
      </div>
    </section>
  );
}
