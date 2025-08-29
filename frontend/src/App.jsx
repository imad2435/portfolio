import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Layout and Security Components
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Page Components
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProjectDetailPage from './pages/ProjectDetailPage';

// Dashboard Panel Components
import ManageSkills from './components/dashboard/ManageSkills';
import ManageProjects from './components/dashboard/ManageProjects';
import ManageExperiences from './components/dashboard/ManageExperiences';
import ManagePersonalInfo from './components/dashboard/ManagePersonalInfo';
import ManageMessages from './components/dashboard/ManageMessages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // Public layout with Navbar/Footer
    children: [
      { index: true, element: <HomePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'projects/:projectId', element: <ProjectDetailPage /> },
    ],
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute />, // Gatekeeper for the entire dashboard
    children: [
      {
        path: '',
        element: <DashboardPage />, // The dashboard shell with sidebar
        children: [
          // Nested routes that render inside the DashboardPage's <Outlet>
          { index: true, element: <h2 className="text-3xl font-bold">Welcome, Admin!</h2> },
          { path: 'personal-info', element: <ManagePersonalInfo /> },
          { path: 'skills', element: <ManageSkills /> },
          { path: 'projects', element: <ManageProjects /> },
          { path: 'experiences', element: <ManageExperiences /> },
          { path: 'messages', element: <ManageMessages /> },
        ]
      }
    ]
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;