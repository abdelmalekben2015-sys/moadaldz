/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * نافذة فحص واختبار دقة المحرك الحسابي الآلية (Automated Diagnostic Test Suite)
 */

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, CheckCircle2, AlertTriangle, RefreshCw, 
  X, Check, Terminal, ExternalLink
} from 'lucide-react';
import { CalculationService } from '../services/calculationService';
import { TestExecutionResult } from '../types';

interface EngineDiagnosticsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EngineDiagnosticsModal: React.FC<EngineDiagnosticsModalProps> = ({
  isOpen,
  onClose
}) => {
  const [testResults, setTestResults] = useState<TestExecutionResult[]>([]);
  const [lastRunTime, setLastRunTime] = useState<string>('');

  const runTests = () => {
    const results = CalculationService.runEngineDiagnosticTests();
    setTestResults(results);
    setLastRunTime(new Date().toLocaleTimeString('ar-DZ'));
  };

  useEffect(() => {
    if (isOpen) {
      runTests();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const passedCount = testResults.filter(t => t.passed).length;
  const totalCount = testResults.length;
  const isAllPassed = passedCount === totalCount && totalCount > 0;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* الترويسة */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm">فاحص المحرك الحسابي الآلي المدمج</h3>
              <p className="text-[11px] text-slate-400">
                اختبارات برمجية حتمية للتأكد من دقة وصحة كافة القواعد الرياضية 2026/2027
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={runTests}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 flex items-center gap-1 text-xs"
              title="إعادة تشغيل الاختبارات الحسابية"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>إعادة الفحص</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ملخص النتائج */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${isAllPassed ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
            <span className="font-bold text-slate-800">
              حالة المحرك: {isAllPassed ? 'جميع الاختبارات الحسابية ناجحة ومطابقة 100%' : 'توجد حالات بحاجة للمراجعة'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-slate-500 text-[11px]">آخر تشغيل: {lastRunTime}</span>
            <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
              {passedCount} / {totalCount} اختبار ناجح
            </span>
          </div>
        </div>

        {/* تفاصيل الاختبارات */}
        <div className="p-5 overflow-y-auto space-y-3 flex-1 font-mono text-xs">
          {testResults.map((t) => (
            <div 
              key={t.testId} 
              className={`p-3.5 rounded-xl border flex flex-col gap-1.5 transition-all ${
                t.passed 
                  ? 'bg-emerald-50/40 border-emerald-200 text-slate-800' 
                  : 'bg-red-50 border-red-300 text-red-900'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[11px] bg-slate-200 text-slate-800 px-1.5 py-0.5 rounded">
                    {t.testId}
                  </span>
                  <span className="font-sans font-bold text-xs">{t.name}</span>
                </div>

                <div className="flex items-center gap-1.5 font-sans">
                  <span className="text-[10px] bg-white border border-slate-200 px-2 py-0.5 rounded text-slate-500">
                    {t.category}
                  </span>
                  {t.passed ? (
                    <span className="text-emerald-700 font-bold flex items-center gap-0.5 text-xs bg-emerald-100 px-2 py-0.5 rounded">
                      <Check className="w-3.5 h-3.5" /> ناجح
                    </span>
                  ) : (
                    <span className="text-red-700 font-bold flex items-center gap-0.5 text-xs bg-red-100 px-2 py-0.5 rounded">
                      فاشل
                    </span>
                  )}
                </div>
              </div>

              <div className="text-[11px] text-slate-600 font-sans flex items-center justify-between">
                <span>{t.details}</span>
                <span className="font-mono text-slate-400">
                  المتوقع: {String(t.expected)} | الفعلي: {String(t.actual)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* الشريط السفلي */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs">
          <p className="text-[11px] text-slate-500">
            * الحسابات الرياضية تُجرى في بيئة برمجية حتمية خالية من أخطاء الفاصلة العائمة الشائعة.
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800"
          >
            إغلاق
          </button>
        </div>

      </div>
    </div>
  );
};
