import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Memory, MemoryInput } from '../types/Memory';
import { v4 as uuidv4 } from 'uuid';

interface MemoryContextType {
  memories: Memory[];
  addMemory: (memory: MemoryInput) => void;
  deleteMemory: (id: string) => void;
  searchMemories: (query: string) => Memory[];
  filterByTags: (tags: string[]) => Memory[];
  loading: boolean;
}

const MemoryContext = createContext<MemoryContextType | null>(null);

export const MemoryProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(false);

  // Load memories from localStorage on mount
  useEffect(() => {
    const savedMemories = localStorage.getItem('memories');
    if (savedMemories) {
      setMemories(JSON.parse(savedMemories).map((memory: any) => ({
        ...memory,
        timestamp: new Date(memory.timestamp)
      })));
    }
  }, []);

  // Save memories to localStorage when they change
  useEffect(() => {
    localStorage.setItem('memories', JSON.stringify(memories));
  }, [memories]);

  const addMemory = useCallback((memoryInput: MemoryInput) => {
    const newMemory: Memory = {
      ...memoryInput,
      id: uuidv4(),
      timestamp: new Date()
    };
    setMemories(prev => [newMemory, ...prev]);
  }, []);

  const deleteMemory = useCallback((id: string) => {
    setMemories(prev => prev.filter(memory => memory.id !== id));
  }, []);

  const searchMemories = useCallback((query: string) => {
    const lowercaseQuery = query.toLowerCase();
    return memories.filter(memory =>
      memory.content.toLowerCase().includes(lowercaseQuery) ||
      memory.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }, [memories]);

  const filterByTags = useCallback((tags: string[]) => {
    if (tags.length === 0) return memories;
    return memories.filter(memory =>
      tags.every(tag => memory.tags.includes(tag))
    );
  }, [memories]);

  const value = {
    memories,
    addMemory,
    deleteMemory,
    searchMemories,
    filterByTags,
    loading
  };

  return (
    <MemoryContext.Provider value={value}>
      {children}
    </MemoryContext.Provider>
  );
};

export const useMemoryContext = () => {
  const context = useContext(MemoryContext);
  if (!context) {
    throw new Error('useMemoryContext must be used within a MemoryProvider');
  }
  return context;
};