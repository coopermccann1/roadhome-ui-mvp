"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { HouseOutline } from "@/components/icons/HouseOutline";

export interface HouseWidgetProps {
  size?: number; // widget square size in px (default 260)
  strokeWidth?: number; // border/stroke width (default 14)
  fillRatio?: number; // 0..1
  className?: string;
}

const BRICKS = [
  { key: "sill", left: 60, top: 244, width: 200, height: 18 },
  { key: "b1", left: 76, top: 206, width: 56, height: 26 },
  { key: "b2", left: 132, top: 206, width: 56, height: 26 },
  { key: "b3", left: 188, top: 206, width: 56, height: 26 },
  { key: "platform", left: 96, top: 176, width: 128, height: 26 },
  { key: "top", left: 146, top: 150, width: 68, height: 20 },
] as const;
const LEVELS = BRICKS.length; // 6 visible levels

export function HouseWidget({ size = 260, strokeWidth = 14, fillRatio = 1, className }: HouseWidgetProps) {
  const reduce = useReducedMotion();
  const s = size / 320; // scale factor
  const clamp = (v: number) => Math.max(0, Math.min(1, v));
  const clamped = clamp(fillRatio ?? 1);
  const visibleCount = Math.floor(clamped * LEVELS);
  const remainder = clamped * LEVELS - visibleCount;

  const clipId = React.useId();
  const inset = strokeWidth / 2;
  // Pre-scale coordinates for CSS pixels so clipPath aligns with HTML bricks (no CSS transforms needed)
  const px = (v: number) => v * s;
  const pathD = `M ${px(160)} ${px(60 + inset)} L ${px(80 + inset)} ${px(120)} V ${px(244 - inset)} H ${px(240 - inset)} V ${px(120)} Z`;

  return (
    <div className={["relative", className].filter(Boolean).join(" ")}
         style={{ width: size, height: size, color: "white" }}>
      {/* Base glow */}
      <div aria-hidden className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(81,183,199,0.18)_0%,rgba(81,183,199,0)_75%)]" />
      {/* Pulse when full */}
      {clamped >= 1 && (
        <div aria-hidden className="absolute inset-0 rounded-full animate-[pulseGlow_1.6s_ease-in-out_infinite]" />
      )}

      {/* Define clipPath in CSS px space */}
      <svg width={0} height={0} className="absolute">
        <defs>
          <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
            <path d={pathD} vectorEffect="non-scaling-stroke" />
          </clipPath>
        </defs>
      </svg>

      {/* Bricks layer (stroke simulated via borders) */}
      <div className="absolute left-0 top-0" style={{ width: size, height: size, clipPath: `url(#${clipId})` }}>
        {BRICKS.map((b, idx) => {
          const left = px(b.left);
          const top = px(b.top);
          const width = px(b.width);
          const height = px(b.height);
          const isFullyVisible = idx < visibleCount;
          const isPartial = idx === visibleCount && remainder > 0;

          if (isPartial) {
            const revealH = height * remainder;
            const hiddenH = height - revealH;
            // Outer clip box reveals bottom portion only
            const boxStyle: React.CSSProperties = {
              position: "absolute",
              left,
              top: top + hiddenH,
              width,
              height: revealH,
              overflow: "hidden",
            };
            const innerStyle: React.CSSProperties = {
              position: "absolute",
              left: 0,
              top: -hiddenH,
              width,
              height,
              border: `${strokeWidth}px solid currentColor`,
              borderRadius: 2,
              background: "transparent",
              boxSizing: "border-box",
            };
            if (reduce) {
              return (
                <div key={b.key} style={boxStyle}>
                  <div style={innerStyle} />
                </div>
              );
            }
            return (
              <motion.div key={b.key} style={boxStyle}
                initial={{ height: 0, top }}
                animate={{ height: revealH, top: top + hiddenH }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
                <div style={innerStyle} />
              </motion.div>
            );
          }

          const rectStyle: React.CSSProperties = {
            position: "absolute",
            left,
            top,
            width,
            height,
            border: `${strokeWidth}px solid currentColor`,
            borderRadius: 2,
            background: "transparent",
            boxSizing: "border-box",
            opacity: isFullyVisible ? 1 : 0,
          };
          return <div key={b.key} style={rectStyle} />;
        })}
      </div>

      {/* Outline on top (scaled to size) */}
      <div className="absolute inset-0 grid place-items-center">
        <HouseOutline size={size} strokeWidth={strokeWidth} className="text-current" />
      </div>
    </div>
  );
}

export default HouseWidget;
