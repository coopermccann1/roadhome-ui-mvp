"use client";

import * as React from "react";

export interface ToggleProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: { root: "w-12 h-7", knob: "h-5 w-5", translate: "translate-x-5" },
  md: { root: "w-14 h-8", knob: "h-6 w-6", translate: "translate-x-6" },
  lg: { root: "w-16 h-9", knob: "h-7 w-7", translate: "translate-x-7" },
};

export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      checked: controlledChecked,
      defaultChecked,
      onCheckedChange,
      size = "md",
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const [uncontrolled, setUncontrolled] = React.useState(!!defaultChecked);
    const isControlled = controlledChecked !== undefined;
    const checked = isControlled ? !!controlledChecked : uncontrolled;

    const s = sizes[size];

    function toggle() {
      if (disabled) return;
      const next = !checked;
      if (!isControlled) setUncontrolled(next);
      onCheckedChange?.(next);
    }

    return (
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-disabled={disabled || undefined}
        onClick={toggle}
        ref={ref}
        className={[
          "relative inline-flex shrink-0 cursor-pointer select-none items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/60 ring-offset-2 ring-offset-neutral-bg",
          s.root,
          checked ? "bg-brand-teal" : "bg-brand-blue/30",
          disabled ? "opacity-50 pointer-events-none" : "",
          "shadow-soft",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        <span
          className={[
            "pointer-events-none inline-block transform rounded-full bg-white shadow-soft transition",
            s.knob,
            checked ? s.translate : "translate-x-1",
          ].join(" ")}
        />
      </button>
    );
  }
);
Toggle.displayName = "Toggle";

export default Toggle;
