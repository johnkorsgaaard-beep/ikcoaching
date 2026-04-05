export default function About() {
  return (
    <section
      id="om"
      aria-labelledby="about-heading"
      className="py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-center gap-16 lg:flex-row lg:items-start lg:gap-20">
          {/* Text column */}
          <div className="max-w-xl lg:flex-1">
            <span className="mb-3 inline-block rounded-full border border-rose-200 bg-rose-50 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-rose-400">
              Bag kulisserne
            </span>

            <h2
              id="about-heading"
              className="text-3xl font-bold tracking-tight text-stone-800 sm:text-4xl lg:text-5xl"
            >
              Om miiiiiig
            </h2>

            <div className="mt-8 space-y-5 text-base leading-relaxed text-stone-500 sm:text-lg">
              <p>
                Hej! Jeg hedder{" "}
                <span className="font-medium text-stone-700">Ida</span>,
                og jeg er kvinden bag IK Coaching. Min passion er at hjælpe
                kvinder med at finde{" "}
                <span className="font-medium text-stone-700">
                  glæden ved træning og en sund livsstil
                </span>{" "}
                — uden ekstreme diæter eller urealistiske krav.
              </p>
              <p>
                Jeg har selv været på en rejse med min krop og ved, hvor svært
                det kan være at finde den rette balance. Derfor har jeg gjort det
                til min mission at skabe et{" "}
                <span className="font-medium text-stone-700">
                  trygt og støttende rum
                </span>
                , hvor du kan udvikle dig i dit eget tempo.
              </p>
              <p>
                Min tilgang er baseret på{" "}
                <span className="font-medium text-stone-700">
                  evidensbaseret træning
                </span>
                , individuel kostplanlægning og ikke mindst en tæt, personlig
                relation til hver eneste klient. Jeg tror på, at de bedste
                resultater kommer, når man føler sig set og hørt.
              </p>
              <p>
                Uanset om du vil{" "}
                <span className="font-medium text-stone-700">tabe dig</span>,
                bygge styrke eller bare have det bedre i din egen krop — så er
                jeg her for dig.
              </p>
            </div>
          </div>

          {/* Coach image */}
          <div className="relative lg:flex-1">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-rose-200/40">
              <img
                src="/images/coach/coach-photo.png"
                alt="Ida, IK Coaching"
                className="h-auto w-full max-w-lg object-cover"
              />
              <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-black/5" />
            </div>

            {/* Decorative blob behind image */}
            <div
              className="absolute -right-8 -top-8 -z-10 h-64 w-64 rounded-full opacity-40 blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(251,207,232,0.6) 0%, transparent 70%)" }}
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-6 -left-6 -z-10 h-48 w-48 rounded-full opacity-30 blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(254,205,211,0.5) 0%, transparent 70%)" }}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
