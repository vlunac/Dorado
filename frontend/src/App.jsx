import { useState, useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";

// Pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import InvestorDashboard from "./pages/InvestorDashboard";
import FounderDashboard from "./pages/FounderDashboard";
import InvestorProfilePage from "./pages/InvestorProfilePage";
import StartupDetailPage from "./pages/StartupDetailPage";

// Lazy-imported to keep bundle lean
import { lazy, Suspense } from "react";
const SearchPage     = lazy(() => import("./pages/SearchPage"));
const NetworkPage    = lazy(() => import("./pages/NetworkPage"));
const FounderProfilePage = lazy(() => import("./pages/FounderProfilePage"));

export default function App() {
  const { user, loading } = useAuth();
  const [page, setPage] = useState("landing");
  const [dark, setDark] = useState(false);
  const [selectedStartup, setSelectedStartup] = useState(null);

  // Apply dark/light theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  }, [dark]);

  // Redirect after login
  useEffect(() => {
    if (user && page === "landing") {
      setPage("dashboard");
    }
  }, [user]);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ color: "var(--text-sub)", fontSize: 14 }}>Loading…</span>
      </div>
    );
  }

  // ── Unauthenticated pages ────────────────────────────────────────────────
  if (!user) {
    if (page === "login")    return <LoginPage    onSuccess={(role) => setPage("dashboard")} onSwitchToRegister={() => setPage("register")} />;
    if (page === "register") return <RegisterPage onSuccess={(role) => setPage("dashboard")} onSwitchToLogin={() => setPage("login")} />;
    return <LandingPage onLogin={() => setPage("login")} onRegister={() => setPage("register")} />;
  }

  // ── Authenticated layout ─────────────────────────────────────────────────
  function renderMain() {
    if (page === "startup" && selectedStartup) {
      return (
        <StartupDetailPage
          startup={selectedStartup}
          onBack={() => setPage("search")}
        />
      );
    }

    return (
      <Suspense fallback={<p style={{ color: "var(--text-sub)", padding: 32 }}>Loading…</p>}>
        {page === "dashboard" && user.role === "investor" && (
          <InvestorDashboard setPage={setPage} setSelectedStartup={setSelectedStartup} />
        )}
        {page === "dashboard" && user.role === "founder" && (
          <FounderDashboard setPage={setPage} />
        )}
        {page === "search"    && <SearchPage setPage={setPage} setSelectedStartup={setSelectedStartup} />}
        {page === "network"   && <NetworkPage setPage={setPage} setSelectedStartup={setSelectedStartup} />}
        {page === "portfolio" && user.role === "investor" && <InvestorProfilePage />}
        {page === "profile"   && user.role === "founder"  && <FounderProfilePage />}
      </Suspense>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Navbar currentPage={page} setPage={setPage} dark={dark} setDark={setDark} />
      <main style={{ flex: 1, padding: "28px 32px", overflowY: "auto", maxWidth: 860 }}>
        {renderMain()}
      </main>
    </div>
  );
}
