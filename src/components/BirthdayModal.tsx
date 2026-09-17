import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Shield, Award, X } from 'lucide-react';
import { Child, Language } from '../types';
import { translations } from '../data/translations';

interface BirthdayModalProps {
  child: Child;
  language: Language;
  onClose: () => void;
}

export const BirthdayModal: React.FC<BirthdayModalProps> = ({
  child,
  language,
  onClose,
}) => {
  const t = translations[language];

  useEffect(() => {
    // Blast celebratory confetti
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 9999,
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  }, [child]);

  const triggerMoreConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      zIndex: 9999,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-xs">
      <div 
        id="birthday-celebration-card"
        className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border-4 border-amber-300 relative text-center overflow-hidden animate-in fade-in zoom-in duration-300"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Ambient Top Glow */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-amber-200 rounded-full blur-2xl opacity-60 pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-rose-200 rounded-full blur-2xl opacity-60 pointer-events-none" />

        {/* Header matching wireframe "HAPPY BIRTHDAY" */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold tracking-widest uppercase mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin" />
          <span>{t.happyBirthday}</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin" />
        </div>

        {/* Kid's name matching wireframe */}
        <h2 className="text-2xl font-black text-stone-900 tracking-tight mt-1 mb-3">
          {child.name}
        </h2>

        {/* Animated Cake Box matching wireframe */}
        <div 
          onClick={triggerMoreConfetti}
          className="my-3 py-4 px-3 bg-amber-50/70 border-2 border-dashed border-amber-300 rounded-2xl cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-transform relative group shadow-inner"
          title="Tap to blow candles!"
        >
          <div className="relative mx-auto w-36 h-36 flex items-center justify-center">
            {/* SVG Animated Birthday Cake */}
            <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
              {/* Plate */}
              <ellipse cx="80" cy="142" rx="68" ry="12" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="2" />
              <ellipse cx="80" cy="140" rx="60" ry="9" fill="#F8FAFC" />

              {/* Bottom Tier */}
              <rect x="30" y="98" width="100" height="38" rx="8" fill="#F472B6" />
              {/* Bottom Cream Details */}
              <path d="M30 110 Q40 118 50 110 Q60 118 70 110 Q80 118 90 110 Q100 118 110 110 Q120 118 130 110 L130 98 L30 98 Z" fill="#FDF2F8" />
              <circle cx="45" cy="124" r="3.5" fill="#FDE047" />
              <circle cx="65" cy="124" r="3.5" fill="#6EE7B7" />
              <circle cx="80" cy="124" r="3.5" fill="#93C5FD" />
              <circle cx="95" cy="124" r="3.5" fill="#FDE047" />
              <circle cx="115" cy="124" r="3.5" fill="#6EE7B7" />

              {/* Top Tier */}
              <rect x="45" y="65" width="70" height="34" rx="6" fill="#60A5FA" />
              {/* Top Cream Details */}
              <path d="M45 76 Q55 83 65 76 Q75 83 80 76 Q85 83 95 76 Q105 83 115 76 L115 65 L45 65 Z" fill="#EFF6FF" />
              <circle cx="58" cy="88" r="2.5" fill="#F472B6" />
              <circle cx="80" cy="88" r="2.5" fill="#FDE047" />
              <circle cx="102" cy="88" r="2.5" fill="#34D399" />

              {/* Candles */}
              {/* Candle 1 */}
              <rect x="58" y="42" width="6" height="24" rx="2" fill="#F59E0B" />
              <path d="M61 42 Q58 33 61 28 Q64 33 61 42" fill="#EF4444" className="animate-pulse" />
              <circle cx="61" cy="33" r="2" fill="#FEF08A" className="animate-ping opacity-75" />

              {/* Center Main Candle */}
              <rect x="77" y="38" width="6" height="28" rx="2" fill="#10B981" />
              <path d="M80 38 Q77 26 80 20 Q83 26 80 38" fill="#F59E0B" className="animate-pulse" />
              <circle cx="80" cy="27" r="2.5" fill="#FEF08A" className="animate-ping opacity-90" />

              {/* Candle 3 */}
              <rect x="96" y="42" width="6" height="24" rx="2" fill="#8B5CF6" />
              <path d="M99 42 Q96 33 99 28 Q102 33 99 42" fill="#EF4444" className="animate-pulse" />
              <circle cx="99" cy="33" r="2" fill="#FEF08A" className="animate-ping opacity-75" />
            </svg>
          </div>
          <p className="text-[11px] font-semibold text-amber-700 mt-1">
            {language === 'kh' ? '🎂 ចុចលើនំដើម្បីបាញ់កាំជ្រួចអបអរ!' : '🎂 Tap cake to blow candles & pop confetti!'}
          </p>
        </div>

        {/* KOMA wishing wireframe text */}
        <div className="bg-stone-50 border border-stone-200 rounded-2xl p-3.5 my-3 text-left">
          <div className="flex items-center gap-1.5 text-xs font-bold text-stone-800 mb-1">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span>KOMA Health Wishes</span>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            {language === 'kh'
              ? `KOMA សូមប្រសិទ្ធពរជ័យសិរីសួស្តីដល់កូន ${child.name} ក្នុងថ្ងៃខួបកំណើតគម្រប់ខួបនេះ! សូមឱ្យកូនមានសុខភាពល្អបរិបូរណ៍ ប្រាជ្ញាឈ្លាសវៃ សុវត្ថិភាព ជៀសផុតពីជំងឺទាំងពួង និងមានអនាគតភ្លឺស្វាង!`
              : `KOMA warmly wishes dear ${child.name} boundless happiness, strong immunity, wisdom, protection, and a bright, joyful journey through life!`}
          </p>
          <div className="flex items-center gap-3 mt-2.5 pt-2 border-t border-stone-200 text-[11px] text-stone-500">
            <span className="inline-flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              {language === 'kh' ? 'សុវត្ថិភាព' : 'Safe & Protected'}
            </span>
            <span className="inline-flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-blue-600" />
              {language === 'kh' ? 'លូតលាស់ល្អ' : 'Healthy Growth'}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <button
          id="btn-celebrate-done"
          onClick={() => {
            triggerMoreConfetti();
            setTimeout(onClose, 600);
          }}
          className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>{t.celebrate}</span>
        </button>
      </div>
    </div>
  );
};
