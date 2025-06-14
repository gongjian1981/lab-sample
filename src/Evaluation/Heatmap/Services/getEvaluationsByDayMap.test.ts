import { getEvaluationsByDayMap } from './getEvaluationsByDayMap';
import type { EvaluationItem } from './evaluation';

const mockData: EvaluationItem[] = [
  {
    evaluationId: '1',
    courseCode: 'INFO8171-25S-S2',
    evaluationType: 'Assignment',
    dueDay: '2025-06-10'
  },
  {
    evaluationId: '2',
    courseCode: 'INFO8171-25S-S2',
    evaluationType: 'Quiz',
    dueDay: '2025-06-10'
  },
  {
    evaluationId: '3',
    courseCode: 'MATH1010-25S-S1',
    evaluationType: 'Exam',
    dueDay: '2025-06-15'
  }
];

describe('getEvaluationsByDayMap', () => {
  it('groups evaluations by day of the month', () => {
    const result = getEvaluationsByDayMap(mockData, 2025, 6);

    expect(Object.keys(result).length).toBe(2);
    expect(result[10]).toHaveLength(2);
    expect(result[15]).toHaveLength(1);
  });

  it('returns empty object if no evaluation in month', () => {
    const result = getEvaluationsByDayMap(mockData, 2025, 7);
    expect(result).toEqual({});
  });
});