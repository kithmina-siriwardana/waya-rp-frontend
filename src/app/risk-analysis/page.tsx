"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import AppLayout from "@/components/layout/AppLayout";
import Button from "@/components/ui/Button";
import RiskAnalysisTable from "@/components/risk-analysis/RiskAnalysisTable";
import RecordDetailsModal from "@/components/risk-analysis/RecordDetailsModal";
import { FormattedTableDataItem, TableDataItem } from "@/types/risk-analysis";
import axios from "axios";
import NewRiskRecordComponent from "@/components/risk-analysis/NewRecordForm";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(date)
    .replace(/\//g, "-");
};

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
};

export default function RiskAnalysisPage() {
  const { token, user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isTableUpdated, setIsTableUpdated] = useState(false);
  const [tableData, setTableData] = useState<TableDataItem[]>([]);
  const [formattedTableData, setFormattedTableData] = useState<
    FormattedTableDataItem[]
  >([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<TableDataItem | null>(
    null
  );

  useEffect(() => {
    if (!token || !user?._id) return;
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/predict/analyze-risk/${user?._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Alzeimer analysis response:", response.data);
        setTableData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Alzeimer analysis error:", error);
        setIsLoading(false);
        setError("An error occurred");
      });
  }, [isTableUpdated, token, user?._id]);

  useEffect(() => {
    const formattedData = tableData.map((data, index) => {
      return {
        id: data._id,
        key: index + 1,
        staffId: data.staffId,
        prediction: data.result.prediction === 1 ? "Positive" : "Negative",
        confidence: `${
          data.result.confidence > 50
            ? data.result.confidence
            : 100 - data.result.confidence
        }%`,
        date: formatDate(data.createdAt),
        time: formatTime(data.createdAt),
        handleRowClick: handleRowClick,
      };
    });
    setFormattedTableData(formattedData);
  }, [tableData]);

  const handleRowClick = (recordId: string) => {
    setSelectedRecord(
      tableData.find((record) => record._id === recordId) || null
    );
    setIsModalVisible(true);
  };

  const handleNewAssessment = () => {
    setShowForm(!showForm);
  };

  return (
    <AppLayout>
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Alzheimer&apos;s Risk Analysis
              </h1>
              <p className="text-gray-600">
                Analyze patient risk factors for Alzheimer&apos;s disease
              </p>
            </div>
            <Button onClick={handleNewAssessment}>
              {showForm ? "Back to Records" : "New Risk Assessment"}
            </Button>
          </div>

          {!showForm ? (
            <>
              {isLoading ? (
                <div className="flex justify-center p-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
              ) : error ? (
                <div className="bg-red-100 p-4 rounded-lg text-red-700 mb-6">
                  {error}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6 ">
                    <h2 className="text-xl font-semibold text-gray-800">
                      Risk Assessment Records
                    </h2>
                    <p className="text-gray-600 text-sm mt-1">
                      Click on a record to view detailed information
                    </p>
                  </div>
                  <div className="mx-6">
                    <RiskAnalysisTable
                      tableData={formattedTableData}
                      handleRowClick={handleRowClick}
                    />
                  </div>
                </div>
              )}

              {/* Details Modal */}
              <RecordDetailsModal
                selectedRecord={selectedRecord}
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
              />
            </>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">New Risk Assessment</h2>
                {/* <Button variant="secondary" onClick={handleNewAssessment}>
                  Back to Records
                </Button> */}
              </div>

              <NewRiskRecordComponent
                isTableUpdated={isTableUpdated}
                setIsTableUpdated={setIsTableUpdated}
                setIsFormOpen={setShowForm}
              />
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
