import { useEffect, useRef } from "react";

const REVIEWS = [
  "Jeg var superglad for mit forløb hos Ida! Jeg følte mig set og hørt og virkelig forstået. 🖤\nOg vildt fedt med en plan og program skræddersyet til min hverdag og smag! ✨\n\n+ seriøse glute gainzzzz",
  "Jeg er utrolig taknemmelig for at have Ida som coach. Vores samarbejde fungerer virkelig godt, og det gør en kæmpe forskel for mig. Jeg har tidligere haft en anden coach, hvor kemien ikke helt var der og det har virkelig fået mig til at sætte endnu mere pris på Ida. Hun er altid støttende, nærværende og tilgængelig, og det har været helt afgørende for mit forløb. Jeg er simpelthen så tilfreds og glæder mig til resten af rejsen hos hende 😍💪",
  "Jeg har haft et virkelig godt samarbejde med Ida ❤️\n\nHun er altid hurtig til at svare, når man skriver til hende, og man føler sig virkelig set og taget seriøst. Det jeg især sætter pris på er, at hun også selv tjekker ind – selv når man ikke lige har fået skrevet først. Det viser bare, hvor engageret hun er i sine klienter 💯\n\nHun er god til at tilpasse forløbet til ens hverdag og behov, og hun er både motiverende og ærlig på den helt rigtige måde. Man føler sig tryg, og hun formår virkelig at holde en på sporet – også på de dage, hvor motivationen ikke er der.\n\nKan klart anbefale Ida, hvis man vil have en coach, der går op i én og følger en hele vejen 💪",
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("testimonials-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="udtalelser"
      aria-labelledby="testimonials-heading"
      className="relative overflow-hidden py-24 sm:py-32"
    >
      <div
        className="absolute inset-y-0 right-0 z-0 w-[50%] lg:w-[40%]"
        aria-hidden="true"
        style={{
          maskImage:
            "linear-gradient(to left, black 5%, transparent 85%), linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to left, black 5%, transparent 85%), linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      >
        <img
          src="/images/coach/testimonial-bg.png"
          alt=""
          className="h-full w-full object-cover object-[center_20%] opacity-[0.55]"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <div className="text-center">
          <span className="mb-3 inline-block rounded-full border border-rose-300 bg-rose-400 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-white shadow-md shadow-rose-200/40">
            Udtalelser
          </span>
          <h2
            id="testimonials-heading"
            className="text-3xl font-bold tracking-tight text-stone-800 sm:text-4xl"
          >
            Små uddrag fra nogle af mine <span className="text-rose-400">klienter</span>
          </h2>
          <p className="mt-4 text-lg text-stone-500">
            Ægte resultater fra ægte{" "}
            <span className="relative inline-block">
              mennesker
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 120 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 5.5C20 2 40 3.5 60 4.5C80 5.5 100 3 118 5"
                  stroke="#fb7185"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((quote, i) => (
            <div
              key={i}
              className="testimonial-fly testimonial-fly--up relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-400 to-pink-400 p-6 shadow-lg shadow-rose-200/40 sm:p-8"
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              <span
                className="absolute -top-2 left-5 text-6xl font-serif text-white/20 select-none"
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <blockquote className="relative mt-4 text-sm leading-relaxed text-white/95 whitespace-pre-line sm:text-[15px]">
                {quote}
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
