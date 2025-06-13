import React from 'react';
import DailyViewPage from '../Evaluation/EvaluationDaily/Pages/DailyViewPage';
import { useNavigate, useSearchParams } from 'react-router-dom';

const DailyWrapper: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const date = searchParams.get('date');

  if (!date) {
    return (
      <div className="p-4 text-red-600">
        Missing date. Please navigate through the proper entry point.
        <button
          className="mt-4 px-4 py-2 bg-gray-600 text-white rounded"
          onClick={() => navigate('/')}
        >
          Back to Home
        </button>
      </div>
    );
  }

  // You’ll need to fetch or load `data`, `filePath`, and `onUpdate` here
  // For now, use placeholder/fallbacks or refactor if needed

  return (
    <DailyViewPage
      date={date}
      onBack={() => navigate(-1)}
    />
  );
};

export default {
  path: '/daily-view',
  element: <DailyWrapper />,
};
