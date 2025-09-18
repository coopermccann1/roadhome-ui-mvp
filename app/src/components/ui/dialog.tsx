"use client";

import * as React from "react";
import { createPortal } from "react-dom";

export type DialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
};

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  if (!open || !mounted) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 grid place-items-center p-6"
    >
      <button
        className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"
        aria-label="Close dialog"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative w-full max-w-md rounded-xl bg-white shadow-soft-lg p-6 text-neutral-text">
        {children}
      </div>
    </div>,
    document.body
  );
}

export function DialogHeader({ children }: { children: React.ReactNode }) {
  return <div className="mb-3">{children}</div>;
}

export function DialogTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-xl text-neutral-text tracking-tight">
      {children}
    </h2>
  );
}

export function DialogDescription({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-1 text-sm text-neutral-text/70 leading-6">{children}</p>
  );
}

export function DialogFooter({ children }: { children: React.ReactNode }) {
  return <div className="mt-6 flex items-center justify-end gap-3">{children}</div>;
}

export function DialogClose({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="rounded-2xl bg-brand-blue/30 hover:bg-brand-blue/40 text-neutral-text py-2 px-4 text-sm font-semibold shadow-soft"
    >
      Close
    </button>
  );
}
