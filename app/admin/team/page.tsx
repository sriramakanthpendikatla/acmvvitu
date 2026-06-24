import { members } from "@/lib/data";

export default function AdminTeamPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Team</h1>
      <div className="mt-6 grid gap-3">
        {members.map((m) => (
          <div key={m.id} className="card-surface flex items-center gap-4 p-4">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-[#1a2332] text-xs font-bold text-brand">{m.initials}</div>
            <div><div className="font-medium text-white">{m.name}</div><div className="text-sm text-muted-foreground">{m.role}</div></div>
          </div>
        ))}
      </div>
    </div>
  );
}
