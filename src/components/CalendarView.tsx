import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, CheckCircle2, Clock } from 'lucide-react';
import { Child, Language, VaccineDose } from '../types';
import { translations } from '../data/translations';
import { formatDate } from '../data/cambodiaVaccineSchedule';

interface CalendarViewProps {
  childrenList: Child[];
  language: Language;
  onCheckVaccine: (child: Child, vaccine: VaccineDose) => void;
  onSelectChild: (childId: string) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  childrenList,
  language,
  onCheckVaccine,
  onSelectChild,
}) => {
  const t = translations[language];

  // Wireframe shows "2026 September"
  // Default to September 2026 or current active date
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(8); // 8 is September (0-indexed)
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const monthNamesEn = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const monthNamesKh = [
    'មករា', 'កុម្ភៈ', 'មីនា', 'មេសា', 'ឧសភា', 'មិថុនា',
    'កក្កដា', 'សីហា', 'កញ្ញា', 'តុលា', 'វិច្ឆិកា', 'ធ្នូ'
  ];

  const daysOfWeekEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const daysOfWeekKh = ['អាទិត្យ', 'ច័ន្ទ', 'អង្គារ', 'ពុធ', 'ព្រហស្បតិ៍', 'សុក្រ', 'សៅរ៍'];

  // Handle Prev/Next Month
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDay(null);
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDay(null);
  };

  // Calendar calculations
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Collect all events for this month across all children
  interface CalendarEvent {
    child: Child;
    vaccine: VaccineDose;
    day: number;
    fullDateStr: string;
  }

  const monthEvents: CalendarEvent[] = [];

  childrenList.forEach((child) => {
    child.vaccines.forEach((v) => {
      const dateTarget = v.completedDate || v.dueDate;
      if (dateTarget) {
        const [y, m, d] = dateTarget.split('-').map(Number);
        if (y === currentYear && m === currentMonth + 1) {
          monthEvents.push({
            child,
            vaccine: v,
            day: d,
            fullDateStr: dateTarget,
          });
        }
      }
    });
  });

  // Filter events by selected day or show all for the month
  const displayedEvents = selectedDay !== null
    ? monthEvents.filter((e) => e.day === selectedDay)
    : monthEvents;

  // Sort events by day
  displayedEvents.sort((a, b) => a.day - b.day);

  return (
    <div className="pb-24 pt-2 px-4 space-y-4">
      {/* Calendar Card matching wireframe Screen 3 */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs">
        {/* Month / Year header matching wireframe "2026 September" */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5">
            <span className="text-base font-extrabold text-stone-900 tracking-tight">
              {currentYear} {language === 'kh' ? monthNamesKh[currentMonth] : monthNamesEn[currentMonth]}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handlePrevMonth}
              className="p-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-600 transition-colors"
              aria-label="Previous Month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                const now = new Date();
                setCurrentYear(now.getFullYear());
                setCurrentMonth(now.getMonth());
                setSelectedDay(now.getDate());
              }}
              className="px-2 py-1 text-[11px] font-bold rounded-lg border border-stone-200 text-stone-700 hover:bg-stone-50 transition-colors"
            >
              {language === 'kh' ? 'ថ្ងៃនេះ' : 'Today'}
            </button>
            <button
              onClick={handleNextMonth}
              className="p-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-600 transition-colors"
              aria-label="Next Month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Days of Week row: Sun Mon Tue Wed Thu Fri Sat */}
        <div className="grid grid-cols-7 text-center mb-1">
          {(language === 'kh' ? daysOfWeekKh : daysOfWeekEn).map((d, idx) => (
            <span
              key={idx}
              className={`text-[9.5px] sm:text-[10px] font-bold py-1 px-0.5 truncate ${
                idx === 0 || idx === 6 ? 'text-rose-500' : 'text-stone-500'
              }`}
            >
              {language === 'kh' ? d : d.slice(0, 3)}
            </span>
          ))}
        </div>

        {/* Calendar Grid (1..30/31) */}
        <div className="grid grid-cols-7 gap-1">
          {/* Empty cells before 1st of month */}
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} className="h-9"></div>
          ))}

          {/* Days */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const dayNum = i + 1;
            const dayEvents = monthEvents.filter((e) => e.day === dayNum);
            const isSelected = selectedDay === dayNum;

            return (
              <button
                key={`day-${dayNum}`}
                onClick={() => setSelectedDay(selectedDay === dayNum ? null : dayNum)}
                className={`h-9 rounded-xl flex flex-col items-center justify-center relative transition-all ${
                  isSelected
                    ? 'bg-stone-900 text-white font-bold shadow-xs'
                    : dayEvents.length > 0
                    ? 'bg-stone-50 hover:bg-stone-100 font-bold text-stone-900'
                    : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                <span className="text-xs">{dayNum}</span>

                {/* Event Dots colored by child */}
                {dayEvents.length > 0 && (
                  <div className="flex items-center gap-0.5 mt-0.5">
                    {dayEvents.slice(0, 3).map((ev, evIdx) => (
                      <span
                        key={evIdx}
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: ev.child.colorTheme }}
                      />
                    ))}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between flex-wrap gap-2 text-[11px] text-stone-500">
          <div className="flex items-center gap-2">
            {childrenList.map((kid) => (
              <div key={kid.id} className="flex items-center gap-1">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: kid.colorTheme }}
                />
                <span className="font-semibold text-stone-700">{kid.name}</span>
              </div>
            ))}
          </div>

          {selectedDay && (
            <button
              onClick={() => setSelectedDay(null)}
              className="text-emerald-700 font-semibold hover:underline"
            >
              {language === 'kh' ? 'បង្ហាញទាំងអស់' : 'Show all month'}
            </button>
          )}
        </div>
      </div>

      {/* Appointment Cards below Calendar matching wireframe Screen 3:
          Card format:
          [Child Avatar] Keang
          BCG vaccination!
          Color-coded per child (Keang blue, Molika pink, Theavin cyan) */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5">
            <CalendarIcon className="w-4 h-4 text-emerald-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700">
              {selectedDay !== null
                ? `${language === 'kh' ? 'កាលវិភាគថ្ងៃទី' : 'Schedule for Day'} ${selectedDay}`
                : `${language === 'kh' ? 'កាលវិភាគក្នុងខែនេះ' : 'Appointments this Month'} (${displayedEvents.length})`}
            </h3>
          </div>
        </div>

        {displayedEvents.length === 0 ? (
          <div className="bg-white rounded-2xl p-6 border border-stone-200 text-center text-stone-500">
            <p className="text-xs font-medium">
              {language === 'kh'
                ? 'គ្មានការចាក់ថ្នាំបង្ការសម្រាប់កាលបរិច្ឆេទនេះទេ។'
                : 'No vaccination appointments for this selection.'}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {displayedEvents.map((ev, idx) => {
              const borderStyle = { borderColor: ev.child.colorTheme };
              return (
                <div
                  key={`${ev.child.id}-${ev.vaccine.id}-${idx}`}
                  style={borderStyle}
                  className="bg-white rounded-2xl p-3.5 border-2 shadow-xs transition-all flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Kid photo matching wireframe */}
                    <div
                      onClick={() => onSelectChild(ev.child.id)}
                      className="cursor-pointer shrink-0"
                    >
                      <img
                        src={ev.child.photoUrl}
                        alt={ev.child.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-full object-cover border-2"
                        style={{ borderColor: ev.child.colorTheme }}
                      />
                    </div>

                    <div className="min-w-0">
                      {/* Kid name matching wireframe */}
                      <p
                        className="text-xs font-bold leading-tight"
                        style={{ color: ev.child.colorTheme }}
                      >
                        {ev.child.name}
                      </p>

                      {/* BCG vaccination! matching wireframe */}
                      <p className="text-sm font-extrabold text-stone-900 leading-tight truncate">
                        {language === 'kh' ? ev.vaccine.nameKh : ev.vaccine.nameEn} {t.vaccinationAlert}
                      </p>

                      <div className="flex items-center gap-2 mt-1 text-[11px] text-stone-500">
                        <span>
                          {formatDate(ev.fullDateStr, language)} ({language === 'kh' ? ev.vaccine.recommendedAgeLabelKh : ev.vaccine.recommendedAgeLabelEn})
                        </span>
                        {ev.vaccine.isCompleted ? (
                          <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3" />
                            {t.statusCompleted}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                            <Clock className="w-3 h-3" />
                            {t.statusDue}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Complete checkbox action */}
                  {!ev.vaccine.isCompleted ? (
                    <button
                      type="button"
                      onClick={() => onCheckVaccine(ev.child, ev.vaccine)}
                      className="px-2.5 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-colors shrink-0"
                    >
                      {language === 'kh' ? 'កត់ត្រា' : 'Record'}
                    </button>
                  ) : (
                    <span className="text-xs text-emerald-600 font-bold p-2">
                      ✓
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
