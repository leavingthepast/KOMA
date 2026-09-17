import React, { useState } from 'react';
import { Language } from '../types';
import { Shield, Mail, Lock, ArrowRight, UserPlus } from 'lucide-react';

interface LoginViewProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onLoginSuccess: (email: string, setPassword?: string) => void;
  onDemoLogin: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({
  language,
  onLanguageChange,
  onLoginSuccess,
  onDemoLogin,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const isKh = language === 'kh';

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      setErrorMsg(isKh ? 'សូមបញ្ចូលអ៊ីមែល Gmail ឱ្យបានត្រឹមត្រូវ។' : 'Please enter a valid Gmail address.');
      setError(true);
      return;
    }

    if (isCreatingAccount && !password.trim()) {
      setErrorMsg(isKh ? 'សូមកំណត់ពាក្យសម្ងាត់សម្រាប់គណនីរបស់អ្នក។' : 'Please set a password for your new account.');
      setError(true);
      return;
    }

    onLoginSuccess(cleanEmail, password.trim() || undefined);
  };

  return (
    <div className="min-h-screen bg-stone-100 flex justify-center items-center p-4 selection:bg-emerald-100">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-stone-200 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-50 rounded-full blur-3xl -z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-50 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        {/* Top Header & Language Toggle */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            <Shield className="w-3.5 h-3.5" />
            <span>{isKh ? 'សុវត្ថិភាពទិន្នន័យ' : 'Secure & Private'}</span>
          </div>

          <div className="flex items-center bg-stone-100 p-0.5 rounded-lg border border-stone-200 text-xs font-medium">
            <button
              onClick={() => onLanguageChange('kh')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                isKh ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              ខ្មែរ
            </button>
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                !isKh ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              EN
            </button>
          </div>
        </div>

        {/* Brand Title Section (No Logo) */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">
            {isKh ? 'កុមារ (KOMA)' : 'KOMA'}
          </h1>
          <p className="text-xs font-semibold text-emerald-600 mt-1 uppercase tracking-wider">
            {isKh ? 'កម្មវិធីតាមដានសុខភាពនិងការចាក់វ៉ាក់សាំងកុមារ' : 'Child Health & Vaccine Tracker'}
          </p>
          <p className="text-xs text-stone-500 mt-2 max-w-xs mx-auto leading-relaxed">
            {isCreatingAccount
              ? (isKh ? 'បង្កើតគណនីថ្មី និងកំណត់ពាក្យសម្ងាត់សម្រាប់កម្មវិធី' : 'Create account and set your app password')
              : (isKh ? 'ចូលគណនីរបស់អ្នកដោយប្រើប្រាស់អ៊ីមែល Gmail' : 'Log in securely with your Gmail')}
          </p>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-stone-500" />
              {isKh ? 'អ៊ីមែល Gmail' : 'Gmail Address'}
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(false);
              }}
              placeholder="e.g. parent@gmail.com"
              className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all text-sm font-medium"
            />
          </div>

          {isCreatingAccount && (
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-stone-500" />
                {isKh ? 'កំណត់ពាក្យសម្ងាត់សម្រាប់កម្មវិធី (App Password)' : 'Set App Password'}
              </label>
              <input
                type="password"
                required={isCreatingAccount}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all text-sm font-medium"
              />
              <p className="text-[11px] text-stone-400 mt-1">
                {isKh ? 'ពាក្យសម្ងាត់នេះតម្រូវឱ្យបង្កើតតែម្តងគត់ពេលបង្កើតគណនី។' : 'Password is only required when creating an account.'}
              </p>
            </div>
          )}

          {error && (
            <p className="text-xs text-rose-600 font-medium text-center bg-rose-50 p-2.5 rounded-xl border border-rose-200">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group text-sm mt-2"
          >
            <span>{isCreatingAccount ? (isKh ? 'បង្កើតគណនី' : 'Create Account') : (isKh ? 'ចូលគណនី' : 'Log In')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </form>

        {/* Toggle between Login and Create Account */}
        <div className="mt-5 text-center space-y-2.5">
          <button
            type="button"
            onClick={() => {
              setIsCreatingAccount(!isCreatingAccount);
              setError(false);
            }}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors inline-flex items-center gap-1.5"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>
              {isCreatingAccount
                ? (isKh ? 'មានគណនីរួចហើយ? ចូលគណនី' : 'Already have an account? Log In')
                : (isKh ? 'បង្កើតគណនីថ្មី (កំណត់ពាក្យសម្ងាត់)' : "Don't have an account? Create Account")}
            </span>
          </button>

          {/* Demo Account Button */}
          <div>
            <button
              type="button"
              onClick={onDemoLogin}
              className="w-full py-2.5 px-4 bg-amber-50 hover:bg-amber-100 text-amber-800 font-semibold rounded-xl border border-amber-200 transition-all flex items-center justify-center gap-2 text-xs shadow-2xs"
            >
              <Shield className="w-3.5 h-3.5 text-amber-600" />
              <span>{isKh ? '✨ សាកល្បងមើលគំរូគណនី (Demo Mode)' : '✨ Try Demo Account (Explore Features)'}</span>
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-6 text-center border-t border-stone-100 pt-4 text-[11px] text-stone-400">
          <p>{isKh ? 'រក្សាទិន្នន័យដោយសុវត្ថិភាពក្នុងឧបករណ៍របស់អ្នក' : 'Offline-First & Secure Local Data Storage'}</p>
        </div>
      </div>
    </div>
  );
};
