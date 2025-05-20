import React, { useState } from "react";
import axios from "axios";
import PredictionResultModal from "./PredictionResultModal";
import {
  NewRiskRecordComponentProps,
  ResultCreate,
} from "@/types/risk-analysis";
import SubmitConfirmModal from "./SubmitConfirmModal";

const NewRiskRecordComponent: React.FC<NewRiskRecordComponentProps> = ({
  isTableUpdated,
  setIsTableUpdated,
}) => {
  const [formData, setFormData] = useState({
    PatientName: "",
    Age: "",
    Gender: "",
    EducationLevel: "",
    BMI: "",
    Smoking: "",
    AlcoholConsumption: "",
    PhysicalActivity: "",
    DietQuality: "",
    SleepQuality: "",
    FamilyHistoryAlzheimers: "",
    CardiovascularDisease: "",
    Diabetes: "",
    Depression: "",
    HeadInjury: "",
    Hypertension: "",
    SystolicBP: "",
    DiastolicBP: "",
    CholesterolTotal: "",
    CholesterolLDL: "",
    CholesterolHDL: "",
    CholesterolTriglycerides: "",
    MMSE: "",
    FunctionalAssessment: "",
    MemoryComplaints: "",
    BehavioralProblems: "",
    ADL: "",
    Confusion: "",
    Disorientation: "",
    PersonalityChanges: "",
    DifficultyCompletingTasks: "",
    Forgetfulness: "",
  });
  const [response, setResponse] = useState<ResultCreate | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitNewRecord = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if any field is empty
    for (const key in formData) {
      const emptyFields = [];
      for (const key in formData) {
        if (formData[key as keyof typeof formData] === "") {
          emptyFields.push(key);
        }
      }
      if (emptyFields.length > 0) {
        alert(`Please fill in all fields: ${emptyFields.join(", ")}`);
        return;
      }
    }

    // console.log("Form Data:", formData);

    const payload = {
      data: {
        Age: parseInt(formData.Age, 10),
        Gender: parseInt(formData.Gender, 10),
        EducationLevel: parseInt(formData.EducationLevel, 10),
        BMI: parseFloat(formData.BMI),
        Smoking: formData.Smoking === "true" ? 1 : 0,
        AlcoholConsumption: parseFloat(formData.AlcoholConsumption),
        PhysicalActivity: parseFloat(formData.PhysicalActivity),
        DietQuality: parseFloat(formData.DietQuality),
        SleepQuality: parseFloat(formData.SleepQuality),
        FamilyHistoryAlzheimers:
          formData.FamilyHistoryAlzheimers === "true" ? 1 : 0,
        CardiovascularDisease:
          formData.CardiovascularDisease === "true" ? 1 : 0,
        Diabetes: formData.Diabetes === "true" ? 1 : 0,
        Depression: formData.Depression === "true" ? 1 : 0,
        HeadInjury: formData.HeadInjury === "true" ? 1 : 0,
        Hypertension: formData.Hypertension === "true" ? 1 : 0,
        SystolicBP: parseFloat(formData.SystolicBP),
        DiastolicBP: parseFloat(formData.DiastolicBP),
        CholesterolTotal: parseFloat(formData.CholesterolTotal),
        CholesterolLDL: parseFloat(formData.CholesterolLDL),
        CholesterolHDL: parseFloat(formData.CholesterolHDL),
        CholesterolTriglycerides: parseFloat(formData.CholesterolTriglycerides),
        MMSE: parseFloat(formData.MMSE),
        FunctionalAssessment: parseFloat(formData.FunctionalAssessment),
        MemoryComplaints: formData.MemoryComplaints === "true" ? 1 : 0,
        BehavioralProblems: formData.BehavioralProblems === "true" ? 1 : 0,
        ADL: parseFloat(formData.ADL),
        Confusion: formData.Confusion === "true" ? 1 : 0,
        Disorientation: formData.Disorientation === "true" ? 1 : 0,
        PersonalityChanges: formData.PersonalityChanges === "true" ? 1 : 0,
        DifficultyCompletingTasks:
          formData.DifficultyCompletingTasks === "true" ? 1 : 0,
        Forgetfulness: formData.Forgetfulness === "true" ? 1 : 0,
      },
      userName: "John Doe",
      userId: "USR002356",
      staffId: "STF000184",
    };

    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/predict/analyze-risk`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        setResponse(response.data[0].Predictions.XGBoost);
        setIsTableUpdated(!isTableUpdated);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleFillRandomData = () => {
    setFormData({
      PatientName: "John Doe",
      Age: (Math.floor(Math.random() * 31) + 60).toString(),
      Gender: Math.random() > 0.5 ? "0" : "1",
      EducationLevel: Math.floor(Math.random() * 4).toString(),
      BMI: (Math.random() * 25 + 15).toFixed(1),
      Smoking: Math.random() > 0.5 ? "true" : "false",
      AlcoholConsumption: (Math.random() * 20).toFixed(1),
      PhysicalActivity: (Math.random() * 10).toFixed(1),
      DietQuality: (Math.random() * 10).toFixed(1),
      SleepQuality: (Math.random() * 6 + 4).toFixed(1),
      FamilyHistoryAlzheimers: Math.random() > 0.5 ? "true" : "false",
      CardiovascularDisease: Math.random() > 0.5 ? "true" : "false",
      Diabetes: Math.random() > 0.5 ? "true" : "false",
      Depression: Math.random() > 0.5 ? "true" : "false",
      HeadInjury: Math.random() > 0.5 ? "true" : "false",
      Hypertension: Math.random() > 0.5 ? "true" : "false",
      SystolicBP: (Math.random() * 90 + 90).toFixed(1),
      DiastolicBP: (Math.random() * 60 + 60).toFixed(1),
      CholesterolTotal: (Math.random() * 150 + 150).toFixed(1),
      CholesterolLDL: (Math.random() * 150 + 50).toFixed(1),
      CholesterolHDL: (Math.random() * 80 + 20).toFixed(1),
      CholesterolTriglycerides: (Math.random() * 350 + 50).toFixed(1),
      MMSE: (Math.random() * 30).toFixed(1),
      FunctionalAssessment: (Math.random() * 10).toFixed(1),
      MemoryComplaints: Math.random() > 0.5 ? "true" : "false",
      BehavioralProblems: Math.random() > 0.5 ? "true" : "false",
      ADL: (Math.random() * 10).toFixed(1),
      Confusion: Math.random() > 0.5 ? "true" : "false",
      Disorientation: Math.random() > 0.5 ? "true" : "false",
      PersonalityChanges: Math.random() > 0.5 ? "true" : "false",
      DifficultyCompletingTasks: Math.random() > 0.5 ? "true" : "false",
      Forgetfulness: Math.random() > 0.5 ? "true" : "false",
    });
  };

  const handleSubmitModal = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitModalOpen(true);
  };

  return (
    <div>
      <form onSubmit={handleSubmitModal} className="space-y-6">
        <div className="border p-4 rounded-md bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Patient Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Patient Name
              </label>
              <input
                required
                type="text"
                name="PatientName"
                value={formData.PatientName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                required
                name="Gender"
                value={formData.Gender}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select Gender</option>
                <option value="0">Male</option>
                <option value="1">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <input
                required
                type="number"
                name="Age"
                value={formData.Age}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Education Level
              </label>
              <select
                required
                name="EducationLevel"
                value={formData.EducationLevel}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select Education Level</option>
                <option value="0">None</option>
                <option value="1">High School</option>
                <option value="2">Bachelor&apos;s Degree</option>
                <option value="3">Higher</option>
              </select>
            </div>
          </div>
        </div>

        <div className="border p-4 rounded-md bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Lifestyle Factors
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                BMI
              </label>
              <input
                required
                placeholder="15 to 40"
                type="number"
                name="BMI"
                step="0.1"
                value={formData.BMI}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Smoking
              </label>
              <select
                required
                name="Smoking"
                value={formData.Smoking}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Alcohol Consumption
              </label>
              <input
                required
                placeholder="0 to 20"
                type="number"
                name="AlcoholConsumption"
                step="0.1"
                value={formData.AlcoholConsumption}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Physical Activity
              </label>
              <input
                required
                placeholder="0 to 10"
                type="number"
                name="PhysicalActivity"
                step="0.1"
                value={formData.PhysicalActivity}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Diet Quality
              </label>
              <input
                required
                placeholder="0 to 10"
                type="number"
                name="DietQuality"
                step="0.1"
                value={formData.DietQuality}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sleep Quality
              </label>
              <input
                required
                placeholder="4 to 10"
                type="number"
                name="SleepQuality"
                step="0.1"
                value={formData.SleepQuality}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>
        </div>

        <div className="border p-4 rounded-md bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Medical History
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Family History of Alzheimer&apos;s
              </label>
              <select
                required
                name="FamilyHistoryAlzheimers"
                value={formData.FamilyHistoryAlzheimers}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cardiovascular Disease
              </label>
              <select
                required
                name="CardiovascularDisease"
                value={formData.CardiovascularDisease}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Diabetes
              </label>
              <select
                required
                name="Diabetes"
                value={formData.Diabetes}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Depression
              </label>
              <select
                required
                name="Depression"
                value={formData.Depression}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Head Injury
              </label>
              <select
                required
                name="HeadInjury"
                value={formData.HeadInjury}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hypertension
              </label>
              <select
                required
                name="Hypertension"
                value={formData.Hypertension}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>
        </div>

        <div className="border p-4 rounded-md bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Cardiovascular Health Indicators
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Systolic Blood Pressure
              </label>
              <input
                required
                placeholder="90 to 180 mmHg"
                type="number"
                name="SystolicBP"
                value={formData.SystolicBP}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Diastolic Blood Pressure
              </label>
              <input
                required
                placeholder="60 to 120 mmHg"
                type="number"
                name="DiastolicBP"
                value={formData.DiastolicBP}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total Cholesterol
              </label>
              <input
                required
                placeholder="150 to 300 mg/dL"
                type="number"
                name="CholesterolTotal"
                value={formData.CholesterolTotal}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                LDL Cholesterol
              </label>
              <input
                required
                placeholder="50 to 200 mg/dL"
                type="number"
                name="CholesterolLDL"
                value={formData.CholesterolLDL}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                HDL Cholesterol
              </label>
              <input
                required
                placeholder="20 to 100 mg/dL"
                type="number"
                name="CholesterolHDL"
                value={formData.CholesterolHDL}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Triglycerides Cholesterol
              </label>
              <input
                required
                placeholder="50 to 400 mg/dL"
                type="number"
                name="CholesterolTriglycerides"
                value={formData.CholesterolTriglycerides}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>
        </div>

        <div className="border p-4 rounded-md bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Cognitive and Functional Assessments
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mini-Mental State Examination (MMSE)
              </label>
              <input
                required
                placeholder="0 to 30"
                type="number"
                name="MMSE"
                value={formData.MMSE}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Functional Assessment
              </label>
              <input
                required
                placeholder="0 to 10"
                type="number"
                name="FunctionalAssessment"
                value={formData.FunctionalAssessment}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Memory Complaints
              </label>
              <select
                required
                name="MemoryComplaints"
                value={formData.MemoryComplaints}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Behavioral Problems
              </label>
              <select
                required
                name="BehavioralProblems"
                value={formData.BehavioralProblems}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ADL
              </label>
              <input
                required
                placeholder="0 to 10"
                type="number"
                name="ADL"
                value={formData.ADL}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>
        </div>

        <div className="border p-4 rounded-md bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Daily Functioning
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confusion
              </label>
              <select
                required
                name="Confusion"
                value={formData.Confusion}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Disorientation
              </label>
              <select
                name="Disorientation"
                value={formData.Disorientation}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Personality Changes
              </label>
              <select
                required
                name="PersonalityChanges"
                value={formData.PersonalityChanges}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Difficulty Completing Tasks
              </label>
              <select
                required
                name="DifficultyCompletingTasks"
                value={formData.DifficultyCompletingTasks}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Forgetfulness
              </label>
              <select
                required
                name="Forgetfulness"
                value={formData.Forgetfulness}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleFillRandomData}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md"
          >
            Fill Random Data
          </button>
          <button
            type="button"
            // onClick={() => setIsModalVisible(false)}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            Submit Analysis
          </button>
        </div>
      </form>

      {/* Submit Confirm Modal*/}
      <SubmitConfirmModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onConfirm={(e) => {
          setIsSubmitModalOpen(false);
          handleSubmitNewRecord(e);
        }}
      />

      {/* Prediction Result Modal */}
      <PredictionResultModal
        isOpen={response !== null}
        onClose={() => setResponse(null)}
        result={response}
      />
    </div>
  );
};

export default NewRiskRecordComponent;
