/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * حاسبة المعدل الفصلي بالمعاملات — الطور الابتدائي، المتوسط، والثانوي
 */

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Calculator, Plus, Trash2, RotateCcw, Save, Printer, 
  Copy, Info, ShieldCheck, CheckCircle2, ChevronDown, Check
} from 'lucide-react';
import { ALL_CURRICULA } from '../data/curriculumData';
import { CalculationService } from '../services/calculationService';
import { LevelCurriculum, SavedResult, SubjectRule } from '../types';

interface TrimesterCalculatorProps {
  onSaveResult: (result: SavedResult) => void;
}

export const TrimesterCalculator: React.FC<TrimesterCalculatorProps> = ({ onSaveResult }) => {
  const [selectedCurriculumId, setSelectedCurriculumId] = useState<string>('middle_2am');
  const [selectedTrimester, setSelectedTrimester] = useState<'T1' | 'T2' | 'T3'>('T1');
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);
  const [savedNotification, setSavedNotification] = useState<boolean>(false);

  // إعداد المستوى المختار
  const currentCurriculum = useMemo(() => {
    return ALL_CURRICULA.find(c => c.id === selectedCurriculumId) || ALL_CURRICULA[0];
  }, [selectedCurriculumId]);

  const [subjectsState, setSubjectsState] = useState<SubjectRule[]>([]);

  // تحميل مواد المستوى عند التغيير
  useEffect(() => {
    setSubjectsState(JSON.parse(JSON.stringify(currentCurriculum.subjects)));
  }, [currentCurriculum]);

  // تحديث علامات مادة معينة
  const updateSubjectField = (id: string, field: keyof SubjectRule, val: any) => {
    setSubjectsState(prev => prev.map(s => {
      if (s.id === id) {
        return { ...s, [field]: val };
      }
      return s;
    }));
  };

  // إضافة مادة اختيارية إضافية (أمازيغية، لغة ثالثة، إلخ)
  const addCustomSubject = () => {
    const newSub: SubjectRule = {
      id: 'custom_' + Date.now(),
      name: 'مادة اختيارية إضافية',
      coef: 1,
      hasAssessment: currentCurriculum.cycle !== 'primary',
      defaultAssessment: 14,
      defaultTest1: 12,
      defaultExam: 12
    };
    setSubjectsState(prev => [...prev, newSub]);
  };

  // حذف مادة
  const removeSubject = (id: string) => {
    setSubjectsState(prev => prev.filter(s => s.id !== id));
  };

  // حساب المعدل الفصلي عبر CalculationService
  const calculationResults = useMemo(() => {
    return CalculationService.calculateTrimesterTotal(subjectsState);
  }, [subjectsState]);

  // تقييم التقدير الشرفي للنتيجة
  const honorsEstimate = useMemo(() => {
    const avg = calculationResults.average;
    if (avg >= 18) return { label: 'امتياز باهر 🌟', color: 'text-emerald-700 bg-emerald-100' };
    if (avg >= 16) return { label: 'تهنئة (جيد جداً) 🎉', color: 'text-emerald-700 bg-emerald-50' };
    if (avg >= 14) return { label: 'لوحة شرف (جيد) 👍', color: 'text-blue-700 bg-blue-50' };
    if (avg >= 12) return { label: 'تشجيع (قريب من الجيد)', color: 'text-slate-700 bg-slate-100' };
    if (avg >= 10) return { label: 'مقبول (ناجح)', color: 'text-slate-700 bg-slate-100' };
    return { label: 'يحتاج إلى بذل مجهود إضافي', color: 'text-amber-800 bg-amber-100' };
  }, [calculationResults.average]);

  // نسخ ملخص النتيجة
  const handleCopySummary = () => {
    const text = `📋 نتيجتي في الفصل الدراسي (${selectedTrimester}) — منصة «معدل DZ»:\n` +
      `المستوى: ${currentCurriculum.name}\n` +
      `المعدل الفصلي: ${calculationResults.average} / 20\n` +
      `مجموع النقاط الموزونة: ${calculationResults.totalWeightedPoints}\n` +
      `مجموع المعاملات: ${calculationResults.totalCoef}\n` +
      `التقدير: ${honorsEstimate.label}\n` +
      `رابط الحساب: https://moadel-dz.com/semestre`;

    navigator.clipboard.writeText(text);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  // حفظ النتيجة
  const handleSave = () => {
    const item: SavedResult = {
      id: 'tri_' + Date.now(),
      title: `${currentCurriculum.name} — ${selectedTrimester === 'T1' ? 'الفصل 1' : selectedTrimester === 'T2' ? 'الفصل 2' : 'الفصل 3'}`,
      date: new Date().toLocaleDateString('ar-DZ', { year: 'numeric', month: 'short', day: 'numeric' }),
      cycle: currentCurriculum.cycle,
      levelName: currentCurriculum.name,
      average: calculationResults.average,
      totalWeightedPoints: calculationResults.totalWeightedPoints,
      totalCoef: calculationResults.totalCoef,
      isPassed: calculationResults.average >= currentCurriculum.passingGrade,
      type: 'trimester',
      subjectsSnapshot: subjectsState.map(s => ({
        name: s.name,
        coef: s.coef,
        mark: CalculationService.calculateSubjectAverage({
          hasAssessment: s.hasAssessment,
          hasTest2: s.hasTest2,
          assessment: s.defaultAssessment,
          test1: s.defaultTest1,
          test2: s.defaultTest2,
          exam: s.defaultExam
        }) ?? 0
      }))
    };

    onSaveResult(item);
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 2500);
  };

  return (
    <div className="space-y-8">
      
      {/* الترويسة وأدوات الاختيار */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h1 className="text-xl md:text-3xl font-black text-slate-800">
              حاسبة المعدل الفصلي بالمعاملات (2026/2027)
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              أدخل علامات التقويم والفروض والاختبارات لحساب المعدل الفصلي العام والمجموع الموزون بالمعاملات الرسمية.
            </p>
          </div>

          {/* تبويبات الفصول الثلاثة */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl self-start md:self-auto">
            <button
              onClick={() => setSelectedTrimester('T1')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedTrimester === 'T1' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600'
              }`}
            >
              الفصل الأول
            </button>
            <button
              onClick={() => setSelectedTrimester('T2')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedTrimester === 'T2' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600'
              }`}
            >
              الفصل الثاني
            </button>
            <button
              onClick={() => setSelectedTrimester('T3')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedTrimester === 'T3' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600'
              }`}
            >
              الفصل الثالث
            </button>
          </div>
        </div>

        {/* محدد الطور والمستوى */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">المستوى والشعبة الدراسية:</label>
            <select
              value={selectedCurriculumId}
              onChange={(e) => setSelectedCurriculumId(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {ALL_CURRICULA.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <div className="w-full p-2 bg-emerald-50/70 border border-emerald-200/60 rounded-xl flex items-center gap-2 text-xs text-emerald-900">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <span className="font-bold block">القاعدة المعتمدة:</span>
                <span className="text-[11px] text-emerald-800">{currentCurriculum.ruleDescription}</span>
              </div>
            </div>
          </div>

          <div className="flex items-end justify-end">
            <button
              onClick={addCustomSubject}
              className="px-3.5 py-2.5 rounded-xl border border-dashed border-emerald-600 text-emerald-700 hover:bg-emerald-50 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة مادة إضافية</span>
            </button>
          </div>
        </div>
      </div>

      {/* لوحة المعدل الفصلي والتقدير الشرفي بتدرج أخضر زمردي متناسق */}
      <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-600 text-white p-7 rounded-3xl shadow-xl border border-emerald-700/40 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs bg-amber-400 text-slate-950 font-black px-2.5 py-0.5 rounded-lg shadow-xs">
              {selectedTrimester === 'T1' ? 'الفصل الأول' : selectedTrimester === 'T2' ? 'الفصل الثاني' : 'الفصل الثالث'}
            </span>
            <span className="text-xs text-emerald-200 font-medium">المعدل الفصلي العام</span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-black tracking-tight">{calculationResults.average}</span>
            <span className="text-sm opacity-80">/ {currentCurriculum.scaleMax}</span>
          </div>

          <p className="text-xs text-emerald-100 mt-2">
            مجموع النقاط الموزونة: <strong>{calculationResults.totalWeightedPoints}</strong> | مجموع المعاملات: <strong>{calculationResults.totalCoef}</strong>
          </p>
        </div>

        <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-xs space-y-2 text-left self-stretch md:self-auto min-w-[220px]">
          <div className="flex items-center justify-between gap-3">
            <span className="opacity-80">التقدير:</span>
            <span className={`font-bold px-2 py-0.5 rounded ${honorsEstimate.color}`}>
              {honorsEstimate.label}
            </span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="opacity-80">عتبة الانتقال:</span>
            <span className="font-bold">{currentCurriculum.passingGrade} / {currentCurriculum.scaleMax}</span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="opacity-80">المواد المكتملة:</span>
            <span className="font-bold">{calculationResults.completedSubjectsCount} من {calculationResults.totalSubjectsCount}</span>
          </div>
        </div>
      </div>

      {/* جدول إدخال العلامات للمواد */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
          <span className="font-bold text-xs text-slate-800">قائمة المواد والمعاملات المعتمدة</span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs font-bold shadow-xs shadow-amber-200 transition-all flex items-center gap-1 active:scale-95"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{savedNotification ? 'تم الحفظ!' : 'حفظ النتيجة'}</span>
            </button>
            <button
              onClick={handleCopySummary}
              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 text-xs font-medium hover:bg-slate-50 flex items-center gap-1"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedNotification ? 'تم النسخ!' : 'نسخ النتيجة'}</span>
            </button>
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 text-xs font-medium hover:bg-slate-50 flex items-center gap-1"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>طباعة كشف النقاط</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3.5">المادة</th>
                <th className="p-3.5 w-20">المعامل</th>
                {currentCurriculum.cycle !== 'primary' && (
                  <th className="p-3.5 w-28">التقويم (20)</th>
                )}
                <th className="p-3.5 w-28">الفرض 1 (20)</th>
                {currentCurriculum.cycle !== 'primary' && (
                  <th className="p-3.5 w-28">الفرض 2 (اختياري)</th>
                )}
                <th className="p-3.5 w-28">الاختبار (20)</th>
                <th className="p-3.5 w-24">معدل المادة</th>
                <th className="p-3.5 w-24">النقاط الموزونة</th>
                <th className="p-3.5 w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {subjectsState.map((sub) => {
                const subAvg = CalculationService.calculateSubjectAverage({
                  hasAssessment: sub.hasAssessment,
                  hasTest2: sub.hasTest2,
                  assessment: sub.defaultAssessment,
                  test1: sub.defaultTest1,
                  test2: sub.defaultTest2,
                  exam: sub.defaultExam
                });
                const weightedPoints = subAvg !== undefined ? Math.round(subAvg * sub.coef * 100) / 100 : '-';

                return (
                  <tr key={sub.id} className="hover:bg-slate-50/70">
                    <td className="p-3 font-bold text-slate-800">
                      <input
                        type="text"
                        value={sub.name}
                        onChange={(e) => updateSubjectField(sub.id, 'name', e.target.value)}
                        className="bg-transparent border-none font-bold text-slate-800 focus:outline-none focus:bg-white focus:ring-1 focus:ring-emerald-400 p-1 rounded"
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={sub.coef}
                        onChange={(e) => updateSubjectField(sub.id, 'coef', parseFloat(e.target.value) || 1)}
                        className="w-14 p-1 text-center font-bold border border-slate-200 rounded-lg bg-white"
                        title="معامل المادة"
                      />
                    </td>

                    {/* التقويم */}
                    {currentCurriculum.cycle !== 'primary' && (
                      <td className="p-3">
                        <input
                          type="number"
                          min="0"
                          max="20"
                          step="0.25"
                          value={sub.defaultAssessment ?? ''}
                          onChange={(e) => updateSubjectField(sub.id, 'defaultAssessment', e.target.value ? parseFloat(e.target.value) : undefined)}
                          className="w-16 p-1 text-center border border-slate-200 rounded-lg bg-white"
                          placeholder="—"
                        />
                      </td>
                    )}

                    {/* الفرض 1 */}
                    <td className="p-3">
                      <input
                        type="number"
                        min="0"
                        max="20"
                        step="0.25"
                        value={sub.defaultTest1 ?? ''}
                        onChange={(e) => updateSubjectField(sub.id, 'defaultTest1', e.target.value ? parseFloat(e.target.value) : undefined)}
                        className="w-16 p-1 text-center border border-slate-200 rounded-lg bg-white"
                        placeholder="—"
                      />
                    </td>

                    {/* الفرض 2 */}
                    {currentCurriculum.cycle !== 'primary' && (
                      <td className="p-3">
                        <input
                          type="number"
                          min="0"
                          max="20"
                          step="0.25"
                          value={sub.defaultTest2 ?? ''}
                          onChange={(e) => {
                            const val = e.target.value ? parseFloat(e.target.value) : undefined;
                            updateSubjectField(sub.id, 'hasTest2', val !== undefined);
                            updateSubjectField(sub.id, 'defaultTest2', val);
                          }}
                          className="w-16 p-1 text-center border border-slate-200 rounded-lg bg-white"
                          placeholder="—"
                        />
                      </td>
                    )}

                    {/* الاختبار الفصلي */}
                    <td className="p-3">
                      <input
                        type="number"
                        min="0"
                        max="20"
                        step="0.25"
                        value={sub.defaultExam ?? ''}
                        onChange={(e) => updateSubjectField(sub.id, 'defaultExam', e.target.value ? parseFloat(e.target.value) : undefined)}
                        className="w-16 p-1 text-center font-bold border border-slate-300 rounded-lg bg-white text-emerald-800"
                        placeholder="—"
                      />
                    </td>

                    {/* معدل المادة */}
                    <td className="p-3 font-bold">
                      {subAvg !== undefined ? (
                        <span className={`px-2 py-0.5 rounded ${subAvg >= 10 ? 'text-emerald-700 bg-emerald-50' : 'text-amber-800 bg-amber-50'}`}>
                          {subAvg}
                        </span>
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>

                    {/* النقاط الموزونة */}
                    <td className="p-3 font-mono text-slate-700">
                      {weightedPoints}
                    </td>

                    {/* حذف */}
                    <td className="p-3">
                      {subjectsState.length > 2 && (
                        <button
                          onClick={() => removeSubject(sub.id)}
                          className="text-slate-400 hover:text-red-500 p-1"
                          title="حذف هذه المادة"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* شرح الحساب أسفل الجدول */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-600">
          <Info className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>طريقة الحساب: {calculationResults.explanation}</span>
        </div>
      </div>

    </div>
  );
};
