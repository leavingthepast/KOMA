import React, { useState } from 'react';
import { Bell, Plus, Calendar, AlertCircle, Cake, CheckSquare, Square, ChevronRight } from 'lucide-react';
import { Child, Language, ParentProfile, VaccineDose } from '../types';
import { translations } from '../data/translations';
import { formatDate } from '../data/cambodiaVaccineSchedule';

interface HomeViewProps {
  parent: ParentProfile;
  childrenList: Child[];
  selectedChildId: string;
  onSelectChild: (childId: string) => void;
  onNavigateToKid: (childId: string) => void;
  onAddNewChild: () => void;
  onEditParent: () => void;
  onCheckVaccine: (child: Child, vaccine: VaccineDose) => void;
  onTriggerBirthdayWish: (child: Child) => void;
  language: Language;
}

export const HomeView: React.FC<HomeViewProps> = ({
  parent,
  childrenList,
  selectedChildId,
  onSelectChild,
  onNavigateToKid,
  onAddNewChild,
  onEditParent,
  onCheckVaccine,
  onTriggerBirthdayWish,
  language,
}) => {
  const t = translations[language];
  const [showNotificationList, setShowNotificationList] = useState(false);

  // Wireframe requirement: "KidsPhotos & name order them from older to youngest"
  const sortedKids = [...childrenList].sort((a, b) => {
    return new Date(a.birthDate).getTime() - new Date(b.birthDate).getTime();
  });

  // Calculate appointments due in 1 week (or overdue) across all children
  // Wireframe annotation: "notification that show how many appointment aredue in 1 week"
  const now = new Date();
  const oneWeekFromNow = new Date();
  oneWeekFromNow.setDate(now.getDate() + 7);

  interface DueReminderItem {
    child: Child;
    vaccine: VaccineDose;
    daysDiff: number;
  }

  const dueReminders: DueReminderItem[] = [];

  sortedKids.forEach((child) => {
    child.vaccines.forEach((v) => {
      if (!v.isCompleted && v.dueDate) {
        const [y, m, d] = v.dueDate.split('-').map(Number);
        const dueDateObj = new Date(y, m - 1, d);
        const diffDays = Math.ceil((dueDateObj.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        
        // Due within 7 days or overdue
        if (diffDays <= 7) {
          dueReminders.push({
            child,
            vaccine: v,
            daysDiff: diffDays,
          });
        }
      }
    });
  });

  // Sort by earliest due date
  dueReminders.sort((a, b) => a.daysDiff - b.daysDiff);

  return (
    <div className="pb-24 pt-2 px-4 space-y-4">


      {/* 1. Parent Header section matching wireframe */}
      <div className="bg-white rounded-2xl p-3.5 border border-stone-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Parent photo */}
          <div className="relative">
            <img
              src={parent.photoUrl}
              alt={parent.name}
              referrerPolicy="no-referrer"
              className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500 shadow-xs"
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-stone-900 text-base leading-tight">
                {parent.name || t.parent}
              </span>
              <span className="text-[10px] uppercase font-semibold text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded">
                {t.parent}
              </span>
            </div>
            {/* Edit user profile matching wireframe */}
            <button
              id="btn-edit-parent-profile"
              onClick={onEditParent}
              className="text-xs text-emerald-700 font-semibold hover:underline flex items-center gap-0.5 mt-0.5"
            >
              <span>{t.editProfile}</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Notification Bell matching wireframe note:
            "notification that show how many appointment aredue in 1 week" */}
        <div className="relative">
          <button
            id="btn-notifications-bell"
            onClick={() => setShowNotificationList(!showNotificationList)}
            className="p-2.5 rounded-xl bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200 transition-colors relative"
            title={`${dueReminders.length} ${t.notificationDue1Week}`}
          >
            <Bell className="w-5 h-5" />
            {dueReminders.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs animate-pulse">
                {dueReminders.length}
              </span>
            )}
          </button>

          {/* Notification dropdown popover */}
          {showNotificationList && (
            <div className="absolute right-0 top-12 w-72 bg-white rounded-2xl shadow-xl border border-stone-200 p-3 z-40 animate-in fade-in zoom-in duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <span className="text-xs font-bold text-stone-800">
                  {t.notificationTitle}
                </span>
                <span className="text-[10px] bg-rose-100 text-rose-700 font-semibold px-1.5 py-0.5 rounded-full">
                  {dueReminders.length} {t.statusDue}
                </span>
              </div>
              <div className="mt-2 space-y-2 max-h-56 overflow-y-auto pr-1">
                {dueReminders.length === 0 ? (
                  <p className="text-xs text-stone-500 py-3 text-center">
                    {t.noDueVaccines}
                  </p>
                ) : (
                  dueReminders.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setShowNotificationList(false);
                        onNavigateToKid(item.child.id);
                      }}
                      className="p-2 bg-rose-50/60 hover:bg-rose-100/70 border border-rose-100 rounded-xl cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-stone-900">
                          {item.child.name}
                        </span>
                        <span className="text-[10px] font-semibold text-rose-600">
                          {item.daysDiff < 0 ? t.statusOverdue : `${item.daysDiff}d`}
                        </span>
                      </div>
                      <p className="text-xs font-medium text-rose-700 truncate">
                        {language === 'kh' ? item.vaccine.nameKh : item.vaccine.nameEn}
                      </p>
                      <p className="text-[10px] text-stone-500 mt-0.5">
                        {t.dueDate}: {formatDate(item.vaccine.dueDate, language)}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. Children Horizontal Carousel matching wireframe
          Annotation: "KidsPhotos & name order them from older to youngest" + "add new member" */}
      <div className="bg-white rounded-2xl p-3.5 border border-stone-200 shadow-xs">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-bold text-stone-600 uppercase tracking-wider">
            {language === 'kh' ? 'បញ្ជីកូនៗ (រៀបតាមអាយុ)' : 'Children (Older to Youngest)'}
          </span>
          <span className="text-[11px] text-stone-400 font-medium">
            {sortedKids.length} {language === 'kh' ? 'នាក់' : 'members'}
          </span>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
          {sortedKids.map((kid) => {
            const isSelected = kid.id === selectedChildId;
            return (
              <div
                key={kid.id}
                id={`child-circle-${kid.id}`}
                onClick={() => {
                  onSelectChild(kid.id);
                  onNavigateToKid(kid.id);
                }}
                className="flex flex-col items-center cursor-pointer group shrink-0 transition-transform active:scale-95"
              >
                <div
                  className={`w-16 h-16 rounded-full p-0.5 border-2 transition-all relative ${
                    isSelected
                      ? 'border-emerald-600 shadow-md ring-2 ring-emerald-200'
                      : 'border-stone-300 hover:border-stone-400'
                  }`}
                >
                  <img
                    src={kid.photoUrl}
                    alt={kid.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full rounded-full object-cover"
                  />
                  {/* Subtle color dot */}
                  <span
                    className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white shadow-2xs"
                    style={{ backgroundColor: kid.colorTheme }}
                  />
                </div>
                <span className="text-xs font-semibold text-stone-800 mt-1.5 group-hover:text-emerald-700">
                  {kid.name}
                </span>
              </div>
            );
          })}

          {/* Wireframe "(+) add" "add new member" button */}
          <div
            id="btn-add-new-member"
            onClick={onAddNewChild}
            className="flex flex-col items-center cursor-pointer group shrink-0 transition-transform active:scale-95"
          >
            <div className="w-16 h-16 rounded-full border-2 border-dashed border-stone-300 group-hover:border-emerald-500 bg-stone-50 group-hover:bg-emerald-50 flex flex-col items-center justify-center text-stone-500 group-hover:text-emerald-600 transition-colors">
              <Plus className="w-6 h-6 stroke-[2.5]" />
              <span className="text-[10px] font-bold leading-none uppercase">add</span>
            </div>
            <span className="text-[10px] font-medium text-stone-500 mt-1.5 text-center leading-tight max-w-[64px]">
              {t.addNewMember}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Upcoming Reminders Due In 1 Week matching wireframe */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-rose-500" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-700">
              {t.vaccinationReminderTitle}
            </h2>
          </div>
          <span className="text-[11px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
            {dueReminders.length} {language === 'kh' ? 'ការរំលឹក' : 'reminders'}
          </span>
        </div>

        {dueReminders.length === 0 ? (
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 text-center">
            <p className="text-xs font-semibold text-emerald-800">
              {t.noDueVaccines}
            </p>
            <p className="text-[11px] text-emerald-600 mt-0.5">
              {language === 'kh'
                ? 'កាលវិភាគចាក់ថ្នាំបង្ការរបស់កូនៗទាំងអស់ស្ថិតក្នុងស្ថានភាពទាន់សម័យ។'
                : 'All scheduled vaccinations are on track.'}
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {dueReminders.map((item, idx) => {
              return (
                <div
                  key={`${item.child.id}-${item.vaccine.id}-${idx}`}
                  id={`reminder-card-${item.child.id}-${idx}`}
                  className="bg-white rounded-2xl p-3.5 border-2 border-stone-200 hover:border-emerald-300 shadow-xs transition-all flex items-center justify-between gap-3"
                >
                  {/* Left: Avatar + Info */}
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={item.child.photoUrl}
                      alt={item.child.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-full object-cover shrink-0 border border-stone-200"
                    />

                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-stone-500 truncate">
                        Name: <span className="text-stone-900 font-bold">{item.child.name}</span>
                      </p>
                      
                      {/* Wireframe: "BCG vaccination!" styled in bold red alert */}
                      <p className="text-sm font-extrabold text-rose-600 leading-tight truncate">
                        {language === 'kh' ? item.vaccine.nameKh : item.vaccine.nameEn} {t.vaccinationAlert}
                      </p>

                      <div className="flex items-center gap-2 mt-0.5 text-[11px] text-stone-500">
                        <Calendar className="w-3 h-3 text-stone-400" />
                        <span>
                          {t.dueDate}: {formatDate(item.vaccine.dueDate, language)}
                        </span>
                        {item.daysDiff <= 0 ? (
                          <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-1.5 py-0.2 rounded">
                            {t.statusOverdue}
                          </span>
                        ) : (
                          <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded">
                            {item.daysDiff}d left
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Checkbox triggering confirmation modal
                      Wireframe annotation: "check boxes to show complete action but need comfirmation like, when is the check up happened, which hospital" */}
                  <button
                    id={`checkbox-complete-${item.child.id}-${item.vaccine.id}`}
                    type="button"
                    onClick={() => onCheckVaccine(item.child, item.vaccine)}
                    className="p-2 rounded-xl text-stone-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors shrink-0"
                    title={t.completeAction}
                  >
                    <Square className="w-6 h-6 stroke-[1.8]" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Birthday Celebration Banner & Quick Tester */}
      <div className="bg-gradient-to-r from-amber-50 to-rose-50 border border-amber-200 rounded-2xl p-3.5 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Cake className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-stone-900">
              {language === 'kh' ? 'អបអរថ្ងៃខួបកំណើតកុមារ' : 'Child Birthday Feature'}
            </h4>
            <p className="text-[11px] text-stone-600">
              {language === 'kh' 
                ? 'បង្ហាញនំខួបកំណើត និងសារជូនពរសុវត្ថិភាពនៅថ្ងៃកំណើត' 
                : 'Animated cake & digital wishes on child’s birthday'}
            </p>
          </div>
        </div>

        <button
          id="btn-test-birthday"
          onClick={() => {
            const kid = childrenList.find((c) => c.id === selectedChildId) || childrenList[0];
            if (kid) onTriggerBirthdayWish(kid);
          }}
          className="text-xs font-bold text-amber-800 bg-white hover:bg-amber-100 border border-amber-300 px-3 py-1.5 rounded-xl shadow-xs transition-colors shrink-0"
        >
          {t.testBirthdayMode}
        </button>
      </div>
    </div>
  );
};
