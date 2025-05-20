import React, { JSX } from "react";
import Button from "@/components/ui/Button";

interface EmotionResultProps {
  results: {
    emotion: string;
    confidence: string;
    details: {
      secondaryEmotions: { name: string; value: string }[];
      response: string;
      recommendations: string;
    };
  };
}

export default function EmotionResultsPanel({ results }: EmotionResultProps) {
  const getEmotionColor = (emotion: string) => {
    const emotionColors: Record<
      string,
      { bg: string; text: string; icon: JSX.Element }
    > = {
      Happy: {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-yellow-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm2-2a1 1 0 11-2 0 1 1 0 012 0zm5 3a1 1 0 01-1 1h-4a1 1 0 110-2h4a1 1 0 011 1z"
              clipRule="evenodd"
            />
          </svg>
        ),
      },
      Sad: {
        bg: "bg-blue-100",
        text: "text-blue-800",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-blue-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm2-2a1 1 0 11-2 0 1 1 0 012 0zm4 8a1 1 0 01-1-1v-1a1 1 0 112 0v1a1 1 0 01-1 1z"
              clipRule="evenodd"
            />
          </svg>
        ),
      },
      Angry: {
        bg: "bg-red-100",
        text: "text-red-800",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-red-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06l1.5 1.5a.75.75 0 101.06-1.06l-1.5-1.5zM11.78 7.22a.75.75 0 10-1.06 1.06l1.5 1.5a.75.75 0 101.06-1.06l-1.5-1.5z"
              clipRule="evenodd"
            />
          </svg>
        ),
      },
      Neutral: {
        bg: "bg-gray-100",
        text: "text-gray-800",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm2-2a1 1 0 11-2 0 1 1 0 012 0zm5 8a1 1 0 01-1-1v-1a1 1 0 112 0v1a1 1 0 01-1 1z"
              clipRule="evenodd"
            />
          </svg>
        ),
      },
      Fear: {
        bg: "bg-purple-100",
        text: "text-purple-800",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-purple-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 9a1 1 0 100-2 1 1 0 000 2zm1-4a1 1 0 11-2 0 1 1 0 012 0zm5 4a1 1 0 100-2 1 1 0 000 2zm1-4a1 1 0 11-2 0 1 1 0 012 0z"
              clipRule="evenodd"
            />
          </svg>
        ),
      },
      Surprise: {
        bg: "bg-amber-100",
        text: "text-amber-800",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-amber-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 9a1 1 0 100-2 1 1 0 000 2zm1-4a1 1 0 11-2 0 1 1 0 012 0zm5 4a1 1 0 100-2 1 1 0 000 2zm1-4a1 1 0 11-2 0 1 1 0 012 0z"
              clipRule="evenodd"
            />
          </svg>
        ),
      },
    };

    return (
      emotionColors[emotion] || {
        bg: "bg-gray-100",
        text: "text-gray-800",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16z"
              clipRule="evenodd"
            />
          </svg>
        ),
      }
    );
  };

  const emotionStyle = getEmotionColor(results.emotion);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 md:col-span-3">
      <h2 className="text-xl font-semibold mb-4">Emotion Analysis Results</h2>

      <div className="border-b border-gray-200 pb-6">
        <div className="flex items-center">
          <div className={`p-4 rounded-full ${emotionStyle.bg} mr-6`}>
            {emotionStyle.icon}
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-1">
              <span className={emotionStyle.text}>{results.emotion}</span>
            </h3>
            <p className="text-gray-600">Confidence: {results.confidence}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">
            Suggested Response
          </h3>
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <p className="text-gray-700 italic">
              &quot;{results.details.response}&quot;
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">
            Recommendations
          </h3>
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <p className="text-gray-700">{results.details.recommendations}</p>
          </div>
        </div>
      </div>

      {/* <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-3">
          Emotion Metrics
        </h3>
        <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {results.details.secondaryEmotions.map((metric) => (
              <div
                key={metric.name}
                className="bg-white p-3 rounded-md shadow-sm"
              >
                <div className="text-sm text-gray-500">{metric.name}</div>
                <div className="mt-1 flex items-center">
                  <div className="text-lg font-medium text-gray-900">
                    {metric.value}
                  </div>
                  <div className="ml-2 flex-1">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${parseFloat(metric.value) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}

      {/* <div className="mt-6 flex gap-4">
        <Button variant="secondary">Save Results</Button>
        <Button variant="primary">Add to Patient Report</Button>
      </div> */}
    </div>
  );
}
