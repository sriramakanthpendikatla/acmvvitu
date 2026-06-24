import Link from "next/link";

const adminLinks = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/events", label: "Events" },
  { href: "/admin/team", label: "Team" },
  { href: "/admin/registrations", label: "Registrations" },
  { href: "/admin/settings", label: "Settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-deep pt-16">
      <div className="mx-auto flex max-w-7xl">
        <aside className="hidden w-56 shrink-0 border-r border-slate-200 p-6 lg:block">
          <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-brand">Admin Panel</p>
          <nav className="space-y-1">
            {adminLinks.map((l) => (
              <Link key={l.href} href={l.href} className="block rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-white/5 hover:text-white">{l.label}</Link>
            ))}
          </nav>
          <Link href="/" className="mt-8 block text-sm text-brand">← Public site</Link>
        </aside>
        <main className="flex-1 p-6 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
