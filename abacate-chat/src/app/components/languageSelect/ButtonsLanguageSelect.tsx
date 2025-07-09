import { languages } from "./types";

export default function ButtonsLanguageSelect({
  onSelect,
}: {
  onSelect: (prompt: string) => void;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {languages.map(({ code, label, Icon, prompt }) => (
        <button
          key={code}
          onClick={() => onSelect(prompt)}
          className="rounded-full border-custom border-1 text-custom px-4 py-2 hover:bg-abacate-800 hover:text-custom font-bold flex items-center gap-2 cursor-pointer"
        >
          <Icon />
          {label}
        </button>
      ))}
    </div>
  );
}
