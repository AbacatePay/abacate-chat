import { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ChatMessage as ChatMessageType,
  StreamChunk,
  chatApiService,
} from "@/app/services/chatApi";
import { useToast } from "@/app/hooks/use-toast";

interface UseChatOptions {
  initialQuery?: string;
}

export const useChat = (options?: UseChatOptions) => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentThreadId, setCurrentThreadId] = useState<string | null>(null);
  const [promptText, setPromptText] = useState<string>("");
  const [isFirstMessage, setIsFirstMessage] = useState(true);

  const cleanupRef = useRef<(() => void) | null>(null);
  const { toast } = useToast();
  const router = useRouter();


  const handleChunk = useCallback((chunk: StreamChunk) => {
    if (chunk.type === "threadId" && chunk.threadId) {
      setCurrentThreadId(chunk.threadId);
    } else if (chunk.type === "content" && chunk.content) {
      setMessages((prev) => {
        const lastMessage = { ...prev[prev.length - 1] };
        lastMessage.content += chunk.content;
        return [...prev.slice(0, -1), lastMessage];
      });
    }
  }, []);

  const sendMessage = async (message: string) => {
    if (!message.trim() || isLoading) return;

    if (isFirstMessage) {
      setIsFirstMessage(false);
    }

    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      content: message.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    const botMessage: ChatMessageType = {
      id: (Date.now() + 1).toString(),
      content: "",
      sender: "bot",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInputValue("");
    router.replace("/");
    setIsLoading(true);

    try {
      const cleanup = await chatApiService.sendMessageStream(
        currentThreadId!,
        userMessage.content,
        handleChunk,
        () => {
          setIsLoading(false);
        }
      );

      cleanupRef.current = cleanup;
    } catch (error) {
      console.error("Error sending message:", error);

      setMessages((prev) => {
        const errorMessage: ChatMessageType = {
          id: (Date.now() + 1).toString(),
          content:
            "Sorry, I encountered an error while processing your request. Please try again.",
          sender: "bot",
          timestamp: new Date(),
        };
        return [...prev.slice(0, -1), errorMessage];
      });

      setIsLoading(false);

      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const fetchPromptText = async () => {
      try {
        const response = await fetch("/lovable.txt");
        const text = await response.text();
        setPromptText(text);
      } catch (error) {
        console.error("Failed to fetch prompt:", error);
        setPromptText("Error loading prompt");
      }
    };

    fetchPromptText();
  }, []);

  const updateUrlWithQuery = useCallback((query: string) => {
    if (query.trim()) {
      const encodedQuery = encodeURIComponent(query);
      router.replace(`/?query=${encodedQuery}`);
    } else {
      router.replace("/");
    }
  }, [router]);

  const setInputValueWithUrl = useCallback((value: string) => {
    setInputValue(value);
    updateUrlWithQuery(value);
  }, [updateUrlWithQuery]);

  useEffect(() => {
    if (options?.initialQuery && options.initialQuery.trim() && isFirstMessage) {
      setInputValueWithUrl(options.initialQuery);
    }
  }, [options?.initialQuery, isFirstMessage, setInputValueWithUrl]);

  useEffect(() => {
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, []);

  return {
    messages,
    inputValue,
    setInputValue: setInputValueWithUrl,
    isLoading,
    promptText,
    isFirstMessage,
    sendMessage,
  };
};
