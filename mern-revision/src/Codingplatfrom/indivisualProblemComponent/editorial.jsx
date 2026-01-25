import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Lightbulb, Clock, TrendingUp, CheckCircle } from 'lucide-react';

export default function ProblemEditorial() {
  const [expandedSections, setExpandedSections] = useState({
    overview: true,
    approach1: false,
    approach2: false,
    approach3: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Editorial: Two Sum
        </h1>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">
            Easy
          </span>
          <span className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            Acceptance: 49.2%
          </span>
        </div>
      </div>

      {/* Overview Section */}
      <Section
        title="Overview"
        icon={<Lightbulb className="w-5 h-5" />}
        isExpanded={expandedSections.overview}
        onToggle={() => toggleSection('overview')}
      >
        <p className="text-gray-700 leading-relaxed mb-4">
          This problem asks us to find two numbers in an array that add up to a specific target value. 
          We need to return the indices of these two numbers.
        </p>
        <p className="text-gray-700 leading-relaxed">
          The key insight is that for each number we examine, we're looking for a complement that would 
          sum to the target. We can use different data structures to optimize this search.
        </p>
      </Section>

      {/* Approach 1: Brute Force */}
      <Section
        title="Approach 1: Brute Force"
        icon={<Clock className="w-5 h-5" />}
        badge="Baseline Solution"
        isExpanded={expandedSections.approach1}
        onToggle={() => toggleSection('approach1')}
      >
        <h3 className="font-semibold text-gray-900 mb-3">Intuition</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          The simplest approach is to check every possible pair of numbers. For each number, 
          we check if it can be paired with any other number to reach the target sum.
        </p>

        <h3 className="font-semibold text-gray-900 mb-3">Algorithm</h3>
        <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
          <li>Use two nested loops to generate all possible pairs</li>
          <li>For each pair, check if their sum equals the target</li>
          <li>If found, return the indices</li>
        </ol>

        <CodeBlock
          code={`def twoSum(nums, target):
    n = len(nums)
    for i in range(n):
        for j in range(i + 1, n):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []`}
          language="python"
        />

        <ComplexityAnalysis
          time="O(n²)"
          timeExplanation="We check every possible pair using nested loops"
          space="O(1)"
          spaceExplanation="We only use a constant amount of extra space"
        />
      </Section>

      {/* Approach 2: Hash Map (Two Pass) */}
      <Section
        title="Approach 2: Hash Map - Two Pass"
        icon={<CheckCircle className="w-5 h-5" />}
        badge="Better Solution"
        isExpanded={expandedSections.approach2}
        onToggle={() => toggleSection('approach2')}
      >
        <h3 className="font-semibold text-gray-900 mb-3">Intuition</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          Instead of searching for the complement in the array repeatedly, we can build a hash map 
          that stores each number and its index. This allows us to check for the complement in O(1) time.
        </p>

        <h3 className="font-semibold text-gray-900 mb-3">Algorithm</h3>
        <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
          <li>First pass: Build a hash map of all numbers and their indices</li>
          <li>Second pass: For each number, check if its complement exists in the hash map</li>
          <li>Ensure we don't use the same element twice</li>
        </ol>

        <CodeBlock
          code={`def twoSum(nums, target):
    # First pass: build hash map
    num_map = {}
    for i, num in enumerate(nums):
        num_map[num] = i
    
    # Second pass: find complement
    for i, num in enumerate(nums):
        complement = target - num
        if complement in num_map and num_map[complement] != i:
            return [i, num_map[complement]]
    
    return []`}
          language="python"
        />

        <ComplexityAnalysis
          time="O(n)"
          timeExplanation="We traverse the array twice, each traversal is O(n)"
          space="O(n)"
          spaceExplanation="We store all n elements in the hash map"
        />
      </Section>

      {/* Approach 3: Hash Map (One Pass) */}
      <Section
        title="Approach 3: Hash Map - One Pass"
        icon={<CheckCircle className="w-5 h-5 text-green-600" />}
        badge="Optimal Solution"
        badgeColor="green"
        isExpanded={expandedSections.approach3}
        onToggle={() => toggleSection('approach3')}
      >
        <h3 className="font-semibold text-gray-900 mb-3">Intuition</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          We can optimize further by building the hash map and checking for complements in a single pass. 
          As we iterate through the array, we check if the current number's complement already exists in 
          our hash map. If not, we add the current number to the hash map.
        </p>

        <h3 className="font-semibold text-gray-900 mb-3">Algorithm</h3>
        <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
          <li>Initialize an empty hash map</li>
          <li>For each number, calculate its complement (target - current number)</li>
          <li>Check if the complement exists in the hash map</li>
          <li>If yes, return the current index and the complement's index</li>
          <li>If no, add the current number and its index to the hash map</li>
        </ol>

        <CodeBlock
          code={`def twoSum(nums, target):
    num_map = {}
    
    for i, num in enumerate(nums):
        complement = target - num
        
        if complement in num_map:
            return [num_map[complement], i]
        
        num_map[num] = i
    
    return []`}
          language="python"
        />

        <ComplexityAnalysis
          time="O(n)"
          timeExplanation="We traverse the array only once, and hash map operations are O(1)"
          space="O(n)"
          spaceExplanation="In the worst case, we store all n elements in the hash map"
        />

        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800 font-medium">
            ✓ This is the most optimal solution with linear time complexity and a single pass through the array.
          </p>
        </div>
      </Section>
    </div>
  );
}

function Section({ title, icon, badge, badgeColor = 'blue', isExpanded, onToggle, children }) {
  return (
    <div className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-150"
      >
        <div className="flex items-center gap-3">
          {isExpanded ? <ChevronDown className="w-5 h-5 text-gray-600" /> : <ChevronRight className="w-5 h-5 text-gray-600" />}
          <span className="text-gray-600">{icon}</span>
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          {badge && (
            <span className={`px-2 py-1 text-xs font-medium rounded ${
              badgeColor === 'green' 
                ? 'bg-green-100 text-green-700' 
                : 'bg-blue-100 text-blue-700'
            }`}>
              {badge}
            </span>
          )}
        </div>
      </button>
      {isExpanded && (
        <div className="p-6 bg-white">
          {children}
        </div>
      )}
    </div>
  );
}

function CodeBlock({ code, language }) {
  return (
    <div className="mb-6">
      <div className="bg-gray-900 rounded-lg overflow-hidden">
        <div className="px-4 py-2 bg-gray-800 text-gray-400 text-xs font-mono">
          {language}
        </div>
        <pre className="p-4 overflow-x-auto">
          <code className="text-sm text-gray-100 font-mono leading-relaxed">
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
}

function ComplexityAnalysis({ time, timeExplanation, space, spaceExplanation }) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <h3 className="font-semibold text-gray-900 mb-3">Complexity Analysis</h3>
      <div className="space-y-3">
        <div>
          <p className="font-mono text-sm font-semibold text-blue-900 mb-1">
            Time Complexity: {time}
          </p>
          <p className="text-sm text-gray-700">{timeExplanation}</p>
        </div>
        <div>
          <p className="font-mono text-sm font-semibold text-blue-900 mb-1">
            Space Complexity: {space}
          </p>
          <p className="text-sm text-gray-700">{spaceExplanation}</p>
        </div>
      </div>
    </div>
  );
}