"use client";

import { useState } from "react";
import { registrationSchema } from "@/lib/validations";

export function RegistrationModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [msg, setMsg] = useState("");

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: fd.get("name") as string,
      rollNumber: fd.get("rollNumber") as string,
      branch: fd.get("branch") as string,
      email: fd.get("email") as string,
    };
    const parsed = registrationSchema.safeParse(data);
    if (!parsed.success) {
      setMsg(parsed.error.errors[0]?.message ?? "Invalid form");
      return;
    }
    const res = await fetch("/api/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    const json = await res.json();
    setMsg(json.message ?? "Registration submitted!");
    if (res.ok) setTimeout(onClose, 2000);
  }

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-deep/80 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md card-surface p-8">
        <h2 className="mb-6 text-xl font-semibold text-white">Event registration</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div><label className="mb-1 block text-sm">Full name</label><input name="name" required className="w-full rounded-lg border border-slate-200 bg-deep px-3 py-2 text-white" /></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label className="mb-1 block text-sm">Roll number</label><input name="rollNumber" required className="w-full rounded-lg border border-slate-200 bg-deep px-3 py-2 text-white" /></div>
            <div><label className="mb-1 block text-sm">Branch</label><select name="branch" required className="w-full rounded-lg border border-slate-200 bg-deep px-3 py-2 text-white"><option value="">Select</option><option>CSE</option><option>IT</option><option>AI&ML</option><option>ECE</option></select></div>
          </div>
          <div><label className="mb-1 block text-sm">Email</label><input name="email" type="email" required className="w-full rounded-lg border border-slate-200 bg-deep px-3 py-2 text-white" /></div>
          <div className="flex gap-3 pt-2">
            <button type="submit" className="flex-1 rounded-full btn-brand !bg-brand py-2 font-semibold text-white">Submit</button>
            <button type="button" onClick={onClose} className="rounded-full border border-white/15 px-4 py-2 text-sm">Cancel</button>
          </div>
        </form>
        {msg && <p className="mt-4 text-center text-sm text-brand">{msg}</p>}
      </div>
    </div>
  );
}
