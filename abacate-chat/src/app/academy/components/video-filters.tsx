"use client";

import * as SegmentedControl from "@/app/components/ui/segmented-control";

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
    <div className="w-full max-w-2xl">
      <SegmentedControl.Root value={selectedTab} onValueChange={onTabChange}>
        <SegmentedControl.List>
          {tabs.map((tab) => (
            <SegmentedControl.Trigger key={tab.id} value={tab.id}>
              {tab.label}
            </SegmentedControl.Trigger>
          ))}
        </SegmentedControl.List>
      </SegmentedControl.Root>
    </div>
  );
}
