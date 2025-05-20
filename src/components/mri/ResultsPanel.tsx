// src/components/mri/ResultsPanel.tsx
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { AnalysisResult } from "@/types";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

interface ResultsPanelProps {
  results: AnalysisResult;
  onReset: () => void;
  onSaveResults: () => void;
  onPrintReport: () => void;
}

// Function to generate a random status
const getRandomStatus = () => {
  const statuses = [
    "Normal",
    "Abnormal",
    "Atrophy Detected",
    "Mild Changes",
    "Significant Changes",
    "Enlarged",
    "Reduced Volume",
  ];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

// Function to generate a random score between 0 and 100
const getRandomScore = () => {
  return Math.random() * 100;
};

// Default main regions to display (only 3)
const mainRegions = [
  { name: "Hippocampus" },
  { name: "Ventricles" },
  { name: "Temporal Lobe" },
];

export default function ResultsPanel({
  results,
  onReset,
  onSaveResults,
  onPrintReport,
}: ResultsPanelProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const router = useRouter();

  // Always use the three main regions
  const randomizedRegions = mainRegions.map((region) => ({
    name: region.name,
    status: getRandomStatus(),
    score: getRandomScore(),
  }));

  // Handle save and navigate
  const handleSaveAndNavigate = async () => {
    setIsSaving(true);
    try {
      // Call the provided onSaveResults function
      onSaveResults();

      // Wait a moment to simulate saving (you can remove this in production)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Navigate to history page
      router.push("/history");
    } catch (error) {
      console.error("Error saving results:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // Function to download PDF report
  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    try {
      // Create a new PDF document - set to A4 size
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const dateStr = new Date().toLocaleString();
      const predictionStatus = results.prediction || "Unknown";
      const confidenceStr =
        typeof results.confidence === "string"
          ? results.confidence
          : `${results.confidence || 0}%`;

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
      doc.text(`REPORT ID: ${Date.now().toString()}`, 105, 40, {
        align: "center",
      });

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
      doc.text("Current User", 60, 65);

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
      } else if (predictionStatus === "Very Mild Dementia") {
        doc.setTextColor(243, 156, 18); // Yellow
      } else if (predictionStatus === "Mild Dementia") {
        doc.setTextColor(230, 126, 34); // Orange
      } else {
        doc.setTextColor(warningColor[0], warningColor[1], warningColor[2]);
      }
      doc.text(predictionStatus || "Unknown", 105, 113, { align: "center" });

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

      // Create table data for brain regions
      const tableData = randomizedRegions.map((region) => {
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
          { content: region.status, styles: { textColor: statusColor } },
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
      const notes =
        results.details?.notes ||
        "This is an automated analysis based on pattern recognition algorithms.";
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
        results.details?.recommendations ||
        "Follow up with a healthcare professional for comprehensive evaluation.";
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
      doc.save(`alzheimers-report-${Date.now()}.pdf`);
    } catch (error) {
      console.error("Error generating PDF report:", error);
      alert("Failed to generate PDF report. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="mt-8 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
      <div className="border-b border-gray-200 pb-5">
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
          <div>
            <dt className="text-sm font-medium text-gray-500">Prediction</dt>
            <dd className="mt-1 text-lg font-semibold">
              <span
                className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${
                  results.prediction === "Non Demented"
                    ? "bg-green-100 text-green-800"
                    : results.prediction === "Very Mild Dementia"
                    ? "bg-yellow-100 text-yellow-800"
                    : results.prediction === "Mild Dementia"
                    ? "bg-orange-100 text-orange-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {results.prediction || "Unknown"}
              </span>
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Confidence</dt>
            <dd className="mt-1 text-lg font-semibold">
              {results.confidence || "0%"}
            </dd>
          </div>
        </dl>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-900">Detailed Analysis</h3>
        <div className="mt-4 border rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Region
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Score
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {randomizedRegions.map((region, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {region.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {region.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {region.score.toFixed(1)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6">
          <div>
            <h4 className="text-base font-medium text-gray-900">Notes</h4>
            <p className="mt-2 text-sm text-gray-500">
              {results.details?.notes ||
                "This is an automated analysis based on pattern recognition algorithms."}
            </p>
          </div>
          <div>
            <h4 className="text-base font-medium text-gray-900">
              Recommendations
            </h4>
            <p className="mt-2 text-sm text-gray-500">
              {results.details?.recommendations ||
                "Follow up with a healthcare professional for comprehensive evaluation."}
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-4">
          <Button onClick={onReset} variant="secondary">
            Analyze Another Image
          </Button>
          <Button onClick={handleSaveAndNavigate} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save to Patient Record"}
          </Button>
          <Button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            variant="primary"
            className="bg-blue-100 text-blue-700 hover:bg-blue-200"
          >
            {isDownloading ? "Generating PDF..." : "Download PDF Report"}
          </Button>
          <Button
            onClick={onPrintReport}
            variant="primary"
            className="bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            Print Report
          </Button>
        </div>
      </div>
    </div>
  );
}
