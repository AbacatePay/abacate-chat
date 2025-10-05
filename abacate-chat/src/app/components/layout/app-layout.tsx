"use client";

import { ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { cn } from "../lib/utils";

interface AppLayoutProps {
  children: ReactNode;
  className?: string;
}

export function AppLayout({ children, className }: AppLayoutProps) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <Sidebar />
      <main className="flex flex-1 flex-col overflow-hidden">
        <div
          className={cn(
            "mx-auto flex w-full max-w-6xl flex-1 flex-col overflow-hidden px-4",
            "transition-all duration-300",
            className
          )}
        >
          {children}
        </div>
      </main>
    </div>
  );
}
