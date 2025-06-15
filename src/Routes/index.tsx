import Homepage from '../HomePage'; // 👈 import the new homepage component
import heatmap from './heatmap';
import daily_view from './daily_view';
import upload_evaluation from './upload_evaluation';
import Layout from '../Enrollment/Layout/Layout';
import studentRoutes from './student';
import upload_student from './upload_student';

export const appRoutes = [
  {
    path: '/',
    element: <Homepage />, // 👈 use the new component here
  },
  heatmap,
  daily_view,
  upload_evaluation,,
  {
    path: '/',
    element: <Layout />,
    children: [
      ...studentRoutes,
      upload_student,
    ],
  },
];
