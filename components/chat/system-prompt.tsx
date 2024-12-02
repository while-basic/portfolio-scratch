'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Settings2 } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet"

interface SystemPromptProps {
  value?: string
  onChange?: (value: string) => void
}

export function SystemPrompt({ value = '', onChange }: SystemPromptProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [localValue, setLocalValue] = useState(value)

  useEffect(() => {
    // Load from localStorage on mount
    const savedPrompt = localStorage.getItem('systemPrompt')
    if (savedPrompt) {
      setLocalValue(savedPrompt)
      onChange?.(savedPrompt)
    }
  }, [onChange])

  useEffect(() => {
    if (value) {
      onChange?.(value)
    }
  }, [value, onChange])

  useEffect(() => {
    // Update local value when prop value changes
    setLocalValue(value)
  }, [value])

  const handleSave = () => {
    onChange?.(localValue)
    localStorage.setItem('systemPrompt', localValue)
    setIsOpen(false)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-gray-400 hover:text-white"
        >
          <Settings2 className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] bg-gray-900 border-gray-800">
        <SheetHeader>
          <SheetTitle className="text-white">System Prompt</SheetTitle>
          <SheetDescription className="text-gray-400">
            Set a system prompt to control how the AI assistant behaves and responds.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6">
          <Textarea
            value={localValue}
            onChange={(e) => setLocalValue(e.target.value)}
            placeholder="You are a helpful AI assistant..."
            className="h-[300px] bg-black border-gray-800 text-white resize-none"
          />
          <p className="text-sm text-muted-foreground">
            Don&apos;t know what to write? Here&apos;s a good default:
          </p>
          <div className="mt-2 text-xs text-gray-400">
            The system prompt helps define the AI&apos;s behavior, knowledge, and tone.
          </div>
        </div>
        <SheetFooter className="mt-4">
          <Button 
            onClick={handleSave}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Save Changes
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
