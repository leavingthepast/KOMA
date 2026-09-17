import React, { useState } from 'react';
import { X, Edit, Calendar, Clock, MapPin, Droplets, AlertCircle, Camera } from 'lucide-react';
import { Child, Language } from '../types';
import { translations } from '../data/translations';
import { compressImage } from '../lib/imageUtils';

interface EditChildModalProps {
  child: Child;
  language: Language;
  onSave: (updated: Child) => void;
  onClose: () => void;
}

export const EditChildModal: React.FC<EditChildModalProps> = ({
  child,
  language,
  onSave,
  onClose,
}) => {
  const t = translations[language];

  const [name, setName] = useState(child.name);
  const [birthDate, setBirthDate] = useState(child.birthDate);
  const [birthTime, setBirthTime] = useState(child.birthTime || '08:00');
  const [birthLocation, setBirthLocation] = useState(child.birthLocation || '');
  const [bloodType, setBloodType] = useState<Child['bloodType']>(child.bloodType);
  const [allergies, setAllergies] = useState(child.allergies || '');
  const [photoUrl, setPhotoUrl] = useState(child.photoUrl);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressed = await compressImage(file, 300, 300, 0.8);
        setPhotoUrl(compressed);
      } catch (err) {
        console.error('Failed to compress image:', err);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSave({
      ...child,
      name: name.trim(),
      birthDate,
      birthTime,
      birthLocation: birthLocation.trim(),
      bloodType,
      allergies: allergies.trim() || 'None recorded',
      photoUrl,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-stone-200 relative my-6 animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
              <Edit className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900">
                {t.editDetail} - {child.name}
              </h3>
              <p className="text-xs text-stone-500">
                {language === 'kh' ? 'កែប្រែព័ត៌មានលម្អិតកុមារ' : 'Update child details'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-stone-400 hover:text-stone-700">
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
                {photoUrl ? (
                  <img src={photoUrl} alt="Preview" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                ) : (
                  <Camera className="w-6 h-6 text-stone-400" />
                )}
              </div>
              <span className="text-xs text-stone-500">
                {language === 'kh' ? 'ជ្រើសរើសរូបភាពពីឧបករណ៍របស់អ្នក' : 'Upload a profile picture for your child'}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              {language === 'kh' ? 'ឈ្មោះកូន' : "Child's Name"}
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 text-stone-900 font-semibold"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-emerald-600" />
                <span>{t.birthday}</span>
              </label>
              <input
                type="date"
                required
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-stone-300 rounded-xl font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
                <Clock className="w-3 h-3 text-emerald-600" />
                <span>{language === 'kh' ? 'ម៉ោងកើត' : 'Time'}</span>
              </label>
              <input
                type="time"
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-stone-300 rounded-xl font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-emerald-600" />
              <span>{t.birthLocation}</span>
            </label>
            <input
              type="text"
              value={birthLocation}
              onChange={(e) => setBirthLocation(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-xl text-stone-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
                <Droplets className="w-3 h-3 text-rose-500" />
                <span>{t.bloodType}</span>
              </label>
              <select
                value={bloodType}
                onChange={(e) => setBloodType(e.target.value as Child['bloodType'])}
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-stone-300 rounded-xl text-stone-900"
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
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-stone-300 rounded-xl text-stone-900"
              />
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 text-xs font-semibold text-stone-600 bg-stone-100 rounded-xl"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="flex-1 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs"
            >
              {language === 'kh' ? 'រក្សាទុក' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
