import { Search } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

export default function SearchFunction() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        const timer = setTimeout(() => {
            fetchSearchResults(query);
        }, 500);

        return () => clearTimeout(timer);
    }, [query]);

    const fetchSearchResults = async (searchText) => {
        try {
            setLoading(true);
            const res = await fetch(
                `http://localhost:3000/codesy/v1/get/search-posts?q=${searchText}`
            );
            const data = await res.json();

            if (data.success) {
                setResults(data.data);
            }
        } catch (error) {
            console.error("Search error:", error);
        } finally {
            setLoading(false);
        }
    };

    const showResults = query && (loading || results.length > 0);

    return (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 w-[600px] z-50">

            {/* Search Input Only */}
            <div className="flex items-center gap-3 border border-gray-600 rounded-xl px-4 py-3 bg-black">
                <Search size={22} className="text-gray-400" />
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search posts, email or content..."
                    className="w-full bg-transparent text-white outline-none placeholder:text-gray-500"
                />
            </div>

            {/* Results Panel (ONLY when needed) */}
            {showResults && (
                <div className="mt-2 max-h-[400px] overflow-y-auto rounded-xl border border-gray-700 bg-black/95 backdrop-blur">

                    {loading && (
                        <p className="text-gray-400 p-4">Searching...</p>
                    )}

                    {!loading && results.length === 0 && (
                        <p className="text-gray-500 p-4">No results found</p>
                    )}

                    {!loading && results.map((post) => (
                        <Link
                            key={post._id}
                            to={`/posts/detail/${post._id}`}
                            className="block px-4 py-3 border-b border-gray-700 hover:bg-gray-800 transition"
                        >
                            <h3 className="text-white font-medium">
                                {post.title || "Untitled Post"}
                            </h3>
                            <p className="text-gray-400 text-sm line-clamp-2">
                                {post.postBody}
                            </p>
                            <p className="text-gray-500 text-xs mt-1">
                                {post.email}
                            </p>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
