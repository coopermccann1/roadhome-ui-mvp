import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const cardStyles = cva(
  "bg-white text-neutral-text rounded-xl shadow-soft p-4 md:p-6", // 20px rounding, 16/24 spacing (8pt rhythm)
  {
    variants: {
      variant: {
        default: "",
        surface: "bg-neutral-bg",
        teal: "bg-gradient-to-b from-brand-blue/40 to-brand-teal/20 text-neutral-text",
      },
      interactive: {
        true: "hover:shadow-soft-lg transition-shadow",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      interactive: false,
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardStyles> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, interactive, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={[cardStyles({ variant, interactive }), className]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

export default Card;
