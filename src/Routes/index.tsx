import Homepage from '../HomePage'; 
import Layout from '../Enrollment/Layout/Layout';
import studentRoutes from './student';
import upload_student from './upload_student';

export const appRoutes = [
 {
    path: '/',
    element: <Homepage />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      ...studentRoutes,
      upload_student,
    ],
  },
];
