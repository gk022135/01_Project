import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, Bookmark, Share2, Eye } from 'lucide-react';

export default function ProblemDescription() {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <div className="bg-slate-900 text-gray-200 min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl font-semibold text-white mb-2">
                1. Two Sum
              </h1>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-sm font-medium border border-green-500/20">
                  Easy
                </span>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    2.5M
                  </span>
                  <span>Acceptance: 49.2%</span>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLiked(!liked)}
                className={`p-2 rounded-lg transition-colors ${
                  liked ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-800 text-gray-400 hover:bg-slate-700'
                }`}
              >
                <ThumbsUp className="w-5 h-5" />
              </button>
              <button
                onClick={() => setDisliked(!disliked)}
                className={`p-2 rounded-lg transition-colors ${
                  disliked ? 'bg-red-500/20 text-red-400' : 'bg-slate-800 text-gray-400 hover:bg-slate-700'
                }`}
              >
                <ThumbsDown className="w-5 h-5" />
              </button>
              <button
                onClick={() => setBookmarked(!bookmarked)}
                className={`p-2 rounded-lg transition-colors ${
                  bookmarked ? 'bg-yellow-500/20 text-yellow-400' : 'bg-slate-800 text-gray-400 hover:bg-slate-700'
                }`}
              >
                <Bookmark className={bookmarked ? 'fill-current' : ''} />
              </button>
              <button className="p-2 rounded-lg bg-slate-800 text-gray-400 hover:bg-slate-700 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Topics */}
          <div className="flex flex-wrap gap-2">
            <TopicTag>Array</TopicTag>
            <TopicTag>Hash Table</TopicTag>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-6">
          <div>
            <p className="text-gray-300 leading-relaxed mb-4">
              Given an array of integers <code className="px-2 py-1 bg-slate-800 rounded text-orange-300 font-mono text-sm">nums</code> and an integer <code className="px-2 py-1 bg-slate-800 rounded text-orange-300 font-mono text-sm">target</code>, return <em className="text-gray-400 italic">indices of the two numbers such that they add up to <code className="px-2 py-1 bg-slate-800 rounded text-orange-300 font-mono text-sm">target</code></em>.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              You may assume that each input would have <strong className="text-white font-semibold">exactly one solution</strong>, and you may not use the <em className="text-gray-400 italic">same</em> element twice.
            </p>
            <p className="text-gray-300 leading-relaxed">
              You can return the answer in any order.
            </p>
          </div>

          {/* Examples */}
          <div className="space-y-4">
            <Example
              number={1}
              input="nums = [2,7,11,15], target = 9"
              output="[0,1]"
              explanation="Because nums[0] + nums[1] == 9, we return [0, 1]."
            />

            <Example
              number={2}
              input="nums = [3,2,4], target = 6"
              output="[1,2]"
            />

            <Example
              number={3}
              input="nums = [3,3], target = 6"
              output="[0,1]"
            />
          </div>

          {/* Constraints */}
          <div>
            <h3 className="text-white font-semibold mb-3">Constraints:</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start">
                <span className="text-gray-500 mr-2">•</span>
                <code className="font-mono text-sm bg-slate-800 px-2 py-0.5 rounded">
                  2 &lt;= nums.length &lt;= 10<sup>4</sup>
                </code>
              </li>
              <li className="flex items-start">
                <span className="text-gray-500 mr-2">•</span>
                <code className="font-mono text-sm bg-slate-800 px-2 py-0.5 rounded">
                  -10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup>
                </code>
              </li>
              <li className="flex items-start">
                <span className="text-gray-500 mr-2">•</span>
                <code className="font-mono text-sm bg-slate-800 px-2 py-0.5 rounded">
                  -10<sup>9</sup> &lt;= target &lt;= 10<sup>9</sup>
                </code>
              </li>
              <li className="flex items-start">
                <span className="text-gray-500 mr-2">•</span>
                <span className="font-semibold text-white">Only one valid answer exists.</span>
              </li>
            </ul>
          </div>

          {/* Follow-up */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
            <p className="text-gray-300">
              <span className="text-blue-400 font-semibold">Follow-up:</span> Can you come up with an algorithm that is less than <code className="px-2 py-1 bg-slate-900 rounded text-orange-300 font-mono text-sm">O(n<sup>2</sup>)</code> time complexity?
            </p>
          </div>

          {/* Similar Questions */}
          <div>
            <h3 className="text-white font-semibold mb-3">Similar Questions</h3>
            <div className="space-y-2">
              <SimilarQuestion
                title="3Sum"
                difficulty="Medium"
              />
              <SimilarQuestion
                title="4Sum"
                difficulty="Medium"
              />
              <SimilarQuestion
                title="Two Sum II - Input Array Is Sorted"
                difficulty="Medium"
              />
              <SimilarQuestion
                title="Two Sum III - Data structure design"
                difficulty="Easy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TopicTag({ children }) {
  return (
    <span className="px-3 py-1 bg-slate-800 text-gray-300 rounded-full text-xs font-medium hover:bg-slate-700 cursor-pointer transition-colors">
      {children}
    </span>
  );
}

function Example({ number, input, output, explanation }) {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
      <p className="text-white font-semibold mb-3">Example {number}:</p>
      <div className="space-y-2 font-mono text-sm">
        <div>
          <span className="text-gray-400">Input:</span>{' '}
          <span className="text-gray-200">{input}</span>
        </div>
        <div>
          <span className="text-gray-400">Output:</span>{' '}
          <span className="text-gray-200">{output}</span>
        </div>
        {explanation && (
          <div>
            <span className="text-gray-400">Explanation:</span>{' '}
            <span className="text-gray-300">{explanation}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function SimilarQuestion({ title, difficulty }) {
  const colorMap = {
    'Easy': 'text-green-400',
    'Medium': 'text-yellow-400',
    'Hard': 'text-red-400'
  };

  return (
    <div className="flex items-center justify-between p-3 bg-slate-800/50 border border-slate-700 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer">
      <span className="text-gray-300 hover:text-blue-400 transition-colors">{title}</span>
      <span className={`text-sm font-medium ${colorMap[difficulty]}`}>{difficulty}</span>
    </div>
  );
}