export interface Memory {
  id: string;
  content: string;
  tags: string[];
  timestamp: Date;
  source?: string;
}

export type MemoryInput = Omit<Memory, 'id' | 'timestamp'>;