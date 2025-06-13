import Homepage from '../HomePage'; // 👈 import the new homepage component
import heatmap from './heatmap';
import daily_view from './daily_view';
import upload_evaluation from './upload_evaluation';

export const appRoutes = [
  {
    path: '/',
    element: <Homepage />, // 👈 use the new component here
  },
  heatmap,
  daily_view,
  upload_evaluation,
];
