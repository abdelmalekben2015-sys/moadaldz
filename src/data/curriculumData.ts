/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * قاعدة بيانات المناهج والمعاملات الرسمية في الجزائر للسنة الدراسية 2026/2027
 */

import { LevelCurriculum, UniversityCurriculum, ValidationRuleItem } from '../types';

export const OFFICIAL_RULES_REGISTRY: Record<string, ValidationRuleItem> = {
  middle_evaluation: {
    id: "middle_evaluation",
    cycle: "middle",
    title: "نظام تقويم تلاميذ مرحلة التعليم المتوسط",
    level: "جميع مستويات التعليم المتوسط (1، 2، 3، 4 متوسط)",
    formulaDescription: "معدل المادة = (التقويم المستمر + الفرض + الاختبار × 2) ÷ 4",
    status: "verified",
    officialSource: "المنشور الوزاري رقم 128 المنظم للتقويم البيداغوجي في مرحلة التعليم المتوسط",
    decreeNumber: "منشور وزاري رقم 128 / و.ت.و",
    effectiveYear: "2026/2027",
    lastAuditedDate: "2026-10-15",
    notes: "يُحسب معدل الفصل بضرب كل معدل مادة في معامله الرسمي وقسمة المجموع على مجموع المعاملات."
  },
  middle_rattrapage: {
    id: "middle_rattrapage",
    cycle: "middle",
    title: "قواعد الامتحان الاستدراكي للطور المتوسط",
    level: "السنوات 1، 2، 3 متوسط (المعدل السنوي بين 9.00 و9.99)",
    formulaDescription: "العلامة المعتمدة بعد الاستدراك = MAX(العلامة السنوية السابقة للمادة، علامة الامتحان الاستدراكي)",
    status: "verified",
    officialSource: "القرار الوزاري المنظم للامتحانات الاستدراكية في المؤسسات التربوية",
    effectiveYear: "2026/2027",
    lastAuditedDate: "2026-10-20",
    notes: "تُمنح فرصة الاستدراك في المواد التي لم يُحقق فيها التلميذ المعدل (أقل من 10)، ولا يتم خفض أي علامة إذا كانت علامة الاستدراك أدنى."
  },
  secondary_evaluation: {
    id: "secondary_evaluation",
    cycle: "secondary",
    title: "نظام تقويم تلاميذ مرحلة التعليم الثانوي",
    level: "التعليم الثانوي العام والتكنولوجي (جميع الشعب)",
    formulaDescription: "معدل المادة = (التقويم المستمر + الفرض المحروس + الاختبار × 2) ÷ 4",
    status: "verified",
    officialSource: "دليل بناء معدلات التعليم الثانوي العام والتكنولوجي الصادر عن المفتشية العامة للتربية الوطنية",
    effectiveYear: "2026/2027",
    lastAuditedDate: "2026-10-18",
    notes: "في حال إجراء فرضين للمواد الأساسية، يُحسب معدل الفروض: (فرض 1 + فرض 2) ÷ 2 قبل إدراجها بالصيغة."
  },
  secondary_rattrapage: {
    id: "secondary_rattrapage",
    cycle: "secondary",
    title: "قواعد الامتحان الاستدراكي للطور الثانوي",
    level: "السنوات 1 و2 ثانوي (المعدل السنوي بين 9.00 و9.99)",
    formulaDescription: "المعدل الجديد = مجموع (MAX[نقطة سنوية, نقطة استدراك] × المعامل) ÷ مجموع المعاملات",
    status: "verified",
    officialSource: "مذكرات تنظيم نهاية السنة الدراسية والامتحانات الاستدراكية بالثانويات",
    effectiveYear: "2026/2027",
    lastAuditedDate: "2026-10-20",
    notes: "ينتقل التلميذ إلى القسم الأعلى إذا أصبح معدله بعد الاستدراك يساوي أو يفوق 10.00/20."
  },
  university_lmd_rules: {
    id: "university_lmd_rules",
    cycle: "university",
    title: "نظام تقييم واكتساب الأرصدة والتعويض في التعليم العالي LMD",
    level: "الطور الأول (ليسانس) والطور الثاني (ماستر)",
    formulaDescription: "معدل المقياس = (التقييم المستمر CC/TD × 0.40) + (الامتحان النهائي × 0.60)",
    status: "verified",
    officialSource: "القرار الوزاري رقم 711 و712 الصادر عن وزارة التعليم العالي والبحث العلمي",
    decreeNumber: "قرار 711 / 712 و.ت.ع.ب.ع",
    effectiveYear: "2026/2027",
    lastAuditedDate: "2026-10-12",
    notes: "يُطبق مبدأ التعويض السداسي (Compensatoire): إذا كان معدل السداسي >= 10 يُعتبر السداسي ناجحاً وتُكتسب 30 رصيداً تلقائياً."
  },
  primary_standard: {
    id: "primary_standard",
    cycle: "primary",
    title: "نظام تقويم مرحلة التعليم الابتدائي",
    level: "السنوات 3، 4، 5 ابتدائي",
    formulaDescription: "المعدل الفصلي = مجموع علامات اختبارات المواد ÷ عدد المواد (أو المعاملات المعتمدة)",
    status: "verified",
    officialSource: "دليل تقويم مرحلة التعليم الابتدائي - وزارة التربية الوطنية",
    effectiveYear: "2026/2027",
    lastAuditedDate: "2026-10-10",
    notes: "عتبة النجاح في الابتدائي هي 5.00 من 10 (أو 10 من 20 حسب السلم المعتمد)."
  }
};

export const ALL_CURRICULA: LevelCurriculum[] = [
  // --------------------------------------------------------------------------
  // الطور المتوسط
  // --------------------------------------------------------------------------
  {
    id: 'middle_1am',
    name: 'السنة الأولى متوسط (1AM)',
    cycle: 'middle',
    passingGrade: 10,
    scaleMax: 20,
    rattrapageThreshold: 10,
    ruleDescription: 'المعدل = (تقويم + فرض + اختبار × 2) ÷ 4',
    sourceReference: 'المنشور الوزاري رقم 128',
    validationStatus: 'verified',
    subjects: [
      { id: 'ar', name: 'اللغة العربية', coef: 2, hasAssessment: true, defaultAssessment: 14, defaultTest1: 13, defaultExam: 12 },
      { id: 'math', name: 'الرياضيات', coef: 2, hasAssessment: true, defaultAssessment: 13, defaultTest1: 11, defaultExam: 10 },
      { id: 'fr', name: 'اللغة الفرنسية', coef: 2, hasAssessment: true, defaultAssessment: 12, defaultTest1: 12, defaultExam: 11 },
      { id: 'en', name: 'اللغة الإنجليزية', coef: 1, hasAssessment: true, defaultAssessment: 14, defaultTest1: 13, defaultExam: 13 },
      { id: 'sci', name: 'علوم الطبيعة والحياة', coef: 2, hasAssessment: true, defaultAssessment: 13, defaultTest1: 12, defaultExam: 12 },
      { id: 'phy', name: 'العلوم الفيزيائية والتكنولوجيا', coef: 2, hasAssessment: true, defaultAssessment: 13, defaultTest1: 11, defaultExam: 12 },
      { id: 'his_geo', name: 'التاريخ والجغرافيا', coef: 2, hasAssessment: true, defaultAssessment: 14, defaultTest1: 13, defaultExam: 13 },
      { id: 'isl', name: 'التربية الإسلامية', coef: 1, hasAssessment: true, defaultAssessment: 16, defaultTest1: 15, defaultExam: 16 },
      { id: 'civ', name: 'التربية المدنية', coef: 1, hasAssessment: true, defaultAssessment: 15, defaultTest1: 14, defaultExam: 15 },
      { id: 'inf', name: 'الإعلام الآلي', coef: 1, hasAssessment: true, defaultAssessment: 16, defaultTest1: 15, defaultExam: 16 },
      { id: 'art', name: 'التربية الفنية التشكيلية', coef: 1, hasAssessment: true, defaultAssessment: 17, defaultTest1: 16, defaultExam: 17 },
      { id: 'spo', name: 'التربية البدنية والرياضية', coef: 1, hasAssessment: true, defaultAssessment: 18, defaultTest1: 18, defaultExam: 18 },
    ]
  },
  {
    id: 'middle_2am',
    name: 'السنة الثانية متوسط (2AM)',
    cycle: 'middle',
    passingGrade: 10,
    scaleMax: 20,
    rattrapageThreshold: 10,
    ruleDescription: 'المعدل = (تقويم + فرض + اختبار × 2) ÷ 4',
    sourceReference: 'المنشور الوزاري رقم 128',
    validationStatus: 'verified',
    subjects: [
      { id: 'ar', name: 'اللغة العربية', coef: 3, hasAssessment: true, defaultAssessment: 14, defaultTest1: 13, defaultExam: 12 },
      { id: 'math', name: 'الرياضيات', coef: 3, hasAssessment: true, defaultAssessment: 12, defaultTest1: 11, defaultExam: 10 },
      { id: 'fr', name: 'اللغة الفرنسية', coef: 2, hasAssessment: true, defaultAssessment: 13, defaultTest1: 12, defaultExam: 12 },
      { id: 'en', name: 'اللغة الإنجليزية', coef: 1, hasAssessment: true, defaultAssessment: 14, defaultTest1: 13, defaultExam: 14 },
      { id: 'sci', name: 'علوم الطبيعة والحياة', coef: 2, hasAssessment: true, defaultAssessment: 13, defaultTest1: 12, defaultExam: 11 },
      { id: 'phy', name: 'العلوم الفيزيائية والتكنولوجيا', coef: 2, hasAssessment: true, defaultAssessment: 12, defaultTest1: 11, defaultExam: 12 },
      { id: 'his_geo', name: 'التاريخ والجغرافيا', coef: 2, hasAssessment: true, defaultAssessment: 15, defaultTest1: 14, defaultExam: 13 },
      { id: 'isl', name: 'التربية الإسلامية', coef: 1, hasAssessment: true, defaultAssessment: 16, defaultTest1: 15, defaultExam: 16 },
      { id: 'civ', name: 'التربية المدنية', coef: 1, hasAssessment: true, defaultAssessment: 15, defaultTest1: 14, defaultExam: 15 },
      { id: 'inf', name: 'الإعلام الآلي', coef: 1, hasAssessment: true, defaultAssessment: 16, defaultTest1: 15, defaultExam: 16 },
      { id: 'art', name: 'التربية التشكيلية أو الموسيقية', coef: 1, hasAssessment: true, defaultAssessment: 17, defaultTest1: 16, defaultExam: 17 },
      { id: 'spo', name: 'التربية البدنية والرياضية', coef: 1, hasAssessment: true, defaultAssessment: 18, defaultTest1: 18, defaultExam: 18 },
    ]
  },
  {
    id: 'middle_3am',
    name: 'السنة الثالثة متوسط (3AM)',
    cycle: 'middle',
    passingGrade: 10,
    scaleMax: 20,
    rattrapageThreshold: 10,
    ruleDescription: 'المعدل = (تقويم + فرض + اختبار × 2) ÷ 4',
    sourceReference: 'المنشور الوزاري رقم 128',
    validationStatus: 'verified',
    subjects: [
      { id: 'ar', name: 'اللغة العربية', coef: 3, hasAssessment: true, defaultAssessment: 13, defaultTest1: 12, defaultExam: 12 },
      { id: 'math', name: 'الرياضيات', coef: 3, hasAssessment: true, defaultAssessment: 12, defaultTest1: 11, defaultExam: 11 },
      { id: 'fr', name: 'اللغة الفرنسية', coef: 2, hasAssessment: true, defaultAssessment: 12, defaultTest1: 11, defaultExam: 11 },
      { id: 'en', name: 'اللغة الإنجليزية', coef: 1, hasAssessment: true, defaultAssessment: 13, defaultTest1: 13, defaultExam: 12 },
      { id: 'sci', name: 'علوم الطبيعة والحياة', coef: 2, hasAssessment: true, defaultAssessment: 13, defaultTest1: 12, defaultExam: 12 },
      { id: 'phy', name: 'العلوم الفيزيائية والتكنولوجيا', coef: 2, hasAssessment: true, defaultAssessment: 12, defaultTest1: 12, defaultExam: 11 },
      { id: 'his_geo', name: 'التاريخ والجغرافيا', coef: 2, hasAssessment: true, defaultAssessment: 14, defaultTest1: 13, defaultExam: 13 },
      { id: 'isl', name: 'التربية الإسلامية', coef: 1, hasAssessment: true, defaultAssessment: 16, defaultTest1: 15, defaultExam: 15 },
      { id: 'civ', name: 'التربية المدنية', coef: 1, hasAssessment: true, defaultAssessment: 15, defaultTest1: 14, defaultExam: 14 },
      { id: 'inf', name: 'الإعلام الآلي', coef: 1, hasAssessment: true, defaultAssessment: 16, defaultTest1: 15, defaultExam: 16 },
      { id: 'art', name: 'التربية التشكيلية', coef: 1, hasAssessment: true, defaultAssessment: 17, defaultTest1: 16, defaultExam: 17 },
      { id: 'spo', name: 'التربية البدنية والرياضية', coef: 1, hasAssessment: true, defaultAssessment: 18, defaultTest1: 18, defaultExam: 18 },
    ]
  },
  {
    id: 'middle_4am_bem',
    name: 'السنة الرابعة متوسط (4AM - شهادة BEM)',
    cycle: 'middle',
    passingGrade: 10,
    scaleMax: 20,
    rattrapageThreshold: 10,
    ruleDescription: 'المعدل = (تقويم + فرض + اختبار × 2) ÷ 4 بمعاملات البيام الرسمية',
    sourceReference: 'المنشور الوزاري لمعاملات شهادة التعليم المتوسط BEM',
    validationStatus: 'verified',
    subjects: [
      { id: 'ar', name: 'اللغة العربية', coef: 5, hasAssessment: true, defaultAssessment: 14, defaultTest1: 13, defaultExam: 13 },
      { id: 'math', name: 'الرياضيات', coef: 4, hasAssessment: true, defaultAssessment: 12, defaultTest1: 11, defaultExam: 11 },
      { id: 'fr', name: 'اللغة الفرنسية', coef: 3, hasAssessment: true, defaultAssessment: 13, defaultTest1: 12, defaultExam: 12 },
      { id: 'his_geo', name: 'التاريخ والجغرافيا', coef: 3, hasAssessment: true, defaultAssessment: 14, defaultTest1: 13, defaultExam: 14 },
      { id: 'sci', name: 'علوم الطبيعة والحياة', coef: 2, hasAssessment: true, defaultAssessment: 13, defaultTest1: 12, defaultExam: 12 },
      { id: 'phy', name: 'العلوم الفيزيائية والتكنولوجيا', coef: 2, hasAssessment: true, defaultAssessment: 12, defaultTest1: 11, defaultExam: 11 },
      { id: 'en', name: 'اللغة الإنجليزية', coef: 2, hasAssessment: true, defaultAssessment: 13, defaultTest1: 13, defaultExam: 13 },
      { id: 'isl', name: 'التربية الإسلامية', coef: 2, hasAssessment: true, defaultAssessment: 16, defaultTest1: 15, defaultExam: 16 },
      { id: 'civ', name: 'التربية المدنية', coef: 1, hasAssessment: true, defaultAssessment: 15, defaultTest1: 14, defaultExam: 15 },
      { id: 'art', name: 'التربية التشكيلية', coef: 1, hasAssessment: true, defaultAssessment: 17, defaultTest1: 16, defaultExam: 17 },
      { id: 'spo', name: 'التربية البدنية والرياضية', coef: 1, hasAssessment: true, defaultAssessment: 18, defaultTest1: 18, defaultExam: 18 },
    ]
  },

  // --------------------------------------------------------------------------
  // الطور الثانوي
  // --------------------------------------------------------------------------
  {
    id: 'sec_1as_st',
    name: '1 ثانوي — جذع مشترك علوم وتكنولوجيا (1AS ST)',
    cycle: 'secondary',
    streamName: 'جذع مشترك علوم وتكنولوجيا',
    passingGrade: 10,
    scaleMax: 20,
    rattrapageThreshold: 10,
    ruleDescription: 'المعدل = (تقويم + فرض + اختبار × 2) ÷ 4 بالمعاملات العلمية',
    sourceReference: 'دليل بناء معدلات التعليم الثانوي العام والتكنولوجي',
    validationStatus: 'verified',
    subjects: [
      { id: 'math', name: 'الرياضيات', coef: 5, hasAssessment: true, defaultAssessment: 13, defaultTest1: 12, defaultExam: 11 },
      { id: 'sci', name: 'علوم الطبيعة والحياة', coef: 4, hasAssessment: true, defaultAssessment: 13, defaultTest1: 12, defaultExam: 12 },
      { id: 'phy', name: 'العلوم الفيزيائية', coef: 4, hasAssessment: true, defaultAssessment: 12, defaultTest1: 11, defaultExam: 11 },
      { id: 'ar', name: 'اللغة العربية وآدابها', coef: 2, hasAssessment: true, defaultAssessment: 13, defaultTest1: 12, defaultExam: 12 },
      { id: 'fr', name: 'اللغة الفرنسية', coef: 2, hasAssessment: true, defaultAssessment: 12, defaultTest1: 11, defaultExam: 12 },
      { id: 'en', name: 'اللغة الإنجليزية', coef: 2, hasAssessment: true, defaultAssessment: 13, defaultTest1: 12, defaultExam: 13 },
      { id: 'his_geo', name: 'التاريخ والجغرافيا', coef: 2, hasAssessment: true, defaultAssessment: 14, defaultTest1: 13, defaultExam: 13 },
      { id: 'isl', name: 'العلوم الإسلامية', coef: 2, hasAssessment: true, defaultAssessment: 15, defaultTest1: 14, defaultExam: 15 },
      { id: 'tech', name: 'التكنولوجيا (هندسة)', coef: 2, hasAssessment: true, defaultAssessment: 14, defaultTest1: 13, defaultExam: 13 },
      { id: 'inf', name: 'الإعلام الآلي', coef: 2, hasAssessment: true, defaultAssessment: 15, defaultTest1: 15, defaultExam: 15 },
      { id: 'spo', name: 'التربية البدنية والرياضية', coef: 1, hasAssessment: true, defaultAssessment: 17, defaultTest1: 17, defaultExam: 17 },
    ]
  },
  {
    id: 'sec_1as_lit',
    name: '1 ثانوي — جذع مشترك آداب (1AS Lit)',
    cycle: 'secondary',
    streamName: 'جذع مشترك آداب',
    passingGrade: 10,
    scaleMax: 20,
    rattrapageThreshold: 10,
    ruleDescription: 'المعدل = (تقويم + فرض + اختبار × 2) ÷ 4 بالمعاملات الأدبية',
    sourceReference: 'دليل بناء معدلات التعليم الثانوي',
    validationStatus: 'verified',
    subjects: [
      { id: 'ar', name: 'اللغة العربية وآدابها', coef: 5, hasAssessment: true, defaultAssessment: 14, defaultTest1: 13, defaultExam: 13 },
      { id: 'his_geo', name: 'التاريخ والجغرافيا', coef: 3, hasAssessment: true, defaultAssessment: 14, defaultTest1: 13, defaultExam: 13 },
      { id: 'fr', name: 'اللغة الفرنسية', coef: 3, hasAssessment: true, defaultAssessment: 13, defaultTest1: 12, defaultExam: 12 },
      { id: 'en', name: 'اللغة الإنجليزية', coef: 3, hasAssessment: true, defaultAssessment: 13, defaultTest1: 12, defaultExam: 13 },
      { id: 'isl', name: 'العلوم الإسلامية', coef: 2, hasAssessment: true, defaultAssessment: 15, defaultTest1: 15, defaultExam: 16 },
      { id: 'math', name: 'الرياضيات', coef: 2, hasAssessment: true, defaultAssessment: 11, defaultTest1: 10, defaultExam: 10 },
      { id: 'sci', name: 'العلوم الطبيعية', coef: 2, hasAssessment: true, defaultAssessment: 12, defaultTest1: 11, defaultExam: 11 },
      { id: 'inf', name: 'الإعلام الآلي', coef: 2, hasAssessment: true, defaultAssessment: 15, defaultTest1: 14, defaultExam: 15 },
      { id: 'spo', name: 'التربية البدنية والرياضية', coef: 1, hasAssessment: true, defaultAssessment: 17, defaultTest1: 17, defaultExam: 17 },
    ]
  },
  {
    id: 'sec_3as_bac_sci',
    name: '3 ثانوي بكالوريا — شعبة علوم تجريبية (BAC Sci)',
    cycle: 'secondary',
    streamName: 'علوم تجريبية',
    passingGrade: 10,
    scaleMax: 20,
    rattrapageThreshold: 10,
    ruleDescription: 'المعاملات المعتمدة في بكالوريا علوم تجريبية',
    sourceReference: 'المنشور الوزاري المنظم لامتحان شهادة البكالوريا',
    validationStatus: 'verified',
    subjects: [
      { id: 'sci', name: 'علوم الطبيعة والحياة', coef: 6, hasAssessment: true, defaultAssessment: 14, defaultTest1: 13, defaultExam: 13 },
      { id: 'phy', name: 'العلوم الفيزيائية', coef: 5, hasAssessment: true, defaultAssessment: 13, defaultTest1: 12, defaultExam: 12 },
      { id: 'math', name: 'الرياضيات', coef: 5, hasAssessment: true, defaultAssessment: 13, defaultTest1: 11, defaultExam: 11 },
      { id: 'ar', name: 'اللغة العربية وآدابها', coef: 3, hasAssessment: true, defaultAssessment: 13, defaultTest1: 12, defaultExam: 13 },
      { id: 'philo', name: 'الفلسفة', coef: 2, hasAssessment: true, defaultAssessment: 12, defaultTest1: 11, defaultExam: 11 },
      { id: 'his_geo', name: 'التاريخ والجغرافيا', coef: 2, hasAssessment: true, defaultAssessment: 14, defaultTest1: 13, defaultExam: 13 },
      { id: 'fr', name: 'اللغة الفرنسية', coef: 2, hasAssessment: true, defaultAssessment: 13, defaultTest1: 12, defaultExam: 12 },
      { id: 'en', name: 'اللغة الإنجليزية', coef: 2, hasAssessment: true, defaultAssessment: 14, defaultTest1: 13, defaultExam: 13 },
      { id: 'isl', name: 'العلوم الإسلامية', coef: 2, hasAssessment: true, defaultAssessment: 16, defaultTest1: 15, defaultExam: 16 },
      { id: 'spo', name: 'التربية البدنية والرياضية', coef: 1, hasAssessment: true, defaultAssessment: 18, defaultTest1: 18, defaultExam: 18 },
    ]
  },
  {
    id: 'sec_3as_bac_math',
    name: '3 ثانوي بكالوريا — شعبة رياضيات (BAC Math)',
    cycle: 'secondary',
    streamName: 'رياضيات',
    passingGrade: 10,
    scaleMax: 20,
    rattrapageThreshold: 10,
    ruleDescription: 'المعاملات المعتمدة في بكالوريا رياضيات',
    sourceReference: 'المنشور الوزاري لامتحان شهادة البكالوريا',
    validationStatus: 'verified',
    subjects: [
      { id: 'math', name: 'الرياضيات', coef: 7, hasAssessment: true, defaultAssessment: 14, defaultTest1: 13, defaultExam: 13 },
      { id: 'phy', name: 'العلوم الفيزيائية', coef: 6, hasAssessment: true, defaultAssessment: 13, defaultTest1: 12, defaultExam: 12 },
      { id: 'sci', name: 'علوم الطبيعة والحياة', coef: 2, hasAssessment: true, defaultAssessment: 12, defaultTest1: 11, defaultExam: 12 },
      { id: 'ar', name: 'اللغة العربية وآدابها', coef: 3, hasAssessment: true, defaultAssessment: 13, defaultTest1: 12, defaultExam: 13 },
      { id: 'philo', name: 'الفلسفة', coef: 2, hasAssessment: true, defaultAssessment: 11, defaultTest1: 11, defaultExam: 11 },
      { id: 'his_geo', name: 'التاريخ والجغرافيا', coef: 2, hasAssessment: true, defaultAssessment: 13, defaultTest1: 13, defaultExam: 13 },
      { id: 'fr', name: 'اللغة الفرنسية', coef: 2, hasAssessment: true, defaultAssessment: 12, defaultTest1: 12, defaultExam: 12 },
      { id: 'en', name: 'اللغة الإنجليزية', coef: 2, hasAssessment: true, defaultAssessment: 13, defaultTest1: 13, defaultExam: 13 },
      { id: 'isl', name: 'العلوم الإسلامية', coef: 2, hasAssessment: true, defaultAssessment: 16, defaultTest1: 15, defaultExam: 16 },
      { id: 'spo', name: 'التربية البدنية والرياضية', coef: 1, hasAssessment: true, defaultAssessment: 18, defaultTest1: 18, defaultExam: 18 },
    ]
  },
  {
    id: 'sec_3as_bac_philo',
    name: '3 ثانوي بكالوريا — آداب وفلسفة (BAC Philo)',
    cycle: 'secondary',
    streamName: 'آداب وفلسفة',
    passingGrade: 10,
    scaleMax: 20,
    rattrapageThreshold: 10,
    ruleDescription: 'المعاملات المعتمدة في بكالوريا شعبة آداب وفلسفة',
    sourceReference: 'المنشور الوزاري لامتحان شهادة البكالوريا',
    validationStatus: 'verified',
    subjects: [
      { id: 'philo', name: 'الفلسفة', coef: 6, hasAssessment: true, defaultAssessment: 13, defaultTest1: 12, defaultExam: 12 },
      { id: 'ar', name: 'اللغة العربية وآدابها', coef: 6, hasAssessment: true, defaultAssessment: 14, defaultTest1: 13, defaultExam: 13 },
      { id: 'his_geo', name: 'التاريخ والجغرافيا', coef: 4, hasAssessment: true, defaultAssessment: 14, defaultTest1: 13, defaultExam: 14 },
      { id: 'fr', name: 'اللغة الفرنسية', coef: 3, hasAssessment: true, defaultAssessment: 12, defaultTest1: 11, defaultExam: 12 },
      { id: 'en', name: 'اللغة الإنجليزية', coef: 3, hasAssessment: true, defaultAssessment: 13, defaultTest1: 12, defaultExam: 13 },
      { id: 'isl', name: 'العلوم الإسلامية', coef: 2, hasAssessment: true, defaultAssessment: 15, defaultTest1: 15, defaultExam: 16 },
      { id: 'math', name: 'الرياضيات', coef: 2, hasAssessment: true, defaultAssessment: 11, defaultTest1: 10, defaultExam: 10 },
      { id: 'spo', name: 'التربية البدنية والرياضية', coef: 1, hasAssessment: true, defaultAssessment: 17, defaultTest1: 17, defaultExam: 17 },
    ]
  },

  // --------------------------------------------------------------------------
  // الطور الابتدائي
  // --------------------------------------------------------------------------
  {
    id: 'primary_5ap',
    name: 'السنة الخامسة ابتدائي (5AP)',
    cycle: 'primary',
    passingGrade: 5,
    scaleMax: 10,
    rattrapageThreshold: 5,
    ruleDescription: 'حساب المعدل الفصلي للمرحلة الابتدائية',
    sourceReference: 'دليل تقويم مرحلة التعليم الابتدائي',
    validationStatus: 'verified',
    subjects: [
      { id: 'ar', name: 'اللغة العربية', coef: 2, hasAssessment: false, defaultExam: 7.5 },
      { id: 'math', name: 'الرياضيات', coef: 2, hasAssessment: false, defaultExam: 8.0 },
      { id: 'fr', name: 'اللغة الفرنسية', coef: 1, hasAssessment: false, defaultExam: 7.0 },
      { id: 'isl', name: 'التربية الإسلامية', coef: 1, hasAssessment: false, defaultExam: 8.5 },
      { id: 'civ', name: 'التربية المدنية', coef: 1, hasAssessment: false, defaultExam: 8.0 },
      { id: 'sci_tech', name: 'التربية العلمية والتكنولوجية', coef: 1, hasAssessment: false, defaultExam: 7.5 },
      { id: 'his_geo', name: 'التاريخ والجغرافيا', coef: 1, hasAssessment: false, defaultExam: 8.0 },
      { id: 'art', name: 'التربية التشكيلية', coef: 1, hasAssessment: false, defaultExam: 9.0 },
      { id: 'spo', name: 'التربية البدنية والرياضية', coef: 1, hasAssessment: false, defaultExam: 9.5 },
    ]
  }
];

export const UNIVERSITY_CURRICULA: UniversityCurriculum[] = [
  {
    id: 'univ_l1_mi',
    faculty: 'كلية الرياضيات والإعلام الآلي',
    branch: 'ليسانس سنة أولى — رياضيات وإعلام آلي (L1 MI)',
    level: 'L1',
    semester: 'S1',
    modules: [
      { id: 'm1', name: 'تحليل رياضي 1 (Analyse 1)', coef: 4, credits: 6, td: 11, exam: 8, tdWeight: 0.40, examWeight: 0.60 },
      { id: 'm2', name: 'جبر 1 (Algèbre 1)', coef: 3, credits: 5, td: 12, exam: 9, tdWeight: 0.40, examWeight: 0.60 },
      { id: 'm3', name: 'خوارزميات وهياكل بيانات 1 (Algo)', coef: 4, credits: 6, td: 13, exam: 10, tdWeight: 0.40, examWeight: 0.60 },
      { id: 'm4', name: 'بنية الآلة 1 (Structure Machine)', coef: 2, credits: 4, td: 10, exam: 8, tdWeight: 0.40, examWeight: 0.60 },
      { id: 'm5', name: 'فيزياء 1 - ميكانيك النقطة المادية', coef: 2, credits: 4, td: 11, exam: 9, tdWeight: 0.40, examWeight: 0.60 },
      { id: 'm6', name: 'لغة إنجليزية تقنية 1', coef: 1, credits: 2, td: 14, exam: 14, tdWeight: 0.40, examWeight: 0.60 },
      { id: 'm7', name: 'تاريخ العلوم / مدخل للويب', coef: 1, credits: 3, td: 13, exam: 12, tdWeight: 0.40, examWeight: 0.60 },
    ]
  },
  {
    id: 'univ_l1_st',
    faculty: 'كلية العلوم والتكنولوجيا',
    branch: 'ليسانس سنة أولى — علوم وتكنولوجيا (L1 ST)',
    level: 'L1',
    semester: 'S1',
    modules: [
      { id: 'm1', name: 'رياضيات 1 (Math 1)', coef: 3, credits: 6, td: 11, exam: 8, tdWeight: 0.40, examWeight: 0.60 },
      { id: 'm2', name: 'فيزياء 1 (Physique 1)', coef: 3, credits: 6, td: 10, exam: 9, tdWeight: 0.40, examWeight: 0.60 },
      { id: 'm3', name: 'كيمياء 1 (Chimie 1)', coef: 3, credits: 6, td: 12, exam: 10, tdWeight: 0.40, examWeight: 0.60 },
      { id: 'm4', name: 'إعلام آلي 1 (Informatique 1)', coef: 2, credits: 4, td: 13, exam: 11, tdWeight: 0.40, examWeight: 0.60 },
      { id: 'm5', name: 'منهجية العمل والتحرير الجامعي', coef: 1, credits: 2, td: 13, exam: 12, tdWeight: 0.40, examWeight: 0.60 },
      { id: 'm6', name: 'لغة أجنبية (فرنسية / إنجليزية)', coef: 1, credits: 2, td: 14, exam: 14, tdWeight: 0.40, examWeight: 0.60 },
      { id: 'm7', name: 'علوم وتكنولوجيا المجتمع', coef: 1, credits: 4, td: 12, exam: 12, tdWeight: 0.40, examWeight: 0.60 },
    ]
  }
];
