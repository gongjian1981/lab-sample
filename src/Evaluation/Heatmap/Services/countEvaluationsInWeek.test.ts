import { countEvaluationsInWeek } from './countEvaluationsInWeek';
import type { EvaluationItem } from './evaluation';

describe('countEvaluationsInWeek', () => {
  const mockData: EvaluationItem[] = [
    { evaluationId: '1', courseCode: 'C1', evaluationType: 'Assignment', dueDay: '2025-06-10' },
    { evaluationId: '2', courseCode: 'C1', evaluationType: 'Quiz',       dueDay: '2025-06-12' },
    { evaluationId: '3', courseCode: 'C2', evaluationType: 'Assignment', dueDay: '2025-06-18' },
    { evaluationId: '4', courseCode: 'C2', evaluationType: 'Quiz',       dueDay: 'invalid-date' },
  ];

  const week: Date[] = [
    new Date('2025-06-09'),
    new Date('2025-06-10'),
    new Date('2025-06-11'),
    new Date('2025-06-12'),
    new Date('2025-06-13'),
    new Date('2025-06-14'),
    new Date('2025-06-15'),
  ];

  it('counts evaluations whose dueDay is in the given week', () => {
    const result = countEvaluationsInWeek(mockData, week);
    expect(result).toBe(2);
  });

  it('returns 0 if no evaluations fall within the week', () => {
    const otherWeek = [
      new Date('2025-06-02'),
      new Date('2025-06-03'),
      new Date('2025-06-04'),
      new Date('2025-06-05'),
      new Date('2025-06-06'),
      new Date('2025-06-07'),
      new Date('2025-06-08'),
    ];
    const result = countEvaluationsInWeek(mockData, otherWeek);
    expect(result).toBe(0);
  });
});