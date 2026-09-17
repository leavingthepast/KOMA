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
        language === 'kh' ? 'ចាប់ផ្តើមញញឹមដាក់ឪពុកម្តាយ និងមុខមនុស្សស្គាល់' : 'Begins smiling at parents and familiar faces',
        language === 'kh' ? 'អាចងើបក្បាលបន្តិចពេលគេងផ្កាប់' : 'Can raise head slightly when lying on tummy',
        language === 'kh' ? 'ឆ្លើយតបនឹងសម្លេងខ្លាំង និងសម្លឹងតាមវត្ថុ' : 'Reacts to loud sounds and tracks objects',
      ],
    },
    {
      age: language === 'kh' ? '៤ ដល់ ៦ ខែ' : '4 - 6 Months',
      highlights: [
        language === 'kh' ? 'ចេះប្រែខ្លួន និងចាប់កាន់របស់លេង' : 'Rolls over and reaches for toys',
        language === 'kh' ? 'សើចឮៗ និងបញ្ចេញសម្លេងអ៊ូៗ' : 'Laughs, babbles and responds to affection',
        language === 'kh' ? 'ចេះរឹងក្បាលល្អ និងអាចអង្គុយដោយមានជំនួយ' : 'Has good head control and may sit with support',
      ],
    },
    {
      age: language === 'kh' ? '៧ ដល់ ៩ ខែ' : '7 - 9 Months',
      highlights: [
        language === 'kh' ? 'ចេះអង្គុយដោយខ្លួនឯង និងវារ' : 'Sits without support and starts crawling',
        language === 'kh' ? 'ចេះហៅ ប៉ាៗ ម៉ាក់ៗ' : 'Says "mama", "baba", responds to own name',
        language === 'kh' ? 'ចាប់ផ្តើមញ៉ាំអាហារបន្ថែមមានជីវជាតិនៅអាយុប្រហែល ៦ ខែ' : 'Starts nutritious complementary foods around 6 months',
      ],
    },
    {
      age: language === 'kh' ? '១០ ដល់ ១៨ ខែ' : '10 - 18 Months',
      highlights: [
        language === 'kh' ? 'ចេះដើរតោង និងដើរដោយខ្លួនឯង' : 'Pulls to stand, takes first independent steps',
        language === 'kh' ? 'យល់ពាក្យសាមញ្ញៗ និងបង្ហាញរបស់ដែលចង់បាន' : 'Understands simple words, points to objects',
        language === 'kh' ? 'ចេះកាន់ស្លាបព្រា និងផឹកទឹកពីកែវ' : 'Drinks from cup, eats with hands',
      ],
    },
  ];

  const nutritionData = [
    {
      age: language === 'kh' ? '០ ដល់ ៦ ខែ (ទារក)' : '0 - 6 Months (Infants)',
      subtitle: language === 'kh' ? 'ទឹកដោះម្តាយសុទ្ធសាធ' : 'Exclusive Breastfeeding',
      foods: [
        language === 'kh' ? 'ទឹកដោះម្តាយ ១០០% (មិនបាច់ផឹកទឹក ឬចំណីផ្សេងទៀតទេ)' : 'Exclusive breastfeeding — breast milk only (no water or other liquids needed)',
        language === 'kh' ? 'ឱ្យបៅតាមតម្រូវការរបស់ទារក (ទាំងថ្ងៃ និងយប់)' : 'Feed on demand (day and night)',
      ],
      tip: language === 'kh' ? 'ទឹកដោះដំបូង (Colostrum) សម្បូរទៅដោយសារធាតុប្រឆាំងមេរោគ និងពង្រឹងភាពស៊ាំកូន។' : 'Colostrum (first milk) is vital for building immunity.',
    },
    {
      age: language === 'kh' ? '៦ ដល់ ៨ ខែ' : '6 - 8 Months',
      subtitle: language === 'kh' ? 'ចាប់ផ្តើមញ៉ាំបបរខាប់ និងអាហារបន្ថែម' : 'Introduction of Complementary Porridge',
      foods: [
        language === 'kh' ? 'បបរខាប់កិនម៉ត់ល្មម ជាមួយសាច់គោ ត្រី ឬស៊ុតឆ្អិនល្អ' : 'Thick mashed porridge with minced meat, fish, or well-cooked egg',
        language === 'kh' ? 'បន្លែស្លឹកបៃតង និងល្ពៅស្ងោរម៉ត់' : 'Mashed green vegetables and pumpkin',
        language === 'kh' ? 'ផ្លែឈាទន់ទុំច្របាច់ម៉ត់ (ចេកទុំ ល្ហុងទុំ)' : 'Mashed soft fruits (ripe banana, papaya)',
      ],
      tip: language === 'kh' ? 'ចំណាំ៖ ចាប់ផ្តើមពី ២-៣ ស្លាបព្រាបាយ ២-៣ ដងក្នុងមួយថ្ងៃ រួមជាមួយការបន្តបំបៅដោះកូន។' : 'Note: Start with 2–3 tablespoons, 2–3 times daily, while continuing breastfeeding.',
    },
    {
      age: language === 'kh' ? '៩ ដល់ ១១ ខែ' : '9 - 11 Months',
      subtitle: language === 'kh' ? 'អាហារចម្រុះ និងហាន់ចំណិតតូចៗ' : 'Finely Chopped Family Foods',
      foods: [
        language === 'kh' ? 'បបរខាប់ ឬបាយទន់ លាយសាច់ហាន់ម៉ត់ល្អ' : 'Thick porridge or soft rice with finely chopped meat or fish',
        language === 'kh' ? 'ស៊ុតឆ្អិនល្អស្ងោរ ឬចៀនជាមួយបន្លែទន់ៗ' : 'Scrambled or boiled well-cooked eggs with soft vegetables',
        language === 'kh' ? 'ដុំផ្លែឈាទន់ៗងាយស្រួលកាន់ និងញ៉ាំ' : 'Soft fruit pieces that are easy to hold and eat',
      ],
      tip: language === 'kh' ? 'ចំណាំ៖ ញ៉ាំ ៣-៤ ពេលក្នុងមួយថ្ងៃ បន្តបំបៅដោះកូន និងផ្តល់អាហារសម្រន់សុខភាពបើចាំបាច់។' : 'Note: Feed 3–4 meals daily, continue breastfeeding, and offer nutritious snacks if needed.',
    },
    {
      age: language === 'kh' ? '១២ ដល់ ២៤ ខែ' : '12–24 Months',
      subtitle: language === 'kh' ? 'បាយគ្រួសារ និងអាហារសម្បូរសារធាតុចិញ្ចឹម' : 'Family Meals & Balanced Diet',
      foods: [
        language === 'kh' ? 'បាយគ្រួសារ និងអាហារក្រុមគ្រួសារហាន់ជាចំណិតតូចៗល្មមញ៉ាំ' : 'Regular family foods cut into small, manageable pieces',
        language === 'kh' ? 'ប្រូតេអ៊ីនសម្បូរបែប៖ ត្រី សាច់មាន់ សាច់គោ ពងមាន់ និងសណ្តែក' : 'Diverse proteins: fish, chicken, beef, eggs, beans',
        language === 'kh' ? 'បន្លែចម្រុះពណ៌ និងផ្លែឈើស្រស់តាមរដូវកាល' : 'Colorful vegetables and fresh seasonal fruits',
      ],
      tip: language === 'kh' ? 'ចំណាំ៖ ផ្តល់អាហារក្រុមគ្រួសារ ៣-៤ ពេលក្នុងមួយថ្ងៃ ព្រមទាំងអាហារសម្រន់សុខភាព ១-២ ពេល បើចាំបាច់ រួមជាមួយការបន្តបំបៅដោះកូន។' : 'Note: Offer 3–4 family meals daily, with 1–2 nutritious snacks if needed, while continuing breastfeeding.',
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
                {language === 'kh' ? 'សូមស្វែងរកការព្យាបាលវេជ្ជសាស្ត្រភ្លាមៗ ប្រសិនបើមានសញ្ញាណាមួយដូចខាងក្រោម៖' : 'Seek immediate medical care if any of these occur:'}
              </p>
            </div>
          </div>

          <div className="space-y-2 text-xs text-stone-700">
            {[
              { kh: 'មិនអាចបៅដោះ ឬផឹកទឹកបាន ឬក្អួតរាល់ពេលដែលញ៉ាំ', en: 'Unable to breastfeed or drink, or vomits everything' },
              { kh: 'មានអាការៈប្រកាច់ ឬងងុយគេងខ្លាំងពិបាកដាស់ ឬមិនដឹងខ្លួន', en: 'Convulsions/seizures, or unusually sleepy, difficult to wake, or unconscious' },
              { kh: 'ដកដង្ហើមញាប់ ឬផតដើមទ្រូង', en: 'Fast breathing or chest indrawing' },
              { kh: 'ក្តៅខ្លួនខ្លាំង (≥38°C) ចំពោះទារកអាយុក្រោម ៣ ខែ', en: 'Fever ≥38°C in a baby under 3 months' },
              { kh: 'សញ្ញាខ្វះជាតិទឹកធ្ងន់ធ្ងរ ដូចជាភ្នែកខូងខ្លាំង ឬស្បែកយារយាវយឺតពេលញ៉ិចថ្នមៗ', en: 'Severe dehydration signs, such as very sunken eyes or skin that goes back very slowly after being gently pinched' },
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
