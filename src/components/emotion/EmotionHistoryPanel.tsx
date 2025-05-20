'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/ui/Button';

interface EmotionRecord {
  _id: string;
  userId: string;
  emotion: string;
  confidence: string;
  detectionMethod: 'face' | 'speech';
  responseGiven?: string;
  createdAt: string;
}

export default function EmotionHistoryPanel() {
  const [emotionRecords, setEmotionRecords] = useState<EmotionRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'face' | 'speech'>('all');
  const { token } = useAuth();

  useEffect(() => {
    const fetchEmotionHistory = async () => {
      // In a real app, this would be an API call
      // This is a mock implementation for demo purposes
      setTimeout(() => {
        const mockData: EmotionRecord[] = [
          {
            _id: '1',
            userId: 'user123',
            emotion: 'Happy',
            confidence: '86.5%',
            detectionMethod: 'face',
            responseGiven: "That's wonderful! Your happiness is clearly visible. What positive event has contributed to this joyful state?",
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() // 2 hours ago
          },
          {
            _id: '2',
            userId: 'user123',
            emotion: 'Sad',
            confidence: '78.3%',
            detectionMethod: 'speech',
            responseGiven: "I notice you seem sad. It's okay to feel this way. Would you like to talk about what's bothering you?",
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() // 1 day ago
          },
          {
            _id: '3',
            userId: 'user123',
            emotion: 'Neutral',
            confidence: '92.1%',
            detectionMethod: 'face',
            responseGiven: "You appear to be in a calm, neutral state. How are you feeling inside?",
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString() // 2 days ago
          },
          {
            _id: '4',
            userId: 'user123',
            emotion: 'Fear',
            confidence: '75.8%',
            detectionMethod: 'speech',
            responseGiven: "You seem concerned or anxious. Remember that you're safe here. Is there something specific that's worrying you?",
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString() // 3 days ago
          },
          {
            _id: '5',
            userId: 'user123',
            emotion: 'Angry',
            confidence: '82.7%',
            detectionMethod: 'face',
            responseGiven: "I can see you're feeling frustrated or angry. Taking deep breaths might help. Would you like to discuss what's causing these feelings?",
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString() // 5 days ago
          }
        ];
        
        setEmotionRecords(mockData);
        setIsLoading(false);
      }, 1000);
    };
    
    fetchEmotionHistory();
  }, [token]);

  const filteredRecords = activeFilter === 'all' 
    ? emotionRecords 
    : emotionRecords.filter(record => record.detectionMethod === activeFilter);

  const getEmotionColor = (emotion: string) => {
    const emotionColors: Record<string, { text: string; bg: string }> = {
      'Happy': { text: 'text-yellow-800', bg: 'bg-yellow-100' },
      'Sad': { text: 'text-blue-800', bg: 'bg-blue-100' },
      'Angry': { text: 'text-red-800', bg: 'bg-red-100' },
      'Neutral': { text: 'text-gray-800', bg: 'bg-gray-100' },
      'Fear': { text: 'text-purple-800', bg: 'bg-purple-100' },
      'Surprise': { text: 'text-amber-800', bg: 'bg-amber-100' }
    };
    
    return emotionColors[emotion] || { text: 'text-gray-800', bg: 'bg-gray-100' };
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Emotion Detection History</h2>
          <div className="inline-flex rounded-md shadow-sm">
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 text-sm font-medium ${
                activeFilter === 'all'
                  ? 'text-blue-700 bg-blue-100'
                  : 'text-gray-700 bg-white hover:bg-gray-50'
              } border border-gray-300 rounded-l-md focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('face')}
              className={`px-4 py-2 text-sm font-medium ${
                activeFilter === 'face'
                  ? 'text-blue-700 bg-blue-100'
                  : 'text-gray-700 bg-white hover:bg-gray-50'
              } border-t border-b border-r border-gray-300 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              Facial
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('speech')}
              className={`px-4 py-2 text-sm font-medium ${
                activeFilter === 'speech'
                  ? 'text-blue-700 bg-blue-100'
                  : 'text-gray-700 bg-white hover:bg-gray-50'
              } border-t border-b border-r border-gray-300 rounded-r-md focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              Speech
            </button>
          </div>
        </div>
      </div>
      
      <div className="px-6 py-4">
        {isLoading ? (
          <div className="py-8 text-center">
            <svg className="animate-spin mx-auto h-8 w-8 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="mt-2 text-sm text-gray-500">Loading emotion history...</p>
          </div>
        ) : error ? (
          <div className="p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        ) : filteredRecords.length === 0 ? (
          <div className="py-8 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No emotion records found</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by performing an emotion detection.</p>
          </div>
        ) : (
          <div className="flow-root">
            <ul className="divide-y divide-gray-200">
              {filteredRecords.map((record) => {
                const emotionStyle = getEmotionColor(record.emotion);
                
                return (
                  <li key={record._id} className="py-5">
                    <div className="flex items-start">
                      <div className={`flex-shrink-0 rounded-full p-2 ${emotionStyle.bg}`}>
                        {record.detectionMethod === 'face' ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                          </svg>
                        )}
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-medium">
                              <span className={emotionStyle.text}>{record.emotion}</span> 
                              <span className="text-gray-500 text-sm ml-2">({record.confidence})</span>
                            </h3>
                            <p className="text-sm text-gray-500">
                              {formatDate(record.createdAt)} · {record.detectionMethod === 'face' ? 'Facial Detection' : 'Speech Detection'}
                            </p>
                          </div>
                          <Button variant="secondary" size="sm">
                            View Details
                          </Button>
                        </div>
                        
                        {record.responseGiven && (
                          <div className="mt-3 text-sm">
                            <h4 className="font-medium text-gray-900">Suggested Response:</h4>
                            <p className="mt-1 text-gray-600 italic">"{record.responseGiven}"</p>
                          </div>
                        )}
                        
                        <div className="mt-3 flex">
                          <Button variant="secondary" size="sm" className="mr-2">
                            <svg className="mr-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Add to Report
                          </Button>
                          <Button variant="secondary" size="sm">
                            <svg className="mr-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Export
                          </Button>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}