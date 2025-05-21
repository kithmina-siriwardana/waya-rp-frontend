"use client";

import { useState } from "react";
import { Reminder } from "@/types/memories";
import Button from "@/components/ui/Button";

export default function RemindersSection() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    topic: "",
    description: "",
    date: "",
    time: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement reminder creation logic
    const newReminder: Reminder = {
      id: Date.now().toString(),
      topic: formData.topic,
      description: formData.description,
      date: formData.date,
      time: formData.time,
      createdAt: new Date().toISOString(),
    };
    setReminders([...reminders, newReminder]);
    setFormData({ topic: "", description: "", date: "", time: "" });
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Create Reminder Button */}
      <div className="flex justify-end">
        <Button onClick={() => setIsFormOpen(true)}>Create Reminder</Button>
      </div>

      {/* Create Reminder Form */}
      {isFormOpen && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Create New Reminder</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="topic"
                className="block text-sm font-medium text-gray-700"
              >
                Topic
              </label>
              <input
                type="text"
                id="topic"
                value={formData.topic}
                onChange={(e) =>
                  setFormData({ ...formData, topic: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="time"
                  className="block text-sm font-medium text-gray-700"
                >
                  Time
                </label>
                <input
                  type="time"
                  id="time"
                  value={formData.time}
                  onChange={(e) =>
                    setFormData({ ...formData, time: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <Button variant="secondary" onClick={() => setIsFormOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Reminder</Button>
            </div>
          </form>
        </div>
      )}

      {/* Reminders List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {reminders.map((reminder) => (
            <li key={reminder.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {reminder.topic}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {reminder.date} at {reminder.time}
                  </p>
                  <p className="mt-2 text-gray-600">{reminder.description}</p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="secondary" size="sm">
                    Edit
                  </Button>
                  <Button variant="danger" size="sm">
                    Delete
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
