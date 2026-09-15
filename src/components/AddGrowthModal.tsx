import React, { useState } from 'react';
import { X, TrendingUp, Calendar } from 'lucide-react';
import { Child, GrowthRecord, Language } from '../types';
import { translations } from '../data/translations';

interface AddGrowthModalProps {
  child: Child;
  language: Language;
  onSave: (record: GrowthRecord) => void;
  onClose: () => void;
}

export const AddGrowthModal: React.FC<AddGrowthModalProps> = ({
  child,
  language,
  onSave,
  onClose,
}) => {
  const t = translations[language];
  const todayStr = new Date().toISOString().split('T')[0];

  const [date, setDate] = useState(todayStr);
  const [weightKg, setWeightKg] = useState('11.5');
  const [heightCm, setHeightCm] = useState('85.0');
  const [headCircumferenceCm, setHeadCircumferenceCm] = useState('47.0');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(weightKg);
    const h = parseFloat(heightCm);
    const head = headCircumferenceCm ? parseFloat(headCircumferenceCm) : undefined;

    if (isNaN(w) || isNaN(h)) return;

    // Estimate age in months from birth date
    const [by, bm, bd] = child.birthDate.split('-').map(Number);
    const [ry, rm, rd] = date.split('-').map(Number);
    const bDate = new Date(by, bm - 1, bd);
    const rDate = new Date(ry, rm - 1, rd);
    const diffMonths = Math.max(0, Math.round((rDate.getTime() - bDate.getTime()) / (1000 * 60 * 60 * 24 * 30.4375)));

    const newRecord: GrowthRecord = {
      id: `growth-${Date.now()}`,
      date,
      ageMonths: diffMonths,
      weightKg: w,
      heightCm: h,
      headCircumferenceCm: head,
    };

    onSave(newRecord);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
      <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-stone-200 relative animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-teal-100 text-teal-800">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900">
                {t.addGrowthRecord}
              </h3>
              <p className="text-xs text-stone-500">{child.name}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-stone-400 hover:text-stone-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-stone-500" />
              <span>{language === 'kh' ? 'កាលបរិច្ឆេទវាស់' : 'Measurement Date'}</span>
            </label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-xl font-medium text-stone-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                {t.weight} (kg) *
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={weightKg}
                onChange={(e) => setWeightKg(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-xl font-bold text-stone-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                {t.height} (cm) *
              </label>
              <input
                type="number"
                step="0.1"
                required
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-xl font-bold text-stone-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              {t.headCircumference} (cm)
            </label>
            <input
              type="number"
              step="0.1"
              value={headCircumferenceCm}
              onChange={(e) => setHeadCircumferenceCm(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-xl text-stone-900"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 text-xs font-semibold text-stone-600 bg-stone-100 rounded-xl"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="flex-1 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs"
            >
              {language === 'kh' ? 'កត់ត្រារង្វាស់' : 'Save Measurement'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
