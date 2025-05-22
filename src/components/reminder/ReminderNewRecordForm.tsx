import React, { useState, useEffect } from "react";
import axios from "axios";
import { NewRiskRecordComponentProps } from "@/types/risk-analysis";
import ReminderSubmitConfirmModal from "./ReminderSubmitConfirmModal";
import { useAuth } from "@/context/AuthContext";
import { Reminder } from "@/types/memories";
import Button from "@/components/ui/Button";

interface ReminderNewRecordFormProps {
  isTableUpdated: boolean;
  setIsTableUpdated: (value: boolean) => void;
  setIsFormOpen: (value: boolean) => void;
  editMode?: boolean;
  reminderToEdit?: Reminder;
  onEdit?: (updatedReminder: Reminder) => Promise<void>;
}

const ReminderNewRecordForm: React.FC<ReminderNewRecordFormProps> = ({
  isTableUpdated,
  setIsTableUpdated,
  setIsFormOpen,
  editMode = false,
  reminderToEdit,
  onEdit,
}) => {
  const { user, token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    if (editMode && reminderToEdit) {
      setTitle(reminderToEdit.title);
      setDescription(reminderToEdit.description);
      setDate(new Date(reminderToEdit.date).toISOString().split("T")[0]);
      setTime(reminderToEdit.time);
    }
  }, [editMode, reminderToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitModalOpen(false);
    setIsLoading(true);

    if (!user?._id) {
      console.error("User ID is required");
      return;
    }

    const reminderData = {
      userId: user._id,
      title,
      description,
      date,
      time,
    };

    try {
      if (editMode && onEdit && reminderToEdit) {
        await onEdit({ ...reminderToEdit, ...reminderData });
      } else {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/reminders`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(reminderData),
          }
        );

        if (response.ok) {
          setIsTableUpdated(!isTableUpdated);
          setIsFormOpen(false);
          setTitle("");
          setDescription("");
          setDate("");
          setTime("");
        }
      }
    } catch (error) {
      console.error("Error saving reminder:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitModal = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitModalOpen(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          {editMode ? "Edit Reminder" : "Create New Reminder"}
        </h2>
      </div>
      <form onSubmit={handleSubmitModal} className="space-y-6">
        <div className="border p-4 rounded-md bg-gray-50">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                required
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
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
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time
              </label>
              <input
                required
                type="time"
                name="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => setIsFormOpen(false)}
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>

      <ReminderSubmitConfirmModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onConfirm={handleSubmit}
      />
    </div>
  );
};

export default ReminderNewRecordForm;
