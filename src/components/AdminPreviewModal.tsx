/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * لوحة إدارة القواعد والمناهج المستقبلية (Admin Rules Console)
 */

import React, { useState } from 'react';
import { 
  Building, ShieldCheck, Plus, CheckCircle2, AlertTriangle, 
  X, Save, RotateCcw, Lock
} from 'lucide-react';
import { OFFICIAL_RULES_REGISTRY } from '../data/curriculumData';
import { ValidationRuleItem } from '../types';

interface AdminPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPreviewModal: React.FC<AdminPreviewModalProps> = ({ isOpen, onClose }) => {
  const [rules, setRules] = useState<ValidationRuleItem[]>(Object.values(OFFICIAL_RULES_REGISTRY));
  const [showAddForm, setShowAddForm] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // حقول إضافة قاعدة جديدة
  const [newRuleTitle, setNewRuleTitle] = useState('');
  const [newRuleLevel, setNewRuleLevel] = useState('');
  const [newRuleFormula, setNewRuleFormula] = useState('');
  const [newRuleSource, setNewRuleSource] = useState('');
  const [newRuleStatus, setNewRuleStatus] = useState<'verified' | 'review_needed'>('review_needed');

  if (!isOpen) return null;

  const handleAddNewRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRuleTitle || !newRuleFormula || !newRuleSource) return;

    const item: ValidationRuleItem = {
      id: 'custom_rule_' + Date.now(),
      cycle: 'middle',
      title: newRuleTitle,
      level: newRuleLevel || 'قاعدة مخصصة',
      formulaDescription: newRuleFormula,
      status: newRuleStatus,
      officialSource: newRuleSource,
      effectiveYear: '2026/2027',
      lastAuditedDate: new Date().toISOString().split('T')[0]
    };

    setRules(prev => [item, ...prev]);
    setShowAddForm(false);
    setNewRuleTitle('');
    setNewRuleFormula('');
    setNewRuleSource('');
    setSaveStatus('تمت إضافة مسودة القاعدة بنجاح. يلزم تدقيقها قبل النشر العام.');
    setTimeout(() => setSaveStatus(null), 3500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* الترويسة */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm">لوحة إدارة القواعد وتحديثات 2026/2027</h3>
                <span className="text-[10px] bg-indigo-500/30 text-indigo-300 px-2 py-0.5 rounded font-mono">
                  نموذج الإدارة البيداغوجية
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                إدارة المعاملات، الصيغ، المصادر الرسمية وحالات التحقق دون إعادة بناء التطبيق
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* جسم اللوحة */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {saveStatus && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{saveStatus}</span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <h4 className="font-bold text-xs text-slate-800">سجل القواعد الحالية المسجلة في المحرك</h4>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>إضافة منشور أو قاعدة جديدة</span>
            </button>
          </div>

          {/* نموذج الإضافة */}
          {showAddForm && (
            <form onSubmit={handleAddNewRule} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 text-xs">
              <h5 className="font-bold text-slate-900 border-b border-slate-200 pb-2">بيانات القاعدة أو المنشور الوزاري الجديد</h5>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">عنوان القاعدة أو المنشور</label>
                  <input
                    type="text"
                    required
                    value={newRuleTitle}
                    onChange={(e) => setNewRuleTitle(e.target.value)}
                    placeholder="مثلاً: تعديل معامل مادة التاريخ والجغرافيا"
                    className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-900 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-800 mb-1">الطور / المستوى المعني</label>
                  <input
                    type="text"
                    value={newRuleLevel}
                    onChange={(e) => setNewRuleLevel(e.target.value)}
                    placeholder="مثلاً: 3 ثانوي شعبة لغات أجنبية"
                    className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-900 focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">الصيغة الرياضية أو المعادلة الحسابية</label>
                <input
                  type="text"
                  required
                  value={newRuleFormula}
                  onChange={(e) => setNewRuleFormula(e.target.value)}
                  placeholder="مثلاً: معدل المادة = (التقويم + الفرض + الاختبار × 2) ÷ 4"
                  className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-mono font-medium text-slate-900 focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">المصدر الرسمي / رقم المذكرة الوزارية</label>
                  <input
                    type="text"
                    required
                    value={newRuleSource}
                    onChange={(e) => setNewRuleSource(e.target.value)}
                    placeholder="مثلاً: المنشور الوزاري رقم 128 / و.ت.و"
                    className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-900 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-800 mb-1">حالة التحقق</label>
                  <select
                    value={newRuleStatus}
                    onChange={(e) => setNewRuleStatus(e.target.value as any)}
                    className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:border-emerald-500"
                  >
                    <option value="review_needed">تحتاج إلى مراجعة (مسودة)</option>
                    <option value="verified">مؤكدة رسمياً بمستند معتمد</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 text-white font-bold rounded-lg text-xs"
                >
                  حفظ القاعدة في السجل
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-600 font-medium rounded-lg text-xs"
                >
                  إلغاء
                </button>
              </div>
            </form>
          )}

          {/* قائمة القواعد الإدارية */}
          <div className="space-y-2">
            {rules.map((rule) => (
              <div key={rule.id} className="p-3 bg-white border border-slate-200 rounded-xl text-xs flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{rule.title}</span>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                      {rule.level}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-700 font-mono block mt-1 font-medium">
                    {rule.formulaDescription}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    rule.status === 'verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {rule.status === 'verified' ? 'مؤكدة' : 'قيد المراجعة'}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* الشريط السفلي */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs">
          <p className="text-[11px] text-slate-500">
            * مصممة للتكامل مستقبلاً مع لوحة تحكم سحابية (Supabase / Firestore).
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800"
          >
            إغلاق اللوحة
          </button>
        </div>

      </div>
    </div>
  );
};
