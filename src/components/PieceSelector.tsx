import React, { useState } from 'react';
import { ClassicalPiece, ShiftMoment } from '../types';
import { CLASSICAL_PIECES, HOSPITAL_SHIFT_MOMENTS } from '../data/pieces';
import { Play, Music, Share2, Sparkles, Clock, Check } from 'lucide-react';

interface PieceSelectorProps {
  currentPieceId: string;
  onSelectPiece: (piece: ClassicalPiece, autoPlay?: boolean) => void;
  onOpenSendModal: (piece: ClassicalPiece) => void;
}

export const PieceSelector: React.FC<PieceSelectorProps> = ({
  currentPieceId,
  onSelectPiece,
  onOpenSendModal
}) => {
  const [selectedMoment, setSelectedMoment] = useState<ShiftMoment | 'all'>('all');

  const filteredPieces = selectedMoment === 'all'
    ? CLASSICAL_PIECES
    : CLASSICAL_PIECES.filter((p) => p.moment === selectedMoment);

  return (
    <section className="w-full mt-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <h2 className="text-lg font-serif font-bold text-white tracking-tight flex items-center gap-2">
            <Music className="w-4 h-4 text-teal-400" />
            Catálogo de Fragmentos de 1 Minuto
          </h2>
          <p className="text-xs text-slate-400">
            Piezas maestras seleccionadas con tempo de 46 a 60 BPM para desacelerar la taquicardia del turno.
          </p>
        </div>

        <span className="text-xs text-slate-500 font-mono self-start sm:self-auto">
          {filteredPieces.length} fragmentos disponibles
        </span>
      </div>

      {/* Hospital Moment Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-4 no-scrollbar">
        <button
          id="filter-all-moments"
          onClick={() => setSelectedMoment('all')}
          className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors border ${
            selectedMoment === 'all'
              ? 'bg-teal-500/20 border-teal-500/50 text-teal-300'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          Todos los Momentos
        </button>

        {HOSPITAL_SHIFT_MOMENTS.map((moment) => {
          const isSelected = selectedMoment === moment.id;
          return (
            <button
              key={moment.id}
              id={`filter-moment-${moment.id}`}
              onClick={() => setSelectedMoment(moment.id)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors border ${
                isSelected
                  ? 'bg-teal-500/20 border-teal-500/50 text-teal-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {moment.label}
            </button>
          );
        })}
      </div>

      {/* Grid of Classical Pieces */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {filteredPieces.map((p) => {
          const isCurrent = p.id === currentPieceId;

          return (
            <div
              key={p.id}
              id={`piece-card-${p.id}`}
              className={`group relative rounded-xl border p-4 transition-all duration-200 ${
                isCurrent
                  ? 'bg-gradient-to-br from-slate-900 via-teal-950/40 to-slate-900 border-teal-500/50 shadow-lg shadow-teal-500/5'
                  : 'bg-slate-900/70 hover:bg-slate-900 border-slate-800/90 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-teal-400 bg-teal-500/10 border border-teal-500/20 px-2 py-0.5 rounded-md">
                      {p.momentLabel}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {p.bpm} BPM • {p.keySignature}
                    </span>
                  </div>

                  <h3 className="font-serif font-semibold text-slate-100 text-base group-hover:text-teal-300 transition-colors truncate">
                    {p.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">
                    {p.composer} ({p.year})
                  </p>

                  <p className="text-xs text-slate-300/90 mt-2 line-clamp-2 leading-relaxed">
                    {p.clinicalBenefit}
                  </p>
                </div>

                <div className="flex flex-col gap-1.5 items-end">
                  <button
                    id={`play-piece-btn-${p.id}`}
                    onClick={() => onSelectPiece(p, true)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                      isCurrent
                        ? 'bg-teal-500 text-slate-950 font-bold shadow-md shadow-teal-500/30'
                        : 'bg-slate-800 hover:bg-teal-500 hover:text-slate-950 text-slate-300'
                    }`}
                    title={isCurrent ? 'Pieza activa' : 'Escuchar este 1 minuto'}
                  >
                    {isCurrent ? <Check className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                  </button>

                  <button
                    id={`share-piece-card-btn-${p.id}`}
                    onClick={() => onOpenSendModal(p)}
                    className="p-1.5 text-slate-500 hover:text-teal-300 transition-colors"
                    title="Enviar a un compañero de guardia"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Quote Footer */}
              <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400 italic">
                <span>"{p.quote}"</span>
                <span className="flex items-center gap-1 font-mono text-teal-400/80 not-italic">
                  <Clock className="w-3 h-3" /> 1 min
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
