import type { Metadata } from "next";
import { Hammer, PenTool, Users } from "lucide-react";
import { PageHero } from "@/components/page/page-hero";
import { SectionHeader } from "@/components/page/section-header";
import { PillLink } from "@/components/ui/pill-link";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Careers",
  description:
    "Work with Divano Elegante: craftspeople, designers and client teams building ergonomic chairs, sofas and acoustic phone booths in our own factory in India.",
  path: "/careers",
  image: { url: "/images/factory-craft.jpg", width: 1376, height: 768, alt: "A craftsperson fitting a hardwood frame" },
});

const teams = [
  {
    icon: Hammer,
    title: "The workshop",
    body: "Carpentry, upholstery, fabrication and finishing: the people who turn a drawing into a piece of furniture.",
    roles: ["Carpenters", "Upholsterers", "Tailors", "Fabricators", "Finishers"],
  },
  {
    icon: PenTool,
    title: "The studio",
    body: "Product design, drawings and specifications, from a new chair to a booth sized for one particular wall.",
    roles: ["Product designers", "Draughtspeople", "Specification"],
  },
  {
    icon: Users,
    title: "The client team",
    body: "Sales, project coordination, delivery and installation: the people our clients speak to from first call to final placement.",
    roles: ["Sales", "Project coordination", "Delivery & installation"],
  },
];

const values = [
  { title: "Work you can see", body: "Every day ends with something made. Few jobs let you point at the result." },
  { title: "The whole piece", body: "Frame, foam, fabric and finish happen under one roof, so there is always more of the craft to learn." },
  { title: "Close to the client", body: "What we build goes to real homes and offices, and we hear what people think of it." },
];

export default function CareersPage() {
  const mailto = `mailto:${site.careersEmail}?subject=${encodeURIComponent("Careers at Divano Elegante")}`;
  return (
    <>
      <PageHero
        crumbs={[{ name: "Careers", path: "/careers" }]}
        eyebrow="Careers"
        title={["Make things", "that last."]}
        lead="We are a manufacturer, so most of what we do happens on the factory floor. If you are good with your hands, your eye or your clients, we would like to hear from you."
        actions={<PillLink href={mailto}>Send us your CV</PillLink>}
        image={{
          src: "/images/factory-craft.jpg",
          alt: "A craftsperson fitting a hardwood lounge chair frame in the workshop",
          focus: "50% 45%",
        }}
      />

      <section className="bg-ivory py-24 md:py-36" aria-labelledby="teams-heading">
        <div className="page-x">
          <SectionHeader
            id="teams-heading"
            eyebrow="Where you could fit"
            title="Three teams, one floor."
            titleClassName="max-w-[10ch]"
            lead="Roles open up across the business as we grow. These are the teams we hire into."
          />
          <ul className="mt-16 grid gap-12 md:mt-20 md:grid-cols-3 md:gap-8" data-reveal="stagger">
            {teams.map((team) => (
              <li key={team.title} className="flex flex-col border-t border-stone pt-8">
                <team.icon className="h-6 w-6 text-gold" strokeWidth={1.25} />
                <h3 className="mt-6 font-heading text-[28px] leading-none text-charcoal md:text-[32px]">{team.title}</h3>
                <p className="mt-4 max-w-[34ch] text-[15px] leading-relaxed text-slate">{team.body}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {team.roles.map((role) => (
                    <li key={role} className="rounded-full border border-stone px-3 py-1 text-[12px] text-charcoal">
                      {role}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-ivory-deep py-24 md:py-32" aria-labelledby="why-heading">
        <div className="page-x grid gap-12 lg:grid-cols-12 lg:gap-10">
          <h2 id="why-heading" className="type-h2 max-w-[10ch] text-charcoal lg:col-span-4" data-reveal="lines">
            Why work with us.
          </h2>
          <ol className="lg:col-span-7 lg:col-start-6" data-reveal="stagger">
            {values.map((value, index) => (
              <li key={value.title} className="grid grid-cols-[3rem_1fr] border-t border-stone py-8 last:border-b">
                <span className="pt-2 text-[12px] font-semibold tabular-nums tracking-[0.1em] text-gold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-heading text-[25px] leading-tight text-charcoal md:text-[28px]">{value.title}</h3>
                  <p className="mt-2 max-w-[48ch] text-[15px] leading-relaxed text-slate">{value.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy-deep py-24 text-ivory md:py-32" aria-labelledby="apply-heading">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 -top-40 h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(198,161,91,0.15)_0%,rgba(198,161,91,0)_65%)]"
        />
        <div className="page-x relative flex flex-col items-center text-center">
          <p className="eyebrow eyebrow-center" data-reveal="fade">
            How to apply
          </p>
          <h2 id="apply-heading" className="type-h2 mt-6 max-w-[16ch] text-ivory" data-reveal="lines">
            No role listed? Write to us anyway.
          </h2>
          <p className="type-lead mt-6 max-w-[46ch] text-ivory/70" data-reveal="fade">
            Send your CV, a few lines about what you do best and, for craft and design roles, photos
            of your work.
          </p>
          <div className="mt-10 flex flex-col items-center gap-5" data-reveal="fade">
            <PillLink href={mailto} tone="light">
              Email your application
            </PillLink>
            <a href={mailto} className="text-[14px] text-ivory/60 transition-colors hover:text-ivory">
              {site.careersEmail}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
