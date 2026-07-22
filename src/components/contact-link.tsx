"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode, MouseEvent } from "react";

type Props = {
  className?: string;
  children: ReactNode;
  onNavigate?: () => void;
};

/** Home'dayken hash scroll; başka sayfadan `/#contact` ile contact'a iner. */
export function ContactLink({ className, children, onNavigate }: Props) {
  const pathname = usePathname();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onNavigate?.();
    if (pathname !== "/") return;
    event.preventDefault();
    const el = document.getElementById("contact");
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", "/#contact");
  };

  return (
    <Link href="/#contact" className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
