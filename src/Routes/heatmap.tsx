import React from 'react';
import type { RouteObject } from 'react-router-dom';
import type { EvaluationItem } from '../Evaluation/Heatmap/Types/evaluation';

const HeatmapPage = React.lazy(() =>
  import('../Evaluation/Heatmap/Pages/HeatmapPage')
);

// Helper to load cached data from localStorage
const loadCachedData = (): EvaluationItem[] => {
  try {
    const raw = localStorage.getItem('uploaded-eval-data');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

// Route definition for /heatmap
const heatmapRoute: RouteObject = {
  path: '/heatmap',
  element: (
    <React.Suspense fallback={<div>Loading Heatmap...</div>}>
      <HeatmapPage />
    </React.Suspense>
  ),
};

export default heatmapRoute;
