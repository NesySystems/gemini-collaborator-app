import React, { useState, useMemo } from 'react';
import { useMemoryContext } from '../../contexts/MemoryContext';
import { motion, AnimatePresence } from 'framer-motion';

export const MemoryList: React.FC = () => {
  const { memories, deleteMemory, searchMemories, filterByTags } = useMemoryContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    memories.forEach(memory => memory.tags.forEach(tag => tagsSet.add(tag)));
    return Array.from(tagsSet);
  }, [memories]);

  const filteredMemories = useMemo(() => {
    let result = memories;
    if (selectedTags.length > 0) {
      result = filterByTags(selectedTags);
    }
    if (searchQuery) {
      result = searchMemories(searchQuery);
    }
    return result;
  }, [memories, selectedTags, searchQuery, filterByTags, searchMemories]);

  return (
    <div className="space-y-4">
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search memories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTags(prev =>
              prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
            )}
            className={`px-3 py-1 rounded-full text-sm ${selectedTags.includes(tag)
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            #{tag}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {filteredMemories.map(memory => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-lg shadow-md p-4"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-gray-800 whitespace-pre-wrap">{memory.content}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {memory.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => deleteMemory(memory.id)}
                  className="text-red-600 hover:text-red-800 ml-4"
                >
                  Delete
                </button>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                {memory.timestamp.toLocaleString()}
                {memory.source && ` • From ${memory.source}`}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};