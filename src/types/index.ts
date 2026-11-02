/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * أنواع البيانات الموحدة لمنصة «معدل DZ — حاسبة المعدلات والاستدراك»
 */

export type EducationCycle = 'primary' | 'middle' | 'secondary' | 'university';

export interface SubjectRule {
  id: string;
  name: string;
  coef: number;
  hasAssessment: boolean;
  hasTest2?: boolean;
  assessmentLabel?: string; // مثلاً: التقويم المستمر
  testLabel?: string;       // مثلاً: الفرض الأول
  test2Label?: string;      // مثلاً: الفرض الثاني
  examLabel?: string;       // مثلاً: الاختبار الفصلي
  defaultAssessment?: number;
  defaultTest1?: number;
  defaultTest2?: number;
  defaultExam?: number;
  rattrapage?: number;
}

export interface LevelCurriculum {
  id: string;
  name: string;
  cycle: EducationCycle;
  streamName?: string; // الشعبة إن وجدت
  passingGrade: number; // عادة 10/20 أو 5/10 للابتدائي
  scaleMax: number;     // 20
  rattrapageThreshold: number; // عادة 10
  subjects: SubjectRule[];
  sourceReference: string;
  validationStatus: 'verified' | 'provisional' | 'review_needed';
  ruleDescription: string;
}

export interface UniversityModule {
  id: string;
  name: string;
  code?: string;
  coef: number;
  credits: number;
  td?: number;
  exam?: number;
  rattrapage?: number;
  tdWeight?: number;   // الافتراضي 0.40
  examWeight?: number; // الافتراضي 0.60
}

export interface UniversityCurriculum {
  id: string;
  faculty: string;
  branch: string;
  level: string; // L1, L2, L3, M1, M2
  semester: 'S1' | 'S2';
  modules: UniversityModule[];
}

export interface ValidationRuleItem {
  id: string;
  cycle: EducationCycle;
  title: string;
  level: string;
  formulaDescription: string;
  status: 'verified' | 'provisional' | 'review_needed';
  officialSource: string;
  decreeNumber?: string;
  effectiveYear: string;
  lastAuditedDate: string;
  notes?: string;
}

export interface SavedResult {
  id: string;
  title: string;
  date: string;
  cycle: EducationCycle;
  levelName: string;
  average: number;
  totalWeightedPoints: number;
  totalCoef: number;
  isPassed: boolean;
  type: 'trimester' | 'annual' | 'rattrapage' | 'university';
  subjectsSnapshot: Array<{
    name: string;
    coef: number;
    mark: number;
    rattrapageMark?: number;
  }>;
}

export interface TestExecutionResult {
  testId: string;
  name: string;
  category: string;
  expected: number | boolean | string;
  actual: number | boolean | string;
  passed: boolean;
  details: string;
}
