import Link from "next/link";
import { site } from "@/lib/site";

const messages = [
  { label: "Designed for modern spaces", href: "/collections" },
  { label: "Pan-India delivery", href: "/shipping" },
  { label: "Business enquiries", href: "/contact#enquiry" },
];

/** The 34px announcement strip that sits above the main navbar. */
export function TopBar() {
  return (
    <div className="h-[34px] w-full bg-navy text-ivory">
      <div className="page-x flex h-full items-center justify-between gap-6 text-[11px] font-medium uppercase tracking-[0.18em]">
        <a
          href={site.phone.href}
          className="hidden text-ivory/70 transition-colors duration-300 hover:text-gold lg:block"
        >
          {site.phone.display}
        </a>

        {/* Desktop: all three messages side by side. */}
        <ul className="hidden items-center md:flex">
          {messages.map((message, index) => (
            <li key={message.label} className="flex items-center">
              {index > 0 ? <span aria-hidden className="mx-6 h-3 w-px bg-ivory/20" /> : null}
              <Link
                href={message.href}
                className="text-ivory/80 transition-colors duration-300 hover:text-gold"
              >
                {message.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile: one message at a time, cycling in place. */}
        <div className="relative h-4 flex-1 overflow-hidden md:hidden" aria-live="off">
          {messages.map((message, index) => (
            <span
              key={message.label}
              className="strip-item absolute inset-0 text-center text-ivory/80"
              style={{ animationDelay: `${index * 4}s` }}
            >
              {message.label}
            </span>
          ))}
        </div>

        <Link
          href="/contact"
          className="hidden text-ivory/70 transition-colors duration-300 hover:text-gold lg:block"
        >
          Contact us
        </Link>
      </div>
    </div>
  );
}
