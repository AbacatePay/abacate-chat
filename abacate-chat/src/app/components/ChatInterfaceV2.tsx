import ButtonsLanguageSelect from "@/app/components/stackSelector/ButtonsLanguageSelect";
import { useRef, useEffect } from "react";
import { InitialChat } from "./InitialChat";
import { useChat } from "../hooks/use-chat";
import { ChatMessage } from "./ChatMessage";
import MainInput from "@/app/components/MainInput";


export function ChatInterfaceV2({ initialQuery }: { initialQuery: string }) {
  const {
    messages,
    inputValue,
    setInputValue,
    isLoading,
    isFirstMessage,
    sendMessage,  
  } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleLanguageSelect = (selectedPrompt: string) => {
    setInputValue(selectedPrompt);
  };

  useEffect(() => {
    if (initialQuery) {
      setInputValue(initialQuery);
    }
  }, [initialQuery, setInputValue]);


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
