"use client";

import * as React from "react";

export interface StatusChipProps {
  children: React.ReactNode;
  className?: string;
}

export function StatusChip({ children, className }: StatusChipProps) {
  return (
    <div className={["relative inline-block", className].filter(Boolean).join(" ")}> 
      {/* Soft shadow/halo behind chip to match mock */}
      <div
        aria-hidden
        className="absolute -inset-x-4 -inset-y-2 rounded-full bg-black/20 blur-md"
        style={{ filter: "blur(12px)" }}
      />
      <span className="relative inline-flex items-center rounded-full bg-brand-teal/95 text-white h-10 px-5 text-sm font-semibold">
        {children}
      </span>
    </div>
  );
}

export default StatusChip;
