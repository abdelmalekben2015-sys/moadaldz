/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * الصفحة الرئيسية لمنصة «معدل DZ — حاسبة المعدلات والاستدراك في الجزائر»
 * تصميم متطابق 100% مع الهوية البصرية المعتمدة 2026/2027
 */

import React, { useState } from 'react';
import { 
  Sparkles, Calculator, TrendingUp, Award, ChevronDown, ArrowLeft, ShieldCheck, BookOpen
} from 'lucide-react';

interface HomeViewProps {
  navigate: (path: string) => void;
  openRulesModal: () => void;
  openDiagnosticsModal: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ 
  navigate, 
  openRulesModal,
  openDiagnosticsModal 
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const faqItems = [
    {
      question: 'كيف يُحسب معدل الاستدراك في التعليم المتوسط والثانوي؟',
      answer: 'تُحسب علامة الاستدراك بتعويض المعدل السنوي للمادة بعلامة امتحان الاستدراك إذا كانت أفضل منه، وفق قاعدة الأفضلية للتلميذ: MAX(العلامة الأصلية، علامة الاستدراك). فلا ينقص المعدل السنوي للتلميذ تحت أي ظرف، وتُعاد ضرب العلامات المحسنة في معاملاتها لحساب المعدل السنوي العام الجديد.'
    },
    {
      question: 'ما هي الطريقة الرسمية لحساب معدل المادة في المتوسط؟',
      answer: 'وفق المنشور الوزاري الساري، يُحسب معدل المادة كالتالي: (علامة التقويم المستمر + علامة الفرض المحروس + علامة الاختبار الفصلي × 2) ÷ 4. وفي حال وجود فرضين لمادة معينة، يُحسب: (التقويم + الفرض 1 + الفرض 2 + الاختبار × 2) ÷ 5.'
    },
    {
      question: 'هل تطبيق معدل DZ مجاني ولا يحتاج إلى اشتراك؟',
      answer: 'نعم، تطبيق معدل DZ مجاني 100% دون أي اشتراك أو تسجيل حساب. جميع العمليات الحسابية تتم محلياً وبشكل حتمي دون إرسال بياناتك أو درجاتك لأي خوادم خارجية.'
    },
    {
      question: 'كيف يعمل نظام التعويض في الجامعة LMD؟',
      answer: 'في نظام LMD الجامعي بالجزائر، يُحسب معدل السداسي بضرب كل مقياس في معامله وقسمته على مجموع المعاملات. يتحقق النجاح باكتساب 30 رصيداً إذا كان معدل السداسي ≥ 10/20 عن طريق التعويض بين الوحدات التعليمية، كما يمكن تعويض السداسيين خلال نفس السنة الجامعية (L1, L2, L3).'
    }
  ];

  return (
    <div className="space-y-6 md:space-y-8">
      
      {/* 1. القسم الرئيسي Hero Section - متطابق تماماً مع الصورة */}
      <section className="relative text-center pt-8 pb-7 px-5 sm:px-8 rounded-3xl bg-gradient-to-b from-[#065f46] via-[#044e3b] to-[#022c22] text-white shadow-xl overflow-hidden border border-emerald-700/50">
        
        {/* شارة أعلى القسم الرئيسي */}
        <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-400/30 text-emerald-200 text-xs font-bold shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span style={{ color: '#e32a2a' }}>الحاسبة الذكية الأولى لموسم 2026/2027</span>
        </div>

        {/* العنوان الرئيسي */}
        <h1 
          className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight md:leading-snug mb-3"
          style={{ color: '#4520da' }}
        >
          احسب معدلك، اعرف فرصتك،<br />
          واستعد للنجاح بكل ثقة
        </h1>

        {/* الفقرة الوصفية */}
        <p 
          className="text-emerald-100/90 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto mb-7"
          style={{ color: '#262121' }}
        >
          معدل DZ هي المنصة الرقمية الأكثر دقة لمساعدة التلاميذ في الأطوار المتوسطة، الثانوية والجامعية على محاكاة معدلات الفصول، حساب علامات الاستدراك (Rattrapage)، وتحديد النقاط الضرورية للنجاح.
        </p>

        {/* 4 بطاقات خدمات مدمجة في أسفل قسم Hero تماماً كما في الصورة المرفقة */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3.5 max-w-4xl mx-auto">
          
          {/* 1. حاسبة الاستدراك - البطاقة الذهبية النشطة والبارزة */}
          <button
            onClick={() => navigate('/rattrapage')}
            className="p-3.5 sm:p-4 rounded-2xl bg-[#f59e0b] hover:bg-[#d97706] text-slate-950 flex flex-col items-center justify-center text-center shadow-lg transition-transform hover:scale-102 active:scale-98 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-slate-950 mb-1.5" />
            <span className="font-bold text-xs sm:text-sm">حاسبة الاستدراك</span>
            <span className="text-[10px] sm:text-[11px] font-semibold text-slate-900/80">الأكثر طلباً</span>
          </button>

          {/* 2. المعدل الفصلي */}
          <button
            onClick={() => navigate('/semestre')}
            className="p-3.5 sm:p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-white flex flex-col items-center justify-center text-center backdrop-blur-xs transition-transform hover:scale-102 active:scale-98 cursor-pointer"
            style={{ color: '#d91e1e' }}
          >
            <Calculator className="w-5 h-5 text-emerald-300 mb-1.5" />
            <span className="font-bold text-xs sm:text-sm">المعدل الفصلي</span>
            <span className="text-[10px] sm:text-[11px] font-medium text-emerald-200">متوسط وثانوي</span>
          </button>

          {/* 3. كم أحتاج للنجاح؟ */}
          <button
            onClick={() => navigate('/target-grade')}
            className="p-3.5 sm:p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-white flex flex-col items-center justify-center text-center backdrop-blur-xs transition-transform hover:scale-102 active:scale-98 cursor-pointer"
            style={{ color: '#2e54cf' }}
          >
            <TrendingUp className="w-5 h-5 text-amber-300 mb-1.5" />
            <span className="font-bold text-xs sm:text-sm">كم أحتاج للنجاح؟</span>
            <span className="text-[10px] sm:text-[11px] font-medium text-emerald-200">حاسبة الأهداف</span>
          </button>

          {/* 4. الحاسبة الجامعية */}
          <button
            onClick={() => navigate('/university')}
            className="p-3.5 sm:p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-white flex flex-col items-center justify-center text-center backdrop-blur-xs transition-transform hover:scale-102 active:scale-98 cursor-pointer"
            style={{ color: '#2135d2' }}
          >
            <Award className="w-5 h-5 text-teal-300 mb-1.5" />
            <span className="font-bold text-xs sm:text-sm">الحاسبة الجامعية</span>
            <span className="text-[10px] sm:text-[11px] font-medium text-emerald-200">نظام LMD</span>
          </button>

        </div>
      </section>

      {/* 2. قسم بطاقة الاستدراك المميزة - متطابق مع بطاقة الصورة */}
      <section className="bg-[#fffdf0] border border-[#fde68a] rounded-2xl p-5 sm:p-6 md:p-7 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2 text-right">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#fef3c7] text-[#92400e] text-[10px] font-bold border border-amber-200">
              <Sparkles className="w-3 h-3 text-amber-700" />
              <span>خاص ومميز في معدل DZ</span>
            </div>
            
            <h2 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900">
              أداة «خطتي للنجاح في الاستدراك 2026/2027»
            </h2>
            
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
              هل اقترب موعد الامتحان الاستدراكي؟ لا تترك نتيجتك للصدفة! حدد فوراً المواد التي تحتاج لمضاعفة الجهد فيها، واكتشف العلامة الدقيقة في كل مادة لتحقيق معدل 10.00 والانتقال بنجاح.
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={() => navigate('/rattrapage')}
              className="w-full md:w-auto px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-sm transition-all hover:scale-102 active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
              style={{ color: '#e61919' }}
            >
              <span>←</span>
              <span>ابدأ محاكاة الاستدراك الآن</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. قسم دليل التلميذ الجزائري - متطابق تماماً مع الصورة المرفقة */}
      <section className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-7 md:p-8 shadow-xs space-y-5">
        <div className="space-y-1.5 text-right">
          <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#ecfdf5] text-[#065f46] border border-[#a7f3d0] text-[10px] font-bold">
            دليل التلميذ الجزائري
          </span>
          <h2 className="text-base sm:text-lg md:text-xl font-black text-slate-900">
            كيف يُحتسب المعدل الفصلي والسنوي في المنظومة التربوية الجزائرية؟
          </h2>
          <p className="text-xs text-slate-600 font-medium leading-relaxed max-w-4xl">
            تعتمد وزارة التربية الوطنية الجزائرية نظام المراقبة المستمرة والاختبارات الموقعية لتقييم كفاءة التلميذ. يتكون المعدل الفصلي للمادة من مزيج متوازن بين أداء التلميذ في القسم (التقويم المستمر)، الفروض المحروسة، والاختبارات الفصلية التي تأخذ النصيب الأكبر (ضعف وزن الفرض).
          </p>
        </div>

        {/* 3 بطاقات مرقمة 1 و 2 و 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1">
          
          {/* بطاقة 1: التقويم والفروض */}
          <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-4 space-y-2 text-right">
            <span className="w-5 h-5 rounded bg-emerald-100 text-emerald-800 text-xs font-black flex items-center justify-center">
              1
            </span>
            <h3 className="font-bold text-xs sm:text-sm text-slate-900">التقويم والفروض</h3>
            <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
              علامة التقويم تشمل النشاط الصفي، الواجبات والسلوك، مع فرض كتابي رسمي واحد لمعظم المواد، أو فرضين لبعض المواد الأساسية في الثانوي.
            </p>
          </div>

          {/* بطاقة 2: الاختبار الفصلي */}
          <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-4 space-y-2 text-right">
            <span className="w-5 h-5 rounded bg-blue-100 text-blue-800 text-xs font-black flex items-center justify-center">
              2
            </span>
            <h3 className="font-bold text-xs sm:text-sm text-slate-900">الاختبار الفصلي</h3>
            <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
              يُجرى في نهاية كل فصل وتُضرب علامته في 2، ليُحسب معدل المادة بقسمة المجموع على 4 (أو 5 في حال وجود فرضين).
            </p>
          </div>

          {/* بطاقة 3: المعاملات المعتمدة */}
          <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-4 space-y-2 text-right">
            <span className="w-5 h-5 rounded bg-amber-100 text-amber-800 text-xs font-black flex items-center justify-center">
              3
            </span>
            <h3 className="font-bold text-xs sm:text-sm text-slate-900">المعاملات المعتمدة</h3>
            <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
              يُضرب معدل كل مادة في معاملها الرسمي الخاص بشعبتك أو مستواك، ثم تُقسم النتيجة على مجموع المعاملات لإخراج المعدل العام.
            </p>
          </div>

        </div>
      </section>

      {/* 4. قسم الأسئلة الشائعة - متطابق مع تصميم Accordion في الصورة */}
      <section className="bg-white/80 border border-slate-200/70 rounded-2xl p-5 sm:p-7 md:p-8 shadow-xs space-y-4">
        <div className="text-center space-y-1">
          <h2 className="text-lg sm:text-xl font-black text-slate-900">
            الأسئلة الشائعة حول المعدلات والاستدراك
          </h2>
          <p className="text-xs text-slate-600 font-medium">
            إجابات واضحة وموثوقة استناداً إلى النصوص التنظيمية السارية
          </p>
        </div>

        <div className="space-y-2.5 max-w-4xl mx-auto pt-2">
          {faqItems.map((item, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div 
                key={idx}
                className="bg-white border border-slate-200/80 rounded-xl overflow-hidden transition-all shadow-2xs"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-right flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 hover:text-emerald-700 transition-colors cursor-pointer"
                >
                  <span className="flex-1">{item.question}</span>
                  <div className={`w-5 h-5 rounded flex items-center justify-center transition-transform text-slate-400 ${isOpen ? 'rotate-180 text-emerald-600' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-slate-700 font-medium leading-relaxed border-t border-slate-100 bg-slate-50/40">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* روابط الشفافية وفحص المحرك في أسفل الصفحة */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-2 pb-4 text-xs text-slate-600 font-semibold">
        <button
          onClick={openRulesModal}
          className="hover:text-emerald-700 flex items-center gap-1 font-semibold"
        >
          <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
          <span>سجل القواعد والمناشير الرسمية</span>
        </button>
        <span>•</span>
        <button
          onClick={openDiagnosticsModal}
          className="hover:text-emerald-700 flex items-center gap-1 font-semibold"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>تشغيل فاحص المحرك الحسابي</span>
        </button>
      </div>

    </div>
  );
};
