import * as React from "react";
import { TabBar } from "@/components/navigation/TabBar";

export default function TabsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-neutral-bg text-neutral-text min-h-[100dvh]">
      <main
        className="mx-auto max-w-5xl px-4 pt-6 pb-24"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 96px)" }}
      >
        {children}
      </main>
      <TabBar />
    </div>
  );
}
