export default function Hero() {
  return (
    <section aria-label="Intro" className="relative min-h-svh flex flex-col">
      <header className="relative z-20 flex items-center justify-between px-6 py-5 sm:px-10">
        <a href="#" className="flex items-center gap-3">
          <img
            src="/images/coach/logo.png"
            alt="IK Coaching logo"
            className="h-14 w-auto mix-blend-multiply sm:h-16 lg:h-20"
          />
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium text-stone-500 sm:flex">
          <a href="#om" className="transition-colors hover:text-rose-400">Om mig</a>
          <a href="#tilbud" className="transition-colors hover:text-rose-400">Tilbud</a>
          <a href="#udtalelser" className="transition-colors hover:text-rose-400">Udtalelser</a>
        </nav>

        <a
          href="#kontakt"
          className="rounded-full bg-rose-400 px-5 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-rose-500 hover:shadow-md"
        >
          Kontakt
        </a>
      </header>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
        <span className="mb-5 inline-block rounded-full border border-rose-200 bg-rose-50 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-rose-400">
          Personlig coaching
        </span>

        <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-stone-800 sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="block">Din forandring</span>
          <span className="block bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">
            starter her.
          </span>
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone-500 sm:text-xl">
          Personlig coaching med fokus på dig, din krop og dine mål.
          Sammen skaber vi de resultater, du fortjener.
        </p>

        <a
          href="#kontakt"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-rose-400 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-rose-200/50 transition-all hover:bg-rose-500 hover:scale-105 hover:shadow-xl hover:shadow-rose-300/40"
        >
          Kom i gang
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638l-3.96-3.72a.75.75 0 1 1 1.024-1.1l5.25 4.93a.75.75 0 0 1 0 1.1l-5.25 4.93a.75.75 0 0 1-1.024-1.1l3.96-3.72H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
          </svg>
        </a>
      </div>

      <div className="relative z-10 flex items-center justify-center px-6 py-8">
        <a
          href="#om"
          className="flex flex-col items-center gap-2 text-stone-400 transition-colors hover:text-rose-400"
          aria-label="Scroll ned"
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.2em]">Scroll</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 animate-bounce">
            <path fillRule="evenodd" d="M10 3a.75.75 0 0 1 .75.75v10.638l3.96-3.96a.75.75 0 1 1 1.06 1.06l-5.25 5.25a.75.75 0 0 1-1.06 0l-5.25-5.25a.75.75 0 1 1 1.06-1.06l3.96 3.96V3.75A.75.75 0 0 1 10 3Z" clipRule="evenodd" />
          </svg>
        </a>
      </div>
    </section>
  );
}
