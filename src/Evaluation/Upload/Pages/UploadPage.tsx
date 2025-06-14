import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CsvUploadButton } from '../../../CsvHandler/CsvUploadButton';
import { saveUploadedEvaluationData } from '../Services/uploadCsv';
import type { EvaluationRow } from '../../Heatmap/Services/evaluation';

const UploadPage = () => {
  const [fileName, setFileName] = useState('');
  const navigate = useNavigate();

  // Called after successful CSV upload
  const handleUpload = (data: EvaluationRow[], fileName: string) => {
    saveUploadedEvaluationData(data, fileName); // Save data to local storage
    setFileName(fileName);
    navigate('/heatmap'); // Navigate to heatmap page
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 relative flex items-center justify-center">
      {/* Return button in top-right */}
      <button
        onClick={() => navigate('/heatmap')}
        className="absolute top-4 right-4 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded shadow"
      >
        ← Return to Heatmap
      </button>

      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Upload CSV For Evaluation
        </h2>

        {/* Upload button component */}
        <CsvUploadButton<EvaluationRow> onUpload={handleUpload} />

        {/* Display uploaded file name */}
        {fileName && (
          <p className="text-sm text-green-600 mt-4 text-center">
            Uploaded: {fileName}
          </p>
        )}
      </div>
    </div>
  );
};

export default UploadPage;
