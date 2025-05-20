"use client";
import { RecordDetailsModalProps } from "@/types/risk-analysis";
import { Modal } from "antd";

const RecordDetailsModal = ({
  selectedRecord,
  isModalVisible,
  setIsModalVisible,
}: RecordDetailsModalProps) => {
  return (
    <>
      <Modal
        title={<p className="font-semibold text-xl">Record Details</p>}
        open={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
        cancelButtonProps={{ style: { display: "none" } }}
        footer={[
          <button
            key="ok"
            className="bg-blue-600 text-white font-semibold text-base px-6 py-2 rounded hover:bg-blue-700 transition-colors"
            onClick={() => setIsModalVisible(false)}
          >
            OK
          </button>,
        ]}
        width={800}
        styles={{
          body: {
            maxHeight: "60vh",
            overflowY: "auto",
          },
        }}
      >
        {selectedRecord ? (
          <div className="pt-2">
            <div>
              <p className="text-lg font-semibold">General Information</p>
              <div className="space-y-1 mt-2 ml-6">
                {/* Grid Container */}
                <div className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1">
                  {/* Labels in the left column, values in the right column */}
                  <p className="text-gray-700 font-semibold">Patient ID:</p>
                  <p className="text-gray-700">{selectedRecord?.userId}</p>

                  <p className="text-gray-700 font-semibold">Patient Name:</p>
                  <p className="text-gray-700">Saman Kumara</p>

                  <p className="text-gray-700 font-semibold">Prediction:</p>
                  <p className="text-gray-700">
                    {selectedRecord?.result.prediction === 1
                      ? "Positive"
                      : "Negative"}
                  </p>

                  <p className="text-gray-700 font-semibold">Confidence:</p>
                  <p className="text-gray-700">
                    {selectedRecord?.result.confidence}%
                  </p>

                  <p className="text-gray-700 font-semibold">Date:</p>
                  <p className="text-gray-700">
                    {new Date(selectedRecord?.createdAt).toLocaleDateString()}
                  </p>

                  <p className="text-gray-700 font-semibold">Time:</p>
                  <p className="text-gray-700">
                    {new Date(selectedRecord?.createdAt).toLocaleTimeString()}
                  </p>

                  <p className="text-gray-700 font-semibold">Staff ID:</p>
                  <p className="text-gray-700">{selectedRecord?.staffId}</p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-lg font-semibold">Patient Information</p>
              <div className="space-y-1 mt-2 ml-6">
                {/* Grid Container */}
                <div className="grid grid-cols-[max-content_1fr_max-content_1fr] gap-x-4 gap-y-1">
                  <p className="text-gray-700 font-semibold">Age:</p>
                  <p className="text-gray-700">{selectedRecord?.data.Age}</p>

                  <p className="text-gray-700 font-semibold">Gender:</p>
                  <p className="text-gray-700">
                    {selectedRecord?.data.Gender === 0 ? "Male" : "Female"}
                  </p>

                  <p className="text-gray-700 font-semibold">
                    Education Level:
                  </p>
                  <p className="text-gray-700">
                    {
                      ["None", "High School", "Bachelor's", "Higher"][
                        selectedRecord?.data.EducationLevel
                      ]
                    }
                  </p>

                  <p className="text-gray-700 font-semibold">BMI:</p>
                  <p className="text-gray-700">{selectedRecord?.data.BMI}</p>

                  <p className="text-gray-700 font-semibold">Smoking:</p>
                  <p className="text-gray-700">
                    {selectedRecord?.data.Smoking ? "Yes" : "No"}
                  </p>

                  <p className="text-gray-700 font-semibold">
                    Weekly Alcohol Consumption:
                  </p>
                  <p className="text-gray-700">
                    {selectedRecord?.data.AlcoholConsumption}
                  </p>

                  <p className="text-gray-700 font-semibold">
                    Weekly Physical Activity:
                  </p>
                  <p className="text-gray-700">
                    {selectedRecord?.data.PhysicalActivity}
                  </p>

                  <p className="text-gray-700 font-semibold">Diet Quality:</p>
                  <p className="text-gray-700">
                    {selectedRecord?.data.DietQuality}
                  </p>

                  <p className="text-gray-700 font-semibold">Sleep Quality:</p>
                  <p className="text-gray-700">
                    {selectedRecord?.data.SleepQuality}
                  </p>

                  <p className="text-gray-700 font-semibold">MMSE Score:</p>
                  <p className="text-gray-700">{selectedRecord?.data.MMSE}</p>

                  <p className="text-gray-700 font-semibold">
                    Functional Assessment:
                  </p>
                  <p className="text-gray-700">
                    {selectedRecord?.data.FunctionalAssessment}
                  </p>

                  <p className="text-gray-700 font-semibold">
                    Memory Complaints:
                  </p>
                  <p className="text-gray-700">
                    {selectedRecord?.data.MemoryComplaints ? "Yes" : "No"}
                  </p>

                  <p className="text-gray-700 font-semibold">
                    Behavioral Problems:
                  </p>
                  <p className="text-gray-700">
                    {selectedRecord?.data.BehavioralProblems ? "Yes" : "No"}
                  </p>

                  <p className="text-gray-700 font-semibold">ADL Score:</p>
                  <p className="text-gray-700">{selectedRecord?.data.ADL}</p>

                  <p className="text-gray-700 font-semibold">Confusion:</p>
                  <p className="text-gray-700">
                    {selectedRecord?.data.Confusion ? "Yes" : "No"}
                  </p>

                  <p className="text-gray-700 font-semibold">Forgetfulness:</p>
                  <p className="text-gray-700">
                    {selectedRecord?.data.Forgetfulness ? "Yes" : "No"}
                  </p>

                  <p className="text-gray-700 font-semibold">
                    Family History of Alzheimer&apos;s:
                  </p>
                  <p className="text-gray-700">
                    {selectedRecord?.data.FamilyHistoryAlzheimers
                      ? "Yes"
                      : "No"}
                  </p>

                  <p className="text-gray-700 font-semibold">
                    Cardiovascular Disease:
                  </p>
                  <p className="text-gray-700">
                    {selectedRecord?.data.CardiovascularDisease ? "Yes" : "No"}
                  </p>

                  <p className="text-gray-700 font-semibold">Diabetes:</p>
                  <p className="text-gray-700">
                    {selectedRecord?.data.Diabetes ? "Yes" : "No"}
                  </p>

                  <p className="text-gray-700 font-semibold">Depression:</p>
                  <p className="text-gray-700">
                    {selectedRecord?.data.Depression ? "Yes" : "No"}
                  </p>

                  <p className="text-gray-700 font-semibold">Head Injury:</p>
                  <p className="text-gray-700">
                    {selectedRecord?.data.HeadInjury ? "Yes" : "No"}
                  </p>

                  <p className="text-gray-700 font-semibold">Hypertension:</p>
                  <p className="text-gray-700">
                    {selectedRecord?.data.Hypertension ? "Yes" : "No"}
                  </p>

                  <p className="text-gray-700 font-semibold">Systolic BP:</p>
                  <p className="text-gray-700">
                    {selectedRecord?.data.SystolicBP}
                  </p>

                  <p className="text-gray-700 font-semibold">Diastolic BP:</p>
                  <p className="text-gray-700">
                    {selectedRecord?.data.DiastolicBP}
                  </p>

                  <p className="text-gray-700 font-semibold">
                    Total Cholesterol:
                  </p>
                  <p className="text-gray-700">
                    {selectedRecord?.data.CholesterolTotal}
                  </p>

                  <p className="text-gray-700 font-semibold">
                    LDL Cholesterol:
                  </p>
                  <p className="text-gray-700">
                    {selectedRecord?.data.CholesterolLDL}
                  </p>

                  <p className="text-gray-700 font-semibold">
                    HDL Cholesterol:
                  </p>
                  <p className="text-gray-700">
                    {selectedRecord?.data.CholesterolHDL}
                  </p>

                  <p className="text-gray-700 font-semibold">Triglycerides:</p>
                  <p className="text-gray-700">
                    {selectedRecord?.data.CholesterolTriglycerides}
                  </p>

                  <p className="text-gray-700 font-semibold">Disorientation:</p>
                  <p className="text-gray-700">
                    {selectedRecord?.data.Disorientation ? "Yes" : "No"}
                  </p>

                  <p className="text-gray-700 font-semibold">
                    Personality Changes:
                  </p>
                  <p className="text-gray-700">
                    {selectedRecord?.data.PersonalityChanges ? "Yes" : "No"}
                  </p>

                  <p className="text-gray-700 font-semibold">
                    Difficulty Completing Tasks:
                  </p>
                  <p className="text-gray-700">
                    {selectedRecord?.data.DifficultyCompletingTasks
                      ? "Yes"
                      : "No"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-700">Loading...</p>
        )}
      </Modal>
    </>
  );
};

export default RecordDetailsModal;
