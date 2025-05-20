// src/app/about/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AppLayout from "@/components/layout/AppLayout";

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("mission");

  return (
    <AppLayout>
      {/* Hero Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">About</span>
              <span className="block text-blue-600 mt-2">
                Alzheimer&apos;s Care
              </span>
            </h1>
            <p className="mt-6 max-w-lg mx-auto text-xl text-gray-500">
              Dedicated to improving the quality of life for those affected by
              Alzheimer&apos;s disease through innovative technology and
              compassionate care.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row">
            {/* Left Column - Image and Mission */}
            <div className="md:w-1/2 pr-0 md:pr-12 mb-8 md:mb-0">
              <div className="relative rounded-full overflow-hidden border-8 border-gray-100 shadow-lg w-full max-w-md mx-auto aspect-square">
                <Image
                  src="/images/symptoms/about.jpg"
                  alt="Our Team"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-8 right-8 bg-blue-600 text-white rounded-full p-4 shadow-lg">
                  <div className="text-center">
                    <p className="font-semibold">Est.</p>
                    <p className="text-2xl font-bold">2023</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 bg-gray-50 p-8 rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  We&apos;re here to help
                </h2>
                <p className="text-gray-600 mb-6">
                  Alzheimer&apos;s Care is committed to providing innovative
                  technological solutions that help detect, manage, and treat
                  Alzheimer&apos;s disease. Our platform combines cutting-edge
                  AI with user-friendly interfaces to make a real difference in
                  people&apos;s lives.
                </p>
                <Link
                  href="/contact"
                  className="bg-blue-600 text-white px-6 py-3 rounded-md inline-block font-medium hover:bg-blue-700 transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Right Column - Tabs */}
            <div className="md:w-1/2">
              {/* Tabs Navigation */}
              <div className="border-b border-gray-200 mb-8">
                <nav className="flex space-x-8">
                  <button
                    onClick={() => setActiveTab("mission")}
                    className={`py-4 px-1 border-b-2 font-medium text-md ${
                      activeTab === "mission"
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Our Mission
                  </button>
                  <button
                    onClick={() => setActiveTab("team")}
                    className={`py-4 px-1 border-b-2 font-medium text-md ${
                      activeTab === "team"
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Our Team
                  </button>
                  <button
                    onClick={() => setActiveTab("approach")}
                    className={`py-4 px-1 border-b-2 font-medium text-md ${
                      activeTab === "approach"
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Our Approach
                  </button>
                </nav>
              </div>

              {/* Tab Content */}
              <div className="py-4">
                {activeTab === "mission" && (
                  <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-gray-900">
                      Our Mission
                    </h2>
                    <p className="text-lg text-gray-600">
                      At Alzheimer&apos;s Care, our mission is to transform the
                      landscape of Alzheimer&apos;s disease management through
                      technology. We&apos;re dedicated to developing tools that
                      aid in early detection, provide comprehensive care
                      support, and improve quality of life for those affected by
                      Alzheimer&apos;s disease.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-blue-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                            />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Early Detection
                        </h3>
                        <p className="text-gray-600">
                          Our AI-powered tools help identify early signs of
                          Alzheimer&apos;s, enabling intervention when it
                          matters most.
                        </p>
                      </div>
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-blue-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                            />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Comprehensive Care
                        </h3>
                        <p className="text-gray-600">
                          We support patients, caregivers, and healthcare
                          professionals with integrated care solutions.
                        </p>
                      </div>
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-blue-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                            />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Innovation Focus
                        </h3>
                        <p className="text-gray-600">
                          We continuously develop and improve our technology to
                          stay at the forefront of Alzheimer&apos;s care.
                        </p>
                      </div>
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-blue-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                            />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Community Support
                        </h3>
                        <p className="text-gray-600">
                          We build communities where families affected by
                          Alzheimer&apos;s can find resources and connection.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "team" && (
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                      Our Team
                    </h2>
                    <p className="text-lg text-gray-600 mb-8">
                      Our multidisciplinary team combines expertise in medicine,
                      technology, and patient care to create solutions that make
                      a real difference in the lives of those affected by
                      Alzheimer&apos;s disease.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="bg-gray-50 rounded-lg overflow-hidden">
                        <div className="p-6">
                          <h3 className="text-xl font-semibold text-gray-900">
                            Leadership
                          </h3>
                          <p className="mt-2 text-gray-600">
                            Our leadership team brings decades of combined
                            experience in healthcare technology, neuroscience,
                            and business development.
                          </p>
                          <ul className="mt-4 space-y-2">
                            <li className="flex items-center">
                              <svg
                                className="h-5 w-5 text-blue-500 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              <span className="text-gray-700">
                                K.M.S.S. Karunanayake (IT21234002)
                              </span>
                            </li>
                            <li className="flex items-center">
                              <svg
                                className="h-5 w-5 text-blue-500 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              <span className="text-gray-700">
                                S.M.L.E Bandara (IT21354656)
                              </span>
                            </li>
                            <li className="flex items-center">
                              <svg
                                className="h-5 w-5 text-blue-500 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              <span className="text-gray-700">
                                M.K.T.D. Meegoda (IT21233258)
                              </span>
                            </li>
                            <li className="flex items-center">
                              <svg
                                className="h-5 w-5 text-blue-500 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              <span className="text-gray-700">
                                B.M.W.P Jayawardhana (IT21262654)
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg overflow-hidden">
                        <div className="p-6">
                          <h3 className="text-xl font-semibold text-gray-900">
                            Technical Team
                          </h3>
                          <p className="mt-2 text-gray-600">
                            Our engineers and developers work tirelessly to
                            build and refine our technology platform.
                          </p>
                          <ul className="mt-4 space-y-2">
                            <li className="flex items-center">
                              <svg
                                className="h-5 w-5 text-blue-500 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              <span className="text-gray-700">
                                AI and Machine Learning Specialists
                              </span>
                            </li>
                            <li className="flex items-center">
                              <svg
                                className="h-5 w-5 text-blue-500 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              <span className="text-gray-700">
                                Full-Stack Software Developers
                              </span>
                            </li>
                            <li className="flex items-center">
                              <svg
                                className="h-5 w-5 text-blue-500 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              <span className="text-gray-700">
                                UX/UI Designers
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg overflow-hidden">
                        <div className="p-6">
                          <h3 className="text-xl font-semibold text-gray-900">
                            Medical Advisors
                          </h3>
                          <p className="mt-2 text-gray-600">
                            Our platform is developed with guidance from leading
                            experts in neurology and Alzheimer&apos;s research.
                          </p>
                          <ul className="mt-4 space-y-2">
                            <li className="flex items-center">
                              <svg
                                className="h-5 w-5 text-blue-500 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              <span className="text-gray-700">
                                Board-Certified Neurologists
                              </span>
                            </li>
                            <li className="flex items-center">
                              <svg
                                className="h-5 w-5 text-blue-500 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              <span className="text-gray-700">
                                Geriatric Care Specialists
                              </span>
                            </li>
                            <li className="flex items-center">
                              <svg
                                className="h-5 w-5 text-blue-500 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              <span className="text-gray-700">
                                Alzheimer&apos;s Researchers
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg overflow-hidden">
                        <div className="p-6">
                          <h3 className="text-xl font-semibold text-gray-900">
                            Support Team
                          </h3>
                          <p className="mt-2 text-gray-600">
                            Our dedicated support staff ensures that users have
                            the best possible experience with our platform.
                          </p>
                          <ul className="mt-4 space-y-2">
                            <li className="flex items-center">
                              <svg
                                className="h-5 w-5 text-blue-500 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              <span className="text-gray-700">
                                Patient Care Coordinators
                              </span>
                            </li>
                            <li className="flex items-center">
                              <svg
                                className="h-5 w-5 text-blue-500 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              <span className="text-gray-700">
                                Technical Support Specialists
                              </span>
                            </li>
                            <li className="flex items-center">
                              <svg
                                className="h-5 w-5 text-blue-500 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              <span className="text-gray-700">
                                Community Outreach Coordinators
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "approach" && (
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                      Our Approach
                    </h2>
                    <p className="text-lg text-gray-600 mb-8">
                      Our approach combines technological innovation with
                      compassionate care to provide comprehensive support for
                      Alzheimer&apos;s patients and their caregivers.
                    </p>

                    <div className="space-y-8">
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 text-xl font-bold">
                              1
                            </div>
                          </div>
                          <div className="ml-4">
                            <h3 className="text-xl font-semibold text-gray-900">
                              Early Detection and Diagnosis
                            </h3>
                            <p className="mt-2 text-gray-600">
                              Our AI-powered tools analyze MRI scans, cognitive
                              assessments, and other biomarkers to detect early
                              signs of Alzheimer&apos;s disease with high
                              accuracy. Early detection enables earlier
                              intervention, which can significantly improve
                              outcomes.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-6 rounded-lg">
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 text-xl font-bold">
                              2
                            </div>
                          </div>
                          <div className="ml-4">
                            <h3 className="text-xl font-semibold text-gray-900">
                              Personalized Care Plans
                            </h3>
                            <p className="mt-2 text-gray-600">
                              We develop individualized care plans based on
                              patient-specific data, taking into account the
                              unique needs and circumstances of each patient.
                              Our platform adapts and evolves as the
                              patient&apos;s condition changes.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-6 rounded-lg">
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 text-xl font-bold">
                              3
                            </div>
                          </div>
                          <div className="ml-4">
                            <h3 className="text-xl font-semibold text-gray-900">
                              Caregiver Support and Education
                            </h3>
                            <p className="mt-2 text-gray-600">
                              We provide comprehensive resources and tools for
                              caregivers, including educational materials,
                              community support, and practical assistance for
                              day-to-day care challenges.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-6 rounded-lg">
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 text-xl font-bold">
                              4
                            </div>
                          </div>
                          <div className="ml-4">
                            <h3 className="text-xl font-semibold text-gray-900">
                              Continuous Research and Improvement
                            </h3>
                            <p className="mt-2 text-gray-600">
                              We&apos;re committed to advancing the field of
                              Alzheimer&apos;s care through ongoing research and
                              development. Our platform continuously improves as
                              we incorporate new findings and technologies.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to learn more?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Discover how our platform can help with early detection,
              management, and support for Alzheimer&apos;s disease.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/contact"
                className="inline-block bg-white text-blue-600 font-medium py-3 px-6 rounded-md hover:bg-gray-100 transition-colors"
              >
                Contact Us
              </Link>
              <Link
                href="/dashboard"
                className="inline-block bg-blue-700 text-white font-medium py-3 px-6 rounded-md hover:bg-blue-800 transition-colors"
              >
                Explore Platform
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
