import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { EvaluationItem } from '../Types/evaluation';
import { getEvaluationsByDayMap } from '../Services/get-evaluations-by-day-map';
import { getCalendarRange, formatDateToYYYYMMDD, formatDayLabel} from '../Services/calendar-tool';
import { loadEvaluationsFromStorage } from '../Services/evaluation-storage';
import { isCurrentMonth, shouldHighlightWeek } from '../Services/evaluation-layout';


const HeatmapPage: React.FC = () => {
  const navigate = useNavigate();
  const now = new Date();

  const [localData, setLocalData] = useState<EvaluationItem[]>([]);
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1);
  const [selectedCourse, setSelectedCourse] = useState('');

  useEffect(() => {
    const cached = loadEvaluationsFromStorage();
    setLocalData(cached);
  }, []);

  const courses = Array.from(new Set(localData.map(d => d.course_code)));
  const filteredData = selectedCourse
    ? localData.filter(item => item.course_code === selectedCourse)
    : localData;
  const dateRange = getCalendarRange(selectedYear, selectedMonth);
  const startDate = dateRange[0];
  const endDate = dateRange[dateRange.length - 1];
  const evaluationsByDay = getEvaluationsByDayMap(filteredData, startDate, endDate);
  const calendarDates = getCalendarRange(selectedYear, selectedMonth);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Evaluation Heatmap</h1>

      {/* Controls */}
      <div className="flex space-x-4 mb-4">
        <label>
          Year
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="ml-2 border p-2"
          >
            {[2024, 2025].map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </label>

        <label>
          Month
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className="ml-2 border p-2"
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </label>

        <label>
          Course
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="ml-2 border p-2"
          >
            <option value="">All</option>
            {courses.map(course => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
        </label>

        <button
          onClick={() => navigate('/upload-evaluation')}
          className="ml-auto bg-blue-600 text-white px-4 py-2 rounded"
        >
          Go to Upload
        </button>
      </div>

      {/* Calendar Table */}
      {localData.length === 0 ? (
        <p className="text-red-500 text-center mt-10">
          No data available. Please upload a CSV file first.
        </p>
      ) : (
        <table className="table-fixed w-full border-collapse">
          <thead>
            <tr>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                <th key={day} className="border p-2 bg-gray-100">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(() => {
              const rows: React.ReactElement[] = [];
              let cells: React.ReactElement[] = [];
              let weekEvaluations: number = 0;

              calendarDates.forEach((date, index) => {
                const dayString = formatDateToYYYYMMDD(date);
                const weekday = (date.getDay() + 6) % 7;
                const isCurrent = isCurrentMonth(date, selectedMonth);

                const dayEvals = evaluationsByDay[dayString] || [];

                weekEvaluations += dayEvals.length;

                cells.push(
                  <td
                    key={date.toISOString()}
                    className={`border p-2 align-top ${!isCurrent ? 'bg-gray-100 text-gray-400' : ''}`}
                    onClick={() => navigate(`/daily-view?date=${dayString}`)}
                  >
                    <div className="font-bold">{formatDayLabel(date, selectedMonth)}</div>
                    {dayEvals.map((item, idx) => (
                      <div key={idx}>{`${item.course_code} - ${item.evaluation_type}`}</div>
                    ))}
                  </td>
                );

                if (weekday === 6 || index === calendarDates.length - 1) {
                  const highlight = shouldHighlightWeek(weekEvaluations);
                  rows.push(
                    <tr key={`week-${date.toISOString()}`} className={highlight ? 'bg-red-200' : ''}>
                      {cells}
                    </tr>
                  );
                  cells = [];
                  weekEvaluations = 0;
                }
              });

              return rows;
            })()}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HeatmapPage;
