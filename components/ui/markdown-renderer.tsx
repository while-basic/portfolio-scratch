'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { cn } from "@/lib/utils"
import { CodeBlock } from './syntax-highlighter'
import type { Components } from 'react-markdown'

interface MarkdownRendererProps {
  children: string
  className?: string
}

const components: Partial<Components> = {
  code: ({ children, className, ...props }) => {
    const match = /language-(\w+)/.exec(className || '')
    const language = match ? match[1] : 'text'
    const isInline = !match

    if (isInline) {
      return (
        <code className="rounded-md bg-zinc-100 px-1.5 py-0.5 font-mono text-violet-500 dark:bg-zinc-800 dark:text-violet-400" {...props}>
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
        // Headings
        "prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:font-normal lg:prose-headings:scroll-mt-[8.5rem]",
        // Lead
        "prose-lead:text-zinc-500 dark:prose-lead:text-zinc-400",
        // Links
        "prose-a:font-medium prose-a:text-violet-500 prose-a:no-underline hover:prose-a:text-violet-600 dark:hover:prose-a:text-violet-400",
        // Link Underline
        "prose-a:transition-all prose-a:border-b prose-a:border-violet-500/0 hover:prose-a:border-violet-500/40",
        // Pre
        "prose-pre:my-0 prose-pre:bg-transparent prose-pre:p-0",
        // Code
        "[&>pre]:my-6 [&>pre]:rounded-lg [&>pre]:bg-transparent",
        // Hr
        "prose-hr:border-zinc-100 dark:prose-hr:border-zinc-800",
        // Strong
        "prose-strong:font-medium prose-strong:text-zinc-900 dark:prose-strong:text-zinc-200",
        // Blockquote
        "prose-blockquote:border-l-2 prose-blockquote:border-zinc-100 prose-blockquote:pl-4 prose-blockquote:italic dark:prose-blockquote:border-zinc-800",
        // List
        "prose-li:my-0 prose-li:marker:text-zinc-400 dark:prose-li:marker:text-zinc-600",
        // Table
        "prose-table:mt-8 prose-thead:border-b prose-thead:border-zinc-100 prose-thead:bg-zinc-50 prose-tr:border-b prose-tr:border-zinc-100 prose-th:py-3 prose-th:px-4 prose-th:text-left prose-th:font-medium dark:prose-thead:border-zinc-800 dark:prose-thead:bg-zinc-900 dark:prose-tr:border-zinc-800 dark:prose-th:text-zinc-100",
        // Table Cell
        "prose-td:py-3 prose-td:px-4",
        className
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={components}
      >
        {children}
      </ReactMarkdown>
    </article>
  )
}
