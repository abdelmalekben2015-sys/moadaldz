/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Calculator, Shield, ShieldCheck, Mail, BookOpen, 
  Sparkles, CheckCircle2, Award, Heart
} from 'lucide-react';
import { ARTICLES_DB } from '../data/articlesData';

interface FooterProps {
  navigate: (path: string) => void;
  openRulesModal: () => void;
  openAdminPreviewModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  navigate, 
  openRulesModal,
  openAdminPreviewModal 
}) => {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-20 border-t border-slate-800 text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          
          {/* العمود 1: الهوية والرسالة */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold">
                <Calculator className="w-4 h-4" />
              </div>
              <span className="text-white font-black text-lg tracking-tight" style={{ color: '#191414' }}>معدل DZ</span>
              <span className="text-[10px] bg-slate-800 text-emerald-400 font-semibold px-2 py-0.5 rounded border border-slate-700">
                الموسم 2026/2027
              </span>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              «معدل DZ — احسب معدلك، اعرف فرصتك، واستعد للنجاح».
              المنصة الجزائرية المستقلة الأولى المتخصصة في حساب المعدلات الفصلية والسنوية ومعدلات الاستدراك بجميع الأطوار وفق المعاملات الرسمية المعتمدة.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
              <button 
                onClick={openRulesModal}
                className="inline-flex items-center gap-1 bg-slate-800 hover:bg-slate-750 text-emerald-400 px-2.5 py-1 rounded border border-slate-700 font-medium"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>سجل القواعد والمناشير الوزارية</span>
              </button>
              
              <button 
                onClick={openAdminPreviewModal}
                className="inline-flex items-center gap-1 bg-slate-800 hover:bg-slate-750 text-slate-300 px-2.5 py-1 rounded border border-slate-700 font-medium"
              >
                <span>إدارة القواعد (المشرف)</span>
              </button>
            </div>
          </div>

          {/* العمود 2: الحاسبات المدرسية */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3" style={{ color: '#250e0e' }}>الحاسبات السريعة</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigate('/rattrapage')} className="hover:text-emerald-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-emerald-400" />
                  <span>حاسبة الاستدراك 2026/2027</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/semestre')} className="hover:text-emerald-400">
                  حساب المعدل الفصلي بالمعاملات
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/target-grade')} className="hover:text-emerald-400">
                  ما العلامة التي أحتاجها للنجاح؟
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/university')} className="hover:text-emerald-400">
                  حاسبة المعدل الجامعي LMD
                </button>
              </li>
            </ul>
          </div>

          {/* العمود 3: مقالات ودليل المعدلات */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3" style={{ color: '#e31818' }}>دليل وشروحات رسمية</h4>
            <ul className="space-y-2 text-xs">
              {ARTICLES_DB.slice(0, 4).map((art) => (
                <li key={art.slug}>
                  <button 
                    onClick={() => navigate(`/guide/${art.slug}`)} 
                    className="hover:text-emerald-400 line-clamp-1 text-slate-400 hover:underline"
                  >
                    {art.title}
                  </button>
                </li>
              ))}
              <li>
                <button onClick={() => navigate('/guide')} className="text-emerald-400 font-bold hover:underline">
                  جميع الشروحات الموثقة ←
                </button>
              </li>
            </ul>
          </div>

          {/* العمود 4: السياسات والشروط */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3" style={{ color: '#e61414' }}>السياسات والمعلومات</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => navigate('/about')} className="hover:text-emerald-400">من نحن</button></li>
              <li><button onClick={() => navigate('/contact')} className="hover:text-emerald-400">اتصل بنا</button></li>
              <li><button onClick={() => navigate('/privacy')} className="hover:text-emerald-400">سياسة الخصوصية</button></li>
              <li><button onClick={() => navigate('/terms')} className="hover:text-emerald-400">شروط الاستخدام</button></li>
              <li><button onClick={() => navigate('/disclaimer')} className="hover:text-emerald-400">إخلاء المسؤولية المنهجي</button></li>
            </ul>
          </div>

        </div>

        {/* الشريط السفلي وحقوق الملكية والتنبيه المنهجي */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} معدل DZ — جميع الحقوق محفوظة. تطبيق مستقل لخدمة تلاميذ وطلبة الجزائر.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" /> محرك حسابي حتمي بدون تقديرات عشوائية
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
