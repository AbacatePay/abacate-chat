import ButtonsLanguageSelect from "@/app/components/ButtonsLanguageSelect";
import { useRef, useState } from "react";
import { InitialChat } from "./InitialChat";
import { useChat } from "../hooks/use-chat";
import { ChatMessage } from "./ChatMessage";
import MainInput from "@/app/components/MainInput";
import { Button } from "./ui/button";
import { Check, Copy } from "lucide-react";

interface ChatInterfaceV2Props {
  initialQuery?: string;
}

export function ChatInterfaceV2({ initialQuery }: ChatInterfaceV2Props) {
  const {
    messages,
    inputValue,
    setInputValue,
    isLoading,
    promptText,
    isFirstMessage,
    sendMessage,  
  } = useChat({ initialQuery });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [isCopied, setIsCopied] = useState(false);

  const handleLanguageSelect = (selectedPrompt: string) => {
    setInputValue(selectedPrompt);
  };

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(promptText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const lovablePrompt = () => {
    if (isFirstMessage) {
      return (
        <div className="flex items-center px-2 py-1 border rainbow-border rounded-lg bg-white">
          <p className="flex-1 text-sm">
            Quer integrar a Abacate usando Lovable? Preparamos um prompt para
            você
          </p>
          <Button
            size="sm"
            variant="outline"
            className="ml-4 cursor-pointer"
            onClick={handleCopyPrompt}
          >
            {isCopied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      );
    }

    return null;
  };

  const firstMessageComponent = () => {
    return (
      <div className="flex flex-col flex-1 gap-5 items-center justify-center">
        <InitialChat
          value={inputValue}
          onChange={setInputValue}
          onSubmit={sendMessage}
          isLoading={false}
          initialValue={initialQuery} 
        />
        <ButtonsLanguageSelect onSelect={handleLanguageSelect} />
        {lovablePrompt()}
      </div>
    );
  };

  const existingMessagesComponent = () => {
    return (
      <div className="flex flex-col h-full relative">
        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="relative z-10 h-35">
          <MainInput
            value={inputValue}
            onChange={setInputValue}
            onSubmit={sendMessage}
            isLoading={isLoading}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col flex-1 w-full h-full">
      {isFirstMessage ? firstMessageComponent() : existingMessagesComponent()}
    </div>
  );
}
