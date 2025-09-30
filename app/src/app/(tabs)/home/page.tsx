"use client";

import * as React from "react";
import { Progress } from "@/components/ui";

export default function HomePage() {
  return (
    <div className="font-sans">
      <section className="relative mx-auto max-w-md overflow-hidden rounded-2xl p-6 pt-8 pb-8 text-white shadow-soft-lg bg-gradient-to-b from-brand-teal to-brand-blue/70">
        {/* Status pill */}
        <div className="flex justify-center">
          <span className="inline-flex items-center rounded-full bg-brand-teal px-5 h-10 text-sm font-semibold shadow-soft">
            $10 more per week to be on track!
          </span>
        </div>

        {/* Glowing house icon */}
        <div className="relative mt-10 grid place-items-center py-6">
          {/* Radial glow behind the icon */}
          <div
            aria-hidden
            className="pointer-events-none absolute h-[260px] w-[260px] rounded-full blur-2xl motion-reduce:opacity-70 motion-safe:animate-glow"
            style={{
              background:
                "radial-gradient(closest-side, rgba(81,183,199,0.45), rgba(81,183,199,0.10) 60%, rgba(81,183,199,0) 75%)",
            }}
          />

          {/* House outline with brick steps */}
          <svg
            width="160"
            height="160"
            viewBox="0 0 200 200"
            fill="none"
            aria-hidden
          >
            <path
              d="M40 96 L100 44 L160 96 V176 H40 V96 Z"
              stroke="#FFFFFF"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* brick steps */}
            <path d="M60 136 H140" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" />
            <path d="M60 152 H140" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" />
            <path d="M60 168 H140" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" />
          </svg>
        </div>

        {/* Progress */}
        <div className="mt-6">
          <Progress value={62} />
          <div className="mt-2 text-center text-white/90 font-medium">Progress</div>
        </div>
      </section>
    </div>
  );
}
