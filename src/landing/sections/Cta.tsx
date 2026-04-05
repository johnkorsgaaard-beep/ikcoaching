import { useState } from "react";
import type { FormEvent } from "react";

type FormState = "idle" | "sending" | "sent" | "error";

export default function Cta() {
  const [state, setState] = useState<FormState>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: data.get("name") as string,
      email: data.get("email") as string,
      phone: data.get("phone") as string,
      message: (data.get("message") as string) || "",
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
      setState("sent");
      form.reset();
    } catch {
      setState("error");
    }
  }

  return (
    <section
      id="kontakt"
      aria-labelledby="cta-heading"
      className="border-t border-white/10 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-2xl px-6 lg:px-10">
        <div className="text-center">
          <h2
            id="cta-heading"
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Klar til at komme i gang?
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Udfyld formularen, så vender jeg tilbage hurtigst muligt.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.04] p-8 backdrop-blur-xl sm:p-10">
          {state === "sent" ? (
            <div className="rounded-xl border border-rose-400/30 bg-rose-400/10 px-6 py-8 text-center">
              <p className="text-lg font-medium text-rose-300">
                Tak for din besked!
              </p>
              <p className="mt-2 text-sm text-zinc-400">
                Jeg vender tilbage til dig hurtigst muligt.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-zinc-300"
                >
                  Navn
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="mt-2 w-full rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 outline-none transition-colors focus:border-rose-400/50 focus:ring-1 focus:ring-rose-400/30"
                  placeholder="Dit fulde navn"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-zinc-300"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-2 w-full rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 outline-none transition-colors focus:border-rose-400/50 focus:ring-1 focus:ring-rose-400/30"
                  placeholder="din@email.dk"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-zinc-300"
                >
                  Telefon
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="mt-2 w-full rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 outline-none transition-colors focus:border-rose-400/50 focus:ring-1 focus:ring-rose-400/30"
                  placeholder="+45 12 34 56 78"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-zinc-300"
                >
                  Foretrukne tidspunkter{" "}
                  <span className="text-zinc-500">(valgfrit)</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  className="mt-2 w-full resize-none rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 outline-none transition-colors focus:border-rose-400/50 focus:ring-1 focus:ring-rose-400/30"
                  placeholder="Fx morgen, eftermiddag, aften…"
                />
              </div>

              {state === "error" && (
                <p className="text-sm text-red-400">
                  Noget gik galt. Prøv igen, eller skriv direkte til{" "}
                  <a
                    href="mailto:kontakt@ikcoaching.dk"
                    className="underline hover:text-red-300"
                  >
                    kontakt@ikcoaching.dk
                  </a>
                </p>
              )}

              <button
                type="submit"
                disabled={state === "sending"}
                className="w-full rounded-full bg-rose-400 py-3.5 text-base font-semibold text-black shadow-[0_0_32px_rgba(251,113,133,0.25)] transition-all hover:bg-rose-300 hover:shadow-[0_0_48px_rgba(251,113,133,0.35)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {state === "sending" ? "Sender…" : "Kom i gang"}
              </button>
            </form>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-zinc-500">
          Eller skriv direkte til{" "}
          <a
            href="mailto:kontakt@ikcoaching.dk"
            className="text-rose-400/80 underline-offset-2 hover:underline"
          >
            kontakt@ikcoaching.dk
          </a>
        </p>
      </div>
    </section>
  );
}
