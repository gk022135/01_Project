import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import TeacherNotifications from "./fetchTeacherNoti";

export default function NotificationManager() {
  const [notifications, setNotifications] = useState([]);
  const [formData, setFormData] = useState({
    courseCode: "",
    heading: "",
    description: "",
  });

  // Get teacher email safely
  const userData = JSON.parse(localStorage.getItem("UserData") || "{}");
  const teacherEmail = userData?.email || "";

  const url = "http://localhost:3000/codesy/v1/teacher-notification";

  // Fetch notifications from backend using action=view
  const fetchNotifications = async () => {
    if (!formData.courseCode) return; // Don’t fetch until courseCode is set

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          actions: "view",
          courseCode: formData.courseCode,
        }),
      });

      const data = await response.json();

      if (data.success && data.notifications) {
        setNotifications(data.notifications);
      } else {
        setNotifications([]);
        toast.info("No notifications found for this course.");
      }
    } catch (error) {
      toast.error("Error fetching notifications from server.");
    }
  };

  //fetching notification on certain changes

  useEffect(() => {
    if (formData.courseCode) fetchNotifications();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add new notification
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.courseCode || !formData.heading || !formData.description) {
      toast.warn("Please fill all required fields!");
      return;
    }

    if (!teacherEmail) {
      toast.error("Teacher email not found. Please log in again.");
      return;
    }

    try {
      const message = `${formData.heading}: ${formData.description}`;

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          actions: "add",
          email: teacherEmail,
          courseCode: formData.courseCode,
          heading : formData.heading,
          description : formData.description
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Notification added successfully!");
        fetchNotifications(); // refresh list
      } else {
        toast.error(result.message || "Failed to add notification.");
      }

      setFormData({ ...formData, heading: "", description: "" });
    } catch (error) {
      toast.error("Failed to add the notification.");
    }
  };

  // Delete notification
  const handleDelete = async (message) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          actions: "delete",
          message,
          courseCode: formData.courseCode,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Notification deleted!");
        fetchNotifications();
      } else {
        toast.error("Failed to delete notification.");
      }
    } catch (error) {
      toast.error("Error deleting notification!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4 flex flex-col items-center text-white">
      <div className="w-full max-w-3xl bg-gray-800 rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-semibold mb-4 text-blue-400">
          📢 Notification Manager
        </h1>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 mb-6">
          <input
            type="text"
            name="courseCode"
            value={formData.courseCode}
            onChange={handleChange}
            placeholder="Course Code (e.g. CS701)"
            className="p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="text"
            name="heading"
            value={formData.heading}
            onChange={handleChange}
            placeholder="Heading"
            className="p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            rows="3"
            className="p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 resize-none"
            required
          />

          <button
            type="submit"
            className="mt-3 bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Add Notification
          </button>
        </form>

        {/* Notification List */}
        <TeacherNotifications email={teacherEmail} />
      </div>

      <ToastContainer position="top-center" theme="dark" autoClose={3000} />
    </div>
  );
}
