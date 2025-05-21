"use client";
import { RecordDetailsModalProps } from "@/types/risk-analysis";
import { Modal } from "antd";
//
const RecordDetailsModal = ({
  selectedRecord,
  isModalVisible,
  setIsModalVisible,
}: RecordDetailsModalProps) => {
  return (
    <>
      <Modal
        title={
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
            <p className="font-semibold text-xl">Record Details</p>
          </div>
        }
        open={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
        cancelButtonProps={{ style: { display: "none" } }}
        footer={[
          <button
            key="ok"
            className="bg-blue-600 text-white font-semibold text-base px-8 py-2.5 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            onClick={() => setIsModalVisible(false)}
          >
            Close
          </button>,
        ]}
        width={960}
        styles={{
          body: {
            maxHeight: "75vh",
            overflowY: "auto",
            padding: "24px",
            background: "#f8fafc",
          },
          header: {
            padding: "16px 24px",
            borderBottom: "1px solid #e2e8f0",
          },
          footer: {
            padding: "16px 24px",
            borderTop: "1px solid #e2e8f0",
          },
        }}
      >
        {selectedRecord ? (
          <div className="space-y-8">
            {/* Prediction Summary Card - Kept as is */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Prediction Summary
                  </h3>
                  <p className="text-sm text-gray-600">
                    Analysis results and confidence level
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      Prediction
                    </p>
                    <p
                      className={`text-lg font-bold ${
                        selectedRecord?.result.prediction === 1
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {selectedRecord?.result.prediction === 1
                        ? "Positive"
                        : "Negative"}
                    </p>
                  </div>
                  <div className="h-12 w-px bg-gray-200"></div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      Confidence
                    </p>
                    <p className="text-lg font-bold text-gray-900">
                      {selectedRecord?.result.confidence > 50
                        ? selectedRecord.result.confidence
                        : 100 - selectedRecord.result.confidence}
                      %
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Patient Overview - Enhanced */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-md">
              <div className="flex items-center gap-2 mb-5">
                <svg
                  className="w-5 h-5 text-blue-600"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <h3 className="text-lg font-semibold text-gray-800">
                  Patient Overview
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <h3 className="text-sm font-medium text-blue-600 mb-3">
                    Patient Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500">ID</p>
                      <p className="text-sm font-medium text-gray-800">
                        {selectedRecord?.userId}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Name</p>
                      <p className="text-sm font-medium text-gray-800">
                        {selectedRecord?.userName}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Staff ID</p>
                      <p className="text-sm font-medium text-gray-800">
                        {selectedRecord?.staffId}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <h3 className="text-sm font-medium text-blue-600 mb-3">
                    Demographics
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500">Age</p>
                      <p className="text-sm font-medium text-gray-800">
                        {selectedRecord?.data.Age} years
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Gender</p>
                      <p className="text-sm font-medium text-gray-800">
                        {selectedRecord?.data.Gender === 0 ? "Male" : "Female"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Education</p>
                      <p className="text-sm font-medium text-gray-800">
                        {
                          ["None", "High School", "Bachelor's", "Higher"][
                            selectedRecord?.data.EducationLevel
                          ]
                        }
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <h3 className="text-sm font-medium text-blue-600 mb-3">
                    Assessment Details
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500">Date</p>
                      <p className="text-sm font-medium text-gray-800">
                        {new Date(selectedRecord?.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Time</p>
                      <p className="text-sm font-medium text-gray-800">
                        {new Date(
                          selectedRecord?.createdAt
                        ).toLocaleTimeString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">MMSE Score</p>
                      <div className="flex items-center">
                        <p className="text-sm font-medium text-gray-800">
                          {selectedRecord?.data.MMSE}
                        </p>
                        <div
                          className={`ml-2 px-2 py-0.5 rounded text-xs ${
                            selectedRecord?.data.MMSE >= 24
                              ? "bg-green-100 text-green-800"
                              : selectedRecord?.data.MMSE >= 19
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {selectedRecord?.data.MMSE >= 24
                            ? "Normal"
                            : selectedRecord?.data.MMSE >= 19
                            ? "Mild"
                            : "Severe"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Clinical Assessment Sections - Enhanced */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-1">
                <svg
                  className="w-5 h-5 text-blue-600"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 4H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z"></path>
                  <path d="M16 2v4"></path>
                  <path d="M8 2v4"></path>
                  <path d="M3 10h18"></path>
                </svg>
                <h3 className="text-lg font-semibold text-gray-800">
                  Clinical Assessment
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Lifestyle Factors - Enhanced */}
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-md relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50 rounded-bl-full"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                      <svg
                        className="w-4 h-4 text-blue-600"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                      </svg>
                      <h3 className="text-base font-semibold text-gray-800">
                        Lifestyle Factors
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs font-medium text-gray-500">BMI</p>
                        <div className="flex items-center mt-1">
                          <p className="text-sm font-medium text-gray-900">
                            {selectedRecord?.data.BMI}
                          </p>
                          <div
                            className={`ml-2 px-2 py-0.5 rounded text-xs ${
                              selectedRecord?.data.BMI >= 18.5 &&
                              selectedRecord?.data.BMI < 25
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {selectedRecord?.data.BMI >= 18.5 &&
                            selectedRecord?.data.BMI < 25
                              ? "Normal"
                              : selectedRecord?.data.BMI >= 25
                              ? "High"
                              : "Low"}
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs font-medium text-gray-500">
                          Smoking
                        </p>
                        <p
                          className={`text-sm font-medium mt-1 ${
                            selectedRecord?.data.Smoking
                              ? "text-red-600"
                              : "text-green-600"
                          }`}
                        >
                          {selectedRecord?.data.Smoking ? "Yes" : "No"}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs font-medium text-gray-500">
                          Alcohol
                        </p>
                        <p className="text-sm font-medium text-gray-900 mt-1">
                          {selectedRecord?.data.AlcoholConsumption}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs font-medium text-gray-500">
                          Physical Activity
                        </p>
                        <p className="text-sm font-medium text-gray-900 mt-1">
                          {selectedRecord?.data.PhysicalActivity}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs font-medium text-gray-500">
                          Diet Quality
                        </p>
                        <p className="text-sm font-medium text-gray-900 mt-1">
                          {selectedRecord?.data.DietQuality}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs font-medium text-gray-500">
                          Sleep Quality
                        </p>
                        <p className="text-sm font-medium text-gray-900 mt-1">
                          {selectedRecord?.data.SleepQuality}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Medical History - Enhanced */}
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-md relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50 rounded-bl-full"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                      <svg
                        className="w-4 h-4 text-blue-600"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                      </svg>
                      <h3 className="text-base font-semibold text-gray-800">
                        Medical History
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs font-medium text-gray-500">
                          Family History
                        </p>
                        <p
                          className={`text-sm font-medium mt-1 ${
                            selectedRecord?.data.FamilyHistoryAlzheimers
                              ? "text-red-600"
                              : "text-green-600"
                          }`}
                        >
                          {selectedRecord?.data.FamilyHistoryAlzheimers
                            ? "Yes"
                            : "No"}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs font-medium text-gray-500">
                          Cardiovascular
                        </p>
                        <p
                          className={`text-sm font-medium mt-1 ${
                            selectedRecord?.data.CardiovascularDisease
                              ? "text-red-600"
                              : "text-green-600"
                          }`}
                        >
                          {selectedRecord?.data.CardiovascularDisease
                            ? "Yes"
                            : "No"}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs font-medium text-gray-500">
                          Diabetes
                        </p>
                        <p
                          className={`text-sm font-medium mt-1 ${
                            selectedRecord?.data.Diabetes
                              ? "text-red-600"
                              : "text-green-600"
                          }`}
                        >
                          {selectedRecord?.data.Diabetes ? "Yes" : "No"}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs font-medium text-gray-500">
                          Depression
                        </p>
                        <p
                          className={`text-sm font-medium mt-1 ${
                            selectedRecord?.data.Depression
                              ? "text-red-600"
                              : "text-green-600"
                          }`}
                        >
                          {selectedRecord?.data.Depression ? "Yes" : "No"}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs font-medium text-gray-500">
                          Head Injury
                        </p>
                        <p
                          className={`text-sm font-medium mt-1 ${
                            selectedRecord?.data.HeadInjury
                              ? "text-red-600"
                              : "text-green-600"
                          }`}
                        >
                          {selectedRecord?.data.HeadInjury ? "Yes" : "No"}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs font-medium text-gray-500">
                          Hypertension
                        </p>
                        <p
                          className={`text-sm font-medium mt-1 ${
                            selectedRecord?.data.Hypertension
                              ? "text-red-600"
                              : "text-green-600"
                          }`}
                        >
                          {selectedRecord?.data.Hypertension ? "Yes" : "No"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cardiovascular Health - Enhanced */}
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-md relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50 rounded-bl-full"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                      <svg
                        className="w-4 h-4 text-blue-600"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                      </svg>
                      <h3 className="text-base font-semibold text-gray-800">
                        Cardiovascular Health
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs font-medium text-gray-500">
                          Systolic BP
                        </p>
                        <div className="flex items-center mt-1">
                          <p className="text-sm font-medium text-gray-900">
                            {selectedRecord?.data.SystolicBP}
                          </p>
                          <div
                            className={`ml-2 px-2 py-0.5 rounded text-xs ${
                              selectedRecord?.data.SystolicBP < 120
                                ? "bg-green-100 text-green-800"
                                : selectedRecord?.data.SystolicBP < 140
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {selectedRecord?.data.SystolicBP < 120
                              ? "Normal"
                              : selectedRecord?.data.SystolicBP < 140
                              ? "Elevated"
                              : "High"}
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs font-medium text-gray-500">
                          Diastolic BP
                        </p>
                        <div className="flex items-center mt-1">
                          <p className="text-sm font-medium text-gray-900">
                            {selectedRecord?.data.DiastolicBP}
                          </p>
                          <div
                            className={`ml-2 px-2 py-0.5 rounded text-xs ${
                              selectedRecord?.data.DiastolicBP < 80
                                ? "bg-green-100 text-green-800"
                                : selectedRecord?.data.DiastolicBP < 90
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {selectedRecord?.data.DiastolicBP < 80
                              ? "Normal"
                              : selectedRecord?.data.DiastolicBP < 90
                              ? "Elevated"
                              : "High"}
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs font-medium text-gray-500">
                          Total Cholesterol
                        </p>
                        <p className="text-sm font-medium text-gray-900 mt-1">
                          {selectedRecord?.data.CholesterolTotal}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs font-medium text-gray-500">LDL</p>
                        <p className="text-sm font-medium text-gray-900 mt-1">
                          {selectedRecord?.data.CholesterolLDL}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs font-medium text-gray-500">HDL</p>
                        <p className="text-sm font-medium text-gray-900 mt-1">
                          {selectedRecord?.data.CholesterolHDL}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs font-medium text-gray-500">
                          Triglycerides
                        </p>
                        <p className="text-sm font-medium text-gray-900 mt-1">
                          {selectedRecord?.data.CholesterolTriglycerides}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cognitive & Daily Functioning - Enhanced */}
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-md relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50 rounded-bl-full"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                      <svg
                        className="w-4 h-4 text-blue-600"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 2v6"></path>
                        <circle cx="12" cy="14" r="6"></circle>
                        <path d="M12 22v-4"></path>
                      </svg>
                      <h3 className="text-base font-semibold text-gray-800">
                        Cognitive & Daily Functioning
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs font-medium text-gray-500">
                          Functional Assessment
                        </p>
                        <p className="text-sm font-medium text-gray-900 mt-1">
                          {selectedRecord?.data.FunctionalAssessment}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs font-medium text-gray-500">
                          ADL Score
                        </p>
                        <div className="flex items-center mt-1">
                          <p className="text-sm font-medium text-gray-900">
                            {selectedRecord?.data.ADL}
                          </p>
                          <div
                            className={`ml-2 px-2 py-0.5 rounded text-xs ${
                              selectedRecord?.data.ADL >= 5
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {selectedRecord?.data.ADL >= 5 ? "Good" : "Limited"}
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs font-medium text-gray-500">
                          Memory Complaints
                        </p>
                        <p
                          className={`text-sm font-medium mt-1 ${
                            selectedRecord?.data.MemoryComplaints
                              ? "text-red-600"
                              : "text-green-600"
                          }`}
                        >
                          {selectedRecord?.data.MemoryComplaints ? "Yes" : "No"}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs font-medium text-gray-500">
                          Behavioral Problems
                        </p>
                        <p
                          className={`text-sm font-medium mt-1 ${
                            selectedRecord?.data.BehavioralProblems
                              ? "text-red-600"
                              : "text-green-600"
                          }`}
                        >
                          {selectedRecord?.data.BehavioralProblems
                            ? "Yes"
                            : "No"}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs font-medium text-gray-500">
                          Confusion
                        </p>
                        <p
                          className={`text-sm font-medium mt-1 ${
                            selectedRecord?.data.Confusion
                              ? "text-red-600"
                              : "text-green-600"
                          }`}
                        >
                          {selectedRecord?.data.Confusion ? "Yes" : "No"}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs font-medium text-gray-500">
                          Disorientation
                        </p>
                        <p
                          className={`text-sm font-medium mt-1 ${
                            selectedRecord?.data.Disorientation
                              ? "text-red-600"
                              : "text-green-600"
                          }`}
                        >
                          {selectedRecord?.data.Disorientation ? "Yes" : "No"}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs font-medium text-gray-500">
                          Personality Changes
                        </p>
                        <p
                          className={`text-sm font-medium mt-1 ${
                            selectedRecord?.data.PersonalityChanges
                              ? "text-red-600"
                              : "text-green-600"
                          }`}
                        >
                          {selectedRecord?.data.PersonalityChanges
                            ? "Yes"
                            : "No"}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs font-medium text-gray-500">
                          Difficulty with Tasks
                        </p>
                        <p
                          className={`text-sm font-medium mt-1 ${
                            selectedRecord?.data.DifficultyCompletingTasks
                              ? "text-red-600"
                              : "text-green-600"
                          }`}
                        >
                          {selectedRecord?.data.DifficultyCompletingTasks
                            ? "Yes"
                            : "No"}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs font-medium text-gray-500">
                          Forgetfulness
                        </p>
                        <p
                          className={`text-sm font-medium mt-1 ${
                            selectedRecord?.data.Forgetfulness
                              ? "text-red-600"
                              : "text-green-600"
                          }`}
                        >
                          {selectedRecord?.data.Forgetfulness ? "Yes" : "No"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-xl">
            <svg
              className="w-12 h-12 text-gray-400 mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 14l-7 7m0 0l-7-7m7 7V3m0 0l-7 7m7-7l7 7"
              ></path>
            </svg>
            <p className="text-lg font-medium text-gray-500">
              Loading record details...
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Please wait while we retrieve the information
            </p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default RecordDetailsModal;
