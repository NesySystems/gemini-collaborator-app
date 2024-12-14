import React, { createContext, useContext, useState, useCallback } from 'react';
import { Task, TaskInput } from '../types/Task';
import { v4 as uuidv4 } from 'uuid';

interface TaskContextType {
  tasks: Task[];
  addTask: (task: TaskInput) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  loading: boolean;
}

const TaskContext = createContext<TaskContextType | null>(null);

export const TaskProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  const addTask = useCallback((taskInput: TaskInput) => {
    const now = new Date();
    const newTask: Task = {
      ...taskInput,
      id: uuidv4(),
      created_at: now,
      updated_at: now
    };
    setTasks(prev => [...prev, newTask]);
  }, []);

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { ...task, ...updates, updated_at: new Date() }
        : task
    ));
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, []);

  const value = {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    loading
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};