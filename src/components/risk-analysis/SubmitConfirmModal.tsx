import React from "react";
import Button from "@/components/ui/Button";
import { SubmitConfirmModalProps } from "@/types/risk-analysis";

export default function SubmitConfirmModal({
  isOpen,
  onClose,
  onConfirm,
}: SubmitConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            Submit Confirmation?
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          Are you sure you want to submit the analysis? This action cannot be
          undone.
        </p>

        <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          <Button variant="secondary" onClick={onClose} className="sm:flex-1">
            No
          </Button>

          <Button onClick={onConfirm} className="sm:flex-1">
            Yes
          </Button>
        </div>
      </div>
    </div>
  );
}
