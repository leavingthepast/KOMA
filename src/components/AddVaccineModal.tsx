import React, { useState } from 'react';
import { X, ShieldPlus, Calendar, Building2, FileText, CheckCircle2 } from 'lucide-react';
import { Child, Language, VaccineCategoryType, VaccineDose } from '../types';
import { translations } from '../data/translations';

interface AddVaccineModalProps {
  child: Child;
  language: Language;
  onClose: () => void;
  onSave: (child: Child, newVaccine: VaccineDose) => void;
}

export const AddVaccineModal: React.FC<AddVaccineModalProps> = ({
  child,
  language,
  onClose,
  onSave,
}) => {
  const t = translations[language];
  const isKh = language === 'kh';

  const [nameEn, setNameEn] = useState('');
  const [nameKh, setNameKh] = useState('');
  const [category, setCategory] = useState<VaccineCategoryType>('OTHER');
  const [isCompleted, setIsCompleted] = useState(false);
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);
  const [completedDate, setCompletedDate] = useState(new Date().toISOString().split('T')[0]);
  const [hospital, setHospital] = useState('');
  const [lotNumber, setLotNumber] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameEn.trim()) return;

    const newDose: VaccineDose = {
      id: `custom-vac-${Date.now()}`,
      category,
      nameEn: nameEn.trim(),
      nameKh: nameKh.trim() || nameEn.trim(),
      doseNumber: 1,
      totalDoses: 1,
      recommendedAgeMonths: 0,
      recommendedAgeLabelEn: 'Custom / Additional',
      recommendedAgeLabelKh: 'បន្ថែមពិសេស',
      isCompleted,
      dueDate,
      completedDate: isCompleted ? completedDate : undefined,
      hospital: isCompleted ? hospital.trim() || undefined : undefined,
      lotNumber: lotNumber.trim() || undefined,
      notes: notes.trim() || undefined,
    };

    onSave(child, newDose);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 relative my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <ShieldPlus className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-stone-900 leading-tight">
              {isKh ? 'បន្ថែមវ៉ាក់សាំងថ្មី' : 'Add Custom Vaccination'}
            </h2>
            <p className="text-xs text-stone-500 font-medium">
              {child.name}
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              {isKh ? 'ឈ្មោះវ៉ាក់សាំង (អង់គ្លេស)' : 'Vaccine Name (English) *'}
            </label>
            <input
              type="text"
              required
              value={nameEn}
              onChange={(e) => setNameEn(e.target.value)}
              placeholder="e.g. Hepatitis A Booster, COVID-19"
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              {isKh ? 'ឈ្មោះវ៉ាក់សាំង (ភាសាខ្មែរ - ស្រេចចិត្ត)' : 'Vaccine Name (Khmer - Optional)'}
            </label>
            <input
              type="text"
              value={nameKh}
              onChange={(e) => setNameKh(e.target.value)}
              placeholder="ឧ. វ៉ាក់សាំងការពារជំងឺរលាកថ្លើមប្រភេទ ក"
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                {isKh ? 'ប្រភេទ' : 'Category'}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as VaccineCategoryType)}
                className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="BCG">BCG</option>
                <option value="OPV">OPV (Polio)</option>
                <option value="HIB">Pentavalent (HIB)</option>
                <option value="PCV">PCV</option>
                <option value="OTHER">Other / Special</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                {isKh ? 'ស្ថានភាព' : 'Status'}
              </label>
              <select
                value={isCompleted ? 'completed' : 'scheduled'}
                onChange={(e) => setIsCompleted(e.target.value === 'completed')}
                className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="scheduled">{isKh ? 'បានកំណត់ពេល (Scheduled)' : 'Scheduled'}</option>
                <option value="completed">{isKh ? 'បានចាក់រួច (Completed)' : 'Completed'}</option>
              </select>
            </div>
          </div>

          {!isCompleted ? (
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-stone-500" />
                {isKh ? 'ថ្ងៃកំណត់ចាក់ (Due Date)' : 'Due Date'}
              </label>
              <input
                type="date"
                required
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          ) : (
            <div className="space-y-3 p-3 bg-emerald-50/50 rounded-2xl border border-emerald-200">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                  {isKh ? 'កាលបរិច្ឆេទចាក់ (Administered Date)' : 'Administered Date'}
                </label>
                <input
                  type="date"
                  required
                  value={completedDate}
                  onChange={(e) => setCompletedDate(e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-stone-200 rounded-xl text-stone-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                  {isKh ? 'មន្ទីរពេទ្យ / មណ្ឌលសុខភាព' : 'Hospital / Health Center'}
                </label>
                <input
                  type="text"
                  value={hospital}
                  onChange={(e) => setHospital(e.target.value)}
                  placeholder="e.g. National Pediatric Hospital"
                  className="w-full px-3.5 py-2 bg-white border border-stone-200 rounded-xl text-stone-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-stone-500" />
              {isKh ? 'ចំណាំ (Notes)' : 'Notes (Optional)'}
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Batch #, doctor remarks"
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-xl text-xs transition-colors"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-xs shadow-md transition-colors flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isKh ? 'រក្សាទុកវ៉ាក់សាំង' : 'Save Vaccine'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
