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
        "group relative mb-4 flex items-start md:-ml-12",
        message.role === "assistant" && "justify-end"
      )}
    >
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow",
          message.role === "assistant"
            ? "bg-primary text-primary-foreground"
            : "bg-background"
        )}
      >
        {message.role === "assistant" ? <BotIcon /> : <IconUser />}
      </div>
      <Card className={cn("ml-4 max-w-2xl text-sm", isLoading && "opacity-50")}>
        <div className="prose dark:prose-invert max-w-none">
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>
      </Card>
    </div>
  );
}
