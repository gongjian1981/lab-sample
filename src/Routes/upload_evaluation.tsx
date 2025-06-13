import React from 'react';
import UploadPage from '../Evaluation/Upload/Pages/UploadPage';
import { useNavigate } from 'react-router-dom';
import type { EvaluationRow } from '../Evaluation/Upload/Types/EvaluationTypes';

interface UploadRouteProps {
  onSuccess: (data: EvaluationRow[], filePath: string) => void;
}

const UploadWrapper: React.FC = () => {
  const navigate = useNavigate();

  const handleSuccess = (data: EvaluationRow[], filePath: string) => {
    // Placeholder: replace with real navigation logic
    console.log('File loaded:', filePath);
    console.log('Parsed rows:', data);
    navigate('/');
  };

  return <UploadPage onSuccess={handleSuccess} />;
};

export default {
  path: '/upload-evaluation',
  element: <UploadWrapper />,
};
