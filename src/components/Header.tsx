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
