import React, { useEffect, useState } from "react";

const API = "http://localhost:3000"; // FIXED

const fetchPyqs = async () => {
  const res = await fetch(`${API}/codesy/v1/get-all-pyq`);
  return res.json();
};

export default function PyqList({ refreshKey }) {
  const [pyqs, setPyqs] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await fetchPyqs();
      setPyqs(data);
    };
    load();
  }, [refreshKey]); // IMPORTANT FIX

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">All PYQs</h2>

      {pyqs.length === 0 && (
        <p className="text-gray-500 text-center">No PYQs added yet.</p>
      )}

      {pyqs.map((p) => (
        <div key={p._id} className="bg-white p-4 rounded-lg shadow mb-4">
          <h3 className="font-bold">
            {p.subject} ({p.courseCode})
          </h3>
          <p>Department: {p.department}</p>
          <p>Semester: {p.semester}</p>
          <p>
            Contributor: {p.contributer?.name} ({p.contributer?.email})
          </p>

          {/* PDF Preview (Google Drive embed) */}
          <iframe
            src={p.driveLink.replace("view?usp=sharing", "preview")}
            width="100%"
            height="350"
            title="PDF Preview"
            className="mt-3 rounded-lg"
          />

          {p.cloudinary_link && (
            <a
              href={p.cloudinary_link}
              className="text-blue-600 underline mt-2 block"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cloudinary PDF Link
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
