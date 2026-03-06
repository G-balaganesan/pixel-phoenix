import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import SectorDashboard from './pages/SectorDashboard';
import RiskAnalysis from './pages/RiskAnalysis';
import ThreatDetection from './pages/ThreatDetection';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="Admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sector"
            element={
              <ProtectedRoute requiredRole="Sector">
                <SectorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/risk-analysis"
            element={
              <ProtectedRoute requiredRole="Sector">
                <RiskAnalysis />
              </ProtectedRoute>
            }
          />
          <Route
            path="/threat-detection"
            element={
              <ProtectedRoute requiredRole="Sector">
                <ThreatDetection />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;