// src/app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-3xl w-full mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Alzheimer&apos;s Detection using MRI Images
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          An AI-powered tool to help detect early signs of Alzheimer&apos;s
          disease from MRI scans.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link
            href="/login"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-300 transition-colors"
          >
            Register
          </Link>
          <Link
            href="/predict"
            className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors"
          >
            Try It Now
          </Link>
        </div>
      </div>
    </div>
  );
}
