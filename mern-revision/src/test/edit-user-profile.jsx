import { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaGithub, FaLinkedin, FaCode, FaFileAlt, FaSave, FaTimes, FaPlus, FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';


function UpdateProfile() {
    const [userData, setUserData] = useState({
        StudentDepAndYear: "",
        role: "",
        success: "",
        name: "",
        email: "",
        description: "",
        location: "",
        github: "",
        linked: "",
        linkedin: "",
        skills: "",
    });

    const [skillsArray, setSkillsArray] = useState([]);
    const [newSkill, setNewSkill] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Load existing user data on component mount
    useEffect(() => {
        const existingData = JSON.parse(localStorage.getItem("UserData")) || {};
        setUserData({
            StudentDepAndYear: existingData.StudentDepAndYear,
            role: existingData.role,
            success: existingData.success,
            email: existingData.email,
            name: existingData.name || "",
            description: existingData.description || "",
            location: existingData.location || "",
            github: existingData.github || "",
            linked: existingData.linked || "",
            linkedin: existingData.linkedin || "",
            skills: existingData.skills ? existingData.skills.join(", ") : "",
        });
        setSkillsArray(existingData.skills || []);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddSkill = () => {
        if (newSkill.trim() && !skillsArray.includes(newSkill.trim())) {
            setSkillsArray(prev => [...prev, newSkill.trim()]);
            setNewSkill("");
        } else if (skillsArray.includes(newSkill.trim())) {
            toast.warn("Skill already exists!");
        }
    };

    const handleRemoveSkill = (index) => {
        setSkillsArray(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Load current data from localStorage
            const existingData = JSON.parse(localStorage.getItem("UserData")) || {};

            const updatedData = {
                ...existingData, // preserve all prior fields
                name: userData.name || existingData.name,
                description: userData.description || existingData.description,
                location: userData.location || existingData.location,
                github: userData.github || existingData.github,
                linkedin: userData.linkedin || existingData.linkedin,
                skills: skillsArray.length > 0 ? skillsArray : existingData.skills || [],
            };

            const response = await fetch(`http://localhost:3000/codesy/v1/put/update-user-profile?email=${userData.email}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            });

            if (response.ok) {
                localStorage.setItem("UserData", JSON.stringify(updatedData));
                toast.success("Profile updated successfully!");
            } else {
                toast.error("Profile update failed!");
            }

        } catch (error) {
            toast.error("Failed to update profile. Please try again.");
            console.error("Update error:", error);
        } finally {
            setIsLoading(false);
        }
    };


    const handleCancel = () => {
        // Reset to original data
        const existingData = JSON.parse(localStorage.getItem("UserData")) || {};
        setUserData({
            StudentDepAndYear: existingData.StudentDepAndYear,
            role: existingData.role,
            success: existingData.success,
            email: existingData.email,
            name: existingData.name || "",
            description: existingData.description || "",
            location: existingData.location || "",
            github: existingData.github || "",
            linkedin: existingData.linkedin || "",
            skills: existingData.skills ? existingData.skills.join(", ") : "",
        });
        setSkillsArray(existingData.skills || []);
        toast.info("Changes discarded");
    };

    return (
        <div className="min-h-screen bg-base-100/50 p-4 sm:p-6 lg:p-8">
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
            </div>

            <div className="relative z-10 max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                        Update Profile
                    </h1>
                    <p className="text-white/60">Edit your profile information</p>
                </div>

                {/* Main Form Card */}
                <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                    <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">

                        {/* Personal Information Section */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-white flex items-center gap-2 border-b border-white/20 pb-2">
                                <FaUser className="text-blue-400" />
                                Personal Information
                            </h2>

                            {/* Name Field */}
                            <div className="space-y-2 group">
                                <label className="text-sm font-medium text-white/80 transition-colors group-focus-within:text-blue-400">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="name"
                                        value={userData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:bg-white/10"
                                        placeholder="Enter your full name"
                                    />
                                </div>
                            </div>



                            {/* Description Field */}
                            <div className="space-y-2 group">
                                <label className="text-sm font-medium text-white/80 transition-colors group-focus-within:text-blue-400 flex items-center gap-2">
                                    <FaFileAlt className="text-xs" />
                                    Bio/Description
                                </label>
                                <textarea
                                    name="description"
                                    value={userData.description}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:bg-white/10 resize-none"
                                    placeholder="Tell us about yourself..."
                                />
                            </div>

                            {/* Location Field */}
                            <div className="space-y-2 group">
                                <label className="text-sm font-medium text-white/80 transition-colors group-focus-within:text-blue-400 flex items-center gap-2">
                                    <FaMapMarkerAlt className="text-xs" />
                                    Location
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={userData.location}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:bg-white/10"
                                    placeholder="City, Country"
                                />
                            </div>
                        </div>

                        {/* Social Links Section */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-white flex items-center gap-2 border-b border-white/20 pb-2">
                                <FaGithub className="text-purple-400" />
                                Social Links
                            </h2>

                            {/* GitHub Field */}
                            <div className="space-y-2 group">
                                <label className="text-sm font-medium text-white/80 transition-colors group-focus-within:text-blue-400 flex items-center gap-2">
                                    <FaGithub className="text-xs" />
                                    GitHub Profile
                                </label>
                                <input
                                    type="url"
                                    name="github"
                                    value={userData.github}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:bg-white/10"
                                    placeholder="https://github.com/username"
                                />
                            </div>

                            {/* LinkedIn Field */}
                            <div className="space-y-2 group">
                                <label className="text-sm font-medium text-white/80 transition-colors group-focus-within:text-blue-400 flex items-center gap-2">
                                    <FaLinkedin className="text-xs" />
                                    LinkedIn Profile
                                </label>
                                <input
                                    type="url"
                                    name="linkedin"
                                    value={userData.linkedin}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:bg-white/10"
                                    placeholder="https://linkedin.com/in/username"
                                />
                            </div>
                        </div>

                        {/* Skills Section */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-white flex items-center gap-2 border-b border-white/20 pb-2">
                                <FaCode className="text-green-400" />
                                Skills & Technologies
                            </h2>

                            {/* Add New Skill */}
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newSkill}
                                    onChange={(e) => setNewSkill(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                                    className="flex-1 px-4 py-2 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300"
                                    placeholder="Add a skill..."
                                />
                                <button
                                    type="button"
                                    onClick={handleAddSkill}
                                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-all duration-300 flex items-center gap-2 hover:scale-105"
                                >
                                    <FaPlus className="text-sm" />
                                    Add
                                </button>
                            </div>

                            {/* Skills Display */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                {skillsArray.map((skill, index) => (
                                    <div
                                        key={index}
                                        className="bg-gradient-to-r from-white/10 to-white/5 border border-white/20 px-3 py-2 rounded-lg flex items-center justify-between group hover:from-red-500/20 hover:to-pink-500/20 transition-all duration-300"
                                    >
                                        <span className="text-white text-sm">{skill}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveSkill(index)}
                                            className="text-white/50 hover:text-red-400 transition-colors duration-300 ml-2"
                                        >
                                            <FaTrash className="text-xs" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-white/20">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 hover:from-purple-600 hover:to-blue-600 text-white py-3 px-6 rounded-xl font-medium shadow-lg transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 hover:shadow-purple-500/25 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Updating...
                                    </>
                                ) : (
                                    <>
                                        <FaSave />
                                        Save Changes
                                    </>
                                )}
                            </button>

                            <button
                                type="button"
                                onClick={handleCancel}
                                className="flex-1 sm:flex-none bg-white/10 hover:bg-white/20 text-white py-3 px-6 rounded-xl font-medium border border-white/20 hover:border-white/30 transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                <FaTimes />
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                toastClassName="backdrop-blur-md bg-white/10 border border-white/20"
            />
        </div>
    );
}

export default UpdateProfile;