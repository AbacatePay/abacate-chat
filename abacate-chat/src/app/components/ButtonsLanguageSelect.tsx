import { JavaIcon } from "@icons/stack/java";
import JavaScriptIcon from "@icons/stack/javascript";
import { PhpIcon } from "@icons/stack/php";
import PythonIcon from "@icons/stack/python";
import { RubyIcon } from "@icons/stack/Ruby";

const languages = [
  {
    code: "python",
    label: "Python",
    Icon: PythonIcon,
    prompt: "Me ajude a integrar a AbacatePay usando Python",
  },
  {
    code: "javascript",
    label: "Javascript",
    Icon: JavaScriptIcon,
    prompt: "Me ajude a integrar a AbacatePay usando Javascript",
  },
  {
    code: "php",
    label: "PHP",
    Icon: PhpIcon,
    prompt: "Me ajude a integrar a AbacatePay usando PHP",
  },
  {
    code: "ruby",
    label: "Ruby",
    Icon: RubyIcon,
    prompt: "Me ajude a integrar a AbacatePay usando Ruby",
  },
  {
    code: "java",
    label: "Java",
    Icon: JavaIcon,
    prompt: "Me ajude a integrar a AbacatePay usando Java",
  },
];

export default function ButtonsLanguageSelect({
  onSelect,
}: {
  onSelect: (prompt: string) => void;
}) {
  return (
    <div className="flex flex-wrap justify-center max-w-3xl gap-3">
      {languages.map(({ code, label, Icon, prompt }) => (
        <button
          key={code}
          onClick={() => onSelect(prompt)}
          className="rounded-full border-zinc-200 border-1 font-color px-4 py-2 hover:bg-zinc-50 text-alt-custom font-bold flex items-center gap-2"
        >
          <Icon />
          {label}
        </button>
      ))}
    </div>
  );
}
