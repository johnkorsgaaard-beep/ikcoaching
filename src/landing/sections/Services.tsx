import type { SVGProps } from "react";

function DumbbellIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6v12M17.25 6v12M3.75 9v6M20.25 9v6M6.75 12h10.5M3.75 12h3M17.25 12h3" />
    </svg>
  );
}

function DeviceIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
    </svg>
  );
}

function HeartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
  );
}

const OFFERS = [
  {
    id: "pt",
    title: "Personlig træning",
    body: "Skræddersyede træningsprogrammer designet til din krop, dine mål og dit hverdagsliv. Tæt opfølgning og justeringer undervejs.",
    Icon: DumbbellIcon,
  },
  {
    id: "online",
    title: "Online forløb",
    body: "Fleksibel coaching uanset hvor du er. Du får en personlig plan, ugentlig check-in og adgang til mig via chat — helt på dine præmisser.",
    Icon: DeviceIcon,
  },
  {
    id: "kost",
    title: "Kost & vaner",
    body: "Individuel kostplanlægning og guidning til sundere vaner. Ingen crash-diæter — kun holdbare ændringer der passer ind i dit liv.",
    Icon: HeartIcon,
  },
];

export default function Services() {
  return (
    <section
      id="tilbud"
      aria-labelledby="services-heading"
      className="py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="text-center">
          <span className="mb-3 inline-block rounded-full border border-rose-200 bg-rose-50 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-rose-400">
            Services
          </span>
          <h2
            id="services-heading"
            className="text-3xl font-bold tracking-tight text-stone-800 sm:text-4xl"
          >
            Hvad jeg tilbyder
          </h2>
          <p className="mt-4 text-lg text-stone-500">
            Coaching der er lige så unik som dig.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {OFFERS.map(({ id, title, body, Icon }) => (
            <article
              key={id}
              className="service-card group relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-400 to-pink-400 p-8 shadow-lg shadow-rose-200/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-rose-300/50"
            >
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 ring-1 ring-white/30">
                  <Icon className="h-6 w-6 text-white" />
                </div>

                <h3 className="mt-6 text-xl font-semibold text-white">
                  {title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-white/80">
                  {body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
