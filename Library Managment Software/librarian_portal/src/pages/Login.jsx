import { Eye, EyeOff, KeyRound, Lock, ShieldCheck, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [librarianId, setLibrarianId] = useState("LIB-98234");
  const [password, setPassword] = useState("archive");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      if (librarianId.trim().toUpperCase() === "LIB-98234" && password === "archive") {
        sessionStorage.setItem("archive-librarian-auth", "true");
        navigate("/dashboard");
      } else {
        setError("Invalid Librarian ID or Password. Try LIB-98234 / archive");
        setLoading(false);
      }
    }, 400);
  }

  function handleAutoFill() {
    setLibrarianId("LIB-98234");
    setPassword("archive");
    setError("");
  }

  return (
    <main className="login-page">
      <div className="login-card">
        <div className="login-brand-mark">AR</div>
        <h1>The Archive</h1>
        <p>University Librarian Administration Portal</p>

        {error && (
          <div
            style={{
              padding: "10px 14px",
              background: "var(--red-bg)",
              color: "var(--red)",
              borderRadius: "var(--radius-sm)",
              fontSize: "13px",
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Lock size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="field-group">
            <label>Librarian ID / Email</label>
            <div style={{ position: "relative" }}>
              <User
                size={16}
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--muted)",
                }}
              />
              <input
                value={librarianId}
                onChange={(e) => setLibrarianId(e.target.value)}
                style={{ paddingLeft: "36px" }}
                required
                placeholder="LIB-XXXXX"
              />
            </div>
          </div>

          <div className="field-group">
            <label>Workstation Password</label>
            <div style={{ position: "relative" }}>
              <KeyRound
                size={16}
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--muted)",
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
                  color: "var(--muted)",
                }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "13px",
              margin: "14px 0 22px",
              color: "var(--muted)",
            }}
          >
            <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              Remember Workstation
            </label>
            <button
              type="button"
              className="link"
              onClick={handleAutoFill}
              style={{ fontSize: "12px" }}
            >
              Fill Demo Credentials
            </button>
          </div>

          <button
            type="submit"
            className="primary gold-btn"
            style={{ width: "100%", padding: "12px" }}
            disabled={loading}
          >
            {loading ? "Authenticating Session..." : "Sign In to Circulation Desk →"}
          </button>
        </form>

        <div className="login-footer">
          <span>
            <ShieldCheck size={12} style={{ verticalAlign: "middle", marginRight: "4px" }} />
            256-BIT ENCRYPTED
          </span>
          <span>CAMPUS CENTRAL DESK</span>
        </div>
      </div>
    </main>
  );
}
