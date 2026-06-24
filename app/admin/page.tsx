export default function AdminDashboard() {
  const stats = [
    { label: "Upcoming events", value: "3" },
    { label: "Team members", value: "16" },
    { label: "Registrations (demo)", value: "0" },
    { label: "Blog posts", value: "3" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Dashboard</h1>
      <p className="mt-2 text-muted-foreground">Welcome to the ACM VVITU admin panel. Connect Supabase + NextAuth to enable live data.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="card-surface p-6">
            <div className="text-3xl font-bold text-brand">{s.value}</div>
            <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="mt-10 card-surface p-6">
        <h2 className="font-semibold text-white">Setup checklist</h2>
        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
          <li>✓ Next.js 14 App Router scaffolded</li>
          <li>✓ Public site + 3D hero integrated</li>
          <li>✓ API routes with Zod validation</li>
          <li>○ Add Supabase project + env vars</li>
          <li>○ Configure NextAuth.js v5 credentials provider</li>
          <li>○ Enable middleware auth guard on /admin/*</li>
          <li>○ Connect Resend for registration emails</li>
        </ul>
      </div>
    </div>
  );
}
