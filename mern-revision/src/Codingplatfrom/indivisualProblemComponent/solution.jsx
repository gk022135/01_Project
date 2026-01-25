import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import { IndividualSolution } from "./IndividualSolution";

const FILTERS = ["C++", "Java", "Python", "JavaScript", "Easy", "Medium", "Hard"];

export default function Solution({ problemId }) {
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSolutionId, setSelectedSolutionId] = useState(null);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState(null);

  /* ---------------- Fetch solutions ---------------- */
  useEffect(() => {
    const fetchSolutions = async () => {
      setLoading(true);
      const res = await fetch(
        `/api/solutions?problemId=${problemId}&filter=${activeFilter || ""}&search=${search}`
      );
      const data = await res.json();
      setSolutions(data);
      setLoading(false);
    };

    fetchSolutions();
  }, [problemId, activeFilter, search]);

  return (
    <div className="bg-gray-950 text-gray-100 p-4 rounded-xl">
      {/* ---------------- Filters ---------------- */}
      <div className="flex gap-2 flex-wrap mb-4">
        {FILTERS.map((item) => (
          <button
            key={item}
            onClick={() => setActiveFilter(item)}
            className={`px-3 py-1 rounded-full text-sm border
              ${
                activeFilter === item
                  ? "bg-indigo-600 border-indigo-500"
                  : "bg-gray-900 border-gray-700 hover:border-gray-500"
              }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* ---------------- Search ---------------- */}
      <input
        placeholder="Search solutions..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          w-full mb-4 px-4 py-2 rounded-lg
          bg-gray-900 border border-gray-700
          focus:outline-none focus:ring-2 focus:ring-indigo-500
        "
      />

      {/* ---------------- List ---------------- */}
      {loading ? (
        <p className="text-gray-400">Loading solutions...</p>
      ) : (
        <div className="space-y-3">
          {solutions.map((sol) => (
            <div
              key={sol.solutionID}
              onClick={() => setSelectedSolutionId(sol.solutionID)}
              className="
                p-4 bg-gray-900 rounded-lg border border-gray-800
                hover:border-indigo-500 cursor-pointer transition
              "
            >
              <div className="flex justify-between">
                <span className="font-medium">{sol.language}</span>
                <span className="text-sm text-gray-400">
                  👍 {sol.upvotes} | 👎 {sol.downvotes}
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Difficulty: {sol.difficulty}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* ---------------- Draggable Solution ---------------- */}
      {selectedSolutionId && (
        <Draggable handle=".drag-handle">
          <div
            className="
              fixed bottom-6 right-6 w-[600px] h-[70vh]
              bg-gray-900 border border-gray-700 rounded-xl shadow-2xl
              flex flex-col
            "
          >
            <div
              className="
                drag-handle cursor-move
                px-4 py-2 bg-gray-800 rounded-t-xl
                flex justify-between items-center
              "
            >
              <span className="font-semibold">Solution</span>
              <button
                onClick={() => setSelectedSolutionId(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-auto p-4">
              <IndividualSolution solutionId={selectedSolutionId} />
            </div>
          </div>
        </Draggable>
      )}
    </div>
  );
}
