"use client";

import { useState } from "react";
import { Command, CommandInput } from "@/app/components/ui/command";

interface SearchAcademyProps {
  onSearchChange: (query: string) => void;
}

export function SearchAcademy({ onSearchChange }: SearchAcademyProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onSearchChange(value);
  };

  return (
    <Command className="h-10 rounded-lg border border-border shadow-none">
      <CommandInput
        placeholder="Pesquisar vídeos, tutoriais..."
        className="border-none text-foreground placeholder:text-soft-400"
        value={searchQuery}
        onValueChange={handleSearchChange}
      />
    </Command>
  );
}
