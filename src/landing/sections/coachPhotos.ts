interface CoachPhoto {
  src: string;
  alt: string;
  lane: number;
}

const RAW_PHOTOS: CoachPhoto[] = [
  {
    src: "/images/coach/transformation-1.png",
    alt: "Vægttab resultat — 6 uger, -3,3 kg",
    lane: 1,
  },
  {
    src: "/images/coach/transformation-2.png",
    alt: "Vægttab resultat — 4 uger, -2,1 kg",
    lane: 2,
  },
  {
    src: "/images/coach/transformation-3.png",
    alt: "Vægttab resultat — 3 uger, -2,8 kg",
    lane: 3,
  },
  {
    src: "/images/coach/transformation-1.png",
    alt: "Transformation — 6 uger",
    lane: 1,
  },
  {
    src: "/images/coach/transformation-2.png",
    alt: "Transformation — 4 uger",
    lane: 2,
  },
  {
    src: "/images/coach/transformation-3.png",
    alt: "Transformation — 3 uger",
    lane: 3,
  },
];

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const result = [...arr];
  let s = seed;
  for (let i = result.length - 1; i > 0; i--) {
    s = (s * 16807 + 0) % 2147483647;
    const j = s % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export const COACH_PHOTOS = seededShuffle(RAW_PHOTOS, 42);
