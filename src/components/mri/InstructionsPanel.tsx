// src/components/mri/InstructionsPanel.tsx
export default function InstructionsPanel() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">How It Works</h2>
      <div className="space-y-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600">
              1
            </div>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">Upload</h3>
            <p className="mt-1 text-sm text-gray-500">
              Upload a T1-weighted MRI scan image of the brain (axial, coronal,
              or sagittal view).
            </p>
          </div>
        </div>
        <div className="flex">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600">
              2
            </div>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">Analyze</h3>
            <p className="mt-1 text-sm text-gray-500">
              Our AI model will analyze the MRI scan for biomarkers associated
              with Alzheimer&apos;s disease.
            </p>
          </div>
        </div>
        <div className="flex">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600">
              3
            </div>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">Results</h3>
            <p className="mt-1 text-sm text-gray-500">
              View the analysis results, including the prediction and confidence
              score.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-yellow-50 rounded-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-yellow-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">Disclaimer</h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>
                This tool is for research purposes only and is not a substitute
                for professional medical advice. Always consult with a qualified
                healthcare provider for diagnosis and treatment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
