import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "li";
  delay?: number; // ms — ignored, kept for backwards-compat API
};

/**
 * Plain layout wrapper. Animations are disabled — content is always
 * rendered at full opacity with no transform. The `delay` prop is
 * accepted but ignored so existing call-sites don't need to change.
 */
export default function Reveal({
  children,
  className = "",
  as: Tag = "div",
}: Props) {
  return <Tag className={`reveal ${className}`.trim()}>{children}</Tag>;
}
