import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CsvUploadButton } from '../../../CsvHandler/CsvUploadButton';
import { saveUploadedStudentData } from '../Services/uploadCsv';
import type { Student } from '../../Student/Services/StudentInfo';

const UploadPage = () => {
  const [fileName, setFileName] = useState('');
  const navigate = useNavigate();

  // Called after successful CSV upload
  const handleUpload = (data: Student[], fileName: string) => {
    saveUploadedStudentData(data, fileName); // Save data to local storage
    setFileName(fileName);
    navigate('/students'); // Navigate to student list page
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 relative flex items-center justify-center">

      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Upload CSV For Evaluation
        </h2>

        {/* Upload button component */}
        <CsvUploadButton<Student> onUpload={handleUpload} />

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
