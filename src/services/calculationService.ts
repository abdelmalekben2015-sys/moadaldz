/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * محرك الحسابات الحتمي الدقيق لمنصة «معدل DZ»
 * 
 * يضمن:
 * 1. حسابات دقيقة وفق القواعد والمناشير الوزارية الجزائرية (2026/2027).
 * 2. منع القسمة على الصفر ومنع القيم السالبة أو المتجاوزة لـ 20.
 * 3. التعامل الحذر مع العلامات غير المكتملة دون تصفير غير مبرر.
 * 4. محرك اختبارات ذاتي مدمج للتأكد الدائم من سلامة العمليات.
 */

import { SubjectRule, UniversityModule, TestExecutionResult } from '../types';

export class CalculationService {
  /**
   * تقييد العلامة ضمن المجال [0, 20] والتدوير لرقمين عشريين
   */
  static clampMark(val: number | undefined | null): number | undefined {
    if (val === undefined || val === null || isNaN(val)) return undefined;
    if (val < 0) return 0;
    if (val > 20) return 20;
    return Math.round(val * 100) / 100;
  }

  /**
   * حساب معدل المادة الواحدة وفق النظام المدرسي الجزائري:
   * - مع التقويم: (التقويم + الفرض + الاختبار × 2) ÷ 4
   * - إذا وُجد فرضان: يُحسب متوسط الفرضين أولاً: (الفرض1 + الفرض2) ÷ 2
   * - بدون تقويم: (الفرض + الاختبار × 2) ÷ 3
   */
  static calculateSubjectAverage(subj: {
    hasAssessment: boolean;
    hasTest2?: boolean;
    assessment?: number;
    test1?: number;
    test2?: number;
    exam?: number;
  }): number | undefined {
    // الاختبار إلزامي لإصدار المعدل الفصلي للمادة
    if (subj.exam === undefined || isNaN(subj.exam)) {
      return undefined;
    }

    const exam = Math.max(0, Math.min(20, subj.exam));
    const test1 = Math.max(0, Math.min(20, subj.test1 ?? 10));

    let testsAvg = test1;
    if (subj.hasTest2 && subj.test2 !== undefined && !isNaN(subj.test2)) {
      const test2 = Math.max(0, Math.min(20, subj.test2));
      testsAvg = (test1 + test2) / 2;
    }

    if (subj.hasAssessment) {
      const assessment = Math.max(0, Math.min(20, subj.assessment ?? 10));
      // المعادلة الرسمية للطورين المتوسط والثانوي
      const avg = (assessment + testsAvg + exam * 2) / 4;
      return Math.round(avg * 100) / 100;
    } else {
      // للمواد بدون تقويم مستمر
      const avg = (testsAvg + exam * 2) / 3;
      return Math.round(avg * 100) / 100;
    }
  }

  /**
   * حساب المعدل الفصلي الإجمالي
   */
  static calculateTrimesterTotal(subjects: SubjectRule[]): {
    average: number;
    totalWeightedPoints: number;
    totalCoef: number;
    completedSubjectsCount: number;
    totalSubjectsCount: number;
    isComplete: boolean;
    explanation: string;
  } {
    let totalWeightedPoints = 0;
    let totalCoef = 0;
    let completedCount = 0;

    for (const sub of subjects) {
      const coef = Math.max(0.5, sub.coef || 1);
      const subAvg = this.calculateSubjectAverage({
        hasAssessment: sub.hasAssessment,
        hasTest2: sub.hasTest2,
        assessment: sub.defaultAssessment,
        test1: sub.defaultTest1,
        test2: sub.defaultTest2,
        exam: sub.defaultExam,
      });

      if (subAvg !== undefined) {
        totalWeightedPoints += subAvg * coef;
        totalCoef += coef;
        completedCount++;
      }
    }

    // تجنب القسمة على صفر تماماً
    const average = totalCoef > 0 ? totalWeightedPoints / totalCoef : 0;
    const roundedAvg = Math.round(average * 100) / 100;

    return {
      average: roundedAvg,
      totalWeightedPoints: Math.round(totalWeightedPoints * 100) / 100,
      totalCoef: Math.round(totalCoef * 10) / 10,
      completedSubjectsCount: completedCount,
      totalSubjectsCount: subjects.length,
      isComplete: completedCount === subjects.length && subjects.length > 0,
      explanation: totalCoef > 0
        ? `المجموع الموزون (${Math.round(totalWeightedPoints * 100) / 100}) ÷ مجموع المعاملات (${totalCoef}) = ${roundedAvg}`
        : 'يرجى إدخال علامات المواد المعتمدة لحساب المعدل.'
    };
  }

  /**
   * حساب معدل الاستدراك وفق القاعدة الرسمية في الجزائر:
   * قاعدة «الاحتفاظ بالنقطة الأفضل لصالح التلميذ»:
   * EffectiveMark = MAX(Original_Annual_Mark, Rattrapage_Mark)
   */
  static calculateRattrapageSimulation(
    subjects: Array<{
      id: string;
      name: string;
      coef: number;
      originalMark: number;
      rattrapageMark?: number;
    }>,
    passingThreshold = 10.0
  ): {
    originalAverage: number;
    simulatedAverage: number;
    gain: number;
    totalCoef: number;
    isPassed: boolean;
    qualifyingSubjectsCount: number;
    improvedSubjectsCount: number;
  } {
    let originalWeightedSum = 0;
    let simulatedWeightedSum = 0;
    let totalCoef = 0;
    let qualifyingCount = 0;
    let improvedCount = 0;

    for (const s of subjects) {
      const coef = Math.max(0.5, s.coef || 1);
      const orig = Math.max(0, Math.min(20, s.originalMark));

      if (orig < passingThreshold) {
        qualifyingCount++;
      }

      // تطبيق قاعدة MAX الرسمية
      const rattrapage = s.rattrapageMark !== undefined && !isNaN(s.rattrapageMark)
        ? Math.max(0, Math.min(20, s.rattrapageMark))
        : orig;

      const effective = Math.max(orig, rattrapage);
      if (effective > orig) {
        improvedCount++;
      }

      originalWeightedSum += orig * coef;
      simulatedWeightedSum += effective * coef;
      totalCoef += coef;
    }

    const origAvg = totalCoef > 0 ? originalWeightedSum / totalCoef : 0;
    const simAvg = totalCoef > 0 ? simulatedWeightedSum / totalCoef : 0;
    const roundedOrig = Math.round(origAvg * 100) / 100;
    const roundedSim = Math.round(simAvg * 100) / 100;
    const gain = Math.round((roundedSim - roundedOrig) * 100) / 100;

    return {
      originalAverage: roundedOrig,
      simulatedAverage: roundedSim,
      gain,
      totalCoef: Math.round(totalCoef * 10) / 10,
      isPassed: roundedSim >= passingThreshold,
      qualifyingSubjectsCount: qualifyingCount,
      improvedSubjectsCount: improvedCount
    };
  }

  /**
   * الحاسبة المعكوسة: «ما العلامة التي أحتاجها للنجاح؟»
   * لحساب علامة الاختبار أو الاستدراك المطلوبة بدقة:
   * 
   * المطلوب الوصول لمعدل عام T
   * مجموع النقاط المطلوب = T × إجمالي المعاملات
   * النقاط المطلوبة من المادة المستهدفة = المجموع المطلوب - مجموع نقاط باقي المواد
   * معدل المادة المستهدف S_req = النقاط المطلوبة ÷ معامل المادة المستهدفة
   * ثم من صيغة المادة: (التقويم + الفرض + الاختبار × 2) ÷ 4 = S_req
   * إذن: الاختبار = ((S_req × 4) - التقويم - الفرض) ÷ 2
   */
  static calculateTargetExamGrade(params: {
    targetAverage: number;
    currentAverageExcludingSubject: number;
    sumCoefsOther: number;
    targetSubjectCoef: number;
    assessmentMark?: number;
    testMark?: number;
    hasAssessment?: boolean;
  }): {
    requiredExamMark: number;
    targetSubjectAverage: number;
    isPossible: boolean;
    status: 'already_achieved' | 'achievable' | 'impossible';
    message: string;
  } {
    const {
      targetAverage,
      currentAverageExcludingSubject,
      sumCoefsOther,
      targetSubjectCoef,
      assessmentMark = 10,
      testMark = 10,
      hasAssessment = true
    } = params;

    const coefTarget = Math.max(0.5, targetSubjectCoef);
    const totalCoef = sumCoefsOther + coefTarget;

    const requiredTotalPoints = targetAverage * totalCoef;
    const pointsFromOthers = currentAverageExcludingSubject * sumCoefsOther;
    const neededSubjectPoints = requiredTotalPoints - pointsFromOthers;
    const targetSubjectAvg = neededSubjectPoints / coefTarget;

    let requiredExam: number;
    if (hasAssessment) {
      // (Assessment + Test + Exam * 2) / 4 = Target
      // Exam = (Target * 4 - Assessment - Test) / 2
      requiredExam = ((targetSubjectAvg * 4) - assessmentMark - testMark) / 2;
    } else {
      // (Test + Exam * 2) / 3 = Target
      // Exam = (Target * 3 - Test) / 2
      requiredExam = ((targetSubjectAvg * 3) - testMark) / 2;
    }

    const roundedExam = Math.round(requiredExam * 100) / 100;
    const roundedTargetSubj = Math.round(targetSubjectAvg * 100) / 100;

    if (roundedExam <= 0) {
      return {
        requiredExamMark: 0,
        targetSubjectAverage: roundedTargetSubj,
        isPossible: true,
        status: 'already_achieved',
        message: 'مبروك! رصيدك في بقية المواد والتقويم كافٍ لتحقيق هدفك حتى دون أي نقطة في الاختبار (0/20).'
      };
    }

    if (roundedExam > 20) {
      return {
        requiredExamMark: roundedExam,
        targetSubjectAverage: roundedTargetSubj,
        isPossible: false,
        status: 'impossible',
        message: `الهدف غير ممكن حسابياً؛ يتطلب تحصيل علامة ${roundedExam}/20 في الاختبار وهي تتجاوز الحد الأقصى (20/20). ننصح برفع أهداف المواد الأخرى ذات المعامل المرتفع.`
      };
    }

    return {
      requiredExamMark: roundedExam,
      targetSubjectAverage: roundedTargetSubj,
      isPossible: true,
      status: 'achievable',
      message: `تحتاج إلى الحصول على ${roundedExam}/20 على الأقل في الاختبار لتحقيق هدفك بمعدل عام ${targetAverage}/20.`
    };
  }

  /**
   * حساب السداسي في النظام الجامعي الجزائري LMD:
   * - معدل المقياس = (التقييم المستمر TD × tdWeight) + (امتحان السداسي × examWeight)
   *   (النسب الافتراضية 40% TD و60% Exam)
   * - في الاستدراك الجامعي: يُؤخذ MAX(امتحان أولي, امتحان استدراك)
   * - قاعدة التعويض (Compensation): إذا كان معدل السداسي >= 10/20، يُكتسب السداسي بالكامل وتُمنح كافة الأرصدة (30 رصيداً).
   */
  static calculateUniversitySemester(modules: UniversityModule[]): {
    semesterAverage: number;
    totalWeightedPoints: number;
    totalCoef: number;
    totalCredits: number;
    acquiredCredits: number;
    isSemesterPassed: boolean;
    compensationApplied: boolean;
    moduleResults: Array<{
      id: string;
      name: string;
      average: number;
      effectiveExam: number;
      isPassed: boolean;
      credits: number;
    }>;
  } {
    let totalWeightedPoints = 0;
    let totalCoef = 0;
    let totalCredits = 0;
    let acquiredIndividualCredits = 0;

    const moduleResults = modules.map(m => {
      const coef = Math.max(1, m.coef);
      const credits = Math.max(1, m.credits);
      const tdWeight = m.tdWeight ?? 0.40;
      const examWeight = m.examWeight ?? 0.60;

      const td = Math.max(0, Math.min(20, m.td ?? 10));
      const initialExam = Math.max(0, Math.min(20, m.exam ?? 10));
      const rattrapage = m.rattrapage !== undefined ? Math.max(0, Math.min(20, m.rattrapage)) : initialExam;
      const effectiveExam = Math.max(initialExam, rattrapage);

      const modAvg = Math.round(((td * tdWeight) + (effectiveExam * examWeight)) * 100) / 100;
      const isPassed = modAvg >= 10;

      totalWeightedPoints += modAvg * coef;
      totalCoef += coef;
      totalCredits += credits;

      if (isPassed) {
        acquiredIndividualCredits += credits;
      }

      return {
        id: m.id,
        name: m.name,
        average: modAvg,
        effectiveExam,
        isPassed,
        credits
      };
    });

    const semesterAvg = totalCoef > 0 ? totalWeightedPoints / totalCoef : 0;
    const roundedAvg = Math.round(semesterAvg * 100) / 100;
    const isSemesterPassed = roundedAvg >= 10.0;

    // مبدأ التعويض LMD الجزائري: إذا كان السداسي >= 10، يكتسب الطالب الـ 30 رصيداً كاملة
    const acquiredCredits = isSemesterPassed ? totalCredits : acquiredIndividualCredits;

    return {
      semesterAverage: roundedAvg,
      totalWeightedPoints: Math.round(totalWeightedPoints * 100) / 100,
      totalCoef,
      totalCredits,
      acquiredCredits,
      isSemesterPassed,
      compensationApplied: isSemesterPassed && acquiredIndividualCredits < totalCredits,
      moduleResults
    };
  }

  /**
   * تشغيل فاحص محرك الحسابات الآلي المدمج (Self-Diagnostic Test Suite)
   * يختبر حالات عادية، حالات حدية، تصفير، قيم خارج المجال، وحسابات الاستدراك والهدف المعكوس.
   */
  static runEngineDiagnosticTests(): TestExecutionResult[] {
    const results: TestExecutionResult[] = [];

    // اختبار 1: حساب مادة متوسط قياسية: تقويم 14، فرض 12، اختبار 10
    // (14 + 12 + 10*2) / 4 = 46 / 4 = 11.5
    const t1 = this.calculateSubjectAverage({
      hasAssessment: true,
      assessment: 14,
      test1: 12,
      exam: 10
    });
    results.push({
      testId: 'TEST-01',
      name: 'حساب معدل مادة قياسي بالتقويم (14 + 12 + 10*2)/4',
      category: 'المعدل الفصلي',
      expected: 11.5,
      actual: t1 ?? 0,
      passed: t1 === 11.5,
      details: 'التأكد من مطابقة معادلة الطور المتوسط الرسمية بدقة'
    });

    // اختبار 2: تقييد العلامات المتجاوزة لـ 20
    const clampedUpper = this.clampMark(25);
    results.push({
      testId: 'TEST-02',
      name: 'تقييد العلامات فوق 20 (Clamping Max)',
      category: 'سلامة الإدخال',
      expected: 20,
      actual: clampedUpper ?? 0,
      passed: clampedUpper === 20,
      details: 'منع إدخال علامات تتجاوز 20/20'
    });

    // اختبار 3: تقييد العلامات السالبة
    const clampedLower = this.clampMark(-5);
    results.push({
      testId: 'TEST-03',
      name: 'تقييد العلامات السالبة (Clamping Min)',
      category: 'سلامة الإدخال',
      expected: 0,
      actual: clampedLower ?? 0,
      passed: clampedLower === 0,
      details: 'منع القيم السالبة وتصفيرها بأمان'
    });

    // اختبار 4: حماية القسمة على صفر عند غياب المعاملات
    const zeroDivTest = this.calculateTrimesterTotal([]);
    results.push({
      testId: 'TEST-04',
      name: 'حماية منع القسمة على صفر (Empty Subjects Guard)',
      category: 'سلامة العمليات',
      expected: 0,
      actual: zeroDivTest.average,
      passed: zeroDivTest.average === 0 && !isNaN(zeroDivTest.average),
      details: 'ضمان عدم ظهور NaN أو انقطاع التطبيق عند عدم توفر مواد'
    });

    // اختبار 5: قاعدة الاستدراك MAX(Original, Rattrapage)
    // إذا حصل التلميذ في الاستدراك على 7 وعلامته السابقة كانت 8، يجب الاحتفاظ بـ 8
    const rattrapageLesser = this.calculateRattrapageSimulation([
      { id: 'm1', name: 'رياضيات', coef: 2, originalMark: 8, rattrapageMark: 7 }
    ]);
    results.push({
      testId: 'TEST-05',
      name: 'قاعدة عدم إنقاص نقطة التلميذ في الاستدراك MAX(8, 7) = 8',
      category: 'قواعد الاستدراك',
      expected: 8,
      actual: rattrapageLesser.simulatedAverage,
      passed: rattrapageLesser.simulatedAverage === 8,
      details: 'حماية معدل التلميذ عند كون نقطة الاستدراك أقل من النقطة السابقة'
    });

    // اختبار 6: نجاح الاستدراك عند رفع النقطة
    // أصل: 8، استدراك: 14، معامل 2 -> المعدل الجديد 14
    const rattrapageHigher = this.calculateRattrapageSimulation([
      { id: 'm1', name: 'رياضيات', coef: 2, originalMark: 8, rattrapageMark: 14 }
    ]);
    results.push({
      testId: 'TEST-06',
      name: 'ترقية المعدل عند تحسين علامة الاستدراك MAX(8, 14) = 14',
      category: 'قواعد الاستدراك',
      expected: 14,
      actual: rattrapageHigher.simulatedAverage,
      passed: rattrapageHigher.simulatedAverage === 14,
      details: 'حساب أثر تحسين نقطة الاستدراك بشكل صحيح'
    });

    // اختبار 7: الحاسبة المعكوسة - هدف ممكن
    // نريد معدل 10 في مادة معاملها 2 مع تقويم 10 وفرض 10
    // (10 + 10 + Exam*2)/4 = 10 => 20 + 2*Exam = 40 => Exam = 10
    const targetPossible = this.calculateTargetExamGrade({
      targetAverage: 10,
      currentAverageExcludingSubject: 10,
      sumCoefsOther: 10,
      targetSubjectCoef: 2,
      assessmentMark: 10,
      testMark: 10,
      hasAssessment: true
    });
    results.push({
      testId: 'TEST-07',
      name: 'الحاسبة المعكوسة: تحديد نقطة الاختبار بدقة حسابية',
      category: 'الحاسبة المعكوسة',
      expected: 10,
      actual: targetPossible.requiredExamMark,
      passed: targetPossible.requiredExamMark === 10 && targetPossible.isPossible,
      details: 'حل المعادلة العكسية للمعدل الموزون بدقة متناهية'
    });

    // اختبار 8: الحاسبة المعكوسة - هدف مستحيل (> 20)
    // إذا كان معدل بقية المواد 2 من 20 والمعاملات الأخرى عالية والهدف 18
    const targetImpossible = this.calculateTargetExamGrade({
      targetAverage: 18,
      currentAverageExcludingSubject: 5,
      sumCoefsOther: 20,
      targetSubjectCoef: 1,
      assessmentMark: 5,
      testMark: 5,
      hasAssessment: true
    });
    results.push({
      testId: 'TEST-08',
      name: 'كشف الأهداف المستحيلة حسابياً وإشعار المستخدم',
      category: 'الحاسبة المعكوسة',
      expected: false,
      actual: targetImpossible.isPossible,
      passed: !targetImpossible.isPossible && targetImpossible.status === 'impossible',
      details: 'منع تقديم وعود كاذبة بالنجاح إذا كانت العلامة المطلوبة فوق 20'
    });

    // اختبار 9: مبدأ التعويض الجامعي LMD
    // سداسي بمقياسين: الأول 12 والثاني 8 بمعاملات متساوية -> المعدل 10/20، الأرصدة المكتسبة 30 بالتعويض
    const univCompensation = this.calculateUniversitySemester([
      { id: 'm1', name: 'تحليل', coef: 2, credits: 15, td: 12, exam: 12 }, // avg 12
      { id: 'm2', name: 'جبر', coef: 2, credits: 15, td: 8, exam: 8 }      // avg 8
    ]);
    results.push({
      testId: 'TEST-09',
      name: 'التعويض التلقائي للأرصدة LMD عند تجاوز معدل السداسي 10/20',
      category: 'النظام الجامعي',
      expected: true,
      actual: univCompensation.isSemesterPassed && univCompensation.acquiredCredits === 30,
      passed: univCompensation.isSemesterPassed && univCompensation.acquiredCredits === 30,
      details: 'اكتساب جميع أرصدة السداسي بالتعويض حتى للمقاييس التي تقل عن 10'
    });

    return results;
  }
}
