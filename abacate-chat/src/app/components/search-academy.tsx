import { CreditCard, Settings, User } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "./ui/command";

export default function SearchAcademy() {
  return (
    <div className="p-6">
      <h2 className="text-lg font-medium text-gray-search mb-4">
        Vídeos, tutoriais, artigos, repositórios e mais.
      </h2>
      <Command className="rounded-lg border border-gray-border shadow-none h-[40px] text-center justify-center data-[disabled=true]">
        <CommandInput
          placeholder="Pesquisar"
          className="text-gray-search placeholder-gray-search border-none "
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
