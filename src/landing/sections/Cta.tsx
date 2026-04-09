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
          : "border-rose-300 bg-white text-stone-700 hover:border-rose-400 hover:bg-rose-50/40"
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

    const url = "/api/inbound-lead";

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
      className="relative pt-0 pb-4 sm:pb-6"
    >
      {/* Background image — extends below section */}
      <div className="absolute inset-x-0 top-0 -bottom-48 z-0" aria-hidden="true">
        <img
          src="/images/coach/cta-bg.png"
          alt=""
          className="h-full w-full object-cover object-center opacity-[0.10]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#fdf6f2] via-transparent to-transparent" style={{ height: "20%" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#fdf6f2]/60 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#fdf6f2] to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-10">
        <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-center lg:gap-16">
          {/* Left text */}
          <div className="flex-1 text-center lg:text-left">
            <div className="-mb-10 flex justify-center sm:-mb-20 lg:-mb-32 lg:justify-start lg:pl-12">
              <img
                src="/images/coach/logo-clean.png"
                alt="IK Coaching logo"
                className="h-32 w-auto sm:h-56 lg:h-96"
              />
            </div>
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
            <p className="mt-4 max-w-md text-base leading-relaxed text-stone-500 sm:text-lg lg:mx-0 mx-auto">
              Besvar et par spørgsmål og udfyld dine oplysninger, så vender
              jeg tilbage med en plan der passer til dig.
            </p>
            <div className="mt-6 flex items-center justify-center gap-6 text-sm text-stone-500 lg:justify-start">
              <span className="flex items-center gap-1.5">
                <span className="text-base">&#10003;</span> Personlig opfølgning
              </span>
              <span className="flex items-center gap-1.5">
                <span>&#9825;</span> 100% fokus på dig
              </span>
            </div>

            <a
              href="https://www.instagram.com/idakristoffersenn/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 mx-auto lg:mx-0 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-400 to-pink-400 px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-rose-200/50 transition-all hover:scale-105 hover:shadow-lg hover:shadow-rose-300/40"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
              Følg mig på Instagram
            </a>
          </div>

          {/* Phone mockup */}
          <div className="w-full max-w-[340px] flex-shrink-0 mt-6 lg:mt-10">
            <div className="relative mx-auto overflow-hidden rounded-[2.8rem] bg-stone-900 p-[5px] shadow-2xl shadow-stone-400/30">
              <div className="overflow-hidden rounded-[2.5rem] bg-white">
                {/* Notch */}
                <div className="relative flex justify-center">
                  <div className="absolute top-0 z-30 h-6 w-28 rounded-b-2xl bg-stone-900" />
                </div>

                {/* Coach photo */}
                <div className="relative overflow-hidden">
                  <img
                    src="/images/coach/ida-gym.png"
                    alt="IK Coaching"
                    className="h-80 w-full object-cover object-top"
                  />
                  <div className="absolute inset-x-0 bottom-0 z-[15] h-20 bg-gradient-to-t from-white to-transparent" />

                  {/* Floating badges */}
                  <div className="absolute left-3 top-[45%] z-20 -translate-y-1/2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/85 shadow-lg shadow-black/5 backdrop-blur-md">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-rose-400">
                        <path fillRule="evenodd" d="M10 3a.75.75 0 0 1 .75.75v10.638l3.96-3.96a.75.75 0 1 1 1.06 1.06l-5.25 5.25a.75.75 0 0 1-1.06 0l-5.25-5.25a.75.75 0 1 1 1.06-1.06l3.96 3.96V3.75A.75.75 0 0 1 10 3Z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>

                  <div className="absolute right-3 top-[45%] z-20 -translate-y-1/2">
                    <div className="flex items-center gap-1 rounded-xl bg-white/85 px-3 py-2 shadow-lg shadow-black/5 backdrop-blur-md">
                      <span className="text-sm text-amber-400">&#9733;</span>
                      <span className="text-lg font-bold text-stone-800">4.9</span>
                    </div>
                  </div>
                </div>

                {/* Social proof pills */}
                <div className="relative z-20 -mt-1.5 flex justify-center gap-2 px-4">
                  <div className="flex items-center gap-1.5 rounded-full bg-rose-400 px-3 py-1.5 text-[10px] font-medium text-white shadow-md shadow-rose-200/50">
                    <span>&#10003;</span> Personlig opfølgning
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full bg-rose-400 px-3 py-1.5 text-[10px] font-medium text-white shadow-md shadow-rose-200/50">
                    <span>&#9825;</span> 100% fokus på dig
                  </div>
                </div>

                {/* Form area */}
                <div className="px-4 pb-6 pt-4 min-h-[280px]">
                  {step <= TOTAL_STEPS && (
                    <div className="mb-2.5">
                      <div className="h-[3px] w-full overflow-hidden rounded-full bg-rose-100">
                        <div
                          className="h-full rounded-full bg-rose-400 transition-all duration-500"
                          style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
                        />
                      </div>
                      <p className="mt-1 text-center text-[10px] text-stone-400">
                        Trin {step} af {TOTAL_STEPS}
                      </p>
                    </div>
                  )}

                  {renderStep()}
                </div>

                {/* Home indicator */}
                <div className="flex justify-center pb-2">
                  <div className="h-1 w-20 rounded-full bg-stone-200" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
