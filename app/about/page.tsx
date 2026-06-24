import { alumni, faqs, timeline } from "@/lib/data";
import { FaqSection } from "@/components/sections/FaqSection";
import { Reveal } from "@/components/Reveal";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <h1 className="text-4xl font-bold text-navy md:text-5xl">About VVITU ACM</h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">The student chapter of ACM at VVIT University — building India&apos;s next generation of technologists since 2017.</p>
      </section>
      <section className="section-pad">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-3">
          {[
            { icon: "🎯", title: "Our Mission", text: "Advance computing as a science and profession through a community of learners and innovators." },
            { icon: "🔭", title: "Our Vision", text: "Be the most active student tech chapter in Andhra Pradesh — recognized nationally for hackathons and alumni success." },
            { icon: "🤝", title: "Our Values", text: "Inclusivity, hands-on learning, peer mentorship, and giving back through Hour of Code." },
          ].map((m) => (
            <Reveal key={m.title} className="card-surface p-8">
              <div className="mb-4 text-2xl">{m.icon}</div>
              <h3 className="text-lg font-semibold text-navy">{m.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{m.text}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="section-pad section-alt">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-10 text-center text-3xl font-bold text-navy">Chapter timeline</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {[timeline.slice(0, 3), timeline.slice(3)].map((col, ci) => (
              <div key={ci} className="border-l-2 border-slate-200 pl-6">
                {col.map((t) => (
                  <div key={t.year} className="relative mb-7 pl-4">
                    <div className={`absolute -left-[1.65rem] top-1 h-3 w-3 rounded-full ${t.past ? "bg-[#3a4a63]" : "bg-brand"}`} />
                    <div className={`text-xs font-bold ${t.past ? "text-muted-foreground" : "text-brand"}`}>{t.year}</div>
                    <p className="mt-1 text-sm text-muted-foreground">{t.text}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section-pad">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-10 text-center text-3xl font-bold text-navy">Where our alumni work</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {alumni.map((a) => (
              <div key={a.name} className="card-surface p-5 text-center">
                <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full border-2 border-brand/35 text-sm font-bold text-brand">{a.initials}</div>
                <div className="font-semibold text-navy">{a.name}</div>
                <div className="text-sm text-muted-foreground">{a.role}</div>
                <div className="mt-1 text-sm text-brand">{a.company}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <FaqSection items={faqs.slice(0, 3)} />
    </>
  );
}
