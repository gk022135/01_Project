import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Bell } from "lucide-react"; // lucide icons

export default function CourseNotification({ courseCode }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null); // track which notification is open

  // Fetch notifications from backend
  const fetchNotifications = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/codesy/v1/get/course-notifications/${courseCode}`
      );
      const data = await res.json();
      setNotifications(data.notifications || []);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };

  // Load on mount and refresh every 30 seconds
  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // every 30 sec
    return () => clearInterval(interval);
  }, [courseCode]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-100">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen w-full text-white p-4 sm:p-6 transition-all z-10">
      <h1 className="text-2xl text-white sm:text-3xl font-bold mb-6 text-primary text-center">
        Notifications for {courseCode}
      </h1>

      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center text-gray-400 min-h-[50vh]">
          <p className="text-lg sm:text-xl">No notifications found </p>
        </div>
      ) : (
        <ul className="space-y-4 w-full max-w-3xl mx-auto">
          {notifications.map((notif, index) => {
            const isOpen = expanded === index;

            return (
              <li
                key={notif._id}
                className="bg-base-200 hover:bg-base-300 shadow-md rounded-xl transition-all duration-300 overflow-hidden"
              >
                <div
                  className="flex justify-between items-center p-4 cursor-pointer"
                  onClick={() => setExpanded(isOpen ? null : index)}
                >
                  <div className="flex items-center gap-3">
                    <Bell className="text-primary w-5 h-5" color="red" />
                    <h2 className="text-lg sm:text-xl font-semibold text-white break-words">
                      {notif.heading}
                    </h2>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-primary" color="green" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-primary" color="green"/>
                  )}
                </div>

                {/* Expanded content */}
                {isOpen && (
                  <div className="px-6 pb-4 text-white transition-all duration-300">
                    <p className="text-sm sm:text-base break-words leading-relaxed">
                      {notif.description}
                    </p>
                    <p className="text-xs sm:text-sm opacity-70 mt-2">
                      {new Date(notif.createdAt).toLocaleString()}
                    </p>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
