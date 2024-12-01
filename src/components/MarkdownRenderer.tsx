/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from '@/lib/utils'
import React, { FC } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodeProps {
  node?: any
  inline?: any
  className?: any
  children?: any
}

type CodeComponentProps = Omit<CodeProps, 'style'>

const MarkdownRenderer: FC<{ content: string; className?: string }> = ({ content, className }) => {
  return (
    <div
      className={cn('prose max-w-full dark:prose-invert sm:prose-xl sm:max-w-[1280px]', className)}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ className, children, ...props }: CodeComponentProps) {
            const match = /language-(\w+)/.exec(className || '')
            return match ? (
              <SyntaxHighlighter language={match[1]} PreTag="div" {...props} style={oneDark}>
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

export default MarkdownRenderer
