import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeBlock from "./CodeBlock";

type Props = {
  content: string;
};

function extractCode(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) {
    return children.map((child) => extractCode(child)).join("");
  }
  if (
    children &&
    typeof children === "object" &&
    "props" in children &&
    children.props
  ) {
    return extractCode(
      (children as { props: { children?: React.ReactNode } }).props.children
    );
  }
  return String(children ?? "");
}

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
          pre: ({ children }) => <>{children}</>,
          code: ({ className, children }) => {
            const match = /language-(\w+)/.exec(className ?? "");
            const code = extractCode(children).replace(/\n$/, "");

            if (match || (code.includes("\n") && className)) {
              return (
                <CodeBlock
                  language={match?.[1] ?? "javascript"}
                  code={code}
                />
              );
            }

            if (code.includes("\n")) {
              return <CodeBlock language="javascript" code={code} />;
            }

            return (
              <code className="border border-foreground bg-card px-1.5 py-0.5 font-mono text-[13px]">
                {children}
              </code>
            );
          },
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
