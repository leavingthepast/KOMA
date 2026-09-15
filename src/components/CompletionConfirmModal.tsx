import React, { useState } from 'react';
import { X, CheckCircle2, Building2, Calendar, FileText, Hash } from 'lucide-react';
import { Child, Language, VaccineDose } from '../types';
import { translations } from '../data/translations';
import { CAMBODIAN_HOSPITALS } from '../data/cambodiaVaccineSchedule';

interface CompletionConfirmModalProps {
  child: Child;
  vaccine: VaccineDose;
  language: Language;
  onConfirm: (administeredDate: string, hospital: string, lotNumber?: string, notes?: string) => void;
  onClose: () => void;
}

export const CompletionConfirmModal: React.FC<CompletionConfirmModalProps> = ({
  child,
  vaccine,
  language,
  onConfirm,
  onClose,
}) => {
  const t = translations[language];
  const todayStr = new Date().toISOString().split('T')[0];

  const [date, setDate] = useState(vaccine.dueDate || todayStr);
  const [hospital, setHospital] = useState('National Pediatric Hospital (NPH)');
  const [lotNumber, setLotNumber] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date.trim() || !hospital.trim()) return;
    onConfirm(date, hospital, lotNumber, notes);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
      <div 
        id="completion-confirm-modal"
        className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-stone-200 relative animate-in fade-in zoom-in duration-200"
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900">
                {t.confirmVaccination}
              </h3>
              <p className="text-xs text-stone-500">
                {child.name} • {language === 'kh' ? vaccine.nameKh : vaccine.nameEn}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
          {/* Instruction matching wireframe note */}
          <p className="text-xs text-stone-600 bg-stone-50 p-2.5 rounded-xl border border-stone-200">
            {t.confirmVaccinationDesc}
          </p>

          {/* Date Picker */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.adminDate}</span>
            </label>
            <input
              id="admin-date-input"
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-stone-900"
            />
          </div>

          {/* Hospital / Health Center */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.hospitalLabel}</span>
            </label>
            <input
              id="hospital-input"
              type="text"
              required
              placeholder={t.hospitalPlaceholder}
              value={hospital}
              onChange={(e) => setHospital(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-stone-900"
            />

            {/* Quick-select Cambodian hospitals */}
            <div className="mt-2">
              <span className="text-[11px] font-medium text-stone-500 block mb-1">
                {t.popularHospitals}
              </span>
              <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto pr-1">
                {CAMBODIAN_HOSPITALS.slice(0, 5).map((h, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setHospital(language === 'kh' ? h.kh : h.en)}
                    className="text-[10px] px-2 py-1 bg-stone-100 hover:bg-emerald-50 hover:text-emerald-700 border border-stone-200 rounded-md transition-colors text-stone-700 truncate max-w-full text-left"
                  >
                    {language === 'kh' ? h.kh : h.en}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Lot / Batch Number */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5 text-stone-500" />
              <span>{t.lotNumber}</span>
            </label>
            <input
              id="lot-input"
              type="text"
              placeholder="e.g. BATCH-7728-KH"
              value={lotNumber}
              onChange={(e) => setLotNumber(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-stone-900"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-stone-500" />
              <span>{t.notes}</span>
            </label>
            <input
              id="notes-input"
              type="text"
              placeholder="e.g. Normal reaction, no fever"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-stone-900"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 text-xs font-semibold text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors"
            >
              {t.cancel}
            </button>
            <button
              id="btn-confirm-save-vaccine"
              type="submit"
              className="flex-1 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-colors"
            >
              {t.saveRecord}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
