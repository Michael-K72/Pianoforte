import type { Locale } from "@/content/academy";

export type CameraMode = "hero" | "song" | "explorer" | "lid" | "concert";
export type SongId = "elise" | "bach" | "mozart" | "chopin" | "debussy";

export type Song = {
  id: SongId;
  composer: string;
  title: string;
  notes: { midi: number; t: number; d: number }[];
};

export const songs: Song[] = [
  {
    id: "elise",
    composer: "Beethoven",
    title: "Für Elise",
    notes: [
      { midi: 76, t: 0, d: 0.18 },
      { midi: 75, t: 0.2, d: 0.18 },
      { midi: 76, t: 0.4, d: 0.18 },
      { midi: 75, t: 0.6, d: 0.18 },
      { midi: 76, t: 0.8, d: 0.18 },
      { midi: 71, t: 1.0, d: 0.18 },
      { midi: 74, t: 1.2, d: 0.18 },
      { midi: 72, t: 1.4, d: 0.22 },
      { midi: 69, t: 1.7, d: 0.7 },
    ],
  },
  {
    id: "bach",
    composer: "Bach",
    title: "Präludium in C",
    notes: [
      { midi: 60, t: 0, d: 0.22 },
      { midi: 64, t: 0.18, d: 0.22 },
      { midi: 67, t: 0.36, d: 0.22 },
      { midi: 72, t: 0.54, d: 0.22 },
      { midi: 76, t: 0.72, d: 0.22 },
      { midi: 67, t: 0.9, d: 0.22 },
      { midi: 72, t: 1.08, d: 0.22 },
      { midi: 76, t: 1.26, d: 0.5 },
    ],
  },
  {
    id: "mozart",
    composer: "Mozart",
    title: "Sonate C-Dur",
    notes: [
      { midi: 72, t: 0, d: 0.16 },
      { midi: 76, t: 0.16, d: 0.16 },
      { midi: 79, t: 0.32, d: 0.28 },
      { midi: 76, t: 0.64, d: 0.16 },
      { midi: 72, t: 0.8, d: 0.16 },
      { midi: 67, t: 0.96, d: 0.4 },
    ],
  },
  {
    id: "chopin",
    composer: "Chopin",
    title: "Nocturne",
    notes: [
      { midi: 70, t: 0, d: 0.55 },
      { midi: 68, t: 0.55, d: 0.18 },
      { midi: 70, t: 0.75, d: 0.45 },
      { midi: 65, t: 1.25, d: 0.7 },
    ],
  },
  {
    id: "debussy",
    composer: "Debussy",
    title: "Clair de Lune",
    notes: [
      { midi: 69, t: 0, d: 0.7 },
      { midi: 65, t: 0.35, d: 0.7 },
      { midi: 61, t: 0.7, d: 0.85 },
      { midi: 72, t: 1.4, d: 1.1 },
    ],
  },
];

export type ExperienceState = {
  locale: Locale;
  audioEnabled: boolean;
  playing: boolean;
  songId: SongId | null;
  camera: CameraMode;
  lidOpen: boolean;
  fallboardOpen: boolean;
  menuOpen: boolean;
  analyser: AnalyserNode | null;
  amplitude: number;
};

export const initialExperience = {
  audioEnabled: false,
  playing: false,
  songId: null as SongId | null,
  camera: "hero" as CameraMode,
  lidOpen: false,
  fallboardOpen: false,
  menuOpen: false,
  analyser: null as AnalyserNode | null,
  amplitude: 0,
};
