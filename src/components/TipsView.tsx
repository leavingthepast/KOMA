import React, { useState } from 'react';
import { Lightbulb, Apple, ShieldAlert, Sparkles, Utensils } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface TipsViewProps {
  language: Language;
}

export const TipsView: React.FC<TipsViewProps> = ({ language }) => {
  const t = translations[language];
  const [selectedCategory, setSelectedCategory] = useState<'milestones' | 'nutrition' | 'campaigns' | 'warnings'>('milestones');

  const milestonesData = [
    {
      age: language === 'kh' ? '០ ដល់ ៣ ខែ' : '0 - 3 Months',
      highlights: [
        language === 'kh' ? 'ចាប់ផ្តើមញញឹមពេលឃើញមុខម៉ាក់ប៉ា' : 'Begins smiling at parents and faces',
        language === 'kh' ? 'ងើបក្បាលបន្តិចពេលគេងផ្កាប់' : 'Can raise head slightly when on tummy',
        language === 'kh' ? 'ឆ្លើយតបនឹងសម្លេង និងសម្លឹងតាមវត្ថុ' : 'Reacts to loud sounds and tracks objects',
      ],
      immunizationNote: 'BCG & HepB at birth; Penta 1, OPV 1, PCV 1 at 6 weeks',
    },
    {
      age: language === 'kh' ? '៤ ដល់ ៦ ខែ' : '4 - 6 Months',
      highlights: [
        language === 'kh' ? 'ចេះប្រែខ្លួន និងចាប់កាន់របស់លេង' : 'Rolls over and reaches for toys',
        language === 'kh' ? 'សើចឮៗ និងបញ្ចេញសម្លេងអ៊ូៗ' : 'Laughs, babbles and responds to affection',
        language === 'kh' ? 'ចាប់ផ្តើមរឹងក្បាល និងអង្គុយមានទម្រ' : 'Good head control and sits with support',
      ],
      immunizationNote: 'Penta 2 & 3, OPV 2 & 3, PCV 2 & 3, IPV 1 at 10 & 14 weeks',
    },
    {
      age: language === 'kh' ? '៧ ដល់ ៩ ខែ' : '7 - 9 Months',
      highlights: [
        language === 'kh' ? 'ចេះអង្គុយដោយខ្លួនឯង និងវារ' : 'Sits without support and starts crawling',
        language === 'kh' ? 'ចេះហៅ ប៉ាៗ ម៉ាក់ៗ' : 'Says "mama", "baba", responds to own name',
        language === 'kh' ? 'ចាប់ផ្តើមញ៉ាំបបរខាប់បន្ថែមពីទឹកដោះម្តាយ' : 'Starts nutritious complementary porridge',
      ],
      immunizationNote: 'Measles-Rubella 1 (MR 1), Japanese Encephalitis (JE), Vitamin A (100,000 IU)',
    },
    {
      age: language === 'kh' ? '១០ ដល់ ១៨ ខែ' : '10 - 18 Months',
      highlights: [
        language === 'kh' ? 'ចេះដើរតោង និងដើរដោយខ្លួនឯង' : 'Pulls to stand, takes first independent steps',
        language === 'kh' ? 'យល់ពាក្យសាមញ្ញៗ និងបង្ហាញរបស់ដែលចង់បាន' : 'Understands simple words, points to objects',
        language === 'kh' ? 'ចេះកាន់ស្លាបព្រា និងផឹកទឹកពីកែវ' : 'Drinks from cup, eats with hands',
      ],
      immunizationNote: 'MR 2, DTP booster, Vitamin A, Deworming pill at 18 months',
    },
  ];

  const nutritionData = [
    {
      age: language === 'kh' ? '០ ដល់ ៦ ខែ (ទារក)' : '0 - 6 Months (Infants)',
      subtitle: language === 'kh' ? 'ទឹកដោះម្តាយសុទ្ធសាធ' : 'Exclusive Breastfeeding',
      foods: [
        language === 'kh' ? 'ទឹកដោះម្តាយ ១០០% (មិនបាច់ផឹកទឹក ឬចំណីផ្សេងទៀតទេ)' : '100% breast milk only (no water or other liquids needed)',
        language === 'kh' ? 'ឱ្យបៅតាមតម្រូវការរបស់ទារក (ទាំងថ្ងៃ និងយប់)' : 'Feed on demand (day and night)',
      ],
      tip: language === 'kh' ? 'ទឹកដោះដំបូង (Colostrum) សម្បូរទៅដោយសារធាតុប្រឆាំងមេរោគ និងពង្រឹងភាពស៊ាំកូន។' : 'Colostrum (first milk) is vital for building immunity.',
    },
    {
      age: language === 'kh' ? '៦ ដល់ ៨ ខែ' : '6 - 8 Months',
      subtitle: language === 'kh' ? 'ចាប់ផ្តើមញ៉ាំបបរខាប់ និងអាហារបន្ថែម' : 'Introduction of Complementary Porridge',
      foods: [
        language === 'kh' ? 'បបរខាប់កិនម៉ត់ល្មម ជាមួយសាច់គោ ត្រី ឬស៊ុតក្រហម' : 'Thick mashed porridge with minced meat, fish, or egg yolk',
        language === 'kh' ? 'បន្លែស្លឹកបៃតង និងល្ពៅស្ងោរម៉ត់' : 'Mashed green vegetables and pumpkin',
        language === 'kh' ? 'ផ្លែឈាទន់ទុំច្របាច់ម៉ត់ (ចេកទុំ ល្ហុងទុំ)' : 'Mashed soft fruits (ripe banana, papaya)',
      ],
      tip: language === 'kh' ? 'ចាប់ផ្តើមពីបរិមាណតិច (២-៣ ស្លាបព្រាបាយ) ២ដងក្នុងមួយថ្ងៃ បន្ថែមពីលើទឹកដោះម្តាយ។' : 'Start with 2-3 tablespoons twice daily alongside breast milk.',
    },
    {
      age: language === 'kh' ? '៩ ដល់ ១១ ខែ' : '9 - 11 Months',
      subtitle: language === 'kh' ? 'អាហារចម្រុះ និងហាន់ចំណិតតូចៗ' : 'Finely Chopped Family Foods',
      foods: [
        language === 'kh' ? 'បបរខាប់ ឬបាយទន់ លាយសាច់ហាន់ម៉ត់ល្អ' : 'Thick porridge or soft rice with finely chopped meats and fish',
        language === 'kh' ? 'ស៊ុតស្ងោរ ឬពងមាន់ឆាជាមួយបន្លែចិញ្ច្រាំម៉ត់' : 'Scrambled or boiled eggs with finely diced vegetables',
        language === 'kh' ? 'ផ្លែឈើកាត់ជាដុំតូចៗដែលកូនអាចកាន់ញ៉ាំដោយខ្លួនឯង' : 'Soft fruit pieces for self-feeding',
      ],
      tip: language === 'kh' ? 'ញ៉ាំ ៣ ដងក្នុងមួយថ្ងៃ ＋ អាហារសម្រន់សុខភាព ＋ ទឹកដោះម្តាយ។' : 'Feed 3 meals daily plus nutritious snacks and breast milk.',
    },
    {
      age: language === 'kh' ? '១២ ដល់ ២៤+ ខែ' : '12 - 24+ Months',
      subtitle: language === 'kh' ? 'បាយគ្រួសារ និងអាហារសម្បូរសារធាតុចិញ្ចឹម' : 'Family Meals & Balanced Diet',
      foods: [
        language === 'kh' ? 'បាយទន់ ឬអាហារក្រុមគ្រួសារទាំងមូល (ហាន់បំណែកល្មម)' : 'Regular family foods cut into manageable portions',
        language === 'kh' ? 'ប្រូតេអ៊ីនសម្បូរបែប៖ ត្រី សាច់មាន់ សាច់គោ ពងមាន់ និងសណ្តែក' : 'Diverse proteins: fish, chicken, beef, eggs, beans',
        language === 'kh' ? 'បន្លែចម្រុះពណ៌ និងផ្លែឈើស្រស់' : 'Colorful vegetables and fresh seasonal fruits',
      ],
      tip: language === 'kh' ? 'ញ៉ាំអាហារគ្រួសារ ៣ពេល ＋ អាហារសម្រន់ ២ដង ＋ ទឹកដោះគោ ឬទឹកដោះម្តាយ។' : '3 family meals plus 2 healthy snacks daily.',
    },
  ];

  return (
    <div className="pb-24 pt-2 px-4 space-y-4">
      {/* Header banner */}
      <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-4 text-white shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center">
            <Lightbulb className="w-6 h-6 text-amber-100" />
          </div>
          <div>
            <h2 className="text-base font-extrabold tracking-tight">
              {language === 'kh' ? 'ការណែនាំសុខភាព និងការលូតលាស់' : 'Child Growth & Health Guidance'}
            </h2>
            <p className="text-xs text-amber-100 mt-0.5">
              {language === 'kh' ? 'ក្រសួងសុខាភិបាលកម្ពុជា & អង្គការសុខភាពពិភពលោក (WHO)' : 'Cambodia Ministry of Health & WHO Standards'}
            </p>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-1">
        <button
          onClick={() => setSelectedCategory('milestones')}
          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
            selectedCategory === 'milestones'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-white text-stone-600 border border-stone-200'
          }`}
        >
          {t.developmentalMilestones}
        </button>
        <button
          onClick={() => setSelectedCategory('nutrition')}
          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
            selectedCategory === 'nutrition'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-white text-stone-600 border border-stone-200'
          }`}
        >
          {language === 'kh' ? 'អាហារូបត្ថម្ភតាមអាយុ' : 'Nutrition by Age'}
        </button>
        <button
          onClick={() => setSelectedCategory('campaigns')}
          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
            selectedCategory === 'campaigns'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-white text-stone-600 border border-stone-200'
          }`}
        >
          {t.vitaminDewormingCampaign}
        </button>
        <button
          onClick={() => setSelectedCategory('warnings')}
          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
            selectedCategory === 'warnings'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-white text-stone-600 border border-stone-200'
          }`}
        >
          {language === 'kh' ? 'សញ្ញាគ្រោះថ្នាក់បន្ទាន់' : 'Danger Signs'}
        </button>
      </div>

      {/* Category Content: Milestones */}
      {selectedCategory === 'milestones' && (
        <div className="space-y-3">
          {milestonesData.map((stage, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-extrabold text-stone-900 bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-lg border border-emerald-200">
                  {stage.age}
                </span>
                <span className="text-[11px] text-stone-500 font-medium">
                  {language === 'kh' ? 'ដំណាក់កាលគន្លឹះ' : 'Key Milestones'}
                </span>
              </div>

              <ul className="space-y-1.5 text-xs text-stone-700">
                {stage.highlights.map((h, hIdx) => (
                  <li key={hIdx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-2 border-t border-stone-100 flex items-center gap-1.5 text-[11px] text-amber-800 bg-amber-50/70 p-2 rounded-xl">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>
                  <strong>{language === 'kh' ? 'ថ្នាំបង្ការ:' : 'Vaccine:'}</strong> {stage.immunizationNote}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Category Content: Nutrition by Age */}
      {selectedCategory === 'nutrition' && (
        <div className="space-y-3">
          {nutritionData.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-extrabold text-stone-900 bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-lg border border-emerald-200">
                  {item.age}
                </span>
                <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                  <Utensils className="w-3.5 h-3.5" />
                  <span>{item.subtitle}</span>
                </span>
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-bold text-stone-800 block">
                  {language === 'kh' ? 'អាហារដែលគួរញ៉ាំ:' : 'Recommended Foods:'}
                </span>
                <ul className="space-y-1.5 text-xs text-stone-700">
                  {item.foods.map((food, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      <span>{food}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-stone-100 flex items-center gap-1.5 text-[11px] text-emerald-900 bg-emerald-50/70 p-2 rounded-xl">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>
                  <strong>{language === 'kh' ? 'ចំណាំសំខាន់:' : 'Note:'}</strong> {item.tip}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Category Content: Campaigns */}
      {selectedCategory === 'campaigns' && (
        <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-rose-100 text-rose-700">
              <Apple className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900">
                {language === 'kh' ? 'យុទ្ធនាការផ្តល់វីតាមីនអា និងថ្នាំទម្លាក់ព្រូន' : 'National Vitamin A & Deworming Campaigns'}
              </h3>
              <p className="text-[11px] text-stone-500">
                {language === 'kh' ? 'រៀបចំដោយក្រសួងសុខាភិបាល ២ ដងក្នុងមួយឆ្នាំ (ឧសភា & វិច្ឆិកា)' : 'Held twice annually across Cambodia (May & November)'}
              </p>
            </div>
          </div>

          <p className="text-xs text-stone-600 leading-relaxed">
            {language === 'kh'
              ? 'វីតាមីនអា ជួយពង្រឹងប្រព័ន្ធការពាររាងកាយ ការពារជំងឺខ្វាក់មាន់ និងកាត់បន្ថយអត្រាឈឺធ្ងន់ពីជំងឺកញ្ជ្រិល និងរាករូស។ ចំណែកថ្នាំទម្លាក់ព្រូន (Mebendazole) ជួយការពារកុមារពីភាពស្លេកស្លាំង និងកង្វះអាហារូបត្ថម្ភ។'
              : 'Vitamin A strengthens immunity against infections and prevents night blindness. Semi-annual deworming with Mebendazole protects children from intestinal worms, stunting, and anemia.'}
          </p>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl">
              <span className="font-bold text-blue-900 block mb-1">
                {language === 'kh' ? 'គ្រាប់ពណ៌ខៀវ (១០០,០០០ IU)' : 'Blue Capsule (100k IU)'}
              </span>
              <p className="text-[11px] text-blue-700">
                {language === 'kh' ? 'សម្រាប់កុមារ ៦ - ១១ ខែ' : 'For infants 6 - 11 months'}
              </p>
            </div>
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl">
              <span className="font-bold text-rose-900 block mb-1">
                {language === 'kh' ? 'គ្រាប់ពណ៌ក្រហម (២០០,០០០ IU)' : 'Red Capsule (200k IU)'}
              </span>
              <p className="text-[11px] text-rose-700">
                {language === 'kh' ? 'សម្រាប់កុមារ ១២ - ៥៩ ខែ' : 'For children 12 - 59 months'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Category Content: Warnings */}
      {selectedCategory === 'warnings' && (
        <div className="bg-white rounded-2xl p-4 border border-rose-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-rose-100 text-rose-700">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-rose-900">
                {language === 'kh' ? 'សញ្ញាគ្រោះថ្នាក់ទាមទារការជួយសង្គ្រោះបន្ទាន់' : 'Immediate Danger Signs for Infants'}
              </h3>
              <p className="text-[11px] text-rose-600">
                {language === 'kh' ? 'សូមនាំកូនទៅមន្ទីរពេទ្យភ្លាមៗ ប្រសិនបើឃើញសញ្ញាទាំងនេះ' : 'Seek immediate hospital care if any of these occur'}
              </p>
            </div>
          </div>

          <div className="space-y-2 text-xs text-stone-700">
            {[
              { kh: 'មិនព្រមបៅទឹកដោះ ឬក្អួតចេញទាំងអស់', en: 'Inability to breastfeed/drink or vomiting everything' },
              { kh: 'មានអាការៈប្រកាច់ ឬសន្លឹមខ្លាំងមិនដឹងខ្លួន', en: 'Convulsions, seizures, or abnormally lethargic/unconscious' },
              { kh: 'ដកដង្ហើមញាប់ខ្លាំង ឬផតដើមទ្រូង', en: 'Fast breathing or chest indrawing' },
              { kh: 'ក្តៅខ្លួនខ្លាំង (លើសពី ៣៨.៥°C) លើកុមារអាយុក្រោម ៣ខែ', en: 'High fever (>38.5°C) in baby under 3 months' },
              { kh: 'ភ្នែកខូងខ្លាំង ស្បែកស្រពោនដោយសាររាករូសខ្លាំង', en: 'Sunken eyes, delayed skin pinch due to severe diarrhea' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 p-2 bg-rose-50/50 rounded-xl border border-rose-100">
                <span className="text-rose-600 font-bold">•</span>
                <span className="font-medium text-stone-800">
                  {language === 'kh' ? item.kh : item.en}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
