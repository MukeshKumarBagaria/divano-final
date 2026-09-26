"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Heart, Plus, Search, ShoppingBag, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { TopBar } from "@/components/top-bar";
import { lockScroll } from "@/components/smooth-scroll";
import { site } from "@/lib/site";

type MenuLink = { label: string; note: string; href: string };
type Feature = { title: string; caption: string; image: string; href: string };
type Mega = {
  heading: string;
  blurb: string;
  links: MenuLink[];
  all: { label: string; href: string };
  features: Feature[];
};
type NavItem = { label: string; href: string; mega?: Mega };

const navItems: NavItem[] = [
  {
    label: "Ergonomic Chairs",
    href: "/ergonomic-chairs",
    mega: {
      heading: "Ergonomic chairs",
      blurb: "Five back heights, from hot desks to the boardroom.",
      links: [
        { label: "Low back chairs", note: "For dynamic workspaces", href: "/ergonomic-chairs/low-back-chairs" },
        { label: "Mid back chairs", note: "Balanced everyday support", href: "/ergonomic-chairs/mid-back-chairs" },
        { label: "High back chairs", note: "Executive comfort", href: "/ergonomic-chairs/high-back-chairs" },
        { label: "Cafeteria chairs", note: "Flexible social spaces", href: "/ergonomic-chairs/cafeteria-chairs" },
        { label: "Visitor chairs", note: "Welcoming every guest", href: "/ergonomic-chairs/visitor-chairs" },
      ],
      all: { label: "Explore all chairs", href: "/ergonomic-chairs" },
      features: [
        {
          title: "The home office",
          caption: "Task seating for long, focused days",
          image: "/images/cat-chairs.jpg",
          href: "/ergonomic-chairs",
        },
        {
          title: "High back",
          caption: "Leather and mesh for cabins",
          image: "/images/chair-high.jpg",
          href: "/ergonomic-chairs/high-back-chairs",
        },
        {
          title: "Mid back",
          caption: "The everyday essential",
          image: "/images/chair-mid.jpg",
          href: "/ergonomic-chairs/mid-back-chairs",
        },
      ],
    },
  },
  {
    label: "Sofas",
    href: "/sofas",
    mega: {
      heading: "Sofas",
      blurb: "Upholstered to order in the fabric, leather and finish you choose.",
      links: [
        { label: "1 seater", note: "Armchairs and accent seats", href: "/sofas#one-seater" },
        { label: "2 seater", note: "For compact rooms", href: "/sofas#two-seater" },
        { label: "3 seater", note: "The living-room centrepiece", href: "/sofas#three-seater" },
        { label: "Lounge", note: "Low, deep and unhurried", href: "/sofas#lounge" },
        { label: "Modular", note: "Grows with the room", href: "/sofas#modular" },
      ],
      all: { label: "Explore all sofas", href: "/sofas" },
      features: [
        {
          title: "Living rooms",
          caption: "Deep seats in natural linen",
          image: "/images/cat-sofas.jpg",
          href: "/sofas",
        },
        {
          title: "Modular",
          caption: "Curved sections, endless layouts",
          image: "/hero/hero-2.png",
          href: "/sofas#modular",
        },
        {
          title: "Lounge chairs",
          caption: "Bouclé, shaped by hand",
          image: "/hero/hero-1.png",
          href: "/sofas#lounge",
        },
      ],
    },
  },
  {
    label: "Phone Booths",
    href: "/phone-booths",
    mega: {
      heading: "Phone booths",
      blurb: "Acoustic rooms that bring quiet to open-plan floors.",
      links: [
        { label: "Solo booths", note: "Calls and focused work", href: "/phone-booths#solo" },
        { label: "Duo booths", note: "One-to-ones", href: "/phone-booths#duo" },
        { label: "Meeting pods", note: "Small team huddles", href: "/phone-booths#meeting" },
        { label: "Custom booths", note: "Sized and finished to your floor", href: "/phone-booths#custom" },
      ],
      all: { label: "Explore all phone booths", href: "/phone-booths" },
      features: [
        {
          title: "Focus booth",
          caption: "Warm light, total privacy",
          image: "/images/cat-booths.jpg",
          href: "/phone-booths",
        },
        {
          title: "Architectural spaces",
          caption: "Walnut and glass",
          image: "/images/philosophy-img.jpg",
          href: "/phone-booths",
        },
        {
          title: "Installed on real floors",
          caption: "Built, delivered and fitted by us",
          image: "/booths/booth-1.jpg",
          href: "/phone-booths#sizes",
        },
      ],
    },
  },
  { label: "Collections", href: "/collections" },
  { label: "About Us", href: "/about" },
];

const searchIndex = [
  ...navItems.flatMap((item) =>
    item.mega
      ? [
          { label: item.mega.heading, group: "Collection", href: item.href },
          ...item.mega.links.map((link) => ({
            label: link.label,
            group: item.mega!.heading,
            href: link.href,
          })),
        ]
      : [],
  ),
  ...[
    { label: "All collections", href: "/collections" },
    { label: "About us", href: "/about" },
    { label: "Contact us", href: "/contact" },
    { label: "FAQs", href: "/faq" },
    { label: "Shipping & delivery", href: "/shipping" },
    { label: "Returns & warranty", href: "/returns" },
    { label: "Careers", href: "/careers" },
  ].map((page) => ({ ...page, group: "Pages" })),
];

const EASE = [0.22, 1, 0.36, 1] as const;

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const reduceMotion = useReducedMotion();

  const [scrolled, setScrolled] = useState(false);
  const [openMega, setOpenMega] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const intentTimer = useRef<number | undefined>(undefined);

  const closeAll = () => {
    setOpenMega(null);
    setMobileOpen(false);
    setSearchOpen(false);
  };

  // Close everything whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    closeAll();
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeAll();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    lockScroll(mobileOpen);
    return () => lockScroll(false);
  }, [mobileOpen]);

  // A short hover intent so sweeping the cursor across the bar doesn't flash
  // every panel open; once one is open, moving between items is immediate.
  const requestMega = (label: string | null) => {
    window.clearTimeout(intentTimer.current);
    if (openMega && label) {
      setOpenMega(label);
      return;
    }
    intentTimer.current = window.setTimeout(() => setOpenMega(label), label ? 90 : 160);
  };

  const active = navItems.find((item) => item.label === openMega)?.mega;

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return searchIndex.filter((entry) => entry.group === "Collection");
    return searchIndex.filter(
      (entry) =>
        entry.label.toLowerCase().includes(q) || entry.group.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-transform duration-500 ease-out",
          scrolled && "-translate-y-[34px]",
        )}
        onMouseLeave={() => requestMega(null)}
      >
        <TopBar />

        <div
          className={cn(
            "relative border-b border-hairline bg-ivory transition-[background-color,box-shadow] duration-500",
            scrolled && "bg-ivory/90 shadow-[0_1px_0_rgba(24,33,43,0.04),0_12px_32px_-18px_rgba(16,38,61,0.25)] backdrop-blur-xl",
          )}
        >
          <div className="page-x flex h-[76px] items-center gap-8">
            <Link href="/" aria-label="Divano Elegante home" className="shrink-0">
              <Image
                src="/brand/logo.png"
                alt="Divano Elegante"
                width={600}
                height={105}
                preload
                className="h-7 w-auto sm:h-8"
              />
            </Link>

            <nav aria-label="Primary" className="mx-auto hidden h-full items-center lg:flex">
              <ul className="flex h-full items-center gap-9 xl:gap-11">
                {navItems.map((item) => {
                  const isOpen = openMega === item.label;
                  const isCurrent = pathname === item.href || pathname.startsWith(`${item.href}/`);
                  return (
                    <li
                      key={item.label}
                      className="flex h-full items-center"
                      onMouseEnter={() => requestMega(item.mega ? item.label : null)}
                    >
                      <Link
                        href={item.href}
                        onFocus={() => item.mega && setOpenMega(item.label)}
                        aria-expanded={item.mega ? isOpen : undefined}
                        aria-current={isCurrent ? "page" : undefined}
                        className="group relative py-2 text-[13.5px] font-medium tracking-[0.01em] text-charcoal"
                      >
                        {item.label}
                        <span
                          aria-hidden
                          className={cn(
                            "absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-gold transition-transform duration-500 ease-out group-hover:scale-x-100",
                            (isOpen || isCurrent) && "scale-x-100",
                          )}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="ml-auto flex items-center gap-1 lg:ml-0">
              <IconButton
                label="Search"
                onClick={() => {
                  setOpenMega(null);
                  setQuery("");
                  setSearchOpen((open) => !open);
                }}
                expanded={searchOpen}
              >
                <Search className="h-[18px] w-[18px]" strokeWidth={1.5} />
              </IconButton>
              <IconButton label="Wishlist" href="/#featured" className="hidden sm:flex">
                <Heart className="h-[18px] w-[18px]" strokeWidth={1.5} />
              </IconButton>
              <IconButton label="Send an enquiry" href="/contact#enquiry">
                <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.5} />
              </IconButton>

              <button
                type="button"
                onClick={() => setMobileOpen((open) => !open)}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                className="relative ml-1 flex h-11 w-11 items-center justify-center lg:hidden"
              >
                <span
                  className={cn(
                    "absolute h-px w-5 bg-charcoal transition-transform duration-500 ease-out",
                    mobileOpen ? "rotate-45" : "-translate-y-[4px]",
                  )}
                />
                <span
                  className={cn(
                    "absolute h-px w-5 bg-charcoal transition-transform duration-500 ease-out",
                    mobileOpen ? "-rotate-45" : "translate-y-[4px]",
                  )}
                />
              </button>
            </div>
          </div>

          {/* Mega menu */}
          <AnimatePresence>
            {active && !searchOpen ? (
              <motion.div
                key="mega"
                initial={{ opacity: 0, y: reduceMotion ? 0 : -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduceMotion ? 0 : -6 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="absolute inset-x-0 top-full hidden border-b border-hairline bg-ivory lg:block"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={active.heading}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="page-x grid grid-cols-12 gap-10 py-10"
                  >
                    <div className="col-span-3 flex flex-col">
                      <p className="font-heading text-[35px] leading-none tracking-[-0.02em] text-charcoal">
                        {active.heading}
                      </p>
                      <p className="mt-3 max-w-[28ch] text-sm leading-relaxed text-slate">
                        {active.blurb}
                      </p>
                      <ul className="mt-7 border-t border-hairline">
                        {active.links.map((link) => (
                          <li key={link.label} className="border-b border-hairline">
                            <Link
                              href={link.href}
                              className="group flex items-baseline justify-between gap-4 py-3"
                            >
                              <span className="text-[14px] font-medium text-charcoal transition-transform duration-500 ease-out group-hover:translate-x-1.5">
                                {link.label}
                              </span>
                              <span className="text-[12px] text-slate opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                {link.note}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <Link
                        href={active.all.href}
                        className="link-draw mt-7 self-start text-[13px] font-semibold text-navy"
                      >
                        {active.all.label}
                        <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
                      </Link>
                    </div>

                    <ul className="col-span-9 grid grid-cols-3 gap-5">
                      {active.features.map((feature, index) => (
                        <li key={feature.title}>
                          <Link href={feature.href} className="group block">
                            <motion.div
                              initial={{
                                clipPath: reduceMotion
                                  ? "inset(0% 0% 0% 0%)"
                                  : "inset(100% 0% 0% 0%)",
                              }}
                              animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                              transition={{ duration: 0.9, delay: 0.06 * index, ease: EASE }}
                              className="relative h-[320px] overflow-hidden rounded-xl bg-ivory-deep"
                            >
                              <Image
                                src={feature.image}
                                alt=""
                                fill
                                sizes="26vw"
                                className="object-cover transition-[scale] duration-[1.2s] ease-out group-hover:scale-105"
                              />
                            </motion.div>
                            <p className="mt-4 font-heading text-[19px] leading-tight text-charcoal">
                              {feature.title}
                            </p>
                            <p className="mt-1 text-[13px] text-slate">{feature.caption}</p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* Search */}
          <AnimatePresence>
            {searchOpen ? (
              <motion.div
                key="search"
                initial={{ opacity: 0, y: reduceMotion ? 0 : -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduceMotion ? 0 : -6 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="absolute inset-x-0 top-full border-b border-hairline bg-ivory"
              >
                <form
                  role="search"
                  onSubmit={(event) => {
                    event.preventDefault();
                    if (results[0]) {
                      router.push(results[0].href);
                      setSearchOpen(false);
                    }
                  }}
                  className="page-x py-8 md:py-12"
                >
                  <label htmlFor="site-search" className="sr-only">
                    Search the collection
                  </label>
                  <div className="flex items-center gap-4 border-b border-stone pb-4">
                    <Search className="h-5 w-5 shrink-0 text-slate" strokeWidth={1.5} />
                    <input
                      autoFocus
                      id="site-search"
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Search chairs, sofas, phone booths"
                      autoComplete="off"
                      className="w-full bg-transparent font-heading text-[25px] text-charcoal outline-none placeholder:text-slate/60 md:text-[35px]"
                    />
                    <button
                      type="button"
                      onClick={() => setSearchOpen(false)}
                      aria-label="Close search"
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-slate transition-colors hover:bg-ivory-deep hover:text-charcoal"
                    >
                      <X className="h-5 w-5" strokeWidth={1.5} />
                    </button>
                  </div>
                  <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate">
                    {query.trim() ? `${results.length} results` : "Collections"}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2.5" aria-live="polite">
                    {results.length ? (
                      results.map((entry) => (
                        <li key={`${entry.group}-${entry.label}`}>
                          <Link
                            href={entry.href}
                            className="inline-flex items-center gap-2 rounded-full border border-stone px-4 py-2 text-[13px] text-charcoal transition-colors duration-300 hover:border-navy hover:bg-navy hover:text-ivory"
                          >
                            {entry.label}
                            {entry.group !== "Collection" ? (
                              <span className="text-[11px] opacity-60">{entry.group}</span>
                            ) : null}
                          </Link>
                        </li>
                      ))
                    ) : (
                      <li className="text-sm text-slate">
                        Nothing matches “{query.trim()}”. Try chairs, sofas or phone booths.
                      </li>
                    )}
                  </ul>
                </form>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </header>

      {/* Dims the page behind an open panel. */}
      <AnimatePresence>
        {(active || searchOpen) && !mobileOpen ? (
          <motion.div
            key="scrim"
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={closeAll}
            onMouseEnter={() => requestMega(null)}
            className="fixed inset-0 z-40 bg-navy-deep/25 backdrop-blur-[2px]"
          />
        ) : null}
      </AnimatePresence>

      <MobileMenu
        open={mobileOpen}
        section={mobileSection}
        onSection={setMobileSection}
        onClose={() => setMobileOpen(false)}
        reduceMotion={!!reduceMotion}
        top={scrolled ? 76 : 110}
      />
    </>
  );
}

function IconButton({
  label,
  href,
  onClick,
  expanded,
  className,
  children,
}: {
  label: string;
  href?: string;
  onClick?: () => void;
  expanded?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const classes = cn(
    "flex h-10 w-10 items-center justify-center rounded-full text-charcoal transition-colors duration-300 hover:bg-ivory-deep hover:text-navy",
    className,
  );
  if (href) {
    return (
      <Link href={href} aria-label={label} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-expanded={expanded}
      className={classes}
    >
      {children}
    </button>
  );
}

function MobileMenu({
  open,
  section,
  onSection,
  onClose,
  reduceMotion,
  top,
}: {
  open: boolean;
  section: string | null;
  onSection: (label: string | null) => void;
  onClose: () => void;
  reduceMotion: boolean;
  top: number;
}) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id="mobile-menu"
          key="mobile-menu"
          initial={{ clipPath: reduceMotion ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: reduceMotion ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)", opacity: reduceMotion ? 0 : 1 }}
          transition={{ duration: 0.7, ease: [0.83, 0, 0.17, 1] }}
          style={{ top }}
          className="fixed inset-x-0 bottom-0 z-40 overflow-y-auto bg-ivory lg:hidden"
          data-lenis-prevent
        >
          <nav aria-label="Mobile" className="page-x flex min-h-full flex-col pb-10 pt-6">
            <ul>
              {navItems.map((item, index) => {
                const isOpen = section === item.label;
                return (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.25 + index * 0.06, ease: EASE }}
                    className="border-b border-hairline"
                  >
                    {item.mega ? (
                      <>
                        <button
                          type="button"
                          onClick={() => onSection(isOpen ? null : item.label)}
                          aria-expanded={isOpen}
                          className="flex w-full items-center justify-between py-5 text-left font-heading text-[30px] leading-none text-charcoal"
                        >
                          {item.label}
                          <Plus
                            className={cn(
                              "h-5 w-5 text-gold transition-transform duration-500 ease-out",
                              isOpen && "rotate-45",
                            )}
                            strokeWidth={1.5}
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen ? (
                            <motion.div
                              key="panel"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.5, ease: EASE }}
                              className="overflow-hidden"
                            >
                              <ul className="pb-6">
                                {item.mega.links.map((link) => (
                                  <li key={link.label}>
                                    <Link
                                      href={link.href}
                                      onClick={onClose}
                                      className="flex items-baseline justify-between py-2.5"
                                    >
                                      <span className="text-[15px] font-medium text-charcoal">
                                        {link.label}
                                      </span>
                                      <span className="text-[12px] text-slate">{link.note}</span>
                                    </Link>
                                  </li>
                                ))}
                                <li>
                                  <Link
                                    href={item.mega.all.href}
                                    onClick={onClose}
                                    className="mt-3 inline-flex items-center gap-2 text-[13px] font-semibold text-navy"
                                  >
                                    {item.mega.all.label}
                                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
                                  </Link>
                                </li>
                              </ul>
                            </motion.div>
                          ) : null}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="block py-5 font-heading text-[30px] leading-none text-charcoal"
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.li>
                );
              })}
            </ul>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-auto pt-12"
            >
              <Link
                href="/contact"
                onClick={onClose}
                className="flex h-14 w-full items-center justify-center rounded-full bg-navy text-[14px] font-semibold text-ivory"
              >
                Talk to an expert
              </Link>
              <a
                href={site.phone.href}
                className="mt-5 block text-center text-[13px] tracking-[0.04em] text-slate"
              >
                {site.phone.display}
              </a>
            </motion.div>
          </nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
