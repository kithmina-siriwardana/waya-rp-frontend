// src/app/dashboard/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import AppLayout from "@/components/layout/AppLayout";
import Link from "next/link";
import { Prediction } from "@/types";

export default function Dashboard() {
  const { user, token } = useAuth();
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch predictions data
  useEffect(() => {
    const fetchPredictions = async () => {
      setIsLoading(true);
      try {
        if (!token) {
          setPredictions([]);
          return;
        }

        // Make a real API call to fetch predictions
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/predictions/history`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch predictions");
        }

        setPredictions(data);
      } catch (error) {
        console.error("Error fetching predictions:", error);
        setPredictions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPredictions();
  }, [token]);

  // Calculate stats from the predictions
  const totalScans = predictions.length;
  const positiveResults = predictions.filter(
    (p) => p.prediction === "Non Demented"
  ).length;
  const negativeResults = predictions.filter(
    (p) =>
      p.prediction === "Moderate Dementia" ||
      p.prediction === "Very Mild Dementia" ||
      p.prediction === "Mild Dementia"
  ).length;
  const avgConfidence =
    predictions.length > 0
      ? (
          predictions.reduce((acc, p) => acc + p.confidence, 0) /
          predictions.length
        ).toFixed(1) + "%"
      : "0%";

  // Stats data
  const stats = [
    {
      name: "Total Scans",
      value: totalScans.toString(),
      icon: (
        <div className="p-3 rounded-full bg-blue-100 mr-4">
          <svg
            className="h-6 w-6 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            ></path>
          </svg>
        </div>
      ),
    },
    {
      name: "Positive Results",
      value: positiveResults.toString(),
      icon: (
        <div className="p-3 rounded-full bg-green-100 mr-4">
          <svg
            className="h-6 w-6 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
      ),
    },
    {
      name: "Negative Results",
      value: negativeResults.toString(),
      icon: (
        <div className="p-3 rounded-full bg-red-100 mr-4">
          <svg
            className="h-6 w-6 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
      ),
    },
    {
      name: "Avg. Confidence",
      value: avgConfidence,
      icon: (
        <div className="p-3 rounded-full bg-purple-100 mr-4">
          <svg
            className="h-6 w-6 text-purple-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            ></path>
          </svg>
        </div>
      ),
    },
  ];

  // Get recent predictions (most recent 3)
  const recentPredictions = predictions
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 3)
    .map((p) => ({
      id: p._id,
      date: new Date(p.createdAt).toLocaleDateString(),
      prediction: p.prediction,
      confidence: p.confidence.toFixed(1) + "%",
    }));

  // Service cards
  const services = [
    {
      title: "MRI-Based Detection",
      description:
        "Upload and analyze brain MRI scans for signs of Alzheimer's disease.",
      path: "/mri-detection",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      ),
    },
    {
      title: "Emotion Recognition",
      description:
        "Analyze facial expressions to detect emotional patterns related to cognitive health.",
      path: "/emotion-recognition",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Risk Analysis",
      description:
        "Assess potential risk factors based on patient history and biomarkers.",
      path: "/risk-analysis",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
    {
      title: "Memory Therapy",
      description:
        "Interactive exercises and games designed to help with memory and cognitive function.",
      path: "/memory-therapy",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      title: "Memories",
      description:
        "Store and revisit important memories, photos, and life events to help maintain cognitive connections.",
      path: "/memories",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
          />
        </svg>
      ),
    },
  ];

  return (
    <AppLayout>
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome{user ? `, ${user.name?.split(" ")[0] || ""}` : ""}
            </h1>
            <p className="mt-2 text-gray-600">
              Alzheimer&apos;s Care Platform — AI-powered tools for early
              detection and management
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500"
              >
                <div className="flex items-center">
                  {stat.icon}
                  <div>
                    <p className="text-sm text-gray-500 uppercase">
                      {stat.name}
                    </p>
                    <p className="text-xl font-bold">{stat.value}</p>
                    {stat.name === "Negative Results" &&
                      negativeResults > 0 && (
                        <p className="text-xs text-gray-500">
                          Moderate:{" "}
                          {
                            predictions.filter(
                              (p) => p.prediction === "Moderate Dementia"
                            ).length
                          }{" "}
                          | Mild:{" "}
                          {
                            predictions.filter(
                              (p) => p.prediction === "Mild Dementia"
                            ).length
                          }{" "}
                          | Very Mild:{" "}
                          {
                            predictions.filter(
                              (p) => p.prediction === "Very Mild Dementia"
                            ).length
                          }
                        </p>
                      )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Services Grid */}
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {services.map((service, index) => (
              <Link
                key={index}
                href={service.path}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col items-center text-center">
                  {service.icon}
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {service.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">
                Recent Activity
              </h2>
            </div>
            <div className="divide-y divide-gray-200">
              {isLoading ? (
                <div className="px-6 py-8 text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <p className="mt-2 text-gray-500">
                    Loading recent activity...
                  </p>
                </div>
              ) : recentPredictions.length > 0 ? (
                recentPredictions.map((prediction) => (
                  <div key={prediction.id} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {prediction.date}
                        </p>
                        <p className="text-sm text-gray-500">MRI Analysis</p>
                      </div>
                      <div>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            prediction.prediction === "Non Demented"
                              ? "bg-green-100 text-green-800"
                              : prediction.prediction === "Very Mild Dementia"
                              ? "bg-yellow-100 text-yellow-800"
                              : prediction.prediction === "Mild Dementia"
                              ? "bg-orange-100 text-orange-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {prediction.prediction}
                        </span>
                        <span className="ml-2 text-sm text-gray-500">
                          {prediction.confidence}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-6 py-4 text-center text-gray-500">
                  No recent activity found
                </div>
              )}
            </div>
            <div className="px-6 py-4 bg-gray-50">
              <Link
                href="/history"
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                View all activity →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
