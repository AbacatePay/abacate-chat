import ButtonsLanguageSelect from "@/app/components/stackSelector/ButtonsLanguageSelect";
import { useRef, useEffect } from "react";
import { InitialChat } from "./InitialChat";
import { useChat } from "../hooks/use-chat";
import { ChatMessage } from "./ChatMessage";
import MainInput, { MainInputRef } from "@/app/components/MainInput";
import VideoCarousel from "./VideoCarousel";


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
  const initialChatInputRef = useRef<MainInputRef>(null);
  const mainInputRef = useRef<MainInputRef>(null);

  const handleLanguageSelect = (selectedPrompt: string) => {
    setInputValue(selectedPrompt);
    
    if (isFirstMessage) {
      initialChatInputRef.current?.focus();
    } else {
      mainInputRef.current?.focus();
    }
  };

  useEffect(() => {
    if (initialQuery) {
      setInputValue(initialQuery);
    }
  }, [initialQuery, setInputValue]);


  const firstMessageComponent = () => {
    return (
      <div className="flex flex-col h-full overflow-y-auto overflow-x-hidden invisible-scrollbar">
        <div className="md:min-h-[75vh] min-h-[70vh] flex flex-col gap-8 items-center justify-center ">
          <InitialChat
          ref={initialChatInputRef}
            value={inputValue}
            onChange={setInputValue}
            onSubmit={sendMessage}
            isLoading={false}
            initialValue={initialQuery} 
          />
          <ButtonsLanguageSelect onSelect={handleLanguageSelect} />
        </div>
        <div className="flex flex-col items-center justify-center">
          <VideoCarousel />
        </div>
      </div>
    );
  };

  const existingMessagesComponent = () => {
    return (
      <div className="flex flex-col h-full relative items-center justify-center ">
        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden w-full max-w-3xl">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="relative z-10 h-35 p-2 w-full max-w-3xl">
          <MainInput
            ref={mainInputRef}
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
