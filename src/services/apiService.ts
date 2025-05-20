import axios from "axios";
import { AnalysisResult, ApiResponse } from "@/types";

export const apiService = {
  // Authenticated MRI scan upload
  async uploadMriScan(
    file: File,
    token: string
  ): Promise<ApiResponse<AnalysisResult>> {
    try {
      const formData = new FormData();
      formData.append("image", file);

      // Log the URL to debug
      const url = `${process.env.NEXT_PUBLIC_API_URL}/predictions`;
      console.log("Making MRI upload request to:", url);

      const response = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("API Response:", response.data);

      // Format the response to match our AnalysisResult type
      const result: AnalysisResult = {
        prediction: response.data.prediction,
        confidence: response.data.confidence,
        raw_predictions: response.data.raw_predictions,
        status: response.data.status,
        details: {
          notes: "Analysis shows patterns that may be consistent with changes in brain structure.",
          recommendations: "Please consult with a healthcare professional for a complete evaluation.",
          regions: [
            {
              name: "Hippocampus",
              status: response.data.prediction === "Non Demented" ? "Normal" : "Abnormal",
              score: parseFloat(response.data.confidence) || 0.85,
            },
            {
              name: "Ventricles",
              status: response.data.prediction === "Non Demented" ? "Normal" : "Enlarged",
              score: (parseFloat(response.data.confidence) || 0.85) * 0.9,
            },
            {
              name: "Temporal Lobe",
              status: response.data.prediction === "Non Demented" ? "Normal" : "Reduced Volume",
              score: (parseFloat(response.data.confidence) || 0.85) * 1.1,
            },
          ],
        },
        id: response.data.id || "temp-id", // Store the ID from the backend
        timestamp: new Date().toISOString(),
      };

      return {
        success: true,
        data: result,
      };
    } catch (error: any) {
      console.error("Error uploading MRI scan:", error);
      return {
        success: false,
        error:
          error.response?.data?.error || error.message || "An error occurred",
      };
    }
  },

  // Public MRI analysis without authentication
  async analyzeMriPublic(file: File): Promise<ApiResponse<AnalysisResult>> {
    try {
      const formData = new FormData();
      formData.append("image", file);

      // Log the URL to debug
      const url = `${process.env.NEXT_PUBLIC_API_URL}/predictions/public-analyze`;
      console.log("Making public MRI analysis request to:", url);

      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Format the response to match our AnalysisResult type
      const result: AnalysisResult = {
        prediction: response.data.prediction,
        confidence: response.data.confidence,
        raw_predictions: response.data.raw_predictions,
        status: response.data.status,
        id: response.data.id || "temp-id",
      };

      return {
        success: true,
        data: result,
      };
    } catch (error: any) {
      console.error("Error analyzing MRI scan:", error);
      return {
        success: false,
        error:
          error.response?.data?.error || error.message || "An error occurred",
      };
    }
  },

  // Save results (requires authentication)
  async saveResults(
    results: AnalysisResult,
    token: string
  ): Promise<ApiResponse<void>> {
    try {
      // Check if results.id exists
      if (!results.id) {
        console.warn("No prediction ID available");
        return {
          success: false,
          error: "No prediction ID available to save results",
        };
      }

      // Log the URL to debug
      const url = `${process.env.NEXT_PUBLIC_API_URL}/predictions/save`;
      console.log("Saving results to:", url);
      console.log("Results data being sent:", {
        predictionId: results.id,
        details: results.details
      });

      const response = await axios.post(
        url,
        {
          predictionId: results.id,
          details: results.details || {
            notes: "Analysis shows patterns that may be consistent with cognitive changes.",
            recommendations: "Follow up with a healthcare professional for a comprehensive evaluation.",
            regions: [
              {
                name: "Hippocampus",
                status: results.prediction === "Non Demented" ? "Normal" : "Abnormal",
                score: 0.85,
              },
            ],
          }
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Save response:", response.data);

      return {
        success: true,
      };
    } catch (error: any) {
      console.error("Error saving results:", error);
      
      // More detailed error logging
      if (error.response) {
        console.error("Response error data:", error.response.data);
        console.error("Response error status:", error.response.status);
      }
      
      return {
        success: false,
        error:
          error.response?.data?.error ||
          error.message ||
          "An error occurred while saving",
      };
    }
  },

  // Get prediction history (requires authentication)
  async getPredictionHistory(
    token: string
  ): Promise<ApiResponse<AnalysisResult[]>> {
    try {
      // Log the URL to debug
      const url = `${process.env.NEXT_PUBLIC_API_URL}/predictions/history`;
      console.log("Fetching history from:", url);

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Transform the API response to match our frontend types
      const predictions = response.data.map((prediction: any) => ({
        prediction: prediction.prediction,
        confidence: prediction.confidence,
        details: prediction.details || {
          regions: [],
          notes: "No detailed analysis available",
          recommendations: "No recommendations available",
        },
        id: prediction._id,
        timestamp: prediction.createdAt,
      }));

      return {
        success: true,
        data: predictions,
      };
    } catch (error: any) {
      console.error("Error fetching prediction history:", error);
      return {
        success: false,
        error:
          error.response?.data?.error || error.message || "An error occurred",
      };
    }
  },
};