import { portfolio } from "@/data/portfolio";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

function toWhatsAppUrl(phone: string) {
  const digits = phone.replace(/\D/g, "");
  const intl = digits.startsWith("880")
    ? digits
    : digits.startsWith("0")
      ? `880${digits.slice(1)}`
      : `880${digits}`;

  return `https://wa.me/${intl}`;
}

export default function FloatingWhatsApp() {
  const href = toWhatsAppUrl(portfolio.phone);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat on WhatsApp: ${portfolio.phone}`}
      className="group fixed z-50 inline-flex h-10 w-10 items-center justify-center border-2 border-foreground bg-[#25D366] text-white brutal-shadow-sm transition-[transform,box-shadow] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none bottom-[calc(var(--mobile-dock-height)+env(safe-area-inset-bottom,0px)+0.75rem)] right-3 lg:bottom-6 lg:right-6 lg:h-14 lg:w-14 lg:border-[3px] lg:brutal-shadow"
    >
      <WhatsAppIcon className="h-5 w-5 lg:h-7 lg:w-7" />

      <span
        aria-hidden
        className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap border-2 border-foreground bg-background px-2.5 py-1.5 font-mono text-[10px] tracking-widest uppercase text-foreground shadow-[4px_4px_0_0_var(--foreground)] group-hover:flex group-focus-visible:flex"
      >
        WhatsApp
      </span>
    </a>
  );
}
