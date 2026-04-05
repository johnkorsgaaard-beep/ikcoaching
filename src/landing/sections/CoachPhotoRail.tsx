import { COACH_PHOTOS } from "./coachPhotos";

function PhotoCard({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative flex-shrink-0 w-72 sm:w-80 overflow-hidden rounded-2xl border border-white/[0.12]">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-auto w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
    </div>
  );
}

export default function CoachPhotoRail() {
  return (
    <section aria-label="Resultater" className="overflow-hidden py-16 sm:py-20">
      <div className="coach-photo-rail-track flex gap-6">
        {/* First strip */}
        {COACH_PHOTOS.map((photo, i) => (
          <PhotoCard key={`a-${i}`} src={photo.src} alt={photo.alt} />
        ))}

        {/* Duplicate for seamless loop */}
        <div className="coach-photo-rail-duplicate contents" aria-hidden="true">
          {COACH_PHOTOS.map((photo, i) => (
            <PhotoCard key={`b-${i}`} src={photo.src} alt={photo.alt} />
          ))}
        </div>
      </div>
    </section>
  );
}
