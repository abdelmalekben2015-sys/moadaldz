/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * نافذة سجل ومصداقية القواعد الرسمية المعتمدة (Transparency & Audit Registry)
 */

import React from 'react';
import { ShieldCheck, CheckCircle2, AlertTriangle, X, FileText, Calendar, Building } from 'lucide-react';
import { OFFICIAL_RULES_REGISTRY } from '../data/curriculumData';

interface RuleRegistryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RuleRegistryModal: React.FC<RuleRegistryModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const rulesList = Object.values(OFFICIAL_RULES_REGISTRY);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* الترويسة */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-emerald-950 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm">سجل القواعد والمناشير الوزارية المعتمدة</h3>
              <p className="text-[11px] text-emerald-300">
                الموسم الدراسي 2026/2027 — شفافية تامة وتوثيق للمصادر الرسمية
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* جسم السجل */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs text-emerald-900 leading-relaxed">
            <strong>ميثاق المصداقية لمنصة «معدل DZ»:</strong> لا يتم اعتماد أي قاعدة حسابية كـ «مؤكدة رسمياً» ما لم تستند إلى منشور وزاري أو نص تشريعي صادر عن وزارة التربية الوطنية أو وزارة التعليم العالي الجزائرية.
          </div>

          <div className="space-y-3">
            {rulesList.map((rule) => (
              <div 
                key={rule.id} 
                className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-2 hover:bg-white transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900">{rule.title}</span>
                    <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-medium">
                      {rule.level}
                    </span>
                  </div>

                  <div>
                    {rule.status === 'verified' ? (
                      <span className="text-[11px] bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> مؤكدة رسمياً
                      </span>
                    ) : (
                      <span className="text-[11px] bg-amber-100 text-amber-800 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" /> تحتاج لمراجعة
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-2.5 bg-white rounded-xl border border-slate-200 font-mono text-xs text-slate-800">
                  {rule.formulaDescription}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-700 pt-1 font-medium">
                  <span className="flex items-center gap-1">
                    <Building className="w-3.5 h-3.5 text-slate-500" />
                    <strong className="text-slate-900">المصدر:</strong> {rule.officialSource}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <strong className="text-slate-900">آخر تدقيق:</strong> {rule.lastAuditedDate}
                  </span>
                </div>

                {rule.notes && (
                  <p className="text-[11px] text-slate-500 bg-slate-100/70 p-2 rounded-lg">
                    {rule.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* الشريط السفلي */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800"
          >
            إغلاق
          </button>
        </div>

      </div>
    </div>
  );
};
