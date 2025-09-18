"use client";

import * as React from "react";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0-100
  label?: string;
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ value, label, className, ...props }, ref) => {
    const clamped = Math.max(0, Math.min(100, value ?? 0));

    return (
      <div
        ref={ref}
        role="group"
        aria-label={label || "progress"}
        className={["w-full", className].filter(Boolean).join(" ")}
        {...props}
      >
        {label ? (
          <div className="mb-2 text-sm font-medium text-neutral-text/80">
            {label}
          </div>
        ) : null}
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(clamped)}
          className="h-3 rounded-full bg-brand-blue/25 shadow-inner-soft overflow-hidden"
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-blue to-brand-teal shadow-soft-sm"
            style={{ width: `${clamped}%` }}
          />
        </div>
      </div>
    );
  }
);
Progress.displayName = "Progress";

export default Progress;
