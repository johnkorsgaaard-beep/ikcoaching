export default function PageBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
      <video
        className="hero-bg-video absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        src="/bggheader.mp4"
      />

      <div className="absolute inset-0 bg-black/50" />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(253,164,175,0.10) 0%, transparent 70%), " +
            "radial-gradient(ellipse 50% 50% at 80% 20%, rgba(251,113,133,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="absolute inset-0 bg-[#06080a]/72 backdrop-blur-[1px]" />

      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-black/30 to-transparent" />
    </div>
  );
}
