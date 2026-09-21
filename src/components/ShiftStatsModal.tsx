import React from 'react';
import { ShiftSessionLog } from '../types';
import { X, BarChart2, Heart, Clock, Award, ShieldCheck, Trash2 } from 'lucide-react';

interface ShiftStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  logs: ShiftSessionLog[];
  onClearLogs: () => void;
}

export const ShiftStatsModal: React.FC<ShiftStatsModalProps> = ({
  isOpen,
  onClose,
  logs,
  onClearLogs
}) => {
  if (!isOpen) return null;

  const totalSessions = logs.length;
  const totalMinutes = Math.round(logs.reduce((acc, l) => acc + l.durationSeconds, 0) / 60);

  const avgStressBefore = totalSessions > 0
    ? (logs.reduce((acc, l) => acc + l.stressBefore, 0) / totalSessions).toFixed(1)
    : '0';

  const avgStressAfter = totalSessions > 0
    ? (logs.reduce((acc, l) => acc + l.stressAfter, 0) / totalSessions).toFixed(1)
    : '0';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div
        id="shift-stats-modal"
        className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl relative my-8 animate-fade-in"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
            <BarChart2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-white">
              Bitácora del Turno Hospitalario
            </h3>
            <p className="text-xs text-slate-400">
              Impacto de tus micro-descansos de 1 minuto en tu salud y bienestar clínico
            </p>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <div className="text-xs text-slate-400 flex items-center justify-center gap-1 mb-1">
              <Clock className="w-3.5 h-3.5 text-teal-400" />
              Micro-pausas
            </div>
            <div className="text-2xl font-bold font-mono text-white">
              {totalSessions}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              {totalMinutes} min de calma
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <div className="text-xs text-slate-400 flex items-center justify-center gap-1 mb-1">
              <Heart className="w-3.5 h-3.5 text-rose-400" />
              Estrés Inicial
            </div>
            <div className="text-2xl font-bold font-mono text-rose-400">
              {avgStressBefore} <span className="text-xs font-normal text-slate-400">/ 5</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              Promedio antes
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <div className="text-xs text-slate-400 flex items-center justify-center gap-1 mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Estrés Final
            </div>
            <div className="text-2xl font-bold font-mono text-emerald-400">
              {avgStressAfter} <span className="text-xs font-normal text-slate-400">/ 5</span>
            </div>
            <div className="text-[10px] text-emerald-400/90 mt-0.5 font-medium">
              Alivio verificado
            </div>
          </div>
        </div>

        {/* Evidence banner */}
        <div className="p-3.5 rounded-xl bg-teal-950/40 border border-teal-500/20 text-xs text-slate-300 mb-5">
          <div className="font-semibold text-teal-300 mb-1 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-teal-400" />
            Evidencia Médica de las Pausas de 1 Minuto
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Estudios en personal de urgencias y UCI demuestran que 60 segundos de música a 50-60 BPM combinados con respiración coherente bajan la presión sistólica y reducen el riesgo de errores en medicación por fatiga sensorial.
          </p>
        </div>

        {/* Session history list */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-semibold text-slate-300">
              Historial de pausas de hoy:
            </h4>
            {logs.length > 0 && (
              <button
                onClick={onClearLogs}
                className="text-[11px] text-slate-500 hover:text-red-400 flex items-center gap-1 transition-colors"
              >
                <Trash2 className="w-3 h-3" />
                Limpiar historial
              </button>
            )}
          </div>

          {logs.length === 0 ? (
            <p className="text-xs text-slate-500 text-center py-6 bg-slate-950 rounded-xl border border-slate-800">
              Aún no has registrado pausas en este turno. ¡Completa tu primer minuto de música clásica!
            </p>
          ) : (
            <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-medium text-slate-200">{log.pieceTitle}</div>
                    <div className="text-[10px] text-slate-400">
                      {log.timestamp} • Turno: <span className="uppercase text-teal-400">{log.shiftType}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-900 border border-slate-700 text-teal-300">
                      Estrés: {log.stressBefore} ➔ {log.stressAfter}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-5 pt-3 border-t border-slate-800 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
