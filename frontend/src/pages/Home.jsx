import { Link } from "react-router-dom";

const steps = [
  {
    num: "01",
    title: "Register your account",
    desc: "Sign up as an Employee or an Admin with your company ID and department.",
  },
  {
    num: "02",
    title: "Log in securely",
    desc: "Your credentials are verified against the company directory database.",
  },
  {
    num: "03",
    title: "View the right directory",
    desc: "Employees see the Admin roster. Admins see the Employee roster.",
  },
];

export default function Home({ user }) {
  return (
    <>
      <section className="hero">
        <div>
          <p className="hero-index">Internal Systems / Company Portal</p>
          <h1>One directory. Two views, by role.</h1>
          <p className="lede">
            Northbridge Dynamics' internal portal keeps employee and admin
            records in one place — each side automatically sees the other
            group's directory the moment they log in.
          </p>
          <div className="hero-actions">
            {!user && (
              <Link to="/register" className="btn btn-primary">
                Register an account
              </Link>
            )}
            {user ? (
              <Link to="/dashboard" className="btn btn-outline">
                Go to dashboard
              </Link>
            ) : (
              <Link to="/login" className="btn btn-outline">
                Log in
              </Link>
            )}
          </div>
        </div>

        <div className="hero-panel">
          <div className="stat-line">
            <span>Access model</span>
            <span>Role-based</span>
          </div>
          <div className="stat-line">
            <span>Employee sees</span>
            <span>Admin directory</span>
          </div>
          <div className="stat-line">
            <span>Admin sees</span>
            <span>Employee directory</span>
          </div>
          <div className="stat-line">
            <span>Auth</span>
            <span>JWT + bcrypt</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>How access works</h2>
          <span className="section-note">3 STEPS</span>
        </div>
        <div className="step-list">
          {steps.map((s) => (
            <div className="step-item" key={s.num}>
              <div className="step-num">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
