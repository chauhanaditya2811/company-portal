import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";

export default function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("portal_user");
    const storedToken = localStorage.getItem("portal_token");
    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      } catch {
        localStorage.removeItem("portal_user");
        localStorage.removeItem("portal_token");
      }
    }
  }, []);

  function handleLogin(userData, jwt) {
    localStorage.setItem("portal_token", jwt);
    localStorage.setItem("portal_user", JSON.stringify(userData));
    setUser(userData);
    setToken(jwt);
  }

  function handleLogout() {
    localStorage.removeItem("portal_token");
    localStorage.removeItem("portal_user");
    setUser(null);
    setToken(null);
  }

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} />
      <main>
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute user={user}>
                <Dashboard user={user} token={token} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <footer className="site-footer">
        <div className="footer-inner">
          <span>© 2026 Northbridge Dynamics</span>
          <span>Internal use only · portal@northbridge.example</span>
        </div>
      </footer>
    </>
  );
}
