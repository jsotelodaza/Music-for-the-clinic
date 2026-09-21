export type HospitalShiftType = 'urgencias' | 'uci' | 'planta' | 'quirofano' | 'noche' | 'guardia24';

export type ShiftMoment = 
  | 'post-urgencia'
  | 'turno-noche'
  | 'foco-clinico'
  | 'antes-paciente'
  | 'alivio-fatiga'
  | 'cambio-turno';

export interface NoteEvent {
  note: string; // e.g. "C4", "G3", "Eb5"
  time: number; // time in seconds within the 60s snippet
  duration: number; // in seconds
  velocity?: number; // 0 to 1
  instrument?: 'piano' | 'strings' | 'flute';
}

export interface ClassicalPiece {
  id: string;
  title: string;
  composer: string;
  era: 'Barroco' | 'Clasicismo' | 'Romanticismo' | 'Impresionismo';
  year: string;
  moment: ShiftMoment;
  momentLabel: string;
  durationSeconds: number;
  clinicalBenefit: string;
  bpm: number;
  keySignature: string;
  audioUrl?: string; // High quality public domain audio recording
  melody: NoteEvent[]; // Synthetic fallback notes to guarantee 100% offline audio playback
  breathingPattern: {
    inhale: number; // seconds
    hold: number;
    exhale: number;
  };
  quote: string;
}

export type AmbientSound = 'none' | 'rain' | 'alpha-waves' | 'pink-noise';

export interface ShiftSessionLog {
  id: string;
  pieceId: string;
  pieceTitle: string;
  timestamp: string;
  durationSeconds: number;
  stressBefore: number; // 1 to 5
  stressAfter: number;  // 1 to 5
  shiftType: HospitalShiftType;
}
