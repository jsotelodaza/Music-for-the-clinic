import { ClassicalPiece, ShiftMoment } from '../types';

export const CLASSICAL_PIECES: ClassicalPiece[] = [
  {
    id: 'debussy-clair-de-lune',
    title: 'Clair de Lune (Suite Bergamasque)',
    composer: 'Claude Debussy',
    era: 'Impresionismo',
    year: '1890',
    moment: 'post-urgencia',
    momentLabel: 'Pausa tras Urgencia',
    durationSeconds: 60,
    clinicalBenefit: 'Disminuye la hiperreactividad sensorial provocada por alarmas de monitores y pitidos constantes.',
    bpm: 50,
    keySignature: 'Re bemol Mayor',
    audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Clair_de_lune_%28Claude_Debussy%29_Suite_bergamasque.ogg',
    breathingPattern: { inhale: 4, hold: 2, exhale: 5 },
    quote: 'La música es el silencio entre las notas.',
    melody: [
      // F-Eb-Db arpeggiated dreamy theme
      { note: 'F5', time: 0.5, duration: 1.8, velocity: 0.7, instrument: 'piano' },
      { note: 'Eb5', time: 2.3, duration: 1.6, velocity: 0.65, instrument: 'piano' },
      { note: 'Db5', time: 4.0, duration: 2.0, velocity: 0.7, instrument: 'piano' },
      { note: 'Ab4', time: 6.2, duration: 2.2, velocity: 0.6, instrument: 'piano' },
      { note: 'Db3', time: 0.5, duration: 4.5, velocity: 0.5, instrument: 'piano' },
      { note: 'Ab3', time: 2.0, duration: 4.0, velocity: 0.45, instrument: 'piano' },
      { note: 'F4', time: 3.5, duration: 3.0, velocity: 0.5, instrument: 'piano' },
      
      { note: 'F5', time: 8.5, duration: 1.8, velocity: 0.7, instrument: 'piano' },
      { note: 'Eb5', time: 10.3, duration: 1.6, velocity: 0.65, instrument: 'piano' },
      { note: 'Db5', time: 12.0, duration: 2.2, velocity: 0.7, instrument: 'piano' },
      { note: 'C5', time: 14.3, duration: 1.8, velocity: 0.6, instrument: 'piano' },
      { note: 'Bb4', time: 16.2, duration: 2.5, velocity: 0.65, instrument: 'piano' },
      { note: 'Gb3', time: 8.5, duration: 5.0, velocity: 0.5, instrument: 'piano' },
      { note: 'Db4', time: 10.0, duration: 4.0, velocity: 0.45, instrument: 'piano' },

      { note: 'Ab5', time: 19.0, duration: 2.5, velocity: 0.75, instrument: 'piano' },
      { note: 'Gb5', time: 21.6, duration: 1.8, velocity: 0.7, instrument: 'piano' },
      { note: 'F5', time: 23.5, duration: 2.0, velocity: 0.65, instrument: 'piano' },
      { note: 'Eb5', time: 25.6, duration: 2.2, velocity: 0.6, instrument: 'piano' },
      { note: 'Db5', time: 28.0, duration: 3.0, velocity: 0.7, instrument: 'piano' },
      { note: 'F3', time: 19.0, duration: 5.5, velocity: 0.5, instrument: 'piano' },
      { note: 'Db4', time: 21.0, duration: 4.5, velocity: 0.45, instrument: 'piano' },

      { note: 'C5', time: 31.5, duration: 2.0, velocity: 0.65, instrument: 'piano' },
      { note: 'Bb4', time: 33.6, duration: 2.0, velocity: 0.6, instrument: 'piano' },
      { note: 'Ab4', time: 35.8, duration: 2.5, velocity: 0.7, instrument: 'piano' },
      { note: 'Gb4', time: 38.5, duration: 2.5, velocity: 0.6, instrument: 'piano' },
      { note: 'F4', time: 41.2, duration: 3.5, velocity: 0.65, instrument: 'piano' },
      { note: 'Bb2', time: 31.5, duration: 6.0, velocity: 0.5, instrument: 'piano' },
      { note: 'F3', time: 34.0, duration: 5.0, velocity: 0.45, instrument: 'piano' },

      { note: 'Db5', time: 45.0, duration: 3.0, velocity: 0.7, instrument: 'piano' },
      { note: 'Ab4', time: 48.2, duration: 2.5, velocity: 0.6, instrument: 'piano' },
      { note: 'F4', time: 51.0, duration: 3.0, velocity: 0.55, instrument: 'piano' },
      { note: 'Db4', time: 54.2, duration: 4.5, velocity: 0.5, instrument: 'piano' },
      { note: 'Db2', time: 45.0, duration: 8.0, velocity: 0.45, instrument: 'piano' },
      { note: 'Ab2', time: 48.0, duration: 6.0, velocity: 0.4, instrument: 'piano' }
    ]
  },
  {
    id: 'satie-gymnopedie-1',
    title: 'Gymnopédie No. 1 (Lent et douloureux)',
    composer: 'Erik Satie',
    era: 'Impresionismo',
    year: '1888',
    moment: 'turno-noche',
    momentLabel: 'Guardia Nocturna',
    durationSeconds: 60,
    clinicalBenefit: 'Su métrica hipnótica de 3/4 y acordes suspendidos desaceleran el pulso y calman el agotamiento mental.',
    bpm: 46,
    keySignature: 'Re Mayor',
    audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Erik_Satie_-_Gymnopedie_No_1.ogg',
    breathingPattern: { inhale: 4, hold: 2, exhale: 4 },
    quote: 'La serenidad no es la ausencia de caos, sino la paz en medio de él.',
    melody: [
      // Bass G / Chord
      { note: 'G2', time: 0.5, duration: 1.5, velocity: 0.6, instrument: 'piano' },
      { note: 'B3', time: 1.2, duration: 1.5, velocity: 0.45, instrument: 'piano' },
      { note: 'D4', time: 1.2, duration: 1.5, velocity: 0.45, instrument: 'piano' },
      { note: 'F#4', time: 1.2, duration: 1.5, velocity: 0.45, instrument: 'piano' },
      // Bass D / Chord
      { note: 'D3', time: 2.5, duration: 1.5, velocity: 0.6, instrument: 'piano' },
      { note: 'A3', time: 3.2, duration: 1.5, velocity: 0.45, instrument: 'piano' },
      { note: 'C#4', time: 3.2, duration: 1.5, velocity: 0.45, instrument: 'piano' },
      { note: 'F#4', time: 3.2, duration: 1.5, velocity: 0.45, instrument: 'piano' },

      // Melody enters: F#4 - A4 - G4 - F#4 - C#4 - B3 - C#4 - D4
      { note: 'G2', time: 4.8, duration: 1.5, velocity: 0.6, instrument: 'piano' },
      { note: 'B3', time: 5.5, duration: 1.5, velocity: 0.45, instrument: 'piano' },
      { note: 'D4', time: 5.5, duration: 1.5, velocity: 0.45, instrument: 'piano' },
      { note: 'F#4', time: 5.8, duration: 2.5, velocity: 0.75, instrument: 'piano' },

      { note: 'D3', time: 7.2, duration: 1.5, velocity: 0.6, instrument: 'piano' },
      { note: 'A3', time: 7.9, duration: 1.5, velocity: 0.45, instrument: 'piano' },
      { note: 'A4', time: 8.5, duration: 3.2, velocity: 0.8, instrument: 'piano' },

      { note: 'G2', time: 10.5, duration: 1.5, velocity: 0.6, instrument: 'piano' },
      { note: 'B3', time: 11.2, duration: 1.5, velocity: 0.45, instrument: 'piano' },
      { note: 'G4', time: 11.8, duration: 2.0, velocity: 0.7, instrument: 'piano' },

      { note: 'D3', time: 13.0, duration: 1.5, velocity: 0.6, instrument: 'piano' },
      { note: 'F#4', time: 13.8, duration: 2.0, velocity: 0.7, instrument: 'piano' },

      { note: 'G2', time: 15.5, duration: 1.5, velocity: 0.6, instrument: 'piano' },
      { note: 'C#4', time: 16.0, duration: 2.5, velocity: 0.65, instrument: 'piano' },

      { note: 'D3', time: 18.0, duration: 1.5, velocity: 0.6, instrument: 'piano' },
      { note: 'B3', time: 18.8, duration: 2.2, velocity: 0.65, instrument: 'piano' },

      { note: 'G2', time: 20.8, duration: 1.5, velocity: 0.6, instrument: 'piano' },
      { note: 'C#4', time: 21.5, duration: 2.0, velocity: 0.65, instrument: 'piano' },

      { note: 'D3', time: 23.5, duration: 1.5, velocity: 0.6, instrument: 'piano' },
      { note: 'D4', time: 24.2, duration: 3.5, velocity: 0.7, instrument: 'piano' },

      // Second phrase
      { note: 'G2', time: 27.5, duration: 1.5, velocity: 0.6, instrument: 'piano' },
      { note: 'F#4', time: 28.2, duration: 2.5, velocity: 0.75, instrument: 'piano' },
      { note: 'D3', time: 30.5, duration: 1.5, velocity: 0.6, instrument: 'piano' },
      { note: 'A4', time: 31.2, duration: 3.2, velocity: 0.8, instrument: 'piano' },
      { note: 'G2', time: 34.5, duration: 1.5, velocity: 0.6, instrument: 'piano' },
      { note: 'G4', time: 35.2, duration: 2.0, velocity: 0.7, instrument: 'piano' },
      { note: 'D3', time: 37.0, duration: 1.5, velocity: 0.6, instrument: 'piano' },
      { note: 'F#4', time: 37.8, duration: 2.5, velocity: 0.7, instrument: 'piano' },
      { note: 'G2', time: 40.5, duration: 1.5, velocity: 0.6, instrument: 'piano' },
      { note: 'C#4', time: 41.2, duration: 2.5, velocity: 0.65, instrument: 'piano' },
      { note: 'D3', time: 43.5, duration: 1.5, velocity: 0.6, instrument: 'piano' },
      { note: 'B3', time: 44.2, duration: 3.0, velocity: 0.65, instrument: 'piano' },

      { note: 'G2', time: 48.0, duration: 4.0, velocity: 0.5, instrument: 'piano' },
      { note: 'D4', time: 51.0, duration: 5.0, velocity: 0.6, instrument: 'piano' },
      { note: 'F#4', time: 53.0, duration: 5.5, velocity: 0.55, instrument: 'piano' }
    ]
  },
  {
    id: 'bach-air-on-g-string',
    title: 'Aire en la Cuerda de Sol (Suite Orquestal No. 3)',
    composer: 'Johann Sebastian Bach',
    era: 'Barroco',
    year: '1730',
    moment: 'foco-clinico',
    momentLabel: 'Claridad & Foco Clínico',
    durationSeconds: 60,
    clinicalBenefit: 'La regularidad matemática de su bajo continuo induce sincronización interhemisférica cerebral.',
    bpm: 52,
    keySignature: 'Re Mayor',
    audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7f/Bach_-_Air_on_the_G_string.ogg',
    breathingPattern: { inhale: 4, hold: 4, exhale: 4 },
    quote: 'La meta de la música es elevar el espíritu y confortar el alma.',
    melody: [
      // Sustained high violin melody with walking bass
      { note: 'D3', time: 0.0, duration: 1.8, velocity: 0.6, instrument: 'strings' },
      { note: 'C#3', time: 1.8, duration: 1.8, velocity: 0.6, instrument: 'strings' },
      { note: 'B2', time: 3.6, duration: 1.8, velocity: 0.6, instrument: 'strings' },
      { note: 'A2', time: 5.4, duration: 1.8, velocity: 0.6, instrument: 'strings' },
      { note: 'G2', time: 7.2, duration: 1.8, velocity: 0.6, instrument: 'strings' },
      { note: 'F#2', time: 9.0, duration: 1.8, velocity: 0.6, instrument: 'strings' },
      { note: 'E2', time: 10.8, duration: 1.8, velocity: 0.6, instrument: 'strings' },
      { note: 'A2', time: 12.6, duration: 1.8, velocity: 0.6, instrument: 'strings' },

      // Solo violin long high note
      { note: 'F#5', time: 0.5, duration: 6.0, velocity: 0.8, instrument: 'strings' },
      { note: 'E5', time: 6.8, duration: 1.2, velocity: 0.75, instrument: 'strings' },
      { note: 'D5', time: 8.2, duration: 1.5, velocity: 0.7, instrument: 'strings' },
      { note: 'C#5', time: 9.8, duration: 1.5, velocity: 0.7, instrument: 'strings' },
      { note: 'B4', time: 11.4, duration: 1.5, velocity: 0.65, instrument: 'strings' },
      { note: 'A4', time: 13.0, duration: 3.5, velocity: 0.75, instrument: 'strings' },

      // Walking bass bar 2
      { note: 'D3', time: 14.8, duration: 1.8, velocity: 0.6, instrument: 'strings' },
      { note: 'C#3', time: 16.6, duration: 1.8, velocity: 0.6, instrument: 'strings' },
      { note: 'B2', time: 18.4, duration: 1.8, velocity: 0.6, instrument: 'strings' },
      { note: 'A2', time: 20.2, duration: 1.8, velocity: 0.6, instrument: 'strings' },
      { note: 'G2', time: 22.0, duration: 1.8, velocity: 0.6, instrument: 'strings' },

      { note: 'B5', time: 16.5, duration: 4.5, velocity: 0.8, instrument: 'strings' },
      { note: 'A5', time: 21.2, duration: 1.8, velocity: 0.75, instrument: 'strings' },
      { note: 'G5', time: 23.2, duration: 2.0, velocity: 0.7, instrument: 'strings' },
      { note: 'F#5', time: 25.4, duration: 2.2, velocity: 0.75, instrument: 'strings' },
      { note: 'E5', time: 27.8, duration: 4.0, velocity: 0.7, instrument: 'strings' },

      // Walking bass bar 3
      { note: 'F#2', time: 24.0, duration: 2.0, velocity: 0.55, instrument: 'strings' },
      { note: 'E2', time: 26.0, duration: 2.0, velocity: 0.55, instrument: 'strings' },
      { note: 'D2', time: 28.0, duration: 2.0, velocity: 0.55, instrument: 'strings' },
      { note: 'A2', time: 30.0, duration: 2.0, velocity: 0.55, instrument: 'strings' },

      { note: 'A5', time: 32.0, duration: 5.5, velocity: 0.8, instrument: 'strings' },
      { note: 'G5', time: 37.8, duration: 1.5, velocity: 0.7, instrument: 'strings' },
      { note: 'F#5', time: 39.5, duration: 2.0, velocity: 0.7, instrument: 'strings' },
      { note: 'E5', time: 41.8, duration: 2.5, velocity: 0.65, instrument: 'strings' },
      { note: 'D5', time: 44.5, duration: 6.0, velocity: 0.75, instrument: 'strings' },

      { note: 'D3', time: 34.0, duration: 2.0, velocity: 0.5, instrument: 'strings' },
      { note: 'G2', time: 38.0, duration: 2.0, velocity: 0.5, instrument: 'strings' },
      { note: 'A2', time: 42.0, duration: 2.5, velocity: 0.55, instrument: 'strings' },
      { note: 'D2', time: 45.0, duration: 7.0, velocity: 0.6, instrument: 'strings' }
    ]
  },
  {
    id: 'beethoven-moonlight-sonata',
    title: 'Sonata Claro de Luna (Adagio sostenuto)',
    composer: 'Ludwig van Beethoven',
    era: 'Clasicismo',
    year: '1801',
    moment: 'antes-paciente',
    momentLabel: 'Antes del Siguiente Paciente',
    durationSeconds: 60,
    clinicalBenefit: 'Su patrón arpegiado continuo reduce la tensión muscular en hombros y cuello acumulada durante cirugías o rondas.',
    bpm: 54,
    keySignature: 'Do sostenido menor',
    audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Beethoven_Moonlight_1st_movement.ogg',
    breathingPattern: { inhale: 4, hold: 2, exhale: 5 },
    quote: 'El silencio interior es el mejor estetoscopio del alma.',
    melody: [
      // Bass octave C#
      { note: 'C#2', time: 0.0, duration: 7.0, velocity: 0.55, instrument: 'piano' },
      { note: 'C#3', time: 0.0, duration: 7.0, velocity: 0.5, instrument: 'piano' },
      // Triplet arpeggios G#3 - C#4 - E4
      { note: 'G#3', time: 0.4, duration: 0.6, velocity: 0.4, instrument: 'piano' },
      { note: 'C#4', time: 0.9, duration: 0.6, velocity: 0.4, instrument: 'piano' },
      { note: 'E4', time: 1.4, duration: 0.6, velocity: 0.4, instrument: 'piano' },
      { note: 'G#3', time: 1.9, duration: 0.6, velocity: 0.4, instrument: 'piano' },
      { note: 'C#4', time: 2.4, duration: 0.6, velocity: 0.4, instrument: 'piano' },
      { note: 'E4', time: 2.9, duration: 0.6, velocity: 0.4, instrument: 'piano' },
      { note: 'G#3', time: 3.4, duration: 0.6, velocity: 0.4, instrument: 'piano' },
      { note: 'C#4', time: 3.9, duration: 0.6, velocity: 0.4, instrument: 'piano' },
      { note: 'E4', time: 4.4, duration: 0.6, velocity: 0.4, instrument: 'piano' },
      { note: 'G#3', time: 4.9, duration: 0.6, velocity: 0.4, instrument: 'piano' },
      { note: 'C#4', time: 5.4, duration: 0.6, velocity: 0.4, instrument: 'piano' },
      { note: 'E4', time: 5.9, duration: 0.6, velocity: 0.4, instrument: 'piano' },

      // Melody enters G#4 (dotted rhythm)
      { note: 'G#4', time: 6.8, duration: 2.4, velocity: 0.75, instrument: 'piano' },
      { note: 'G#4', time: 9.3, duration: 0.7, velocity: 0.7, instrument: 'piano' },
      { note: 'G#4', time: 10.1, duration: 3.5, velocity: 0.75, instrument: 'piano' },

      { note: 'B2', time: 7.0, duration: 7.0, velocity: 0.5, instrument: 'piano' },
      { note: 'G#3', time: 7.2, duration: 0.6, velocity: 0.38, instrument: 'piano' },
      { note: 'C#4', time: 7.7, duration: 0.6, velocity: 0.38, instrument: 'piano' },
      { note: 'E4', time: 8.2, duration: 0.6, velocity: 0.38, instrument: 'piano' },
      { note: 'G#3', time: 8.7, duration: 0.6, velocity: 0.38, instrument: 'piano' },
      { note: 'C#4', time: 9.2, duration: 0.6, velocity: 0.38, instrument: 'piano' },
      { note: 'E4', time: 9.7, duration: 0.6, velocity: 0.38, instrument: 'piano' },

      // Melody moves to A4
      { note: 'A4', time: 14.0, duration: 2.8, velocity: 0.8, instrument: 'piano' },
      { note: 'G#4', time: 17.0, duration: 1.0, velocity: 0.7, instrument: 'piano' },
      { note: 'F#4', time: 18.2, duration: 3.5, velocity: 0.75, instrument: 'piano' },

      { note: 'A2', time: 14.0, duration: 7.0, velocity: 0.5, instrument: 'piano' },
      { note: 'A3', time: 14.2, duration: 0.6, velocity: 0.38, instrument: 'piano' },
      { note: 'D4', time: 14.7, duration: 0.6, velocity: 0.38, instrument: 'piano' },
      { note: 'F#4', time: 15.2, duration: 0.6, velocity: 0.38, instrument: 'piano' },

      // Resolution
      { note: 'G#4', time: 22.0, duration: 3.0, velocity: 0.7, instrument: 'piano' },
      { note: 'E4', time: 25.5, duration: 3.0, velocity: 0.65, instrument: 'piano' },
      { note: 'C#4', time: 29.0, duration: 5.0, velocity: 0.6, instrument: 'piano' },

      { note: 'G#2', time: 22.0, duration: 7.0, velocity: 0.5, instrument: 'piano' },
      { note: 'C#2', time: 29.0, duration: 9.0, velocity: 0.55, instrument: 'piano' }
    ]
  },
  {
    id: 'chopin-nocturne-op9-no2',
    title: 'Nocturno en Mi bemol Mayor, Op. 9 No. 2',
    composer: 'Frédéric Chopin',
    era: 'Romanticismo',
    year: '1832',
    moment: 'alivio-fatiga',
    momentLabel: 'Alivio de Fatiga y Agotamiento',
    durationSeconds: 60,
    clinicalBenefit: 'La expresividad melódica libera dopamina, mitigando la sensación de despersonalización en turnos largos.',
    bpm: 58,
    keySignature: 'Mi bemol Mayor',
    audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Chopin_Nocturne_Op_9_No_2.ogg',
    breathingPattern: { inhale: 4, hold: 2, exhale: 6 },
    quote: 'La sencillez es el logro supremo tras haber superado las dificultades.',
    melody: [
      // Left hand waltz-like gentle pattern
      { note: 'Eb2', time: 0.0, duration: 1.5, velocity: 0.5, instrument: 'piano' },
      { note: 'G3', time: 0.7, duration: 1.0, velocity: 0.35, instrument: 'piano' },
      { note: 'Bb3', time: 0.7, duration: 1.0, velocity: 0.35, instrument: 'piano' },
      { note: 'Eb4', time: 0.7, duration: 1.0, velocity: 0.35, instrument: 'piano' },

      // Right hand famous melody
      { note: 'Bb4', time: 0.2, duration: 0.8, velocity: 0.75, instrument: 'piano' },
      { note: 'G5', time: 1.2, duration: 2.2, velocity: 0.85, instrument: 'piano' },
      { note: 'F5', time: 3.5, duration: 0.6, velocity: 0.7, instrument: 'piano' },
      { note: 'Eb5', time: 4.2, duration: 0.8, velocity: 0.75, instrument: 'piano' },
      { note: 'D5', time: 5.1, duration: 1.4, velocity: 0.7, instrument: 'piano' },
      { note: 'C5', time: 6.6, duration: 2.2, velocity: 0.75, instrument: 'piano' },

      { note: 'C3', time: 3.5, duration: 1.5, velocity: 0.5, instrument: 'piano' },
      { note: 'Ab2', time: 5.5, duration: 1.5, velocity: 0.5, instrument: 'piano' },

      { note: 'Bb4', time: 9.0, duration: 0.8, velocity: 0.75, instrument: 'piano' },
      { note: 'Ab5', time: 10.0, duration: 2.2, velocity: 0.85, instrument: 'piano' },
      { note: 'G5', time: 12.4, duration: 0.6, velocity: 0.7, instrument: 'piano' },
      { note: 'F5', time: 13.1, duration: 0.8, velocity: 0.75, instrument: 'piano' },
      { note: 'Eb5', time: 14.0, duration: 1.4, velocity: 0.7, instrument: 'piano' },
      { note: 'D5', time: 15.6, duration: 2.2, velocity: 0.75, instrument: 'piano' },

      { note: 'Eb3', time: 10.0, duration: 1.5, velocity: 0.5, instrument: 'piano' },
      { note: 'Bb2', time: 13.5, duration: 1.5, velocity: 0.5, instrument: 'piano' },

      { note: 'Eb5', time: 18.0, duration: 3.5, velocity: 0.8, instrument: 'piano' },
      { note: 'C5', time: 22.0, duration: 1.5, velocity: 0.7, instrument: 'piano' },
      { note: 'Bb4', time: 23.8, duration: 3.0, velocity: 0.75, instrument: 'piano' }
    ]
  },
  {
    id: 'pachelbel-canon-in-d',
    title: 'Canon en Re Mayor (Adagio sereno)',
    composer: 'Johann Pachelbel',
    era: 'Barroco',
    year: '1680',
    moment: 'cambio-turno',
    momentLabel: 'Cambio de Turno & Relevo',
    durationSeconds: 60,
    clinicalBenefit: 'La progresión armónica cíclica de 8 compases brinda estabilidad psicológica y sensación de cierre.',
    bpm: 56,
    keySignature: 'Re Mayor',
    audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Pachelbel_Canon_in_D_arrangement.ogg',
    breathingPattern: { inhale: 4, hold: 2, exhale: 4 },
    quote: 'El relevo de turno es también el relevo del cansancio.',
    melody: [
      // The eternal 8-note ground bass: D - A - B - F# - G - D - G - A
      { note: 'D3', time: 0.0, duration: 3.0, velocity: 0.6, instrument: 'strings' },
      { note: 'A2', time: 3.0, duration: 3.0, velocity: 0.6, instrument: 'strings' },
      { note: 'B2', time: 6.0, duration: 3.0, velocity: 0.6, instrument: 'strings' },
      { note: 'F#2', time: 9.0, duration: 3.0, velocity: 0.6, instrument: 'strings' },
      { note: 'G2', time: 12.0, duration: 3.0, velocity: 0.6, instrument: 'strings' },
      { note: 'D2', time: 15.0, duration: 3.0, velocity: 0.6, instrument: 'strings' },
      { note: 'G2', time: 18.0, duration: 3.0, velocity: 0.6, instrument: 'strings' },
      { note: 'A2', time: 21.0, duration: 3.0, velocity: 0.6, instrument: 'strings' },

      // Canon melody enters
      { note: 'F#4', time: 6.0, duration: 3.0, velocity: 0.7, instrument: 'strings' },
      { note: 'E4', time: 9.0, duration: 3.0, velocity: 0.7, instrument: 'strings' },
      { note: 'D4', time: 12.0, duration: 3.0, velocity: 0.7, instrument: 'strings' },
      { note: 'C#4', time: 15.0, duration: 3.0, velocity: 0.7, instrument: 'strings' },
      { note: 'B3', time: 18.0, duration: 3.0, velocity: 0.7, instrument: 'strings' },
      { note: 'A3', time: 21.0, duration: 3.0, velocity: 0.7, instrument: 'strings' },
      { note: 'B3', time: 24.0, duration: 3.0, velocity: 0.7, instrument: 'strings' },
      { note: 'C#4', time: 27.0, duration: 3.0, velocity: 0.7, instrument: 'strings' },

      // Second voice / higher variation
      { note: 'D5', time: 24.0, duration: 1.5, velocity: 0.8, instrument: 'strings' },
      { note: 'C#5', time: 25.5, duration: 1.5, velocity: 0.75, instrument: 'strings' },
      { note: 'B4', time: 27.0, duration: 1.5, velocity: 0.75, instrument: 'strings' },
      { note: 'A4', time: 28.5, duration: 1.5, velocity: 0.75, instrument: 'strings' },
      { note: 'G4', time: 30.0, duration: 1.5, velocity: 0.7, instrument: 'strings' },
      { note: 'F#4', time: 31.5, duration: 1.5, velocity: 0.7, instrument: 'strings' },
      { note: 'G4', time: 33.0, duration: 1.5, velocity: 0.7, instrument: 'strings' },
      { note: 'E4', time: 34.5, duration: 1.5, velocity: 0.75, instrument: 'strings' },

      // Final resolving cadenza
      { note: 'F#4', time: 36.0, duration: 6.0, velocity: 0.75, instrument: 'strings' },
      { note: 'D4', time: 42.0, duration: 6.0, velocity: 0.7, instrument: 'strings' }
    ]
  },
  {
    id: 'vivaldi-winter-largo',
    title: 'Las Cuatro Estaciones: Invierno (Largo)',
    composer: 'Antonio Vivaldi',
    era: 'Barroco',
    year: '1725',
    moment: 'post-urgencia',
    momentLabel: 'Refugio Sonora & Calidez',
    durationSeconds: 60,
    clinicalBenefit: 'El contraste de violín lírico sobre cuerdas en pizzicato simula calor y cobijo tras una guardia fría o extenuante.',
    bpm: 50,
    keySignature: 'Mi bemol Mayor',
    audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Vivaldi_Winter_mvt_2_Largo_-_John_Harrison_violin.ogg',
    breathingPattern: { inhale: 4, hold: 2, exhale: 4 },
    quote: 'El descanso consciente es tan vital como el aire que respiramos.',
    melody: [
      // Pizzicato raindrops in background
      { note: 'Eb3', time: 0.0, duration: 0.5, velocity: 0.45, instrument: 'strings' },
      { note: 'G3', time: 0.5, duration: 0.5, velocity: 0.45, instrument: 'strings' },
      { note: 'Bb3', time: 1.0, duration: 0.5, velocity: 0.45, instrument: 'strings' },
      { note: 'Eb4', time: 1.5, duration: 0.5, velocity: 0.45, instrument: 'strings' },
      
      // Warm lyrical violin cantilena
      { note: 'G4', time: 1.8, duration: 1.2, velocity: 0.75, instrument: 'strings' },
      { note: 'Ab4', time: 3.1, duration: 0.8, velocity: 0.7, instrument: 'strings' },
      { note: 'Bb4', time: 4.0, duration: 2.2, velocity: 0.85, instrument: 'strings' },
      { note: 'C5', time: 6.4, duration: 1.2, velocity: 0.8, instrument: 'strings' },
      { note: 'Bb4', time: 7.8, duration: 1.5, velocity: 0.75, instrument: 'strings' },
      { note: 'Ab4', time: 9.5, duration: 1.8, velocity: 0.7, instrument: 'strings' },
      { note: 'G4', time: 11.5, duration: 3.5, velocity: 0.8, instrument: 'strings' },

      { note: 'F4', time: 15.5, duration: 1.5, velocity: 0.7, instrument: 'strings' },
      { note: 'Eb4', time: 17.2, duration: 4.5, velocity: 0.75, instrument: 'strings' }
    ]
  },
  {
    id: 'saint-saens-le-cygne',
    title: 'El Cisne (El Carnaval de los Animales)',
    composer: 'Camille Saint-Saëns',
    era: 'Romanticismo',
    year: '1886',
    moment: 'turno-noche',
    momentLabel: 'Transición Serena',
    durationSeconds: 60,
    clinicalBenefit: 'El timbre cálido del violonchelo en el registro grave estimula el nervio vago y la respuesta de calma.',
    bpm: 52,
    keySignature: 'Sol Mayor',
    audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Camille_Saint-Sa%C3%ABns_-_The_Swan_%28Le_Cygne%29.ogg',
    breathingPattern: { inhale: 4, hold: 2, exhale: 5 },
    quote: 'Cuida de ti para poder seguir cuidando de los demás.',
    melody: [
      // Piano rippling arpeggio bass
      { note: 'G2', time: 0.0, duration: 2.0, velocity: 0.45, instrument: 'piano' },
      { note: 'D3', time: 0.8, duration: 1.5, velocity: 0.4, instrument: 'piano' },
      { note: 'B3', time: 1.4, duration: 1.5, velocity: 0.4, instrument: 'piano' },

      // Cello theme
      { note: 'D4', time: 2.0, duration: 3.5, velocity: 0.8, instrument: 'strings' },
      { note: 'E4', time: 5.8, duration: 1.2, velocity: 0.75, instrument: 'strings' },
      { note: 'D4', time: 7.2, duration: 1.5, velocity: 0.7, instrument: 'strings' },
      { note: 'B3', time: 9.0, duration: 3.0, velocity: 0.75, instrument: 'strings' },
      { note: 'G3', time: 12.2, duration: 4.0, velocity: 0.8, instrument: 'strings' },

      { note: 'C4', time: 16.5, duration: 3.2, velocity: 0.8, instrument: 'strings' },
      { note: 'D4', time: 20.0, duration: 1.2, velocity: 0.75, instrument: 'strings' },
      { note: 'C4', time: 21.4, duration: 1.5, velocity: 0.7, instrument: 'strings' },
      { note: 'A3', time: 23.0, duration: 3.0, velocity: 0.75, instrument: 'strings' },
      { note: 'F#3', time: 26.2, duration: 4.5, velocity: 0.75, instrument: 'strings' }
    ]
  }
];

export const HOSPITAL_SHIFT_MOMENTS: { id: ShiftMoment; label: string; icon: string; description: string }[] = [
  {
    id: 'post-urgencia',
    label: 'Pausa tras Urgencia',
    icon: 'Activity',
    description: 'Baja pulsaciones y libera la adrenalina tras una reanimación o ingreso crítico.'
  },
  {
    id: 'turno-noche',
    label: 'Guardia Nocturna',
    icon: 'Moon',
    description: 'Armonías suspendidas que combaten el agotamiento y la fatiga circadiana.'
  },
  {
    id: 'foco-clinico',
    label: 'Claridad y Foco',
    icon: 'Brain',
    description: 'Sincronía matemática barroca para organizar ideas antes de pasar visita.'
  },
  {
    id: 'antes-paciente',
    label: 'Entre Pacientes',
    icon: 'HeartHandshake',
    description: 'Reset mental de 60 segundos para recibir al siguiente caso con empatía renovada.'
  },
  {
    id: 'alivio-fatiga',
    label: 'Alivio de Fatiga',
    icon: 'BatteryCharging',
    description: 'Melodías cantables y cálidas para recargar energía física y descongestionar los sentidos.'
  },
  {
    id: 'cambio-turno',
    label: 'Cambio de Turno',
    icon: 'RotateCw',
    description: 'Cierre mental del turno hospitalario para desconectar y volver a casa en paz.'
  }
];
