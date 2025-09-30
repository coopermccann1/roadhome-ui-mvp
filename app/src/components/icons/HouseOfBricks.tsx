"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

export interface HouseOfBricksProps {
  size?: number; // px
  strokeWidth?: number; // default 14
  fillRatio?: number; // 0..1 bottom-up reveal
  className?: string;
}

// Deterministic SVG that matches RoadHome mock exactly.
// - Outline is rounded (friendly)
// - Bricks are crisp rectangles with square caps/joins
// - Mask reveals bricks bottom-up using fillRatio
export function HouseOfBricks({
  size = 220,
  strokeWidth = 14,
  fillRatio = 1,
  className,
}: HouseOfBricksProps) {
  const id = React.useId();
  const reduce = useReducedMotion();

  const clamped = Math.max(0, Math.min(1, fillRatio ?? 1));
  const revealHeight = clamped * 320; // from bottom
  const blackHeight = 320 - revealHeight; // hide top portion

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
      {/* HOUSE OUTLINE — rounded caps/joins */}
      <g stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <path d="M160 60 L80 120 V244 H240 V120 Z" vectorEffect="non-scaling-stroke" />
      </g>

      {/* PROGRESS MASK — reveal bricks from bottom to top */}
      <defs>
        <mask id={`brickReveal-${id}`}>
          {/* White background reveals; we'll hide upper part with black */}
          <rect x="0" y="0" width="320" height="320" fill="white" />
          {reduce ? (
            <rect x="0" y={0} width="320" height={blackHeight} fill="black" />
          ) : (
            <motion.rect
              x={0}
              initial={{ y: 0, height: 320 }}
              animate={{ y: 0, height: blackHeight }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              width={320}
              fill="black"
            />
          )}
        </mask>
      </defs>

      {/* BRICKS — square caps/joins; stroke only, no fill; exact coordinates */}
      <g
        mask={`url(#brickReveal-${id})`}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeMiterlimit={1}
      >
        {/* Bottom sill bar */}
        <rect x={60} y={244} width={200} height={18} rx={0} vectorEffect="non-scaling-stroke" />
        {/* Middle row — three equal bricks with 20px gutters */}
        <rect x={76} y={206} width={56} height={26} rx={0} vectorEffect="non-scaling-stroke" />
        <rect x={132} y={206} width={56} height={26} rx={0} vectorEffect="non-scaling-stroke" />
        <rect x={188} y={206} width={56} height={26} rx={0} vectorEffect="non-scaling-stroke" />
        {/* Platform (~60% width, centered) */}
        <rect x={96} y={176} width={128} height={26} rx={0} vectorEffect="non-scaling-stroke" />
        {/* Top brick (~35% width, centered) */}
        <rect x={146} y={150} width={68} height={20} rx={0} vectorEffect="non-scaling-stroke" />
      </g>
    </svg>
  );
}

export default HouseOfBricks;
