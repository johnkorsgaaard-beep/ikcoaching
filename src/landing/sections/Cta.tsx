import { useState } from "react";
import type { FormEvent } from "react";

type FormState = "idle" | "sending" | "sent" | "error";

const TOTAL_STEPS = 10;

const GOALS = [
  "Et vægttab",
  "Muskelopbygning",
  "Glutes Gains & Goodvibes",
  "Andet",
];

const CONFIDENCE = ["1", "2", "3", "4", "5"];

const COMMITMENT = [
  "Lyder fair – skal jeg nok!",
  "Jeg ved ikke helt",
];

const READINESS = [
  "Jeg er afklaret med mig selv!",
  "Jeg ved ikke helt",
  "Andet",
];

const SOURCE = [
  "Annoncer",
  "Følger dig på IG/TikTok",
  "Andet",
];

function RadioOption({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-[13px] font-medium transition-all ${
        selected
          ? "border-rose-300 bg-rose-50 text-rose-600"
          : "border-stone-200/80 bg-white text-stone-700 hover:border-rose-200 hover:bg-rose-50/40"
      }`}
    >
      <span
        className={`flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
          selected ? "border-rose-400 bg-rose-400" : "border-stone-300"
        }`}
      >
        {selected && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
      </span>
      {label}
    </button>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mb-3 flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 text-stone-500 transition-colors hover:bg-stone-50"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
        <path fillRule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z" clipRule="evenodd" />
      </svg>
    </button>
  );
}

function NextButton({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="mt-4 w-full rounded-full bg-rose-400 py-3 text-[14px] font-semibold text-white shadow-md shadow-rose-200/50 transition-all hover:bg-rose-500 disabled:opacity-40"
    >
      Næste
    </button>
  );
}

export default function Cta() {
  const [step, setStep] = useState(1);
  const [formState, setFormState] = useState<FormState>("idle");

  const [goal, setGoal] = useState("");
  const [age, setAge] = useState("");
  const [fitnessRelation, setFitnessRelation] = useState("");
  const [challenge, setChallenge] = useState("");
  const [confidence, setConfidence] = useState("");
  const [importance, setImportance] = useState("");
  const [commitment, setCommitment] = useState("");
  const [readiness, setReadiness] = useState("");
  const [source, setSource] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: data.get("name") as string,
      email: data.get("email") as string,
      phone: data.get("phone") as string,
      message: [
        `Mål: ${goal}`,
        `Alder: ${age}`,
        `Fitness-forhold: ${fitnessRelation}`,
        `Udfordring: ${challenge}`,
        `Selvsikkerhed (1-5): ${confidence}`,
        `Vigtighed: ${importance}`,
        `Commitment: ${commitment}`,
        `Klar: ${readiness}`,
        `Kilde: ${source}`,
      ].join("\n"),
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
      setStep(11);
      form.reset();
    } catch {
      setFormState("error");
    }
  }

  function renderStep() {
    switch (step) {
      case 1:
        return (
          <div>
            <h3 className="text-[15px] font-bold text-stone-800">
              Hvad drømmer du om lige nu? <span className="text-rose-400">*</span>
            </h3>
            <div className="mt-4 space-y-2.5">
              {GOALS.map((g) => (
                <RadioOption
                  key={g}
                  label={g}
                  selected={goal === g}
                  onClick={() => { setGoal(g); setStep(2); }}
                />
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div>
            <BackButton onClick={() => setStep(1)} />
            <h3 className="text-[15px] font-bold text-stone-800">
              Hvor gammel er du? <span className="text-rose-400">*</span>
            </h3>
            <input
              type="text"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Din alder..."
              className="mt-4 w-full rounded-xl border border-stone-200/80 bg-white px-4 py-3.5 text-[13px] text-stone-800 placeholder-stone-400 outline-none transition-all focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
            />
            <NextButton onClick={() => setStep(3)} disabled={!age.trim()} />
          </div>
        );

      case 3:
        return (
          <div>
            <BackButton onClick={() => setStep(2)} />
            <h3 className="text-[15px] font-bold text-stone-800">
              Fortæl lidt om dit forhold til fitness, træning & din krop 💗{" "}
              <span className="text-rose-400">*</span>
            </h3>
            <textarea
              value={fitnessRelation}
              onChange={(e) => setFitnessRelation(e.target.value)}
              placeholder="Skriv her..."
              rows={4}
              className="mt-4 w-full resize-y rounded-xl border border-stone-200/80 bg-white px-4 py-3.5 text-[13px] text-stone-800 placeholder-stone-400 outline-none transition-all focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
            />
            <NextButton onClick={() => setStep(4)} disabled={!fitnessRelation.trim()} />
          </div>
        );

      case 4:
        return (
          <div>
            <BackButton onClick={() => setStep(3)} />
            <h3 className="text-[15px] font-bold text-stone-800">
              Hvad er din største udfordring føler du? <span className="text-rose-400">*</span>
            </h3>
            <textarea
              value={challenge}
              onChange={(e) => setChallenge(e.target.value)}
              placeholder="Skriv her..."
              rows={4}
              className="mt-4 w-full resize-y rounded-xl border border-stone-200/80 bg-white px-4 py-3.5 text-[13px] text-stone-800 placeholder-stone-400 outline-none transition-all focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
            />
            <NextButton onClick={() => setStep(5)} disabled={!challenge.trim()} />
          </div>
        );

      case 5:
        return (
          <div>
            <BackButton onClick={() => setStep(4)} />
            <h3 className="text-[15px] font-bold text-stone-800">
              Hvor selvsikker føler du dig lige nu omkring din krop fra 1-5?{" "}
              <span className="text-rose-400">*</span>
            </h3>
            <div className="mt-4 space-y-2.5">
              {CONFIDENCE.map((c) => (
                <RadioOption
                  key={c}
                  label={c}
                  selected={confidence === c}
                  onClick={() => { setConfidence(c); setStep(6); }}
                />
              ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div>
            <BackButton onClick={() => setStep(5)} />
            <h3 className="text-[15px] font-bold text-stone-800">
              Hvor vigtigt er det for dig at opnå? <span className="text-rose-400">*</span>
            </h3>
            <textarea
              value={importance}
              onChange={(e) => setImportance(e.target.value)}
              placeholder="Skriv her..."
              rows={4}
              className="mt-4 w-full resize-y rounded-xl border border-stone-200/80 bg-white px-4 py-3.5 text-[13px] text-stone-800 placeholder-stone-400 outline-none transition-all focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
            />
            <NextButton onClick={() => setStep(7)} disabled={!importance.trim()} />
          </div>
        );

      case 7:
        return (
          <div>
            <BackButton onClick={() => setStep(6)} />
            <h3 className="text-[15px] font-bold text-stone-800">
              Jeg bruger utrolig meget tid på mine klienter, så derfor er det vigtigt jeg ved du
              har tænkt dig at tage telefonen hvis vi ringer eller du booker en tid.{" "}
              <span className="text-rose-400">*</span>
            </h3>
            <div className="mt-4 space-y-2.5">
              {COMMITMENT.map((c) => (
                <RadioOption
                  key={c}
                  label={c}
                  selected={commitment === c}
                  onClick={() => { setCommitment(c); setStep(8); }}
                />
              ))}
            </div>
          </div>
        );

      case 8:
        return (
          <div>
            <BackButton onClick={() => setStep(7)} />
            <h3 className="text-[15px] font-bold text-stone-800">
              Er du klar på at se resultater, eller har du ikke helt committet dig til dig selv
              endnu? <span className="text-rose-400">*</span>
            </h3>
            <div className="mt-4 space-y-2.5">
              {READINESS.map((r) => (
                <RadioOption
                  key={r}
                  label={r}
                  selected={readiness === r}
                  onClick={() => { setReadiness(r); setStep(9); }}
                />
              ))}
            </div>
          </div>
        );

      case 9:
        return (
          <div>
            <BackButton onClick={() => setStep(8)} />
            <h3 className="text-[15px] font-bold text-stone-800">
              Hvor har du hørt om mig?
            </h3>
            <div className="mt-4 space-y-2.5">
              {SOURCE.map((s) => (
                <RadioOption
                  key={s}
                  label={s}
                  selected={source === s}
                  onClick={() => { setSource(s); setStep(10); }}
                />
              ))}
            </div>
          </div>
        );

      case 10:
        return (
          <div>
            <BackButton onClick={() => setStep(9)} />
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-[13px] font-semibold text-stone-800">
                  Telefon <span className="text-rose-400">*</span>
                </label>
                <div className="mt-1 flex overflow-hidden rounded-xl border border-stone-200/80 bg-white transition-all focus-within:border-rose-300 focus-within:ring-2 focus-within:ring-rose-100">
                  <span className="flex items-center gap-1 border-r border-stone-200/80 px-3 text-[13px] text-stone-500">
                    🇩🇰 +45
                  </span>
                  <input
                    name="phone"
                    type="tel"
                    required
                    placeholder="Dit telefonnummer..."
                    className="w-full px-3 py-3.5 text-[13px] text-stone-800 placeholder-stone-400 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[13px] font-semibold text-stone-800">
                  Email <span className="text-rose-400">*</span>
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Din email..."
                  className="mt-1 w-full rounded-xl border border-stone-200/80 bg-white px-4 py-3.5 text-[13px] text-stone-800 placeholder-stone-400 outline-none transition-all focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                />
              </div>

              <div>
                <label className="text-[13px] font-semibold text-stone-800">
                  Fulde navn <span className="text-rose-400">*</span>
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Dit fulde navn..."
                  className="mt-1 w-full rounded-xl border border-stone-200/80 bg-white px-4 py-3.5 text-[13px] text-stone-800 placeholder-stone-400 outline-none transition-all focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                />
              </div>

              {formState === "error" && (
                <p className="text-[11px] text-red-500">Noget gik galt — prøv igen.</p>
              )}

              <button
                type="submit"
                disabled={formState === "sending"}
                className="w-full rounded-full bg-rose-400 py-3.5 text-[14px] font-semibold text-white shadow-md shadow-rose-200/50 transition-all hover:bg-rose-500 disabled:opacity-50"
              >
                {formState === "sending" ? "Sender…" : "Jeg er MAKS motiveret! 🍑"}
              </button>
            </form>
          </div>
        );

      case 11:
        return (
          <div className="py-6 text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-rose-50">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 text-rose-400">
                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-[15px] font-bold text-stone-800">Tak for din besked!</h3>
            <p className="mt-1.5 text-[12px] text-stone-500">Jeg vender tilbage hurtigst muligt.</p>
          </div>
        );

      default:
        return null;
    }
  }

  return (
    <section
      id="kontakt"
      aria-labelledby="cta-heading"
      className="relative overflow-hidden py-24 sm:py-32"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <img
          src="/images/coach/cta-bg.png"
          alt=""
          className="h-full w-full object-cover object-center opacity-[0.10]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#fdf6f2] via-transparent to-transparent" style={{ height: "30%" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#fdf6f2]/60 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-10">
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
              Besvar et par spørgsmål og udfyld dine oplysninger, så vender
              jeg tilbage med en plan der passer til dig.
            </p>
            <div className="mt-8 flex items-center gap-6 text-sm text-stone-500">
              <span className="flex items-center gap-1.5">
                <span className="text-base">&#10003;</span> Personlig opfølgning
              </span>
              <span className="flex items-center gap-1.5">
                <span>&#9825;</span> 100% fokus på dig
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
                        maskImage: "linear-gradient(to bottom, black 55%, transparent 98%)",
                        WebkitMaskImage: "linear-gradient(to bottom, black 55%, transparent 98%)",
                      }}
                    />
                  </div>

                  {/* Floating badges */}
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
                      <span className="text-xl font-bold text-stone-800">4.9</span>
                    </div>
                  </div>

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
                  {step <= TOTAL_STEPS && (
                    <div className="mb-3">
                      <div className="h-[3px] w-full overflow-hidden rounded-full bg-rose-100">
                        <div
                          className="h-full rounded-full bg-rose-400 transition-all duration-500"
                          style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
                        />
                      </div>
                      <p className="mt-1.5 text-center text-[11px] text-stone-400">
                        Trin {step} af {TOTAL_STEPS}
                      </p>
                    </div>
                  )}

                  {renderStep()}
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
