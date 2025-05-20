// src/services/statsService.ts
import { Prediction } from '@/types';

/**
 * Service to calculate and retrieve MRI scan statistics
 */
export const statsService = {
  /**
   * Calculate dashboard statistics from prediction history
   * @param predictions Array of prediction history items
   * @returns Object containing calculated statistics
   */
  calculateStats: (predictions: Prediction[]) => {
    // Total number of scans
    const totalScans = predictions.length;
    
    // Count positive results (Demented cases)
    const positiveResults = predictions.filter(
      p => p.prediction === 'Demented' || p.prediction === 'Moderate Dementia' || p.prediction === 'Severe Dementia'
    ).length;
    
    // Count negative results (Non Demented cases)
    const negativeResults = predictions.filter(
      p => p.prediction === 'Non Demented' || p.prediction === 'Normal'
    ).length;
    
    // Calculate average confidence
    const avgConfidence = predictions.length > 0 
      ? (predictions.reduce((sum, p) => sum + p.confidence, 0) / predictions.length).toFixed(1)
      : '0.0';
    
    return {
      totalScans: totalScans.toString(),
      positiveResults: positiveResults.toString(),
      negativeResults: negativeResults.toString(),
      avgConfidence: `${avgConfidence}%`
    };
  },
  
  /**
   * Fetch prediction history from the API
   * @param token Authentication token
   * @returns Promise containing prediction history
   */
  fetchPredictionHistory: async (token: string): Promise<Prediction[]> => {
    try {
      // In production, use this API call:
      /*
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/predictions/history`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch prediction history');
      }
      
      return await response.json();
      */
      
      // For development/testing, use this mock data:
      // This could be extended to fetch from local storage to persist between sessions
      const mockPredictions: Prediction[] = [
        {
          _id: "1",
          userId: "user123",
          prediction: "Non Demented",
          confidence: 92.5,
          createdAt: "2025-03-08T10:30:00Z"
        },
        {
          _id: "2",
          userId: "user123",
          prediction: "Demented",
          confidence: 87.3,
          createdAt: "2025-03-06T15:20:00Z"
        },
        {
          _id: "3",
          userId: "user123",
          prediction: "Non Demented",
          confidence: 91.8,
          createdAt: "2025-03-02T09:15:00Z"
        },
        {
          _id: "4",
          userId: "user123",
          prediction: "Non Demented",
          confidence: 89.4,
          createdAt: "2025-02-28T14:45:00Z"
        },
        {
          _id: "5",
          userId: "user123",
          prediction: "Demented",
          confidence: 85.2,
          createdAt: "2025-02-22T11:10:00Z"
        }
      ];
      
      // Return mock data for now
      return mockPredictions;
    } catch (error) {
      console.error('Error fetching prediction history:', error);
      throw error;
    }
  },
  
  /**
   * Add a new prediction to history (in a real app, this would be an API call)
   * @param token Authentication token
   * @param prediction New prediction to add
   * @returns Updated list of predictions
   */
  addPrediction: async (token: string, prediction: Omit<Prediction, '_id' | 'createdAt'>): Promise<Prediction[]> => {
    try {
      // In production, use this API call:
      /*
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/predictions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(prediction)
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to add prediction');
      }
      
      // After adding, fetch the updated history
      return await statsService.fetchPredictionHistory(token);
      */
      
      // For development/testing, first get existing predictions
      const existingPredictions = await statsService.fetchPredictionHistory(token);
      
      // Create a new prediction with generated ID and timestamp
      const newPrediction: Prediction = {
        _id: (existingPredictions.length + 1).toString(),
        userId: "user123",
        prediction: prediction.prediction,
        confidence: prediction.confidence,
        createdAt: new Date().toISOString()
      };
      
      // In a real implementation, you would update localStorage or make an API call
      console.log('New prediction added:', newPrediction);
      
      // Return the updated list with the new prediction at the top
      return [newPrediction, ...existingPredictions];
    } catch (error) {
      console.error('Error adding prediction:', error);
      throw error;
    }
  }
};