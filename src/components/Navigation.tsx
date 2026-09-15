import React from 'react';
import { Home, Users, Calendar as CalendarIcon, Lightbulb, Settings } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

export type TabType = 'home' | 'kid' | 'calendar' | 'tips' | 'settings';

interface NavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  language: Language;
  dueNotificationCount?: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onTabChange,
  language,
  dueNotificationCount = 0,
}) => {
  const t = translations[language];

  const navItems = [
    {
      id: 'home' as TabType,
      label: t.tabHome,
      icon: Home,
      badge: dueNotificationCount > 0 ? dueNotificationCount : undefined,
    },
    {
      id: 'kid' as TabType,
      label: t.tabKid,
      icon: Users,
    },
    {
      id: 'calendar' as TabType,
      label: t.tabCalendar,
      icon: CalendarIcon,
    },
    {
      id: 'tips' as TabType,
      label: t.tabTips,
      icon: Lightbulb,
    },
    {
      id: 'settings' as TabType,
      label: t.tabSettings,
      icon: Settings,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-stone-200 z-30 shadow-lg px-2 py-1">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              id={`nav-btn-${item.id}`}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all relative ${
                isActive
                  ? 'text-emerald-700 font-semibold'
                  : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              <div className="relative">
                <div
                  className={`p-1 rounded-lg transition-all ${
                    isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-transparent'
                  }`}
                >
                  <Icon className="w-5 h-5 stroke-[2.2]" />
                </div>
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs animate-bounce">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[11px] mt-0.5 tracking-tight ${isActive ? 'font-bold' : 'font-normal'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
