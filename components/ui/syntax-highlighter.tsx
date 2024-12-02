'use client'

import { Highlight, themes } from 'prism-react-renderer'
import { cn } from '@/lib/utils'

interface CodeBlockProps {
  children: string
  language: string
  className?: string
}

export function CodeBlock({ children, language, className }: CodeBlockProps) {
  return (
    <Highlight
      theme={themes.oneDark}
      code={children.trim()}
      language={language}
    >
      {({ className: _className, style, tokens, getLineProps, getTokenProps }) => (
        <div className="relative">
          <div className="absolute right-4 top-3 text-xs font-medium text-zinc-400">
            {language}
          </div>
          <pre
            className={cn(
              "mb-4 mt-6 overflow-x-auto rounded-lg bg-zinc-900/75 py-4 px-4",
              className
            )}
            style={style}
          >
            <code className={_className}>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </code>
          </pre>
        </div>
      )}
    </Highlight>
  )
}
