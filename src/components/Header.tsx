/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Calculator, Sparkles, BookOpen, GraduationCap, 
  Award, TrendingUp, History, ShieldCheck, Menu, X, ArrowLeft
} from 'lucide-react';

interface HeaderProps {
  currentPath: string;
  navigate: (path: string) => void;
  savedCount: number;
  openSavedModal: () => void;
  openDiagnosticsModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  navigate,
  savedCount,
  openSavedModal,
  openDiagnosticsModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'الرئيسية', path: '/', icon: <GraduationCap className="w-4 h-4 text-emerald-600" /> },
    { label: 'حاسبة الاستدراك', path: '/rattrapage', icon: <Sparkles className="w-4 h-4 text-amber-500" />, badge: 'الأهم' },
    { label: 'المعدل الفصلي', path: '/semestre', icon: <Calculator className="w-4 h-4 text-blue-600" /> },
    { label: 'العلامة المطلوبة للنجاح', path: '/target-grade', icon: <TrendingUp className="w-4 h-4 text-amber-600" /> },
    { label: 'المعدل الجامعي LMD', path: '/university', icon: <Award className="w-4 h-4 text-indigo-600" /> },
    { label: 'دليل المعدلات', path: '/guide', icon: <BookOpen className="w-4 h-4 text-purple-600" /> },
  ];

  const handleNav = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* 1. شريط علوي أخضر رفيع يعرض الموسم الدراسي 2026/2027 */}
      <div className="bg-[#064e3b] text-emerald-100 text-[11px] py-1.5 px-4 font-medium border-b border-emerald-950/30">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
            <span className="font-bold text-white">الموسم الدراسي 2026/2027 — الحساب الرسمي المعتمد والمطابق لمناهج وزارة التربية والتعليم العالي</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-emerald-200 font-semibold hidden sm:inline">مجاني 100% دون تسجيل</span>
            <button
              onClick={openDiagnosticsModal}
              className="text-emerald-300/80 hover:text-white flex items-center gap-1 text-[10px] font-semibold transition-colors"
              title="فحص دقة المحرك الحسابي"
            >
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span className="hidden md:inline">فحص المحرك</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. شريط التنقل الرئيسي */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-100 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          
          {/* الشعار والهوية مطابقة للصورة تماماً */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => handleNav('/')}
              className="flex items-center gap-2.5 text-right cursor-pointer focus:outline-none group"
              title="معدل DZ — الصفحة الرئيسية"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black text-slate-900 tracking-tight">معدل DZ</span>
                  <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold px-2 py-0.5 rounded-full">
                    2026/2027
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-medium block">احسب معدلك، اعرف فرصتك، واستعد للنجاح</span>
              </div>
            </button>
          </div>

          {/* روابط التنقل للشاشات الكبيرة كما في الصورة */}
          <nav className="hidden lg:flex items-center gap-2 text-xs">
            {/* الرئيسية - زر داكن */}
            <button
              onClick={() => handleNav('/')}
              className={`px-3.5 py-1.5 rounded-lg font-bold text-xs transition-all ${
                currentPath === '/'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-950 hover:bg-slate-50'
              }`}
            >
              الرئيسية
            </button>

            {/* حاسبة الاستدراك - زر ذهبي مميز محاط بإطار خفيف */}
            <button
              onClick={() => handleNav('/rattrapage')}
              className={`px-3 py-1.5 rounded-lg border border-amber-300 bg-amber-50/80 hover:bg-amber-100 text-amber-900 font-bold text-xs flex items-center gap-1.5 transition-all shadow-2xs ${
                currentPath === '/rattrapage' ? 'ring-2 ring-amber-400/50' : ''
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>حاسبة الاستدراك</span>
            </button>

            {/* المعدل الفصلي */}
            <button
              onClick={() => handleNav('/semestre')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentPath === '/semestre'
                  ? 'text-emerald-700 font-bold bg-emerald-50'
                  : 'text-slate-600 hover:text-emerald-700'
              }`}
            >
              المعدل الفصلي
            </button>

            {/* العلامة المطلوبة */}
            <button
              onClick={() => handleNav('/target-grade')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentPath === '/target-grade'
                  ? 'text-emerald-700 font-bold bg-emerald-50'
                  : 'text-slate-600 hover:text-emerald-700'
              }`}
            >
              العلامة المطلوبة
            </button>

            {/* الجامعي LMD */}
            <button
              onClick={() => handleNav('/university')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentPath === '/university'
                  ? 'text-emerald-700 font-bold bg-emerald-50'
                  : 'text-slate-600 hover:text-emerald-700'
              }`}
            >
              الجامعي LMD
            </button>

            {/* دليل القواعد */}
            <button
              onClick={() => handleNav('/guide')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentPath.startsWith('/guide')
                  ? 'text-emerald-700 font-bold bg-emerald-50'
                  : 'text-slate-600 hover:text-emerald-700'
              }`}
            >
              دليل القواعد
            </button>
          </nav>

          {/* أزرار الإجراءات السريعة (سجل النتائج + قائمة الهاتف) */}
          <div className="flex items-center gap-2">
            <button
              onClick={openSavedModal}
              className="p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-emerald-600 transition-colors relative"
              title="النتائج المحفوظة"
            >
              <History className="w-4 h-4" />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100"
              aria-label="القائمة الرئيسية"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* قائمة الهاتف المحمول المنسدلة */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-5 space-y-2.5 shadow-lg">
            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              {navLinks.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNav(item.path)}
                  className={`p-3 rounded-2xl flex items-center gap-2 text-right transition-all ${
                    currentPath === item.path
                      ? 'bg-emerald-600 text-white font-bold shadow-xs'
                      : 'bg-slate-50 text-slate-800 border border-slate-100'
                  }`}
                >
                  {item.icon}
                  <span className="truncate">{item.label}</span>
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <button
                onClick={() => { openDiagnosticsModal(); setMobileMenuOpen(false); }}
                className="text-emerald-700 flex items-center gap-1 font-bold"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>فحص دقة المحرك الحسابي</span>
              </button>
              <button
                onClick={() => { openSavedModal(); setMobileMenuOpen(false); }}
                className="text-slate-600 flex items-center gap-1 font-medium"
              >
                <History className="w-4 h-4" />
                <span>النتائج المحفوظة ({savedCount})</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
