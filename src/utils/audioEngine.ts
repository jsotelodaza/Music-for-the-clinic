import { AmbientSound, ClassicalPiece, NoteEvent } from '../types';

// Convert note name to frequency in Hz (e.g. "C4" -> 261.63, "F#3" -> 185.0, "Bb4" -> 466.16)
export function noteToFrequency(note: string): number {
  const noteRegex = /^([A-G][#b]?)(-?\d+)$/;
  const match = note.trim().match(noteRegex);
  if (!match) return 440;

  const pitch = match[1];
  const octave = parseInt(match[2], 10);

  const semitones: Record<string, number> = {
    'C': -9, 'C#': -8, 'Db': -8,
    'D': -7, 'D#': -6, 'Eb': -6,
    'E': -5,
    'F': -4, 'F#': -3, 'Gb': -3,
    'G': -2, 'G#': -1, 'Ab': -1,
    'A': 0, 'A#': 1, 'Bb': 1,
    'B': 2
  };

  const semitoneOffset = semitones[pitch] ?? 0;
  // A4 is 440Hz, octave 4
  const stepsFromA4 = semitoneOffset + (octave - 4) * 12;
  return 440 * Math.pow(2, stepsFromA4 / 12);
}

class HospitalAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private currentAudioElement: HTMLAudioElement | null = null;
  private activeOscillators: { stop: () => void }[] = [];
  private ambientNodes: { stop: () => void }[] = [];
  private isPlaying = false;
  private isPaused = false;
  private pauseTime = 0;
  private startTime = 0;
  private activePiece: ClassicalPiece | null = null;
  private activeAmbient: AmbientSound = 'none';
  private currentVolume = 0.8;
  private progressInterval: number | null = null;
  private onProgressCallback: ((currentTime: number, duration: number) => void) | null = null;
  private onEndedCallback: (() => void) | null = null;
  private scheduledTimeouts: number[] = [];

  private getContext(): AudioContext {
    if (!this.ctx || this.ctx.state === 'closed') {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    if (!this.masterGain && this.ctx) {
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.currentVolume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    return this.ctx;
  }

  public setVolume(vol: number) {
    this.currentVolume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.currentVolume, this.ctx.currentTime, 0.05);
    }
    if (this.currentAudioElement) {
      this.currentAudioElement.volume = this.currentVolume;
    }
  }

  public async playPiece(
    piece: ClassicalPiece,
    ambient: AmbientSound = 'none',
    volume = 0.8,
    onProgress?: (currentTime: number, duration: number) => void,
    onEnded?: () => void
  ): Promise<void> {
    this.stop(); // Clear any existing playing state
    this.activePiece = piece;
    this.activeAmbient = ambient;
    this.currentVolume = volume;
    this.onProgressCallback = onProgress || null;
    this.onEndedCallback = onEnded || null;
    this.isPlaying = true;
    this.isPaused = false;
    this.startTime = Date.now();
    this.pauseTime = 0;

    const ctx = this.getContext();
    if (this.masterGain) {
      this.masterGain.gain.setValueAtTime(this.currentVolume, ctx.currentTime);
    }

    // Start ambient background if requested
    this.startAmbient(ambient);

    // Try playing real recorded audio snippet if available
    let streamSucceeded = false;
    if (piece.audioUrl) {
      try {
        streamSucceeded = await this.playAudioStream(piece.audioUrl);
      } catch (err) {
        console.warn('Audio stream playback failed, seamlessly switching to synthesis:', err);
        streamSucceeded = false;
      }
    }

    // Fallback: If no audio stream or stream errored out, synthesize note events
    if (!streamSucceeded) {
      this.playSyntheticMelody(piece.melody);
    }

    // Start 60-second progress tracking loop
    this.startProgressTracking(piece.durationSeconds || 60);
  }

  private playAudioStream(url: string): Promise<boolean> {
    return new Promise((resolve) => {
      const audio = new Audio();
      audio.crossOrigin = 'anonymous';
      audio.src = url;
      audio.volume = 0.01; // Start low for smooth hospital fade-in

      let hasResolved = false;

      const finishResolve = (success: boolean) => {
        if (!hasResolved) {
          hasResolved = true;
          resolve(success);
        }
      };

      // Set timeout for stream response
      const streamTimeout = window.setTimeout(() => {
        if (!hasResolved) {
          audio.pause();
          finishResolve(false);
        }
      }, 3500);

      audio.oncanplay = () => {
        window.clearTimeout(streamTimeout);
        audio.play().then(() => {
          this.currentAudioElement = audio;
          // Smooth 2s fade in
          let step = 0;
          const fadeInterval = window.setInterval(() => {
            step += 0.05;
            if (step >= this.currentVolume || !this.isPlaying) {
              if (this.isPlaying) audio.volume = this.currentVolume;
              window.clearInterval(fadeInterval);
            } else {
              audio.volume = step;
            }
          }, 80);
          finishResolve(true);
        }).catch(() => {
          finishResolve(false);
        });
      };

      audio.onerror = () => {
        window.clearTimeout(streamTimeout);
        finishResolve(false);
      };
    });
  }

  private playSyntheticMelody(notes: NoteEvent[]) {
    const ctx = this.getContext();
    const now = ctx.currentTime + 0.1;

    // Create a gentle hospital-safe reverb / delay bus
    const delay = ctx.createDelay();
    delay.delayTime.value = 0.28;
    const delayFeedback = ctx.createGain();
    delayFeedback.gain.value = 0.35;
    const delayFilter = ctx.createBiquadFilter();
    delayFilter.type = 'lowpass';
    delayFilter.frequency.value = 1600;

    delay.connect(delayFeedback);
    delayFeedback.connect(delayFilter);
    delayFilter.connect(delay);
    delayFilter.connect(this.masterGain!);

    notes.forEach((event) => {
      const noteTime = now + event.time;
      if (noteTime >= now + 62) return; // limit to snippet length

      const freq = noteToFrequency(event.note);
      const duration = event.duration || 1.5;
      const vel = (event.velocity || 0.7) * 0.45; // balanced level

      // Fundamental tone + gentle warm overtone
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const noteGain = ctx.createGain();
      const noteFilter = ctx.createBiquadFilter();

      // Timbre selection: Warm felt piano or velvety strings
      if (event.instrument === 'strings') {
        osc1.type = 'sawtooth';
        osc2.type = 'triangle';
        noteFilter.type = 'lowpass';
        noteFilter.frequency.setValueAtTime(800, noteTime);
        noteFilter.frequency.exponentialRampToValueAtTime(1400, noteTime + 0.5);

        // Slow soft attack for strings
        noteGain.gain.setValueAtTime(0.0001, noteTime);
        noteGain.gain.linearRampToValueAtTime(vel, noteTime + 0.35);
        noteGain.gain.setValueAtTime(vel, noteTime + duration - 0.4);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, noteTime + duration);
      } else {
        // Acoustic warm piano
        osc1.type = 'triangle';
        osc2.type = 'sine';
        noteFilter.type = 'lowpass';
        noteFilter.frequency.setValueAtTime(2400, noteTime);
        noteFilter.frequency.exponentialRampToValueAtTime(450, noteTime + duration);

        // Piano percussive yet soft attack
        noteGain.gain.setValueAtTime(0.0001, noteTime);
        noteGain.gain.linearRampToValueAtTime(vel, noteTime + 0.035);
        noteGain.gain.exponentialRampToValueAtTime(vel * 0.45, noteTime + 0.35);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, noteTime + duration);
      }

      osc1.frequency.setValueAtTime(freq, noteTime);
      osc2.frequency.setValueAtTime(freq * 2, noteTime); // subtle octave shimmer
      osc2.detune.setValueAtTime(4, noteTime); // slight chorus warm detuning

      osc1.connect(noteFilter);
      osc2.connect(noteFilter);
      noteFilter.connect(noteGain);
      noteGain.connect(this.masterGain!);
      noteGain.connect(delay);

      try {
        osc1.start(noteTime);
        osc2.start(noteTime);
        osc1.stop(noteTime + duration + 0.2);
        osc2.stop(noteTime + duration + 0.2);

        this.activeOscillators.push({
          stop: () => {
            try {
              osc1.stop();
              osc2.stop();
            } catch {
              // Ignore if already stopped
            }
          }
        });
      } catch {
        // Context might be closed
      }
    });
  }

  // Generates therapeutic background soundscapes for masking monitor beeps
  private startAmbient(type: AmbientSound) {
    if (type === 'none') return;
    const ctx = this.getContext();

    if (type === 'alpha-waves') {
      // 10Hz Binaural tone difference (210Hz L, 220Hz R) for deep alertness & calm
      const merger = ctx.createChannelMerger(2);
      const oscL = ctx.createOscillator();
      const oscR = ctx.createOscillator();
      const ambGain = ctx.createGain();

      oscL.frequency.value = 210;
      oscR.frequency.value = 220;
      ambGain.gain.value = 0.06; // very subtle

      oscL.connect(merger, 0, 0);
      oscR.connect(merger, 0, 1);
      merger.connect(ambGain);
      ambGain.connect(this.masterGain!);

      oscL.start();
      oscR.start();

      this.ambientNodes.push({
        stop: () => {
          try {
            oscL.stop();
            oscR.stop();
          } catch {}
        }
      });
    } else if (type === 'rain' || type === 'pink-noise') {
      // Procedural buffer generator
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);

      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Paul Kellet's filter for pink noise
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.05;
        b6 = white * 0.115926;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = type === 'rain' ? 'bandpass' : 'lowpass';
      filter.frequency.value = type === 'rain' ? 850 : 450;
      filter.Q.value = type === 'rain' ? 1.2 : 0.7;

      const ambGain = ctx.createGain();
      ambGain.gain.value = type === 'rain' ? 0.08 : 0.05;

      whiteNoise.connect(filter);
      filter.connect(ambGain);
      ambGain.connect(this.masterGain!);

      whiteNoise.start();
      this.ambientNodes.push({
        stop: () => {
          try {
            whiteNoise.stop();
          } catch {}
        }
      });
    }
  }

  private startProgressTracking(totalDuration: number) {
    if (this.progressInterval) {
      window.clearInterval(this.progressInterval);
    }

    this.progressInterval = window.setInterval(() => {
      if (!this.isPlaying || this.isPaused) return;

      const elapsed = (Date.now() - this.startTime) / 1000;
      if (this.onProgressCallback) {
        this.onProgressCallback(Math.min(elapsed, totalDuration), totalDuration);
      }

      // Smooth fade out in the last 3 seconds
      if (elapsed >= totalDuration - 3 && this.currentAudioElement && this.currentAudioElement.volume > 0.05) {
        this.currentAudioElement.volume = Math.max(0.01, this.currentAudioElement.volume - 0.08);
      }

      if (elapsed >= totalDuration) {
        this.finishSession();
      }
    }, 150);
  }

  private finishSession() {
    this.stop();
    this.playChime(); // Gentle completion chime
    if (this.onEndedCallback) {
      this.onEndedCallback();
    }
  }

  public pause() {
    if (!this.isPlaying || this.isPaused) return;
    this.isPaused = true;
    this.pauseTime = Date.now();
    if (this.currentAudioElement) {
      this.currentAudioElement.pause();
    }
    if (this.ctx && this.ctx.state === 'running') {
      this.ctx.suspend().catch(() => {});
    }
  }

  public resume() {
    if (!this.isPlaying || !this.isPaused) return;
    this.isPaused = false;
    const pausedDuration = Date.now() - this.pauseTime;
    this.startTime += pausedDuration;

    if (this.currentAudioElement) {
      this.currentAudioElement.play().catch(() => {});
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public stop() {
    this.isPlaying = false;
    this.isPaused = false;

    if (this.progressInterval) {
      window.clearInterval(this.progressInterval);
      this.progressInterval = null;
    }

    this.scheduledTimeouts.forEach((t) => window.clearTimeout(t));
    this.scheduledTimeouts = [];

    if (this.currentAudioElement) {
      this.currentAudioElement.pause();
      this.currentAudioElement.removeAttribute('src');
      this.currentAudioElement = null;
    }

    this.activeOscillators.forEach((o) => o.stop());
    this.activeOscillators = [];

    this.ambientNodes.forEach((a) => a.stop());
    this.ambientNodes = [];
  }

  // Plays a soothing Tibetan/celeste chime when the 1-minute break concludes or reminder fires
  public playChime() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      // Soft dual harmonic chime (E5 and B5)
      [659.25, 987.77, 1318.5].forEach((f, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now);

        const v = 0.18 / (idx + 1);
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(v, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 3.0);
      });
    } catch {
      // AudioContext unavailable
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying && !this.isPaused;
  }

  public getIsPaused(): boolean {
    return this.isPaused;
  }
}

export const audioEngine = new HospitalAudioEngine();
