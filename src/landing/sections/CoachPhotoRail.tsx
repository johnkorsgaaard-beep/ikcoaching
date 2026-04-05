import { COACH_PHOTOS } from "./coachPhotos";

function PhotoCard({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative flex-shrink-0 w-72 sm:w-80 overflow-hidden rounded-2xl bg-white shadow-lg shadow-rose-100/60 ring-1 ring-black/5">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-auto w-full object-cover"
      />
    </div>
  );
}

export default function CoachPhotoRail() {
  return (
    <section aria-label="Resultater" className="overflow-hidden py-16 sm:py-20">
      <div className="mb-10 text-center">
        <span className="inline-block rounded-full border border-rose-200 bg-rose-50 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-rose-400">
          Resultater
        </span>
      </div>

      <div className="coach-photo-rail-track flex gap-6">
        {COACH_PHOTOS.map((photo, i) => (
          <PhotoCard key={`a-${i}`} src={photo.src} alt={photo.alt} />
        ))}

        <div className="coach-photo-rail-duplicate contents" aria-hidden="true">
          {COACH_PHOTOS.map((photo, i) => (
            <PhotoCard key={`b-${i}`} src={photo.src} alt={photo.alt} />
          ))}
        </div>
      </div>
    </section>
  );
}
