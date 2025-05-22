"use client";

import { Memory } from "@/types/memories";
import { Modal } from "antd";
import Image from "next/image";
import { CalendarDays, Clock, FileText, Tag } from "lucide-react";

interface MemoryDetailsModalProps {
  memory: Memory | null;
  isModalVisible: boolean;
  setIsModalVisible: (visible: boolean) => void;
}

export default function MemoryDetailsModal({
  memory,
  isModalVisible,
  setIsModalVisible,
}: MemoryDetailsModalProps) {
  if (!memory) return null;

  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <Tag className="w-5 h-5" />
          <p className="font-semibold text-xl text-gray-800">Memory Details</p>
        </div>
      }
      open={isModalVisible}
      onOk={() => setIsModalVisible(false)}
      onCancel={() => setIsModalVisible(false)}
      cancelButtonProps={{ style: { display: "none" } }}
      footer={[
        <button
          key="ok"
          className="bg-blue-600 text-white font-semibold text-base px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          onClick={() => setIsModalVisible(false)}
        >
          Close
        </button>,
      ]}
      width={800}
      styles={{
        body: {
          maxHeight: "70vh",
          overflowY: "auto",
          padding: "24px",
        },
      }}
    >
      <div className="space-y-8">
        {memory.imageUrl && (
          <div className="rounded-xl overflow-hidden shadow-lg mx-auto">
            <div className="relative aspect-video w-1/2 mx-auto">
              <Image
                src={memory.imageUrl}
                alt={memory.topic}
                width={800}
                height={600}
                className="w-full h-auto rounded-lg object-cover shadow-md"
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <Tag className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Topic</h3>
                  <p className="mt-1 text-lg font-semibold text-gray-900">
                    {memory.topic}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <CalendarDays className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Date</h3>
                  <p className="mt-1 text-gray-900">
                    {new Date(memory.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Description
                  </h3>

                  <p className="mt-1 text-gray-900 whitespace-pre-wrap">
                    {memory.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Created At
                  </h3>
                  <p className="mt-1 text-gray-900">
                    {memory.createdAt
                      ? new Date(memory.createdAt).toLocaleString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
