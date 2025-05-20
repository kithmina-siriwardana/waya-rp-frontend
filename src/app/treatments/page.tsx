// src/app/treatments/page.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AppLayout from '@/components/layout/AppLayout';

export default function TreatmentsPage() {
  const [activeTab, setActiveTab] = useState('medications');

  return (
    <AppLayout>
      {/* Hero Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            <span className="block">Treatment Options for</span>
            <span className="block text-blue-600 mt-1">Alzheimer's Disease</span>
          </h1>
          <p className="mt-4 text-lg text-center text-gray-600">
            Current approaches to managing symptoms and improving quality of life
          </p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-5xl mx-auto">
          <div className="flex overflow-x-auto pb-1">
            <button
              onClick={() => setActiveTab('medications')}
              className={`py-4 px-4 font-medium whitespace-nowrap ${
                activeTab === 'medications'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Medications
            </button>
            <button
              onClick={() => setActiveTab('non-drug')}
              className={`py-4 px-4 font-medium whitespace-nowrap ${
                activeTab === 'non-drug'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Non-Drug Therapies
            </button>
            <button
              onClick={() => setActiveTab('lifestyle')}
              className={`py-4 px-4 font-medium whitespace-nowrap ${
                activeTab === 'lifestyle'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Lifestyle Changes
            </button>
            <button
              onClick={() => setActiveTab('research')}
              className={`py-4 px-4 font-medium whitespace-nowrap ${
                activeTab === 'research'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Research & Trials
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Medications Tab */}
        {activeTab === 'medications' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">FDA-Approved Medications</h2>
            <p className="text-gray-700 mb-8">
              While current medications cannot stop the damage Alzheimer's causes to brain cells, they may help lessen or stabilize symptoms for a limited time.
            </p>
            
            <div className="grid gap-8 md:grid-cols-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Cholinesterase Inhibitors</h3>
                  <p className="text-gray-700 mb-4">
                    These medications prevent the breakdown of acetylcholine, a chemical messenger important for memory and learning.
                  </p>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Donepezil (Aricept®)</li>
                    <li>• Rivastigmine (Exelon®)</li>
                    <li>• Galantamine (Razadyne®)</li>
                  </ul>
                  <p className="text-sm text-gray-500 mt-3">For mild to moderate Alzheimer's</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">NMDA Receptor Antagonist</h3>
                  <p className="text-gray-700 mb-4">
                    This medication regulates the activity of glutamate, a brain chemical involved in learning and memory.
                  </p>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Memantine (Namenda®)</li>
                    <li>• Memantine + Donepezil (Namzaric®)</li>
                  </ul>
                  <p className="text-sm text-gray-500 mt-3">For moderate to severe Alzheimer's</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Anti-Amyloid Antibodies</h3>
                  <p className="text-gray-700 mb-4">
                    These newer treatments target and remove amyloid plaques from the brain, potentially slowing disease progression.
                  </p>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Aducanumab (Aduhelm™)</li>
                    <li>• Lecanemab (Leqembi™)</li>
                  </ul>
                  <p className="text-sm text-gray-500 mt-3">For early stage Alzheimer's</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Symptom Management</h3>
                  <p className="text-gray-700 mb-4">
                    Medications that may help manage specific symptoms associated with Alzheimer's.
                  </p>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Antidepressants</li>
                    <li>• Anxiolytics</li>
                    <li>• Sleep medications</li>
                    <li>• Antipsychotics (limited use)</li>
                  </ul>
                  <p className="text-sm text-gray-500 mt-3">Used as needed for specific symptoms</p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg mt-8">
              <p className="text-blue-800">
                <strong>Important note:</strong> Medication benefits are typically modest and temporary. Treatment decisions should be made in consultation with healthcare providers, weighing potential benefits against side effects.
              </p>
            </div>
          </div>
        )}
        
        {/* Non-Drug Therapies Tab */}
        {activeTab === 'non-drug' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Non-Drug Therapeutic Approaches</h2>
            <p className="text-gray-700 mb-8">
              Non-pharmacological interventions can be highly effective in improving quality of life, managing behavioral symptoms, and supporting cognitive function.
            </p>
            
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Cognitive Stimulation</h3>
                  <p className="text-gray-700">
                    Activities designed to stimulate thinking, concentration, and memory, often in a social setting.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">Memory games</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">Puzzles</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">Art activities</span>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Reminiscence Therapy</h3>
                  <p className="text-gray-700">
                    Discussing past experiences, often with aids such as photographs, music, or familiar items from the past.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">Photo albums</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">Music from youth</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">Life story books</span>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Music Therapy</h3>
                  <p className="text-gray-700">
                    Using music to address physical, emotional, cognitive, and social needs, often evoking responses when other approaches are ineffective.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">Singing</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">Rhythm activities</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">Musical instruments</span>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Art Therapy</h3>
                  <p className="text-gray-700">
                    Using creative expression to improve physical, mental, and emotional well-being when verbal communication becomes difficult.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">Painting</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">Drawing</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">Crafts</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-green-800 mb-2">Benefits of Non-Drug Approaches</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Minimal side effects compared to medications</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Can be personalized to individual interests and abilities</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Often provides social engagement and meaningful activities</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Can be effective even in advanced stages of the disease</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
        
        {/* Lifestyle Changes Tab */}
        {activeTab === 'lifestyle' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Lifestyle Modifications</h2>
            <p className="text-gray-700 mb-8">
              Healthy lifestyle choices may help manage symptoms, slow progression, and improve overall well-being for people with Alzheimer's disease.
            </p>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-40 bg-blue-50 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Nutrition</h3>
                  <p className="text-gray-700 mb-3">
                    A healthy diet may support brain health and overall well-being.
                  </p>
                  <ul className="space-y-1 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Mediterranean or MIND diet</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Rich in fruits, vegetables, whole grains</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Omega-3 fatty acids (fish, nuts)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Limited processed foods and sugar</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-40 bg-blue-50 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Physical Activity</h3>
                  <p className="text-gray-700 mb-3">
                    Regular exercise may help improve mood, sleep, and physical function.
                  </p>
                  <ul className="space-y-1 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Regular walking</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Chair exercises for limited mobility</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Gentle yoga or tai chi</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Swimming or water exercises</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-40 bg-blue-50 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Social Engagement</h3>
                  <p className="text-gray-700 mb-3">
                    Social connections may help maintain cognitive function and reduce isolation.
                  </p>
                  <ul className="space-y-1 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Regular family visits</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Community programs for seniors</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Adult day centers</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Support groups</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-40 bg-blue-50 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Sleep & Stress Management</h3>
                  <p className="text-gray-700 mb-3">
                    Quality sleep and stress reduction may help manage symptoms.
                  </p>
                  <ul className="space-y-1 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Consistent sleep schedule</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Relaxation techniques</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Minimizing stimulants (caffeine)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Calming bedtime routine</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Research & Trials Tab */}
        {activeTab === 'research' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Research & Clinical Trials</h2>
            <p className="text-gray-700 mb-8">
              Scientists are working on various approaches to better understand, treat, and potentially prevent Alzheimer's disease.
            </p>
            
            <div className="space-y-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Promising Research Areas</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-blue-700 mb-2">Disease-Modifying Treatments</h4>
                    <p className="text-gray-700 mb-2">
                      Therapies designed to address the underlying disease process rather than just managing symptoms.
                    </p>
                    <ul className="space-y-1 text-gray-600 text-sm">
                      <li>• Anti-amyloid antibodies</li>
                      <li>• Tau-targeting approaches</li>
                      <li>• Inflammation reduction strategies</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-700 mb-2">Early Detection</h4>
                    <p className="text-gray-700 mb-2">
                      Methods to identify Alzheimer's earlier, when treatments may be more effective.
                    </p>
                    <ul className="space-y-1 text-gray-600 text-sm">
                      <li>• Blood biomarkers</li>
                      <li>• Advanced brain imaging techniques</li>
                      <li>• Digital cognitive assessments</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-700 mb-2">Risk Reduction</h4>
                    <p className="text-gray-700 mb-2">
                      Strategies to reduce the risk or delay the onset of Alzheimer's disease.
                    </p>
                    <ul className="space-y-1 text-gray-600 text-sm">
                      <li>• Lifestyle interventions</li>
                      <li>• Managing vascular risk factors</li>
                      <li>• Cognitive training approaches</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-700 mb-2">Technology & Care</h4>
                    <p className="text-gray-700 mb-2">
                      Innovations to improve care delivery and quality of life.
                    </p>
                    <ul className="space-y-1 text-gray-600 text-sm">
                      <li>• AI-assisted monitoring</li>
                      <li>• Smart home technologies</li>
                      <li>• Virtual reality therapy</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-100">
                <h3 className="text-xl font-semibold text-indigo-900 mb-4">Clinical Trials</h3>
                <p className="text-gray-700 mb-4">
                  Clinical trials are research studies that test new approaches to prevention, detection, or treatment. Participating in clinical trials helps advance scientific knowledge and may provide access to new treatments before they're widely available.
                </p>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h4 className="font-medium text-indigo-800 mb-1">Consider participation if you:</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-indigo-600 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Have an Alzheimer's diagnosis</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-indigo-600 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Have a family history of Alzheimer's</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-indigo-600 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Want to contribute to scientific knowledge</span>
                      </li>
                    </ul>
                  </div>
                  <a 
                    href="https://www.nia.nih.gov/health/clinical-trials" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-indigo-600 text-white px-5 py-3 rounded-md text-center hover:bg-indigo-700 transition-colors"
                  >
                    Find Clinical Trials
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600">
        <div className="max-w-5xl mx-auto px-4 py-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Need personalized guidance?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Our tools can help you understand available treatments and create a personalized care plan.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            
            <Link href="/risk-analysis" className="bg-white text-blue-600 font-medium px-5 py-3 rounded-md hover:bg-gray-100 transition-colors">
              Take Risk Assessment
            </Link>
            <Link href="/contact" className="bg-blue-700 text-white font-medium px-5 py-3 rounded-md hover:bg-blue-800 transition-colors">
              Speak with a Specialist
            </Link>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}