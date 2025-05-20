// src/components/prediction/ImageUploader.tsx
'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

interface ImageUploaderProps {
  onImageSelected: (file: File, preview: string) => void;
  isLoading: boolean;
  onSubmit: () => void;
}

export default function ImageUploader({ onImageSelected, isLoading, onSubmit }: ImageUploaderProps) {
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    
    setFile(selectedFile);
    
    const reader = new FileReader();
    reader.onloadend = () => {
      const preview = reader.result as string;
      setPreviewSrc(preview);
      onImageSelected(selectedFile, preview);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-gray-700 mb-2 font-medium">
          Upload MRI Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <p className="text-sm text-gray-500 mt-1">
          Upload a brain MRI scan image for analysis
        </p>
      </div>
      
      {previewSrc && (
        <div className="mt-4">
          <div className="w-full max-h-80 overflow-hidden rounded-lg flex items-center justify-center bg-gray-100">
            <img
              src={previewSrc}
              alt="Preview"
              className="max-h-80 object-contain"
            />
          </div>
        </div>
      )}
      
      <Button
        type="submit"
        isLoading={isLoading}
        disabled={!file || isLoading}
        className="w-full"
      >
        {isLoading ? 'Analyzing...' : 'Analyze MRI Image'}
      </Button>
    </form>
  );
}