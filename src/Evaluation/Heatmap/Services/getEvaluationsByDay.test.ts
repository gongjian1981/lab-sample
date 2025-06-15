import { getEvaluationsByDay } from './getEvaluationsByDay';
import type { EvaluationItem } from './evaluation';

describe('getEvaluationsByDay', () => {
  const mockData: EvaluationItem[] = [
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
      dueDay: '2025-06-15',
    },
    {
      evaluationId: '3',
      courseCode: 'MATH1010-25S-S1',
      evaluationType: 'Assignment',
      dueDay: '2025-06-16',
    },
  ];

  it('returns all evaluations on the specified day', () => {
    const result = getEvaluationsByDay(mockData, '2025-06-15');
    expect(result.length).toBe(2);
    expect(result.map(e => e.evaluationId)).toContain('1');
    expect(result.map(e => e.evaluationId)).toContain('2');
  });

  it('returns an empty array if no evaluations on that day', () => {
    const result = getEvaluationsByDay(mockData, '2025-06-17');
    expect(result.length).toBe(0);
  });
});