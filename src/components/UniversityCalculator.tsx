/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * حاسبة المعدل الجامعي ونظام الأرصدة LMD في الجزائر
 */

import React, { useState, useMemo } from 'react';
import { 
  Award, Plus, Trash2, RotateCcw, Save, Printer, 
  Copy, ShieldCheck, CheckCircle2, AlertTriangle, BookOpen, Info
} from 'lucide-react';
import { UNIVERSITY_CURRICULA } from '../data/curriculumData';
import { CalculationService } from '../services/calculationService';
import { UniversityModule, SavedResult } from '../types';

interface UniversityCalculatorProps {
  onSaveResult: (result: SavedResult) => void;
}

export const UniversityCalculator: React.FC<UniversityCalculatorProps> = ({ onSaveResult }) => {
  const [selectedCurriculumId, setSelectedCurriculumId] = useState<string>('univ_l1_mi');
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);
  const [savedNotification, setSavedNotification] = useState<boolean>(false);

  const initialModules = useMemo(() => {
    const cur = UNIVERSITY_CURRICULA.find(c => c.id === selectedCurriculumId);
    return cur ? JSON.parse(JSON.stringify(cur.modules)) : UNIVERSITY_CURRICULA[0].modules;
  }, [selectedCurriculumId]);

  const [modules, setModules] = useState<UniversityModule[]>(initialModules);

  // تحديث المقاييس عند تبديل التخصص
  const handleCurriculumChange = (id: string) => {
    setSelectedCurriculumId(id);
    const cur = UNIVERSITY_CURRICULA.find(c => c.id === id);
    if (cur) {
      setModules(JSON.parse(JSON.stringify(cur.modules)));
    }
  };

  const updateModuleField = (id: string, field: keyof UniversityModule, val: any) => {
    setModules(prev => prev.map(m => m.id === id ? { ...m, [field]: val } : m));
  };

  const addModule = () => {
    const newMod: UniversityModule = {
      id: 'm_' + Date.now(),
      name: 'مقياس اختياري جديد',
      coef: 2,
      credits: 4,
      td: 12,
      exam: 10,
      tdWeight: 0.40,
      examWeight: 0.60
    };
    setModules(prev => [...prev, newMod]);
  };

  const removeModule = (id: string) => {
    setModules(prev => prev.filter(m => m.id !== id));
  };

  // الحساب الأكاديمي الدقيق عبر CalculationService
  const results = useMemo(() => {
    return CalculationService.calculateUniversitySemester(modules);
  }, [modules]);

  // حفظ النتيجة
  const handleSave = () => {
    const cur = UNIVERSITY_CURRICULA.find(c => c.id === selectedCurriculumId);
    const item: SavedResult = {
      id: 'univ_' + Date.now(),
      title: `${cur?.branch || 'الجامعة LMD'} — معدل السداسي`,
      date: new Date().toLocaleDateString('ar-DZ', { year: 'numeric', month: 'short', day: 'numeric' }),
      cycle: 'university',
      levelName: cur?.branch || 'نظام LMD الجامعي',
      average: results.semesterAverage,
      totalWeightedPoints: results.totalWeightedPoints,
      totalCoef: results.totalCoef,
      isPassed: results.isSemesterPassed,
      type: 'university',
      subjectsSnapshot: results.moduleResults.map(m => ({
        name: m.name,
        coef: modules.find(x => x.id === m.id)?.coef || 1,
        mark: m.average
      }))
    };

    onSaveResult(item);
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 2500);
  };

  const handleCopy = () => {
    const cur = UNIVERSITY_CURRICULA.find(c => c.id === selectedCurriculumId);
    const text = `🎓 نتيجتي الجامعية في نظام LMD — عبر منصة «معدل DZ»:\n` +
      `التخصص: ${cur?.branch || 'LMD'}\n` +
      `معدل السداسي: ${results.semesterAverage} / 20\n` +
      `الأرصدة المكتسبة: ${results.acquiredCredits} من ${results.totalCredits} رصيداً\n` +
      `الوضعية: ${results.isSemesterPassed ? 'سداسي مكتسب بالتعويض التلقائي 🎉' : 'استدراك مطلوب للمقاييس غير المستوفاة'}\n` +
      `رابط الحاسبة: https://moadel-dz.com/university`;

    navigator.clipboard.writeText(text);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  return (
    <div className="space-y-8">
      
      {/* الترويسة الأكاديمية بتدرج أخضر زمردي متناسق (Emerald-900 إلى Emerald-600) */}
      <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-600 text-white p-7 md:p-9 rounded-3xl shadow-xl space-y-4 relative overflow-hidden border border-emerald-700/40">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-amber-400 text-slate-950 font-black px-3 py-1 rounded-full text-xs flex items-center gap-1.5 shadow-xs">
              <Award className="w-3.5 h-3.5 text-slate-950" />
              نظام التعليم العالي الجزائري LMD (القرار 712)
            </span>
          </div>

          <h1 className="text-2xl md:text-4xl font-black tracking-tight mb-2">
            حاسبة المعدل الجامعي ونظام الأرصدة LMD
          </h1>
          <p className="text-emerald-100/90 text-xs md:text-sm leading-relaxed max-w-2xl">
            احسب معدل السداسي، معدل المقاييس، واكتساب الأرصدة (30 رصيداً) مع احتساب قاعدة التعويض السداسي التلقائي عند بلوغ معدل 10/20، ومحاكاة امتحان الاستدراك الجامعي.
          </p>

          {/* اختيار التخصص الجامعي */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3">
            <label className="text-xs font-bold text-emerald-200 shrink-0">اختر الجذع المشترك أو الكلية:</label>
            <select
              value={selectedCurriculumId}
              onChange={(e) => handleCurriculumChange(e.target.value)}
              className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold focus:outline-none backdrop-blur-xs"
            >
              {UNIVERSITY_CURRICULA.map((c) => (
                <option key={c.id} value={c.id} className="bg-slate-900 text-white">
                  {c.branch} ({c.faculty})
                </option>
              ))}
            </select>

            <button
              onClick={addModule}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto transition-all shadow-xs shadow-amber-200"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>إضافة مقياس جديد</span>
            </button>
          </div>
        </div>
      </div>

      {/* لوحة نتائج السداسي الجامعي */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 block mb-1">المعدل العام للسداسي</span>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-slate-800">{results.semesterAverage}</span>
            <span className="text-xs text-slate-400">/ 20</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-2 block">
            مجموع النقاط: {results.totalWeightedPoints} | مجموع المعاملات: {results.totalCoef}
          </span>
        </div>

        <div className={`p-5 rounded-2xl border ${
          results.isSemesterPassed 
            ? 'bg-emerald-50 border-emerald-300 text-emerald-950' 
            : 'bg-amber-50 border-amber-300 text-amber-950'
        }`}>
          <span className="text-xs font-bold block mb-1">الأرصدة المكتسبة (Crédits)</span>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black">{results.acquiredCredits}</span>
            <span className="text-xs opacity-70">من {results.totalCredits} رصيداً</span>
          </div>
          <span className="text-[11px] block mt-2 font-medium">
            {results.compensationApplied 
              ? '✨ اكتساب كامل الأرصدة (30) بمبدأ التعويض السداسي' 
              : results.isSemesterPassed 
              ? 'سداسي ناجح ومستوفى' 
              : 'أرصدة المقاييس المستوفاة فقط (دون التعويض)'}
          </span>
        </div>

        <div className={`p-5 rounded-2xl border flex flex-col justify-between ${
          results.isSemesterPassed ? 'bg-indigo-900 text-white border-indigo-900' : 'bg-slate-800 text-white border-slate-800'
        }`}>
          <div>
            <span className="text-xs opacity-80 block mb-1">الوضعية الأكاديمية</span>
            <span className="text-lg font-black block leading-tight">
              {results.isSemesterPassed ? 'سداسي ناجح ومكتسب بالتعويض 🎉' : 'سداسي غير مستوفى (استدراك)'}
            </span>
          </div>

          <div className="flex items-center gap-2 pt-3 border-t border-white/20">
            <button
              onClick={handleSave}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs font-bold flex items-center gap-1 shadow-xs shadow-amber-200 transition-all active:scale-95"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{savedNotification ? 'تم الحفظ!' : 'حفظ'}</span>
            </button>
            <button
              onClick={handleCopy}
              className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1 border border-white/20 transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedNotification ? 'تم النسخ!' : 'نسخ'}</span>
            </button>
            <button
              onClick={() => window.print()}
              className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1 border border-white/20 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>طباعة</span>
            </button>
          </div>
        </div>

      </div>

      {/* جدول المقاييس الجامعية */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <span className="font-bold text-xs text-slate-700">المقاييس وتوزيع نسب التقييم المستمر والامتحان</span>
          <span className="text-xs text-slate-500">
            صيغة المقياس: (TD × 40%) + (MAX[امتحان، استدراك] × 60%)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3.5">المقياس (Module)</th>
                <th className="p-3.5 w-16">المعامل</th>
                <th className="p-3.5 w-16">الأرصدة</th>
                <th className="p-3.5 w-24">التقييم TD (40%)</th>
                <th className="p-3.5 w-24">الامتحان (60%)</th>
                <th className="p-3.5 w-28">الاستدراك (إن وجد)</th>
                <th className="p-3.5 w-24">معدل المقياس</th>
                <th className="p-3.5 w-24">الحالة</th>
                <th className="p-3.5 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {results.moduleResults.map((m) => {
                const rawModule = modules.find(x => x.id === m.id)!;
                return (
                  <tr key={m.id} className="hover:bg-slate-50/70">
                    <td className="p-3 font-bold text-slate-800">
                      <input
                        type="text"
                        value={rawModule.name}
                        onChange={(e) => updateModuleField(m.id, 'name', e.target.value)}
                        className="bg-transparent border-none font-bold text-slate-800 focus:outline-none focus:bg-white p-1 rounded"
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={rawModule.coef}
                        onChange={(e) => updateModuleField(m.id, 'coef', parseFloat(e.target.value) || 1)}
                        className="w-12 p-1 text-center font-bold border border-slate-200 rounded-lg bg-white"
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="number"
                        min="1"
                        max="15"
                        value={rawModule.credits}
                        onChange={(e) => updateModuleField(m.id, 'credits', parseFloat(e.target.value) || 1)}
                        className="w-12 p-1 text-center font-bold border border-slate-200 rounded-lg bg-white text-indigo-700"
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="number"
                        min="0"
                        max="20"
                        step="0.25"
                        value={rawModule.td ?? ''}
                        onChange={(e) => updateModuleField(m.id, 'td', e.target.value ? parseFloat(e.target.value) : undefined)}
                        className="w-16 p-1 text-center border border-slate-200 rounded-lg bg-white"
                        placeholder="—"
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="number"
                        min="0"
                        max="20"
                        step="0.25"
                        value={rawModule.exam ?? ''}
                        onChange={(e) => updateModuleField(m.id, 'exam', e.target.value ? parseFloat(e.target.value) : undefined)}
                        className="w-16 p-1 text-center font-bold border border-slate-300 rounded-lg bg-white"
                        placeholder="—"
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="number"
                        min="0"
                        max="20"
                        step="0.25"
                        value={rawModule.rattrapage ?? ''}
                        onChange={(e) => updateModuleField(m.id, 'rattrapage', e.target.value ? parseFloat(e.target.value) : undefined)}
                        className="w-16 p-1 text-center border border-indigo-200 rounded-lg bg-indigo-50/50 text-indigo-900 font-bold"
                        placeholder="—"
                      />
                    </td>
                    <td className="p-3 font-bold">
                      <span className={`px-2 py-0.5 rounded ${m.average >= 10 ? 'text-emerald-700 bg-emerald-50' : 'text-amber-800 bg-amber-50'}`}>
                        {m.average}
                      </span>
                    </td>
                    <td className="p-3">
                      {m.isPassed ? (
                        <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
                          مستوفى ({m.credits} رصيد)
                        </span>
                      ) : (
                        <span className="text-[10px] text-amber-700 font-bold bg-amber-100 px-2 py-0.5 rounded-full">
                          غير مستوفى
                        </span>
                      )}
                    </td>
                    <td className="p-3">
                      {modules.length > 2 && (
                        <button
                          onClick={() => removeModule(m.id)}
                          className="text-slate-400 hover:text-red-500 p-1"
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
      </div>

    </div>
  );
};
