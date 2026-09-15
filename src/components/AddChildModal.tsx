import React, { useState } from 'react';
import { X, UserPlus, Calendar, Clock, MapPin, Droplets, AlertCircle, Camera } from 'lucide-react';
import { Child, Language } from '../types';
import { translations } from '../data/translations';
import { generateVaccineSchedule, CAMBODIAN_HOSPITALS } from '../data/cambodiaVaccineSchedule';

interface AddChildModalProps {
  language: Language;
  onSave: (newChild: Child) => void;
  onClose: () => void;
}

export const AddChildModal: React.FC<AddChildModalProps> = ({
  language,
  onSave,
  onClose,
}) => {
  const t = translations[language];

  const [name, setName] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [birthDate, setBirthDate] = useState('2026-06-01');
  const [birthTime, setBirthTime] = useState('08:30');
  const [birthLocation, setBirthLocation] = useState('National Pediatric Hospital, Phnom Penh');
  const [bloodType, setBloodType] = useState<Child['bloodType']>('O+');
  const [allergies, setAllergies] = useState('');
  const [hasReceivedBirthVaccines, setHasReceivedBirthVaccines] = useState(true);

  const [selectedAvatar, setSelectedAvatar] = useState('https://images.unsplash.com/photo-1543332164-6e82f355badc?w=150&auto=format&fit=crop&q=80');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setSelectedAvatar(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Color themes for calendar representation
  const colorThemes = ['#3b82f6', '#ec4899', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4'];
  const [selectedColor, setSelectedColor] = useState(colorThemes[2]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !birthDate.trim()) return;

    // Algorithm automatically generates future vaccination reminders based on Cambodia's required child vaccination ages
    const generatedVaccines = generateVaccineSchedule(birthDate);

    // If parent checked that child already received birth vaccines (BCG, HepB birth)
    if (hasReceivedBirthVaccines) {
      generatedVaccines.forEach((v) => {
        if (v.recommendedAgeMonths === 0) {
          v.isCompleted = true;
          v.completedDate = birthDate;
          v.hospital = birthLocation;
        }
      });
    }

    const newChild: Child = {
      id: `child-${Date.now()}`,
      name: name.trim(),
      gender,
      photoUrl: selectedAvatar,
      birthDate,
      birthTime,
      birthLocation,
      bloodType,
      allergies: allergies.trim() || 'None recorded',
      colorTheme: selectedColor,
      vaccines: generatedVaccines,
      growthRecords: [
        {
          id: `g-${Date.now()}`,
          date: birthDate,
          ageMonths: 0,
          weightKg: 3.2,
          heightCm: 50.0,
          headCircumferenceCm: 35.0,
        },
      ],
    };

    onSave(newChild);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs overflow-y-auto">
      <div 
        id="add-child-modal"
        className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-stone-200 relative my-6 animate-in fade-in zoom-in duration-200"
      >
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900">
                {language === 'kh' ? 'ចុះឈ្មោះកូនថ្មី' : 'Register New Child'}
              </h3>
              <p className="text-xs text-stone-500">
                {language === 'kh' ? 'បង្កើតកាលវិភាគចាក់ថ្នាំបង្ការស្វ័យប្រវត្តិ' : 'Auto-generates Cambodia vaccine schedule'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          {/* Child Photo Upload */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5 flex items-center justify-between">
              <span>{language === 'kh' ? 'រូបថតកូន (Child Photo)' : 'Child Photo'}</span>
              <label className="cursor-pointer text-[11px] text-emerald-600 font-bold hover:underline flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                <Camera className="w-3.5 h-3.5" />
                <span>{language === 'kh' ? 'បង្ហោះរូបភាព' : 'Upload Image'}</span>
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </label>
            </label>
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-emerald-500 bg-stone-100 flex items-center justify-center shrink-0 shadow-xs">
                {selectedAvatar ? (
                  <img src={selectedAvatar} alt="Child" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                ) : (
                  <Camera className="w-6 h-6 text-stone-400" />
                )}
              </div>
              <span className="text-xs text-stone-500">
                {language === 'kh' ? 'ជ្រើសរើសរូបភាពពីឧបករណ៍របស់អ្នក' : 'Upload a profile picture for your child'}
              </span>
            </div>
          </div>

          {/* Child Name */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              {language === 'kh' ? 'ឈ្មោះកូន *' : "Child's Name *"}
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Keang, Dara, Srey Neang"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-stone-900"
            />
          </div>

          {/* Gender */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setGender('male')}
              className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                gender === 'male'
                  ? 'bg-blue-50 border-blue-500 text-blue-800 ring-1 ring-blue-400'
                  : 'bg-white border-stone-200 text-stone-600'
              }`}
            >
              {language === 'kh' ? 'ប្រុស (Boy)' : 'Boy'}
            </button>
            <button
              type="button"
              onClick={() => setGender('female')}
              className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                gender === 'female'
                  ? 'bg-rose-50 border-rose-500 text-rose-800 ring-1 ring-rose-400'
                  : 'bg-white border-stone-200 text-stone-600'
              }`}
            >
              {language === 'kh' ? 'ស្រី (Girl)' : 'Girl'}
            </button>
          </div>

          {/* Birth Date & Time */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-emerald-600" />
                <span>{language === 'kh' ? 'ថ្ងៃខែឆ្នាំកំណើត' : 'Birth Date'}</span>
              </label>
              <input
                type="date"
                required
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-stone-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
                <Clock className="w-3 h-3 text-emerald-600" />
                <span>{language === 'kh' ? 'ម៉ោងកើត' : 'Birth Time'}</span>
              </label>
              <input
                type="time"
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-stone-900"
              />
            </div>
          </div>

          {/* Birth Hospital / Location */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-emerald-600" />
              <span>{t.birthLocation}</span>
            </label>
            <input
              type="text"
              value={birthLocation}
              onChange={(e) => setBirthLocation(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-stone-900"
            />
          </div>

          {/* Blood Type & Allergy */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
                <Droplets className="w-3 h-3 text-rose-500" />
                <span>{t.bloodType}</span>
              </label>
              <select
                value={bloodType}
                onChange={(e) => setBloodType(e.target.value as Child['bloodType'])}
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-stone-900"
              >
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown'].map((bt) => (
                  <option key={bt} value={bt}>{bt}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 text-amber-500" />
                <span>{t.allergy}</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Eggs, None"
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-stone-900"
              />
            </div>
          </div>

          {/* Previous Vaccinations checkbox */}
          <div className="p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-start gap-2">
            <input
              type="checkbox"
              id="chk-birth-vaccines"
              checked={hasReceivedBirthVaccines}
              onChange={(e) => setHasReceivedBirthVaccines(e.target.checked)}
              className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
            />
            <label htmlFor="chk-birth-vaccines" className="text-xs text-stone-700 leading-tight">
              <strong>{language === 'kh' ? 'បានចាក់ថ្នាំបង្ការពេលកើត (BCG & HepB)' : 'Received birth vaccines (BCG & HepB)'}</strong>
              <span className="block text-[11px] text-stone-500 mt-0.5">
                {language === 'kh' ? 'សម្គាល់ថាបានចាក់រួចរាល់នៅមន្ទីរពេទ្យពេលសម្រាល' : 'Mark as completed at delivery hospital'}
              </span>
            </label>
          </div>

          {/* Theme Color Tag */}
          <div>
            <label className="block text-[11px] font-semibold text-stone-500 mb-1">
              {language === 'kh' ? 'ពណ៌សម្គាល់លើប្រតិទិន' : 'Calendar Color Tag'}
            </label>
            <div className="flex gap-2">
              {colorThemes.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setSelectedColor(c)}
                  className={`w-6 h-6 rounded-full border-2 transition-all ${
                    selectedColor === c ? 'border-stone-900 scale-110 shadow-xs' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 text-xs font-semibold text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-xl"
            >
              {t.cancel}
            </button>
            <button
              id="btn-save-new-child"
              type="submit"
              className="flex-1 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs"
            >
              {language === 'kh' ? 'ចុះឈ្មោះ & បង្កើតកាលវិភាគ' : 'Register & Generate'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
