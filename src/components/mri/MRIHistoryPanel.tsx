// // src/components/mri/MRIHistoryPanel.tsx
// import React, { useEffect, useState } from 'react';
// import { useAuth } from '@/hooks/useAuth';
// import { AnalysisResult, Prediction } from '@/types';
// import { apiService } from '@/services/apiService';
// import Button from '@/components/ui/Button';

// interface MRIHistoryPanelProps {
//   onSelectResult?: (result: AnalysisResult) => void;
//   onClose?: () => void;
//   onViewFullHistory?: () => void;
//   limit?: number; // Optional limit for number of records to show
// }

// export default function MRIHistoryPanel({ 
//   onSelectResult, 
//   onClose, 
//   onViewFullHistory,
//   limit 
// }: MRIHistoryPanelProps) {
//   const [predictions, setPredictions] = useState<Prediction[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const { token } = useAuth();

//   useEffect(() => {
//     const fetchHistory = async () => {
//       if (!token) {
//         setError('Please log in to view history');
//         setIsLoading(false);
//         return;
//       }

//       try {
//         setIsLoading(true);
//         const response = await apiService.getPredictionHistory(token);
        
//         if (response.success && response.data) {
//           // Convert to Prediction type if needed and apply limit if specified
//           let historyData = response.data as unknown as Prediction[];
//           if (limit && limit > 0) {
//             historyData = historyData.slice(0, limit);
//           }
//           setPredictions(historyData);
//         } else {
//           setError(response.error || 'Failed to fetch history');
//         }
//       } catch (err) {
//         console.error('Error fetching history:', err);
//         setError('An unexpected error occurred');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchHistory();
//   }, [token, limit]);

//   const formatDate = (dateString?: string) => {
//     if (!dateString) return 'Unknown';
//     const date = new Date(dateString);
//     return new Intl.DateTimeFormat('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     }).format(date);
//   };

//   // Convert Prediction to AnalysisResult format for selection
//   const handleSelect = (prediction: Prediction) => {
//     if (!onSelectResult) return;
    
//     const result: AnalysisResult = {
//       prediction: prediction.prediction,
//       confidence: prediction.confidence,
//       id: prediction._id,
//       timestamp: prediction.createdAt,
//       details: prediction.details,
//       // Add other fields as needed
//     };
    
//     onSelectResult(result);
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-md p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-xl font-semibold">Recent MRI Analysis History</h2>
//         <div className="flex space-x-3">
//           {onViewFullHistory && (
//             <Button onClick={onViewFullHistory} variant="primary" className="text-sm">
//               View Full History
//             </Button>
//           )}
//           {onClose && (
//             <Button onClick={onClose} variant="secondary" className="text-sm">
//               Back to Analyzer
//             </Button>
//           )}
//         </div>
//       </div>

//       {isLoading ? (
//         <div className="text-center py-8">
//           <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
//           <p className="mt-2 text-gray-600">Loading history...</p>
//         </div>
//       ) : error ? (
//         <div className="bg-red-50 text-red-800 p-4 rounded-md">
//           {error}
//         </div>
//       ) : predictions.length === 0 ? (
//         <div className="text-center py-8">
//           <p className="text-gray-600">No previous MRI scans found.</p>
//         </div>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Date
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Prediction
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Confidence
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {predictions.map((prediction) => (
//                 <tr key={prediction._id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {formatDate(prediction.createdAt)}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span 
//                       className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                         prediction.prediction === 'Non Demented' 
//                           ? 'bg-green-100 text-green-800' 
//                           : 'bg-red-100 text-red-800'
//                       }`}
//                     >
//                       {prediction.prediction}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {typeof prediction.confidence === 'number' 
//                       ? `${(prediction.confidence * 100).toFixed(1)}%`
//                       : prediction.confidence}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                     {onSelectResult && (
//                       <button
//                         onClick={() => handleSelect(prediction)}
//                         className="text-blue-600 hover:text-blue-900"
//                       >
//                         View Details
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
          
//           {limit && predictions.length >= limit && (
//             <div className="mt-4 text-center">
//               <p className="text-sm text-gray-500">
//                 Showing the {limit} most recent scans.{' '}
//                 {onViewFullHistory && (
//                   <button 
//                     onClick={onViewFullHistory}
//                     className="text-blue-600 hover:text-blue-800 font-medium"
//                   >
//                     View all history
//                   </button>
//                 )}
//               </p>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }