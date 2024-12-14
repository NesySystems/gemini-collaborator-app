// src/components/visualizations/TaskAnalytics.tsx
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { Task } from '../../types';

interface TaskAnalyticsProps {
  tasks: Task[];
}

export function TaskAnalytics({ tasks }: TaskAnalyticsProps) {
  const statusData = tasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(statusData).map(([name, value]) => ({
    name,
    value
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}