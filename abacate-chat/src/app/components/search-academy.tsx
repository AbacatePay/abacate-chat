"use client";
import { useState } from "react";
import { Command, CommandInput } from "./ui/command";

interface SearchAcademyProps {
  onSearchChange: (query: string) => void;
}

export default function SearchAcademy({ onSearchChange }: SearchAcademyProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <Command className="rounded-lg border border-gray-border shadow-none h-[40px] text-center justify-center data-[disabled=true]">
        <CommandInput
          placeholder="Pesquisar"
          className="text-gray-search placeholder-gray-search border-none "
          value={searchQuery}
          onValueChange={(value) => {
            setSearchQuery(value);
            onSearchChange(value);
          }}
        />
        {/* <CommandList className="p-4">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <span>Calendar</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <User />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <CreditCard />
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Settings />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList> */}
      </Command>
    </div>
  );
}
