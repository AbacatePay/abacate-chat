"use client";

import * as SegmentedControl from "@/app/components/ui/segmented-control";
import {
  LayoutGrid,
  Music,
  Code2,
  Layers,
  BookOpen,
  type LucideIcon,
} from "lucide-react";

interface VideoFiltersProps {
  selectedTab: string;
  onTabChange: (tab: string) => void;
}

interface Tab {
  id: string;
  label: string;
  icon: LucideIcon;
}

const tabs: Tab[] = [
  { id: "todos", label: "Todos", icon: LayoutGrid },
  { id: "vibe-code", label: "Vibe Code", icon: Music },
  { id: "code", label: "Code", icon: Code2 },
  { id: "low-code", label: "Low Code", icon: Layers },
  { id: "conceitos", label: "Conceitos", icon: BookOpen },
];

export function VideoFilters({ selectedTab, onTabChange }: VideoFiltersProps) {
  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <SegmentedControl.Root value={selectedTab} onValueChange={onTabChange}>
        <SegmentedControl.List>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <SegmentedControl.Trigger key={tab.id} value={tab.id}>
                <Icon className="h-4 w-4 flex-shrink-0" />
                <span className="whitespace-nowrap">{tab.label}</span>
              </SegmentedControl.Trigger>
            );
          })}
        </SegmentedControl.List>
      </SegmentedControl.Root>
    </div>
  );
}
