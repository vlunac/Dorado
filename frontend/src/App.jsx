// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import "./styles/global.css";

import Navbar              from "./components/Navbar";
import LandingPage         from "./pages/LandingPage";
import LoginPage           from "./pages/LoginPage";
import RegisterPage        from "./pages/RegisterPage";
import InvestorDashboard   from "./pages/InvestorDashboard";
import FounderDashboard    from "./pages/FounderDashboard";
import SearchPage          from "./pages/SearchPage";
import NetworkPage         from "./pages/NetworkPage";
import InvestorProfilePage from "./pages/InvestorProfilePage";
import FounderProfilePage  from "./pages/FounderProfilePage";
import PortfolioPage       from "./pages/PortfolioPage";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}

function AppLayout({ children }) {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="app-main">{children}</main>
    </div>
  );
}

function DashboardRouter() {
  const { role } = useAuth();
  return role === "investor" ? <InvestorDashboard /> : <FounderDashboard />;
}

function ProfileRouter() {
  const { role } = useAuth();
  return role === "investor" ? <Navigate to="/portfolio" replace /> : <FounderProfilePage />;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/"         element={<LandingPage />} />
      <Route path="/login"    element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected */}
      <Route path="/dashboard" element={<ProtectedRoute><AppLayout><DashboardRouter /></AppLayout></ProtectedRoute>} />
      <Route path="/search"    element={<ProtectedRoute><AppLayout><SearchPage /></AppLayout></ProtectedRoute>} />
      <Route path="/network"   element={<ProtectedRoute><AppLayout><NetworkPage /></AppLayout></ProtectedRoute>} />
      <Route path="/portfolio" element={<ProtectedRoute><AppLayout><PortfolioPage /></AppLayout></ProtectedRoute>} />
      <Route path="/profile"   element={<ProtectedRoute><AppLayout><ProfileRouter /></AppLayout></ProtectedRoute>} />
      <Route path="/investors/:id" element={<ProtectedRoute><AppLayout><InvestorProfilePage /></AppLayout></ProtectedRoute>} />
      <Route path="/founders/:id"  element={<ProtectedRoute><AppLayout><FounderProfilePage /></AppLayout></ProtectedRoute>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
