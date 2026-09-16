import { Eye, EyeOff, KeyRound, Lock, ShieldCheck, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [adminId, setAdminId] = useState("admin@archive.edu");
  const [password, setPassword] = useState("archive2026");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      sessionStorage.setItem("the-archive-admin-auth", "true");
      navigate("/dashboard");
    }, 300);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg-page)",
        padding: "24px",
      }}
    >
      <div
        className="card-table"
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "36px 32px",
          boxShadow: "var(--shadow-dropdown)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <div
            className="brand-seal"
            style={{
              width: "52px",
              height: "52px",
              fontSize: "24px",
              margin: "0 auto 12px",
            }}
          >
            🏛️
          </div>
          <h1 style={{ fontSize: "22px", fontWeight: 800, color: "var(--navy-primary)" }}>
            The Archive
          </h1>
          <p style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "2px" }}>
            Admin Console • LMS v2.4.0
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Admin ID / Email</label>
            <div style={{ position: "relative" }}>
              <User
                size={15}
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-muted)",
                }}
              />
              <input
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                style={{ paddingLeft: "36px" }}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div style={{ position: "relative" }}>
              <KeyRound
                size={15}
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-muted)",
                }}
              />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingLeft: "36px", paddingRight: "36px" }}
                required
              />
              <button
                type="button"
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-muted)",
                }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{ width: "100%", padding: "12px", marginTop: "12px" }}
            disabled={loading}
          >
            {loading ? "Authenticating..." : "Sign In to Admin Console →"}
          </button>
        </form>

        <div
          style={{
            marginTop: "24px",
            display: "flex",
            justifyContent: "space-between",
            fontSize: "11px",
            color: "var(--text-muted)",
            fontFamily: "var(--font-mono)",
          }}
        >
          <span>256-BIT ENCRYPTED</span>
          <span>INSTITUTIONAL DESK</span>
        </div>
      </div>
    </main>
  );
}
