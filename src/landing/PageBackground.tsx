export default function PageBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
      {/* Base warm cream */}
      <div className="absolute inset-0 bg-[#fdf6f2]" />

      {/* Soft pink blob top-right */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 75% 0%, rgba(253,164,175,0.25) 0%, transparent 70%)",
        }}
      />

      {/* Blush blob left */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 10% 30%, rgba(251,207,232,0.30) 0%, transparent 65%)",
        }}
      />

      {/* Peach blob bottom-right */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 85% 80%, rgba(254,205,211,0.20) 0%, transparent 60%)",
        }}
      />

      {/* Lavender hint center */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 40% 35% at 50% 55%, rgba(232,218,239,0.18) 0%, transparent 60%)",
        }}
      />

      {/* Subtle grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
      }} />
    </div>
  );
}
