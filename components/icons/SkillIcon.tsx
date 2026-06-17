import type { ComponentType, SVGProps } from "react";
import type { IconType } from "react-icons";
import {
  SiJavascript,
  SiPython,
  SiCplusplus,
  SiPostgresql,
  SiSupabase,
  SiMongodb,
  SiRedis,
  SiNodedotjs,
  SiExpress,
  SiHono,
  SiNextdotjs,
  SiDjango,
  SiFastapi,
  SiDocker,
  SiGithubactions,
  SiOpentelemetry,
  SiPrometheus,
  SiGrafana,
  SiRabbitmq,
  SiHtml5,
  SiCss,
  SiAxios,
  SiReactquery,
  SiGit,
  SiGithub,
  SiTrello,
  SiNotion,
  SiRender,
  SiClerk,
  SiVercel,
  SiLinux,
  SiCanva,
  SiGoogledocs,
  SiGooglesheets,
  SiTurborepo,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import {
  Server,
  LayoutGrid,
  Sparkles,
  Briefcase,
  FileSpreadsheet,
  Database,
  ListTree,
  Code2,
  Layers,
  Boxes,
  Network,
  Puzzle,
} from "lucide-react";

type LucideIcon = ComponentType<{ className?: string; strokeWidth?: number }>;
type SkillIconComponent = IconType | LucideIcon;

function NeonIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M12 2 4 6.5v11L12 22l8-4.5v-11L12 2Zm0 2.18 5.82 3.26v6.52L12 17.22l-5.82-3.26V7.44 12 4.18Z" />
    </svg>
  );
}

const SKILL_RULES: Array<{ test: (skill: string) => boolean; icon: SkillIconComponent }> = [
  { test: (s) => /javascript/i.test(s), icon: SiJavascript },
  { test: (s) => /^python$/i.test(s.trim()), icon: SiPython },
  { test: (s) => /c\/c\+\+|cplusplus/i.test(s), icon: SiCplusplus },
  { test: (s) => /^sql$/i.test(s.trim()), icon: SiPostgresql },
  { test: (s) => /node\.?js/i.test(s), icon: SiNodedotjs },
  { test: (s) => /express/i.test(s), icon: SiExpress },
  { test: (s) => /hono/i.test(s), icon: SiHono },
  { test: (s) => /next\.?js/i.test(s), icon: SiNextdotjs },
  { test: (s) => /django/i.test(s), icon: SiDjango },
  { test: (s) => /fastapi/i.test(s), icon: SiFastapi },
  { test: (s) => /turborepo/i.test(s), icon: SiTurborepo },
  { test: (s) => /monorepo/i.test(s), icon: Boxes },
  { test: (s) => /microservice/i.test(s), icon: Network },
  { test: (s) => /modular/i.test(s), icon: Puzzle },
  { test: (s) => /postgresql|postgres/i.test(s), icon: SiPostgresql },
  { test: (s) => /supabase/i.test(s), icon: SiSupabase },
  { test: (s) => /\bneon\b/i.test(s), icon: NeonIcon },
  { test: (s) => /mongodb|mongo/i.test(s), icon: SiMongodb },
  { test: (s) => /redis/i.test(s), icon: SiRedis },
  { test: (s) => /docker/i.test(s), icon: SiDocker },
  { test: (s) => /github actions/i.test(s), icon: SiGithubactions },
  { test: (s) => /\baws\b/i.test(s), icon: FaAws },
  { test: (s) => /\bvps\b/i.test(s), icon: Server },
  { test: (s) => /opentelemetry/i.test(s), icon: SiOpentelemetry },
  { test: (s) => /prometheus/i.test(s), icon: SiPrometheus },
  { test: (s) => /grafana/i.test(s), icon: SiGrafana },
  { test: (s) => /loki/i.test(s), icon: SiGrafana },
  { test: (s) => /rabbitmq/i.test(s), icon: SiRabbitmq },
  { test: (s) => /bullmq/i.test(s), icon: ListTree },
  { test: (s) => /^html$/i.test(s.trim()), icon: SiHtml5 },
  { test: (s) => /^css$/i.test(s.trim()), icon: SiCss },
  { test: (s) => /component library/i.test(s), icon: LayoutGrid },
  { test: (s) => /axios/i.test(s), icon: SiAxios },
  { test: (s) => /tanstack/i.test(s), icon: SiReactquery },
  { test: (s) => /^git$/i.test(s.trim()), icon: SiGit },
  { test: (s) => /github/i.test(s), icon: SiGithub },
  { test: (s) => /trello/i.test(s), icon: SiTrello },
  { test: (s) => /notion/i.test(s), icon: SiNotion },
  { test: (s) => /render/i.test(s), icon: SiRender },
  { test: (s) => /clerk/i.test(s), icon: SiClerk },
  { test: (s) => /vercel/i.test(s), icon: SiVercel },
  { test: (s) => /linux/i.test(s), icon: SiLinux },
  { test: (s) => /prompt engineering/i.test(s), icon: Sparkles },
  { test: (s) => /product management/i.test(s), icon: Briefcase },
  { test: (s) => /ms office|microsoft office/i.test(s), icon: FileSpreadsheet },
  { test: (s) => /canva/i.test(s), icon: SiCanva },
  { test: (s) => /google docs/i.test(s), icon: SiGoogledocs },
  { test: (s) => /google sheets/i.test(s), icon: SiGooglesheets },
];

const CATEGORY_ICONS: Record<string, SkillIconComponent> = {
  Programming: Code2,
  Backend: SiNodedotjs,
  Architecture: Layers,
  "Database & Caching": SiPostgresql,
  "DevOps & Infrastructure": SiDocker,
  Observability: SiOpentelemetry,
  "Messaging & Queues": SiRabbitmq,
  Frontend: SiHtml5,
  Tools: SiGit,
  Others: SiLinux,
};

const LUCIDE_ICONS = new Set<LucideIcon>([
  Server,
  LayoutGrid,
  Sparkles,
  Briefcase,
  FileSpreadsheet,
  Database,
  ListTree,
  Code2,
  Layers,
  Boxes,
  Network,
  Puzzle,
]);

function isLucideIcon(icon: SkillIconComponent): icon is LucideIcon {
  return LUCIDE_ICONS.has(icon as LucideIcon);
}

export function getSkillIcon(skill: string): SkillIconComponent {
  return SKILL_RULES.find((rule) => rule.test(skill))?.icon ?? Database;
}

export function getCategoryIcon(category: string): SkillIconComponent {
  return CATEGORY_ICONS[category] ?? Database;
}

type IconProps = {
  icon: SkillIconComponent;
  className?: string;
};

export function SkillGlyph({ icon, className = "h-5 w-5 shrink-0" }: IconProps) {
  if (isLucideIcon(icon)) {
    const Lucide = icon;
    return <Lucide className={className} strokeWidth={2.25} aria-hidden />;
  }

  const Icon = icon as ComponentType<{ className?: string }>;
  return <Icon className={className} aria-hidden />;
}

export function SkillIcon({
  skill,
  className = "h-5 w-5 shrink-0",
}: {
  skill: string;
  className?: string;
}) {
  return <SkillGlyph icon={getSkillIcon(skill)} className={className} />;
}

export function CategoryIcon({
  category,
  className = "h-4 w-4 shrink-0",
}: {
  category: string;
  className?: string;
}) {
  return <SkillGlyph icon={getCategoryIcon(category)} className={className} />;
}
