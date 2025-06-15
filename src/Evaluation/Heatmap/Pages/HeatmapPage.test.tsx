import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeatmapPage from './HeatmapPage';
import type { EvaluationRow } from '../Services/evaluation';

const mockData: EvaluationRow[] = [
  {
    evaluationId: '1',
    courseCode: 'INFO8171-25S-S2',
    evaluationType: 'Assignment',
    dueDay: '2025-06-10',
  },
  {
    evaluationId: '2',
    courseCode: 'INFO8171-25S-S2',
    evaluationType: 'Quiz',
    dueDay: '2025-06-10',
  },
  {
    evaluationId: '3',
    courseCode: 'MATH1010-25S-S1',
    evaluationType: 'Assignment',
    dueDay: '2025-06-15',
  },
];

describe('HeatmapPage', () => {
  it('renders year and month dropdowns', () => {
    render(<HeatmapPage data={mockData} onNavigate={() => {}} />);
    expect(screen.getByRole('combobox', { name: /year/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /month/i })).toBeInTheDocument();
  });

  it('renders course dropdown with available course codes', () => {
    render(<HeatmapPage data={mockData} onNavigate={() => {}} />);
    expect(screen.getByRole('combobox', { name: /course/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'INFO8171-25S-S2' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'MATH1010-25S-S1' })).toBeInTheDocument();
  });

  it('renders calendar grid', () => {
    render(<HeatmapPage data={mockData} onNavigate={() => {}} />);
    expect(screen.getByText('Sun')).toBeInTheDocument();
    expect(screen.getByText('Mon')).toBeInTheDocument();
    expect(screen.getByText('Sat')).toBeInTheDocument();
  });

  it('renders evaluation item in the correct cell', () => {
    render(<HeatmapPage data={mockData} onNavigate={() => {}} />);
    
    expect(screen.getByText((_, node) =>
      node?.textContent === 'INFO8171-25S-S2 - Assignment'
    )).toBeInTheDocument();

    expect(screen.getByText((_, node) =>
      node?.textContent === 'INFO8171-25S-S2 - Quiz'
    )).toBeInTheDocument();

    expect(screen.getByText((_, node) =>
      node?.textContent === 'MATH1010-25S-S1 - Assignment'
    )).toBeInTheDocument();
  });
});