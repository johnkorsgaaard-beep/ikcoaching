export default function Footer() {
  return (
    <footer className="border-t border-rose-100 bg-white/50 py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-xs text-stone-400">
            &copy; {new Date().getFullYear()} IK Coaching. Alle rettigheder
            forbeholdes.
          </p>

          <div className="flex gap-6 text-xs text-stone-400">
            <a
              href="mailto:kontakt@ikcoaching.dk"
              className="transition-colors hover:text-rose-400"
            >
              kontakt@ikcoaching.dk
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
