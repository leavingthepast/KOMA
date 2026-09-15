import React, { useState } from 'react';
import { X, Lock, KeyRound, Check, AlertCircle, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface ChangePasswordModalProps {
  language: Language;
  currentSavedPassword: string;
  onSavePassword: (newPassword: string) => void;
  onClose: () => void;
}

export const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  language,
  currentSavedPassword,
  onSavePassword,
  onClose,
}) => {
  const t = translations[language];

  const [currentInput, setCurrentInput] = useState('');
  const [newInput, setNewInput] = useState('');
  const [confirmInput, setConfirmInput] = useState('');

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // Simple password strength calculation
  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { score: 0, label: '', color: 'bg-stone-200' };
    if (pwd.length < 4) return { score: 1, label: language === 'kh' ? 'ខ្លីពេក' : 'Too Short', color: 'bg-rose-500' };
    if (pwd.length < 6) return { score: 2, label: language === 'kh' ? 'មធ្យម' : 'Fair', color: 'bg-amber-500' };
    const hasNum = /\d/.test(pwd);
    const hasLetter = /[a-zA-Z]/.test(pwd);
    if (pwd.length >= 8 && hasNum && hasLetter) {
      return { score: 4, label: language === 'kh' ? 'រឹងមាំខ្លាំង' : 'Strong', color: 'bg-emerald-600' };
    }
    return { score: 3, label: language === 'kh' ? 'ល្អ' : 'Good', color: 'bg-teal-500' };
  };

  const strength = getPasswordStrength(newInput);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validate current password
    if (currentInput !== currentSavedPassword) {
      setErrorMsg(t.passwordCurrentIncorrect);
      return;
    }

    // Validate length
    if (newInput.trim().length < 4) {
      setErrorMsg(t.passwordLengthError);
      return;
    }

    // Validate match
    if (newInput !== confirmInput) {
      setErrorMsg(t.passwordMismatchError);
      return;
    }

    // Success
    onSavePassword(newInput);
    setIsSuccess(true);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
      <div 
        id="change-password-modal"
        className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-stone-200 relative animate-in fade-in zoom-in duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900">
                {t.changePassword}
              </h3>
              <p className="text-xs text-stone-500">
                {t.changePasswordSubtitle}
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

        {isSuccess ? (
          <div className="py-8 flex flex-col items-center justify-center text-center space-y-2">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center animate-bounce">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h4 className="text-base font-extrabold text-stone-900">
              {t.passwordSuccessMsg}
            </h4>
            <p className="text-xs text-stone-500">
              {language === 'kh' ? 'ពាក្យសម្ងាត់ថ្មីត្រូវបានរក្សាទុក' : 'New password is saved securely.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
            {/* Current Password Field */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center justify-between">
                <span>{t.currentPasswordLabel}</span>
                <span className="text-[10px] text-stone-400 font-mono">
                  {t.defaultPasswordNotice}
                </span>
              </label>
              <div className="relative">
                <input
                  type={showCurrent ? 'text' : 'password'}
                  required
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  placeholder="••••"
                  className="w-full pl-3 pr-10 py-2 text-sm bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-stone-900 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1"
                >
                  {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* New Password Field */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                {t.newPasswordLabel}
              </label>
              <div className="relative">
                <input
                  type={showNew ? 'text' : 'password'}
                  required
                  value={newInput}
                  onChange={(e) => setNewInput(e.target.value)}
                  placeholder={language === 'kh' ? 'យ៉ាងតិច ៤ តួអក្សរ' : 'Min 4 characters or digits'}
                  className="w-full pl-3 pr-10 py-2 text-sm bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-stone-900 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1"
                >
                  {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password strength meter */}
              {newInput && (
                <div className="mt-1.5 flex items-center justify-between text-[10px]">
                  <div className="flex gap-1 w-24 h-1.5 bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all ${strength.color}`}
                      style={{ width: `${(strength.score / 4) * 100}%` }}
                    />
                  </div>
                  <span className="font-semibold text-stone-500">{strength.label}</span>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                {t.confirmPasswordLabel}
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  required
                  value={confirmInput}
                  onChange={(e) => setConfirmInput(e.target.value)}
                  placeholder="••••"
                  className="w-full pl-3 pr-10 py-2 text-sm bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-stone-900 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1"
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-xs text-rose-700">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Security note */}
            <div className="p-2.5 bg-stone-50 border border-stone-200 rounded-xl flex items-start gap-2 text-[11px] text-stone-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                {language === 'kh'
                  ? 'ពាក្យសម្ងាត់នេះត្រូវបានរក្សាទុកនៅលើទូរស័ព្ទរបស់អ្នក ដើម្បីការពារទិន្នន័យសុខភាពកូនៗពេលគ្មានអ៊ីនធឺណិត។'
                  : 'This password protects access to your child immunization data and is stored safely on this device.'}
              </span>
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
                id="btn-confirm-password"
                type="submit"
                className="flex-1 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-colors"
              >
                {t.updatePasswordBtn}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
