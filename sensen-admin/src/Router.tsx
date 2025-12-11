import { Routes, Route, Navigate } from 'react-router-dom';
import App from './App.tsx';
import GamesPage from './pages/GamesPage';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage';
import { useAuth } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

// This component handles the root redirect logic
const RootRedirect = () => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Navigate to="/admin" replace /> : <Navigate to="/login" replace />;
};

// This component defines all the application routes
export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      
      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<App />}>
          <Route index element={<Navigate to="games" replace />} />
          <Route path="games" element={<GamesPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Route>
      
      <Route path="/" element={<RootRedirect />} />
    </Routes>
  );
};
