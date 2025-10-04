"use client";

import { cn } from "@/app/components/lib/utils";

interface VideoFiltersProps {
  selectedTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "todos", label: "Todos" },
  { id: "vibe-code", label: "Vibe Code" },
  { id: "code", label: "Code" },
  { id: "low-code", label: "Low Code" },
  { id: "conceitos", label: "Conceitos" },
];

export function VideoFilters({ selectedTab, onTabChange }: VideoFiltersProps) {
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide">
      <div className="flex gap-1 rounded-lg border border-border bg-weak-50 p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold transition-colors",
              selectedTab === tab.id
                ? "bg-background text-foreground shadow-sm"
                : "text-soft-400 hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
