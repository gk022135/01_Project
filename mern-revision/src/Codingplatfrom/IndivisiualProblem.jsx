import React, { useEffect, useState } from "react";
import {
  Group as PanelGroup,
  Panel,
  Separator as PanelResizeHandle,
} from "react-resizable-panels";

import ProblemDescription from "./indivisualProblemComponent/Description";
import Solution from "./indivisualProblemComponent/solution";
import ProblemEditorial from "./indivisualProblemComponent/editorial";
import SubmissionSection from "./indivisualProblemComponent/submission";

const TABS = ["Description", "Solution", "Editorial", "Submission"];

export default function IndividualProblem({ problemId }) {
  const [problem, setProblem] = useState(null);
  const [activeTab, setActiveTab] = useState("Description");
  const [tabs, setTabs] = useState(TABS);

  /* ---------------- Fetch problem ---------------- */
  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await fetch(`/api/problems/${problemId}`);
        const data = await res.json();
        setProblem(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProblem();
  }, [problemId]);

//   if (!problem) {
//     return <div className="text-gray-400 p-6">Loading...uioo</div>;
//   }

  return (
    <div className="h-screen bg-gray-950 text-gray-100">
      <PanelGroup direction="horizontal">

        {/* ---------------- LEFT PANEL ---------------- */}
        <Panel defaultSize={50} minSize={30}>
          <div className="h-full flex flex-col border-r border-gray-800">

            {/* Tabs */}
            <div className="flex gap-2 p-3 bg-gray-900 border-b border-gray-800">
              {tabs.map((tab, idx) => (
                <button
                  key={tab}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData("text/plain", String(idx));
                    e.dataTransfer.effectAllowed = "move";
                  }}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const from = Number(e.dataTransfer.getData("text/plain"));
                    const to = idx;
                    if (Number.isNaN(from) || from === to) return;
                    const newTabs = [...tabs];
                    const [moved] = newTabs.splice(from, 1);
                    newTabs.splice(to, 0, moved);
                    setTabs(newTabs);
                    if (activeTab === moved) setActiveTab(moved);
                  }}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-md text-sm transition
                    ${
                      activeTab === tab
                        ? "bg-indigo-600"
                        : "bg-gray-800 hover:bg-gray-700"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-4">
              {activeTab === "Description" && (
                <ProblemDescription problemId={problemId} />
              )}
              {activeTab === "Solution" && (
                <Solution problemId={problemId} />
              )}
              {activeTab === "Editorial" && (
                <ProblemEditorial problemId={problemId} />
              )}
              {activeTab === "Submission" && (
                <SubmissionSection problemId={problemId} />
              )}
            </div>
          </div>
        </Panel>

        {/* ---------------- RESIZE HANDLE ---------------- */}
        <PanelResizeHandle className="w-1 bg-gray-800 hover:bg-indigo-500 cursor-col-resize" />

        {/* ---------------- RIGHT PANEL ---------------- */}
        <Panel defaultSize={50} minSize={30}>
          <div className="h-full flex flex-col">

            {/* Code Editor */}
            <div className="flex-1 p-4">
              <h2 className="text-lg font-semibold mb-2">Code Editor</h2>
              <div className="h-full bg-gray-900 rounded-lg border border-gray-800 flex items-center justify-center">
                <p className="text-gray-500">
                  Monaco / CodeMirror editor goes here
                </p>
              </div>
            </div>

            {/* Test Cases */}
            <div className="h-56 border-t border-gray-800 p-4 bg-gray-900">
              <h3 className="text-sm font-semibold mb-2">Test Cases</h3>
              <p className="text-gray-500 text-sm">
                Test cases panel (can be draggable next)
              </p>
            </div>
          </div>
        </Panel>
      </PanelGroup>
    </div>
  );
}
