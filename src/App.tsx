import React, { useState } from 'react';
import { LiveAPIProvider } from './contexts/LiveAPIContext';
import { TaskProvider } from './contexts/TaskContext';
import { MemoryProvider } from './contexts/MemoryContext';
import { TaskList } from './components/tasks/TaskList';
import { TaskForm } from './components/tasks/TaskForm';
import { MemoryList } from './components/memory/MemoryList';
import { MemoryForm } from './components/memory/MemoryForm';

function App() {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'tasks' | 'memory'>('tasks');

  return (
    <LiveAPIProvider>
      <TaskProvider>
        <MemoryProvider>
          <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Gemini Collaborator</h1>
                {activeTab === 'tasks' && (
                  <button
                    onClick={() => setShowTaskForm(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Add Task
                  </button>
                )}
              </div>

              <div className="mb-6">
                <nav className="flex space-x-4">
                  <button
                    onClick={() => setActiveTab('tasks')}
                    className={`px-4 py-2 rounded-md ${activeTab === 'tasks'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    Tasks
                  </button>
                  <button
                    onClick={() => setActiveTab('memory')}
                    className={`px-4 py-2 rounded-md ${activeTab === 'memory'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    Memory Log
                  </button>
                </nav>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                {activeTab === 'tasks' ? (
                  <TaskList />
                ) : (
                  <div className="space-y-6">
                    <MemoryForm />
                    <MemoryList />
                  </div>
                )}
              </div>

              {showTaskForm && (
                <TaskForm onClose={() => setShowTaskForm(false)} />
              )}
            </div>
          </div>
        </MemoryProvider>
      </TaskProvider>
    </LiveAPIProvider>
  );
}

export default App;