import React from "react";
import Button from "@/components/ui/Button";
import { ResultCreate } from "@/types/risk-analysis";

interface PredictionResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: ResultCreate | null;
  onBackToRecords?: () => void;
}

export default function PredictionResultModal({
  isOpen,
  onClose,
  result,
  onBackToRecords,
}: PredictionResultModalProps) {
  if (!isOpen || !result) return null;

  // Convert numerical prediction to string if needed
  const predictionStr =
    typeof result.Prediction === "number"
      ? result.Prediction === 0
        ? "Negative"
        : "Positive"
      : result.Prediction;

  // Determine if it's a negative result
  const isNegative =
    predictionStr === "Negative" ||
    (typeof result.Prediction === "number" && result.Prediction === 0);

  console.log("result", result);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full mx-3 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-3 flex justify-between items-center border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4 text-blue-600"
            >
              <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z" />
            </svg>
            Risk Analysis Results
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 rounded-full p-1 hover:bg-gray-100 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Result Card */}
          <div
            className={`rounded-lg p-3 mb-4 ${
              isNegative
                ? "bg-green-50 border border-green-100"
                : "bg-red-50 border border-red-100"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                {isNegative ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-8 h-8 text-green-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-8 h-8 text-red-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <p
                className={`text-base font-medium ${
                  isNegative ? "text-green-700" : "text-red-700"
                }`}
              >
                {isNegative
                  ? "You are good! No possibility of Alzheimer's disease."
                  : "Possibility of Alzheimer's disease detected."}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-4 mb-4">
            <div className="text-center">
              <p className="text-sm text-gray-500 uppercase tracking-wide">
                Result
              </p>
              <div
                className={`text-base font-medium mt-1 px-3 py-0.5 rounded-full ${
                  isNegative
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {predictionStr}
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-500 uppercase tracking-wide">
                Percentage
              </p>
              <div className="text-base font-medium mt-1 px-3 py-0.5 rounded-full bg-blue-100 text-blue-700">
                {result.Confidence}%
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="space-y-3 rounded-lg border border-gray-200 p-3 bg-gray-50 text-sm">
            <h3 className="font-semibold text-lg text-gray-800 flex items-center gap-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 text-blue-500"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
                  clipRule="evenodd"
                />
              </svg>
              System Recommendations
            </h3>

            <div className="space-y-3">
              <div className="bg-white rounded p-2.5 border-l-3 border-yellow-400 shadow-sm">
                <p className="text-gray-700 text-base font-semibold mb-2">
                  Risk Level: 50% - 75%
                </p>
                <p className="text-gray-600 text-md  mb-2">
                  We recommend engaging in memory therapy activities to help
                  improve cognitive function and reduce risk.
                </p>
                <Button
                  onClick={() => {
                    window.location.href = "/memory-therapy";
                  }}
                  className="w-full py-1.8 text-sm h-auto mt-1"
                >
                  <span className="flex items-center justify-center gap-1.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-3.5 h-3.5"
                    >
                      <path d="M10 1a6 6 0 00-3.815 10.631C7.237 12.5 8 13.443 8 14.456v.644a.75.75 0 00.572.729 6.016 6.016 0 002.856 0A.75.75 0 0012 15.1v-.644c0-1.013.762-1.957 1.815-2.825A6 6 0 0010 1zM8.863 17.414a.75.75 0 00-.226 1.483 9.066 9.066 0 002.726 0 .75.75 0 00-.226-1.483 7.553 7.553 0 01-2.274 0z" />
                    </svg>
                    Visit Memory Therapy Activities
                  </span>
                </Button>
              </div>

              <div className="bg-white rounded p-2.5 border-l-3 border-red-400 shadow-sm">
                <p className="text-gray-700 text-base font-semibold mb-2">
                  Risk Level: 75% - 100%
                </p>
                <p className="text-gray-600 text-md mb-2">
                  We highly recommend scheduling an MRI scan for a more accurate
                  diagnosis. You can also try our MRI prediction tool for
                  further insights.
                </p>
                <Button
                  onClick={() => {
                    window.location.href = "/mri-detection";
                  }}
                  className="w-full py-1.8 text-ms h-auto mt-1"
                >
                  <span className="flex items-center justify-center gap-1.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-3.5 h-3.5"
                    >
                      <path d="M10.362 1.093a.75.75 0 00-.724 0L2.648 5.066a.75.75 0 00-.36.65v8.569c0 .257.13.497.36.65l6.99 3.973a.75.75 0 00.724 0l6.99-3.973a.75.75 0 00.36-.65V5.716a.75.75 0 00-.36-.65l-6.99-3.973zM7.538 7.404a.75.75 0 00-.528.923l.17.56a.75.75 0 00.923.528l.56-.17a.75.75 0 00.528-.923l-.17-.56a.75.75 0 00-.923-.528l-.56.17zm5.304-.17l.56.17a.75.75 0 01.528.923l-.17.56a.75.75 0 01-.923.528l-.56-.17a.75.75 0 01-.528-.923l.17-.56a.75.75 0 01.923-.528zM7.404 11.538a.75.75 0 00-.923.528l-.17.56a.75.75 0 00.528.923l.56.17a.75.75 0 00.923-.528l.17-.56a.75.75 0 00-.528-.923l-.56-.17zm4.298.923a.75.75 0 01.528-.923l.56-.17a.75.75 0 01.923.528l.17.56a.75.75 0 01-.528.923l-.56.17a.75.75 0 01-.923-.528l-.17-.56z" />
                    </svg>
                    Visit MRI Prediction Tool
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-4 py-3 flex justify-end gap-2 border-t border-gray-100">
          {onBackToRecords && (
            <Button
              variant="secondary"
              onClick={onBackToRecords}
              className="py-1 px-3 text-xs h-auto"
            >
              <span className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-3.5 h-3.5"
                >
                  <path
                    fillRule="evenodd"
                    d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
                    clipRule="evenodd"
                  />
                </svg>
                Back to Records
              </span>
            </Button>
          )}

          <Button
            variant="secondary"
            onClick={onClose}
            className="py-1.5 px-3 text-sm h-auto"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

// import React from "react";
// import Button from "@/components/ui/Button";
// import { ResultCreate } from "@/types/risk-analysis";

// interface PredictionResultModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   result: ResultCreate | null;
//   onBackToRecords?: () => void;
// }

// export default function PredictionResultModal({
//   isOpen,
//   onClose,
//   result,
//   onBackToRecords,
// }: PredictionResultModalProps) {
//   if (!isOpen || !result) return null;

//   // Convert numerical prediction to string if needed
//   const predictionStr =
//     typeof result.Prediction === "number"
//       ? result.Prediction === 0
//         ? "Negative"
//         : "Positive"
//       : result.Prediction;

//   // Determine if it's a negative result
//   const isNegative =
//     predictionStr === "Negative" ||
//     (typeof result.Prediction === "number" && result.Prediction === 0);

//   console.log("result", result);

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg shadow-xl max-w-xl w-full p-6 mx-4">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-2xl font-bold text-gray-800">
//             Risk Analysis Results
//           </h2>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700"
//           >
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           </button>
//         </div>

//         <div className="my-6 text-center border-t  border-gray-300 pt-6">
//           {/* <p className="text-xl font-medium mb-6">
//             Record has been analyzed successfully!
//           </p> */}

//           <p
//             className={`text-2xl font-bold ${
//               isNegative ? "text-green-600" : "text-red-600"
//             } mb-8`}
//           >
//             {isNegative
//               ? "You are good! No possibility of Alzheimer's disease."
//               : "Possibility of Alzheimer's disease detected."}
//           </p>

//           <div className="space-y-4 mb-6">
//             <p className="text-xl">
//               Result:{" "}
//               <span
//                 className={
//                   isNegative
//                     ? "text-green-600 font-bold"
//                     : "text-red-600 font-bold"
//                 }
//               >
//                 {predictionStr}
//               </span>
//             </p>

//             <p className="text-xl">
//               Percentage:{" "}
//               <span className="text-blue-500 font-bold">
//                 {result.Confidence}%
//               </span>
//             </p>
//           </div>

//           <div className="space-y-4 text-start border-t  border-gray-300 pt-6">
//             <p className="text-lg font-medium">System Recommendations:</p>
//             <p>Risk Level: 50 - 75%</p>
//             <p>
//               We recommend engaging in memory therapy activities to help improve
//               cognitive function and reduce risk.
//             </p>
//             <Button
//               onClick={() => {
//                 console.log("Memory therapy button clicked");
//               }}
//               className="sm:flex-1"
//             >
//               Visit Memory Therapy Activities
//             </Button>
//             <p>Risk Level: 75% - 100%</p>{" "}
//             <p>
//               We highly recommend scheduling an MRI scan for a more accurate
//               diagnosis. You can also try our MRI prediction tool for further
//               insights.
//             </p>
//             <Button
//               onClick={() => {
//                 console.log("Memory therapy button clicked");
//               }}
//               className="sm:flex-1"
//             >
//               Visit MRI Prediction Tool
//             </Button>
//           </div>
//         </div>

//         <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
//           {onBackToRecords && (
//             <Button
//               variant="secondary"
//               onClick={onBackToRecords}
//               className="sm:flex-1"
//             >
//               Back to Records
//             </Button>
//           )}

//           <Button variant="secondary" onClick={onClose} className="sm:flex-1">
//             Close
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }
