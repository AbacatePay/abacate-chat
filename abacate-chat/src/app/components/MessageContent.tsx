import { useMarkdown } from "@/app/hooks/use-markdown";
import { Check, Copy, Loader2 } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MessageContentProps {
  content: string | null;
}

const CopyablePre = (props: any) => {
  const [isCopied, setIsCopied] = useState(false);

   const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(props.children.props.children);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <pre {...props} />
      <button
        onClick={handleCopy}
        aria-label={isCopied ? 'Copiado' : 'Copiar código'}
        type="button"
        role="button"
        className="text-sm z-10 absolute top-2 right-2 rounded-sm flex text-black items-center justify-center gap-2 px-2  hover:cursor-pointer bg-white hover:bg-gray-100"
      >
        {isCopied ? <Check width={16} height={16}/> : <Copy width={16} height={16}/>}
        <span>{isCopied ? 'Copiado' : 'Copiar'}</span>
      </button>
    </div>
  );
};

export const MessageContent = ({ content }: MessageContentProps) => {
  const { components } = useMarkdown();

  if (!content) {
    return <Loader2 className="animate-spin" />;
  }

  return (
    <div className="text-sm font-normal space-y-2 break-words overflow-hidden">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
        ...components,
        pre: CopyablePre,
      }}>
        {content}
      </ReactMarkdown>
    </div>
  );
};
