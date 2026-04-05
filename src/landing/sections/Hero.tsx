export default function Hero() {
  return (
    <section aria-label="Intro" className="relative min-h-svh flex flex-col">
      {/* Header */}
      <header className="relative z-20 flex items-center justify-between px-6 py-5 sm:px-10">
        <a href="#" className="flex items-center gap-3">
          <img
            src="/images/coach/logo.png"
            alt="IK Coaching logo"
            className="h-10 w-auto sm:h-12"
          />
        </a>

        <a
          href="#kontakt"
          className="rounded-full border border-white/15 px-5 py-2 text-sm font-medium text-zinc-200 transition-all hover:border-rose-400/40 hover:text-white"
        >
          Kontakt
        </a>
      </header>

      {/* Center content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
        <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="block">Din forandring</span>
          <span className="block text-rose-400">starter her.</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg text-white/65 sm:text-xl">
          Personlig coaching med fokus på dig, din krop og dine mål.
          Sammen skaber vi de resultater, du fortjener.
        </p>

        <a
          href="#kontakt"
          className="mt-10 inline-flex items-center rounded-full bg-rose-400 px-8 py-3.5 text-base font-semibold text-black shadow-[0_0_32px_rgba(251,113,133,0.35)] transition-all hover:bg-rose-300 hover:scale-105 hover:shadow-[0_0_48px_rgba(251,113,133,0.45)]"
        >
          Kom i gang
        </a>
      </div>

      {/* Footer strip */}
      <div className="relative z-10 flex items-center justify-between px-6 py-6 sm:px-10">
        <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-zinc-500">
          IK Coaching
        </span>

        <a
          href="#kontakt"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition-colors hover:border-rose-400/30 hover:text-rose-400"
          aria-label="Skriv en besked"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}
