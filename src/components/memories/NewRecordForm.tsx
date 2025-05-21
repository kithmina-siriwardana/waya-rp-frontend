import React, { useState } from "react";
import axios from "axios";
import {
  NewRiskRecordComponentProps,
  ResultCreate,
} from "@/types/risk-analysis";
import SubmitConfirmModal from "./SubmitConfirmModal";
import { Memory } from "@/types/memories";
import { useAuth } from "@/context/AuthContext";

const NewRiskRecordComponent: React.FC<NewRiskRecordComponentProps> = ({
  isTableUpdated,
  setIsTableUpdated,
  setIsFormOpen,
}) => {
  const [formData, setFormData] = useState({
    topic: "",
    description: "",
    date: "",
    image: null as File | null,
  });
  const { user, token } = useAuth();
  const [response, setResponse] = useState<ResultCreate | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setUploadError(null);
    }
  };

  const uploadImageToCloudinary = async (image: File) => {
    const uploadData = new FormData();
    uploadData.append("file", image);
    uploadData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
    );

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUND_NAME}/image/upload`,
        {
          method: "POST",
          body: uploadData,
        }
      );

      if (!res.ok) {
        throw new Error("Image upload failed");
      }

      const data = await res.json();
      return data.secure_url;
    } catch (error) {
      console.error("Image upload failed:", error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitModalOpen(false);
    setIsUploading(true);
    setUploadError(null);

    try {
      let imageUrl: string | undefined;

      if (formData.image) {
        try {
          imageUrl = await uploadImageToCloudinary(formData.image);
        } catch (error) {
          setUploadError("Failed to upload image. Please try again.");
          setIsUploading(false);
          return;
        }
      }

      const newMemory = {
        userId: user?._id,
        topic: formData.topic,
        description: formData.description,
        date: formData.date,
        imageUrl,
      };

      console.log("New memory created:", newMemory);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/memories`,
        newMemory,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response:", response);

      setIsTableUpdated(!isTableUpdated);
      setFormData({ topic: "", description: "", date: "", image: null });
      setIsFormOpen?.(false);
    } catch (error) {
      console.error("Error creating memory:", error);
      setUploadError("Failed to create memory. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmitModal = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitModalOpen(true);
  };

  return (
    <div>
      <form onSubmit={handleSubmitModal} className="space-y-6">
        <div className="border p-4 rounded-md bg-gray-50">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Topic
              </label>
              <input
                required
                type="text"
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                required
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                rows={4}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                required
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image
              </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
              {formData.image && (
                <p className="mt-1 text-sm text-gray-500">
                  Selected: {formData.image.name}
                </p>
              )}
              {uploadError && (
                <p className="mt-1 text-sm text-red-600">{uploadError}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => setIsFormOpen?.(false)}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md"
            disabled={isUploading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isUploading}
          >
            {isUploading ? "Saving..." : "Save Memory"}
          </button>
        </div>
      </form>

      <SubmitConfirmModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onConfirm={handleSubmit}
      />
    </div>
  );
};

export default NewRiskRecordComponent;
