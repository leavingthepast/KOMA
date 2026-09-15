import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Edit,
  CheckCircle2,
  Clock,
  Calendar,
  Building2,
  ShieldCheck,
  TrendingUp,
  Plus,
  BookOpen,
  FileText,
  AlertTriangle,
  Info
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { Child, Language, VaccineCategoryType, VaccineDose } from '../types';
import { translations } from '../data/translations';
import { calculateAge, formatDate } from '../data/cambodiaVaccineSchedule';
import { WHO_GROWTH_STANDARDS } from '../data/growthStandards';

interface KidViewProps {
  child: Child;
  allChildren: Child[];
  onSelectChild: (id: string) => void;
  onEditKidProfile: (child: Child) => void;
  onEditKidDetail: (child: Child) => void;
  onCheckVaccine: (child: Child, vaccine: VaccineDose) => void;
  onOpenPhysicalCard: (child: Child) => void;
  onAddGrowthRecord: (child: Child) => void;
  language: Language;
}

export const KidView: React.FC<KidViewProps> = ({
  child,
  allChildren,
  onSelectChild,
  onEditKidProfile,
  onEditKidDetail,
  onCheckVaccine,
  onOpenPhysicalCard,
  onAddGrowthRecord,
  language,
}) => {
  const t = translations[language];

  // Accordion states matching wireframe screens 4, 5, 6
  // Screen 4 has both collapsed/preview, Screen 5 has Vaccination open, Screen 6 has Detail open
  const [isVaccinationOpen, setIsVaccinationOpen] = useState(true);
  const [isDetailOpen, setIsDetailOpen] = useState(true);
  const [isGrowthOpen, setIsGrowthOpen] = useState(false);

  // Growth chart metric toggle: weight vs height
  const [growthMetric, setGrowthMetric] = useState<'weight' | 'height'>('weight');

  const age = calculateAge(child.birthDate);

  // Group child's vaccines into wireframe categories:
  // BCG, OPV, HIB, PCV, VITAMIN A Intake, Deworming Pill, OTHER
  const categories: { type: VaccineCategoryType; label: string; desc: string }[] = [
    { type: 'BCG', label: t.catBCG, desc: 'Tuberculosis' },
    { type: 'OPV', label: t.catOPV, desc: 'Oral Polio Vaccine' },
    { type: 'HIB', label: t.catHIB, desc: 'Pentavalent (DTP-HepB-Hib)' },
    { type: 'PCV', label: t.catPCV, desc: 'Pneumococcal Conjugate' },
    { type: 'VITAMIN_A', label: t.catVITAMIN_A, desc: 'Vitamin A Micronutrient' },
    { type: 'DEWORMING', label: t.catDEWORMING, desc: 'Deworming (Mebendazole)' },
    { type: 'OTHER', label: t.catOTHER, desc: 'MR, JE, IPV, HepB' },
  ];

  // Prepare growth data merged with WHO standards
  const chartData = WHO_GROWTH_STANDARDS.map((who) => {
    const kidRecord = child.growthRecords.find((r) => Math.round(r.ageMonths) === who.ageMonths);
    return {
      ageMonths: who.ageMonths,
      ageLabel: `${who.ageMonths}m`,
      standardMedian: growthMetric === 'weight' ? who.weightP50 : who.heightP50,
      standardLow: growthMetric === 'weight' ? who.weightP3 : who.heightP3,
      standardHigh: growthMetric === 'weight' ? who.weightP97 : who.heightP97,
      childActual: kidRecord ? (growthMetric === 'weight' ? kidRecord.weightKg : kidRecord.heightCm) : undefined,
    };
  });

  return (
    <div className="pb-24 pt-2 px-4 space-y-4">
      {/* Horizontal Child Switcher Bar */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {allChildren.map((k) => {
          const isSelected = k.id === child.id;
          return (
            <button
              key={k.id}
              onClick={() => onSelectChild(k.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 ${
                isSelected
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              <img
                src={k.photoUrl}
                alt={k.name}
                referrerPolicy="no-referrer"
                className="w-5 h-5 rounded-full object-cover"
              />
              <span>{k.name}</span>
            </button>
          );
        })}
      </div>

      {/* Top Profile Header Card matching wireframe Screens 4, 5, 6:
          [Avatar Circle] Name: Keang
          [Edit profile] button */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div className="relative">
            <img
              src={child.photoUrl}
              alt={child.name}
              referrerPolicy="no-referrer"
              className="w-16 h-16 rounded-full object-cover border-2 border-emerald-500 shadow-xs"
            />
            <span
              className="absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white shadow-2xs"
              style={{ backgroundColor: child.colorTheme }}
            />
          </div>

          <div>
            <h2 className="text-xl font-black text-stone-900 leading-tight">
              Name: {child.name}
            </h2>
            <p className="text-xs text-stone-500 font-medium mt-0.5">
              {t.age}: <span className="text-stone-800 font-semibold">{language === 'kh' ? age.labelKh : age.labelEn}</span>
            </p>

            {/* Wireframe [Edit profile] button */}
            <button
              id="btn-edit-kid-profile"
              onClick={() => onEditKidProfile(child)}
              className="mt-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded-md inline-flex items-center gap-1 transition-colors"
            >
              <Edit className="w-3 h-3" />
              <span>{t.editProfile}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Accordion 1: Vaccination Section matching wireframe Screens 4 & 5 */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        {/* Accordion Header */}
        <button
          id="btn-accordion-vaccination"
          onClick={() => setIsVaccinationOpen(!isVaccinationOpen)}
          className="w-full px-4 py-3.5 flex items-center justify-between bg-white hover:bg-stone-50 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="text-left">
              <h3 className="text-base font-extrabold text-stone-900 leading-tight">
                {t.vaccinationSection}
              </h3>
              <p className="text-[11px] text-stone-500 font-medium">
                {child.vaccines.filter((v) => v.isCompleted).length} / {child.vaccines.length}{' '}
                {language === 'kh' ? 'ដូសបានចាក់រួចរាល់' : 'doses completed'}
              </p>
            </div>
          </div>

          {/* Wireframe toggle [V] / [^] */}
          <div className="w-7 h-7 rounded-md border border-stone-300 flex items-center justify-center text-stone-600 font-bold text-xs">
            {isVaccinationOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {/* Accordion Content matching wireframe Screen 5:
            Categories: BCG, OPV, HIB, PCV, VITAMIN A Intake, Deworming Pill, OTHER */}
        {isVaccinationOpen && (
          <div className="px-3.5 pb-4 pt-1 space-y-3 border-t border-stone-100">
            {categories.map((cat) => {
              const catVaccines = child.vaccines.filter((v) => v.category === cat.type);
              if (catVaccines.length === 0) return null;

              return (
                <div
                  key={cat.type}
                  id={`vaccine-category-${cat.type.toLowerCase()}`}
                  className="bg-stone-50/70 border border-stone-200 rounded-xl p-3"
                >
                  {/* Category Title matching wireframe: BCG, OPV, HIB, etc. */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-sm text-stone-900 tracking-tight">
                        {cat.label}
                      </span>
                    </div>
                    <span className="text-[10px] font-semibold text-stone-500 bg-white border border-stone-200 px-1.5 py-0.5 rounded">
                      {catVaccines.filter((v) => v.isCompleted).length}/{catVaccines.length}
                    </span>
                  </div>

                  {/* Doses in this category */}
                  <div className="space-y-2">
                    {catVaccines.map((vac) => {
                      return (
                        <div
                          key={vac.id}
                          className={`p-2.5 rounded-lg border transition-all ${
                            vac.isCompleted
                              ? 'bg-white border-emerald-200 shadow-2xs'
                              : 'bg-white border-stone-200 hover:border-emerald-300'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="text-xs font-bold text-stone-900">
                                  {language === 'kh' ? vac.nameKh : vac.nameEn}
                                </span>
                                {vac.isCompleted ? (
                                  <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                                    <CheckCircle2 className="w-3 h-3" />
                                    {t.statusCompleted}
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                                    <Clock className="w-3 h-3" />
                                    {t.statusScheduled}
                                  </span>
                                )}
                              </div>

                              {/* Age & Date info */}
                              <div className="text-[11px] text-stone-500 mt-1 space-y-0.5">
                                <p className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3 text-stone-400" />
                                  <span>
                                    {vac.isCompleted ? t.adminDate : t.dueDate}:{' '}
                                    <strong className="text-stone-700">
                                      {formatDate(vac.completedDate || vac.dueDate, language)}
                                    </strong>
                                  </span>
                                  <span className="text-stone-400">
                                    ({language === 'kh' ? vac.recommendedAgeLabelKh : vac.recommendedAgeLabelEn})
                                  </span>
                                </p>

                                {vac.isCompleted && vac.hospital && (
                                  <p className="flex items-center gap-1 text-emerald-800">
                                    <Building2 className="w-3 h-3 text-emerald-600 shrink-0" />
                                    <span className="truncate">{vac.hospital}</span>
                                    {vac.lotNumber && (
                                      <span className="text-stone-400 font-mono text-[10px]">
                                        [{vac.lotNumber}]
                                      </span>
                                    )}
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Complete Action Button */}
                            {!vac.isCompleted && (
                              <button
                                type="button"
                                onClick={() => onCheckVaccine(child, vac)}
                                className="px-2.5 py-1 text-[11px] font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition-colors shrink-0 flex items-center gap-1"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>{language === 'kh' ? 'កត់ត្រា' : 'Record'}</span>
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Accordion 2: Kid Detail Section matching wireframe Screens 4 & 6:
          Keang Detail [V / ^]
          [Edit Detail]
          Birthday: HH:MM DD/MM/YYYY
          Birth location: - - - -
          Blood Type: ---
          Allergy: --- */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        {/* Accordion Header */}
        <button
          id="btn-accordion-detail"
          onClick={() => setIsDetailOpen(!isDetailOpen)}
          className="w-full px-4 py-3.5 flex items-center justify-between bg-white hover:bg-stone-50 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs">
              <FileText className="w-4 h-4" />
            </div>
            <div className="text-left">
              <h3 className="text-base font-extrabold text-stone-900 leading-tight">
                {child.name} {t.detailSection}
              </h3>
              <p className="text-[11px] text-stone-500 font-medium">
                {t.birthday}, {t.birthLocation}, {t.bloodType}
              </p>
            </div>
          </div>

          {/* Wireframe toggle [V] / [^] */}
          <div className="w-7 h-7 rounded-md border border-stone-300 flex items-center justify-center text-stone-600 font-bold text-xs">
            {isDetailOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {/* Detail Body matching wireframe Screen 6 */}
        {isDetailOpen && (
          <div className="px-4 pb-4 pt-1 border-t border-stone-100 space-y-3.5">
            {/* Edit Detail Button matching wireframe */}
            <div className="flex justify-end">
              <button
                id="btn-edit-kid-detail"
                onClick={() => onEditKidDetail(child)}
                className="text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3 py-1 rounded-lg inline-flex items-center gap-1.5 transition-colors"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>{t.editDetail}</span>
              </button>
            </div>

            <div className="space-y-2.5 text-xs text-stone-700">
              {/* Birthday: HH:MM DD/MM/YYYY */}
              <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                <span className="font-bold text-stone-500 block text-[10px] uppercase tracking-wider mb-0.5">
                  {t.birthday} :
                </span>
                <p className="font-semibold text-stone-900 text-sm">
                  {child.birthTime || '00:00'} • {formatDate(child.birthDate, language)}
                </p>
              </div>

              {/* Birth location: - - - - */}
              <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                <span className="font-bold text-stone-500 block text-[10px] uppercase tracking-wider mb-0.5">
                  {t.birthLocation} :
                </span>
                <p className="font-medium text-stone-900 text-sm">
                  {child.birthLocation || '— — — —'}
                </p>
              </div>

              {/* Blood Type: --- */}
              <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                <span className="font-bold text-stone-500 block text-[10px] uppercase tracking-wider mb-0.5">
                  {t.bloodType} :
                </span>
                <p className="font-bold text-stone-900 text-sm inline-flex items-center gap-1.5">
                  <span className="px-2 py-0.5 bg-rose-50 text-rose-700 border border-rose-200 rounded font-mono">
                    {child.bloodType || '— —'}
                  </span>
                </p>
              </div>

              {/* Allergy: --- */}
              <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                <span className="font-bold text-stone-500 block text-[10px] uppercase tracking-wider mb-0.5">
                  {t.allergy} :
                </span>
                <p className="font-medium text-stone-900 text-sm flex items-center gap-1.5">
                  {child.allergies && child.allergies !== 'None recorded' ? (
                    <span className="text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded inline-flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-amber-600" />
                      {child.allergies}
                    </span>
                  ) : (
                    <span className="text-stone-500 italic">
                      {language === 'kh' ? 'គ្មានប្រតិកម្មអាឡែហ្ស៊ីកត់ត្រាទុក' : 'No allergies recorded'}
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Accordion 3: Growth & Development Data Visualization
          Requirement: "specifically including the user-friendly navigation and data visualization components I drafted." */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        {/* Accordion Header */}
        <button
          id="btn-accordion-growth"
          onClick={() => setIsGrowthOpen(!isGrowthOpen)}
          className="w-full px-4 py-3.5 flex items-center justify-between bg-white hover:bg-stone-50 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div className="text-left">
              <h3 className="text-base font-extrabold text-stone-900 leading-tight">
                {t.growthSection}
              </h3>
              <p className="text-[11px] text-stone-500 font-medium">
                {language === 'kh' ? 'ខ្សែកោងលូតលាស់ស្តង់ដារ WHO & កម្ពុជា' : 'WHO Growth Percentiles & Curve'}
              </p>
            </div>
          </div>

          <div className="w-7 h-7 rounded-md border border-stone-300 flex items-center justify-center text-stone-600 font-bold text-xs">
            {isGrowthOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {isGrowthOpen && (
          <div className="px-3.5 pb-4 pt-1 border-t border-stone-100 space-y-3">
            {/* Metric Toggle: Weight vs Height */}
            <div className="flex items-center justify-between pt-1">
              <div className="inline-flex p-0.5 bg-stone-100 rounded-lg border border-stone-200">
                <button
                  type="button"
                  onClick={() => setGrowthMetric('weight')}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                    growthMetric === 'weight'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {t.weight} (kg)
                </button>
                <button
                  type="button"
                  onClick={() => setGrowthMetric('height')}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                    growthMetric === 'height'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {t.height} (cm)
                </button>
              </div>

              <button
                id="btn-add-growth-record"
                onClick={() => onAddGrowthRecord(child)}
                className="text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2.5 py-1 rounded-lg inline-flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{language === 'kh' ? 'បញ្ចូលរង្វាស់' : 'Add Measurement'}</span>
              </button>
            </div>

            {/* Recharts Curve */}
            <div className="w-full h-56 bg-stone-50 rounded-xl p-2 border border-stone-200">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="ageLabel" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '8px',
                      fontSize: '11px',
                      border: '1px solid #CBD5E1',
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '10px' }} />
                  {/* WHO 97th Percentile (Upper limit) */}
                  <Line
                    type="monotone"
                    dataKey="standardHigh"
                    name="WHO P97 (+2SD)"
                    stroke="#FCA5A5"
                    strokeDasharray="4 4"
                    dot={false}
                    strokeWidth={1.5}
                  />
                  {/* WHO 50th Percentile (Median) */}
                  <Line
                    type="monotone"
                    dataKey="standardMedian"
                    name="WHO Median"
                    stroke="#10B981"
                    dot={false}
                    strokeWidth={2}
                  />
                  {/* WHO 3rd Percentile (Lower limit) */}
                  <Line
                    type="monotone"
                    dataKey="standardLow"
                    name="WHO P3 (-2SD)"
                    stroke="#93C5FD"
                    strokeDasharray="4 4"
                    dot={false}
                    strokeWidth={1.5}
                  />
                  {/* Child's actual measurement */}
                  <Line
                    type="monotone"
                    dataKey="childActual"
                    name={`${child.name}'s Actual`}
                    stroke="#4F46E5"
                    strokeWidth={3}
                    dot={{ r: 4, fill: '#4F46E5' }}
                    activeDot={{ r: 6 }}
                    connectNulls
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-stone-500 bg-stone-50 p-2 rounded-lg border border-stone-200">
              <Info className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <span>
                {language === 'kh'
                  ? 'បន្ទាត់ពណ៌ខៀវគឺជាទិន្នន័យជាក់ស្តែងរបស់កូន បើប្រៀបធៀបនឹងខ្សែកោងមធ្យមរបស់អង្គការសុខភាពពិភពលោក (WHO)។'
                  : 'Dark blue line tracks actual growth against WHO global and Cambodian child standards.'}
              </span>
            </div>

            {/* Growth Logs Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-stone-200 text-stone-500">
                    <th className="py-1.5 font-semibold">{language === 'kh' ? 'អាយុ' : 'Age'}</th>
                    <th className="py-1.5 font-semibold">{t.weight}</th>
                    <th className="py-1.5 font-semibold">{t.height}</th>
                    <th className="py-1.5 font-semibold">{language === 'kh' ? 'កាលបរិច្ឆេទ' : 'Date'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {child.growthRecords.map((rec) => (
                    <tr key={rec.id} className="text-stone-700">
                      <td className="py-1.5 font-medium">{rec.ageMonths}m</td>
                      <td className="py-1.5 font-bold text-stone-900">{rec.weightKg} kg</td>
                      <td className="py-1.5 font-bold text-stone-900">{rec.heightCm} cm</td>
                      <td className="py-1.5 text-stone-500">{formatDate(rec.date, language)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
