import { useEffect, useState } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaMapMarkerAlt,
  FaEdit,
  FaEye,
  FaHeart,
  FaFileAlt,
} from "react-icons/fa";

function ProfileLeft({ userId }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const Base_Url = "http://localhost:3000/codesy/v1";

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await fetch(`${Base_Url}/get/my-profile`, {
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) setUserData(data.data);
      } catch (err) {
        console.error("Profile load failed", err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [userId]);

  if (loading) {
    return <p className="text-white/60 px-6">Loading profile...</p>;
  }

  if (!userData) {
    return <p className="text-red-400 px-6">Profile not found</p>;
  }

  return (
    <aside className="w-full lg:w-[360px] xl:w-[400px] px-4 sm:px-6 py-6">
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl shadow-xl">

        {/* ===== Header ===== */}
        <div className="relative px-6 pt-8 pb-6 text-center">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-t-3xl" />

          <div className="relative flex flex-col items-center gap-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg ring-4 ring-white/20">
              {userData.username.charAt(0).toUpperCase()}
            </div>

            <h1 className="text-xl font-semibold text-white">
              {userData.username}
            </h1>

            <div className="flex items-center gap-2 text-white/60 text-sm">
              <FaMapMarkerAlt />
              {userData.location || "Location not set"}
            </div>
          </div>
        </div>

        {/* ===== Body ===== */}
        <div className="px-6 py-6 space-y-6">

          {/* Bio */}
          <p className="text-sm text-white/80 leading-relaxed">
            {userData.description || "No bio added yet."}
          </p>

          {/* Edit */}
          <button
            onClick={() => window.location.href = "/update-profile"}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium flex items-center justify-center gap-2 hover:opacity-90 transition"
          >
            <FaEdit />
            Edit Profile
          </button>

          {/* Social */}
          <div className="space-y-3">
            <a
              href={userData.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl border border-white/10 hover:bg-white/5 transition"
            >
              <FaGithub className="text-white/70" />
              <span className="text-sm text-white/70">GitHub</span>
            </a>

            <a
              href={userData.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl border border-white/10 hover:bg-white/5 transition"
            >
              <FaLinkedin className="text-blue-400" />
              <span className="text-sm text-white/70">LinkedIn</span>
            </a>
          </div>

          {/* Skills */}
          {userData.skills?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {userData.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs rounded-full bg-white/10 border border-white/20 text-white/80"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <Stat icon={<FaEye />} value={userData.stats.views} label="Views" />
            <Stat icon={<FaFileAlt />} value={userData.stats.posts} label="Posts" />
            <Stat icon={<FaHeart />} value={userData.stats.likes} label="Likes" />
          </div>
        </div>
      </div>
    </aside>
  );
}

function Stat({ icon, value, label }) {
  return (
    <div className="flex flex-col items-center gap-1 py-3 rounded-xl border border-white/10 bg-white/5">
      <div className="text-white/80">{icon}</div>
      <div className="text-white font-semibold text-sm">{value}</div>
      <div className="text-white/50 text-xs">{label}</div>
    </div>
  );
}

export default ProfileLeft;
