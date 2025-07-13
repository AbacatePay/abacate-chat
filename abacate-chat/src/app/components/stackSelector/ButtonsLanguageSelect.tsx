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
          className="rounded-full border-primary border text-primary px-4 py-2 hover:bg-[var(--secondary)] hover:text-hover-secondary-foreground font-bold flex items-center gap-2 cursor-pointer transition-colors duration-200"
        >
          <Icon />
          {label}
        </button>
      ))}
    </div>
  );
}
