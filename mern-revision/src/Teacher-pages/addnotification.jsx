import { useState, useEffect } from "react";
import { Bell, Plus, Trash2, Eye, AlertCircle, MessageSquare } from "lucide-react";

function NotificationManager() {
  const [data, setData] = useState({
    message: "",
    actions: "null",
    classId: "CSL2222",
    email: "sfkdf",
  });
  const [viewNoti, setViewNoti] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [error, setError] = useState("");

  const url = "http://localhost:3000/codesy/v1/notification";

  // Load notifications on mount
  useEffect(() => {
    viewHandler();
  }, []);

  // Add notification
  const clickHandler = async () => {
    if (!data.message.trim()) {
      setError("Please enter a message");
      return;
    }

    const wordCount = data.message.trim().split(" ").filter(Boolean).length;
    if (wordCount > 20) {
      setError("Message must be 20 words or less");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, actions: "null" }),
      });

      const result = await response.json();

      if (result.success) {
        setData({ ...data, message: "" });
        viewHandler(); // Refresh
      } else {
        setError("Failed to add notification");
      }
    } catch (err) {
      console.error(err);
      setError("Network error occurred");
    } finally {
      setLoading(false);
    }
  };

  // View all notifications
  const viewHandler = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, actions: "view" }),
      });

      const result = await response.json();
      console.log(result);

      if (response.ok && result.success) {
        setViewNoti(Array.isArray(result.notifications) ? result.notifications : []);
        setShowNotifications(true);
      } else {
        setError("Failed to fetch notifications");
      }
    } catch (err) {
      console.error(err);
      setError("Network error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Delete notification
  const deleteHandler = async (notificationId) => {
    if (!notificationId) return;

    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, actions: "delete", message: notificationId }),
      });

      const result = await response.json();

      if (result.success) {
        setViewNoti((prev) => prev.filter((n) => n._id !== notificationId));
      } else {
        setError("Failed to delete notification");
      }
    } catch (err) {
      console.error(err);
      setError("Network error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setData({ ...data, message: e.target.value });
    if (error) setError("");
  };

  const wordCount = data.message.trim().split(" ").filter(Boolean).length;

// Sort notifications by createdAt descending (newest first)
const sortedNotifications = [...viewNoti].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
);

return (
    <div className="max-w-4xl mx-auto p-6 bg-base-100 text-white">
        {/* Header */}
        <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
                <Bell className="w-8 h-8 text-primary" />
                <h1 className="text-3xl font-bold text-base-content">Notification Manager</h1>
            </div>
            <p className="text-base-content/70">Manage your notifications efficiently</p>
        </div>

        {/* Add Notification */}
        <div className="card bg-base-200 shadow-lg mb-6">
            <div className="card-body">
                <div className="flex items-center gap-2 mb-4">
                    <Plus className="w-5 h-5 text-primary" />
                    <h2 className="card-title text-primary">Add New Notification</h2>
                </div>

                {error && (
                    <div className="alert alert-error mb-4">
                        <AlertCircle className="w-5 h-5" />
                        <span>{error}</span>
                    </div>
                )}

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Message</span>
                        <span className={`label-text-alt ${wordCount > 20 ? "text-error" : "text-base-content/60"}`}>
                            {wordCount}/20 words
                        </span>
                    </label>
                    <textarea
                        className={`textarea textarea-bordered h-24 ${wordCount > 20 ? "textarea-error" : ""}`}
                        placeholder="Enter your notification message (max 20 words)..."
                        value={data.message}
                        onChange={handleInputChange}
                        disabled={loading}
                    />
                </div>

                <div className="card-actions justify-end mt-4">
                    <button
                        className={`btn btn-primary ${loading ? "loading" : ""}`}
                        onClick={clickHandler}
                        disabled={loading || !data.message.trim()}
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>

        {/* View Notifications */}
        <div className="card bg-base-200 shadow-lg">
            <div className="card-body">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-secondary" />
                        <h2 className="card-title text-secondary">Your Notifications</h2>
                    </div>
                    <button
                        className={`btn btn-secondary btn-sm ${loading ? "loading" : ""}`}
                        onClick={viewHandler}
                        disabled={loading}
                    >
                        <Eye className="w-4 h-4" />
                        {showNotifications ? "Refresh" : "View All"}
                    </button>
                </div>

                {showNotifications && (
                    <div className="space-y-3">
                        {sortedNotifications.length === 0 ? (
                            <div className="text-center py-8">
                                <Bell className="w-12 h-12 text-base-content/30 mx-auto mb-3" />
                                <p className="text-base-content/60">No notifications found</p>
                            </div>
                        ) : (
                            sortedNotifications.map((notification) => (
                                <div key={notification._id} className="card bg-base-100 border border-base-300">
                                    <div className="card-body p-4">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <p className="text-base-content text-sm leading-relaxed">
                                                    {notification.message}
                                                </p>
                                                {notification.createdAt && (
                                                    <p className="text-xs text-base-content/50 mt-2">
                                                        {new Date(notification.createdAt).toLocaleString()}
                                                    </p>
                                                )}
                                            </div>
                                            <button
                                                className="btn btn-error btn-sm btn-circle"
                                                onClick={() => deleteHandler(notification._id)}
                                                disabled={loading}
                                                title="Delete notification"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    </div>
);
}

export default NotificationManager;
