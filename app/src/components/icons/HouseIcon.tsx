"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

export interface HouseIconProps {
  size?: number; // px
  strokeWidth?: number; // default 14 @ 320 viewbox
  className?: string;
  fillRatio?: number; // 0..1 visual mask for future progress
}

/**
 * HouseIcon – Deterministic coordinates matching the RoadHome mock.
 * 320x320 viewBox; stroke-only; bricks are true rectangles with tiny radius.
 * Separate outline (rounded caps/joins) and bricks (square caps/joins) groups.
 * Adds a vertical mask to reveal bricks bottom-up based on fillRatio.
 */
export function HouseIcon({ size = 220, strokeWidth = 14, className, fillRatio = 1 }: HouseIconProps) {
  const id = React.useId();
  const prefersReduced = useReducedMotion();

  // Mask rectangle derived from fillRatio (0=hide, 1=show all)
  const maskHeight = Math.max(0, Math.min(1, fillRatio)) * 320;
  const maskY = 320 - maskHeight;

  return (
    <svg
      viewBox="0 0 320 320"
      width={size}
      height={size}
      fill="none"
      className={className}
      shapeRendering="geometricPrecision"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* HOUSE OUTLINE — rounded caps/joins */}
      <g stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <path d="M160 60 L80 120 V244 H240 V120 Z" vectorEffect="non-scaling-stroke" />
      </g>

      {/* PROGRESS MASK (for future animation) */}
      <defs>
        <mask id={`brickMask-${id}`}>
          {/* Black background (hidden) */}
          <rect x="0" y="0" width="320" height="320" fill="black" />
          {/* White area reveals bricks; animate height from bottom */}
          {prefersReduced ? (
            <rect x="0" y={maskY} width="320" height={maskHeight} fill="white" />
          ) : (
            <motion.rect
              x="0"
              initial={{ y: 320, height: 0 }}
              animate={{ y: maskY, height: maskHeight }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              width="320"
              fill="white"
            />
          )}
        </mask>
      </defs>

      {/* BRICKS — square caps/joins; stroke only, no fill */}
      <g
        mask={`url(#brickMask-${id})`}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeMiterlimit={1}
      >
        {/* Bottom sill bar */}
        <rect x="64" y="244" width="192" height="18" rx="0" vectorEffect="non-scaling-stroke" />
        {/* Middle row: three equal rectangular bricks */}
        <rect x="76" y="208" width="56" height="26" rx="0" vectorEffect="non-scaling-stroke" />
        <rect x="132" y="208" width="56" height="26" rx="0" vectorEffect="non-scaling-stroke" />
        <rect x="188" y="208" width="56" height="26" rx="0" vectorEffect="non-scaling-stroke" />
        {/* Platform (~60% width, centered) */}
        <rect x="96" y="178" width="128" height="26" rx="0" vectorEffect="non-scaling-stroke" />
        {/* Top brick (~35% width, centered) */}
        <rect x="146" y="152" width="68" height="20" rx="0" vectorEffect="non-scaling-stroke" />
      </g>
    </svg>
  );
}

export default HouseIcon;
