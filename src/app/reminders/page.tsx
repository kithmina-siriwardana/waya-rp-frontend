"use client";

import AppLayout from "@/components/layout/AppLayout";
import RemindersSection from "@/components/memories/RemindersSection";

export default function RemindersPage() {
  return (
    <AppLayout>
      <div className="p-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Reminders</h1>
          <p className="text-gray-600">
            Set and receive timely reminders to take medication, attend
            appointments, and stay on top of important tasks.
          </p>
        </div>
        <RemindersSection />
      </div>
    </AppLayout>
  );
}
