import {
  Command,
  CommandInput,
  CommandList,
} from "./ui/command";

export default function SearchAcademy() {
  return (
    <div className="p-6">
      {/* Título */}
      <h2 className="text-lg font-medium text-gray-text mb-4">Pesquisar vídeos</h2>
      
      {/* Campo de busca usando Command do shadcn */}
      <Command className="rounded-lg border border-gray-border shadow-none">
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-placeholder text-lg z-10">
            🔍
          </div>
          <CommandInput 
            placeholder="Pesquisar"
            className="pl-10 pr-16 py-3 text-gray-text placeholder-gray-placeholder border-none focus:ring-0"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <button className="bg-gray-100 border border-gray-border text-gray-text px-2 py-1 rounded text-sm font-mono">
              ⌘F
            </button>
          </div>
        </div>
        <CommandList className="hidden">
          {/* Lista de comandos oculta por padrão */}
        </CommandList>
      </Command>
    </div>
  );
}
