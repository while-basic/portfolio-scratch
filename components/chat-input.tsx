"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendIcon } from "lucide-react";
import { useRef } from "react";

interface ChatInputProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

export function ChatInput({
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
}: ChatInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center space-x-2"
    >
      <Input
        ref={inputRef}
        value={input}
        onChange={handleInputChange}
        placeholder="Type your message..."
        className="flex-1"
        autoFocus
        disabled={isLoading}
      />
      <Button 
        type="submit"
        size="icon"
        disabled={isLoading || input.trim().length === 0}
      >
        <SendIcon className="h-4 w-4" />
        <span className="sr-only">Send message</span>
      </Button>
    </form>
  );
}
