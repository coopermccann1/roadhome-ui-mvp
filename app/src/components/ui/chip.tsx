"use client";

import * as React from "react";
import { cva, VariantProps } from "class-variance-authority";

const chipStyles = cva(
  "inline-flex items-center rounded-full border text-sm font-semibold select-none transition-colors ring-offset-neutral-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/60 px-4 h-10 gap-2", // large tap area (40px tall, 16px x padding)
  {
    variants: {
      variant: {
        neutral: "bg-neutral-text/10 text-neutral-text/80 border-transparent shadow-soft",
        teal: "bg-brand-teal text-white border-transparent shadow-soft",
        blue: "bg-brand-blue text-white border-transparent shadow-soft",
        coral: "bg-brand-coral text-white border-transparent shadow-soft",
      },
      selected: {
        true: "bg-brand-teal text-white border-transparent",
        false: "",
      },
      size: {
        sm: "h-8 px-4 text-xs", // 32 x 16
        md: "h-10 px-4 text-sm", // 40 x 16
        lg: "h-12 px-6 text-base", // 48 x 24
      },
    },
    defaultVariants: {
      variant: "teal",
      selected: false,
      size: "md",
    },
  }
);

export interface ChipProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof chipStyles> {
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
}

export const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  ({ className, variant, selected, size, leading, trailing, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={[chipStyles({ variant, selected, size }), className]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {leading ? <span className="shrink-0" aria-hidden>{leading}</span> : null}
        <span>{children}</span>
        {trailing ? <span className="shrink-0" aria-hidden>{trailing}</span> : null}
      </button>
    );
  }
);
Chip.displayName = "Chip";

export default Chip;
