"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import AppLayout from "@/components/layout/AppLayout";
import EmotionDetectionPanel from "@/components/emotion/EmotionDetectionPanel";
import EmotionHistoryPanel from "@/components/emotion/EmotionHistoryPanel";

export default function EmotionRecognitionPage() {
  const [activeTab, setActiveTab] = useState<"detect" | "history">("detect");
  const { user } = useAuth();

  return (
    <AppLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Emotion Recognition
        </h1>
        <p className="text-gray-600">
          Detect emotions from facial expressions or speech patterns to assist
          in patient care
        </p>
      </div>

      <div className="px-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("detect")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "detect"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Detection
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "history"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              History
            </button>
          </nav>
        </div>
      </div>

      {activeTab === "detect" ? (
        <EmotionDetectionPanel />
      ) : (
        <EmotionHistoryPanel />
      )}
    </AppLayout>
  );
}
