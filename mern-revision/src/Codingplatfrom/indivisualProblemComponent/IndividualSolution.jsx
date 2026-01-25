import React, { useEffect, useState } from "react";

export function IndividualSolution({ solutionId }) {
  const [solution, setSolution] = useState(null);

  useEffect(() => {
    const fetchSolution = async () => {
      const res = await fetch(`/api/solutions/${solutionId}`);
      const data = await res.json();
      setSolution(data);
    };

    fetchSolution();
  }, [solutionId]);

  if (!solution) {
    return <p className="text-gray-400">Loading solution...</p>;
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">
        {solution.language} Solution
      </h2>

      <pre
        className="
          bg-black text-green-400 p-4 rounded-lg
          overflow-auto text-sm mb-4
        "
      >
        {solution.code}
      </pre>

      <div className="text-sm text-gray-400">
        Difficulty: {solution.difficulty} <br />
        👍 {solution.upvotes} | 👎 {solution.downvotes}
      </div>
    </div>
  );
}
