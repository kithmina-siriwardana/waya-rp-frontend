// src/app/history/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import AppLayout from "@/components/layout/AppLayout";
import Button from "@/components/ui/Button";
import { Prediction } from "@/types";
import { jsPDF } from "jspdf";
// Import the plugin properly
import autoTable from "jspdf-autotable";

// No need for the custom declaration as we're importing the plugin directly

export default function History() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [filteredPredictions, setFilteredPredictions] = useState<Prediction[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPrediction, setSelectedPrediction] =
    useState<Prediction | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const resultsPerPage = 20;

  // Filter state
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
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

        // Store all predictions
        setPredictions(data);
        // Initialize filtered predictions with all predictions
        setFilteredPredictions(data);

        // Calculate total pages based on all predictions initially
        setTotalPages(Math.ceil(data.length / resultsPerPage));
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchPredictions();
    } else {
      setIsLoading(false);
    }
  }, [token, resultsPerPage]);

  // Apply filters when activeFilter changes
  useEffect(() => {
    // Reset to first page when filter changes
    setCurrentPage(1);

    if (activeFilter === "All") {
      setFilteredPredictions(predictions);
    } else {
      const filtered = predictions.filter((p) => p.prediction === activeFilter);
      setFilteredPredictions(filtered);
    }

    // Update total pages based on filtered results
  }, [activeFilter, predictions]);

  // Update total pages when filtered predictions change
  useEffect(() => {
    setTotalPages(Math.ceil(filteredPredictions.length / resultsPerPage));
  }, [filteredPredictions, resultsPerPage]);

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo(0, 0); // Scroll to top when changing pages
  };

  // Get paginated data for current page
  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;
    return filteredPredictions.slice(startIndex, endIndex);
  };

  // Get pagination info (showing X to Y of Z results)
  const getPaginationInfo = () => {
    const startItem =
      filteredPredictions.length === 0
        ? 0
        : (currentPage - 1) * resultsPerPage + 1;
    const endItem = Math.min(
      currentPage * resultsPerPage,
      filteredPredictions.length
    );
    return { startItem, endItem };
  };

  // Render page number buttons
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageButtons = 5; // Maximum number of page buttons to show

    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    let endPage = startPage + maxPageButtons - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxPageButtons + 1);
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-colors ${
            i === currentPage
              ? "bg-blue-600 text-white shadow-md"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          {i}
        </button>
      );
    }

    // Add ellipsis at the beginning if needed
    if (startPage > 1) {
      pageNumbers.unshift(
        <span
          key="ellipsis-start"
          className="w-10 h-10 flex items-center justify-center text-gray-500"
        >
          ...
        </span>
      );
    }

    // Add ellipsis at the end if needed
    if (endPage < totalPages) {
      pageNumbers.push(
        <span
          key="ellipsis-end"
          className="w-10 h-10 flex items-center justify-center text-gray-500"
        >
          ...
        </span>
      );
    }

    return pageNumbers;
  };

  // Function to handle viewing prediction details
  const handleViewDetails = (prediction: Prediction) => {
    setSelectedPrediction(prediction);
    setShowDetailModal(true);
  };

  // Function to handle downloading prediction report as PDF
  const handleDownload = async (prediction: Prediction) => {
    setIsDownloading(true);
    try {
      // Create a new PDF document - set to A4 size
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const dateStr = new Date(prediction.createdAt).toLocaleString();
      const predictionStatus = prediction.prediction;
      const confidenceStr = prediction.confidence.toFixed(1) + "%";

      // Define colors
      const primaryColor: [number, number, number] = [41, 128, 185]; // Blue
      const secondaryColor: [number, number, number] = [52, 73, 94]; // Dark blue-gray
      const successColor: [number, number, number] = [46, 204, 113]; // Green
      const warningColor: [number, number, number] = [231, 76, 60]; // Red
      const lightGray: [number, number, number] = [189, 195, 199]; // Light gray for backgrounds

      // Add a colored header background
      doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.rect(0, 0, 210, 35, "F");

      // Add header text
      doc.setFont("helvetica", "bold");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.text("ALZHEIMER'S DETECTION REPORT", 105, 15, { align: "center" });

      // Add organization name or logo placeholder
      doc.setFontSize(12);
      doc.text("BrainScan AI Medical Diagnostics", 105, 25, {
        align: "center",
      });

      // Add a decorative element - subtle brain outline in the background
      doc.setDrawColor(255, 255, 255, 0.5);
      doc.setLineWidth(0.5);

      // Patient information section with rounded rectangle
      doc.setFillColor(245, 245, 245);
      doc.roundedRect(15, 45, 180, 35, 3, 3, "F");

      // Report ID
      doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
      doc.setFontSize(9);
      doc.text("REPORT ID: " + prediction._id, 105, 40, { align: "center" });

      // Add patient information with icons
      doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text("PATIENT INFORMATION", 25, 55);

      // Patient ID and Date
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text("Patient ID:", 25, 65);
      doc.setFont("helvetica", "bold");
      doc.text(prediction.userId, 60, 65);

      doc.setFont("helvetica", "normal");
      doc.text("Examination Date:", 110, 65);
      doc.setFont("helvetica", "bold");
      doc.text(dateStr, 150, 65);

      // Prediction results section
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(15, 90, 180, 35, 3, 3, "F");

      // Add prediction banner
      if (predictionStatus === "Non Demented") {
        doc.setFillColor(successColor[0], successColor[1], successColor[2]);
      } else if (predictionStatus === "Very Mild Dementia") {
        doc.setFillColor(243, 156, 18); // Yellow
      } else if (predictionStatus === "Mild Dementia") {
        doc.setFillColor(230, 126, 34); // Orange
      } else {
        doc.setFillColor(warningColor[0], warningColor[1], warningColor[2]);
      }
      doc.roundedRect(15, 90, 180, 12, 3, 3, "F");

      // Add prediction text
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("AI PREDICTION RESULTS", 105, 98, { align: "center" });

      // Add prediction details
      doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
      doc.setFontSize(22);
      doc.setFont("helvetica", "bold");
      if (predictionStatus === "Non Demented") {
        doc.setTextColor(successColor[0], successColor[1], successColor[2]);
      } else {
        doc.setTextColor(warningColor[0], warningColor[1], warningColor[2]);
      }
      doc.text(predictionStatus, 105, 113, { align: "center" });

      // Add confidence score with a confidence meter
      doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text("Confidence Score:", 65, 120);
      doc.setFont("helvetica", "bold");
      doc.text(confidenceStr, 115, 120);

      // Detailed Analysis section with enhanced table
      doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2], 0.1);
      doc.roundedRect(15, 135, 180, 8, 3, 3, "F");

      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("DETAILED BRAIN REGION ANALYSIS", 105, 141, { align: "center" });

      if (prediction.details?.regions) {
        // Create table data for brain regions
        const tableData = prediction.details.regions.map((region) => {
          let statusColor: [number, number, number];
          if (region.status.includes("Normal")) {
            statusColor = successColor;
          } else if (region.status.includes("Mild")) {
            statusColor = [243, 156, 18] as [number, number, number]; // Orange
          } else {
            statusColor = warningColor;
          }

          const row: (
            | string
            | {
                content: string;
                styles: {
                  textColor: [number, number, number];
                  fontStyle?: "normal" | "bold" | "italic" | "bolditalic";
                };
              }
          )[] = [
            region.name,
            {
              content: region.status,
              styles: {
                textColor: statusColor,
              },
            },
            {
              content: region.score.toFixed(1),
              styles: {
                fontStyle: "bold",
                textColor:
                  region.score > 70
                    ? successColor
                    : region.score > 50
                    ? ([243, 156, 18] as [number, number, number])
                    : warningColor,
              },
            },
          ];
          return row;
        });

        // Use the imported autoTable function with enhanced styling
        autoTable(doc, {
          startY: 145,
          head: [["Brain Region", "Status", "Score"]],
          body: tableData,
          theme: "grid",
          headStyles: {
            fillColor: primaryColor,
            textColor: [255, 255, 255],
            fontStyle: "bold",
            halign: "center",
          },
          styles: {
            overflow: "linebreak",
            cellPadding: 4,
            valign: "middle",
            lineColor: [220, 220, 220],
            lineWidth: 0.1,
          },
          columnStyles: {
            0: { fontStyle: "bold", cellWidth: 60 },
            1: { cellWidth: 70, halign: "center" },
            2: { cellWidth: 30, halign: "center" },
          },
          alternateRowStyles: {
            fillColor: [245, 245, 245],
          },
          margin: { left: 15, right: 15 },
        });
      }

      // Notes section with decorative elements
      const tableEndY = (doc as any).lastAutoTable?.finalY || 170;

      // Notes section
      doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2], 0.1);
      doc.roundedRect(15, tableEndY + 10, 180, 8, 3, 3, "F");

      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("CLINICAL NOTES", 105, tableEndY + 16, { align: "center" });

      // Notes content with light background
      doc.setFillColor(250, 250, 250);
      doc.roundedRect(15, tableEndY + 20, 180, 30, 3, 3, "F");

      // Notes content
      doc.setTextColor(80, 80, 80);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      const notes = prediction.details?.notes || "No notes provided.";
      // Split long text into multiple lines
      const splitNotes = doc.splitTextToSize(notes, 170);
      doc.text(splitNotes, 20, tableEndY + 30);

      // Recommendations section
      const notesEndY = tableEndY + 60;

      doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2], 0.1);
      doc.roundedRect(15, notesEndY, 180, 8, 3, 3, "F");

      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("RECOMMENDATIONS", 105, notesEndY + 6, { align: "center" });

      // Recommendations content with light background
      doc.setFillColor(250, 250, 250);
      doc.roundedRect(15, notesEndY + 10, 180, 30, 3, 3, "F");

      // Recommendations content
      doc.setTextColor(80, 80, 80);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      const recommendations =
        prediction.details?.recommendations || "No recommendations provided.";
      // Split long text into multiple lines
      const splitRecommendations = doc.splitTextToSize(recommendations, 170);
      doc.text(splitRecommendations, 20, notesEndY + 20);

      // Footer
      doc.setDrawColor(lightGray[0], lightGray[1], lightGray[2]);
      doc.setLineWidth(0.5);
      doc.line(15, 275, 195, 275);

      // Disclaimer in footer
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      doc.text(
        "This report is generated by an AI system and is for research purposes only.",
        105,
        280,
        { align: "center" }
      );
      doc.text(
        "It is not a substitute for professional medical advice, diagnosis, or treatment.",
        105,
        285,
        { align: "center" }
      );

      // Add page number
      doc.setFontSize(8);
      doc.text("Page 1 of 1", 195, 290, { align: "right" });

      // Save the PDF
      doc.save(`alzheimers-report-${prediction._id}.pdf`);
    } catch (error) {
      console.error("Error generating PDF report:", error);
      alert("Failed to download report. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  // Function to handle deleting a prediction
  const handleDeleteClick = (predictionId: string) => {
    setDeleteItemId(predictionId);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirmed = async () => {
    if (!deleteItemId) return;

    setIsDeleting(deleteItemId);
    try {
      // In a real app, you would make an API call to delete the prediction
      // For demo purposes, we'll just filter out the prediction from the state

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Filter out the deleted prediction
      setPredictions(predictions.filter((p) => p._id !== deleteItemId));

      // Close the confirmation modal
      setShowDeleteConfirm(false);
      setDeleteItemId(null);
    } catch (error) {
      console.error("Error deleting prediction:", error);
      alert("Failed to delete prediction. Please try again.");
    } finally {
      setIsDeleting(null);
    }
  };

  const closeDeleteConfirm = () => {
    setShowDeleteConfirm(false);
    setDeleteItemId(null);
  };

  // Close the detail modal
  const closeModal = () => {
    setShowDetailModal(false);
    setSelectedPrediction(null);
  };

  return (
    <AppLayout>
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Prediction History</h1>

          {/* Filters */}
          {!isLoading && !error && predictions.length > 0 && (
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveFilter("All")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === "All"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveFilter("Non Demented")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === "Non Demented"
                      ? "bg-green-600 text-white"
                      : "bg-green-50 text-green-700 hover:bg-green-100"
                  }`}
                >
                  Non Demented
                </button>
                <button
                  onClick={() => setActiveFilter("Very Mild Dementia")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === "Very Mild Dementia"
                      ? "bg-yellow-500 text-white"
                      : "bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
                  }`}
                >
                  Very Mild Dementia
                </button>
                <button
                  onClick={() => setActiveFilter("Mild Dementia")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === "Mild Dementia"
                      ? "bg-orange-500 text-white"
                      : "bg-orange-50 text-orange-700 hover:bg-orange-100"
                  }`}
                >
                  Mild Dementia
                </button>
                <button
                  onClick={() => setActiveFilter("Moderate Dementia")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === "Moderate Dementia"
                      ? "bg-red-600 text-white"
                      : "bg-red-50 text-red-700 hover:bg-red-100"
                  }`}
                >
                  Moderate Dementia
                </button>
              </div>
            </div>
          )}

          {/* Stats Cards */}
          {!isLoading && !error && predictions.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {/* Total Scans */}
              <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
                <div className="flex items-center">
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
                  <div>
                    <p className="text-sm text-gray-500 uppercase">
                      Total Scans
                    </p>
                    <p className="text-xl font-bold">{predictions.length}</p>
                  </div>
                </div>
              </div>

              {/* Positive Results (Non Demented) */}
              <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500">
                <div className="flex items-center">
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
                  <div>
                    <p className="text-sm text-gray-500 uppercase">
                      Positive Results
                    </p>
                    <p className="text-xl font-bold">
                      {
                        predictions.filter(
                          (p) => p.prediction === "Non Demented"
                        ).length
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Negative Results (All Dementia Types) */}
              <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-red-500">
                <div className="flex items-center">
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
                  <div>
                    <p className="text-sm text-gray-500 uppercase">
                      Negative Results
                    </p>
                    <div>
                      <p className="text-xl font-bold">
                        {
                          predictions.filter(
                            (p) =>
                              p.prediction === "Moderate Dementia" ||
                              p.prediction === "Very Mild Dementia" ||
                              p.prediction === "Mild Dementia"
                          ).length
                        }
                      </p>
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
                    </div>
                  </div>
                </div>
              </div>

              {/* Average Confidence */}
              <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-purple-500">
                <div className="flex items-center">
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
                  <div>
                    <p className="text-sm text-gray-500 uppercase">
                      Avg. Confidence
                    </p>
                    <p className="text-xl font-bold">
                      {(
                        predictions.reduce((acc, p) => acc + p.confidence, 0) /
                        predictions.length
                      ).toFixed(1)}
                      %
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isLoading ? (
            <div className="flex justify-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="p-4 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          ) : filteredPredictions.length === 0 ? (
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-gray-600">
                {predictions.length > 0
                  ? `No predictions found for "${activeFilter}" filter.`
                  : "No predictions found. Make a prediction first."}
              </p>
              {predictions.length > 0 ? (
                <button
                  onClick={() => setActiveFilter("All")}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  View All Predictions
                </button>
              ) : (
                <button
                  onClick={() => router.push("/mri-detection")}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Make a Prediction
                </button>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Prediction
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Confidence
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {getPaginatedData().map((prediction) => (
                    <tr key={prediction._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(prediction.createdAt).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
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
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {prediction.confidence.toFixed(1)}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center space-x-3">
                          <button
                            className="text-blue-600 hover:text-blue-800 flex items-center"
                            onClick={() => handleViewDetails(prediction)}
                          >
                            <svg
                              className="h-4 w-4 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              ></path>
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              ></path>
                            </svg>
                            View
                          </button>
                          <button
                            className="text-gray-600 hover:text-gray-800 flex items-center"
                            onClick={() => handleDownload(prediction)}
                            disabled={isDownloading}
                          >
                            <svg
                              className="h-4 w-4 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              ></path>
                            </svg>
                            {isDownloading ? "Downloading..." : "PDF"}
                          </button>
                          <button
                            className="text-red-600 hover:text-red-800 flex items-center"
                            onClick={() => handleDeleteClick(prediction._id)}
                            disabled={isDeleting === prediction._id}
                          >
                            <svg
                              className="h-4 w-4 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              ></path>
                            </svg>
                            {isDeleting === prediction._id
                              ? "Deleting..."
                              : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="px-6 py-5 bg-white border-t border-gray-200">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-gray-700">
                      {activeFilter !== "All" && (
                        <span className="mr-2">
                          <span className="font-semibold text-gray-900">
                            {filteredPredictions.length}
                          </span>{" "}
                          {activeFilter} results found
                        </span>
                      )}
                      Showing{" "}
                      <span className="font-semibold text-gray-900">
                        {getPaginationInfo().startItem}
                      </span>{" "}
                      to{" "}
                      <span className="font-semibold text-gray-900">
                        {getPaginationInfo().endItem}
                      </span>{" "}
                      of{" "}
                      <span className="font-semibold text-gray-900">
                        {filteredPredictions.length}
                      </span>{" "}
                      results
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handlePageChange(1)}
                      disabled={currentPage === 1}
                      className={`p-2 rounded-md border ${
                        currentPage === 1
                          ? "text-gray-300 border-gray-200 cursor-not-allowed"
                          : "text-gray-700 border-gray-300 hover:bg-gray-50"
                      }`}
                      title="First Page"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                        ></path>
                      </svg>
                    </button>

                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`p-2 rounded-md border ${
                        currentPage === 1
                          ? "text-gray-300 border-gray-200 cursor-not-allowed"
                          : "text-gray-700 border-gray-300 hover:bg-gray-50"
                      }`}
                      title="Previous Page"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 19l-7-7 7-7"
                        ></path>
                      </svg>
                    </button>

                    <div className="flex items-center space-x-1">
                      {renderPageNumbers()}
                    </div>

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`p-2 rounded-md border ${
                        currentPage === totalPages
                          ? "text-gray-300 border-gray-200 cursor-not-allowed"
                          : "text-gray-700 border-gray-300 hover:bg-gray-50"
                      }`}
                      title="Next Page"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        ></path>
                      </svg>
                    </button>

                    <button
                      onClick={() => handlePageChange(totalPages)}
                      disabled={currentPage === totalPages}
                      className={`p-2 rounded-md border ${
                        currentPage === totalPages
                          ? "text-gray-300 border-gray-200 cursor-not-allowed"
                          : "text-gray-700 border-gray-300 hover:bg-gray-50"
                      }`}
                      title="Last Page"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 5l7 7-7 7M5 5l7 7-7 7"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center mb-4">
              <div className="bg-red-100 p-2 rounded-full mr-3">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                Delete Prediction
              </h3>
            </div>

            <p className="text-gray-600 mb-5">
              Are you sure you want to delete this prediction? This action
              cannot be undone.
            </p>

            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                onClick={closeDeleteConfirm}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-md shadow-sm hover:bg-red-700 flex items-center"
                onClick={handleDeleteConfirmed}
              >
                {isDeleting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <svg
                      className="h-4 w-4 mr-1.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      ></path>
                    </svg>
                    <span>Delete</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetailModal && selectedPrediction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Analysis Details</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">
                  {new Date(selectedPrediction.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Prediction</p>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      selectedPrediction.prediction === "Non Demented"
                        ? "bg-green-100 text-green-800"
                        : selectedPrediction.prediction === "Very Mild Dementia"
                        ? "bg-yellow-100 text-yellow-800"
                        : selectedPrediction.prediction === "Mild Dementia"
                        ? "bg-orange-100 text-orange-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {selectedPrediction.prediction}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Confidence</p>
                  <p className="font-medium">
                    {selectedPrediction.confidence.toFixed(1)}%
                  </p>
                </div>
              </div>

              {selectedPrediction.details?.regions && (
                <div className="mb-4">
                  <h3 className="font-medium mb-2">Brain Regions Analysis</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                          >
                            Region
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                          >
                            Status
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                          >
                            Score
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {selectedPrediction.details.regions.map(
                          (region, index) => (
                            <tr key={index}>
                              <td className="px-4 py-2 text-sm">
                                {region.name}
                              </td>
                              <td className="px-4 py-2 text-sm">
                                {region.status}
                              </td>
                              <td className="px-4 py-2 text-sm">
                                {region.score.toFixed(1)}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {selectedPrediction.details?.notes && (
                <div className="mb-4">
                  <h3 className="font-medium mb-1">Notes</h3>
                  <p className="text-sm text-gray-700">
                    {selectedPrediction.details.notes}
                  </p>
                </div>
              )}

              {selectedPrediction.details?.recommendations && (
                <div className="mb-4">
                  <h3 className="font-medium mb-1">Recommendations</h3>
                  <p className="text-sm text-gray-700">
                    {selectedPrediction.details.recommendations}
                  </p>
                </div>
              )}

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => {
                    closeModal();
                    handleDownload(selectedPrediction);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Download PDF Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
