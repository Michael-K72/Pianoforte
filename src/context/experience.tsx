"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Locale } from "@/content/academy";
import {
  initialExperience,
  songs,
  type CameraMode,
  type SongId,
} from "@/lib/experience";
import {
  ensureAudio,
  playMelody,
  playTone,
  setMasterEnabled,
  stopAll,
} from "@/lib/audio";

type ExperienceContextValue = {
  locale: Locale;
  audioEnabled: boolean;
  playing: boolean;
  songId: SongId | null;
  camera: CameraMode;
  lidOpen: boolean;
  fallboardOpen: boolean;
  menuOpen: boolean;
  amplitude: number;
  pressedKey: number | null;
  setMenuOpen: (open: boolean) => void;
  setCamera: (mode: CameraMode) => void;
  toggleLid: () => void;
  toggleFallboard: () => void;
  toggleAudio: () => Promise<void>;
  playSong: (id: SongId) => Promise<void>;
  pauseSong: () => void;
  pressKey: (midi: number) => Promise<void>;
  setAmplitude: (value: number) => void;
};

const ExperienceContext = createContext<ExperienceContextValue | null>(null);

export function ExperienceProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const [audioEnabled, setAudioEnabled] = useState(initialExperience.audioEnabled);
  const [playing, setPlaying] = useState(false);
  const [songId, setSongId] = useState<SongId | null>(null);
  const [camera, setCamera] = useState<CameraMode>("hero");
  const [lidOpen, setLidOpen] = useState(false);
  const [fallboardOpen, setFallboardOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [amplitude, setAmplitude] = useState(0);
  const [pressedKey, setPressedKey] = useState<number | null>(null);
  const keyTimer = useRef<number | null>(null);

  const toggleAudio = useCallback(async () => {
    await ensureAudio();
    setAudioEnabled((current) => {
      const next = !current;
      setMasterEnabled(next);
      if (!next) {
        stopAll();
        setPlaying(false);
      }
      return next;
    });
  }, []);

  const playSong = useCallback(async (id: SongId) => {
    const song = songs.find((item) => item.id === id);
    if (!song) return;
    await ensureAudio();
    setAudioEnabled(true);
    setMasterEnabled(true);
    setSongId(id);
    setPlaying(true);
    setCamera("song");
    await playMelody(song.notes, (midi) => {
      setPressedKey(midi);
      if (keyTimer.current) window.clearTimeout(keyTimer.current);
      keyTimer.current = window.setTimeout(() => setPressedKey(null), 180);
    });
  }, []);

  const pauseSong = useCallback(() => {
    stopAll();
    setPlaying(false);
  }, []);

  const pressKey = useCallback(async (midi: number) => {
    await ensureAudio();
    setAudioEnabled(true);
    setMasterEnabled(true);
    setPressedKey(midi);
    await playTone(midi, 0.7);
    if (keyTimer.current) window.clearTimeout(keyTimer.current);
    keyTimer.current = window.setTimeout(() => setPressedKey(null), 220);
  }, []);

  const value = useMemo(
    () => ({
      locale,
      audioEnabled,
      playing,
      songId,
      camera,
      lidOpen,
      fallboardOpen,
      menuOpen,
      amplitude,
      pressedKey,
      setMenuOpen,
      setCamera,
      toggleLid: () => setLidOpen((open) => !open),
      toggleFallboard: () => setFallboardOpen((open) => !open),
      toggleAudio,
      playSong,
      pauseSong,
      pressKey,
      setAmplitude,
    }),
    [
      locale,
      audioEnabled,
      playing,
      songId,
      camera,
      lidOpen,
      fallboardOpen,
      menuOpen,
      amplitude,
      pressedKey,
      toggleAudio,
      playSong,
      pauseSong,
      pressKey,
    ],
  );

  return (
    <ExperienceContext.Provider value={value}>{children}</ExperienceContext.Provider>
  );
}

export function useExperience() {
  const value = useContext(ExperienceContext);
  if (!value) throw new Error("useExperience must be used within ExperienceProvider");
  return value;
}
