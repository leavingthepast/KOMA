import React from 'react';
import { X, Printer, Download, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Child, Language } from '../types';
import { translations } from '../data/translations';
import { formatDate } from '../data/cambodiaVaccineSchedule';

interface PhysicalBookletModalProps {
  child: Child;
  language: Language;
  onClose: () => void;
}

export const PhysicalBookletModal: React.FC<PhysicalBookletModalProps> = ({
  child,
  language,
  onClose,
}) => {
  const t = translations[language];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-stone-900/70 backdrop-blur-xs overflow-y-auto">
      <div 
        id="physical-booklet-container"
        className="w-full max-w-lg bg-amber-50/90 text-stone-900 rounded-3xl p-5 shadow-2xl border-4 border-amber-300 relative my-6 animate-in fade-in zoom-in duration-200"
      >
        {/* Actions header (hidden when printing) */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-amber-200 no-print">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-200/80 px-2.5 py-1 rounded-full">
              {language === 'kh' ? 'សៀវភៅតាមដានសុខភាពកុមារពិត' : 'Official MOH Hard-copy Booklet'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-white hover:bg-stone-50 border border-stone-300 rounded-xl text-xs font-bold text-stone-700 flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-stone-600" />
              <span>{t.printOrExport}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-stone-200/70 hover:bg-stone-300 text-stone-700 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Official Cambodian MOH Card Frame */}
        <div className="bg-white p-5 rounded-2xl border-2 border-stone-800 shadow-sm space-y-4 print:border-none print:p-0">
          {/* Cambodian National Emblem Header */}
          <div className="text-center border-b-2 border-stone-800 pb-3">
            <p className="font-bold text-xs tracking-wider text-stone-700">
              ព្រះរាជាណាចក្រកម្ពុជា
            </p>
            <p className="font-semibold text-[11px] tracking-wide text-stone-600">
              ជាតិ សាសនា ព្រះមហាក្សត្រ
            </p>
            <div className="w-16 h-0.5 bg-stone-700 mx-auto my-1"></div>
            <p className="font-bold text-xs text-stone-800 uppercase">
              ក្រសួងសុខាភិបាល (MINISTRY OF HEALTH)
            </p>
            <h1 className="text-base font-black text-stone-900 uppercase mt-1 tracking-tight">
              សៀវភៅតាមដានសុខភាពកុមារ
            </h1>
            <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">
              CARNET DE SANTÉ INFANTILE • CHILD HEALTH RECORD BOOK
            </p>
          </div>

          {/* Child Profile Box inside Card */}
          <div className="grid grid-cols-2 gap-2 text-xs border border-stone-300 rounded-xl p-3 bg-stone-50/50">
            <div>
              <span className="text-[10px] text-stone-500 font-bold uppercase block">
                {language === 'kh' ? 'ឈ្មោះកុមារ / Child Name' : 'Child Name'}:
              </span>
              <span className="font-extrabold text-sm text-stone-900">{child.name}</span>
            </div>
            <div>
              <span className="text-[10px] text-stone-500 font-bold uppercase block">
                {language === 'kh' ? 'ភេទ / Sex' : 'Gender'}:
              </span>
              <span className="font-bold text-stone-800 uppercase">{child.gender}</span>
            </div>
            <div>
              <span className="text-[10px] text-stone-500 font-bold uppercase block">
                {language === 'kh' ? 'ថ្ងៃខែឆ្នាំកំណើត / Birth Date' : 'Birth Date'}:
              </span>
              <span className="font-bold text-stone-900">
                {formatDate(child.birthDate, language)} {child.birthTime}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-stone-500 font-bold uppercase block">
                {language === 'kh' ? 'ប្រភេទឈាម / Blood Type' : 'Blood Group'}:
              </span>
              <span className="font-bold text-stone-900 font-mono">{child.bloodType}</span>
            </div>
            <div className="col-span-2">
              <span className="text-[10px] text-stone-500 font-bold uppercase block">
                {language === 'kh' ? 'ទីកន្លែងកើត / Place of Birth' : 'Place of Birth'}:
              </span>
              <span className="font-medium text-stone-800">{child.birthLocation}</span>
            </div>
          </div>

          {/* Official Immunization Record Table */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <h3 className="text-xs font-black uppercase tracking-wider text-stone-900">
                {language === 'kh' ? 'តារាងចាក់ថ្នាំបង្ការជាតិ' : 'National Immunization Record'}
              </h3>
              <span className="text-[10px] font-semibold text-stone-500">
                MOH Cambodia Standard
              </span>
            </div>

            <div className="border-2 border-stone-800 rounded-lg overflow-hidden text-[11px]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-stone-100 border-b border-stone-800 text-stone-800 font-bold">
                    <th className="p-1.5 border-r border-stone-800">{language === 'kh' ? 'ថ្នាំបង្ការ' : 'Vaccine'}</th>
                    <th className="p-1.5 border-r border-stone-800">{language === 'kh' ? 'អាយុត្រូវចាក់' : 'Due Age'}</th>
                    <th className="p-1.5 border-r border-stone-800">{language === 'kh' ? 'កាលបរិច្ឆេទចាក់' : 'Date Given'}</th>
                    <th className="p-1.5">{language === 'kh' ? 'មណ្ឌលសុខភាព / ហត្ថលេខា' : 'Hospital / Stamp'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-300">
                  {child.vaccines.map((vac) => {
                    return (
                      <tr key={vac.id} className={vac.isCompleted ? 'bg-emerald-50/30' : 'bg-white'}>
                        <td className="p-1.5 border-r border-stone-300 font-bold text-stone-900">
                          {vac.nameEn}
                        </td>
                        <td className="p-1.5 border-r border-stone-300 text-stone-600">
                          {vac.recommendedAgeLabelEn}
                        </td>
                        <td className="p-1.5 border-r border-stone-300 font-medium">
                          {vac.isCompleted && vac.completedDate ? (
                            <span className="font-mono text-emerald-900 font-bold">
                              {formatDate(vac.completedDate, language)}
                            </span>
                          ) : (
                            <span className="text-stone-400 font-mono">
                              Due: {formatDate(vac.dueDate, language)}
                            </span>
                          )}
                        </td>
                        <td className="p-1.5">
                          {vac.isCompleted ? (
                            <div className="flex items-center gap-1 text-emerald-800 font-medium truncate">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span className="truncate">{vac.hospital || 'MOH Center'}</span>
                            </div>
                          ) : (
                            <span className="text-stone-300 italic text-[10px]">
                              [ ____________ ]
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Official Stamp Simulation */}
          <div className="pt-2 flex items-center justify-between text-stone-500 text-[10px]">
            <div className="border border-stone-300 p-2 rounded-lg bg-stone-50 w-44">
              <span className="block font-bold text-stone-700">ក្រសួងសុខាភិបាលកម្ពុជា</span>
              <span>National Immunization Program Verification</span>
            </div>
            <div className="text-right border-2 border-dashed border-emerald-600/60 p-2 rounded-xl text-emerald-800 font-semibold rotate-[-2deg]">
              <span>OFFICIAL DIGITAL RECORD</span>
              <br />
              <span className="font-mono text-[9px] text-emerald-600">ID: {child.id.toUpperCase()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
