export default function About() {
  return (
    <section
      id="om"
      aria-labelledby="about-heading"
      className="border-b border-white/10 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-center gap-16 lg:flex-row lg:items-start lg:gap-20">
          {/* Text column */}
          <div className="max-w-xl lg:flex-1">
            <h2
              id="about-heading"
              className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
            >
              Om miiiiiig
            </h2>

            <div className="mt-8 space-y-5 text-base leading-relaxed text-zinc-400 sm:text-lg">
              <p>
                Hej! Jeg hedder <span className="text-zinc-200">Isabella</span>,
                og jeg er kvinden bag IK Coaching. Min passion er at hjælpe
                kvinder med at finde{" "}
                <span className="text-zinc-200">
                  glæden ved træning og en sund livsstil
                </span>{" "}
                — uden ekstreme diæter eller urealistiske krav.
              </p>
              <p>
                Jeg har selv været på en rejse med min krop og ved, hvor svært
                det kan være at finde den rette balance. Derfor har jeg gjort det
                til min mission at skabe et{" "}
                <span className="text-zinc-200">trygt og støttende rum</span>,
                hvor du kan udvikle dig i dit eget tempo.
              </p>
              <p>
                Min tilgang er baseret på{" "}
                <span className="text-zinc-200">evidensbaseret træning</span>,
                individuel kostplanlægning og ikke mindst en tæt, personlig
                relation til hver eneste klient. Jeg tror på, at de bedste
                resultater kommer, når man føler sig set og hørt.
              </p>
              <p>
                Uanset om du vil{" "}
                <span className="text-zinc-200">tabe dig</span>, bygge styrke
                eller bare have det bedre i din egen krop — så er jeg her for
                dig.
              </p>
            </div>
          </div>

          {/* Coach image */}
          <div className="relative lg:flex-1">
            <div
              className="pointer-events-none relative overflow-hidden rounded-2xl"
              aria-hidden="true"
              style={{
                maskImage:
                  "linear-gradient(to right, transparent 0%, black 15%, black 100%), " +
                  "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0%, black 15%, black 100%), " +
                  "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
                maskComposite: "intersect",
                WebkitMaskComposite: "source-in",
              }}
            >
              <img
                src="/images/coach/coach-photo.png"
                alt=""
                className="h-auto w-full max-w-lg object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
