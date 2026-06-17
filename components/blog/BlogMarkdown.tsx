import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
  content: string;
};

export default function BlogMarkdown({ content }: Props) {
  return (
    <div className="blog-markdown text-[15px] leading-relaxed">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="mt-8 mb-4 text-3xl font-black tracking-tight first:mt-0">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="mt-8 mb-3 text-2xl font-black tracking-tight first:mt-0">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-6 mb-2 text-xl font-bold tracking-tight first:mt-0">
              {children}
            </h3>
          ),
          p: ({ children }) => <p className="mt-4 first:mt-0">{children}</p>,
          a: ({ href, children }) => (
            <a
              href={href}
              className="font-medium text-accent underline underline-offset-2 hover:text-foreground"
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {children}
            </a>
          ),
          ul: ({ children }) => (
            <ul className="mt-4 list-disc space-y-2 pl-5 first:mt-0">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="mt-4 list-decimal space-y-2 pl-5 first:mt-0">{children}</ol>
          ),
          li: ({ children }) => <li>{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="mt-4 border-l-4 border-accent bg-card px-4 py-3 first:mt-0">
              {children}
            </blockquote>
          ),
          code: ({ className, children }) => {
            const isBlock = className?.includes("language-");
            if (isBlock) {
              return (
                <code className="block overflow-x-auto border-2 border-foreground bg-foreground px-4 py-3 font-mono text-[13px] text-background">
                  {children}
                </code>
              );
            }
            return (
              <code className="border border-foreground bg-card px-1.5 py-0.5 font-mono text-[13px]">
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="mt-4 overflow-x-auto first:mt-0">{children}</pre>
          ),
          hr: () => <hr className="my-8 border-t-2 border-foreground" />,
          strong: ({ children }) => (
            <strong className="font-bold">{children}</strong>
          ),
          em: ({ children }) => <em className="italic">{children}</em>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
