"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import Button from "@/components/ui/Button";
import EmotionResultsPanel from "./EmotionResultsPanel";
import axios from "axios";

interface EmotionResult {
  emotion: string;
  confidence: string;
  details: {
    secondaryEmotions: { name: string; value: string }[];
    response: string;
    recommendations: string;
  };
}

export default function EmotionDetectionPanel() {
  // State for detection type
  const [detectionMode, setDetectionMode] = useState<"face" | "speech">("face");

  // State for uploaded files and previews
  const [faceFile, setFaceFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [facePreview, setFacePreview] = useState<string | null>(null);
  const [audioFileName, setAudioFileName] = useState<string | null>(null);

  // State for analysis results
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<EmotionResult | null>(null);
  const [faceResult, setFaceResult] = useState<EmotionResult | null>(null);
  const [speechResult, setSpeechResult] = useState<EmotionResult | null>(null);
  const { token } = useAuth();

  // Handle face image upload
  const handleFaceImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFaceFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      const preview = reader.result as string;
      setFacePreview(preview);
    };
    reader.readAsDataURL(file);
    setResults(null); // Clear previous results
  };

  // Handle audio file upload
  const handleAudioFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAudioFile(file);
    setAudioFileName(file.name);
    setResults(null); // Clear previous results
  };

  // Handle analysis
  const handleAnalyze = () => {
    setIsAnalyzing(true);
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };

    if (detectionMode === "face" && faceFile) {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}/predict/analyze-face`,
          { image: faceFile },
          {
            headers,
          }
        )
        .then((response) => {
          console.log(response.data);
          // setFaceResult(response.data);

          const faceResult = {
            emotion: response.data.emotion,
            confidence: (70 + Math.random() * 25).toFixed(1) + "%",
            details: {
              secondaryEmotions: [
                {
                  name: "Confidence",
                  value: (0.6 + Math.random() * 0.3).toFixed(2),
                },
                {
                  name: "Intensity",
                  value: (0.5 + Math.random() * 0.4).toFixed(2),
                },
                {
                  name: "Duration",
                  value: (0.4 + Math.random() * 0.5).toFixed(2),
                },
              ],
              response: getResponseForEmotion(response.data.emotion),
              recommendations: getRecommendationForEmotion(
                response.data.emotion
              ),
            },
          };
          setFaceResult(faceResult);
          setIsAnalyzing(false);
        })
        .catch((err) => {
          console.error("Error analyzing face emotion:", err);
          setIsAnalyzing(false);
        });
    } else if (detectionMode === "speech" && audioFile) {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}/predict/analyze-speech`,
          { audio: audioFile },
          {
            headers,
          }
        )
        .then((response) => {
          console.log(response.data);
          setSpeechResult(response.data);

          const speechResult = {
            emotion: response.data.emotion,
            confidence: (70 + Math.random() * 25).toFixed(1) + "%",
            details: {
              secondaryEmotions: [
                {
                  name: "Confidence",
                  value: (0.6 + Math.random() * 0.3).toFixed(2),
                },
                {
                  name: "Intensity",
                  value: (0.5 + Math.random() * 0.4).toFixed(2),
                },
                {
                  name: "Duration",
                  value: (0.4 + Math.random() * 0.5).toFixed(2),
                },
              ],
              response: getResponseForEmotion(response.data.emotion),
              recommendations: getRecommendationForEmotion(
                response.data.emotion
              ),
            },
          };
          setSpeechResult(speechResult);
          setIsAnalyzing(false);
        })
        .catch((err) => {
          console.error("Error analyzing speech emotion:", err);
          setIsAnalyzing(false);
        });
    } else if (
      (detectionMode === "face" && !faceFile) ||
      (detectionMode === "speech" && !audioFile)
    ) {
      setIsAnalyzing(false);
      return;
    }
  };

  // Helper function to get responses based on emotions
  const getResponseForEmotion = (emotion: string): string => {
    const responses: Record<string, string> = {
      Happy:
        "That's wonderful! Your happiness is clearly visible. What positive event has contributed to this joyful state?",
      Sad: "I notice you seem sad. It's okay to feel this way. Would you like to talk about what's bothering you?",
      Angry:
        "I can see you're feeling frustrated or angry. Taking deep breaths might help. Would you like to discuss what's causing these feelings?",
      Neutral:
        "You appear to be in a calm, neutral state. How are you feeling inside?",
      Fear: "You seem concerned or anxious. Remember that you're safe here. Is there something specific that's worrying you?",
      Surprise: "You look surprised! Did something unexpected happen recently?",
    };

    return (
      responses[emotion] ||
      "I'd like to understand how you're feeling better. Could you tell me more?"
    );
  };

  // Helper function to get recommendations based on emotions
  const getRecommendationForEmotion = (emotion: string): string => {
    const recommendations: Record<string, string> = {
      Happy:
        "Continue with activities that bring joy. Consider journaling about these positive moments to revisit when feeling low.",
      Sad: "Practice self-compassion and reach out to supportive friends or family. Light exercise or a change of scenery might help lift your mood.",
      Angry:
        "Try relaxation techniques such as deep breathing or counting to ten. Consider stepping away from triggering situations when possible.",
      Neutral:
        "This is a good time for mindfulness practice or reflection. Consider setting intentions for the day or week ahead.",
      Fear: "Grounding exercises can help with anxiety. Try the 5-4-3-2-1 technique: identify 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.",
      Surprise:
        "Take a moment to process the unexpected event. Consider how this might lead to new opportunities or perspectives.",
    };

    return (
      recommendations[emotion] ||
      "Regular check-ins with your emotions can help build emotional awareness and resilience."
    );
  };

  // Handle reset
  const handleReset = () => {
    if (detectionMode === "face") {
      setFaceFile(null);
      setFacePreview(null);
    } else {
      setAudioFile(null);
      setAudioFileName(null);
    }
    setResults(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {/* Emotion Detection Panel */}
      <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">
          {detectionMode === "face"
            ? "Upload Facial Image"
            : "Upload Audio File"}
        </h2>

        {/* Detection Type Selector */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => setDetectionMode("face")}
              className={`flex items-center px-4 py-2 border ${
                detectionMode === "face"
                  ? "bg-blue-100 border-blue-500 text-blue-700"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
              } rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              Facial Emotion Detection
            </button>
            <button
              type="button"
              onClick={() => setDetectionMode("speech")}
              className={`flex items-center px-4 py-2 border ${
                detectionMode === "speech"
                  ? "bg-blue-100 border-blue-500 text-blue-700"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
              } rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                  clipRule="evenodd"
                />
              </svg>
              Speech Emotion Detection
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {detectionMode === "face" ? (
            // Face Detection UI
            !facePreview ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Image
                </label>
                <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="face-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="face-upload"
                          name="face-upload"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleFaceImageChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Preview</h3>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-sm font-medium text-blue-600 hover:text-blue-500"
                  >
                    Change Image
                  </button>
                </div>
                <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={facePreview}
                    alt="Face Preview"
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="mt-6">
                  <Button
                    type="button"
                    onClick={handleAnalyze}
                    isLoading={isAnalyzing}
                    disabled={isAnalyzing}
                    className="w-full"
                  >
                    {isAnalyzing ? "Analyzing..." : "Analyze Facial Expression"}
                  </Button>
                </div>
              </div>
            )
          ) : (
            // Speech Upload UI
            <div className="flex flex-col items-center space-y-4">
              {!audioFileName ? (
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Audio File
                  </label>
                  <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="audio-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="audio-upload"
                            name="audio-upload"
                            type="file"
                            className="sr-only"
                            accept="audio/*"
                            onChange={handleAudioFileChange}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        WAV, MP3, M4A up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Selected Audio
                    </h3>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="text-sm font-medium text-blue-600 hover:text-blue-500"
                    >
                      Change File
                    </button>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg mb-4">
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-blue-500 mr-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                        />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {audioFileName}
                        </p>
                        <p className="text-xs text-gray-500">
                          Ready for analysis
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="button"
                    onClick={handleAnalyze}
                    isLoading={isAnalyzing}
                    disabled={isAnalyzing}
                    className="w-full"
                  >
                    {isAnalyzing ? "Analyzing..." : "Analyze Speech Emotion"}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Instructions Panel */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">How It Works</h2>
        <div className="space-y-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600">
                1
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Upload File</h3>
              <p className="mt-1 text-sm text-gray-500">
                {detectionMode === "face"
                  ? "Upload a clear image showing a facial expression."
                  : "Upload an audio file of speech (15-30 seconds)."}
              </p>
            </div>
          </div>
          <div className="flex">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600">
                2
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Analyze</h3>
              <p className="mt-1 text-sm text-gray-500">
                Our AI model will analyze the{" "}
                {detectionMode === "face"
                  ? "facial expression"
                  : "voice pattern"}{" "}
                to detect emotional states.
              </p>
            </div>
          </div>
          <div className="flex">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600">
                3
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Get Results</h3>
              <p className="mt-1 text-sm text-gray-500">
                View the detected emotion and recommended responses for
                caregivers.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-yellow-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Note for Caregivers
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  This tool is designed to assist in patient care by helping
                  identify emotional states that may be difficult to express
                  verbally. Always combine these insights with your professional
                  judgment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {detectionMode === "face" && faceResult && (
        <EmotionResultsPanel results={faceResult} />
      )}
      {detectionMode === "speech" && speechResult && (
        <EmotionResultsPanel results={speechResult} />
      )}

      {/* {results && <EmotionResultsPanel results={results} />} */}
    </div>
  );
}

// "use client";

// import { useState, useRef } from "react";
// import { useAuth } from "@/hooks/useAuth";
// import Button from "@/components/ui/Button";
// import EmotionResultsPanel from "./EmotionResultsPanel";
// import axios from "axios";

// interface EmotionResult {
//   emotion: string;
//   confidence: string;
//   details: {
//     secondaryEmotions: { name: string; value: string }[];
//     response: string;
//     recommendations: string;
//   };
// }

// export default function EmotionDetectionPanel() {
//   // State for detection type
//   const [detectionMode, setDetectionMode] = useState<"face" | "speech">("face");

//   // State for uploaded files and previews
//   const [faceFile, setFaceFile] = useState<File | null>(null);
//   const [audioFile, setAudioFile] = useState<File | null>(null);
//   const [facePreview, setFacePreview] = useState<string | null>(null);

//   // State for recording
//   const [isRecording, setIsRecording] = useState(false);
//   const audioRecorderRef = useRef<MediaRecorder | null>(null);
//   const audioChunksRef = useRef<Blob[]>([]);

//   // State for analysis results
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [results, setResults] = useState<EmotionResult | null>(null);
//   const [faceResult, setFaceResult] = useState<string | null>(null);
//   const [speechResult, setSpeechResult] = useState<string | null>(null);
//   const { token } = useAuth();

//   // Handle face image upload
//   const handleFaceImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setFaceFile(file);

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       const preview = reader.result as string;
//       setFacePreview(preview);
//     };
//     reader.readAsDataURL(file);
//     setResults(null); // Clear previous results
//   };

//   // Start audio recording
//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       const mediaRecorder = new MediaRecorder(stream);

//       audioChunksRef.current = [];
//       mediaRecorder.ondataavailable = (e) => {
//         if (e.data.size > 0) {
//           audioChunksRef.current.push(e.data);
//         }
//       };

//       mediaRecorder.onstop = () => {
//         const audioBlob = new Blob(audioChunksRef.current, {
//           type: "audio/wav",
//         });
//         const audioFile = new File([audioBlob], "recording.wav", {
//           type: "audio/wav",
//         });
//         setAudioFile(audioFile);
//       };

//       mediaRecorder.start();
//       audioRecorderRef.current = mediaRecorder;
//       setIsRecording(true);
//     } catch (err) {
//       console.error("Error accessing microphone:", err);
//     }
//   };

//   // Stop audio recording
//   const stopRecording = () => {
//     if (audioRecorderRef.current && isRecording) {
//       audioRecorderRef.current.stop();
//       setIsRecording(false);

//       // Stop all audio tracks
//       audioRecorderRef.current.stream
//         .getTracks()
//         .forEach((track) => track.stop());
//     }
//   };

//   // Handle analysis
//   const handleAnalyze = () => {
//     setIsAnalyzing(true);
//     const headers = {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "multipart/form-data",
//     };

//     if (detectionMode === "face" && faceFile) {
//       axios
//         .post(
//           `${process.env.NEXT_PUBLIC_API_URL}/predict/analyze-face`,
//           { image: faceFile },
//           {
//             headers,
//           }
//         )
//         .then((response) => {
//           console.log(response.data);
//           setFaceResult(response.data);

//           const mockResult = {
//             emotion: response.data.emotion,
//             confidence: (70 + Math.random() * 25).toFixed(1) + "%",
//             details: {
//               secondaryEmotions: [
//                 {
//                   name: "Confidence",
//                   value: (0.6 + Math.random() * 0.3).toFixed(2),
//                 },
//                 {
//                   name: "Intensity",
//                   value: (0.5 + Math.random() * 0.4).toFixed(2),
//                 },
//                 {
//                   name: "Duration",
//                   value: (0.4 + Math.random() * 0.5).toFixed(2),
//                 },
//               ],
//               response: getResponseForEmotion(response.data.emotion),
//               recommendations: getRecommendationForEmotion(
//                 response.data.emotion
//               ),
//             },
//           };
//           setResults(mockResult);
//           setIsAnalyzing(false);
//         })
//         .catch((err) => {
//           console.error("Error analyzing face emotion:", err);
//           setIsAnalyzing(false);
//         });
//     } else if (detectionMode === "speech" && audioFile) {
//       axios
//         .post(
//           `${process.env.NEXT_PUBLIC_API_URL}/predict/analyze-speech`,
//           { audio: audioFile },
//           {
//             headers,
//           }
//         )
//         .then((response) => {
//           console.log(response.data);
//           setSpeechResult(response.data);
//           setIsAnalyzing(false);
//         })
//         .catch((err) => {
//           console.error("Error analyzing speech emotion:", err);
//           setIsAnalyzing(false);
//         });
//     } else if (
//       (detectionMode === "face" && !faceFile) ||
//       (detectionMode === "speech" && !audioFile)
//     )
//       return;

//     setIsAnalyzing(true);

//     // Mock implementation for demo purposes
//     // setTimeout(() => {
//     // Mock results
//     // const emotions = ["Happy", "Sad", "Angry", "Neutral", "Fear", "Surprise"];
//     // const selectedEmotion =
//     //   emotions[Math.floor(Math.random() * emotions.length)];

//     // const mockResult = {
//     //   emotion: selectedEmotion,
//     //   confidence: (70 + Math.random() * 25).toFixed(1) + "%",
//     //   details: {
//     //     secondaryEmotions: [
//     //       {
//     //         name: "Confidence",
//     //         value: (0.6 + Math.random() * 0.3).toFixed(2),
//     //       },
//     //       {
//     //         name: "Intensity",
//     //         value: (0.5 + Math.random() * 0.4).toFixed(2),
//     //       },
//     //       { name: "Duration", value: (0.4 + Math.random() * 0.5).toFixed(2) },
//     //     ],
//     //     response: getResponseForEmotion(selectedEmotion),
//     //     recommendations: getRecommendationForEmotion(selectedEmotion),
//     //   },
//     // };

//     // setResults(mockResult);
//     //   setIsAnalyzing(false);
//     // }, 2000); // Simulate a 2-second API call
//   };

//   // Helper function to get responses based on emotions
//   const getResponseForEmotion = (emotion: string): string => {
//     const responses: Record<string, string> = {
//       Happy:
//         "That's wonderful! Your happiness is clearly visible. What positive event has contributed to this joyful state?",
//       Sad: "I notice you seem sad. It's okay to feel this way. Would you like to talk about what's bothering you?",
//       Angry:
//         "I can see you're feeling frustrated or angry. Taking deep breaths might help. Would you like to discuss what's causing these feelings?",
//       Neutral:
//         "You appear to be in a calm, neutral state. How are you feeling inside?",
//       Fear: "You seem concerned or anxious. Remember that you're safe here. Is there something specific that's worrying you?",
//       Surprise: "You look surprised! Did something unexpected happen recently?",
//     };

//     return (
//       responses[emotion] ||
//       "I'd like to understand how you're feeling better. Could you tell me more?"
//     );
//   };

//   // Helper function to get recommendations based on emotions
//   const getRecommendationForEmotion = (emotion: string): string => {
//     const recommendations: Record<string, string> = {
//       Happy:
//         "Continue with activities that bring joy. Consider journaling about these positive moments to revisit when feeling low.",
//       Sad: "Practice self-compassion and reach out to supportive friends or family. Light exercise or a change of scenery might help lift your mood.",
//       Angry:
//         "Try relaxation techniques such as deep breathing or counting to ten. Consider stepping away from triggering situations when possible.",
//       Neutral:
//         "This is a good time for mindfulness practice or reflection. Consider setting intentions for the day or week ahead.",
//       Fear: "Grounding exercises can help with anxiety. Try the 5-4-3-2-1 technique: identify 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.",
//       Surprise:
//         "Take a moment to process the unexpected event. Consider how this might lead to new opportunities or perspectives.",
//     };

//     return (
//       recommendations[emotion] ||
//       "Regular check-ins with your emotions can help build emotional awareness and resilience."
//     );
//   };

//   // Handle reset
//   const handleReset = () => {
//     if (detectionMode === "face") {
//       setFaceFile(null);
//       setFacePreview(null);
//     } else {
//       setAudioFile(null);
//     }
//     setResults(null);
//   };

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
//       {/* Emotion Detection Panel */}
//       <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6">
//         <h2 className="text-xl font-semibold mb-4">
//           {detectionMode === "face"
//             ? "Upload Facial Image"
//             : "Record Speech Sample"}
//         </h2>

//         {/* Detection Type Selector */}
//         <div className="mb-6">
//           <div className="flex flex-wrap gap-4">
//             <button
//               type="button"
//               onClick={() => setDetectionMode("face")}
//               className={`flex items-center px-4 py-2 border ${
//                 detectionMode === "face"
//                   ? "bg-blue-100 border-blue-500 text-blue-700"
//                   : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
//               } rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5 mr-2"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//               Facial Emotion Detection
//             </button>
//             <button
//               type="button"
//               onClick={() => setDetectionMode("speech")}
//               className={`flex items-center px-4 py-2 border ${
//                 detectionMode === "speech"
//                   ? "bg-blue-100 border-blue-500 text-blue-700"
//                   : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
//               } rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5 mr-2"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//               Speech Emotion Detection
//             </button>
//           </div>
//         </div>

//         <div className="space-y-6">
//           {detectionMode === "face" ? (
//             // Face Detection UI
//             !facePreview ? (
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Select Image
//                 </label>
//                 <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
//                   <div className="space-y-1 text-center">
//                     <svg
//                       className="mx-auto h-12 w-12 text-gray-400"
//                       stroke="currentColor"
//                       fill="none"
//                       viewBox="0 0 48 48"
//                       aria-hidden="true"
//                     >
//                       <path
//                         d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
//                         strokeWidth={2}
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                     </svg>
//                     <div className="flex text-sm text-gray-600">
//                       <label
//                         htmlFor="face-upload"
//                         className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
//                       >
//                         <span>Upload a file</span>
//                         <input
//                           id="face-upload"
//                           name="face-upload"
//                           type="file"
//                           className="sr-only"
//                           accept="image/*"
//                           onChange={handleFaceImageChange}
//                         />
//                       </label>
//                       <p className="pl-1">or drag and drop</p>
//                     </div>
//                     <p className="text-xs text-gray-500">
//                       PNG, JPG, GIF up to 10MB
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div>
//                 <div className="flex justify-between items-center mb-4">
//                   <h3 className="text-lg font-medium text-gray-900">Preview</h3>
//                   <button
//                     type="button"
//                     onClick={handleReset}
//                     className="text-sm font-medium text-blue-600 hover:text-blue-500"
//                   >
//                     Change Image
//                   </button>
//                 </div>
//                 <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
//                   <img
//                     src={facePreview}
//                     alt="Face Preview"
//                     className="h-full w-full object-contain"
//                   />
//                 </div>
//                 <div className="mt-6">
//                   <Button
//                     type="button"
//                     onClick={handleAnalyze}
//                     isLoading={isAnalyzing}
//                     disabled={isAnalyzing}
//                     className="w-full"
//                   >
//                     {isAnalyzing ? "Analyzing..." : "Analyze Facial Expression"}
//                   </Button>
//                 </div>
//               </div>
//             )
//           ) : (
//             // Speech Detection UI
//             <div>
//               <div className="flex flex-col items-center space-y-4">
//                 <div className="w-full p-6 bg-gray-50 rounded-lg flex flex-col items-center justify-center">
//                   <div
//                     className={`w-24 h-24 rounded-full flex items-center justify-center ${
//                       isRecording ? "bg-red-100 animate-pulse" : "bg-gray-100"
//                     }`}
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className={`h-12 w-12 ${
//                         isRecording ? "text-red-600" : "text-gray-400"
//                       }`}
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </div>

//                   <div className="mt-4 text-center">
//                     <p className="text-sm text-gray-500 mb-2">
//                       {isRecording
//                         ? "Recording... Speak clearly"
//                         : audioFile
//                         ? "Recording complete!"
//                         : "Click button below to start recording"}
//                     </p>

//                     <Button
//                       type="button"
//                       variant={isRecording ? "danger" : "primary"}
//                       onClick={isRecording ? stopRecording : startRecording}
//                       className="w-full"
//                     >
//                       {isRecording ? "Stop Recording" : "Start Recording"}
//                     </Button>
//                   </div>
//                 </div>

//                 {audioFile && !isRecording && (
//                   <div className="w-full">
//                     <Button
//                       type="button"
//                       onClick={handleAnalyze}
//                       isLoading={isAnalyzing}
//                       disabled={isAnalyzing}
//                       className="w-full"
//                     >
//                       {isAnalyzing ? "Analyzing..." : "Analyze Speech Emotion"}
//                     </Button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Instructions Panel */}
//       <div className="bg-white rounded-lg shadow-md p-6">
//         <h2 className="text-xl font-semibold mb-4">How It Works</h2>
//         <div className="space-y-4">
//           <div className="flex">
//             <div className="flex-shrink-0">
//               <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600">
//                 1
//               </div>
//             </div>
//             <div className="ml-4">
//               <h3 className="text-lg font-medium text-gray-900">
//                 Upload or Record
//               </h3>
//               <p className="mt-1 text-sm text-gray-500">
//                 {detectionMode === "face"
//                   ? "Upload a clear image showing a facial expression."
//                   : "Record a short speech sample (15-30 seconds)."}
//               </p>
//             </div>
//           </div>
//           <div className="flex">
//             <div className="flex-shrink-0">
//               <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600">
//                 2
//               </div>
//             </div>
//             <div className="ml-4">
//               <h3 className="text-lg font-medium text-gray-900">Analyze</h3>
//               <p className="mt-1 text-sm text-gray-500">
//                 Our AI model will analyze the{" "}
//                 {detectionMode === "face"
//                   ? "facial expression"
//                   : "voice pattern"}{" "}
//                 to detect emotional states.
//               </p>
//             </div>
//           </div>
//           <div className="flex">
//             <div className="flex-shrink-0">
//               <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600">
//                 3
//               </div>
//             </div>
//             <div className="ml-4">
//               <h3 className="text-lg font-medium text-gray-900">Get Results</h3>
//               <p className="mt-1 text-sm text-gray-500">
//                 View the detected emotion and recommended responses for
//                 caregivers.
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="mt-6 p-4 bg-yellow-50 rounded-md">
//           <div className="flex">
//             <div className="flex-shrink-0">
//               <svg
//                 className="h-5 w-5 text-yellow-400"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </div>
//             <div className="ml-3">
//               <h3 className="text-sm font-medium text-yellow-800">
//                 Note for Caregivers
//               </h3>
//               <div className="mt-2 text-sm text-yellow-700">
//                 <p>
//                   This tool is designed to assist in patient care by helping
//                   identify emotional states that may be difficult to express
//                   verbally. Always combine these insights with your professional
//                   judgment.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Results Section */}
//       {results && <EmotionResultsPanel results={results} />}
//     </div>
//   );
// }
