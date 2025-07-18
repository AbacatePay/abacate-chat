import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import { User } from "lucide-react";
import { ChatMessage as ChatMessageType } from "@/app/services/chatApi";
import { ChatLogo } from "./ChatLogo";
import { MessageContent } from "./MessageContent";

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.sender === "user";

  return (
    <div
      className={`flex gap-3 p-4 space-y-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      <Avatar className="w-8 h-8 flex-shrink-0 bg-[var(--user-message)] ">
        <AvatarFallback className={isUser ? "bg-[var(--secondary)]" : "bg-[var(--bot-message)]"}>
          {isUser ? <User className="w-4 h-4 text-primary" /> : <ChatLogo />}
        </AvatarFallback>
      </Avatar>

      <div
        className={`flex flex-col max-w-[80%]  ${
          isUser ? "items-end" : "items-start"
        }`}
      >
        <div
          className={`p-4 rounded-2xl shadow-sm w-full  ${
            isUser
              ? "bg-[var(--secondary)] rounded-br-md dark-font-color"
              : "bg-[var(--bot-message)] shadow-md rounded-bl-md"
          }`}
        >
          <MessageContent content={message.content} />
        </div>

        <span className="text-xs text-muted-foreground mt-1 px-2">
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
};
