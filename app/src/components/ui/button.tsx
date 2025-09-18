"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const buttonStyles = cva(
  "inline-flex items-center justify-center rounded-xl shadow-soft text-sm font-semibold transition-colors select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/60 active:shadow-soft-sm disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "bg-brand-teal text-white hover:bg-brand-teal/90 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-bg",
        blue: "bg-brand-blue text-white hover:bg-brand-blue/90",
        coral: "bg-brand-coral text-white hover:bg-brand-coral/90",
        secondary:
          "bg-white text-brand-teal shadow-soft hover:bg-brand-blue/20 border border-brand-blue/30",
        outline:
          "bg-transparent text-brand-teal border border-brand-teal/40 hover:bg-brand-teal/10",
        ghost:
          "bg-transparent text-neutral-text hover:bg-brand-blue/10",
      },
      size: {
        sm: "h-10 px-4 gap-2", // 40 x 16, 8pt rhythm
        md: "h-12 px-6 gap-2", // 48 x 24
        lg: "h-14 px-6 gap-2 text-base", // 56 x 24
      },
      full: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      full: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, full, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={[buttonStyles({ variant, size, full }), className]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export default Button;
