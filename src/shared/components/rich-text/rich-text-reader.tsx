import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';

type RichTextReaderProps = {
  value?: string | null;
  className?: string;
};

const markdownComponents: Components = {
  h1: ({ children }) => <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">{children}</h1>,
  h2: ({ children }) => <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">{children}</h2>,
  h3: ({ children }) => <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">{children}</h3>,
  p: ({ children }) => <p className="leading-7 [&:not(:first-child)]:mt-4">{children}</p>,
  ul: ({ children }) => <ul className="my-4 ml-6 list-disc">{children}</ul>,
  ol: ({ children }) => <ol className="my-4 ml-6 list-decimal">{children}</ol>,
  li: ({ children }) => <li className="mt-1">{children}</li>,
  blockquote: ({ children }) => <blockquote className="text-muted-foreground mt-4 border-l-2 pl-6 italic">{children}</blockquote>,
  code: ({ className, children, ...props }) => {
    const isBlock = Boolean(className?.startsWith('language-'));

    if (!isBlock) {
      return (
        <code className="bg-muted rounded px-1.5 py-0.5 font-mono text-sm" {...props}>
          {children}
        </code>
      );
    }

    return (
      <code className="bg-muted block overflow-x-auto rounded-lg p-4 font-mono text-sm" {...props}>
        {children}
      </code>
    );
  },
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noreferrer" className="text-primary font-medium underline underline-offset-4">
      {children}
    </a>
  ),
};

export default function RichTextReader({ value, className }: RichTextReaderProps) {
  if (!value) return null;

  return (
    <div className={className}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {value}
      </ReactMarkdown>
    </div>
  );
}
