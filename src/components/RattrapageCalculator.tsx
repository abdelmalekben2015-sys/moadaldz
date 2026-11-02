/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * حاسبة معدل الاستدراك في الجزائر 2026/2027 — الميزة التنافسية الكبرى
 */

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Sparkles, Sliders, CheckCircle2, AlertTriangle, Copy, 
  Printer, RotateCcw, Save, Share2, HelpCircle, ArrowUpRight, 
  Compass, ShieldCheck, ChevronDown, Check, TrendingUp
} from 'lucide-react';
import { ALL_CURRICULA } from '../data/curriculumData';
import { CalculationService } from '../services/calculationService';
import { LevelCurriculum, SavedResult } from '../types';

interface SubjectSimItem {
  id: string;
  name: string;
  coef: number;
  originalMark: number;
  rattrapageMark: number;
  isConcerned: boolean;
}

interface RattrapageCalculatorProps {
  onSaveResult: (result: SavedResult) => void;
}

export const RattrapageCalculator: React.FC<RattrapageCalculatorProps> = ({ onSaveResult }) => {
  // تصفية المستويات المناسبة للاستدراك (المتوسط والثانوي)
  const availableCurricula = useMemo(() => {
    return ALL_CURRICULA.filter(c => c.cycle === 'middle' || c.cycle === 'secondary');
  }, []);

  const [selectedCurriculumId, setSelectedCurriculumId] = useState<string>('middle_2am');
  const [passingThreshold, setPassingThreshold] = useState<number>(10.0);
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);
  const [savedNotification, setSavedNotification] = useState<boolean>(false);

  // إعداد المواد الأولية بناءً على المستوى المختار
  const currentCurriculum: LevelCurriculum = useMemo(() => {
    return availableCurricula.find(c => c.id === selectedCurriculumId) || availableCurricula[0];
  }, [selectedCurriculumId, availableCurricula]);

  const [subjectsState, setSubjectsState] = useState<SubjectSimItem[]>([]);

  // تحميل مواد المستوى المختار مع قيم نموذجية للاستدراك (علامات دون 10)
  useEffect(() => {
    const initial: SubjectSimItem[] = currentCurriculum.subjects.map((s, idx) => {
      // إعطاء بعض المواد علامات تحت 10 لمحاكاة الاستدراك الواقعي
      let orig = 11;
      if (idx === 0) orig = 8.5;  // لغة عربية
      else if (idx === 1) orig = 7.5; // رياضيات
      else if (idx === 2) orig = 9.0; // لغة فرنسية
      else if (idx === 4) orig = 8.0; // علوم طبيعية

      return {
        id: s.id,
        name: s.name,
        coef: s.coef,
        originalMark: orig,
        rattrapageMark: orig, // الافتراضي مطابق للأصلي
        isConcerned: orig < 10
      };
    });

    setSubjectsState(initial);
  }, [currentCurriculum]);

  // تحديث العلامة الأصلية لمادة
  const updateOriginalMark = (id: string, val: number) => {
    const clamped = Math.max(0, Math.min(20, isNaN(val) ? 0 : val));
    setSubjectsState(prev => prev.map(s => {
      if (s.id === id) {
        return {
          ...s,
          originalMark: clamped,
          rattrapageMark: Math.max(clamped, s.rattrapageMark),
          isConcerned: clamped < passingThreshold
        };
      }
      return s;
    }));
  };

  // تحديث علامة الاستدراك لمادة
  const updateRattrapageMark = (id: string, val: number) => {
    const clamped = Math.max(0, Math.min(20, isNaN(val) ? 0 : val));
    setSubjectsState(prev => prev.map(s => {
      if (s.id === id) {
        return { ...s, rattrapageMark: clamped };
      }
      return s;
    }));
  };

  // تحديث معامل مادة يدوياً
  const updateSubjectCoef = (id: string, val: number) => {
    const clamped = Math.max(1, Math.min(10, isNaN(val) ? 1 : val));
    setSubjectsState(prev => prev.map(s => s.id === id ? { ...s, coef: clamped } : s));
  };

  // حساب النتائج الحتمية عبر CalculationService
  const calculationResults = useMemo(() => {
    return CalculationService.calculateRattrapageSimulation(
      subjectsState.map(s => ({
        id: s.id,
        name: s.name,
        coef: s.coef,
        originalMark: s.originalMark,
        rattrapageMark: s.rattrapageMark
      })),
      passingThreshold
    );
  }, [subjectsState, passingThreshold]);

  // حساب النقاط الإجمالية المتبقية للنجاح
  const pointsNeededToPass = useMemo(() => {
    if (calculationResults.isPassed) return 0;
    const currentSum = calculationResults.simulatedAverage * calculationResults.totalCoef;
    const neededSum = passingThreshold * calculationResults.totalCoef;
    return Math.max(0, Math.round((neededSum - currentSum) * 100) / 100);
  }, [calculationResults, passingThreshold]);

  // ترتيب المواد حسب أولوية التأثير (أعلى معامل وأدنى نقطة)
  const prioritizedSubjects = useMemo(() => {
    return [...subjectsState]
      .filter(s => s.originalMark < passingThreshold)
      .sort((a, b) => b.coef - a.coef);
  }, [subjectsState, passingThreshold]);

  // تطبيق سيناريوهات سريعة
  const applyQuickScenario = (scenario: 'target10' | 'realisticBoost' | 'reset') => {
    setSubjectsState(prev => prev.map(s => {
      if (scenario === 'reset') {
        return { ...s, rattrapageMark: s.originalMark };
      }
      if (scenario === 'target10') {
        return { ...s, rattrapageMark: s.originalMark < 10 ? 10.0 : s.originalMark };
      }
      if (scenario === 'realisticBoost') {
        // زيادة نقطتين في المواد المعنية بحد أقصى 13
        return { ...s, rattrapageMark: s.originalMark < 10 ? Math.min(13, s.originalMark + 2.5) : s.originalMark };
      }
      return s;
    }));
  };

  // نسخ ملخص النتيجة
  const handleCopySummary = () => {
    const text = `📊 نتيجتي في حاسبة الاستدراك عبر منصة «معدل DZ»:\n` +
      `المستوى: ${currentCurriculum.name}\n` +
      `المعدل السنوي قبل الاستدراك: ${calculationResults.originalAverage}/20\n` +
      `المعدل المتوقع بعد الاستدراك: ${calculationResults.simulatedAverage}/20\n` +
      `مقدار التحسين: +${calculationResults.gain} نقطة\n` +
      `الوضعية: ${calculationResults.isPassed ? 'مؤهل للنجاح والانتقال بحول الله 🎉' : 'يحتاج إلى نقاط إضافية'}\n` +
      `رابط الحاسبة: https://moadel-dz.com/rattrapage`;

    navigator.clipboard.writeText(text);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  // حفظ النتيجة في التخزين المحلي
  const handleSave = () => {
    const item: SavedResult = {
      id: 'rat_' + Date.now(),
      title: `استدراك — ${currentCurriculum.name}`,
      date: new Date().toLocaleDateString('ar-DZ', { year: 'numeric', month: 'short', day: 'numeric' }),
      cycle: currentCurriculum.cycle,
      levelName: currentCurriculum.name,
      average: calculationResults.simulatedAverage,
      totalWeightedPoints: Math.round(calculationResults.simulatedAverage * calculationResults.totalCoef * 100) / 100,
      totalCoef: calculationResults.totalCoef,
      isPassed: calculationResults.isPassed,
      type: 'rattrapage',
      subjectsSnapshot: subjectsState.map(s => ({
        name: s.name,
        coef: s.coef,
        mark: s.originalMark,
        rattrapageMark: s.rattrapageMark
      }))
    };

    onSaveResult(item);
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 2500);
  };

  return (
    <div className="space-y-8">
      
      {/* رأس الصفحة والشرح الرسمي بتدرج أخضر زمردي متدرج (Emerald-900 إلى Emerald-600) */}
      <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-600 text-white p-7 md:p-9 rounded-3xl shadow-xl border border-emerald-700/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-amber-400 text-slate-950 font-black px-3 py-1 rounded-full text-xs flex items-center gap-1.5 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-slate-950" />
              المحرك الحسابي المعتمد لعام 2026/2027
            </span>
          </div>

          <h1 className="text-2xl md:text-4xl font-black mb-3 tracking-tight">
            حاسبة معدل الاستدراك في الجزائر 2026/2027
          </h1>
          <p className="text-emerald-100/90 text-xs md:text-sm leading-relaxed mb-6">
            أقوى أداة تفاعلية جزائرية لمحاكاة نتائج الامتحان الاستدراكي. تعتمد على القاعدة الرسمية الصارمة:
            <strong className="text-amber-300"> «الاحتفاظ بالنقطة الأفضل لصالح التلميذ: MAX(النقطة السابقة، نقطة الاستدراك)»</strong>.
          </p>

          {/* محدد المستوى والشعبة */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <label className="text-xs font-bold text-emerald-200 shrink-0">اختر المستوى الدراسي:</label>
            <select
              value={selectedCurriculumId}
              onChange={(e) => setSelectedCurriculumId(e.target.value)}
              className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs p-3 rounded-2xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-amber-400 backdrop-blur-xs"
            >
              {availableCurricula.map((curr) => (
                <option key={curr.id} value={curr.id} className="bg-slate-900 text-white">
                  {curr.name} ({curr.cycle === 'middle' ? 'تعليم متوسط' : 'تعليم ثانوي'})
                </option>
              ))}
            </select>

            <div className="flex items-center gap-2 bg-emerald-950/70 border border-emerald-700/50 px-3.5 py-2 rounded-2xl text-xs text-emerald-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>القاعدة: {currentCurriculum.ruleDescription}</span>
            </div>
          </div>
        </div>
      </div>

      {/* لوحة النتائج المركزية (Dashboard) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* بطاقة المعدل السابق */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-medium text-slate-500 block mb-1">المعدل قبل الاستدراك</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-black text-slate-800">{calculationResults.originalAverage}</span>
            <span className="text-xs text-slate-400">/ 20</span>
          </div>
          <span className="text-[11px] text-slate-400 block mt-2">
            عدد المواد غير المستوفاة: <strong>{calculationResults.qualifyingSubjectsCount} مواد</strong>
          </span>
        </div>

        {/* بطاقة المعدل الجديد المتوقع */}
        <div className={`p-5 rounded-2xl border transition-all ${
          calculationResults.isPassed 
            ? 'bg-emerald-50 border-emerald-300 text-emerald-950 shadow-xs shadow-emerald-100' 
            : 'bg-amber-50 border-amber-300 text-amber-950'
        }`}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold">المعدل بعد الاستدراك</span>
            {calculationResults.gain > 0 && (
              <span className="text-xs font-black bg-emerald-600 text-white px-2 py-0.5 rounded-md flex items-center gap-0.5">
                <ArrowUpRight className="w-3.5 h-3.5" />
                +{calculationResults.gain}
              </span>
            )}
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-black">{calculationResults.simulatedAverage}</span>
            <span className="text-xs opacity-70">/ 20</span>
          </div>
          <span className="text-[11px] block mt-2 opacity-85">
            المواد التي تم رفع علامتها: <strong>{calculationResults.improvedSubjectsCount} مادة</strong>
          </span>
        </div>

        {/* بطاقة قرار النجاح أو النقاط المتبقية */}
        <div className={`p-5 rounded-2xl border flex flex-col justify-between ${
          calculationResults.isPassed 
            ? 'bg-emerald-600 text-white border-emerald-600' 
            : 'bg-slate-800 text-white border-slate-800'
        }`}>
          <div>
            <span className="text-xs opacity-80 block mb-1">الوضعية المتوقعة</span>
            <span className="text-lg font-black block leading-tight">
              {calculationResults.isPassed ? 'مؤهل للنجاح والانتقال 🎉' : 'دون عتبة النجاح حالياً'}
            </span>
          </div>
          <div className="text-xs pt-3 mt-2 border-t border-white/20 flex items-center justify-between">
            <span>عتبة النجاح: {passingThreshold}/20</span>
            {!calculationResults.isPassed && (
              <span className="text-amber-300 font-bold">متبقي: {pointsNeededToPass} نقطة موزونة</span>
            )}
          </div>
        </div>

        {/* بطاقة الإجراءات السريعة (حفظ، نسخ، طباعة) */}
        <div className="bg-white p-4 rounded-3xl border border-slate-100 flex flex-col justify-between gap-2 shadow-xs">
          <span className="text-xs font-bold text-slate-800">إجراءات النتيجة</span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleSave}
              className="p-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs shadow-amber-200 transition-all active:scale-95"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{savedNotification ? 'تم الحفظ!' : 'حفظ النتيجة'}</span>
            </button>

            <button
              onClick={handleCopySummary}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedNotification ? 'تم النسخ!' : 'نسخ'}</span>
            </button>

            <button
              onClick={() => window.print()}
              className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium flex items-center justify-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>طباعة</span>
            </button>

            <button
              onClick={() => applyQuickScenario('reset')}
              className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>إعادة ضبط</span>
            </button>
          </div>
        </div>

      </div>

      {/* قسم «خطتي الذكية للنجاح في الاستدراك» */}
      <div className="bg-gradient-to-br from-amber-500/10 via-white to-emerald-500/10 p-6 rounded-3xl border border-amber-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
                <Compass className="w-4 h-4" />
              </div>
              <h2 className="text-base font-bold text-slate-900">أداة «خطتي للنجاح في الاستدراك»</h2>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              حدد المواد ذات المعامل المرتفع لتحقيق أقصى زيادة في المعدل بأقل جهد في المراجعة.
            </p>
          </div>

          {/* أزرار السيناريوهات السريعة */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => applyQuickScenario('target10')}
              className="px-3.5 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 border border-amber-300 text-amber-950 text-xs font-bold transition-colors"
            >
              سيناريو: 10/20 للجميع
            </button>
            <button
              onClick={() => applyQuickScenario('realisticBoost')}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 text-emerald-950 text-xs font-bold transition-colors"
            >
              سيناريو: +2.5 نقاط تحسين
            </button>
          </div>
        </div>

        {/* عرض المواد ذات الأولوية القصوى استراتيجياً */}
        {prioritizedSubjects.length > 0 && (
          <div className="bg-white p-4 rounded-2xl border border-slate-200 text-xs space-y-2">
            <span className="font-bold text-slate-800 block">المواد ذات الأولوية الاستراتيجية حسب المعامل:</span>
            <div className="flex flex-wrap gap-2">
              {prioritizedSubjects.slice(0, 3).map((sub, i) => (
                <span 
                  key={sub.id} 
                  className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5"
                >
                  <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span>{sub.name} (معامل {sub.coef})</span>
                  <span className="text-[11px] text-slate-500 font-normal">النقطة السابقة: {sub.originalMark}</span>
                </span>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 pt-1">
              * تحسين نقطة واحدة في مادة بمعامل {prioritizedSubjects[0]?.coef || 3} يمنحك {prioritizedSubjects[0]?.coef || 3} نقاط موزونة كاملة في المجموع العام!
            </p>
          </div>
        )}
      </div>

      {/* قائمة المواد ومحاكاة درجات الاستدراك */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-800">محاكاة علامات المواد</h3>
            <p className="text-xs text-slate-500">عدل العلامة الأصلية وعلامة الاستدراك باستخدام شريط التمرير أو الصندوق الرقمي</p>
          </div>
          <span className="text-xs text-slate-500">
            إجمالي المعاملات: <strong>{calculationResults.totalCoef}</strong>
          </span>
        </div>

        <div className="space-y-4">
          {subjectsState.map((sub) => {
            const isImproved = sub.rattrapageMark > sub.originalMark;
            const effectiveMark = Math.max(sub.originalMark, sub.rattrapageMark);
            const markGain = Math.round((effectiveMark - sub.originalMark) * 100) / 100;

            return (
              <div 
                key={sub.id} 
                className={`p-4 rounded-2xl border transition-all ${
                  sub.isConcerned 
                    ? 'bg-amber-50/40 border-amber-200/80 hover:border-amber-300' 
                    : 'bg-slate-50/50 border-slate-200/60'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  
                  {/* اسم المادة والمعامل وحالة الاستدراك */}
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-800">{sub.name}</span>
                    
                    <span className="text-[11px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                      معامل {sub.coef}
                    </span>

                    {sub.isConcerned ? (
                      <span className="text-[10px] bg-amber-100 border border-amber-300 text-amber-900 font-bold px-2 py-0.5 rounded-full">
                        معنية بالاستدراك
                      </span>
                    ) : (
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
                        <Check className="w-3 h-3" /> مستوفاة مسبقاً
                      </span>
                    )}
                  </div>

                  {/* مدخل العلامة السابقة */}
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-slate-500">العلامة السنوية السابقة:</span>
                    <input
                      type="number"
                      min="0"
                      max="20"
                      step="0.25"
                      value={sub.originalMark}
                      onChange={(e) => updateOriginalMark(sub.id, parseFloat(e.target.value) || 0)}
                      className="w-16 p-1 text-center font-bold text-xs border border-slate-300 rounded-lg bg-white"
                      title="العلامة السنوية الأصلية من كشف النقاط"
                    />
                    <span className="text-slate-400">/ 20</span>
                  </div>

                </div>

                {/* شريط محاكاة علامة الاستدراك */}
                <div className="flex items-center gap-3 pt-2">
                  <div className="text-xs font-semibold text-slate-600 shrink-0 w-24">
                    نقطة الاستدراك:
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="20"
                    step="0.25"
                    value={sub.rattrapageMark}
                    onChange={(e) => updateRattrapageMark(sub.id, parseFloat(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                  />

                  <div className="flex items-center gap-1 shrink-0">
                    <input
                      type="number"
                      min="0"
                      max="20"
                      step="0.25"
                      value={sub.rattrapageMark}
                      onChange={(e) => updateRattrapageMark(sub.id, parseFloat(e.target.value) || 0)}
                      className={`w-16 p-1.5 text-center font-black text-xs border rounded-lg ${
                        isImproved 
                          ? 'border-emerald-500 text-emerald-800 bg-emerald-50' 
                          : 'border-slate-300 text-slate-800 bg-white'
                      }`}
                    />
                    <span className="text-xs text-slate-400">/ 20</span>
                  </div>

                  {/* أثر التحسين */}
                  <div className="w-24 text-left shrink-0">
                    {markGain > 0 ? (
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                        +{markGain}
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-400">لا تغيير</span>
                    )}
                  </div>
                </div>

                {/* تنبيه قاعدة الاستدراك في حال كانت النقطة أقل */}
                {sub.rattrapageMark < sub.originalMark && (
                  <p className="text-[10px] text-emerald-700 mt-2 flex items-center gap-1 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    حسب القانون: تُعتمد علامتك السابقة ({sub.originalMark}/20) ولن ينخفض معدلك إطلاقاً.
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
