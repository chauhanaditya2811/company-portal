import { useEffect, useState } from "react";
import { fetchDirectory } from "../api.js";

export default function Dashboard({ user, token }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError("");
      try {
        const result = await fetchDirectory(token);
        if (!cancelled) setData(result);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [token]);

  const viewingLabel =
    user.role === "employee" ? "Admin directory" : "Employee directory";

  return (
    <div className="dash-wrap">
      <div className="dash-head">
        <div>
          <h1>{viewingLabel}</h1>
          <p className="dash-sub">
            Signed in as <strong>{user.fullName}</strong> ({user.role}) — the
            portal automatically shows you the {user.role === "employee" ? "admin" : "employee"}{" "}
            roster.
          </p>
        </div>
        {data && <div className="dash-count">{data.count} record{data.count === 1 ? "" : "s"}</div>}
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {loading && <p>Loading directory…</p>}

      {!loading && !error && data && data.users.length === 0 && (
        <div className="empty-state">
          No {viewingLabel.toLowerCase()} records yet. Once someone registers
          as {user.role === "employee" ? "an admin" : "an employee"}, they'll
          appear here.
        </div>
      )}

      {!loading && !error && data && data.users.length > 0 && (
        <table className="directory-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>ID</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {data.users.map((u) => (
              <tr key={u._id}>
                <td>{u.fullName}</td>
                <td className="mono">{u.employeeId}</td>
                <td>{u.department}</td>
                <td>{u.designation}</td>
                <td>{u.email}</td>
                <td className="mono">{u.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
