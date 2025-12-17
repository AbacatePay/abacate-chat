"use client";

import { X, MessageSquare, Send } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { ChatMessage } from "@/app/components/ChatMessage";
import { useRef, useEffect, useState } from "react";
import { InterfaceVideo } from "@/app/services/videos";
import { useChat } from "@/app/hooks/use-chat";

interface ChatSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    video: InterfaceVideo;
}

export function ChatSidebar({ isOpen, onClose }: ChatSidebarProps) {
    const {
        messages,
        inputValue,
        setInputValue,
        isLoading,
        sendMessage,
    } = useChat({ disableRedirect: true });

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [rows, setRows] = useState(1);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || isLoading) return;

        const messageText = inputValue.trim();
        setRows(1);
        await sendMessage(messageText);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(e.target.value);

        // Auto-resize textarea
        const lineHeight = 24;
        const maxRows = 5;
        const previousRows = e.target.rows;
        e.target.rows = 1;

        const currentRows = Math.floor(e.target.scrollHeight / lineHeight);
        const newRows = Math.min(currentRows, maxRows);

        if (newRows !== previousRows) {
            e.target.rows = newRows;
            setRows(newRows);
        }
    };

    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-[var(--background)] border-l border-border z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-border">
                    <div className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-primary" />
                        <h2 className="font-semibold text-foreground">Chat Rápido</h2>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        className="h-8 w-8"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[var(--background)]">
                    {messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center gap-4 px-4">
                            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-gradient-to-r from-[#9EEA6C] to-[#7FD857] hover:from-[#8FE05C] hover:to-[#6FC847] text-white shadow-lg hover:shadow-xl transition-all duration-300 font-semibold relative overflow-hidden before:absolute before:top-0 before:-left-full before:h-full before:w-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:transition-all before:duration-700 hover:before:left-full">
                                <MessageSquare className="h-8 w-8 text-white" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground mb-2">
                                    Tire suas dúvidas
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Faça perguntas sobre integração com AbacatePay e receba ajuda
                                    instantânea.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <>
                            {messages.map((message) => (
                                <ChatMessage key={message.id} message={message} />
                            ))}
                            <div ref={messagesEndRef} />
                        </>
                    )}
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-border">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                        <div className="relative flex items-end gap-2">
                            <textarea
                                ref={textareaRef}
                                value={inputValue}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                placeholder="Digite sua pergunta..."
                                rows={rows}
                                disabled={isLoading}
                                className="flex-1 resize-none rounded-lg border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-h-32"
                            />
                            <Button
                                type="submit"
                                size="icon"
                                disabled={!inputValue.trim() || isLoading}
                                className="h-10 w-10 shrink-0"
                            >
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Pressione Enter para enviar, Shift+Enter para nova linha
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}
