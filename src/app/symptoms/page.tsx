// src/app/symptoms/page.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AppLayout from '@/components/layout/AppLayout';

export default function SymptomsPage() {
  const [activeCategory, setActiveCategory] = useState('cognitive');

  // Symptom categories with their associated symptoms
  const symptomCategories = [
    {
      id: 'cognitive',
      name: 'Cognitive Symptoms',
      description: 'Symptoms affecting thinking, reasoning, and memory',
      symptoms: [
        {
          name: 'Memory Loss',
          description: 'Forgetting recently learned information, important dates, or events. Asking for the same information repeatedly.',
          imageSrc: '/images/symptoms/memory-loss.jpg',
          imageAlt: 'Person forgetting information'
        },
        {
          name: 'Difficulty with Problem-Solving',
          description: 'Challenges in developing and following a plan, working with numbers, or following a familiar recipe.',
          imageSrc: '/images/symptoms/problem-solving.jpg',
          imageAlt: 'Person struggling with a simple task'
        },
        {
          name: 'Confusion with Time or Place',
          description: 'Losing track of dates, seasons, and the passage of time. May forget where they are or how they got there.',
          imageSrc: '/images/symptoms/time-confusion.jpg',
          imageAlt: 'Person looking confused about their surroundings'
        },
        {
          name: 'Difficulty with Visual/Spatial Relationships',
          description: 'Trouble reading, judging distance, determining color or contrast, which may cause issues with driving.',
          imageSrc: '/images/symptoms/visual-spatial.jpg',
          imageAlt: 'Person struggling with depth perception'
        }
      ]
    },
    {
      id: 'behavioral',
      name: 'Behavioral Symptoms',
      description: 'Changes in behavior, mood, and social interactions',
      symptoms: [
        {
          name: 'Changes in Mood and Personality',
          description: 'Becoming easily upset, confused, suspicious, depressed, fearful, or anxious. May also become irritable when out of their comfort zone.',
          imageSrc: '/images/symptoms/mood-changes.jpg',
          imageAlt: 'Person showing mood changes'
        },
        {
          name: 'Social Withdrawal',
          description: 'Removing themselves from hobbies, social activities, work projects, or sports. May have trouble keeping up with favorite teams or activities.',
          imageSrc: '/images/symptoms/social-withdrawal.jpg',
          imageAlt: 'Person isolating from social situations'
        },
        {
          name: 'Sleep Disturbances',
          description: 'Changes in sleep patterns, including difficulty sleeping, daytime sleeping, or nighttime wandering.',
          imageSrc: '/images/symptoms/sleep-disturbances.jpg',
          imageAlt: 'Person experiencing sleep problems'
        },
        {
          name: 'Agitation and Aggression',
          description: 'Becoming unusually frustrated, angry, or combative, especially in situations where cognitive limitations are challenged.',
          imageSrc: '/images/symptoms/agitation.jpg',
          imageAlt: 'Person showing signs of agitation'
        }
      ]
    },
    {
      id: 'physical',
      name: 'Physical Symptoms',
      description: 'Physical manifestations that may indicate Alzheimer\'s disease',
      symptoms: [
        {
          name: 'Difficulty with Daily Tasks',
          description: 'Trouble completing familiar tasks like driving to a known location, managing a budget, or remembering rules of a favorite game.',
          imageSrc: '/images/symptoms/daily-tasks.webp',
          imageAlt: 'Person struggling with everyday tasks'
        },
        {
          name: 'Motor Difficulties',
          description: 'Changes in coordination, balance, or movement patterns as the disease progresses.',
          imageSrc: '/images/symptoms/motor-difficulties.jpg',
          imageAlt: 'Person having balance issues'
        },
        {
          name: 'Weight Changes',
          description: 'Unexplained weight loss or gain, which may be related to forgetting to eat or changes in food preferences.',
          imageSrc: '/images/symptoms/weight-changes.jpg',
          imageAlt: 'Person experiencing weight changes'
        },
        {
          name: 'Incontinence',
          description: 'Loss of bladder or bowel control in later stages of the disease.',
          imageSrc: '/images/symptoms/incontinence.jpg',
          imageAlt: 'Medical illustration of incontinence'
        }
      ]
    },
    {
      id: 'language',
      name: 'Language & Communication',
      description: 'Problems with speaking, writing, or understanding language',
      symptoms: [
        {
          name: 'Word-Finding Difficulties',
          description: 'Trouble following or joining a conversation. May struggle to find the right word or call things by the wrong name.',
          imageSrc: '/images/symptoms/word-finding.jpg',
          imageAlt: 'Person struggling to find words'
        },
        {
          name: 'Repetitive Speech',
          description: 'Repeating the same statements, questions, or stories multiple times without realizing it.',
          imageSrc: '/images/symptoms/repetitive-speech.jpg',
          imageAlt: 'Person repeating themselves'
        },
        {
          name: 'Reduced Vocabulary',
          description: 'Using simpler language and fewer words, with diminishing ability to express complex thoughts.',
          imageSrc: '/images/symptoms/reduced-vocabulary.jpg',
          imageAlt: 'Person using simpler language'
        },
        {
          name: 'Written Communication Issues',
          description: 'Difficulty with writing, including spelling, grammar, and organizing thoughts on paper.',
          imageSrc: '/images/symptoms/writing-issues.png',
          imageAlt: 'Person struggling with writing'
        }
      ]
    }
  ];

  // Find the active category
  const currentCategory = symptomCategories.find(category => category.id === activeCategory) || symptomCategories[0];

  return (
    <AppLayout>
      {/* Hero Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Alzheimer's</span>
              <span className="block text-blue-600 mt-2">Signs & Symptoms</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
              Understanding the symptoms of Alzheimer's disease is crucial for early detection and intervention. Learn about the common signs to watch for.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Introduction */}
          <div className="max-w-3xl mx-auto mb-12">
            <p className="text-lg text-gray-700">
              Alzheimer's disease manifests through a range of symptoms that can vary from person to person. These symptoms typically develop slowly and worsen over time, eventually becoming severe enough to interfere with daily tasks. Recognizing these signs early can lead to better management and care planning.
            </p>
          </div>

          {/* Category Selector */}
          <div className="mb-10">
            <div className="flex flex-wrap justify-center gap-4">
              {symptomCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Category Description */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{currentCategory.name}</h2>
            <p className="text-xl text-gray-600">{currentCategory.description}</p>
          </div>

          {/* Symptoms List */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {currentCategory.symptoms.map((symptom, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
                <div className="relative h-48 bg-gray-200">
                  <Image 
                    src={symptom.imageSrc} 
                    alt={symptom.imageAlt}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-500/30" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{symptom.name}</h3>
                  <p className="text-gray-600">{symptom.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Early Signs Warning Box */}
          <div className="bg-amber-50 rounded-lg p-8 border border-amber-100 max-w-4xl mx-auto mb-16">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-7 w-7 text-amber-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-amber-800">10 Early Warning Signs of Alzheimer's</h3>
                <p className="mt-2 text-amber-700">
                  If you notice any of these signs in yourself or someone you know, don't ignore them. Schedule an appointment with your doctor.
                </p>
                <div className="mt-4 grid md:grid-cols-2 gap-x-6 gap-y-2">
                  <div className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-amber-200 flex items-center justify-center mr-2">
                      <span className="text-amber-800 text-xs font-medium">1</span>
                    </div>
                    <span className="text-amber-800">Memory loss that disrupts daily life</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-amber-200 flex items-center justify-center mr-2">
                      <span className="text-amber-800 text-xs font-medium">2</span>
                    </div>
                    <span className="text-amber-800">Challenges in planning or solving problems</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-amber-200 flex items-center justify-center mr-2">
                      <span className="text-amber-800 text-xs font-medium">3</span>
                    </div>
                    <span className="text-amber-800">Difficulty completing familiar tasks</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-amber-200 flex items-center justify-center mr-2">
                      <span className="text-amber-800 text-xs font-medium">4</span>
                    </div>
                    <span className="text-amber-800">Confusion with time or place</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-amber-200 flex items-center justify-center mr-2">
                      <span className="text-amber-800 text-xs font-medium">5</span>
                    </div>
                    <span className="text-amber-800">Trouble understanding visual images</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-amber-200 flex items-center justify-center mr-2">
                      <span className="text-amber-800 text-xs font-medium">6</span>
                    </div>
                    <span className="text-amber-800">New problems with words in speaking or writing</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-amber-200 flex items-center justify-center mr-2">
                      <span className="text-amber-800 text-xs font-medium">7</span>
                    </div>
                    <span className="text-amber-800">Misplacing things and losing the ability to retrace steps</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-amber-200 flex items-center justify-center mr-2">
                      <span className="text-amber-800 text-xs font-medium">8</span>
                    </div>
                    <span className="text-amber-800">Decreased or poor judgment</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-amber-200 flex items-center justify-center mr-2">
                      <span className="text-amber-800 text-xs font-medium">9</span>
                    </div>
                    <span className="text-amber-800">Withdrawal from work or social activities</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-amber-200 flex items-center justify-center mr-2">
                      <span className="text-amber-800 text-xs font-medium">10</span>
                    </div>
                    <span className="text-amber-800">Changes in mood and personality</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-blue-600 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Get Assessed Today</h2>
            <p className="text-xl text-blue-100 mb-6 max-w-3xl mx-auto">
              Early detection improves outcomes. Use our AI-powered tools to assess risk factors.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/risk-analysis" className="inline-block bg-white text-blue-600 font-medium py-3 px-6 rounded-md hover:bg-gray-100 transition-colors">
                Take Risk Assessment
              </Link>
              <Link href="/predict" className="inline-block bg-blue-700 text-white font-medium py-3 px-6 rounded-md hover:bg-blue-800 transition-colors">
                Try MRI Analysis
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
