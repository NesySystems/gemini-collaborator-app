// src/components/memory/MemoryTimeline.tsx
import React from 'react';
import { motion } from 'framer-motion';
import type { MemoryLog } from '../../types';

interface MemoryTimelineProps {
  memories: MemoryLog[];
}

export function MemoryTimeline({ memories }: MemoryTimelineProps) {
  return (
    <div className="relative">
      {memories.map((memory, index) => (
        <motion.div
          key={memory.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="mb-8 flex gap-4"
        >
          <div className="flex-none">
            <div className="w-3 h-3 bg-indigo-600 rounded-full mt-2"></div>
            <div className="w-0.5 h-full bg-indigo-200 ml-1.5"></div>
          </div>
          <div className="flex-grow">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-start mb-2">
                <span className={`px-2 py-1 rounded text-sm ${
                  memory.category === 'observation' ? 'bg-blue-100 text-blue-800' :
                  memory.category === 'decision' ? 'bg-green-100 text-green-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {memory.category}
                </span>
                <time className="text-sm text-gray-500">
                  {new Date(memory.timestamp).toLocaleString()}
                </time>
              </div>
              <p className="text-gray-700">{memory.content}</p>
              {memory.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {memory.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}