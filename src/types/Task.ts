export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  created_at: Date;
  updated_at: Date;
}

export type TaskInput = Omit<Task, 'id' | 'created_at' | 'updated_at'>;