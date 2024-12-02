import { cn } from '@/lib/utils'
import { MarkdownRenderer } from '@/components/ui/markdown-renderer'

interface MarkdownMessageProps {
  content: string
  className?: string
}

export function MarkdownMessage({ content, className }: MarkdownMessageProps) {
  return (
    <div className={cn("min-w-0 space-y-2", className)}>
      <MarkdownRenderer>{content}</MarkdownRenderer>
    </div>
  )
}
// import ReactMarkdown from 'react-markdown'
// import remarkGfm from 'remark-gfm'
// import rehypeRaw from 'rehype-raw'
// import { cn } from '@/lib/utils'
// import { Highlight, themes } from 'prism-react-renderer'

// interface MarkdownMessageProps {
//   content: string
//   className?: string
// }

// export function MarkdownMessage({ content, className }: MarkdownMessageProps) {
//   return (
//     <ReactMarkdown
//       className={cn(
//         'prose prose-sm dark:prose-invert max-w-none',
//         'prose-pre:bg-[#1c1c1c] prose-pre:border prose-pre:border-zinc-800 prose-pre:rounded-lg',
//         'prose-code:text-[#9CDCFE] prose-code:bg-[#1c1c1c] prose-code:px-1 prose-code:py-0.5 prose-code:rounded',
//         'prose-a:text-violet-400 prose-a:no-underline hover:prose-a:underline',
//         'prose-headings:text-white prose-strong:text-white',
//         'prose-ul:my-2 prose-li:my-0 prose-p:my-2 prose-pre:my-2',
//         'prose-h1:text-3xl prose-h1:font-semibold prose-h2:text-2xl prose-h2:font-semibold',
//         className
//       )}
//       remarkPlugins={[remarkGfm]}
//       rehypePlugins={[rehypeRaw]}
//       components={{
//         code({ node, inline, className, children, ...props }) {
//           const match = /language-(\w+)/.exec(className || '')
//           const language = match ? match[1] : ''
          
//           if (inline) {
//             return (
//               <code className={cn("bg-[#1c1c1c] text-[#9CDCFE] px-1 py-0.5 rounded", className)} {...props}>
//                 {children}
//               </code>
//             )
//           }

//           return (
//             <div className="relative group">
//               {language && (
//                 <div className="absolute right-4 top-4 text-xs text-gray-400 font-mono">
//                   {language}
//                 </div>
//               )}
//               <Highlight
//                 theme={themes.nightOwl}
//                 code={String(children).replace(/\n$/, '')}
//                 language={language || 'text'}
//               >
//                 {({ className: highlightClassName, style, tokens, getLineProps, getTokenProps }) => (
//                   <pre
//                     className={cn(
//                       "bg-[#1c1c1c] rounded-lg border border-zinc-800 p-4 overflow-x-auto",
//                       highlightClassName
//                     )}
//                     style={style}
//                   >
//                     {tokens.map((line, i) => (
//                       <div key={i} {...getLineProps({ line })}>
//                         {line.map((token, key) => (
//                           <span key={key} {...getTokenProps({ token })} />
//                         ))}
//                       </div>
//                     ))}
//                   </pre>
//                 )}
//               </Highlight>
//             </div>
//           )
//         }
//       }}
//     >
//       {content}
//     </ReactMarkdown>
//   )
// }
