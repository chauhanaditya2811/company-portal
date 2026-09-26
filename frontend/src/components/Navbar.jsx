import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  function handleLogout() {
    onLogout();
    navigate("/");
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <NavLink to="/" className="brand">
          <span className="brand-mark">ND</span>
          <span className="brand-name">Northbridge Dynamics</span>
        </NavLink>

        <nav className="main-nav">
          <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
            Home
          </NavLink>
          {user && (
            <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
              Dashboard
            </NavLink>
          )}
          {!user && (
            <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>
              Login
            </NavLink>
          )}
          {!user && (
            <NavLink to="/register" className={({ isActive }) => (isActive ? "active" : "")}>
              Registration
            </NavLink>
          )}
        </nav>

        <div className="nav-user">
          {user ? (
            <>
              <span className={`role-chip ${user.role}`}>{user.role}</span>
              <span>{user.fullName}</span>
              <button onClick={handleLogout}>Log out</button>
            </>
          ) : (
            <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}>
              Not signed in
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
