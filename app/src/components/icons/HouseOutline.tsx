import * as React from "react";

export interface HouseOutlineProps {
  size?: number; // px
  strokeWidth?: number; // default 14
  className?: string;
}

export function HouseOutline({ size = 320, strokeWidth = 14, className }: HouseOutlineProps) {
  return (
    <svg
      viewBox="0 0 320 320"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M160 60 L80 120 V244 H240 V120 Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export default HouseOutline;
