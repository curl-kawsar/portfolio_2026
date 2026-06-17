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
      className="group fixed bottom-20 right-4 z-50 inline-flex h-14 w-14 items-center justify-center border-[3px] border-foreground bg-[#25D366] text-white brutal-shadow transition-[transform,box-shadow] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none lg:bottom-6 lg:right-6"
    >
      <WhatsAppIcon className="h-7 w-7" />

      <span
        aria-hidden
        className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap border-2 border-foreground bg-background px-2.5 py-1.5 font-mono text-[10px] tracking-widest uppercase text-foreground shadow-[4px_4px_0_0_var(--foreground)] group-hover:flex group-focus-visible:flex"
      >
        WhatsApp
      </span>
    </a>
  );
}
