"use client";

import * as React from "react";
import { Button, Card, Chip, Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, Progress, Toggle } from "../components/ui";

export default function Home() {
  const [open, setOpen] = React.useState(false);
  const [goal, setGoal] = React.useState(65);
  const [muted, setMuted] = React.useState(false);

  return (
    <div className="min-h-screen p-8 md:p-12 font-sans">
      <div className="mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-2 bg-gradient-to-b from-brand-blue/40 to-brand-teal/25 p-6 shadow-soft-lg">
          <div className="flex items-center justify-between">
            <Chip variant="teal">You're on track!</Chip>
            <Toggle checked={!muted} onCheckedChange={(v)=>setMuted(!v)} aria-label="Mute toggle" />
          </div>
          <div className="mt-8 flex items-end justify-between">
            <div>
              <h1 className="font-display text-3xl text-neutral-text tracking-tight">Road Home</h1>
              <p className="mt-1 text-neutral-text/80">$8,500 · YTD +12.3%</p>
            </div>
            <Button variant="secondary" onClick={()=>setOpen(true)}>Open Dialog</Button>
          </div>
          <div className="mt-6">
            <Progress value={goal} label="Progress" />
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <h2 className="font-display text-xl mb-4">Subscriptions</h2>
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-brand-blue/40 p-4 text-center shadow-soft bg-white">
                <div className="h-10 w-10 mx-auto rounded-xl bg-brand-blue/30" />
                <div className="mt-2 font-semibold">Item {i + 1}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <h2 className="font-display text-xl">Buttons</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button>Teal (Primary)</Button>
            <Button variant="blue">Blue</Button>
            <Button variant="coral">Coral</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <h2 className="font-display text-xl">Chips & Toggles</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <Chip variant="teal">Teal</Chip>
            <Chip variant="blue">Blue</Chip>
            <Chip variant="coral">Coral</Chip>
            <Chip variant="neutral">Neutral</Chip>
            <Toggle />
          </div>
        </Card>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogHeader>
          <DialogTitle>Road Home</DialogTitle>
          <DialogDescription>Soft, rounded, playful dialog.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose onClick={() => setOpen(false)} />
          <Button onClick={() => setOpen(false)} variant="primary">Confirm</Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
