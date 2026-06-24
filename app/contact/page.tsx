"use client";

import Link from "next/link";
import { useState } from "react";
import { contactSchema } from "@/lib/validations";

export default function ContactPage() {
  const [msg, setMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      subject: fd.get("subject") as string,
      message: fd.get("message") as string,
    };
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      setMsg("Please fill all fields correctly.");
      return;
    }

    fd.append("access_key", "d44c46c2-c137-46f0-b68a-c2ed8927d5f1");
    fd.append("reply_to", data.email);
    fd.append("subject", `Website contact form: ${data.subject}`);
    fd.append("source", "ACM VVITU website contact form");

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: fd,
      headers: {
        Accept: "application/json",
      },
    });

    const responseData = await res.json();
    if (res.ok && responseData.success) {
      setMsg("Message sent! We'll get back to you within 48 hours.");
      e.currentTarget.reset();
    } else {
      setMsg(responseData.message || "Something went wrong. Please try again.");
    }
  }

  return (
    <>
      <section className="page-hero">
        <h1 className="text-4xl font-bold text-navy">Contact us</h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Questions about membership, events, or partnerships?</p>
      </section>
      <section className="section-pad">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 lg:grid-cols-2">
          <div className="space-y-4">
            {[
              { t: "Email", v: "acm.vvit@gmail.com", href: "mailto:acm.vvit@gmail.com" },
              { t: "Campus", v: "VVIT, Guntur, AP 522508" },
              { t: "Faculty Advisor", v: "Dr. Faculty Advisor · Dept. of CSE" },
            ].map((c) => (
              <div key={c.t} className="card-surface p-6">
                <h3 className="font-semibold text-navy">{c.t}</h3>
                {c.href ? <a href={c.href} className="mt-2 block text-sm text-brand">{c.v}</a> : <p className="mt-2 text-sm text-muted-foreground">{c.v}</p>}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="card-surface p-8">
            <h2 className="mb-6 text-xl font-semibold text-navy">Send a message</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div><label className="mb-1 block text-sm">Name</label><input name="name" required className="w-full rounded-lg border border-slate-200 bg-deep px-3 py-2 text-white" /></div>
              <div><label className="mb-1 block text-sm">Email</label><input name="email" type="email" required className="w-full rounded-lg border border-slate-200 bg-deep px-3 py-2 text-white" /></div>
            </div>
            <div className="mt-4"><label className="mb-1 block text-sm">Subject</label>
              <select name="subject" required className="w-full rounded-lg border border-slate-200 bg-deep px-3 py-2 text-white">
                <option value="">Select</option><option>Join ACM VVITU</option><option>Event inquiry</option><option>Sponsorship</option><option>Other</option>
              </select>
            </div>
            <div className="mt-4"><label className="mb-1 block text-sm">Message</label><textarea name="message" required rows={4} className="w-full rounded-lg border border-slate-200 bg-deep px-3 py-2 text-white" /></div>
            <button type="submit" className="mt-6 w-full rounded-full btn-brand !bg-brand py-2.5 font-semibold text-white">Send message</button>
            {msg && <p className="mt-4 text-center text-sm text-brand">{msg}</p>}
          </form>
        </div>
      </section>
      <section className="section-pad section-alt text-center">
        <h2 className="text-2xl font-bold text-navy">Ready to become a member?</h2>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">Membership is free for all VVIT students.</p>
        <Link href="/events" className="mt-6 inline-block rounded-full btn-brand !bg-brand px-6 py-2.5 text-sm font-semibold text-white">See upcoming events</Link>
      </section>
    </>
  );
}
