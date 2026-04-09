import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import OfficerDashboard from './pages/OfficerDashboard';
import AdminEmployees from './pages/AdminEmployees';
import AdminCitizens from './pages/AdminCitizens';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" />;

  return children;
};

const Layout = () => {
  const location = useLocation();
  const hideFooterPaths = ['/dashboard', '/admin', '/officer'];
  const showFooter = !hideFooterPaths.some(path => location.pathname.startsWith(path));

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/officer"
          element={
            <ProtectedRoute allowedRoles={['officer']}>
              <OfficerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/employees"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminEmployees />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/citizens"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminCitizens />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      {showFooter && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
