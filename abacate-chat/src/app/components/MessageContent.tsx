import { useMarkdown } from "@/app/hooks/use-markdown";
import { Check, Copy, Loader2 } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "./ui/button";

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
      <Button
        onClick={handleCopy}
        aria-label={isCopied ? 'Copiado' : 'Copiar código'}
        type="button"
        role="button"
        className="text-sm text-gray-100 z-10 absolute top-2 right-2 rounded-sm flex items-center justify-center gap-2 px-2 py-1 hover:cursor-pointer"
      >
        {isCopied ? <Check /> : <Copy />}
        <span>{isCopied ? 'Copiado' : 'Copiar'}</span>
      </Button>
    </div>
  );
};

export const MessageContent = ({ content }: MessageContentProps) => {
  const { components } = useMarkdown();

  if (!content) {
    return <Loader2 className="animate-spin" />;
  }

  return (
    <div className="text-sm font-normal leading-relaxed break-words overflow-hidden">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
        ...components,
        pre: CopyablePre,
      }}>
        {content}
      </ReactMarkdown>
    </div>
  );
};
