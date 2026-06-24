# ACM VVITU Website

Official website for the Association for Computing Machinery chapter at VVIT University.

## Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14 (App Router) + Tailwind CSS |
| 3D Hero | Three.js r160 (legacy scene.js) |
| Validation | Zod |
| Database (planned) | Supabase PostgreSQL |
| Auth (planned) | NextAuth.js v5 |
| Email (planned) | Resend |
| Deploy (planned) | Vercel |

## Quick start

```bash
cd acm-vvitu-website
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Routes

| Route | Description |
|-------|-------------|
| `/` | Home — 3D hero + all wireframe sections (S01–S13) |
| `/about` | Mission, vision, timeline, alumni |
| `/members` | Team directory with filters |
| `/events` | Events listing + registration modal |
| `/calendar` | Mini calendar + upcoming events |
| `/contact` | Contact form (POST `/api/contact`) |
| `/login` | Officer login UI |
| `/admin` | Admin dashboard (demo mode) |
| `/admin/events` | Events CRUD preview |
| `/admin/team` | Team management preview |

## API routes

- `GET /api/events` — list events
- `POST /api/register` — event registration (Zod validated)
- `POST /api/contact` — contact form submission

## Project structure

```
acm-vvitu-website/
├── app/                    # Next.js App Router
│   ├── page.tsx            # Home (single-page scroll)
│   ├── about/ … contact/   # Public pages
│   ├── admin/              # Admin panel skeleton
│   └── api/                # API routes
├── components/
│   ├── sections/           # Hero, Stats, Events, etc.
│   ├── Navbar.tsx
│   └── Footer.tsx
├── lib/
│   ├── data.ts             # Static content (→ Supabase later)
│   └── validations.ts      # Shared Zod schemas
├── public/scene.js         # Three.js hero scene
├── legacy/                 # Original static HTML site
└── SYSTEM_DESIGN.txt       # Full system design doc
```

## Environment variables

Copy `.env.example` to `.env.local` and fill in when connecting Supabase, NextAuth, and Resend.

## Legacy static site

The original static HTML version is preserved in `legacy/` and can be served with:

```bash
cd legacy && python -m http.server 8080
```

## Roadmap

See `SYSTEM_DESIGN.txt` for the full 7-phase plan. Completed so far:

- Phase 1: Next.js scaffolding, shared layout, Zod schemas
- Phase 2: 3D hero integrated on home page
- Phase 3: All public sections and route pages
- Phase 4: Registration API (demo — no DB yet)
- Phase 5: Admin panel skeleton

Next: Supabase tables + NextAuth + Resend email + Vercel deploy.
