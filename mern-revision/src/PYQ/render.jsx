import React, { useState, useEffect } from 'react';
import { Upload, FileText, Mail, BookOpen, Code, Link2, X, ExternalLink, Loader2, CheckCircle, Trash2 } from 'lucide-react';

const API = "http://localhost:3000";

// API functions
const addPyq = async (data) => {
    const res = await fetch(`${API}/codesy/v1/add-pyq`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    return res.json();
};

const fetchPyqs = async () => {
    const res = await fetch(`${API}/codesy/v1/get/get-all-pyq`);
    return res.json();
};

async function deletePyq(id) {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/pyq/${id}`, {
        method: "DELETE",
        credentials: "include",
    });

    if (!res.ok) throw new Error("Failed to delete PYQ");
    return await res.json();
}


// AddPyqForm Component
function AddPyqForm({ onSuccess }) {
    const [form, setForm] = useState({
        email: "",
        subject: "",
        courseCode: "",
        driveLink: "",
        cloudinary_link: ""
    });

    const OwnerEmail = (() => {
        try {
            const raw = localStorage.getItem("UserData");
            if (!raw) return "";
            const parsed = JSON.parse(raw);
            return parsed?.email || "";
        } catch (e) {
            return "";
        }
    })();

    useEffect(() => {
        if (OwnerEmail) {
            setForm(prev => ({ ...prev, email: OwnerEmail }));
        }
    }, [OwnerEmail]);

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
                    email: OwnerEmail,
                    subject: "",
                    courseCode: "",
                    driveLink: "",
                    cloudinary_link: ""
                });
                if (onSuccess) onSuccess();
            }
        } catch (err) {
            setError("Failed to add PYQ. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto mb-12">
            <div className="bg-base-100 rounded-2xl shadow-xl border border-gray-200">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-t-2xl">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/20 p-2.5 rounded-xl backdrop-blur-sm">
                            <Upload className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white">Add New PYQ</h2>
                            <p className="text-blue-100 text-sm mt-1">Share previous year question papers with fellow students</p>
                        </div>
                    </div>
                </div>

                <div className="p-6 md:p-8">
                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 text-red-800 px-4 py-3 rounded-lg flex items-start gap-3 mb-6">
                            <X className="w-5 h-5 flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{error}</span>
                        </div>
                    )}

                    {success && (
                        <div className="bg-green-50 border-l-4 border-green-500 text-green-800 px-4 py-3 rounded-lg flex items-start gap-3 mb-6">
                            <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{success}</span>
                        </div>
                    )}

                    <div className="space-y-5">
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-200">
                                <Mail className="w-4 h-4 text-blue-600" />
                                Email Address
                            </label>
                            <input
                                disabled
                                type="email"
                                name="email"
                                value={form.email}
                                placeholder="your.email@example.com"
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-base-100 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-400 placeholder-gray-400"
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-200">
                                    <BookOpen className="w-4 h-4 text-blue-600" />
                                    Subject Name
                                </label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={form.subject}
                                    placeholder="e.g., Data Structures & Algorithms"
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-base-100 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-900 placeholder-gray-400"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-200">
                                    <Code className="w-4 h-4 text-blue-600" />
                                    Course Code
                                </label>
                                <input
                                    type="text"
                                    name="courseCode"
                                    value={form.courseCode}
                                    placeholder="e.g., CS101"
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-base-100 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-900 placeholder-gray-400"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                <Link2 className="w-4 h-4 text-blue-600" />
                                Google Drive Link
                            </label>
                            <input
                                type="url"
                                name="driveLink"
                                value={form.driveLink}
                                placeholder="https://drive.google.com/file/d/..."
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-base-100 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-400 placeholder-gray-400"
                            />
                            <p className="text-xs text-gray-500 mt-1">Make sure the file is publicly accessible</p>
                        </div>

                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                <Link2 className="w-4 h-4 text-blue-600" />
                                Cloudinary Link <span className="text-gray-400 font-normal text-xs">(Optional)</span>
                            </label>
                            <input
                                type="url"
                                name="cloudinary_link"
                                value={form.cloudinary_link}
                                placeholder="https://res.cloudinary.com/..."
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-base-100 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-400 placeholder-gray-400"
                            />
                        </div>

                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3.5 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-300 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Adding PYQ...
                                </>
                            ) : (
                                <>
                                    <Upload className="w-5 h-5" />
                                    Add PYQ
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Compact + Grid-based PyqList Component

function PyqList({ refreshKey }) {
    const [pyqs, setPyqs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [OwnerEmail, setOwnerEmail] = useState("");

    useEffect(() => {
        try {
            const raw = localStorage.getItem("UserData");

            if (!raw) {
                setOwnerEmail("");
                return;
            }

            const parsed = JSON.parse(raw);

            setOwnerEmail(parsed?.email || "");
        } catch (err) {
            console.error("Failed to parse localStorage UserData", err);
            setOwnerEmail("");
        }
    }, []);


    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                const data = await fetchPyqs();
                setPyqs(data);
                console.log("data", data)
            } catch (err) {
                setError("Failed to load PYQs");
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [refreshKey]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
                <p className="text-gray-400">Loading PYQs...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-4xl mx-auto">
                <div className="bg-red-50 border-l-4 border-red-500 text-red-800 px-4 py-3 rounded-lg">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-6xl mx-auto">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-white">All PYQs</h2>
                <p className="text-gray-200 text-sm">Browse previous year question papers</p>
                <div className="mt-1 text-sm text-gray-400">
                    Total:{" "}
                    <span className="font-semibold text-blue-600">{pyqs.length}</span>
                </div>
            </div>

            {pyqs.length === 0 ? (
                <div className="bg-base-100 rounded-2xl shadow-xl border border-gray-200 p-8 text-center">
                    <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FileText className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-500 mb-1">No PYQs Available Yet</h3>
                    <p className="text-gray-600 text-sm">Be the first to contribute!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {pyqs.map((p) => (
                        <div
                            key={p._id}
                            className="bg-base-100 rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300"
                        >
                            <div className="p-5 space-y-4">
                                <div className="flex justify-between items-start gap-3">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-gray-100">{p.subject}</h3>
                                        <div className="flex flex-wrap items-center gap-2 mt-2">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-100 text-blue-800 rounded-full font-medium text-xs">
                                                <Code className="w-3 h-3" /> {p.courseCode}
                                            </span>
                                            <span className="text-xs bg-gray-100 rounded-full px-2 py-1 font-medium text-gray-700">
                                                Dept: {p.department}
                                            </span>
                                            <span className="text-xs bg-gray-100 rounded-full px-2 py-1 font-medium text-gray-700">
                                                Sem: {p.semester}
                                            </span>
                                        </div>
                                    </div>

                                    {p.contributer && (
                                        <div className="bg-gray-50 rounded-lg p-2 border border-gray-200 min-w-[130px]">
                                            <p className="text-[10px] text-gray-500 uppercase font-semibold">Contributed by</p>
                                            <p className="text-sm font-bold text-gray-900 leading-none">{p.contributer.name}</p>
                                            <p className="text-[11px] text-gray-600 mt-0.5">{p.contributer.email}</p>
                                        </div>
                                    )}
                                </div>

                                <div className="bg-gray-100 rounded-lg border border-gray-200 overflow-hidden">
                                    <iframe
                                        src={p.driveLink.replace("view?usp=sharing", "preview")}
                                        className="w-full"
                                        style={{ height: "260px" }}
                                        title="PDF Preview"
                                    />
                                </div>

                                <div className="flex gap-3">
                                    <a
                                        href={p.driveLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 
                                        bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg text-sm font-semibold 
                                        hover:from-blue-700 hover:to-indigo-700 shadow"
                                    >
                                        <ExternalLink className="w-4 h-4" /> View PDF
                                    </a>

                                    {p.cloudinary_link && (
                                        <a
                                            href={p.cloudinary_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 
                                            bg-gray-200 text-gray-800 rounded-lg text-sm font-semibold hover:bg-gray-300"
                                        >
                                            <Link2 className="w-4 h-4" /> Cloud Link {OwnerEmail}
                                        </a>
                                    )}

                                    {/* FIXED DELETE BUTTON */}
                                    {(p.contributer.email == OwnerEmail) && (
                                        <button
                                            onClick={async () => {
                                                try {
                                                    if (!confirm("Are you sure you want to delete this PYQ?")) return;
                                                    await deletePyq(p._id);
                                                    alert("Deleted successfully");
                                                    window.location.reload();
                                                } catch {
                                                    alert("Failed to delete");
                                                }
                                            }}
                                            className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 
                                            shadow flex items-center gap-2"
                                        >
                                            <Trash2 className="w-4 h-4" /> Delete
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}



// Main App Component
export default function RenderPyq() {
    const [refreshKey, setRefreshKey] = useState(0);

    const handleSuccess = () => {
        setRefreshKey(prev => prev + 1);
    };

    return (
        <div className="min-h-screen bg-base-100">
            <div className="py-8 md:py-12 px-4">
                <div className="max-w-4xl mx-auto mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        PYQ Repository
                    </h1>
                    <p className="text-lg text-white max-w-2xl mx-auto">
                        A collaborative platform to share and access previous year question papers
                    </p>
                </div>

                <AddPyqForm onSuccess={handleSuccess} />
                <PyqList refreshKey={refreshKey} />
            </div>
        </div>
    );
}