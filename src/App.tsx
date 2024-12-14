// src/App.tsx
import React, { useState, useEffect } from 'react';
import { GeminiProvider } from './contexts/GeminiContext';
import { TaskList } from './components/tasks/TaskList';
import { MemoryLogger } from './components/memory/MemoryLogger';
import { MemoryTimeline } from './components/memory/MemoryTimeline';
import type { Task, MemoryLog } from './types';
import { wsClient } from './utils/websocket';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [memories, setMemories] = useState<MemoryLog[]>([]);

  useEffect(() => {
    wsClient.connect();

    wsClient.onMessage((data) => {
      if (data.type === 'tasks') {
        setTasks(data.payload);
      } else if (data.type === 'memories') {
        setMemories(data.payload);
      }
    });

    return () => wsClient.disconnect();
  }, []);

  const handleTaskSelect = (task: Task) => {
    wsClient.sendMessage({
      type: 'task_selected',
      payload: task.id
    });
  };

  const handleLogMemory = (log: Omit<MemoryLog, 'id' | 'timestamp'>) => {
    const newMemory = {
      ...log,
      id: crypto.randomUUID(),
      timestamp: new Date()
    };
    
    wsClient.sendMessage({
      type: 'memory_created',
      payload: newMemory
    });
    
    setMemories(prev => [...prev, newMemory]);
  };

  return (
    <GeminiProvider>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Gemini Collaborator
            </h1>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Tasks</h2>
              <TaskList tasks={tasks} onTaskSelect={handleTaskSelect} />
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Memory Log</h2>
              <MemoryLogger onLogMemory={handleLogMemory} />
              <div className="mt-8">
                <MemoryTimeline memories={memories} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </GeminiProvider>
  );
}