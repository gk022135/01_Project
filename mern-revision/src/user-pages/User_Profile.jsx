import React, { useState, useEffect } from "react";
import { Github, Code2, ExternalLink, Star, GitFork, Users, Award, Trophy, Target } from "lucide-react";
import ContributionGraph from "../test/Contri";
import ProfileLeft from "../test/profile_left";
import RightPart from "../test/RightPart";

function UserProfile({ props }) {
    
    const [githubData, setGithubData] = useState(null);
    const [leetcodeData, setLeetcodeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // GitHub API call
    useEffect(() => {
        const fetchGithubData = async () => {
            try {
                // Replace 'username' with actual GitHub username from props or user data
                const username = props?.github?.split('github.com/')[1] || 'gaurav';
                
                const response = await fetch(`https://api.github.com/users/gk022135`);
                if (!response.ok) throw new Error('GitHub API failed');
                
                const data = await response.json();
                
                // Fetch user's repositories
                const reposResponse = await fetch(`https://api.github.com/users/gk022135/repos?sort=updated&per_page=6`);
                const repos = await reposResponse.json();
                
                setGithubData({
                    ...data,
                    topRepos: repos
                });
            } catch (err) {
                console.error('Error fetching GitHub data:', err);
                setError(err.message);
            }
        };

        const fetchLeetcodeData = async () => {
            try {
                // LeetCode username from props
                // const username = props?.leetcode?.split('leetcode.com/')[1] || 'Gaurav_krrr';
                

                const response = await fetch('https://leetcode-stats-api.herokuapp.com/Gaurav_krrr');

                const result = await response.json();
                
                if (result && result.status === "success") {
                    const username = props?.leetcode?.split('leetcode.com/')[1] || 'Gaurav_krrr';
                    setLeetcodeData({
                        username,
                        ranking: result.ranking || 0,
                        reputation: result.reputation || 0,
                        totalSolved: result.totalSolved || 0,
                        easySolved: result.easySolved || 0,
                        mediumSolved: result.mediumSolved || 0,
                        hardSolved: result.hardSolved || 0,
                        recentSubmissions: result.recentSubmissions || []
                    });
                } else {
                    // Fallback to mock data if API fails
                    setLeetcodeData({
                        username: username,
                        ranking: 45230,
                        reputation: 0,
                        totalSolved: 187,
                        easySolved: 89,
                        mediumSolved: 76,
                        hardSolved: 22,
                        recentSubmissions: []
                    });
                }
            } catch (err) {
                console.error('Error fetching LeetCode data:', err);
                // Set mock data on error
                setLeetcodeData({
                    username: props?.username || "gaurav",
                    ranking: 45230,
                    reputation: 0,
                    totalSolved: 187,
                    easySolved: 89,
                    mediumSolved: 76,
                    hardSolved: 22,
                    recentSubmissions: []
                });
            } finally {
                setLoading(false);
            }
        };

        fetchGithubData();
        fetchLeetcodeData();
    }, [props]);

    return (
        <div className="flex-row bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 min-h-screen">
            <div className="flex flex-col lg:flex-row gap-6 px-4 sm:px-6 md:px-10 lg:px-16 py-6">
                <ProfileLeft />

                {/* Right (Charts) */}
                <div className="w-full lg:w-3/4 space-y-6">
                    <ContributionGraph />
                    
                    {/* GitHub Details */}
                    <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 shadow-xl">
                        <div className="flex items-center gap-3 mb-6">
                            <Github size={28} className="text-white" />
                            <h2 className="text-2xl font-bold text-white">GitHub Profile</h2>
                        </div>

                        {loading ? (
                            <div className="flex justify-center py-8">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
                            </div>
                        ) : error ? (
                            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400">
                                Error loading GitHub data: {error}
                            </div>
                        ) : githubData ? (
                            <>
                                {/* GitHub Stats */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                    <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 border border-purple-500/30 rounded-xl p-4 text-center">
                                        <div className="text-3xl font-bold text-white mb-1">
                                            {githubData.public_repos}
                                        </div>
                                        <div className="text-gray-400 text-sm">Repositories</div>
                                    </div>
                                    <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border border-blue-500/30 rounded-xl p-4 text-center">
                                        <div className="text-3xl font-bold text-white mb-1">
                                            {githubData.followers}
                                        </div>
                                        <div className="text-gray-400 text-sm">Followers</div>
                                    </div>
                                    <div className="bg-gradient-to-br from-cyan-600/20 to-cyan-800/20 border border-cyan-500/30 rounded-xl p-4 text-center">
                                        <div className="text-3xl font-bold text-white mb-1">
                                            {githubData.following}
                                        </div>
                                        <div className="text-gray-400 text-sm">Following</div>
                                    </div>
                                    <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 border border-green-500/30 rounded-xl p-4 text-center">
                                        <div className="text-3xl font-bold text-white mb-1">
                                            {githubData.public_gists}
                                        </div>
                                        <div className="text-gray-400 text-sm">Gists</div>
                                    </div>
                                </div>

                                {/* Top Repositories */}
                                <div className="mb-4">
                                    <h3 className="text-lg font-semibold text-white mb-4">Top Repositories</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {githubData.topRepos?.slice(0, 6).map((repo) => (
                                            <a
                                                key={repo.id}
                                                href={repo.html_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-gray-700/30 hover:bg-gray-700/50 border border-gray-600 rounded-xl p-4 transition duration-200 group"
                                            >
                                                <div className="flex items-start justify-between mb-2">
                                                    <h4 className="text-white font-semibold group-hover:text-cyan-400 transition flex items-center gap-2">
                                                        {repo.name}
                                                        <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition" />
                                                    </h4>
                                                </div>
                                                <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                                                    {repo.description || "No description available"}
                                                </p>
                                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                                    <span className="flex items-center gap-1">
                                                        <Star size={14} className="text-yellow-500" />
                                                        {repo.stargazers_count}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <GitFork size={14} className="text-gray-400" />
                                                        {repo.forks_count}
                                                    </span>
                                                    {repo.language && (
                                                        <span className="px-2 py-1 bg-cyan-600/20 text-cyan-400 rounded">
                                                            {repo.language}
                                                        </span>
                                                    )}
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                </div>

                                {/* View Full Profile Link */}
                                <a
                                    href={githubData.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition mt-4"
                                >
                                    View Full GitHub Profile
                                    <ExternalLink size={16} />
                                </a>
                            </>
                        ) : null}
                    </div>

                    {/* LeetCode Details */}
                    <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 shadow-xl">
                        <div className="flex items-center gap-3 mb-6">
                            <Code2 size={28} className="text-orange-400" />
                            <h2 className="text-2xl font-bold text-white">LeetCode Profile</h2>
                        </div>

                        {loading ? (
                            <div className="flex justify-center py-8">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                            </div>
                        ) : leetcodeData ? (
                            <>
                                {/* LeetCode Stats */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                    <div className="bg-gradient-to-br from-orange-600/20 to-orange-800/20 border border-orange-500/30 rounded-xl p-4 text-center">
                                        <div className="flex justify-center mb-2">
                                            <Trophy size={24} className="text-orange-400" />
                                        </div>
                                        <div className="text-2xl font-bold text-white mb-1">
                                            {leetcodeData.totalSolved}
                                        </div>
                                        <div className="text-gray-400 text-sm">Problems Solved</div>
                                    </div>
                                    <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 border border-green-500/30 rounded-xl p-4 text-center">
                                        <div className="flex justify-center mb-2">
                                            <Target size={24} className="text-green-400" />
                                        </div>
                                        <div className="text-2xl font-bold text-white mb-1">
                                            {leetcodeData.easySolved}
                                        </div>
                                        <div className="text-gray-400 text-sm">Easy</div>
                                    </div>
                                    <div className="bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 border border-yellow-500/30 rounded-xl p-4 text-center">
                                        <div className="flex justify-center mb-2">
                                            <Target size={24} className="text-yellow-400" />
                                        </div>
                                        <div className="text-2xl font-bold text-white mb-1">
                                            {leetcodeData.mediumSolved}
                                        </div>
                                        <div className="text-gray-400 text-sm">Medium</div>
                                    </div>
                                    <div className="bg-gradient-to-br from-red-600/20 to-red-800/20 border border-red-500/30 rounded-xl p-4 text-center">
                                        <div className="flex justify-center mb-2">
                                            <Target size={24} className="text-red-400" />
                                        </div>
                                        <div className="text-2xl font-bold text-white mb-1">
                                            {leetcodeData.hardSolved}
                                        </div>
                                        <div className="text-gray-400 text-sm">Hard</div>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="mb-6">
                                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                                        <span>Problem Solving Progress</span>
                                        <span>{leetcodeData.totalSolved} / 3000+</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                                        <div className="flex h-full">
                                            <div 
                                                className="bg-green-500" 
                                                style={{ width: `${(leetcodeData.easySolved / leetcodeData.totalSolved) * 100}%` }}
                                            ></div>
                                            <div 
                                                className="bg-yellow-500" 
                                                style={{ width: `${(leetcodeData.mediumSolved / leetcodeData.totalSolved) * 100}%` }}
                                            ></div>
                                            <div 
                                                className="bg-red-500" 
                                                style={{ width: `${(leetcodeData.hardSolved / leetcodeData.totalSolved) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Ranking Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    <div className="bg-gray-700/30 rounded-xl p-4">
                                        <div className="text-gray-400 text-sm mb-1">Global Ranking</div>
                                        <div className="text-2xl font-bold text-white">
                                            #{leetcodeData.ranking.toLocaleString()}
                                        </div>
                                    </div>
                                    <div className="bg-gray-700/30 rounded-xl p-4">
                                        <div className="text-gray-400 text-sm mb-1">Reputation</div>
                                        <div className="text-2xl font-bold text-white">
                                            {leetcodeData.reputation}
                                        </div>
                                    </div>
                                </div>

                                {/* Recent Submissions */}
                                {leetcodeData.recentSubmissions && leetcodeData.recentSubmissions.length > 0 && (
                                    <div className="mb-4">
                                        <h3 className="text-lg font-semibold text-white mb-4">Recent Submissions</h3>
                                        <div className="space-y-2">
                                            {leetcodeData.recentSubmissions.map((submission, idx) => (
                                                <div
                                                    key={idx}
                                                    className="bg-gray-700/30 rounded-lg p-3 flex items-center justify-between"
                                                >
                                                    <div>
                                                        <div className="text-white text-sm font-medium">{submission.title}</div>
                                                        <div className="text-gray-400 text-xs">{submission.lang}</div>
                                                    </div>
                                                    <span className={`px-2 py-1 rounded text-xs ${
                                                        submission.statusDisplay === 'Accepted' 
                                                            ? 'bg-green-600/20 text-green-400' 
                                                            : 'bg-red-600/20 text-red-400'
                                                    }`}>
                                                        {submission.statusDisplay}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* View Profile Link */}
                                <a
                                    href={`https://leetcode.com/${leetcodeData.username}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition"
                                >
                                    View Full LeetCode Profile
                                    <ExternalLink size={16} />
                                </a>
                            </>
                        ) : null}
                    </div>
                </div>
            </div>
            
            <RightPart />
        </div>
    );
}

export default UserProfile;