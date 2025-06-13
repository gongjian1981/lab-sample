import React, { useState } from 'react';
import type { EvaluationRow } from '../Types/EvaluationTypes';
import { getEvaluationsForDate } from '../Services/filter-by-date';
import { deleteEvaluation } from '../Services/delete-evaluation';
import { saveOrUpdateEvaluation } from '../Services/save-or-update-evaluation';
import { loadEvaluationsFromStorage } from '../Services/evaluation-storage';

interface DailyViewProps {
  date: string;
  onBack: () => void;
}

export const COURSE_OPTIONS = ['INFO8171 - 2', 'SENG8051 - 2', 'SENG8061 - 2', 'SENG8071 - 2', 'SENG8130 - 2'];
export const EVALUATION_TYPE_OPTIONS = ['Assignment', 'Quiz', 'Midterm', 'Final'];

const DailyViewPage: React.FC<DailyViewProps> = ({
  date,
  onBack,
}) => {
  const filePath = null; // Replace with actual file path if needed
  const [data, setData] = useState<EvaluationRow[]>(loadEvaluationsFromStorage() || []);
  const [form, setForm] = useState<Partial<EvaluationRow>>({
    evaluation_id: '',
    course_code: '',
    evaluation_type: '',
    due_day: ''
  });

  const evaluationsForDate = getEvaluationsForDate(data, date);

  const handleDelete = (evaluation_id: string) => {
    if (!window.confirm('Are you sure you want to delete this evaluation?')) return;
    const updated = deleteEvaluation(data, evaluation_id, filePath);
    setData(updated);
  };

  const handleEdit = (evaluation_id: string) => {
    const ev = evaluationsForDate.find(e => e.evaluation_id === evaluation_id);
    if (!ev) {
      console.error('Evaluation not found for ID:', evaluation_id);
      return;
    }
    setForm(ev);
  };

  const handleSave = () => {
    if (!form.course_code || !form.evaluation_type ) {
      alert('Course and Type are required');
      return;
    }
    const confirmText = form.evaluation_id
      ? 'Are you sure you want to update this evaluation?'
      : 'Are you sure you want to add this new evaluation?';

    if (!window.confirm(confirmText)) return;

    const updated = saveOrUpdateEvaluation(data, form, date, filePath);
    setData(updated);
    setForm({ evaluation_id: '', course_code: '', evaluation_type: '', due_day: '' });
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-bold text-center">Evaluations on {date}</h2>

      <table className="w-full table-auto border border-collapse text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Course</th>
            <th className="border p-2">Type</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {evaluationsForDate.map((ev, idx) => (
            <tr key={idx} className="text-center">
              <td className="border p-2">{ev.course_code}</td>
              <td className="border p-2">{ev.evaluation_type}</td>
              <td className="border p-2 space-x-2">
                <button onClick={() => handleEdit(ev.evaluation_id)} className="text-blue-600">
                  Edit
                </button>
                <button onClick={() => handleDelete(ev.evaluation_id)} className="text-red-600">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="border p-4 rounded bg-gray-50 space-y-2">
        <h3 className="font-semibold">
          {form.evaluation_id ? 'Edit Evaluation' : 'Add New Evaluation'}
        </h3>

        <div className="flex flex-col sm:flex-row gap-2">
          <select
            className="border p-1 flex-1"
            value={form.course_code || ''}
            onChange={(e) => setForm({ ...form, course_code: e.target.value })}
          >
            <option value="">Select Course</option>
            {COURSE_OPTIONS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            className="border p-1 flex-1"
            value={form.evaluation_type || ''}
            onChange={(e) => setForm({ ...form, evaluation_type: e.target.value })}
          >
            <option value="">Select Type</option>
            {EVALUATION_TYPE_OPTIONS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div className="flex justify-center">
          <button
            className="bg-blue-600 text-white px-4 py-1 rounded"
            onClick={handleSave}
          >
            {form.evaluation_id ? 'Update' : 'Add'}
          </button>
        </div>
      </div>

      <div className="text-center">
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded"
          onClick={onBack}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default DailyViewPage;
