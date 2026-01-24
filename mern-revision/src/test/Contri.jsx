import React, { useState, useEffect } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

const ContributionGraph = ({ userId }) => {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [activityData, setActivityData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [tooltip, setTooltip] = useState({
        visible: false,
        x: 0,
        y: 0,
        value: null,
    });

    const stDate = new Date();
    const edDate = new Date();

    const BASE_URL = "http://localhost:3000/codesy/v1"


    if (selectedYear == 2025) {
        stDate.setFullYear(2025, 0, 1);
        edDate.setFullYear(2025, 11, 31);
    } else if (selectedYear == 2024) {
        stDate.setFullYear(2024, 0, 1);
        edDate.setFullYear(2024, 11, 31);
    } else if (selectedYear == 2023) {
        stDate.setFullYear(2023, 0, 1);
        edDate.setFullYear(2023, 11, 31);
    } else if (selectedYear == 2022) {
        stDate.setFullYear(2022, 0, 1);
        edDate.setFullYear(2022, 11, 31);
    } else {
        stDate.setFullYear(2025, 0, 1);
        edDate.setFullYear(2025, 11, 31);
    }



    // -----------------------------------------
    // Fetch Daily Activity from API
    // -----------------------------------------
    useEffect(() => {
        const fetchDailyActivity = async () => {
            const email = JSON.parse(localStorage.getItem("UserData"))?.email;
            if (!email) return;

            try {
                setLoading(true);

                const url = `${BASE_URL}/get/activity/daily?email=${email}&selectedYear=${selectedYear}`;
                const res = await fetch(url);
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

                const data = await res.json();
                console.log("API Response:", data);

                // Directly use the data array from backend
                const mapped = data.data || [];

                setActivityData(mapped);

            } catch (err) {
                console.error("Error fetching activity:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDailyActivity();
    }, [selectedYear]);

    // -----------------------------------------
    // Tooltip Handlers
    // -----------------------------------------
    const handleMouseOver = (event, value) => {
        if (!value) return;
        const rect = event.target.getBoundingClientRect();
        setTooltip({
            visible: true,
            x: rect.left + window.scrollX,
            y: rect.top + window.scrollY - 30,
            value,
        });
    };

    const handleMouseLeave = () => {
        setTooltip({ visible: false, x: 0, y: 0, value: null });
    };

    return (
        <div className="w-full px-4 py-6 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl p-6 sm:p-8 border border-gray-700/50 backdrop-blur-sm">
                    {/* Header Section */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                                Yearly Activity
                            </h2>
                            <p className="text-gray-400 text-sm mt-1">Track your daily contributions</p>
                        </div>

                        {/* Year Selector */}
                        <div className="flex items-center gap-3">
                            <label className="text-sm font-medium text-gray-300 whitespace-nowrap">
                                Select Year:
                            </label>
                            <select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                className="bg-gray-800/80 border border-gray-600 text-white rounded-lg px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 cursor-pointer hover:bg-gray-700/80 backdrop-blur-sm"
                            >
                                <option value="2025">2025</option>
                                <option value="2024">2024</option>
                                <option value="2023">2023</option>
                                <option value="2022">2022</option>
                            </select>
                        </div>
                    </div>

                    {/* Calendar Section */}
                    <div className="bg-gray-800/40 rounded-xl p-4 sm:p-6 border border-gray-700/30">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-20">
                                <div className="relative">
                                    <div className="w-16 h-16 border-4 border-gray-700 border-t-blue-500 rounded-full animate-spin"></div>
                                </div>
                                <p className="text-gray-300 mt-4 font-medium">Loading activity...</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto -mx-2 sm:mx-0">
                                <div className="min-w-max px-2 sm:px-0">
                                    <CalendarHeatmap
                                        startDate={stDate}
                                        endDate={edDate}
                                        values={activityData}
                                        showWeekdayLabels
                                        classForValue={(value) => {
                                            if (!value || value.count === 0) return "color-empty";
                                            if (value.count < 3) return "color-scale-1";
                                            if (value.count < 6) return "color-scale-2";
                                            if (value.count < 9) return "color-scale-3";
                                            return "color-scale-4";
                                        }}
                                        onMouseOver={handleMouseOver}
                                        onMouseLeave={handleMouseLeave}
                                        gutterSize={4}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Legend */}
                        <div className="flex items-center justify-end gap-2 mt-6 flex-wrap">
                            <span className="text-xs text-gray-400 font-medium">Less</span>
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-sm bg-gray-700/50 border border-gray-600/50"></div>
                                <div className="w-3 h-3 rounded-sm bg-emerald-900/60"></div>
                                <div className="w-3 h-3 rounded-sm bg-emerald-700/70"></div>
                                <div className="w-3 h-3 rounded-sm bg-emerald-500/80"></div>
                                <div className="w-3 h-3 rounded-sm bg-emerald-400"></div>
                            </div>
                            <span className="text-xs text-gray-400 font-medium">More</span>
                        </div>
                    </div>

                    {/* Tooltip */}
                    {tooltip.visible && tooltip.value && (
                        <div
                            className="fixed bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-2xl pointer-events-none z-50 border border-gray-700 font-medium"
                            style={{
                                top: tooltip.y,
                                left: tooltip.x,
                                transform: 'translateX(-50%)',
                            }}
                        >
                            <div className="flex flex-col gap-0.5">
                                <span className="text-gray-300">{tooltip.value.date}</span>
                                <span className="text-emerald-400 font-semibold">
                                    {tooltip.value.count} {tooltip.value.count === 1 ? 'activity' : 'activities'}
                                </span>
                            </div>
                            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 border-b border-r border-gray-700 rotate-45"></div>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                .react-calendar-heatmap {
                    line-height: 1;
                }

                .react-calendar-heatmap text {
                    font-size: 10px;
                    fill: #9ca3af;
                    font-weight: 500;
                }

                .react-calendar-heatmap rect {
                    rx: 3px;
                    transition: all 0.2s ease;
                }

                .react-calendar-heatmap rect:hover {
                    stroke: #60a5fa;
                    stroke-width: 2px;
                    transform: scale(1.1);
                }

                .react-calendar-heatmap .color-empty {
                    fill: rgba(55, 65, 81, 0.3);
                    stroke: rgba(75, 85, 99, 0.3);
                    stroke-width: 1px;
                }

                .react-calendar-heatmap .color-scale-1 {
                    fill: rgba(6, 78, 59, 0.6);
                }

                .react-calendar-heatmap .color-scale-2 {
                    fill: rgba(4, 120, 87, 0.7);
                }

                .react-calendar-heatmap .color-scale-3 {
                    fill: rgba(16, 185, 129, 0.8);
                }

                .react-calendar-heatmap .color-scale-4 {
                    fill: rgba(52, 211, 153, 1);
                }

                @media (max-width: 640px) {
                    .react-calendar-heatmap text {
                        font-size: 8px;
                    }
                    
                    .react-calendar-heatmap rect {
                        rx: 2px;
                    }
                }
            `}</style>
        </div>
    );
};

export default ContributionGraph;