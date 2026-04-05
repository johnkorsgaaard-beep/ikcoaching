import { useEffect, useRef } from "react";

interface Testimonial {
  quote: string;
  name: string;
  age: number;
  featured: boolean;
  fly: "up" | "left" | "right" | "down";
  cardSize: "sm" | "md" | "lg";
  delay: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Jeg har tabt 3,3 kg på bare 6 uger — og det bedste er, at det føles helt naturligt. Ida forstår virkelig, hvad der virker for mig.",
    name: "Sofie",
    age: 26,
    featured: true,
    fly: "up",
    cardSize: "lg",
    delay: "0s",
  },
  {
    quote:
      "2,1 kg på 4 uger, og jeg har aldrig haft det bedre! Idas coaching er personlig, motiverende og realistisk.",
    name: "Mathilde",
    age: 23,
    featured: false,
    fly: "left",
    cardSize: "md",
    delay: "0.1s",
  },
  {
    quote:
      "Jeg mistede 2,8 kg på 3 uger. Men det vigtigste er, at jeg har fået et helt nyt forhold til træning og kost.",
    name: "Emma",
    age: 29,
    featured: false,
    fly: "right",
    cardSize: "md",
    delay: "0.15s",
  },
  {
    quote:
      "Ida har lært mig, at det ikke handler om perfektion, men om fremskridt. Jeg er stærkere end nogensinde.",
    name: "Caroline",
    age: 31,
    featured: false,
    fly: "left",
    cardSize: "sm",
    delay: "0.2s",
  },
  {
    quote:
      "Det hele har ændret sig — min energi, min selvtillid og min krop. Jeg kan varmt anbefale IK Coaching.",
    name: "Laura",
    age: 24,
    featured: false,
    fly: "right",
    cardSize: "sm",
    delay: "0.25s",
  },
  {
    quote:
      "Endelig en coach der forstår, at livet ikke altid er perfekt. Ida tilpasser altid planen, så den passer til min hverdag.",
    name: "Freja",
    age: 27,
    featured: true,
    fly: "down",
    cardSize: "lg",
    delay: "0.3s",
  },
  {
    quote:
      "Jeg havde prøvet alt, men intet virkede — indtil jeg fandt IK Coaching. Nu ser jeg endelig resultater, der holder.",
    name: "Maja",
    age: 25,
    featured: false,
    fly: "left",
    cardSize: "md",
    delay: "0.35s",
  },
  {
    quote:
      "Den bedste investering jeg har lavet i mig selv. Ida er professionel, venlig og utroligt dygtig.",
    name: "Nanna",
    age: 28,
    featured: false,
    fly: "right",
    cardSize: "sm",
    delay: "0.4s",
  },
];

function TestimonialCard({
  quote,
  name,
  age,
  fly,
  cardSize,
  delay,
}: Testimonial) {
  const sizeClasses = {
    sm: "p-6",
    md: "p-7",
    lg: "p-8",
  };

  return (
    <div
      className={`testimonial-fly testimonial-fly--${fly} relative overflow-hidden rounded-2xl border-2 border-rose-300 bg-white/70 shadow-sm backdrop-blur-sm ${sizeClasses[cardSize]}`}
      style={{ animationDelay: delay }}
    >
      <span
        className="absolute -top-2 left-5 text-5xl font-serif text-rose-300/40 select-none"
        aria-hidden="true"
      >
        &ldquo;
      </span>

      <blockquote className="relative mt-4 text-sm leading-relaxed text-stone-600 sm:text-base">
        {quote}
      </blockquote>

      <footer className="mt-5 text-xs text-stone-400">
        <span className="font-medium text-stone-700">{name}</span>
        <span className="mx-1.5">&middot;</span>
        <span>{age} år</span>
      </footer>
    </div>
  );
}

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

  const top = TESTIMONIALS.filter((t) => t.featured);
  const middle = TESTIMONIALS.filter((t) => !t.featured);
  const leftCol = middle.filter((_, i) => i % 2 === 0);
  const rightCol = middle.filter((_, i) => i % 2 === 1);

  return (
    <section
      ref={sectionRef}
      id="udtalelser"
      aria-labelledby="testimonials-heading"
      className="relative overflow-hidden py-24 sm:py-32"
    >
      {/* Right-side background image with fade to left */}
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
          className="h-full w-full object-cover object-[center_20%] opacity-[0.25]"
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
            Det siger mine <span className="text-rose-400">klienter</span>
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

        {/* Mobile layout */}
        <div className="mt-16 flex flex-col items-center gap-6 lg:hidden">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </div>

        {/* Desktop layout — two columns, no center image */}
        <div className="mt-16 hidden lg:block">
          <div className="mx-auto mb-8 max-w-2xl">
            {top[0] && <TestimonialCard {...top[0]} />}
          </div>

          <div className="grid grid-cols-2 items-start gap-8">
            <div className="space-y-6">
              {leftCol.map((t, i) => (
                <TestimonialCard key={`l-${i}`} {...t} />
              ))}
            </div>

            <div className="space-y-6">
              {rightCol.map((t, i) => (
                <TestimonialCard key={`r-${i}`} {...t} />
              ))}
            </div>
          </div>

          {top[1] && (
            <div className="mx-auto mt-8 max-w-2xl">
              <TestimonialCard {...top[1]} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
