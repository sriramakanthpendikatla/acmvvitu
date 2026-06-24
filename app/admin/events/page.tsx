import { allEvents } from "@/lib/data";

export default function AdminEventsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Events</h1>
      <p className="mt-2 text-sm text-muted-foreground">CRUD interface — wire to Supabase when ready.</p>
      <div className="mt-6 overflow-x-auto card-surface">
        <table className="w-full text-left text-sm">
          <thead><tr className="border-b border-slate-200 text-muted-foreground"><th className="p-4">Title</th><th className="p-4">Date</th><th className="p-4">Status</th><th className="p-4">Venue</th></tr></thead>
          <tbody>
            {allEvents.map((e) => (
              <tr key={e.id} className="border-b border-white/5"><td className="p-4 text-white">{e.title}</td><td className="p-4">{e.date}</td><td className="p-4 capitalize">{e.status}</td><td className="p-4 text-muted-foreground">{e.venue}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
