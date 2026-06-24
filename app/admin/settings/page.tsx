export default function AdminSettingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Settings</h1>
      <p className="mt-2 text-muted-foreground">Edit site_meta: about text, contact email, social links.</p>
      <form className="mt-8 max-w-lg space-y-4 card-surface p-6">
        <div><label className="mb-1 block text-sm">Contact email</label><input defaultValue="acmvvit@vvit.net" className="w-full rounded-lg border border-slate-200 bg-deep px-3 py-2 text-white" readOnly /></div>
        <div><label className="mb-1 block text-sm">Instagram URL</label><input placeholder="https://instagram.com/..." className="w-full rounded-lg border border-slate-200 bg-deep px-3 py-2 text-white" readOnly /></div>
        <p className="text-xs text-muted-foreground">Editable when Supabase site_meta table is connected.</p>
      </form>
    </div>
  );
}
