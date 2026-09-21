import React, { useState } from 'react';
import { ClassicalPiece } from '../types';
import { CLASSICAL_PIECES } from '../data/pieces';
import { X, Send, Copy, Check, Share2, Sparkles, HeartHandshake } from 'lucide-react';

interface SendColleagueModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPiece?: ClassicalPiece;
  onSendSuccess?: (recipient: string, pieceTitle: string) => void;
}

const HOSPITAL_PRESET_MESSAGES = [
  'Te regalo este minuto de música clásica para desconectar del ruido del hospital y recargar energías. ¡Mucho ánimo con el turno! 🩺✨',
  'Pausa obligatoria de 60 segundos tras esta urgencia. Tu bienestar también es prioridad. Respira hondo con este fragmento. 🫀🎵',
  'Una dosis de calma para superar la guardia nocturna. Tómate un minuto en silencio. 🌙☕',
  'Reset mental de 1 minuto antes de pasar a la siguiente ronda de pacientes. ¡Gran trabajo hoy! 🤝🎻'
];

export const SendColleagueModal: React.FC<SendColleagueModalProps> = ({
  isOpen,
  onClose,
  initialPiece,
  onSendSuccess
}) => {
  const [recipient, setRecipient] = useState<string>('Compañero/a de guardia');
  const [selectedPieceId, setSelectedPieceId] = useState<string>(
    initialPiece?.id || CLASSICAL_PIECES[0].id
  );
  const [customMessage, setCustomMessage] = useState<string>(HOSPITAL_PRESET_MESSAGES[0]);
  const [copied, setCopied] = useState<boolean>(false);
  const [sentSuccess, setSentSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentPiece = CLASSICAL_PIECES.find((p) => p.id === selectedPieceId) || CLASSICAL_PIECES[0];

  const shareText = `🩺 *Receta de Relajación Hospitalaria (1 Minuto)*\nPara: ${recipient}\n\n"${customMessage}"\n\n🎵 *Fragmento:* ${currentPiece.title} - ${currentPiece.composer}\n⏱️ *Duración:* 1 minuto exacto con respiración guiada\n💡 *Beneficio clínico:* ${currentPiece.clinicalBenefit}\n\nEscúchalo aquí: ${window.location.href}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleWhatsAppShare = () => {
    const encoded = encodeURIComponent(shareText);
    const url = `https://api.whatsapp.com/send?text=${encoded}`;
    window.open(url, '_blank');
    if (onSendSuccess) {
      onSendSuccess(recipient, currentPiece.title);
    }
    setSentSuccess(true);
    setTimeout(() => {
      setSentSuccess(false);
      onClose();
    }, 1500);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Pausa Clásica: 1 Minuto para ${recipient}`,
          text: shareText,
          url: window.location.href
        });
        if (onSendSuccess) onSendSuccess(recipient, currentPiece.title);
        setSentSuccess(true);
        setTimeout(() => {
          setSentSuccess(false);
          onClose();
        }, 1500);
      } catch {
        // user canceled or error
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div
        id="send-colleague-modal"
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
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-white">
              Enviar Fragmento a un Colega de Guardia
            </h3>
            <p className="text-xs text-slate-400">
              Comparte 1 minuto de música clásica para aliviar la tensión de tu equipo hospitalario
            </p>
          </div>
        </div>

        {sentSuccess ? (
          <div className="p-8 text-center bg-teal-950/40 rounded-xl border border-teal-500/30 my-4">
            <div className="w-12 h-12 rounded-full bg-teal-500/20 text-teal-400 mx-auto flex items-center justify-center mb-3">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <h4 className="text-base font-semibold text-white mb-1">¡Dosis de calma enviada!</h4>
            <p className="text-xs text-slate-300">
              Tu colega recibirá su fragmento de 1 minuto para relajarse en el turno.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Destinatario */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                ¿A quién se lo envías?
              </label>
              <input
                id="recipient-input"
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Ej. Dra. Laura / Enfermero Juan / Equipo de Urgencias"
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-teal-500 transition-colors"
              />
            </div>

            {/* Selector de Fragmento */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Selecciona la obra clásica (1 minuto):
              </label>
              <select
                id="select-piece-send"
                value={selectedPieceId}
                onChange={(e) => setSelectedPieceId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-teal-500"
              >
                {CLASSICAL_PIECES.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title} - {p.composer} ({p.momentLabel})
                  </option>
                ))}
              </select>
            </div>

            {/* Mensaje de Apoyo Hospitalario */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Mensaje de aliento durante el turno:
              </label>
              <div className="flex gap-1.5 overflow-x-auto pb-2 mb-2 no-scrollbar">
                {HOSPITAL_PRESET_MESSAGES.map((msg, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCustomMessage(msg)}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 whitespace-nowrap border border-slate-700/60"
                  >
                    Opción {idx + 1}
                  </button>
                ))}
              </div>
              <textarea
                id="custom-message-textarea"
                rows={3}
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-teal-500 leading-relaxed resize-none"
              />
            </div>

            {/* Vista Previa de la "Receta Médica de Calma" */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-dashed border-teal-500/40 text-xs text-slate-300 relative">
              <div className="flex items-center justify-between text-[11px] text-teal-400 font-mono mb-1">
                <span className="font-bold uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Prescripción: Micro-descanso Clínico
                </span>
                <span>⏱️ 1 Minuto</span>
              </div>
              <p className="font-serif text-sm font-semibold text-white mb-0.5">
                {currentPiece.title}
              </p>
              <p className="text-[11px] text-slate-400 mb-2">
                {currentPiece.composer} • {currentPiece.momentLabel}
              </p>
              <p className="text-[11px] text-slate-300 italic bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                "{customMessage}"
              </p>
            </div>

            {/* Botones de Envío y Compartir */}
            <div className="flex flex-col sm:flex-row items-center gap-2 pt-2">
              <button
                type="button"
                onClick={handleWhatsAppShare}
                className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-900/30 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Enviar por WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={handleNativeShare}
                className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-teal-500/15 hover:bg-teal-500/25 border border-teal-500/40 text-teal-300 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Compartir</span>
              </button>

              <button
                type="button"
                onClick={handleCopy}
                className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? '¡Copiado!' : 'Copiar Texto'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
