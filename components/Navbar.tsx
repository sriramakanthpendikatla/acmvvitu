"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks } from "@/lib/data";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const onHero = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-[1000] flex h-16 items-center justify-between px-4 md:px-6 transition-all duration-300",
        onHero && !scrolled
          ? "border-transparent bg-transparent"
          : "glass-nav shadow-sm",
        onHero && !scrolled ? "[&_a.nav-link]:text-white/90 [&_a.nav-link:hover]:text-white [&_a.nav-link.active]:text-white" : ""
      )}
    >
      <Logo priority />

      <ul
        className={cn(
          "hidden items-center gap-7 md:flex",
          open && "!flex absolute top-16 left-0 right-0 flex-col gap-4 border-b border-slate-700 bg-[#061224]/95 p-6 shadow-lg"
        )}
      >
        {navLinks.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              onClick={() => setOpen(false)}
              className={cn(
                "nav-link text-sm font-medium transition-colors",
                pathname === href
                  ? "active text-brand"
                  : onHero && !scrolled
                    ? "text-white/85 hover:text-white"
                    : "text-white/80 hover:text-brand-light"
              )}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-3">
        <Link
          href="/login"
          className={cn(
            "hidden rounded-full px-4 py-2 text-sm font-semibold transition md:inline-flex",
            onHero && !scrolled
              ? "border border-white/30 text-white hover:bg-white/10"
              : "btn-outline-brand !py-2 !px-4"
          )}
        >
          Login
        </Link>
        <button
          type="button"
          className={cn("md:hidden", onHero && !scrolled ? "text-white" : "text-navy")}
          aria-label="Menu"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>
    </nav>
  );
}
