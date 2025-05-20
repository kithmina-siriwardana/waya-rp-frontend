// src/components/mri/ImageUploader.tsx
'use client';

import Button from '@/components/ui/Button';

interface ImageUploaderProps {
  preview: string | null;
  isAnalyzing: boolean;
  onImageSelected: (file: File, preview: string) => void;
  onAnalyze: () => void;
  onReset: () => void;
}

export default function ImageUploader({ 
  preview, 
  isAnalyzing, 
  onImageSelected, 
  onAnalyze, 
  onReset 
}: ImageUploaderProps) {
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    
    const reader = new FileReader();
    reader.onloadend = () => {
      const previewSrc = reader.result as string;
      onImageSelected(selectedFile, previewSrc);
    };
    reader.readAsDataURL(selectedFile);
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-semibold mb-4">Upload MRI Scan</h2>
      
      {!preview ? (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select MRI Image
          </label>
          <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Preview</h3>
            <button
              type="button"
              onClick={onReset}
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              Change Image
            </button>
          </div>
          <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={preview}
              alt="MRI Preview"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="mt-6">
            <Button
              type="button"
              onClick={onAnalyze}
              isLoading={isAnalyzing}
              disabled={isAnalyzing}
              className="w-full"
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze MRI Scan'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}