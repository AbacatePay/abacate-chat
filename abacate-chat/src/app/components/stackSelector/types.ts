import { JavaIcon } from "@icons/stack/java";
import JavaScriptIcon from "@icons/stack/javascript";
import { LovableIcon } from "@icons/stack/Lovable";
import { PhpIcon } from "@icons/stack/php";
import PythonIcon from "@icons/stack/python";
import { RubyIcon } from "@icons/stack/Ruby";

const prompt = {
lovable: `Me ajude a integrar a AbacatePay usando Lovable`,

python : `Me ajude a integrar a AbacatePay usando Python`,
 javascript : `Me ajude a integrar a AbacatePay usando Javascript`,
php : `Me ajude a integrar a AbacatePay usando PHP`,
ruby : `Me ajude a integrar a AbacatePay usando Ruby`,
java: `Me ajude a integrar a AbacatePay usando Java`
}

export const languages = [
    {
      code: "python",
      label: "Python",
      Icon: PythonIcon,
      prompt: prompt.python,
    },
    {
      code: "javascript",
      label: "Javascript",
      Icon: JavaScriptIcon,
      prompt: prompt.javascript,
    },
    {
      code: "php",
      label: "PHP",
      Icon: PhpIcon,
      prompt: prompt.php,
    },
    {
      code: "ruby",
      label: "Ruby",
      Icon: RubyIcon,
      prompt: prompt.ruby,
    },
    {
      code: "java",
      label: "Java",
      Icon: JavaIcon,
      prompt: prompt.java,
    },
    {
      code: "lovable",
      label: "Lovable",
      Icon: LovableIcon,
      prompt: prompt.lovable,
    },
  ];