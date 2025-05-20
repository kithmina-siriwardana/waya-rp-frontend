"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import AppLayout from "@/components/layout/AppLayout";
import ImageUploader from "@/components/mri/ImageUploader";
import ResultsPanel from "@/components/mri/ResultsPanel";
import InstructionsPanel from "@/components/mri/InstructionsPanel";
import { AnalysisResult } from "@/types";
import { apiService } from "@/services/apiService";

export default function MRIDetectionPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const { token } = useAuth();

  const handleImageSelected = (selectedFile: File, previewSrc: string) => {
    setFile(selectedFile);
    setPreview(previewSrc);
    setResults(null); // Clear previous results
  };

  const handleAnalyze = async () => {
    if (!file || !token) {
      setError(
        !token
          ? "Please log in to analyze images"
          : "Please select an image first"
      );
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    const response = await apiService.uploadMriScan(file, token);

    if (response.success && response.data) {
      console.log("Analysis results:", response.data);
      setResults(response.data);
    } else {
      setError(response.error || "An error occurred during analysis");
    }

    setIsAnalyzing(false);
  };

  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setResults(null);
  };

  const handleSaveResults = async () => {
    if (!results || !token) {
      setError(!token ? "Please log in to save results" : "No results to save");
      return;
    }

    const response = await apiService.saveResults(results, token);

    if (response.success) {
      alert("Results saved successfully to patient record");
    } else {
      setError(response.error || "Failed to save results");
    }
  };

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <AppLayout>
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              MRI-Based Alzheimer&apos;s Detection
            </h1>
            <p className="text-gray-600">
              Upload a brain MRI scan to analyze for signs of Alzheimer&apos;s
              disease
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* MRI Upload Panel */}
            <div className="md:col-span-2 bg-white rounded-lg shadow-md">
              <ImageUploader
                preview={preview}
                isAnalyzing={isAnalyzing}
                onImageSelected={handleImageSelected}
                onAnalyze={handleAnalyze}
                onReset={handleReset}
              />
            </div>

            {/* Instructions Panel */}
            <InstructionsPanel />
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Results Section */}
          {results && (
            <ResultsPanel
              results={results}
              onReset={handleReset}
              onSaveResults={handleSaveResults}
              onPrintReport={handlePrintReport}
            />
          )}
        </div>
      </div>
    </AppLayout>
  );
}
