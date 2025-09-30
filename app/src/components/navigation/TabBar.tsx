"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  ReceiptText,
  LineChart,
  User2,
} from "lucide-react";
import * as React from "react";

const tabs = [
  { href: "/home", label: "Home", Icon: Home },
  { href: "/subscriptions", label: "Subscriptions", Icon: ReceiptText },
  { href: "/invest", label: "Invest", Icon: LineChart },
  { href: "/profile", label: "Profile", Icon: User2 },
];

export function TabBar() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40"
      aria-label="Primary"
    >
      <div className="mx-auto max-w-5xl px-4 pb-2 pt-2" style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 8px)" }}>
        <div className="mx-auto rounded-t-2xl bg-neutral-bg shadow-inner-soft border-t border-black/5">
          <ul className="grid grid-cols-4 items-center justify-between">
            {tabs.map(({ href, label, Icon }) => {
              const active = pathname === href;
              return (
                <li key={href} className="">
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={[
                      "flex flex-col items-center justify-center gap-1 py-2.5",
                      active ? "text-brand-teal" : "text-neutral-600",
                    ].join(" ")}
                  >
                    <Icon size={22} strokeWidth={2.5} />
                    <span className="text-[11px] leading-none font-medium">
                      {label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
