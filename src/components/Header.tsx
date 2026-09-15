import React from 'react';
import { Language } from '../types';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  titleBadge?: string;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  titleBadge,
}) => {
  return (
    <header className="w-full bg-white border-b border-stone-200 sticky top-0 z-30 shadow-xs">
      {/* Mobile status bar simulation */}
      <div className="flex justify-between items-center px-4 pt-1.5 pb-1 text-[11px] text-stone-500 font-medium tracking-tight">
        <span>09:41</span>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" title="Offline Mode Ready"></span>
          <span className="text-[10px] uppercase font-semibold tracking-wider text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
            {language === 'kh' ? 'ក្រៅបណ្តាញ' : 'Offline Ready'}
          </span>
          <svg className="w-3.5 h-3.5 text-stone-600" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L12 22l7.03-4.39C20.26 16.07 21 14.12 21 12c0-4.97-4.03-9-9-9z"/>
          </svg>
          <div className="w-5 h-2.5 border border-stone-600 rounded-xs p-0.5 flex items-center">
            <div className="w-3.5 h-1.5 bg-stone-700 rounded-2xs"></div>
          </div>
        </div>
      </div>

      {/* Main Header bar matching wireframe */}
      <div className="flex items-center justify-between px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg tracking-wider text-stone-900 leading-none">
                KOMA
              </span>
            </div>
            {titleBadge && (
              <p className="text-[10px] text-stone-500 font-medium leading-tight truncate">
                {titleBadge}
              </p>
            )}
          </div>
        </div>

        {/* Wireframe Language Switcher [KH | EN] */}
        <div className="flex items-center bg-stone-100 p-0.5 rounded-lg border border-stone-300">
          <button
            id="lang-kh"
            type="button"
            onClick={() => onLanguageChange('kh')}
            className={`px-2 py-1 text-xs font-semibold rounded-md transition-all ${
              language === 'kh'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            KH
          </button>
          <div className="h-3 w-px bg-stone-300 mx-0.5"></div>
          <button
            id="lang-en"
            type="button"
            onClick={() => onLanguageChange('en')}
            className={`px-2 py-1 text-xs font-semibold rounded-md transition-all ${
              language === 'en'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            EN
          </button>
        </div>
      </div>
    </header>
  );
};
