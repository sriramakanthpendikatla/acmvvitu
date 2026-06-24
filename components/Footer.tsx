import Link from "next/link";
import { navLinks } from "@/lib/data";
import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo href="/" className="contrast-110" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
              The student chapter of ACM at Vasireddy Venkatadri Institute of Technology, Guntur, AP.
            </p>
            <div className="mt-5 flex gap-2">
              {["in", "tw", "gh", "ig"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="grid h-9 w-9 place-items-center rounded-lg border border-brand/20 bg-brand/10 text-xs text-brand transition hover:border-brand-light hover:text-brand-light"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Navigate</h4>
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href} className="mb-2 block text-sm text-white/70 hover:text-brand-light">
                {label}
              </Link>
            ))}
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Resources</h4>
            <Link href="/events" className="mb-2 block text-sm text-white/70 hover:text-brand-light">Gallery</Link>
            <Link href="/about" className="mb-2 block text-sm text-white/70 hover:text-brand-light">Projects</Link>
            <Link href="/contact" className="mb-2 block text-sm text-white/70 hover:text-brand-light">Join ACM</Link>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Contact</h4>
            <a href="mailto:acmvvit@vvit.net" className="mb-2 block text-sm text-white/70 hover:text-brand-light">
              acmvvit@vvit.net
            </a>
            <Link href="/contact" className="mb-2 block text-sm text-white/70 hover:text-brand-light">Faculty advisor</Link>
            <Link href="/contact" className="block text-sm text-white/70 hover:text-brand-light">Report an issue</Link>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-slate-200 pt-5 text-sm text-white/50 sm:flex-row">
          <span>© 2025 VVITU ACM Student Chapter</span>
          <span>
            <a href="#" className="hover:text-brand-light">Privacy</a>
            <a href="#" className="ml-4 hover:text-brand-light">Terms</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
