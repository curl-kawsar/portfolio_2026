"use client";

import type { CSSProperties } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

type Props = {
  code: string;
  language?: string;
};

const EDITOR_STYLE: CSSProperties = {
  margin: 0,
  padding: "1rem 1.1rem",
  background: "#0d1117",
  fontSize: "13px",
  lineHeight: "1.65",
  fontFamily: "var(--font-mono), ui-monospace, monospace",
};

const customTheme = {
  ...oneDark,
  'pre[class*="language-"]': {
    ...oneDark['pre[class*="language-"]'],
    background: "#0d1117",
    margin: 0,
  },
  'code[class*="language-"]': {
    ...oneDark['code[class*="language-"]'],
    background: "transparent",
    fontFamily: "inherit",
  },
};

function normalizeLanguage(language?: string) {
  const lang = (language ?? "text").toLowerCase();
  const aliases: Record<string, string> = {
    ts: "typescript",
    js: "javascript",
    jsx: "javascript",
    tsx: "tsx",
    sh: "bash",
    shell: "bash",
    yml: "yaml",
  };
  return aliases[lang] ?? lang;
}

export default function CodeBlock({ code, language }: Props) {
  const lang = normalizeLanguage(language);
  const label = lang === "text" ? "code" : lang;

  return (
    <figure className="code-editor mt-4 first:mt-0">
      <figcaption className="flex items-center justify-between border-[3px] border-b-0 border-foreground bg-foreground px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase text-background">
        <span className="inline-flex items-center gap-2">
          <span className="inline-flex gap-1" aria-hidden>
            <span className="h-2 w-2 border border-background bg-accent" />
            <span className="h-2 w-2 border border-background bg-background" />
            <span className="h-2 w-2 border border-background bg-muted" />
          </span>
          {label}
        </span>
        <span className="opacity-60">read-only</span>
      </figcaption>
      <div className="overflow-x-auto border-[3px] border-foreground bg-[#0d1117] brutal-shadow-sm">
        <SyntaxHighlighter
          language={lang}
          style={customTheme}
          customStyle={EDITOR_STYLE}
          showLineNumbers
          lineNumberStyle={{
            minWidth: "2.25rem",
            paddingRight: "1rem",
            color: "#6e7681",
            userSelect: "none",
          }}
          wrapLongLines={false}
        >
          {code.replace(/\n$/, "")}
        </SyntaxHighlighter>
      </div>
    </figure>
  );
}
