import Dashboard from '../Enrollment/Layout/Dashboard';
import SectionList from '../Enrollment/Student/Pages/SectionList/SectionList';
import StudentList from '../Enrollment/Student/Pages/StudentList/StudentList';
import StudentProfile from '../Enrollment/Student/Pages/StudentProfile/StudentProfile';
import StudentEmail from '../Enrollment/Student/Pages/StudentEmail/StudentEmail';
import StudentEdit from '../Enrollment/Student/Pages/StudentEdit/StudentEdit';
import EnrollmentList from '../Enrollment/Platform/Pages/EnrollList';



const studentRoutes = [
  { path: 'dashboard', element: <Dashboard /> },
  { path: 'sections', element: <SectionList /> },
  { path: 'students', element: <StudentList /> },
  { path: 'profile/:id', element: <StudentProfile /> },
  { path: 'email/:id', element: <StudentEmail /> },
  { path: 'edit/:id', element: <StudentEdit /> },
  { path: 'enrollment', element: <EnrollmentList /> },
];

export default studentRoutes;
