"use client";

import { useChat } from "ai/react";
import { ChatInput } from "./chat-input";
import { ChatMessage } from "./chat-message";
import { ScrollArea } from "./ui/scroll-area";
import { useEffect, useRef } from "react";
import { Message } from "ai";

export function Chat() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
  } = useChat({
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content: "Hi! I'm Chris's AI assistant. How can I help you today?",
      } as Message,
    ],
  });

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex h-[600px] flex-col space-y-4">
      <ScrollArea
        ref={scrollAreaRef}
        className="flex-1 pr-4"
      >
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            isLoading={isLoading}
          />
        ))}
      </ScrollArea>

      {error && (
        <div className="text-red-500 text-sm">
          Error: {error.message}
        </div>
      )}

      <div className="p-4">
        <ChatInput
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
