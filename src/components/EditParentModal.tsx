import React, { useState } from 'react';
import { X, User, Phone, Mail, MapPin, Camera } from 'lucide-react';
import { Language, ParentProfile } from '../types';
import { translations } from '../data/translations';
import { compressImage } from '../lib/imageUtils';

interface EditParentModalProps {
  parent: ParentProfile;
  language: Language;
  onSave: (updated: ParentProfile) => void;
  onClose: () => void;
}

export const EditParentModal: React.FC<EditParentModalProps> = ({
  parent,
  language,
  onSave,
  onClose,
}) => {
  const t = translations[language];

  const [name, setName] = useState(parent.name);
  const [phone, setPhone] = useState(parent.phone);
  const [email, setEmail] = useState(parent.email);
  const [address, setAddress] = useState(parent.address);
  const [photoUrl, setPhotoUrl] = useState(parent.photoUrl);

  const sampleAvatars = [
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  ];

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
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      address: address.trim(),
      photoUrl,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-stone-200 relative my-6 animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900">
                {t.editProfile}
              </h3>
              <p className="text-xs text-stone-500">
                {language === 'kh' ? 'ព័ត៌មានអាណាព្យាបាល' : 'Parent Profile'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-stone-400 hover:text-stone-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          {/* Profile Picture Upload & Presets */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5 flex items-center justify-between">
              <span>{language === 'kh' ? 'រូបថតប្រវត្តិរូប (Profile Picture)' : 'Profile Picture'}</span>
              <label className="cursor-pointer text-[11px] text-emerald-600 font-bold hover:underline flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                <Camera className="w-3.5 h-3.5" />
                <span>{language === 'kh' ? 'បង្ហោះរូបភាព' : 'Upload Image'}</span>
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </label>
            </label>
            
            <div className="flex items-center gap-3">
              <img
                src={photoUrl}
                alt="Preview"
                referrerPolicy="no-referrer"
                className="w-14 h-14 rounded-full object-cover border-2 border-emerald-500 shadow-xs shrink-0"
              />
              <div className="flex items-center gap-2 flex-wrap">
                {sampleAvatars.map((url, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setPhotoUrl(url)}
                    className={`w-9 h-9 rounded-full p-0.5 border-2 transition-all ${
                      photoUrl === url ? 'border-emerald-600 ring-2 ring-emerald-200 scale-105' : 'border-stone-200 opacity-70'
                    }`}
                  >
                    <img src={url} alt="preset" referrerPolicy="no-referrer" className="w-full h-full rounded-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              {language === 'kh' ? 'ឈ្មោះអាណាព្យាបាល' : 'Parent Name'}
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 text-stone-900 font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
              <Phone className="w-3 h-3 text-stone-500" />
              <span>{language === 'kh' ? 'លេខទូរស័ព្ទ' : 'Phone Number'}</span>
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-xl text-stone-900 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
              <Mail className="w-3 h-3 text-stone-500" />
              <span>{language === 'kh' ? 'អ៊ីមែល' : 'Email Address'}</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-xl text-stone-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-stone-500" />
              <span>{language === 'kh' ? 'អាសយដ្ឋាន' : 'Address'}</span>
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-xl text-stone-900"
            />
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
              className="flex-1 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs"
            >
              {language === 'kh' ? 'រក្សាទុក' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
