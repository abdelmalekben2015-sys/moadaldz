/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * تطبيق «معدل DZ — حاسبة المعدلات والاستدراك في الجزائر»
 * الموسم الدراسي 2026/2027
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { RattrapageCalculator } from './components/RattrapageCalculator';
import { TrimesterCalculator } from './components/TrimesterCalculator';
import { TargetGradeCalculator } from './components/TargetGradeCalculator';
import { UniversityCalculator } from './components/UniversityCalculator';
import { GuideListView, ArticleView } from './components/GuideViews';
import { 
  PrivacyPolicyPage, TermsPage, DisclaimerPage, 
  AboutPage, ContactPage 
} from './components/LegalViews';
import { SavedResultsModal } from './components/SavedResultsModal';
import { EngineDiagnosticsModal } from './components/EngineDiagnosticsModal';
import { RuleRegistryModal } from './components/RuleRegistryModal';
import { AdminPreviewModal } from './components/AdminPreviewModal';
import { SavedResult } from './types';
import { ARTICLES_DB } from './data/articlesData';
import { Sparkles, Calculator, TrendingUp, Award, BookOpen } from 'lucide-react';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  // إدارة نتائج التخزين المحلي
  const [savedResults, setSavedResults] = useState<SavedResult[]>(() => {
    try {
      const stored = localStorage.getItem('moadel_dz_saved_results');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // حالات النوافذ المنبثقة
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [isDiagnosticsModalOpen, setIsDiagnosticsModalOpen] = useState(false);
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
  const [isAdminPreviewModalOpen, setIsAdminPreviewModalOpen] = useState(false);

  // تحديث التخزين المحلي
  const handleSaveResult = (newResult: SavedResult) => {
    const updated = [newResult, ...savedResults.filter(r => r.id !== newResult.id)];
    setSavedResults(updated);
    try {
      localStorage.setItem('moadel_dz_saved_results', JSON.stringify(updated));
    } catch {
      // تجاهل إذا كانت الذاكرة ممتلئة
    }
  };

  const handleDeleteResult = (id: string) => {
    const updated = savedResults.filter(r => r.id !== id);
    setSavedResults(updated);
    try {
      localStorage.setItem('moadel_dz_saved_results', JSON.stringify(updated));
    } catch {}
  };

  const handleClearAllResults = () => {
    setSavedResults([]);
    try {
      localStorage.removeItem('moadel_dz_saved_results');
    } catch {}
  };

  // التحكم في التوجيه وسجل المتصفح
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // تحديث وسوم SEO وعنوان الصفحة ديناميكياً
  useEffect(() => {
    let title = "معدل DZ — حاسبة المعدلات والاستدراك في الجزائر 2026/2027";
    let desc = "احسب معدلك الفصلي والسنوي ومعدل الاستدراك لجميع أطوار التعليم في الجزائر (ابتدائي، متوسط، ثانوي، جامعي) وفق القواعد والمناهج الرسمية المعتمدة.";

    if (currentPath === '/rattrapage') {
      title = "حاسبة معدل الاستدراك في الجزائر 2026/2027 | معدل DZ";
      desc = "احسب معدل الاستدراك لجميع سنوات الطور المتوسط والثانوي والجامعي في الجزائر واكتشف أثر تحسين كل علامة فورياً وفق قاعدة MAX الرسمية.";
    } else if (currentPath === '/semestre') {
      title = "حاسبة المعدل الفصلي بالمعاملات (2026/2027) | معدل DZ";
      desc = "حساب دقيق لمعدل الفصل الأول والثاني والثالث بالمعاملات الرسمية ومجموع النقاط الموزونة لمختلف الشعب والمستويات.";
    } else if (currentPath === '/target-grade') {
      title = "ما العلامة التي أحتاجها للنجاح؟ الحاسبة العكسية | معدل DZ";
      desc = "أداة رياضية ذكية تحسب لك العلامة المحددة الواجب تحصيلها في ورقة الاختبار لتحقيق معدل النجاح المرغوب مع تنبيه بالإمكانية.";
    } else if (currentPath === '/university') {
      title = "حاسبة المعدل الجامعي ونظام الأرصدة LMD الجزائر | معدل DZ";
      desc = "حساب معدل المقاييس، معدل السداسي، ورصيد الوحدات مع احتساب قاعدة التعويض السداسي والسنوي التلقائي عند 10/20.";
    } else if (currentPath === '/guide') {
      title = "دليل حساب المعدلات والاستدراك في الجزائر | معدل DZ";
      desc = "مقالات وشروحات موثقة ومستندة إلى المناشير والقرارات الوزارية الصادرة عن وزارة التربية الوطنية والتعليم العالي.";
    } else if (currentPath.startsWith('/guide/')) {
      const slug = currentPath.split('/')[2];
      const art = ARTICLES_DB.find(a => a.slug === slug);
      if (art) {
        title = `${art.title} | معدل DZ`;
        desc = art.metaDescription;
      }
    } else if (currentPath === '/privacy') {
      title = "سياسة الخصوصية | معدل DZ";
      desc = "سياسة الخصوصية وحماية بيانات المستخدمين في موقع معدل DZ.";
    } else if (currentPath === '/terms') {
      title = "شروط الاستخدام | معدل DZ";
      desc = "شروط وأحكام استخدام منصة وحاسبات معدل DZ التعليمية.";
    } else if (currentPath === '/disclaimer') {
      title = "إخلاء المسؤولية المنهجي | معدل DZ";
      desc = "بيان توضيحي حول استقلالية الحسابات التربوية عن الهيئات الرسمية.";
    } else if (currentPath === '/about') {
      title = "من نحن — قصة معدل DZ | منصة الحسابات الجزائرية";
      desc = "تعرف على مشروع معدل DZ وفريق العمل القائم على تطوير المحرك الحسابي.";
    } else if (currentPath === '/contact') {
      title = "اتصل بنا | معدل DZ";
      desc = "تواصل مع فريق الدعم والتطوير لمنصة معدل DZ لتقديم الملاحظات والاقتراحات.";
    }

    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', desc);
    }
  }, [currentPath]);

  // تصيير المحتوى حسب المسار الحالي
  const renderCurrentRoute = () => {
    if (currentPath === '/') {
      return (
        <HomeView 
          navigate={navigate}
          openRulesModal={() => setIsRulesModalOpen(true)}
          openDiagnosticsModal={() => setIsDiagnosticsModalOpen(true)}
        />
      );
    }
    if (currentPath === '/rattrapage') {
      return <RattrapageCalculator onSaveResult={handleSaveResult} />;
    }
    if (currentPath === '/semestre') {
      return <TrimesterCalculator onSaveResult={handleSaveResult} />;
    }
    if (currentPath === '/target-grade') {
      return <TargetGradeCalculator />;
    }
    if (currentPath === '/university') {
      return <UniversityCalculator onSaveResult={handleSaveResult} />;
    }
    if (currentPath === '/guide') {
      return <GuideListView navigate={navigate} />;
    }
    if (currentPath.startsWith('/guide/')) {
      const slug = currentPath.split('/')[2];
      return <ArticleView slug={slug} navigate={navigate} />;
    }
    if (currentPath === '/privacy') {
      return <PrivacyPolicyPage />;
    }
    if (currentPath === '/terms') {
      return <TermsPage />;
    }
    if (currentPath === '/disclaimer') {
      return <DisclaimerPage />;
    }
    if (currentPath === '/about') {
      return <AboutPage />;
    }
    if (currentPath === '/contact') {
      return <ContactPage />;
    }

    // صفحة 404
    return (
      <div className="text-center py-20 space-y-4">
        <h1 className="text-6xl font-black text-slate-300">404</h1>
        <h2 className="text-xl font-bold text-slate-800">الصفحة المطلوبة غير موجودة</h2>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          ربما تم كتابة الرابط بشكل غير صحيح. يمكنك العودة إلى إحدى الحاسبات الرئيسية المتاحة.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs"
        >
          العودة للرئيسية
        </button>
      </div>
    );
  };

  return (
    <div className="min-w-[320px] min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans" dir="rtl">
      
      {/* الترويسة الرئيسية */}
      <Header
        currentPath={currentPath}
        navigate={navigate}
        savedCount={savedResults.length}
        openSavedModal={() => setIsSavedModalOpen(true)}
        openDiagnosticsModal={() => setIsDiagnosticsModalOpen(true)}
      />

      {/* شريط الأدوات العائم في أسفل الشاشة للهواتف المحمولة */}
      <div className="md:hidden fixed bottom-3 left-3 right-3 z-30 bg-slate-900/95 backdrop-blur text-white p-2 rounded-2xl shadow-xl flex items-center justify-around text-[10px] font-bold border border-slate-800">
        <button 
          onClick={() => navigate('/')} 
          className={`flex flex-col items-center gap-0.5 p-1 ${currentPath === '/' ? 'text-emerald-400' : 'text-slate-400'}`}
        >
          <span>الرئيسية</span>
        </button>
        <button 
          onClick={() => navigate('/rattrapage')} 
          className={`flex flex-col items-center gap-0.5 p-1 ${currentPath === '/rattrapage' ? 'text-amber-400 font-black' : 'text-slate-300'}`}
        >
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>الاستدراك</span>
          </span>
        </button>
        <button 
          onClick={() => navigate('/semestre')} 
          className={`flex flex-col items-center gap-0.5 p-1 ${currentPath === '/semestre' ? 'text-emerald-400' : 'text-slate-400'}`}
        >
          <span>الفصلي</span>
        </button>
        <button 
          onClick={() => navigate('/target-grade')} 
          className={`flex flex-col items-center gap-0.5 p-1 ${currentPath === '/target-grade' ? 'text-emerald-400' : 'text-slate-400'}`}
        >
          <span>الهدف</span>
        </button>
        <button 
          onClick={() => navigate('/university')} 
          className={`flex flex-col items-center gap-0.5 p-1 ${currentPath === '/university' ? 'text-emerald-400' : 'text-slate-400'}`}
        >
          <span>الجامعي</span>
        </button>
      </div>

      {/* المحتوى الرئيسي */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 md:py-10">
        {renderCurrentRoute()}
      </main>

      {/* التذييل العام */}
      <Footer
        navigate={navigate}
        openRulesModal={() => setIsRulesModalOpen(true)}
        openAdminPreviewModal={() => setIsAdminPreviewModalOpen(true)}
      />

      {/* النوافذ المنبثقة (Modals) */}
      <SavedResultsModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedResults={savedResults}
        onDeleteResult={handleDeleteResult}
        onClearAll={handleClearAllResults}
      />

      <EngineDiagnosticsModal
        isOpen={isDiagnosticsModalOpen}
        onClose={() => setIsDiagnosticsModalOpen(false)}
      />

      <RuleRegistryModal
        isOpen={isRulesModalOpen}
        onClose={() => setIsRulesModalOpen(false)}
      />

      <AdminPreviewModal
        isOpen={isAdminPreviewModalOpen}
        onClose={() => setIsAdminPreviewModalOpen(false)}
      />

    </div>
  );
}
