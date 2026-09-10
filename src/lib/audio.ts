"use client";

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let analyser: AnalyserNode | null = null;
let playingSources: AudioBufferSourceNode[] = [];
let oscillators: OscillatorNode[] = [];

export function getAnalyser() {
  return analyser;
}

export async function ensureAudio() {
  if (!ctx) {
    ctx = new AudioContext();
    master = ctx.createGain();
    master.gain.value = 0.22;
    analyser = ctx.createAnalyser();
    analyser.fftSize = 256;
    analyser.smoothingTimeConstant = 0.86;
    master.connect(analyser);
    analyser.connect(ctx.destination);
  }
  if (ctx.state === "suspended") await ctx.resume();
  return ctx;
}

export function setMasterEnabled(on: boolean) {
  if (!master || !ctx) return;
  master.gain.cancelScheduledValues(ctx.currentTime);
  master.gain.linearRampToValueAtTime(on ? 0.22 : 0, ctx.currentTime + 0.12);
}

export function stopAll() {
  for (const s of playingSources) {
    try {
      s.stop();
    } catch {
      /* already stopped */
    }
  }
  playingSources = [];
  for (const o of oscillators) {
    try {
      o.stop();
    } catch {
      /* already stopped */
    }
  }
  oscillators = [];
}

function midiToFreq(midi: number) {
  return 440 * 2 ** ((midi - 69) / 12);
}

export async function playTone(midi: number, duration = 0.55) {
  const audio = await ensureAudio();
  if (!master) return;
  const now = audio.currentTime;
  const osc = audio.createOscillator();
  const gain = audio.createGain();
  const filter = audio.createBiquadFilter();
  osc.type = "triangle";
  osc.frequency.value = midiToFreq(midi);
  filter.type = "lowpass";
  filter.frequency.value = 1800;
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.35, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  osc.connect(filter);
  filter.connect(gain);
  gain.connect(master);
  osc.start(now);
  osc.stop(now + duration + 0.05);
  oscillators.push(osc);
}

export async function playMelody(
  notes: { midi: number; t: number; d: number }[],
  onNote?: (midi: number) => void,
) {
  stopAll();
  const audio = await ensureAudio();
  if (!master) return;
  const start = audio.currentTime + 0.05;
  for (const note of notes) {
    const osc = audio.createOscillator();
    const gain = audio.createGain();
    const filter = audio.createBiquadFilter();
    osc.type = "triangle";
    osc.frequency.value = midiToFreq(note.midi);
    filter.type = "lowpass";
    filter.frequency.value = 2200;
    const t0 = start + note.t;
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(0.32, t0 + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + note.d);
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    osc.start(t0);
    osc.stop(t0 + note.d + 0.08);
    oscillators.push(osc);
    if (onNote) {
      window.setTimeout(() => onNote(note.midi), note.t * 1000);
    }
  }
}

export function readAmplitude() {
  if (!analyser) return 0;
  const data = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteTimeDomainData(data);
  let sum = 0;
  for (let i = 0; i < data.length; i += 1) {
    const v = (data[i] - 128) / 128;
    sum += v * v;
  }
  return Math.sqrt(sum / data.length);
}
