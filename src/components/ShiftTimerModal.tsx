import React, { useState } from 'react';
import { X, Bell, Clock, Check, AlertCircle } from 'lucide-react';

interface ShiftTimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  timerActive: boolean;
  timerSecondsLeft: number | null;
  onStartTimer: (minutes: number) => void;
  onCancelTimer: () => void;
}

const PRESET_TIMES = [
  { minutes: 1, label: '1 minuto', note: 'Demostración / Micro-pausa inmediata' },
  { minutes: 30, label: '30 minutos', note: 'Pausa intermedia en urgencias' },
  { minutes: 45, label: '45 minutos', note: 'Entre rondas de enfermería' },
  { minutes: 60, label: '1 hora', note: 'Recomendado por turno' },
  { minutes: 90, label: '90 minutos', note: 'Ciclo ultradiano de descanso' },
  { minutes: 120, label: '2 horas', note: 'Guardia de alta demanda' }
];

export const ShiftTimerModal: React.FC<ShiftTimerModalProps> = ({
  isOpen,
  onClose,
  timerActive,
  timerSecondsLeft,
  onStartTimer,
  onCancelTimer
}) => {
  const [selectedMinutes, setSelectedMinutes] = useState<number>(1); // Default to 1 min per user request

  if (!isOpen) return null;

  const formatSeconds = (totalSec: number) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div
        id="shift-timer-modal"
        className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl relative animate-fade-in"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-white">
              Aviso de Micro-pausa
            </h3>
            <p className="text-xs text-slate-400">
              Programa un aviso suave para tomarte 1 minuto de música clásica durante el turno
            </p>
          </div>
        </div>

        {/* Current Active Timer Status */}
        {timerActive && timerSecondsLeft !== null ? (
          <div className="my-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-center">
            <div className="text-xs font-semibold text-amber-300 uppercase tracking-wider mb-1 flex items-center justify-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              Temporizador Activo
            </div>
            <div className="text-3xl font-mono font-bold text-white my-1">
              {formatSeconds(timerSecondsLeft)}
            </div>
            <p className="text-xs text-slate-300">
              Cuando el tiempo acabe, sonará una campana y se activará tu minuto de relajación.
            </p>
            <button
              onClick={() => {
                onCancelTimer();
                onClose();
              }}
              className="mt-3 px-4 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-300 text-xs font-medium transition-colors"
            >
              Cancelar Temporizador
            </button>
          </div>
        ) : (
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-2">
              Selecciona en cuánto tiempo deseas recibir tu aviso:
            </label>

            <div className="space-y-2 mb-5">
              {PRESET_TIMES.map((preset) => {
                const isSelected = selectedMinutes === preset.minutes;
                return (
                  <button
                    key={preset.minutes}
                    type="button"
                    onClick={() => setSelectedMinutes(preset.minutes)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-teal-500/15 border-teal-500/50 text-white shadow-sm'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800/80'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-semibold flex items-center gap-1.5">
                        <span>{preset.label}</span>
                        {preset.minutes === 1 && (
                          <span className="text-[10px] bg-teal-500/20 text-teal-300 border border-teal-500/30 px-1.5 py-0.2 rounded">
                            ¡Rápido!
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-400">
                        {preset.note}
                      </div>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                        isSelected
                          ? 'border-teal-400 bg-teal-400 text-slate-950'
                          : 'border-slate-700'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl border border-slate-800 text-slate-400 hover:bg-slate-800 text-xs font-semibold transition-colors"
              >
                Cerrar
              </button>
              <button
                type="button"
                onClick={() => {
                  onStartTimer(selectedMinutes);
                  onClose();
                }}
                className="flex-1 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-md shadow-teal-500/20 transition-all"
              >
                Activar Aviso ({selectedMinutes}m)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
