import React, { useState, useEffect } from 'react';
import { ClassicalPiece, AmbientSound } from '../types';
import { audioEngine } from '../utils/audioEngine';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  SkipForward, 
  Wind, 
  CloudRain, 
  Radio, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2, 
  Sparkles,
  Share2,
  CheckCircle2,
  Heart
} from 'lucide-react';

interface AudioPlayerProps {
  piece: ClassicalPiece;
  onNextPiece: () => void;
  onPreviousPiece?: () => void;
  onSessionComplete: (duration: number, stressBefore: number, stressAfter: number) => void;
  onOpenSendModal: (piece: ClassicalPiece) => void;
  volume: number;
  onVolumeChange: (vol: number) => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  piece,
  onNextPiece,
  onSessionComplete,
  onOpenSendModal,
  volume,
  onVolumeChange
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [ambientSound, setAmbientSound] = useState<AmbientSound>('none');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [stressBefore, setStressBefore] = useState<number>(4);
  const [stressAfter, setStressAfter] = useState<number>(2);
  const [showCompletionFeedback, setShowCompletionFeedback] = useState<boolean>(false);

  const duration = piece.durationSeconds || 60;
  const timeRemaining = Math.max(0, Math.ceil(duration - currentTime));
  const progressRatio = Math.min(1, currentTime / duration);

  // Breathing pacer cycle calculation
  const totalBreathingCycle = piece.breathingPattern.inhale + piece.breathingPattern.hold + piece.breathingPattern.exhale;
  const cyclePosition = currentTime % totalBreathingCycle;

  let breathingPhase: 'inhale' | 'hold' | 'exhale' = 'inhale';
  let breathingInstruction = 'Inhala profundamente por la nariz';
  let breathingScale = 1;

  if (cyclePosition < piece.breathingPattern.inhale) {
    breathingPhase = 'inhale';
    breathingInstruction = 'Inhala calma y aire fresco...';
    breathingScale = 1 + 0.35 * (cyclePosition / piece.breathingPattern.inhale);
  } else if (cyclePosition < piece.breathingPattern.inhale + piece.breathingPattern.hold) {
    breathingPhase = 'hold';
    breathingInstruction = 'Sostén suavemente...';
    breathingScale = 1.35;
  } else {
    breathingPhase = 'exhale';
    const exhaleTime = cyclePosition - (piece.breathingPattern.inhale + piece.breathingPattern.hold);
    breathingInstruction = 'Exhala y suelta la tensión del turno...';
    breathingScale = 1.35 - 0.35 * (exhaleTime / piece.breathingPattern.exhale);
  }

  // Handle piece changes
  useEffect(() => {
    // If playing, restart with new piece
    if (isPlaying) {
      handlePlay();
    } else {
      setCurrentTime(0);
      setIsPlaying(false);
      setIsPaused(false);
    }
  }, [piece.id]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      audioEngine.stop();
    };
  }, []);

  const handlePlay = async () => {
    if (isPaused) {
      audioEngine.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    setIsPlaying(true);
    setIsPaused(false);
    setShowCompletionFeedback(false);

    await audioEngine.playPiece(
      piece,
      ambientSound,
      volume,
      (time) => {
        setCurrentTime(time);
      },
      () => {
        setIsPlaying(false);
        setIsPaused(false);
        setCurrentTime(duration);
        setShowCompletionFeedback(true);
      }
    );
  };

  const handlePause = () => {
    audioEngine.pause();
    setIsPaused(true);
    setIsPlaying(false);
  };

  const handleRestart = () => {
    audioEngine.stop();
    setCurrentTime(0);
    setIsPaused(false);
    handlePlay();
  };

  const handleAmbientChange = (type: AmbientSound) => {
    setAmbientSound(type);
    if (isPlaying) {
      // Re-trigger with new ambient track seamlessly
      handlePlay();
    }
  };

  const handleSaveSessionFeedback = () => {
    onSessionComplete(duration, stressBefore, stressAfter);
    setShowCompletionFeedback(false);
  };

  // Format MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // SVG Circular Ring Math
  const radius = 110;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - progressRatio * circumference;

  return (
    <div
      id="classical-audio-player"
      className={`relative w-full rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 p-6 shadow-2xl transition-all ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none flex flex-col justify-center items-center overflow-y-auto' : ''
      }`}
    >
      {/* Top Bar inside Player */}
      <div className="w-full flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-teal-400 bg-teal-500/10 border border-teal-500/30 px-2.5 py-0.5 rounded-full">
            <Sparkles className="w-3 h-3" />
            {piece.momentLabel}
          </span>
          <span className="text-xs text-slate-500 font-mono">
            {piece.era} • {piece.year}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="share-piece-btn"
            onClick={() => onOpenSendModal(piece)}
            className="text-xs flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Enviar este fragmento a un colega"
          >
            <Share2 className="w-3.5 h-3.5 text-teal-400" />
            <span className="hidden sm:inline">Compartir</span>
          </button>
          
          <button
            id="fullscreen-toggle-btn"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title={isFullscreen ? 'Salir de pantalla completa' : 'Modo Zen Pantalla Completa'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Visualizer & 60-Second Circular Countdown */}
      <div className="flex flex-col items-center justify-center my-3 relative">
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
          {/* Animated Ambient Pulsing Aura */}
          <div
            className="absolute inset-0 rounded-full bg-teal-500/10 blur-2xl transition-transform duration-700 pointer-events-none"
            style={{
              transform: `scale(${isPlaying ? breathingScale : 1})`,
              opacity: isPlaying ? 0.8 : 0.2
            }}
          />

          {/* SVG Progress Ring */}
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 260 260">
            {/* Background Track */}
            <circle
              cx="130"
              cy="130"
              r={radius}
              className="stroke-slate-800/80"
              strokeWidth="6"
              fill="transparent"
            />
            {/* Animated Progress Gradient */}
            <circle
              cx="130"
              cy="130"
              r={radius}
              className="stroke-teal-400 transition-all duration-200"
              strokeWidth="7"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          {/* Center Orb & Countdown Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            {/* Breathing Bubble */}
            <div
              className="w-36 h-36 sm:w-40 sm:h-40 rounded-full border border-teal-500/30 bg-gradient-to-tr from-slate-900 to-teal-950/60 shadow-inner flex flex-col items-center justify-center transition-transform duration-500"
              style={{
                transform: `scale(${isPlaying ? breathingScale : 1})`
              }}
            >
              <div className="text-3xl sm:text-4xl font-mono font-bold tracking-tight text-white">
                {formatTime(timeRemaining)}
              </div>
              <div className="text-[11px] font-medium uppercase tracking-widest text-teal-300 mt-1">
                {isPlaying ? (
                  <span className="flex items-center gap-1">
                    <Wind className="w-3 h-3 animate-pulse" />
                    {breathingPhase === 'inhale' && 'Inhala (4s)'}
                    {breathingPhase === 'hold' && 'Sostén (2s)'}
                    {breathingPhase === 'exhale' && 'Exhala (5s)'}
                  </span>
                ) : (
                  '60 Segundos'
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Breathing Subtitle Guide */}
        <p className="mt-3 text-sm text-center text-teal-200/90 font-medium h-6">
          {isPlaying ? breathingInstruction : 'Presiona iniciar para tu micro-pausa de 1 minuto'}
        </p>
      </div>

      {/* Piece Info */}
      <div className="text-center my-3 max-w-xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
          {piece.title}
        </h2>
        <p className="text-sm font-medium text-teal-400 mt-0.5">
          {piece.composer}
        </p>
        <p className="text-xs text-slate-300 mt-2 bg-slate-900/90 border border-slate-800 rounded-xl px-3.5 py-2 inline-block">
          💡 <span className="font-semibold text-teal-300">Efecto clínico:</span> {piece.clinicalBenefit}
        </p>
      </div>

      {/* Primary Audio Controls */}
      <div className="flex items-center justify-center gap-4 mt-4">
        {/* Restart 60s */}
        <button
          id="restart-audio-btn"
          onClick={handleRestart}
          className="p-3 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-all shadow-md active:scale-95"
          title="Reiniciar el minuto"
        >
          <RotateCcw className="w-5 h-5" />
        </button>

        {/* Big Tactile Play / Pause Button */}
        <button
          id="play-pause-audio-btn"
          onClick={isPlaying ? handlePause : handlePlay}
          className="flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold text-base shadow-lg shadow-teal-500/20 active:scale-95 transition-all"
        >
          {isPlaying ? (
            <>
              <Pause className="w-5 h-5 fill-slate-950" />
              <span>Pausar</span>
            </>
          ) : (
            <>
              <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
              <span>{isPaused ? 'Continuar' : 'Iniciar 1 Minuto'}</span>
            </>
          )}
        </button>

        {/* Next Piece */}
        <button
          id="next-piece-btn"
          onClick={onNextPiece}
          className="p-3 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-all shadow-md active:scale-95"
          title="Siguiente fragmento de música clásica"
        >
          <SkipForward className="w-5 h-5" />
        </button>
      </div>

      {/* Hospital Ambient Sound Masking Selector */}
      <div className="mt-6 pt-4 border-t border-slate-800/80">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="text-slate-400 flex items-center gap-1.5 font-medium">
            <Radio className="w-3.5 h-3.5 text-teal-400" />
            Enmascarador acústico hospitalario:
          </span>

          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'none', label: 'Solo Música', icon: null },
              { id: 'rain', label: 'Lluvia Calma', icon: CloudRain },
              { id: 'alpha-waves', label: 'Ondas Alpha (10Hz)', icon: Radio },
              { id: 'pink-noise', label: 'Ruido Rosa (Anti-Alarmas)', icon: Wind }
            ].map((amb) => {
              const IconComp = amb.icon;
              const active = ambientSound === amb.id;
              return (
                <button
                  key={amb.id}
                  id={`ambient-btn-${amb.id}`}
                  onClick={() => handleAmbientChange(amb.id as AmbientSound)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1 ${
                    active
                      ? 'bg-teal-500/20 border-teal-500/40 text-teal-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {IconComp && <IconComp className="w-3 h-3" />}
                  <span>{amb.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Post-Session Feedback Modal / Banner */}
      {showCompletionFeedback && (
        <div className="mt-4 p-4 rounded-xl bg-teal-950/60 border border-teal-500/30 text-slate-200 animate-fade-in">
          <div className="flex items-center gap-2 text-teal-300 font-semibold text-sm mb-2">
            <CheckCircle2 className="w-4 h-4 text-teal-400" />
            <span>¡Micro-pausa de 1 minuto completada con éxito!</span>
          </div>
          <p className="text-xs text-slate-300 mb-3">
            ¿Cómo sientes tu nivel de tensión o ritmo cardíaco tras este minuto de música clásica?
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Estrés antes:</span>
              <select
                value={stressBefore}
                onChange={(e) => setStressBefore(Number(e.target.value))}
                className="bg-slate-900 border border-slate-700 rounded px-2 py-0.5 text-slate-200"
              >
                <option value={5}>5 - Extremo (post-código/UCI)</option>
                <option value={4}>4 - Muy alto</option>
                <option value={3}>3 - Moderado</option>
                <option value={2}>2 - Leve</option>
                <option value={1}>1 - Tranquilo</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400">Estrés ahora:</span>
              <select
                value={stressAfter}
                onChange={(e) => setStressAfter(Number(e.target.value))}
                className="bg-slate-900 border border-slate-700 rounded px-2 py-0.5 text-teal-300 font-medium"
              >
                <option value={1}>1 - Muy sereno y en calma</option>
                <option value={2}>2 - Relajado y enfocado</option>
                <option value={3}>3 - Aliviado</option>
                <option value={4}>4 - Aún tenso</option>
                <option value={5}>5 - Sin cambio</option>
              </select>
            </div>

            <button
              onClick={handleSaveSessionFeedback}
              className="ml-auto px-3 py-1 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-lg transition-colors text-xs"
            >
              Guardar en Bitácora del Turno
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
