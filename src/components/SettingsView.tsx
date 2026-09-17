import React from 'react';
import { 
  Settings, 
  Globe, 
  Lock, 
  KeyRound, 
  Check, 
  User, 
  RefreshCw, 
  ShieldCheck, 
  Phone,
  LogOut
} from 'lucide-react';
import { Child, Language, ParentProfile } from '../types';
import { translations } from '../data/translations';

interface SettingsViewProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  parent: ParentProfile;
  childrenList: Child[];
  currentSavedPassword: string;
  onOpenChangePassword: () => void;
  onOpenBooklet: (child: Child) => void;
  onEditParent: () => void;
  onResetData: () => void;
  onLogout: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  language,
  onLanguageChange,
  parent,
  childrenList,
  currentSavedPassword,
  onOpenChangePassword,
  onOpenBooklet,
  onEditParent,
  onResetData,
  onLogout,
}) => {
  const t = translations[language];

  return (
    <div className="pb-24 pt-2 px-4 space-y-4 animate-in fade-in duration-200">
      {/* SECTION 1: Changing Language */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-blue-100 text-blue-700">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                {t.languageSectionTitle}
              </h3>
              <p className="text-[11px] text-stone-500">
                {t.languageSectionDesc}
              </p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 uppercase">
            {language === 'kh' ? 'ភាសាខ្មែរ' : 'English'}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-2 pt-1">
          {/* Khmer Option */}
          <button
            id="setting-lang-kh"
            type="button"
            onClick={() => onLanguageChange('kh')}
            className={`w-full p-3 rounded-xl border flex items-center justify-between text-left transition-all ${
              language === 'kh'
                ? 'bg-emerald-50/80 border-emerald-500 ring-1 ring-emerald-400'
                : 'bg-stone-50 hover:bg-stone-100/80 border-stone-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-white border border-stone-300 text-stone-800 font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                KH
              </span>
              <div>
                <span className="text-xs font-extrabold text-stone-900 block">
                  {t.khmerLangLabel}
                </span>
              </div>
            </div>
            {language === 'kh' && (
              <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 stroke-[2.5]" />
              </div>
            )}
          </button>

          {/* English Option */}
          <button
            id="setting-lang-en"
            type="button"
            onClick={() => onLanguageChange('en')}
            className={`w-full p-3 rounded-xl border flex items-center justify-between text-left transition-all ${
              language === 'en'
                ? 'bg-emerald-50/80 border-emerald-500 ring-1 ring-emerald-400'
                : 'bg-stone-50 hover:bg-stone-100/80 border-stone-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-white border border-stone-300 text-stone-800 font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                EN
              </span>
              <div>
                <span className="text-xs font-extrabold text-stone-900 block">
                  {t.englishLangLabel}
                </span>
              </div>
            </div>
            {language === 'en' && (
              <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 stroke-[2.5]" />
              </div>
            )}
          </button>
        </div>
      </div>

      {/* SECTION 2: Security & Change Password */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-amber-100 text-amber-800">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                {t.securitySectionTitle}
              </h3>
              <p className="text-[11px] text-stone-500">
                {t.securitySectionDesc}
              </p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            <span>{t.securityStatusProtected}</span>
          </span>
        </div>

        <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white border border-stone-200 flex items-center justify-center text-stone-600 font-mono">
              ••••
            </div>
            <div>
              <span className="text-xs font-bold text-stone-900 block">
                {language === 'kh' ? 'ពាក្យសម្ងាត់សុវត្ថិភាព' : 'Security Password / PIN'}
              </span>
              <span className="text-[10px] text-stone-500">
                {t.defaultPasswordNotice}
              </span>
            </div>
          </div>

          <button
            id="btn-open-change-password"
            type="button"
            onClick={onOpenChangePassword}
            className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs transition-colors"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>{t.changePassword}</span>
          </button>
        </div>
      </div>



      {/* SECTION 4: Parent Profile Management */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img
              src={parent.photoUrl}
              alt={parent.name}
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-full object-cover border-2 border-emerald-400"
            />
            <div>
              <h4 className="text-xs font-extrabold text-stone-900">{parent.name}</h4>
              <p className="text-[11px] text-stone-500">{parent.phone}</p>
            </div>
          </div>
          <button
            onClick={onEditParent}
            className="px-2.5 py-1 text-xs font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded-lg flex items-center gap-1 transition-colors"
          >
            <User className="w-3 h-3 text-stone-500" />
            <span>{t.editProfile}</span>
          </button>
        </div>
      </div>



      {/* SECTION 5: Log Out */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-rose-100 text-rose-700">
              <LogOut className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                {language === 'kh' ? 'ចាកចេញពីគណនី' : 'Account Log Out'}
              </h3>
              <p className="text-[11px] text-stone-500">
                {language === 'kh' ? 'ចាកចេញពីកម្មវិធី KOMA ដោយសុវត្ថិភាព' : 'Securely log out of your KOMA session'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              onLogout();
            }}
            className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{language === 'kh' ? 'ចាកចេញ' : 'Log Out'}</span>
          </button>
        </div>
      </div>



      {/* SECTION 6: Cambodia Pediatric Hotlines */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs space-y-2">
        <div className="flex items-center gap-2 text-rose-600">
          <Phone className="w-4 h-4" />
          <h3 className="text-xs font-bold uppercase tracking-wider">
            {language === 'kh' ? 'លេខទូរស័ព្ទទាន់ហេតុការណ៍សុខភាពកុមារ' : 'Cambodia Pediatric Hotlines'}
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <a href="tel:115" className="p-2 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200 transition-colors block">
            <span className="text-[10px] text-stone-500 block">
              {language === 'kh' ? 'សង្គ្រោះជាតិ' : 'National'}
            </span>
            <span className="font-bold text-rose-600 font-mono underline decoration-dotted">115 / 119</span>
          </a>
          <a href="tel:023428009" className="p-2 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200 transition-colors block">
            <span className="text-[10px] text-stone-500 block">
              {language === 'kh' ? 'គន្ធបុប្ផា' : 'Kantha Bopha'}
            </span>
            <span className="font-bold text-stone-900 font-mono underline decoration-dotted">023 428 009</span>
          </a>
        </div>
      </div>

      {/* Reset Demo Data */}
      <div className="text-center pt-1">
        <button
          type="button"
          onClick={() => {
            if (window.confirm(language === 'kh' ? 'តើអ្នកពិតជាចង់កំណត់ឡើងវិញនូវទិន្នន័យគំរូ?' : 'Reset to default sample records?')) {
              onResetData();
            }
          }}
          className="text-xs text-stone-400 hover:text-stone-700 font-medium inline-flex items-center gap-1"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>{language === 'kh' ? 'កំណត់ទិន្នន័យគំរូឡើងវិញ' : 'Reset Demo Sample Data'}</span>
        </button>
      </div>
    </div>
  );
};
