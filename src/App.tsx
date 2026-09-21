/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { HospitalShiftType, ClassicalPiece, ShiftSessionLog } from './types';
import { CLASSICAL_PIECES } from './data/pieces';
import { audioEngine } from './utils/audioEngine';
import { Header } from './components/Header';
import { AudioPlayer } from './components/AudioPlayer';
import { PieceSelector } from './components/PieceSelector';
import { ShiftTimerModal } from './components/ShiftTimerModal';
import { SendColleagueModal } from './components/SendColleagueModal';
import { ShiftStatsModal } from './components/ShiftStatsModal';
import { 
  HeartPulse, 
  Sparkles, 
  Bell, 
  Send, 
  Shield, 
  Clock, 
  CheckCircle2, 
  Info,
  Coffee
} from 'lucide-react';

export default function App() {
  // Application State
  const [shiftType, setShiftType] = useState<HospitalShiftType>(() => {
    return (localStorage.getItem('hospital_shift') as HospitalShiftType) || 'urgencias';
  });

  const [currentPiece, setCurrentPiece] = useState<ClassicalPiece>(() => {
    // Check if URL has a specific piece preselected (e.g. sent from a colleague)
    const params = new URLSearchParams(window.location.search);
    const pieceParam = params.get('piece');
    if (pieceParam) {
      const matched = CLASSICAL_PIECES.find((p) => p.id === pieceParam);
      if (matched) return matched;
    }
    return CLASSICAL_PIECES[0];
  });

  const [receivedGiftNotification, setReceivedGiftNotification] = useState<boolean>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.has('from') || params.has('piece');
  });

  const [volume, setVolume] = useState<number>(0.8);

  // Shift Reminder Timer State
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [timerSecondsLeft, setTimerSecondsLeft] = useState<number | null>(null);

  // Modals
  const [isTimerModalOpen, setIsTimerModalOpen] = useState<boolean>(false);
  const [isSendModalOpen, setIsSendModalOpen] = useState<boolean>(false);
  const [sendModalPiece, setSendModalPiece] = useState<ClassicalPiece>(CLASSICAL_PIECES[0]);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState<boolean>(false);

  // Shift Logs
  const [sessionLogs, setSessionLogs] = useState<ShiftSessionLog[]>(() => {
    try {
      const saved = localStorage.getItem('hospital_shift_logs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persist Shift
  const handleShiftChange = (newShift: HospitalShiftType) => {
    setShiftType(newShift);
    localStorage.setItem('hospital_shift', newShift);
  };

  // Timer countdown loop
  useEffect(() => {
    let interval: number | null = null;
    if (timerActive && timerSecondsLeft !== null && timerSecondsLeft > 0) {
      interval = window.setInterval(() => {
        setTimerSecondsLeft((prev) => {
          if (prev === null || prev <= 1) {
            handleTimerTriggered();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) window.clearInterval(interval);
    };
  }, [timerActive, timerSecondsLeft]);

  const handleStartTimer = (minutes: number) => {
    setTimerSecondsLeft(minutes * 60);
    setTimerActive(true);
  };

  const handleCancelTimer = () => {
    setTimerActive(false);
    setTimerSecondsLeft(null);
  };

  const handleTimerTriggered = () => {
    setTimerActive(false);
    setTimerSecondsLeft(null);
    audioEngine.playChime();
    // Auto-scroll to player
    const playerEl = document.getElementById('classical-audio-player');
    if (playerEl) {
      playerEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNextPiece = () => {
    const currentIndex = CLASSICAL_PIECES.findIndex((p) => p.id === currentPiece.id);
    const nextIndex = (currentIndex + 1) % CLASSICAL_PIECES.length;
    setCurrentPiece(CLASSICAL_PIECES[nextIndex]);
  };

  const handleSelectPiece = (piece: ClassicalPiece, autoScroll = true) => {
    setCurrentPiece(piece);
    if (autoScroll) {
      const playerEl = document.getElementById('classical-audio-player');
      if (playerEl) {
        playerEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleOpenSendModal = (piece?: ClassicalPiece) => {
    setSendModalPiece(piece || currentPiece);
    setIsSendModalOpen(true);
  };

  const handleVolumeChange = (vol: number) => {
    setVolume(vol);
    audioEngine.setVolume(vol);
  };

  const handleSessionComplete = (duration: number, stressBefore: number, stressAfter: number) => {
    const newLog: ShiftSessionLog = {
      id: Date.now().toString(),
      pieceId: currentPiece.id,
      pieceTitle: currentPiece.title,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      durationSeconds: duration,
      stressBefore,
      stressAfter,
      shiftType
    };

    const updated = [newLog, ...sessionLogs];
    setSessionLogs(updated);
    try {
      localStorage.setItem('hospital_shift_logs', JSON.stringify(updated));
    } catch {
      // storage full or disabled
    }
  };

  const handleClearLogs = () => {
    setSessionLogs([]);
    localStorage.removeItem('hospital_shift_logs');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-teal-500 selection:text-white">
      {/* App Header */}
      <Header
        shiftType={shiftType}
        onShiftChange={handleShiftChange}
        onOpenTimerModal={() => setIsTimerModalOpen(true)}
        onOpenSendModal={() => handleOpenSendModal()}
        onOpenStatsModal={() => setIsStatsModalOpen(true)}
        timerActive={timerActive}
        timerSecondsLeft={timerSecondsLeft}
        volume={volume}
        onVolumeChange={handleVolumeChange}
      />

      {/* Received Colleague Gift Banner */}
      {receivedGiftNotification && (
        <div className="bg-gradient-to-r from-teal-900/80 via-emerald-950/80 to-teal-900/80 border-b border-teal-500/30 px-4 py-2.5 text-center text-xs text-teal-200 flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-teal-300 shrink-0" />
          <span>
            <strong>¡Te han enviado una dosis de calma!</strong> Tómate 1 minuto para escuchar este fragmento y respirar.
          </span>
          <button
            onClick={() => setReceivedGiftNotification(false)}
            className="text-teal-400 hover:text-white underline ml-2 text-xs font-semibold"
          >
            Entendido
          </button>
        </div>
      )}

      {/* Active Shift Timer Banner if active */}
      {timerActive && timerSecondsLeft !== null && (
        <div className="bg-amber-950/40 border-b border-amber-500/30 px-4 py-2 text-xs text-amber-200 flex items-center justify-between max-w-6xl mx-auto w-full">
          <div className="flex items-center gap-2">
            <Bell className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>
              Aviso de micro-pausa activo: <strong>{Math.floor(timerSecondsLeft / 60)}:{(timerSecondsLeft % 60).toString().padStart(2, '0')}</strong> restantes.
            </span>
          </div>
          <button
            onClick={handleCancelTimer}
            className="text-amber-400 hover:text-white underline font-medium"
          >
            Cancelar
          </button>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 md:py-8 flex flex-col items-center">
        {/* Hospital Context Prompt */}
        <div className="w-full text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-400 mb-2">
            <HeartPulse className="w-3.5 h-3.5 text-teal-400" />
            <span>
              Protocolo hospitalario de micro-descanso sensorial • <strong>60 segundos</strong>
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            Tu Oasis Musical en el Turno
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto mt-1">
            Diseñado para médicos, enfermeros y personal de salud. 1 minuto de música clásica a 50-60 BPM para resetear el sistema nervioso simpático.
          </p>
        </div>

        {/* Central 1-Minute Audio Player */}
        <div className="w-full max-w-2xl">
          <AudioPlayer
            piece={currentPiece}
            onNextPiece={handleNextPiece}
            onSessionComplete={handleSessionComplete}
            onOpenSendModal={handleOpenSendModal}
            volume={volume}
            onVolumeChange={handleVolumeChange}
          />
        </div>

        {/* Quick Shift Presets Bar */}
        <div className="w-full max-w-2xl mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            onClick={() => {
              const p = CLASSICAL_PIECES.find((x) => x.moment === 'post-urgencia') || CLASSICAL_PIECES[0];
              handleSelectPiece(p);
            }}
            className="p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-teal-500/40 text-left transition-all group"
          >
            <span className="text-[10px] text-rose-400 font-semibold uppercase block">Post-Urgencia</span>
            <span className="text-xs text-slate-300 font-medium group-hover:text-teal-300">Clair de Lune</span>
          </button>

          <button
            onClick={() => {
              const p = CLASSICAL_PIECES.find((x) => x.moment === 'turno-noche') || CLASSICAL_PIECES[1];
              handleSelectPiece(p);
            }}
            className="p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-teal-500/40 text-left transition-all group"
          >
            <span className="text-[10px] text-indigo-400 font-semibold uppercase block">Guardia Noche</span>
            <span className="text-xs text-slate-300 font-medium group-hover:text-teal-300">Gymnopédie 1</span>
          </button>

          <button
            onClick={() => {
              const p = CLASSICAL_PIECES.find((x) => x.moment === 'foco-clinico') || CLASSICAL_PIECES[2];
              handleSelectPiece(p);
            }}
            className="p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-teal-500/40 text-left transition-all group"
          >
            <span className="text-[10px] text-amber-400 font-semibold uppercase block">Foco Clínico</span>
            <span className="text-xs text-slate-300 font-medium group-hover:text-teal-300">Bach Air</span>
          </button>

          <button
            onClick={() => {
              const p = CLASSICAL_PIECES.find((x) => x.moment === 'cambio-turno') || CLASSICAL_PIECES[5];
              handleSelectPiece(p);
            }}
            className="p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-teal-500/40 text-left transition-all group"
          >
            <span className="text-[10px] text-emerald-400 font-semibold uppercase block">Cambio Turno</span>
            <span className="text-xs text-slate-300 font-medium group-hover:text-teal-300">Canon en Re</span>
          </button>
        </div>

        {/* Piece Selector / Catalog */}
        <PieceSelector
          currentPieceId={currentPiece.id}
          onSelectPiece={handleSelectPiece}
          onOpenSendModal={handleOpenSendModal}
        />

        {/* Clinical Tip Banner */}
        <div className="w-full mt-10 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-teal-950/40 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 mt-0.5 sm:mt-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">
                ¿Por qué 1 minuto es suficiente durante una guardia?
              </h4>
              <p className="text-xs text-slate-400 max-w-xl mt-0.5 leading-relaxed">
                60 segundos de respiración sincronizada con música clásica de tempo lento (largo o adagio) activan la rama parasimpática vagal, reduciendo la taquicardia por adrenalina sin inducir somnolencia excesiva.
              </p>
            </div>
          </div>

          <button
            onClick={() => handleOpenSendModal()}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-teal-500/15 hover:bg-teal-500/25 border border-teal-500/40 text-teal-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Enviar Fragmento a Colega</span>
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        <p>
          Pausa Clásica • Apoyo al Bienestar y Prevención del Burnout en Personal Sanitario
        </p>
        <p className="text-[11px] text-slate-600 mt-1">
          Obras maestras de dominio público adaptadas a fragmentos exactos de 60 segundos
        </p>
      </footer>

      {/* Modals */}
      <ShiftTimerModal
        isOpen={isTimerModalOpen}
        onClose={() => setIsTimerModalOpen(false)}
        timerActive={timerActive}
        timerSecondsLeft={timerSecondsLeft}
        onStartTimer={handleStartTimer}
        onCancelTimer={handleCancelTimer}
      />

      <SendColleagueModal
        isOpen={isSendModalOpen}
        onClose={() => setIsSendModalOpen(false)}
        initialPiece={sendModalPiece}
        onSendSuccess={(rec, title) => {
          // Add to log if desired
        }}
      />

      <ShiftStatsModal
        isOpen={isStatsModalOpen}
        onClose={() => setIsStatsModalOpen(false)}
        logs={sessionLogs}
        onClearLogs={handleClearLogs}
      />
    </div>
  );
}
