import React, { useState } from 'react';
import { CheckCircle, Clock, Zap, TrendingUp, Code, ChevronDown, ChevronRight } from 'lucide-react';

export default function SubmissionSection() {
  const [showCode, setShowCode] = useState(false);
  const [activeTab, setActiveTab] = useState('runtime');

  return (
    <div className="bg-slate-900 text-gray-200 min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Success Banner */}
        <div className="bg-green-500/10 border-2 border-green-500/30 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-8 h-8 text-green-400" />
            <h1 className="text-2xl font-bold text-green-400">Accepted</h1>
          </div>
          <p className="text-gray-300 text-sm ml-11">
            Your submission has been accepted and passed all test cases.
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StatCard
            icon={<Clock className="w-5 h-5" />}
            label="Runtime"
            value="45 ms"
            comparison="Beats 89.23%"
            comparisonColor="text-green-400"
          />
          <StatCard
            icon={<Zap className="w-5 h-5" />}
            label="Memory"
            value="16.2 MB"
            comparison="Beats 75.45%"
            comparisonColor="text-yellow-400"
          />
          <StatCard
            icon={<CheckCircle className="w-5 h-5" />}
            label="Test Cases"
            value="62 / 62"
            comparison="All passed"
            comparisonColor="text-green-400"
          />
        </div>

        {/* Distribution Charts */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-4 mb-6 border-b border-slate-700">
            <button
              onClick={() => setActiveTab('runtime')}
              className={`pb-3 px-1 font-medium transition-colors relative ${
                activeTab === 'runtime'
                  ? 'text-blue-400'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              Runtime Distribution
              {activeTab === 'runtime' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('memory')}
              className={`pb-3 px-1 font-medium transition-colors relative ${
                activeTab === 'memory'
                  ? 'text-blue-400'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              Memory Distribution
              {activeTab === 'memory' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400"></div>
              )}
            </button>
          </div>

          {activeTab === 'runtime' ? (
            <RuntimeDistribution yourRuntime={45} />
          ) : (
            <MemoryDistribution yourMemory={16.2} />
          )}
        </div>

        {/* Submission Details */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden mb-6">
          <button
            onClick={() => setShowCode(!showCode)}
            className="w-full flex items-center justify-between p-4 hover:bg-slate-750 transition-colors"
          >
            <div className="flex items-center gap-3">
              {showCode ? (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-400" />
              )}
              <Code className="w-5 h-5 text-blue-400" />
              <span className="font-semibold text-white">Submitted Code</span>
            </div>
            <span className="text-sm text-gray-400">Python3</span>
          </button>

          {showCode && (
            <div className="border-t border-slate-700">
              <CodeBlock />
            </div>
          )}
        </div>

        {/* Test Case Details */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            Test Case Performance
          </h3>
          <div className="space-y-3">
            <TestCase
              name="Basic Cases"
              passed={15}
              total={15}
              avgTime="2ms"
            />
            <TestCase
              name="Edge Cases"
              passed={12}
              total={12}
              avgTime="3ms"
            />
            <TestCase
              name="Large Input"
              passed={20}
              total={20}
              avgTime="38ms"
            />
            <TestCase
              name="Random Cases"
              passed={15}
              total={15}
              avgTime="5ms"
            />
          </div>
        </div>

        {/* Submission Info */}
        <div className="mt-6 text-sm text-gray-400 flex items-center justify-between">
          <span>Submitted at: Jan 26, 2026, 10:24:15 AM</span>
          <span>Language: Python3</span>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, comparison, comparisonColor }) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-2 text-gray-400">
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className={`text-sm font-medium ${comparisonColor}`}>
        {comparison}
      </div>
    </div>
  );
}

function RuntimeDistribution({ yourRuntime }) {
  const distribution = [
    { range: '0-20ms', percentage: 5, count: 125 },
    { range: '20-40ms', percentage: 15, count: 380 },
    { range: '40-60ms', percentage: 45, count: 1150, highlight: true },
    { range: '60-80ms', percentage: 25, count: 640 },
    { range: '80-100ms', percentage: 8, count: 205 },
    { range: '100+ms', percentage: 2, count: 50 }
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm mb-4">
        <span className="text-gray-400">Your runtime: {yourRuntime}ms</span>
        <span className="text-green-400 font-medium">Faster than 89.23% of submissions</span>
      </div>
      {distribution.map((item) => (
        <div key={item.range} className="flex items-center gap-3">
          <div className="w-20 text-sm text-gray-400">{item.range}</div>
          <div className="flex-1 h-8 bg-slate-700 rounded-lg overflow-hidden relative">
            <div
              className={`h-full ${
                item.highlight
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600'
                  : 'bg-slate-600'
              } transition-all duration-500`}
              style={{ width: `${item.percentage}%` }}
            ></div>
            {item.highlight && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-xs font-bold">You</span>
              </div>
            )}
          </div>
          <div className="w-16 text-sm text-gray-400 text-right">
            {item.percentage}%
          </div>
        </div>
      ))}
    </div>
  );
}

function MemoryDistribution({ yourMemory }) {
  const distribution = [
    { range: '14-15MB', percentage: 12, count: 310 },
    { range: '15-16MB', percentage: 28, count: 720 },
    { range: '16-17MB', percentage: 35, count: 900, highlight: true },
    { range: '17-18MB', percentage: 18, count: 465 },
    { range: '18-19MB', percentage: 5, count: 130 },
    { range: '19+MB', percentage: 2, count: 50 }
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm mb-4">
        <span className="text-gray-400">Your memory: {yourMemory}MB</span>
        <span className="text-yellow-400 font-medium">Better than 75.45% of submissions</span>
      </div>
      {distribution.map((item) => (
        <div key={item.range} className="flex items-center gap-3">
          <div className="w-20 text-sm text-gray-400">{item.range}</div>
          <div className="flex-1 h-8 bg-slate-700 rounded-lg overflow-hidden relative">
            <div
              className={`h-full ${
                item.highlight
                  ? 'bg-gradient-to-r from-purple-500 to-purple-600'
                  : 'bg-slate-600'
              } transition-all duration-500`}
              style={{ width: `${item.percentage}%` }}
            ></div>
            {item.highlight && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-xs font-bold">You</span>
              </div>
            )}
          </div>
          <div className="w-16 text-sm text-gray-400 text-right">
            {item.percentage}%
          </div>
        </div>
      ))}
    </div>
  );
}

function CodeBlock() {
  const code = `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        num_map = {}
        
        for i, num in enumerate(nums):
            complement = target - num
            
            if complement in num_map:
                return [num_map[complement], i]
            
            num_map[num] = i
        
        return []`;

  return (
    <div className="bg-slate-900">
      <pre className="p-6 overflow-x-auto">
        <code className="text-sm text-gray-100 font-mono leading-relaxed">
          {code}
        </code>
      </pre>
    </div>
  );
}

function TestCase({ name, passed, total, avgTime }) {
  const percentage = (passed / total) * 100;
  
  return (
    <div className="bg-slate-750 border border-slate-700 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-400" />
          <span className="text-white font-medium">{name}</span>
        </div>
        <span className="text-sm text-gray-400">Avg: {avgTime}</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-500 to-green-600"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <span className="text-sm text-green-400 font-medium">
          {passed}/{total}
        </span>
      </div>
    </div>
  );
}