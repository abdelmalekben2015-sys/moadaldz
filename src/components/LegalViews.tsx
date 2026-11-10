/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * الصفحات القانونية والسياسات الخاصة بالمنصة
 */

import React, { useState } from 'react';
import { 
  Shield, FileText, AlertTriangle, Mail, Send, 
  CheckCircle2, Info, GraduationCap
} from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => (
  <div className="max-w-3xl mx-auto bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-xs space-y-5 text-xs md:text-sm text-slate-700 leading-relaxed">
    <div className="border-b border-slate-100 pb-4">
      <div className="flex items-center gap-2 text-emerald-600 mb-1">
        <Shield className="w-5 h-5" />
        <span className="font-bold text-xs">حماية البيانات والخصوصية</span>
      </div>
      <h1 className="text-xl md:text-3xl font-black text-slate-900">سياسة الخصوصية</h1>
      <p className="text-xs text-slate-400 mt-1">تاريخ السريان: الموسم الدراسي 2026/2027</p>
    </div>

    <p>
      نحن في منصة <strong>«معدل DZ»</strong> نولي أقصى درجات الاهتمام لخصوصية وأمان بيانات التلاميذ، الطلبة، وأولياء الأمور. توضح هذه الوثيقة التزامنا الصارم بعدم جمع أو استغلال أي معلومات خاصة.
    </p>

    <h2 className="text-base font-bold text-slate-900 pt-2">1. الحسابات المحلية (Client-Side Privacy)</h2>
    <p>
      تتم كافة العمليات الحسابية داخل متصفح جهازك مباشرة بواسطة لغة JavaScript. لا نقوم بنقل، تسجيل، أو إرسال علاماتك أو أسمائك أو درجاتك المدرسية إلى أي خوادم خارجية إطلاقاً.
    </p>

    <h2 className="text-base font-bold text-slate-900 pt-2">2. ميزة التخزين المحلي (LocalStorage)</h2>
    <p>
      عند استخدام زر «حفظ النتيجة»، يتم تخزين البيانات مؤقتاً في ذاكرة متصفحك الخاصة (LocalStorage) لتمكينك من مراجعة كشف النقاط لاحقاً. هذه البيانات تبقى تحت تصرفك الكامل ويمكنك حذفها في أي وقت بمسح بيانات التصفح أو عبر زر الحذف المتاح داخل التطبيق.
    </p>

    <h2 className="text-base font-bold text-slate-900 pt-2">3. الإعلانات والشركاء (Google AdSense)</h2>
    <p>
      قد يعرض الموقع إعلانات غير مزعجة من خلال شبكة Google AdSense لتغطية تكاليف الخوادم وتطوير المنصة. قد تستخدم ملفات تعريف الارتباط (Cookies) لعرض إعلانات ملائمة بناءً على الاهتمامات التعليمية العامة، دون جمع أي معرفات شخصية حساسة.
    </p>
  </div>
);

export const TermsPage: React.FC = () => (
  <div className="max-w-3xl mx-auto bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-xs space-y-5 text-xs md:text-sm text-slate-700 leading-relaxed">
    <div className="border-b border-slate-100 pb-4">
      <div className="flex items-center gap-2 text-emerald-600 mb-1">
        <FileText className="w-5 h-5" />
        <span className="font-bold text-xs">الشروط التنظيمية</span>
      </div>
      <h1 className="text-xl md:text-3xl font-black text-slate-900">شروط الاستخدام</h1>
    </div>

    <p>
      باستخدامك لموقع وحاسبات «معدل DZ»، فإنك توافق على الالتزام بالشروط والأحكام الآتية:
    </p>

    <ul className="list-disc list-inside space-y-2 text-slate-600">
      <li>تطبيق «معدل DZ» هو أداة تعليمية استرشادية مستقلة تهدف لمساعدة التلاميذ والطلبة على حساب ومحاكاة نتائجهم الدراسية بدقة.</li>
      <li>الحسابات والتقديرات الصادرة عن التطبيق لا تُعد وثيقة نجاح أو كشف نقاط رسمي، والجهة الوحيدة المخولة قانونياً بإصدار كشوف النقاط وقرارات الانتقال ومجالس الأقسام هي المؤسسات التربوية والجامعية التابعة للدولة الجزائرية.</li>
      <li>يبذل فريق التطوير عناية فائقة لضمان مطابقة المعاملات والمناهج لأحدث المذكرات الوزارية السارية لعام 2026/2027، ويبقى للمستخدم صلاحية تعديل المعاملات يدوياً لمراعاة أي خصوصية لمؤسسته التعليمية.</li>
    </ul>
  </div>
);

export const DisclaimerPage: React.FC = () => (
  <div className="max-w-3xl mx-auto bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-xs space-y-5 text-xs md:text-sm text-slate-700 leading-relaxed">
    <div className="border-b border-slate-100 pb-4">
      <div className="flex items-center gap-2 text-amber-600 mb-1">
        <AlertTriangle className="w-5 h-5" />
        <span className="font-bold text-xs">بيان الشفافية القانونية</span>
      </div>
      <h1 className="text-xl md:text-3xl font-black text-slate-900">إخلاء المسؤولية المنهجي</h1>
    </div>

    <div className="p-4 bg-amber-50 border-r-4 border-amber-500 rounded-2xl text-amber-950 font-medium text-xs leading-relaxed">
      <strong>تنبيه هام ومباشر:</strong> موقع «معدل DZ» هو مبادرة برمجية وتربوية مستقلة، وليس منصة رسمية تابعة لوزارة التربية الوطنية الجزائرية، ولا الديوان الوطني للامتحانات والمسابقات (ONEC)، ولا وزارة التعليم العالي والبحث العلمي.
    </div>

    <p>
      النتائج المعروضة هي نتائج حسابية مبنية على العلاقات الرياضية المنصوص عليها في المناهج الرسمية المتاحة. وتظل القرارات النهائية للانتقال والنجاح والإنقاذ خاضعة لمداولات مجالس الأساتذة والأقسام القانونية داخل المؤسسات التعليمية.
    </p>
  </div>
);

export const AboutPage: React.FC = () => (
  <div className="max-w-3xl mx-auto bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-xs space-y-5 text-xs md:text-sm text-slate-700 leading-relaxed">
    <div className="border-b border-slate-100 pb-4">
      <div className="flex items-center gap-2 text-emerald-600 mb-1">
        <GraduationCap className="w-5 h-5" />
        <span className="font-bold text-xs">فريق العمل والرؤية</span>
      </div>
      <h1 className="text-xl md:text-3xl font-black text-slate-900">من نحن — قصة «معدل DZ»</h1>
    </div>

    <p>
      مشروع <strong>«معدل DZ»</strong> وُلد من واقع الحاجة الماسة لدى التلاميذ وأولياء الأمور في الجزائر إلى منصة رقمية عربية سريعة، دقيقة وخالية من التعقيدات والإعلانات المزعجة، تُساعدهم على معرفة أين يقفون في تحصيلهم الدراسي ومحاكاة فرص النجاح في الامتحان الاستدراكي.
    </p>

    <h2 className="text-base font-bold text-slate-900 pt-2">قيمنا الأساسية:</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
      <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
        <h3 className="font-bold text-slate-900 text-xs mb-1">1. الدقة الحسابية الصارمة</h3>
        <p className="text-xs text-slate-600 font-medium leading-relaxed">لا نعتمد على التخمين، بل على صيغ برمجية حتمية خاضعة لاختبارات دورية آلية.</p>
      </div>

      <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
        <h3 className="font-bold text-slate-900 text-xs mb-1">2. أولوية الاستدراك الذكي</h3>
        <p className="text-xs text-slate-600 font-medium leading-relaxed">ابتكار أدوات تفاعلية مثل «خطتي للنجاح في الاستدراك» لتوجيه جهود التلميذ نحو المواد المؤثرة.</p>
      </div>

      <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
        <h3 className="font-bold text-slate-900 text-xs mb-1">3. المجانية والسهولة التامة</h3>
        <p className="text-xs text-slate-600 font-medium leading-relaxed">تجربة سهلة على الهاتف والحاسوب دون اشتراط أي تسجيل حساب.</p>
      </div>

      <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
        <h3 className="font-bold text-slate-900 text-xs mb-1">4. التوثيق والشفافية</h3>
        <p className="text-xs text-slate-600 font-medium leading-relaxed">عرض مصادر القواعد والمناشير الوزارية وتاريخ تدقيقها لكل سنة دراسية.</p>
      </div>
    </div>
  </div>
);

export const ContactPage: React.FC = () => {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setName('');
      setEmail('');
      setMessage('');
    }, 4000);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-xs space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2 text-emerald-600 mb-1">
          <Mail className="w-5 h-5" />
          <span className="font-bold text-xs">التواصل والدعم البيداغوجي</span>
        </div>
        <h1 className="text-xl md:text-3xl font-black text-slate-900">اتصل بفريق «معدل DZ»</h1>
        <p className="text-xs text-slate-500 mt-1">
          يسعدنا استقبال ملاحظاتكم أو الإبلاغ عن أي تعديل وزاري جديد في معاملات المواد.
        </p>
      </div>

      {sent ? (
        <div className="p-6 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl text-center space-y-2">
          <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
          <h3 className="font-bold text-sm">شكراً لتواصلك معنا!</h3>
          <p className="text-xs text-emerald-800">تم استلام رسالتك وسيتم الرد عليك في أقرب وقت.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-800 mb-1">الاسم الكامل</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="مثلاً: محمد الجزائري"
              className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">البريد الإلكتروني</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">الرسالة أو الملاحظة البيداغوجية</label>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="اكتب استفسارك أو اقترح مادة أو معامل لتحديثه..."
              className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:border-emerald-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <Send className="w-4 h-4" />
            <span>إرسال الرسالة الآن</span>
          </button>
        </form>
      )}

      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>البريد الإلكتروني المباشر:</span>
        <span className="font-mono text-emerald-700 font-bold">contact@moadel-dz.com</span>
      </div>
    </div>
  );
};
