import { Fragment, type ReactNode } from "react";

const BOLD_PATTERN = /\*\*([^*]+)\*\*/g;

export function renderBoldText(text: string) {
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = BOLD_PATTERN.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(
        <Fragment key={key++}>{text.slice(lastIndex, match.index)}</Fragment>
      );
    }

    parts.push(
      <strong key={key++} className="font-bold text-foreground">
        {match[1]}
      </strong>
    );

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(<Fragment key={key++}>{text.slice(lastIndex)}</Fragment>);
  }

  return parts.length > 0 ? parts : text;
}
