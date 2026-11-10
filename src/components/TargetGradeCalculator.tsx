/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * حاسبة «ما العلامة التي أحتاجها للنجاح؟» — الحاسبة العكسية الذكية
 */

import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, Calculator, CheckCircle2, AlertTriangle, 
  HelpCircle, Sparkles, ArrowRight, ShieldCheck, Compass
} from 'lucide-react';
import { CalculationService } from '../services/calculationService';

export const TargetGradeCalculator: React.FC = () => {
  const [targetAverage, setTargetAverage] = useState<number>(10.0);
  const [currentAverageExcluding, setCurrentAverageExcluding] = useState<number>(9.4);
  const [sumCoefsOther, setSumCoefsOther] = useState<number>(16);
  const [targetSubjectCoef, setTargetSubjectCoef] = useState<number>(3);
  const [targetSubjectName, setTargetSubjectName] = useState<string>('الرياضيات');
  const [assessmentMark, setAssessmentMark] = useState<number>(12);
  const [testMark, setTestMark] = useState<number>(11);
  const [hasAssessment, setHasAssessment] = useState<boolean>(true);

  // حساب النتيجة العكسية الدقيقة عبر CalculationService
  const result = useMemo(() => {
    return CalculationService.calculateTargetExamGrade({
      targetAverage,
      currentAverageExcludingSubject: currentAverageExcluding,
      sumCoefsOther,
      targetSubjectCoef,
      assessmentMark,
      testMark,
      hasAssessment
    });
  }, [targetAverage, currentAverageExcluding, sumCoefsOther, targetSubjectCoef, assessmentMark, testMark, hasAssessment]);

  return (
    <div className="space-y-8">
      
      {/* الترويسة التوجيهية بتدرج أخضر زمردي جذاب (Emerald-900 إلى Emerald-600) */}
      <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-600 text-white p-7 md:p-9 rounded-3xl shadow-xl space-y-3 relative overflow-hidden border border-emerald-700/40">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10">
          <span className="bg-amber-400 text-slate-950 font-black px-3 py-1 rounded-full text-xs inline-flex items-center gap-1.5 shadow-xs mb-3">
            <TrendingUp className="w-3.5 h-3.5 text-slate-950" />
            الحاسبة الرياضية المعكوسة
          </span>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight mb-2">
            ما العلامة التي أحتاجها للنجاح؟
          </h1>
          <p className="text-emerald-100/90 text-xs md:text-sm leading-relaxed max-w-2xl">
            أدخل هدفك المنشود وعلاماتك السابقة في الفروض والتقويم لتعرف بدقة متناهية كم يجب أن تأخذ على ورقة الاختبار، مع تنبيه فوري إذا كان الهدف ممكناً أو مستحيلاً.
          </p>
        </div>
      </div>

      {/* لوحة المدخلات والمخرجات */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* عمود المدخلات */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-800">معطيات الهدف والمادة المستهدفة</h2>
            <span className="text-[11px] text-slate-400">معادلة عكسية حتمية</span>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              المعدل العام المراد تحقيقه:
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="9"
                max="19"
                step="0.25"
                value={targetAverage}
                onChange={(e) => setTargetAverage(parseFloat(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
              <div className="flex items-center gap-1 shrink-0">
                <input
                  type="number"
                  min="0"
                  max="20"
                  step="0.1"
                  value={targetAverage}
                  onChange={(e) => setTargetAverage(parseFloat(e.target.value) || 0)}
                  className="w-16 p-2 text-center font-black text-sm border border-slate-300 rounded-xl bg-slate-50 text-amber-700"
                />
                <span className="text-xs text-slate-400">/ 20</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">المادة المستهدفة</label>
              <input
                type="text"
                value={targetSubjectName}
                onChange={(e) => setTargetSubjectName(e.target.value)}
                className="w-full p-2.5 text-xs font-bold text-slate-900 bg-white border border-slate-300 rounded-xl focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">معامل هذه المادة</label>
              <input
                type="number"
                min="1"
                max="10"
                value={targetSubjectCoef}
                onChange={(e) => setTargetSubjectCoef(parseFloat(e.target.value) || 1)}
                className="w-full p-2.5 text-xs font-bold text-slate-900 bg-white border border-slate-300 rounded-xl focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">معدل بقية المواد تقريباً</label>
              <input
                type="number"
                min="0"
                max="20"
                step="0.1"
                value={currentAverageExcluding}
                onChange={(e) => setCurrentAverageExcluding(parseFloat(e.target.value) || 0)}
                className="w-full p-2.5 text-xs font-bold text-slate-900 bg-white border border-slate-300 rounded-xl focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">مجموع معاملات بقية المواد</label>
              <input
                type="number"
                min="1"
                max="30"
                value={sumCoefsOther}
                onChange={(e) => setSumCoefsOther(parseFloat(e.target.value) || 1)}
                className="w-full p-2.5 text-xs font-bold text-slate-900 bg-white border border-slate-300 rounded-xl focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4 space-y-3">
            <span className="text-xs font-bold text-slate-900 block">علامات المادة المستهدفة قبل الاختبار:</span>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">علامة التقويم المستمر (20)</label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  step="0.25"
                  value={assessmentMark}
                  onChange={(e) => setAssessmentMark(parseFloat(e.target.value) || 0)}
                  className="w-full p-2 text-xs font-bold text-slate-900 bg-white border border-slate-300 rounded-xl focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">علامة الفرض المحروس (20)</label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  step="0.25"
                  value={testMark}
                  onChange={(e) => setTestMark(parseFloat(e.target.value) || 0)}
                  className="w-full p-2 text-xs font-bold text-slate-900 bg-white border border-slate-300 rounded-xl focus:border-emerald-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* عمود النتيجة والتوجيه الذكي */}
        <div className="flex flex-col justify-between bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 md:p-8 rounded-3xl shadow-lg">
          <div>
            <div className="flex items-center justify-between border-b border-slate-700 pb-3 mb-4">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">النتيجة الحسابية المطلوبة</span>
              {result.isPossible ? (
                <span className="text-xs bg-emerald-500/20 text-emerald-400 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> ممكن تحقيقه
                </span>
              ) : (
                <span className="text-xs bg-red-500/20 text-red-400 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> غير ممكن نظرياً
                </span>
              )}
            </div>

            <span className="text-xs text-slate-300 block mb-1">
              العلامة المطلوبة في اختبار {targetSubjectName}:
            </span>

            <div className="flex items-baseline gap-2 mb-4">
              <span className={`text-5xl font-black ${result.isPossible ? 'text-emerald-400' : 'text-red-400'}`}>
                {result.requiredExamMark}
              </span>
              <span className="text-lg text-slate-400">/ 20</span>
            </div>

            <div className={`p-4 rounded-2xl border text-xs leading-relaxed ${
              result.status === 'already_achieved'
                ? 'bg-emerald-950/60 border-emerald-600/40 text-emerald-200'
                : result.isPossible
                ? 'bg-slate-800 border-slate-700 text-slate-200'
                : 'bg-red-950/60 border-red-700/50 text-red-200'
            }`}>
              <p className="font-medium">{result.message}</p>
            </div>

            <div className="mt-4 p-3 bg-slate-800/60 rounded-xl border border-slate-700 text-xs space-y-1 text-slate-300">
              <p>معدل مادة {targetSubjectName} المطلوب الوصول إليه: <strong>{result.targetSubjectAverage} / 20</strong></p>
              <p className="text-[11px] text-slate-400">
                صيغة الاختبار: (معدل المادة × 4 - التقويم - الفرض) ÷ 2
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-700/80 text-[11px] text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>حسابات رياضية محددة بدقة دون أي تخمين عشوائي.</span>
          </div>
        </div>

      </div>

    </div>
  );
};
