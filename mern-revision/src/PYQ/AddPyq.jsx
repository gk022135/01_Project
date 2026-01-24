import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';

const API = "http://localhost:3000"; // FIXED

const addPyq = async (data) => {
  const res = await fetch(`${API}/codesy/v1/add-pyq`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
};

function AddPyqForm({ onSuccess }) {
  const [form, setForm] = useState({
    email: "",
    subject: "",
    courseCode: "",
    driveLink: "",
    cloudinary_link: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await addPyq(form);

      if (res.error) {
        setError(res.error);
      } else {
        setSuccess("PYQ added successfully!");
        setForm({
          email: "",
          subject: "",
          courseCode: "",
          driveLink: "",
          cloudinary_link: ""
        });

        if (onSuccess) onSuccess(); // REFRESH LIST
      }
    } catch (err) {
      setError("Failed to add PYQ.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto p-4 md:p-6">
      {/* UI remains same except button fix */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700"
      >
        {loading ? <Loader2 className="animate-spin" /> : "Add PYQ"}
      </button>
    </form>
  );
}

export default AddPyqForm;
