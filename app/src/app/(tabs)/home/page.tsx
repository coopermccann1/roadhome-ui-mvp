"use client";

import * as React from "react";
import { Progress } from "@/components/ui";
import { HouseWidget } from "@/components/HouseWidget";

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

        {/* House widget (glow + clipped bricks + outline) */}
        <div className="mt-10">
          <div className="relative mx-auto h-[260px] w-[260px]">
            <HouseWidget fillRatio={1} />
          </div>
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
