"use client";

import { cn } from "@/lib/utils";
import { Message } from "ai";
import { IconUser } from "./icons";
import { BotIcon } from "lucide-react";
import { Card } from "./ui/card";
import ReactMarkdown from "react-markdown";

export function ChatMessage({
  message,
  isLoading,
}: {
  message: Message;
  isLoading?: boolean;
}) {
  return (
    <div
      className={cn(
        "group relative mb-4 flex items-start",
        message.role === "assistant" ? "flex-row" : "flex-row-reverse"
      )}
    >
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full border shadow-sm",
          message.role === "assistant"
            ? "bg-primary text-primary-foreground"
            : "bg-background"
        )}
      >
        {message.role === "assistant" ? <BotIcon className="h-5 w-5" /> : <IconUser className="h-5 w-5" />}
      </div>
      <Card className={cn(
        "mx-2 max-w-2xl text-sm px-4 py-2",
        message.role === "assistant" ? "ml-2 mr-8" : "ml-8 mr-2",
        isLoading && "opacity-50"
      )}>
        <div className="prose dark:prose-invert prose-sm max-w-none">
          <ReactMarkdown
            components={{
              p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      </Card>
    </div>
  );
}
