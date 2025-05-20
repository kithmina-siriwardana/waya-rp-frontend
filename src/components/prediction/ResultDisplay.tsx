// src/components/prediction/ResultDisplay.tsx
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { PredictionResult } from '@/types';

interface ResultDisplayProps {
  result: PredictionResult;
}

export default function ResultDisplay({ result }: ResultDisplayProps) {
  const router = useRouter();
  
  return (
    <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-4">Result</h2>
      
      <div className="space-y-3">
        <p className="text-gray-700">
          <span className="font-medium">Diagnosis:</span>{' '}
          <span className={
            result.prediction === 'Non Demented' 
              ? 'text-green-600 font-bold' 
              : 'text-red-600 font-bold'
          }>
            {result.prediction}
          </span>
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Confidence:</span>{' '}
          {result.confidence}
        </p>
      </div>
      
      <div className="mt-6">
        <Button
          onClick={() => router.push('/history')}
          variant="secondary"
        >
          View Past Predictions
        </Button>
      </div>
    </div>
  );
}