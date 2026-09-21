import React from 'react';
import { HospitalShiftType } from '../types';
import { Stethoscope, Bell, Send, BarChart2, Moon, Sun, HeartPulse, Volume2, VolumeX } from 'lucide-react';

interface HeaderProps {
  shiftType: HospitalShiftType;
  onShiftChange: (shift: HospitalShiftType) => void;
  onOpenTimerModal: () => void;
  onOpenSendModal: () => void;
  onOpenStatsModal: () => void;
  timerActive: boolean;
  timerSecondsLeft: number | null;
  volume: number;
  onVolumeChange: (vol: number) => void;
}

const SHIFT_OPTIONS: { id: HospitalShiftType; label: string; icon: string }[] = [
  { id: 'urgencias', label: 'Urgencias', icon: '🚨' },
  { id: 'uci', label: 'UCI / Críticos', icon: '🫀' },
  { id: 'planta', label: 'Hospitalización', icon: '🏥' },
  { id: 'quirofano', label: 'Quirófano', icon: '🩺' },
  { id: 'noche', label: 'Guardia Nocturna', icon: '🌙' },
  { id: 'guardia24', label: 'Turno 24h', icon: '⏱️' }
];

export const Header: React.FC<HeaderProps> = ({
  shiftType,
  onShiftChange,
  onOpenTimerModal,
  onOpenSendModal,
  onOpenStatsModal,
  timerActive,
  timerSecondsLeft,
  volume,
  onVolumeChange
}) => {
  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-30 px-4 py-3 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Logo & Title */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 shadow-inner">
              <Stethoscope className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-lg sm:text-xl font-semibold tracking-tight text-white">
                  Pausa Clásica
                </h1>
                <span className="text-[11px] font-medium bg-teal-500/20 text-teal-300 border border-teal-500/30 px-2 py-0.5 rounded-full">
                  1 Minuto
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Micro-descansos de música clásica para turnos hospitalarios
              </p>
            </div>
          </div>

          {/* Quick Volume on Mobile */}
          <div className="flex md:hidden items-center gap-1.5">
            <button
              id="mobile-volume-toggle"
              onClick={() => onVolumeChange(volume > 0 ? 0 : 0.8)}
              className="p-2 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white"
              aria-label="Silenciar / Activar sonido"
            >
              {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-teal-400" />}
            </button>
          </div>
        </div>

        {/* Shift selector & Action Tools */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
          {/* Shift Selector */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1 text-xs">
            <span className="text-slate-400 mr-2 flex items-center gap-1 font-medium">
              <HeartPulse className="w-3.5 h-3.5 text-teal-400" />
              Turno:
            </span>
            <select
              id="hospital-shift-select"
              value={shiftType}
              onChange={(e) => onShiftChange(e.target.value as HospitalShiftType)}
              className="bg-transparent text-slate-200 font-medium focus:outline-none cursor-pointer"
            >
              {SHIFT_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id} className="bg-slate-900 text-slate-200">
                  {opt.icon} {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Timer Reminder Button */}
          <button
            id="open-timer-modal-btn"
            onClick={onOpenTimerModal}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
              timerActive
                ? 'bg-amber-500/15 border-amber-500/40 text-amber-300 animate-pulse'
                : 'bg-slate-900 hover:bg-slate-800/80 border-slate-800 text-slate-300'
            }`}
          >
            <Bell className={`w-3.5 h-3.5 ${timerActive ? 'text-amber-400' : 'text-slate-400'}`} />
            <span>
              {timerActive && timerSecondsLeft !== null
                ? `Aviso en ${formatTimer(timerSecondsLeft)}`
                : 'Recordatorio (1m)'}
            </span>
          </button>

          {/* Send to colleague */}
          <button
            id="open-send-modal-btn"
            onClick={onOpenSendModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 text-teal-300 transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Enviar a Colega</span>
          </button>

          {/* Stats Button */}
          <button
            id="open-stats-modal-btn"
            onClick={onOpenStatsModal}
            className="p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 transition-colors"
            title="Registro de pausas del turno"
          >
            <BarChart2 className="w-4 h-4" />
          </button>

          {/* Desktop Volume Slider */}
          <div className="hidden md:flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1">
            <button
              onClick={() => onVolumeChange(volume > 0 ? 0 : 0.8)}
              className="text-slate-400 hover:text-white"
            >
              {volume === 0 ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-teal-400" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
              className="w-16 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-400"
              aria-label="Volumen general"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
