import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  href?: string;
  linked?: boolean;
  priority?: boolean;
};

export function Logo({ className, href = "/", linked = true, priority = false }: LogoProps) {
  const text = (
    <div className={cn("inline-flex items-center justify-center font-black tracking-tight text-brand text-2xl md:text-3xl", className)}>
      ACM
    </div>
  );

  if (linked && href) {
    return (
      <Link href={href} className="inline-flex shrink-0 items-center">
        {text}
      </Link>
    );
  }

  return text;
}
