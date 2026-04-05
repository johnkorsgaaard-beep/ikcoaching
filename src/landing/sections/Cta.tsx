import { useState } from "react";
import type { FormEvent } from "react";

type FormState = "idle" | "sending" | "sent" | "error";

const GOALS = [
  "Et vægttab",
  "Muskelopbygning",
  "Bedre vaner & energi",
  "Andet",
];

export default function Cta() {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: data.get("name") as string,
      email: data.get("email") as string,
      phone: data.get("phone") as string,
      message: `Mål: ${goal}`,
      source: "ikcoaching-website",
    };

    const formspreeUrl = import.meta.env.VITE_FORMSPREE_URL;
    const useFormspree =
      import.meta.env.VITE_CONTACT_BACKEND === "formspree" && formspreeUrl;

    const url = useFormspree ? formspreeUrl : "/api/inbound-lead";

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Status ${res.status}`);
      setFormState("sent");
      setStep(3);
      form.reset();
    } catch {
      setFormState("error");
    }
  }

  const totalSteps = 2;

  return (
    <section
      id="kontakt"
      aria-labelledby="cta-heading"
      className="py-24 sm:py-32"
    >
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-20">
          {/* Left text — desktop only */}
          <div className="hidden text-center lg:block lg:flex-1 lg:text-left">
            <span className="mb-3 inline-block rounded-full border border-rose-200 bg-rose-50 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-rose-400">
              Kontakt
            </span>
            <h2
              id="cta-heading"
              className="text-3xl font-bold tracking-tight text-stone-800 sm:text-4xl lg:text-5xl"
            >
              Klar til at komme
              <br />
              <span className="bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">
                i gang?
              </span>
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-stone-500">
              Besvar ét hurtigt spørgsmål og udfyld dine oplysninger, så vender
              jeg tilbage med en plan der passer til dig.
            </p>
            <div className="mt-8 flex items-center gap-6 text-sm text-stone-500">
              <span className="flex items-center gap-1.5">
                <span className="text-base">&#10003;</span> Personlig opfølgning
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-base">&#9825;</span> 100% fokus på dig
              </span>
            </div>
          </div>

          {/* Phone mockup */}
          <div className="w-full max-w-[370px] lg:flex-shrink-0">
            {/* Mobile heading */}
            <div className="mb-8 text-center lg:hidden">
              <span className="mb-3 inline-block rounded-full border border-rose-200 bg-rose-50 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-rose-400">
                Kontakt
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-stone-800">
                Klar til at komme i gang?
              </h2>
            </div>

            {/* Phone frame */}
            <div className="relative mx-auto overflow-hidden rounded-[2.8rem] bg-stone-900 p-[5px] shadow-2xl shadow-stone-400/30">
              <div className="overflow-hidden rounded-[2.5rem] bg-white">
                {/* Notch */}
                <div className="relative flex justify-center">
                  <div className="absolute top-0 z-30 h-6 w-28 rounded-b-2xl bg-stone-900" />
                </div>

                {/* Hero gradient area */}
                <div
                  className="relative overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(160deg, #fce7f3 0%, #fecdd3 30%, #e0d4f5 60%, #c7d2fe 100%)",
                  }}
                >
                  {/* Coach cutout */}
                  <div className="relative z-10 flex justify-center pt-16 pb-6">
                    <img
                      src="/images/coach/coach-cutout.png"
                      alt="IK Coaching"
                      className="h-60 w-auto object-contain object-bottom drop-shadow-[0_8px_30px_rgba(0,0,0,0.10)]"
                      style={{
                        maskImage:
                          "linear-gradient(to bottom, black 55%, transparent 98%)",
                        WebkitMaskImage:
                          "linear-gradient(to bottom, black 55%, transparent 98%)",
                      }}
                    />
                  </div>

                  {/* Floating badges — in front of coach */}
                  <div className="absolute left-3 top-[45%] z-20 -translate-y-1/2 sm:left-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/85 shadow-lg shadow-black/5 backdrop-blur-md">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-rose-400">
                        <path fillRule="evenodd" d="M10 3a.75.75 0 0 1 .75.75v10.638l3.96-3.96a.75.75 0 1 1 1.06 1.06l-5.25 5.25a.75.75 0 0 1-1.06 0l-5.25-5.25a.75.75 0 1 1 1.06-1.06l3.96 3.96V3.75A.75.75 0 0 1 10 3Z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>

                  <div className="absolute right-3 top-[45%] z-20 -translate-y-1/2 sm:right-5">
                    <div className="flex items-center gap-1 rounded-2xl bg-white/85 px-3.5 py-2.5 shadow-lg shadow-black/5 backdrop-blur-md">
                      <span className="text-base text-amber-400">&#9733;</span>
                      <span className="text-xl font-bold text-stone-800">5.0</span>
                    </div>
                  </div>

                  {/* Bottom gradient to blend into white */}
                  <div className="absolute inset-x-0 bottom-0 z-[15] h-10 bg-gradient-to-t from-white to-transparent" />
                </div>

                {/* Social proof pills */}
                <div className="relative z-20 -mt-2 flex justify-center gap-2.5 px-5">
                  <div className="flex items-center gap-1.5 rounded-full border border-rose-100 bg-white px-3.5 py-2 text-[11px] font-medium text-stone-600 shadow-sm">
                    <span className="text-rose-400">&#10003;</span> Personlig opfølgning
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full border border-rose-100 bg-white px-3.5 py-2 text-[11px] font-medium text-stone-600 shadow-sm">
                    <span>&#9825;</span> 100% fokus på dig
                  </div>
                </div>

                {/* Form area */}
                <div className="px-5 pb-8 pt-5">
                  {/* Progress */}
                  {step <= totalSteps && (
                    <div className="mb-3">
                      <div className="h-[3px] w-14 overflow-hidden rounded-full bg-rose-100">
                        <div
                          className="h-full rounded-full bg-rose-400 transition-all duration-500"
                          style={{ width: `${(step / totalSteps) * 100}%` }}
                        />
                      </div>
                      <p className="mt-1.5 text-[11px] text-stone-400">
                        Trin {step} af {totalSteps}
                      </p>
                    </div>
                  )}

                  {/* Step 1 */}
                  {step === 1 && (
                    <div>
                      <h3 className="text-[15px] font-bold text-stone-800">
                        Hvad drømmer du om lige nu?{" "}
                        <span className="text-rose-400">*</span>
                      </h3>
                      <div className="mt-4 space-y-2.5">
                        {GOALS.map((g) => (
                          <button
                            key={g}
                            type="button"
                            onClick={() => { setGoal(g); setStep(2); }}
                            className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-[13px] font-medium transition-all ${
                              goal === g
                                ? "border-rose-300 bg-rose-50 text-rose-600"
                                : "border-stone-200/80 bg-white text-stone-700 hover:border-rose-200 hover:bg-rose-50/40"
                            }`}
                          >
                            <span className={`flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                              goal === g ? "border-rose-400 bg-rose-400" : "border-stone-300"
                            }`}>
                              {goal === g && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                            </span>
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 2 */}
                  {step === 2 && (
                    <div>
                      <h3 className="text-[15px] font-bold text-stone-800">
                        Fortæl lidt om dig selv{" "}
                        <span className="text-rose-400">*</span>
                      </h3>
                      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                        <input name="name" type="text" required placeholder="Dit navn"
                          className="w-full rounded-xl border border-stone-200/80 bg-white px-4 py-3.5 text-[13px] text-stone-800 placeholder-stone-400 outline-none transition-all focus:border-rose-300 focus:ring-2 focus:ring-rose-100" />
                        <input name="email" type="email" required placeholder="Din email"
                          className="w-full rounded-xl border border-stone-200/80 bg-white px-4 py-3.5 text-[13px] text-stone-800 placeholder-stone-400 outline-none transition-all focus:border-rose-300 focus:ring-2 focus:ring-rose-100" />
                        <input name="phone" type="tel" required placeholder="Dit telefonnummer"
                          className="w-full rounded-xl border border-stone-200/80 bg-white px-4 py-3.5 text-[13px] text-stone-800 placeholder-stone-400 outline-none transition-all focus:border-rose-300 focus:ring-2 focus:ring-rose-100" />

                        {formState === "error" && (
                          <p className="text-[11px] text-red-500">Noget gik galt — prøv igen.</p>
                        )}

                        <div className="flex gap-2.5 pt-1">
                          <button type="button" onClick={() => setStep(1)}
                            className="rounded-full border border-stone-200 px-4 py-2.5 text-[13px] font-medium text-stone-500 transition-colors hover:bg-stone-50">
                            Tilbage
                          </button>
                          <button type="submit" disabled={formState === "sending"}
                            className="flex-1 rounded-full bg-rose-400 py-2.5 text-[13px] font-semibold text-white shadow-md shadow-rose-200/50 transition-all hover:bg-rose-500 disabled:opacity-50">
                            {formState === "sending" ? "Sender…" : "Send"}
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* Step 3 */}
                  {step === 3 && (
                    <div className="py-6 text-center">
                      <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-rose-50">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 text-rose-400">
                          <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h3 className="text-[15px] font-bold text-stone-800">Tak for din besked!</h3>
                      <p className="mt-1.5 text-[12px] text-stone-500">Jeg vender tilbage hurtigst muligt.</p>
                    </div>
                  )}
                </div>

                {/* Home indicator */}
                <div className="flex justify-center pb-2">
                  <div className="h-1 w-24 rounded-full bg-stone-200" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-stone-400">
          Eller skriv direkte til{" "}
          <a href="mailto:kontakt@ikcoaching.dk" className="text-rose-400 underline-offset-2 hover:underline">
            kontakt@ikcoaching.dk
          </a>
        </p>
      </div>
    </section>
  );
}
