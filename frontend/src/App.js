import React, { useContext } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeRegister from './pages/EmployeeRegister';
import EmployeeLogin from './pages/EmployeeLogin';
import EmployeeDashboard from './pages/EmployeeDashboard';
import LandingPage from './pages/LandingPage';
import './styles/App.css';

const PrivateRoute = ({ children, requiredRole }) => {
  const { token, role } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Define routes using createBrowserRouter
const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <LandingPage />,
    },
    {
      path: '/admin/login',
      element: <AdminLogin />,
    },
    {
      path: '/admin/dashboard',
      element: (
        <PrivateRoute requiredRole="admin">
          <AdminDashboard />
        </PrivateRoute>
      ),
    },
    {
      path: '/employee/register',
      element: <EmployeeRegister />,
    },
    {
      path: '/employee/login',
      element: <EmployeeLogin />,
    },
    {
      path: '/employee/dashboard',
      element: (
        <PrivateRoute requiredRole="employee">
          <EmployeeDashboard />
        </PrivateRoute>
      ),
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
export default App;