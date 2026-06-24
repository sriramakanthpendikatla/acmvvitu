"use client";

import Link from "next/link";
import { useState } from "react";
import { loginSchema } from "@/lib/validations";
import { Logo } from "@/components/Logo";

export default function LoginPage() {
  const [msg, setMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = { email: fd.get("email") as string, password: fd.get("password") as string };
    if (!loginSchema.safeParse(data).success) {
      setMsg("Enter a valid email and password (min 6 chars).");
      return;
    }
    setMsg("Admin panel coming soon — connect Supabase + NextAuth per system design.");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-muted/30 px-4 pb-16 pt-24">
      <div className="w-full max-w-md card-surface p-10">
        <div className="mb-6 flex justify-center">
          <Logo className="h-12" />
        </div>
        <h1 className="text-center text-2xl font-bold text-navy">Officer login</h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">Chapter officers and admins only</p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="mb-1 block text-sm text-navy">Email</label>
            <input name="email" type="email" required className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-navy focus:border-brand focus:outline-none" placeholder="officer@vvit.net" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-navy">Password</label>
            <input name="password" type="password" required className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-navy focus:border-brand focus:outline-none" placeholder="••••••••" />
          </div>
          <button type="submit" className="btn-brand w-full">Sign in</button>
        </form>
        {msg && <p className="mt-4 text-center text-sm text-brand">{msg}</p>}
        <p className="mt-6 text-center text-sm"><Link href="/" className="text-link-brand">← Back to site</Link></p>
      </div>
    </div>
  );
}
