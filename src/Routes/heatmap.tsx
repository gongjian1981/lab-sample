import React from 'react';
import type { RouteObject } from 'react-router-dom';
import type { EvaluationRow } from '../Evaluation/Heatmap/Services/evaluation';
import { EVALUATION_DATA_STORAGE_KEY } from '../constants';
import { localStorageService } from '../localStroageService';

const HeatmapPage = React.lazy(() =>
  import('../Evaluation/Heatmap/Pages/HeatmapPage')
);

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
