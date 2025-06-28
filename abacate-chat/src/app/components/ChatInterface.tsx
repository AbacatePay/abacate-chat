"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, Copy, Check } from "lucide-react";
import { ChatMessage } from "./ChatMessage";
import { Textarea } from "./ui/textarea";
import { useChat } from "../hooks/use-chat";
import { Button } from "./ui/button";

export const ChatInterface = () => {
  const {
    messages,
    inputValue,
    setInputValue,
    isLoading,
    promptText,
    isFirstMessage,
    sendMessage,
  } = useChat();

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isCopied, setIsCopied] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll on new messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    handleTextBoxResize();
  };

  const handleTextBoxResize = () => {
    if (textareaRef.current) {
      const scrollPos = textareaRef.current.scrollTop;
      textareaRef.current.style.height = "40px";
      const newHeight = Math.min(textareaRef.current.scrollHeight, 250);
      textareaRef.current.style.height = `${newHeight}px`;
      textareaRef.current.scrollTop = scrollPos;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
      if (textareaRef.current) {
        textareaRef.current.style.height = "40px";
      }
    }
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

  const messageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden">
        <div className="space-y-1">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} /> {/* Scroll anchor */}
        </div>
      </div>

      <div className="bg-card p-4 space-y-4">
        <AnimatePresence>
          {isFirstMessage && (
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="flex items-center px-2 py-1 border rainbow-border rounded-lg bg-white"
            >
              <p className="flex-1 text-sm">
                Quer integrar a Abacate usando Lovable? Preparamos um prompt
                para você
              </p>
              <Button
                size="sm"
                variant="outline"
                className="ml-4"
                onClick={handleCopyPrompt}
              >
                {isCopied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-2">
          <Textarea
            ref={textareaRef}
            value={inputValue}
            onChange={handleTextareaChange}
            placeholder="Quero integrar a AbacatePay com..."
            disabled={isLoading}
            rows={1}
            className="flex-1 min-h-[40px] max-h-[250px] chat-input-bg focus:ring-primary resize-none [overflow-y:hidden] [&::-webkit-scrollbar]:hidden"
            style={{
              overflowY:
                textareaRef.current?.scrollHeight ?? 0 > 250
                  ? "auto"
                  : "hidden",
            }}
            onKeyDown={handleKeyPress}
          />
          <Button
            onClick={() => {
              sendMessage(inputValue);
              if (textareaRef.current) {
                textareaRef.current.style.height = "40px";
              }
            }}
            disabled={isLoading || !inputValue.trim()}
            size="icon"
            className="bg-abacate-500 hover:opacity-70 transition-colors"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
