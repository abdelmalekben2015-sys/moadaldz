/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * عارض مقالات دليل حساب المعدلات والاستدراك في الجزائر
 */

import React from 'react';
import { 
  BookOpen, Calculator, ArrowRight, Calendar, 
  Clock, ShieldCheck, ChevronLeft, Sparkles, Building
} from 'lucide-react';
import { ARTICLES_DB, GuideArticle } from '../data/articlesData';

interface GuideListViewProps {
  navigate: (path: string) => void;
}

export const GuideListView: React.FC<GuideListViewProps> = ({ navigate }) => {
  return (
    <div className="space-y-8">
      
      {/* الترويسة بتدرج أخضر زمردي متناسق */}
      <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-600 text-white p-7 md:p-9 rounded-3xl shadow-xl space-y-3 relative overflow-hidden border border-emerald-700/40">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10">
          <span className="bg-amber-400 text-slate-950 font-black px-3 py-1 rounded-full text-xs inline-flex items-center gap-1.5 shadow-xs mb-3">
            <BookOpen className="w-3.5 h-3.5 text-slate-950" />
            المحتوى التعليمي الموثق
          </span>
        <h1 className="text-2xl md:text-4xl font-black tracking-tight">
          دليل حساب المعدلات والاستدراك في الجزائر
        </h1>
        <p className="text-emerald-100/90 text-xs md:text-sm leading-relaxed max-w-2xl">
          مقالات تعليمية موثقة وشروحات رسمية مستندة إلى المناشير والقرارات الوزارية الصادرة عن وزارة التربية الوطنية ووزارة التعليم العالي.
        </p>
      </div>
    </div>

      {/* قائمة المقالات */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ARTICLES_DB.map((art) => (
          <div
            key={art.slug}
            className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-purple-300 transition-all shadow-xs hover:shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-3 text-[11px] text-slate-400">
                <span className="bg-purple-50 text-purple-700 font-bold px-2.5 py-0.5 rounded-full">
                  {art.category}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {art.readTime}
                </span>
              </div>

              <h2 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                {art.title}
              </h2>

              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                {art.metaDescription}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => navigate(`/guide/${art.slug}`)}
                className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1"
              >
                <span>قراءة المقال كاملاً</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => navigate(art.relatedCalculatorRoute)}
                className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1 rounded-xl font-medium flex items-center gap-1"
              >
                <Calculator className="w-3 h-3" />
                <span>الحاسبة المرتبطة</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

interface ArticleViewProps {
  slug: string;
  navigate: (path: string) => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({ slug, navigate }) => {
  const article = ARTICLES_DB.find(a => a.slug === slug);

  if (!article) {
    return (
      <div className="text-center py-16 space-y-4">
        <h2 className="text-xl font-bold text-slate-800">المقال المطلوب غير موجود</h2>
        <button
          onClick={() => navigate('/guide')}
          className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs"
        >
          العودة لدليل المقالات
        </button>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-xs space-y-6">
      
      {/* الترويسة والمصادر */}
      <div className="border-b border-slate-100 pb-5 space-y-3">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <button onClick={() => navigate('/guide')} className="hover:text-emerald-600 underline">
            دليل المعدلات
          </button>
          <span>/</span>
          <span className="text-purple-700 font-bold">{article.category}</span>
          <span>•</span>
          <span>آخر مراجعة: {article.lastUpdated}</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-black text-slate-900 leading-snug">
          {article.title}
        </h1>

        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-slate-900">
            <Building className="w-4 h-4 text-emerald-600" />
            <span>المستند والمصدر الرسمي المعتمد:</span>
          </div>
          <p className="text-slate-600">{article.source}</p>
          {article.decreeNumber && (
            <span className="text-[11px] font-mono bg-white px-2 py-0.5 rounded border border-slate-200 inline-block text-slate-700">
              {article.decreeNumber}
            </span>
          )}
        </div>
      </div>

      {/* نص المقال المحرر */}
      <div 
        className="prose prose-slate max-w-none text-xs md:text-sm leading-relaxed text-slate-700"
        dangerouslySetInnerHTML={{ __html: article.contentHtml }}
      />

      {/* الانتقال للحاسبة المرتبطة */}
      <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={() => navigate(article.relatedCalculatorRoute)}
          className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-200 flex items-center justify-center gap-2 transition-all"
        >
          <Calculator className="w-4 h-4" />
          <span>افتح الحاسبة الخاصة بهذا الموضوع الآن</span>
        </button>

        <button
          onClick={() => navigate('/guide')}
          className="text-xs text-slate-500 hover:text-slate-800 font-medium"
        >
          ← العودة لجميع مقالات الدليل
        </button>
      </div>

    </article>
  );
};
