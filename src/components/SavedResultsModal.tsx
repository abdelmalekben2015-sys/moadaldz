/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * نافذة عرض وسجل النتائج المحفوظة محلياً (LocalStorage)
 */

import React from 'react';
import { 
  History, Trash2, Printer, Copy, CheckCircle2, 
  X, Calendar, GraduationCap, Award
} from 'lucide-react';
import { SavedResult } from '../types';

interface SavedResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedResults: SavedResult[];
  onDeleteResult: (id: string) => void;
  onClearAll: () => void;
}

export const SavedResultsModal: React.FC<SavedResultsModalProps> = ({
  isOpen,
  onClose,
  savedResults,
  onDeleteResult,
  onClearAll
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* الترويسة */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <History className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-800">سجل النتائج المحفوظة محلياً</h3>
              <p className="text-[11px] text-slate-400">مخزنة في متصفحك دون إرسال أي بيانات إلى خوادم خارجية</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* جسم السجل */}
        <div className="p-5 overflow-y-auto space-y-3 flex-1">
          {savedResults.length === 0 ? (
            <div className="text-center py-12 text-slate-400 space-y-2">
              <History className="w-10 h-10 mx-auto text-slate-300 stroke-1" />
              <p className="text-xs">لا توجد نتائج محفوظة بعد.</p>
              <p className="text-[11px] text-slate-400">
                اضغط على زر «حفظ النتيجة» في أي حاسبة لحفظ كشف نقاطك هنا.
              </p>
            </div>
          ) : (
            savedResults.map((res) => (
              <div 
                key={res.id} 
                className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-emerald-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 printable-card"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-slate-900">{res.title}</span>
                    <span className="text-[10px] text-slate-500 font-medium flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {res.date}
                    </span>
                  </div>
                  <span className="text-xs text-slate-700 font-medium">
                    المجموع: {res.totalWeightedPoints} | المعاملات: {res.totalCoef}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-left">
                    <span className="text-2xl font-black text-emerald-700">{res.average}</span>
                    <span className="text-xs text-slate-500 mr-1 font-bold">/ 20</span>
                  </div>

                  <div className="flex items-center gap-1 border-r border-slate-200 pr-2">
                    <button
                      onClick={() => onDeleteResult(res.id)}
                      className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50"
                      title="حذف هذه النتيجة"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* الشريط السفلي */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs">
          {savedResults.length > 0 && (
            <button
              onClick={onClearAll}
              className="text-red-600 hover:text-red-700 font-bold flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>مسح كافة النتائج ({savedResults.length})</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 text-white font-bold hover:bg-slate-700 mr-auto"
          >
            إغلاق
          </button>
        </div>

      </div>
    </div>
  );
};
