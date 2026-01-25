import React, { useEffect, useState } from "react";

function SearchFilter() {
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [lastSearchId, setLastSearchId] = useState(null);

    const items = [
        "Array Manipulation",
        "String Operations",
        "Graph Algorithms",
        "Dynamic Programming",
        "Sorting Techniques",
        "Searching Algorithms",
        "Easy",
        "Medium",
        "Hard"
    ];

    /* ------------------ SEARCH SUGGESTIONS ------------------ */
    useEffect(() => {
        if (!searchTerm.trim()) {
            setSuggestions([]);
            return;
        }

        const timeout = setTimeout(() => {
            const filtered = items.filter((item) =>
                item.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setSuggestions(filtered);
        }, 300);

        return () => clearTimeout(timeout);
    }, [searchTerm]);

    /* ------------------ FETCH PROBLEMS ------------------ */
    useEffect(() => {
        const fetchProblems = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `/api/problems?search=${searchTerm}&lastSearchId=${lastSearchId}`
                );
                const data = await response.json();
                setProblems((prev) => [...prev, ...data]);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProblems();
    }, [searchTerm, lastSearchId]);

    /* ------------------ INFINITE SCROLL ------------------ */
    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >=
                document.documentElement.scrollHeight - 10
            ) {
                if (problems.length) {
                    setLastSearchId(problems[problems.length - 1].id);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [problems]);

    return (
        <div className="min-h-screen bg-gray-950 text-gray-100 p-6">
            {/* Search Box */}
            <div className="max-w-xl mx-auto">
                <input
                    type="text"
                    placeholder="Search problems..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="
            w-full px-4 py-3 rounded-lg
            bg-gray-900 border border-gray-700
            focus:outline-none focus:ring-2 focus:ring-indigo-500
            placeholder-gray-400
          "
                />

                {/* Suggestions */}
                {suggestions.length > 0 && (
                    <ul className="mt-2 bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
                        {suggestions.map((item, index) => (
                            <li
                                key={index}
                                className="px-4 py-2 hover:bg-gray-800 cursor-pointer text-sm"
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Problems List */}
            <div className="max-w-3xl mx-auto mt-10">
                <h2 className="text-xl font-semibold mb-4">Problems</h2>

                <ul className="space-y-3">
                    {problems.map((problem) => (
                        <li
                            key={problem.id}
                            onClick={() => navigate(`/problems/${problem.id}`)}
                            className=" p-4 rounded-lg bg-gray-900 border border-gray-800 hover:border-indigo-500 transition cursor-pointer
    ">
                            <div className="flex justify-between items-center">
                                <span className="font-medium">
                                    {problem.QuestionTitle}
                                </span>

                                <span
                                    className={`text-xs px-2 py-1 rounded-full ${problem.Difficulty === "Hard"
                                        ? "bg-red-500/20 text-red-400"
                                        : problem.Difficulty === "Medium"
                                            ? "bg-yellow-500/20 text-yellow-400"
                                            : "bg-green-500/20 text-green-400"
                                        }`}
                                >
                                    {problem.Difficulty}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>

                {loading && (
                    <p className="text-center mt-6 text-gray-400">Loading...</p>
                )}
            </div>

        </div>
    );
}

export default SearchFilter;
