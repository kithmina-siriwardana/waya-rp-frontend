"use client";

import AppLayout from "@/components/layout/AppLayout";
import ReminderNewRecordForm from "@/components/reminder/ReminderNewRecordForm";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { Reminder } from "@/types/memories";
import { useEffect, useState } from "react";

export default function RemindersPage() {
  const { user, token } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [futureReminders, setFutureReminders] = useState<Reminder[]>([]);
  const [expiredReminders, setExpiredReminders] = useState<Reminder[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isTableUpdated, setIsTableUpdated] = useState(false);
  const [showExpired, setShowExpired] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState<Reminder | null>(
    null
  );
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchReminders = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/reminders/${user?._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log("data", data);
      setFutureReminders(data.future);
      setExpiredReminders(data.expired);
      setIsLoading(false);
    };
    fetchReminders();
  }, [isTableUpdated, user, token]);

  const handleDelete = async () => {
    if (!selectedReminder) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/reminders/${selectedReminder._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setIsTableUpdated((prev) => !prev);
        setIsDeleteModalOpen(false);
        setSelectedReminder(null);
      }
    } catch (error) {
      console.error("Error deleting reminder:", error);
    }
  };

  const handleEdit = async (updatedReminder: Reminder) => {
    if (!selectedReminder) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/reminders/${selectedReminder._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedReminder),
        }
      );

      if (response.ok) {
        setIsTableUpdated((prev) => !prev);
        setIsEditModalOpen(false);
        setSelectedReminder(null);
      }
    } catch (error) {
      console.error("Error updating reminder:", error);
    }
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
        {/* Header Section */}
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Reminders</h1>
              <p className="text-gray-600">
                Set and receive timely reminders to take medication, attend
                appointments, and stay on top of important tasks.
              </p>
            </div>
            <Button
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="min-w-[180px] "
            >
              {isFormOpen ? "Back to Reminders" : "New Reminder"}
            </Button>
          </div>

          {/* Create Reminder Form */}
          {isFormOpen ? (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <ReminderNewRecordForm
                isTableUpdated={isTableUpdated}
                setIsTableUpdated={setIsTableUpdated}
                setIsFormOpen={setIsFormOpen}
              />
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              {/* Controls Header */}
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-4 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                    {showExpired ? "Expired Reminders" : "Upcoming Reminders"}
                  </h2>
                  <Button
                    variant={showExpired ? "primary" : "secondary"}
                    size="sm"
                    onClick={() => setShowExpired(!showExpired)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      showExpired
                        ? "bg-red-400 text-red-700 hover:bg-red-500 border border-red-200"
                        : "bg-green-100 text-green-700 hover:bg-green-200 border border-green-200"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {showExpired ? (
                        <>
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                            />
                          </svg>
                          Show Expired
                        </>
                      ) : (
                        <>
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          Show Upcoming
                        </>
                      )}
                    </span>
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {isLoading ? (
                  <div className="flex flex-col justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mb-4"></div>
                    <p className="text-gray-500 font-medium">
                      Loading reminders...
                    </p>
                  </div>
                ) : (
                  <>
                    {(showExpired ? expiredReminders : futureReminders)
                      .length === 0 ? (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg
                            className="w-8 h-8 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          No {showExpired ? "expired" : "upcoming"} reminders
                        </h3>
                        <p className="text-gray-500">
                          {showExpired
                            ? "You don't have any expired reminders."
                            : "Create your first reminder to get started!"}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {(showExpired ? expiredReminders : futureReminders)
                          .slice(
                            (currentPage - 1) * itemsPerPage,
                            currentPage * itemsPerPage
                          )
                          .map((reminder, index) => (
                            <div
                              key={reminder._id}
                              className={`group ${
                                showExpired
                                  ? "bg-red-50 border-red-100"
                                  : "bg-blue-50 border-blue-100"
                              } border rounded-xl p-5 hover:shadow-md transition-all duration-200 hover:scale-102`}
                            >
                              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                <div className="flex-1">
                                  <div className="flex items-start gap-3">
                                    <div
                                      className={`w-3 h-3 rounded-full mt-2 ${
                                        showExpired
                                          ? "bg-red-400"
                                          : "bg-blue-400"
                                      }`}
                                    ></div>
                                    <div className="flex-1">
                                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                                        {reminder.title}
                                      </h3>
                                      <div className="flex items-center gap-2 mb-3">
                                        <svg
                                          className="w-4 h-4 text-gray-400"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                          />
                                        </svg>
                                        <span className="text-sm font-medium text-gray-600">
                                          {new Date(
                                            reminder.date
                                          ).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                          })}
                                        </span>
                                        <svg
                                          className="w-4 h-4 text-gray-400"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                          />
                                        </svg>
                                        <span className="text-sm font-medium text-gray-600">
                                          {reminder.time}
                                        </span>
                                      </div>
                                      {reminder.description && (
                                        <p className="text-gray-600 text-sm leading-relaxed bg-white bg-opacity-60 rounded-lg p-3 border border-white border-opacity-50">
                                          {reminder.description}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                {!showExpired && (
                                  <div className="flex gap-2 lg:flex-col lg:gap-2">
                                    <Button
                                      variant="secondary"
                                      size="sm"
                                      onClick={() => {
                                        setSelectedReminder(reminder);
                                        setIsEditModalOpen(true);
                                      }}
                                      className="flex-1 lg:flex-none bg-white hover:bg-blue-50 text-blue-700 border-blue-200 hover:border-blue-300 rounded-lg px-4 py-2 font-medium transition-all duration-200"
                                    >
                                      <span className="flex items-center gap-1">
                                        <svg
                                          className="w-4 h-4"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                          />
                                        </svg>
                                        Edit
                                      </span>
                                    </Button>
                                    <Button
                                      variant="danger"
                                      size="sm"
                                      onClick={() => {
                                        setSelectedReminder(reminder);
                                        setIsDeleteModalOpen(true);
                                      }}
                                      className="flex-1 lg:flex-none bg-red-500 hover:bg-red-600 text-red-700 border-red-200 hover:border-red-300 rounded-lg px-4 py-2 font-medium transition-all duration-200"
                                    >
                                      <span className="flex items-center gap-1">
                                        <svg
                                          className="w-4 h-4"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                          />
                                        </svg>
                                        Delete
                                      </span>
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                      </div>
                    )}

                    {/* Pagination */}
                    {(showExpired ? expiredReminders : futureReminders).length >
                      itemsPerPage && (
                      <div className="flex justify-center items-center space-x-4 mt-8 pt-6 border-t border-gray-100">
                        <button
                          onClick={() =>
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                          }
                          disabled={currentPage === 1}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-gray-700 transition-all duration-200"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 19l-7-7 7-7"
                            />
                          </svg>
                          Previous
                        </button>

                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full font-medium">
                            Page {currentPage} of{" "}
                            {Math.ceil(
                              (showExpired ? expiredReminders : futureReminders)
                                .length / itemsPerPage
                            )}
                          </span>
                        </div>

                        <button
                          onClick={() =>
                            setCurrentPage((prev) =>
                              Math.min(
                                prev + 1,
                                Math.ceil(
                                  (showExpired
                                    ? expiredReminders
                                    : futureReminders
                                  ).length / itemsPerPage
                                )
                              )
                            )
                          }
                          disabled={
                            currentPage ===
                            Math.ceil(
                              (showExpired ? expiredReminders : futureReminders)
                                .length / itemsPerPage
                            )
                          }
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-gray-700 transition-all duration-200"
                        >
                          Next
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}

          {/* Delete Confirmation Modal */}
          {isDeleteModalOpen && selectedReminder && (
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-red-50 to-orange-50 px-6 py-4 border-b border-red-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-red-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Delete Reminder
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Are you sure you want to delete &quot;
                    <strong>{selectedReminder.title}</strong>&quot;? This action
                    cannot be undone.
                  </p>
                  <div className="flex gap-3">
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setIsDeleteModalOpen(false);
                        setSelectedReminder(null);
                      }}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-200 rounded-lg py-3 font-medium transition-all duration-200"
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="danger"
                      onClick={handleDelete}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-lg py-3 font-medium transition-all duration-200"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Edit Modal */}
          {isEditModalOpen && selectedReminder && (
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-gray-100 max-h-[90vh] overflow-y-auto">
                <ReminderNewRecordForm
                  isTableUpdated={isTableUpdated}
                  setIsTableUpdated={setIsTableUpdated}
                  setIsFormOpen={setIsEditModalOpen}
                  editMode={true}
                  reminderToEdit={selectedReminder}
                  onEdit={handleEdit}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
