import React, { useRef } from 'react';
import { CsvFileService } from './CsvFileService';

interface CsvUploadButtonProps<T> {
  onUpload: (data: T[], fileName: string) => void;
  label?: string;
  accept?: string;
}

// Generic CSV upload button component
export function CsvUploadButton<T>({
  onUpload,
  label = 'Upload',
  accept = '.csv',
}: CsvUploadButtonProps<T>) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Triggered when user selects a file
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const csvService = new CsvFileService();
    const data = await csvService.loadDataFromFile<T>(file);
    onUpload(data, file.name);

    // Reset input to allow re-uploading the same file
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="text-center mt-4">
      {/* Hidden file input */}
      <input
        id="csvUploadHidden"
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Styled label as button to trigger file input */}
      <label
        htmlFor="csvUploadHidden"
        className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
      >
        {label}
      </label>
    </div>
  );
}
