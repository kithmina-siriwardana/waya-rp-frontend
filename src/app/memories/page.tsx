"use client";

import { useEffect, useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Memory, TabType } from "@/types/memories";
import MemoriesSection from "@/components/memories/MemoriesSection";
import GallerySection from "@/components/memories/GallerySection";
import Button from "@/components/ui/Button";
import NewRiskRecordComponent from "@/components/memories/NewRecordForm";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";

export default function MemoriesPage() {
  const tabs = [
    { id: "memories", label: "Memories" },
    { id: "gallery", label: "Gallery" },
  ] as const;

  const { user, token } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>("memories");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [memories, setMemories] = useState<Memory[]>([]);
  const [memoriesWithImages, setMemoriesWithImages] = useState<Memory[]>([]);
  const [isTableUpdated, setIsTableUpdated] = useState(false);

  useEffect(() => {
    const fetchMemories = async () => {
      if (!user?._id || !token) return;

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/memories/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response", response);
      setMemories(response.data);
    };

    fetchMemories();
  }, [isTableUpdated, user, token]);

  useEffect(() => {
    const fetchMemoriesWithImages = async () => {
      if (!user?._id || !token) return;

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/memories/${user._id}/images`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response", response);
      setMemoriesWithImages(response.data);
    };

    fetchMemoriesWithImages();
  }, [isTableUpdated, user, token]);

  return (
    <AppLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Memories</h1>
            <p className="text-gray-600">
              Store and revisit important memories and life events to help
              maintain cognitive connections.
            </p>
          </div>
          <Button
            className="min-w-[170px]"
            onClick={() => setIsFormOpen(!isFormOpen)}
          >
            {isFormOpen ? "Back to Memories" : "Create Memory"}
          </Button>
        </div>

        {/* Tab Navigation */}
        {isFormOpen ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">New Memory</h2>
            </div>

            <NewRiskRecordComponent
              isTableUpdated={isTableUpdated}
              setIsTableUpdated={setIsTableUpdated}
              setIsFormOpen={setIsFormOpen}
            />
          </div>
        ) : (
          <>
            <div className="border-b border-gray-200 bg-white mt-5 rounded-t-xl">
              <nav className="-mb-px flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                  whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm
                  ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }
                `}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Content Sections */}
            <div className="p-6 bg-white rounded-b-xl">
              {activeTab === "memories" && (
                <MemoriesSection memories={memories} />
              )}
              {activeTab === "gallery" && (
                <GallerySection memories={memoriesWithImages} />
              )}
            </div>
          </>
        )}
      </div>
    </AppLayout>
  );
}
