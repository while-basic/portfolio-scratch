'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { cn } from "@/lib/utils"
import { CodeBlock } from './syntax-highlighter'
import type { Components } from 'react-markdown'

interface MarkdownRendererProps {
  children: string
  className?: string
}

const components: Partial<Components> = {
  // @ts-expect-error - Types from react-markdown are not fully compatible
  code: ({ className, children, ...props }: { className?: string; children: React.ReactNode; [key: string]: unknown }) => {
    const match = /language-(\w+)/.exec(className || '')
    const language = match ? match[1] : 'text'
    const isInline = !match

    if (isInline) {
      return (
        <code
          className={cn(
            "bg-muted text-primary px-1 py-0.5 rounded",
            className
          )}
          {...props}
        >
          {String(children)}
        </code>
      )
    }

    return <CodeBlock language={language}>{String(children)}</CodeBlock>
  }
}

export function MarkdownRenderer({ children, className }: MarkdownRendererProps) {
  return (
    <article
      className={cn(
        "prose dark:prose-invert max-w-none",
        "prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:rounded-lg",
        "prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded",
        "prose-a:text-primary hover:prose-a:underline",
        "prose-headings:text-foreground prose-strong:text-foreground",
        "prose-ul:my-2 prose-li:my-0 prose-p:my-2 prose-pre:my-2",
        "prose-h1:text-3xl prose-h1:font-semibold prose-h2:text-2xl prose-h2:font-semibold",
        className
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={components}
      >
        {children}
      </ReactMarkdown>
    </article>
  )
}
