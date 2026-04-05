export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#040506] py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-xs text-zinc-500">
            &copy; {new Date().getFullYear()} IK Coaching. Alle rettigheder
            forbeholdes.
          </p>

          <div className="flex gap-6 text-xs text-zinc-500">
            <a
              href="mailto:kontakt@ikcoaching.dk"
              className="transition-colors hover:text-zinc-300"
            >
              kontakt@ikcoaching.dk
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
