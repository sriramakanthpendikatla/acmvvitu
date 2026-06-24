export default function AdminRegistrationsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Registrations</h1>
      <p className="mt-2 text-muted-foreground">Read-only view with CSV export — available after Supabase connection.</p>
      <div className="mt-8 card-surface p-8 text-center text-muted-foreground">No registrations yet (demo mode)</div>
    </div>
  );
}
