import React from 'react';
import { Altair } from './visualizations/Altair';

export const VisualizationPanel: React.FC = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Visualization Panel</h2>
      <Altair />
    </div>
  );
};