import React, { useState, useEffect } from 'react';
import { Child, Language, ParentProfile, VaccineDose, GrowthRecord } from './types';
import { DEFAULT_PARENT, DEMO_PARENT, createInitialChildren, createDemoChildren } from './data/defaultData';
import { isBirthdayToday } from './data/cambodiaVaccineSchedule';
import { Header } from './components/Header';
import { Navigation, TabType } from './components/Navigation';
import { HomeView } from './components/HomeView';
import { KidView } from './components/KidView';
import { CalendarView } from './components/CalendarView';
import { TipsView } from './components/TipsView';
import { SettingsView } from './components/SettingsView';
import { BirthdayModal } from './components/BirthdayModal';
import { CompletionConfirmModal } from './components/CompletionConfirmModal';
import { PhysicalBookletModal } from './components/PhysicalBookletModal';
import { AddChildModal } from './components/AddChildModal';
import { EditChildModal } from './components/EditChildModal';
import { EditParentModal } from './components/EditParentModal';
import { AddGrowthModal } from './components/AddGrowthModal';
import { ChangePasswordModal } from './components/ChangePasswordModal';
import { AddVaccineModal } from './components/AddVaccineModal';
import { LoginView } from './components/LoginView';

const LOCAL_STORAGE_CHILDREN_KEY = 'koma_cambodia_children_v2';
const LOCAL_STORAGE_PARENT_KEY = 'koma_cambodia_parent_v2';
const LOCAL_STORAGE_LANG_KEY = 'koma_cambodia_lang_v2';
const LOCAL_STORAGE_PASSWORD_KEY = 'koma_cambodia_pass_v2';

export default function App() {
  // 1. Language state: Khmer (default or stored) / English
  const [language, setLanguage] = useState<Language>(() => {
    const savedLang = localStorage.getItem(LOCAL_STORAGE_LANG_KEY);
    return savedLang === 'kh' || savedLang === 'en' ? savedLang : 'en';
  });

  // 2. Parent profile state
  const [parent, setParent] = useState<ParentProfile>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_PARENT_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved parent:', e);
      }
    }
    return DEFAULT_PARENT;
  });

  // 3. Children list state (ordered from older to younger by default)
  const [childrenList, setChildrenList] = useState<Child[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_CHILDREN_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Clear legacy dummy data automatically
          if (parsed.some((c: Child) => c.id === 'child-keang' || c.name === 'Keang')) {
            localStorage.removeItem(LOCAL_STORAGE_CHILDREN_KEY);
            return createInitialChildren();
          }
          return parsed;
        }
      } catch (e) {
        console.error('Failed to parse saved children:', e);
      }
    }
    return createInitialChildren();
  });

  // Selected child ID
  const [selectedChildId, setSelectedChildId] = useState<string>(() => {
    return childrenList[0]?.id || '';
  });

  // Active tab (home, kid, calendar, tips, settings)
  const [activeTab, setActiveTab] = useState<TabType>('home');

  // App Password state
  const [appPassword, setAppPassword] = useState<string>(() => {
    return localStorage.getItem(LOCAL_STORAGE_PASSWORD_KEY) || '1234';
  });

  // Login authentication state (defaults to false so login page shows first)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Modal states
  const [birthdayChild, setBirthdayChild] = useState<Child | null>(null);
  const [completingVaccine, setCompletingVaccine] = useState<{
    child: Child;
    vaccine: VaccineDose;
  } | null>(null);
  const [physicalBookletChild, setPhysicalBookletChild] = useState<Child | null>(null);
  const [isAddChildOpen, setIsAddChildOpen] = useState(false);
  const [editingChild, setEditingChild] = useState<Child | null>(null);
  const [isEditParentOpen, setIsEditParentOpen] = useState(false);
  const [growthRecordingChild, setGrowthRecordingChild] = useState<Child | null>(null);
  const [addingVaccineChild, setAddingVaccineChild] = useState<Child | null>(null);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  // Synchronize storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_CHILDREN_KEY, JSON.stringify(childrenList));
  }, [childrenList]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_PARENT_KEY, JSON.stringify(parent));
  }, [parent]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_LANG_KEY, language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_PASSWORD_KEY, appPassword);
  }, [appPassword]);

  // Requirement: Check child's birthday on app open!
  // "Additionally, the app records each child's birthday, displaying a birthday cake animation with wishes for the child's happiness and safety whenever parents open the app on that day."
  useEffect(() => {
    const today = new Date();
    const bdayKid = childrenList.find((c) => isBirthdayToday(c.birthDate, today));
    if (bdayKid) {
      // Show birthday celebration automatically on app open!
      setBirthdayChild(bdayKid);
    }
  }, []);

  // Handler to switch language
  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
  };

  // Selected child object
  const activeChild = childrenList.find((c) => c.id === selectedChildId) || childrenList[0];

  // Calculate total appointments due in 1 week
  const now = new Date();
  let due1WeekCount = 0;
  childrenList.forEach((c) => {
    c.vaccines.forEach((v) => {
      if (!v.isCompleted && v.dueDate) {
        const [y, m, d] = v.dueDate.split('-').map(Number);
        const dueObj = new Date(y, m - 1, d);
        const diffDays = Math.ceil((dueObj.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays <= 7) {
          due1WeekCount++;
        }
      }
    });
  });

  // Handle checking/completing a vaccine
  const handleTriggerCheckVaccine = (child: Child, vaccine: VaccineDose) => {
    setCompletingVaccine({ child, vaccine });
  };

  // Confirm completing vaccination with hospital & date
  const handleSaveCompletedVaccine = (
    administeredDate: string,
    hospital: string,
    lotNumber?: string,
    notes?: string
  ) => {
    if (!completingVaccine) return;

    const { child, vaccine } = completingVaccine;

    setChildrenList((prevList) => {
      return prevList.map((c) => {
        if (c.id !== child.id) return c;
        const updatedVaccines = c.vaccines.map((v) => {
          if (v.id !== vaccine.id) return v;
          return {
            ...v,
            isCompleted: true,
            completedDate: administeredDate,
            hospital,
            lotNumber: lotNumber?.trim() || undefined,
            notes: notes?.trim() || undefined,
          };
        });
        return {
          ...c,
          vaccines: updatedVaccines,
        };
      });
    });

    setCompletingVaccine(null);
  };

  // Add new child
  const handleSaveNewChild = (newChild: Child) => {
    setChildrenList((prev) => [...prev, newChild]);
    setSelectedChildId(newChild.id);
    setIsAddChildOpen(false);
    setActiveTab('kid');
  };

  // Update existing child
  const handleUpdateChild = (updated: Child) => {
    setChildrenList((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    setEditingChild(null);
  };

  // Add growth record
  const handleSaveGrowthRecord = (rec: GrowthRecord) => {
    if (!growthRecordingChild) return;
    setChildrenList((prev) =>
      prev.map((c) => {
        if (c.id !== growthRecordingChild.id) return c;
        return {
          ...c,
          growthRecords: [...c.growthRecords, rec],
        };
      })
    );
    setGrowthRecordingChild(null);
  };

  // Add custom vaccination
  const handleSaveNewVaccine = (targetChild: Child, newVaccine: VaccineDose) => {
    setChildrenList((prev) =>
      prev.map((c) => {
        if (c.id !== targetChild.id) return c;
        return {
          ...c,
          vaccines: [...c.vaccines, newVaccine],
        };
      })
    );
    setAddingVaccineChild(null);
  };

  // Reset demo data
  const handleResetData = () => {
    const initial = createInitialChildren();
    setChildrenList(initial);
    setParent(DEFAULT_PARENT);
    setSelectedChildId(initial[0]?.id || '');
    localStorage.removeItem(LOCAL_STORAGE_CHILDREN_KEY);
    localStorage.removeItem(LOCAL_STORAGE_PARENT_KEY);
  };

  const handleDemoLogin = () => {
    const demoKids = createDemoChildren();
    setChildrenList(demoKids);
    setParent(DEMO_PARENT);
    if (demoKids.length > 0) {
      setSelectedChildId(demoKids[0].id);
    }
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return (
      <LoginView
        language={language}
        onLanguageChange={handleLanguageChange}
        onLoginSuccess={(email, password) => {
          setIsLoggedIn(true);
          setParent((prev) => ({ ...prev, email }));
          if (password) {
            setAppPassword(password);
          }
        }}
        onDemoLogin={handleDemoLogin}
      />
    );
  }

  return (
    <div className="min-h-screen bg-stone-100 flex justify-center selection:bg-emerald-100">
      {/* Mobile Phone Container (max-w-md matching mobile phone requirement) */}
      <div className="w-full max-w-md bg-stone-100 min-h-screen flex flex-col shadow-2xl relative border-x border-stone-200">
        {/* Top Header */}
        <Header
          language={language}
          onLanguageChange={handleLanguageChange}
          titleBadge={activeTab === 'kid' && activeChild ? activeChild.name : undefined}
        />

        {/* Main Content Body */}
        <main className="flex-1 overflow-y-auto">
          {activeTab === 'home' && (
            <HomeView
              parent={parent}
              childrenList={childrenList}
              selectedChildId={selectedChildId}
              onSelectChild={(id) => setSelectedChildId(id)}
              onNavigateToKid={(id) => {
                setSelectedChildId(id);
                setActiveTab('kid');
              }}
              onAddNewChild={() => setIsAddChildOpen(true)}
              onEditParent={() => setIsEditParentOpen(true)}
              onCheckVaccine={handleTriggerCheckVaccine}
              onTriggerBirthdayWish={(kid) => setBirthdayChild(kid)}
              language={language}
            />
          )}

          {activeTab === 'kid' && activeChild && (
            <KidView
              child={activeChild}
              allChildren={childrenList}
              onSelectChild={(id) => setSelectedChildId(id)}
              onEditKidProfile={(c) => setEditingChild(c)}
              onEditKidDetail={(c) => setEditingChild(c)}
              onCheckVaccine={handleTriggerCheckVaccine}
              onOpenPhysicalCard={(c) => setPhysicalBookletChild(c)}
              onAddGrowthRecord={(c) => setGrowthRecordingChild(c)}
              onAddVaccine={(c) => setAddingVaccineChild(c)}
              language={language}
            />
          )}

          {activeTab === 'calendar' && (
            <CalendarView
              childrenList={childrenList}
              language={language}
              onCheckVaccine={handleTriggerCheckVaccine}
              onSelectChild={(id) => {
                setSelectedChildId(id);
                setActiveTab('kid');
              }}
            />
          )}

          {activeTab === 'tips' && (
            <TipsView language={language} />
          )}

          {(activeTab === 'settings' || (activeTab as string) === 'menu') && (
            <SettingsView
              language={language}
              onLanguageChange={handleLanguageChange}
              parent={parent}
              childrenList={childrenList}
              currentSavedPassword={appPassword}
              onOpenChangePassword={() => setIsChangePasswordOpen(true)}
              onOpenBooklet={(kid) => setPhysicalBookletChild(kid)}
              onEditParent={() => setIsEditParentOpen(true)}
              onResetData={handleResetData}
              onLogout={() => {
                setIsLoggedIn(false);
                setActiveTab('home');
              }}
            />
          )}
        </main>

        {/* Bottom Navigation */}
        <Navigation
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
          language={language}
          dueNotificationCount={due1WeekCount}
        />

        {/* Modals */}
        {/* 1. Birthday Modal matching wireframe Screen 2 */}
        {birthdayChild && (
          <BirthdayModal
            child={birthdayChild}
            language={language}
            onClose={() => setBirthdayChild(null)}
          />
        )}

        {/* 2. Vaccine Completion Confirmation Modal matching wireframe annotation */}
        {completingVaccine && (
          <CompletionConfirmModal
            child={completingVaccine.child}
            vaccine={completingVaccine.vaccine}
            language={language}
            onConfirm={handleSaveCompletedVaccine}
            onClose={() => setCompletingVaccine(null)}
          />
        )}

        {/* 3. Physical MOH Child Health Record Book */}
        {physicalBookletChild && (
          <PhysicalBookletModal
            child={physicalBookletChild}
            language={language}
            onClose={() => setPhysicalBookletChild(null)}
          />
        )}

        {/* 4. Add Child Registration Modal */}
        {isAddChildOpen && (
          <AddChildModal
            language={language}
            onSave={handleSaveNewChild}
            onClose={() => setIsAddChildOpen(false)}
          />
        )}

        {/* 5. Edit Child Modal */}
        {editingChild && (
          <EditChildModal
            child={editingChild}
            language={language}
            onSave={handleUpdateChild}
            onClose={() => setEditingChild(null)}
          />
        )}

        {/* 6. Edit Parent Profile Modal */}
        {isEditParentOpen && (
          <EditParentModal
            parent={parent}
            language={language}
            onSave={(updated) => {
              setParent(updated);
              setIsEditParentOpen(false);
            }}
            onClose={() => setIsEditParentOpen(false)}
          />
        )}

        {/* 7. Add Growth Record Modal */}
        {growthRecordingChild && (
          <AddGrowthModal
            child={growthRecordingChild}
            language={language}
            onSave={handleSaveGrowthRecord}
            onClose={() => setGrowthRecordingChild(null)}
          />
        )}

        {/* 8. Change Password Modal */}
        {isChangePasswordOpen && (
          <ChangePasswordModal
            language={language}
            currentSavedPassword={appPassword}
            onSavePassword={(newPass) => {
              setAppPassword(newPass);
            }}
            onClose={() => setIsChangePasswordOpen(false)}
          />
        )}

        {/* 9. Add Custom Vaccine Modal */}
        {addingVaccineChild && (
          <AddVaccineModal
            child={addingVaccineChild}
            language={language}
            onSave={handleSaveNewVaccine}
            onClose={() => setAddingVaccineChild(null)}
          />
        )}
      </div>
    </div>
  );
}
