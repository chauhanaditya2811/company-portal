import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api.js";

const initialForm = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "employee",
  employeeId: "",
  department: "",
  designation: "",
  phone: "",
};

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleRoleSelect(role) {
    setForm({ ...form, role });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await registerUser(form);
      setSuccess("Registration successful. You can now log in.");
      setForm(initialForm);
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-wrap">
      <p className="auth-index">New account</p>
      <h1>Register</h1>
      <p className="auth-sub">
        Create your Employee or Admin account for the Northbridge Dynamics
        portal.
      </p>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>I am registering as</label>
          <div className="role-select">
            <label className={`role-option ${form.role === "employee" ? "selected" : ""}`}>
              <input
                type="radio"
                name="role"
                value="employee"
                checked={form.role === "employee"}
                onChange={() => handleRoleSelect("employee")}
              />
              Employee
            </label>
            <label className={`role-option ${form.role === "admin" ? "selected" : ""}`}>
              <input
                type="radio"
                name="role"
                value="admin"
                checked={form.role === "admin"}
                onChange={() => handleRoleSelect("admin")}
              />
              Admin
            </label>
          </div>
        </div>

        <div className="field">
          <label htmlFor="fullName">Full name</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            value={form.fullName}
            onChange={handleChange}
            autoComplete="name"
          />
        </div>

        <div className="field">
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
          />
        </div>

        <div className="field-row">
          <div className="field">
            <label htmlFor="employeeId">
              {form.role === "admin" ? "Admin ID" : "Employee ID"}
            </label>
            <input
              id="employeeId"
              name="employeeId"
              type="text"
              required
              value={form.employeeId}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              value={form.phone}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="field-row">
          <div className="field">
            <label htmlFor="department">Department</label>
            <input
              id="department"
              name="department"
              type="text"
              required
              value={form.department}
              onChange={handleChange}
              placeholder="e.g. Engineering"
            />
          </div>
          <div className="field">
            <label htmlFor="designation">Designation</label>
            <input
              id="designation"
              name="designation"
              type="text"
              required
              value={form.designation}
              onChange={handleChange}
              placeholder="e.g. Software Engineer"
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={6}
            value={form.password}
            onChange={handleChange}
            autoComplete="new-password"
          />
        </div>

        <div className="field">
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            minLength={6}
            value={form.confirmPassword}
            onChange={handleChange}
            autoComplete="new-password"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Creating account…" : "Register"}
          </button>
        </div>
      </form>

      <p className="form-note">
        Already have an account? <Link to="/login">Log in instead</Link>.
      </p>
    </div>
  );
}
