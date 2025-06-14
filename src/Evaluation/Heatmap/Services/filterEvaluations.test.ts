import { filterEvaluationsByMonth } from './filterEvaluations';
import type { EvaluationRow } from './evaluation';

describe('filterEvaluationsByMonth', () => {
  const mockData: EvaluationRow[] = [
    {
      evaluationId: '1',
      courseCode: 'INFO8171-25S-S2',
      evaluationType: 'Assignment',
      dueDay: '2025-06-15',
    },
    {
      evaluationId: '2',
      courseCode: 'INFO8171-25S-S2',
      evaluationType: 'Quiz',
      dueDay: '2025-07-10',
    },
    {
      evaluationId: '3',
      courseCode: 'MATH1010-25S-S1',
      evaluationType: 'Assignment',
      dueDay: '2025-06-05',
    },
  ];

  it('filters evaluations by year and month', () => {
    const result = filterEvaluationsByMonth(mockData, 2025, 6);
    expect(result.length).toBe(2);
    expect(result.map(e => e.evaluationId)).toContain('1');
    expect(result.map(e => e.evaluationId)).toContain('3');
  });

  it('returns empty array if no matches found', () => {
    const result = filterEvaluationsByMonth(mockData, 2024, 6);
    expect(result.length).toBe(0);
  });
});