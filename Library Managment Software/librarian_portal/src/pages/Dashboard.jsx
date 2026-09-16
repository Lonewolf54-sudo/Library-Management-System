import {
  AlertTriangle,
  ArrowRight,
  BookCheck,
  BookOpen,
  Boxes,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Plus,
  QrCode,
  RotateCcw,
  TrendingUp,
  Users,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import StatCard from "../components/StatCard.jsx";
import { useLibrary } from "../context/LibraryContext.jsx";

export default function Dashboard() {
  const { data, setModal } = useLibrary();
  const navigate = useNavigate();

  const chartData = [
    { day: "Mon", val: 42, height: 60 },
    { day: "Tue", val: 68, height: 95 },
    { day: "Wed", val: 54, height: 75 },
    { day: "Thu", val: 92, height: 120 },
    { day: "Fri", val: 118, height: 140, current: true },
    { day: "Sat", val: 65, height: 85 },
    { day: "Sun", val: 38, height: 50 },
  ];

  return (
    <div>
      <div className="page-title">
        <div>
          <span>Central Operations</span>
          <h1>Desk Dashboard</h1>
          <p>Real-time circulation metrics, inventory status, urgent alerts, and daily student desk activity.</p>
        </div>
        <div className="header-actions">
          <button className="secondary" onClick={() => setModal({ type: "quickScan" })}>
            <QrCode size={15} /> Quick Scan
          </button>
          <button className="primary gold-btn" onClick={() => navigate("/issue")}>
            <BookOpen size={15} /> Issue Book
          </button>
        </div>
      </div>

      {/* KPI METRIC CARDS */}
      <div className="stats">
        <StatCard
          label="Catalog Titles"
          value={data.stats.totalCatalog.toLocaleString()}
          description="Registered volumes"
          accent="#062842"
          trend="+3 new"
          trendPositive={true}
        />
        <StatCard
          label="Available Copies"
          value={data.stats.availableCopies.toLocaleString()}
          description="Ready on shelves"
          accent="#15803d"
          trend="71% avail"
          trendPositive={true}
        />
        <StatCard
          label="Issued Books"
          value={data.stats.issuedBooks.toLocaleString()}
          description="In student circulation"
          accent="#1d4ed8"
          trend="29% active"
          trendPositive={true}
        />
        <StatCard
          label="Due Today"
          value={data.stats.dueToday}
          description="Expiring returns"
          accent="#b45309"
          trend="Grace period"
        />
        <StatCard
          label="Overdue Items"
          value={data.stats.overdueItems}
          description="Action required"
          accent="#b91c1c"
          trend="Urgent"
          trendPositive={false}
        />
        <StatCard
          label="Active Holds"
          value={data.stats.activeReservations}
          description="Student queue"
          accent="#6b21a8"
          trend="4 ready"
          trendPositive={true}
        />
        <StatCard
          label="Pending Fines"
          value={`$${data.stats.pendingFines}`}
          description="Uncollected dues"
          accent="#526071"
          trend="Ledger open"
        />
      </div>

      {/* MAIN TWO-COLUMN WORKSPACE */}
      <div className="grid">
        {/* LEFT COLUMN: RECENT ACTIVITY */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* RECENT ISSUES */}
          <div className="panel">
            <div className="panel-head">
              <h2>Recent Issued Copies</h2>
              <Link to="/issue" className="link">
                Issue Desk <ArrowRight size={13} style={{ verticalAlign: "middle" }} />
              </Link>
            </div>
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Book Title / Barcode</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {data.recentIssues.slice(0, 4).map((issue, idx) => (
                    <tr key={idx}>
                      <td>
                        <strong>{issue.studentName}</strong>
                        <small style={{ display: "block", color: "var(--muted)", fontFamily: "var(--mono)" }}>
                          {issue.studentId}
                        </small>
                      </td>
                      <td>
                        <span style={{ fontWeight: 600, color: "var(--ink)" }}>{issue.title}</span>
                        <small style={{ display: "block", color: "var(--muted)", fontFamily: "var(--mono)" }}>
                          {issue.barcode || "CP-AUTO"}
                        </small>
                      </td>
                      <td>
                        <span className="badge neutral">
                          <Clock size={11} /> {issue.time}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* RECENT RETURNS */}
          <div className="panel">
            <div className="panel-head">
              <h2>Recent Returned Copies</h2>
              <Link to="/return" className="link">
                Return Desk <ArrowRight size={13} style={{ verticalAlign: "middle" }} />
              </Link>
            </div>
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Book Title</th>
                    <th>Condition</th>
                    <th>Fee</th>
                  </tr>
                </thead>
                <tbody>
                  {data.recentReturns.slice(0, 4).map((ret, idx) => (
                    <tr key={idx}>
                      <td>
                        <strong>{ret.studentName}</strong>
                        <small style={{ display: "block", color: "var(--muted)", fontFamily: "var(--mono)" }}>
                          {ret.studentId}
                        </small>
                      </td>
                      <td>{ret.title}</td>
                      <td>
                        <span
                          className={`badge ${
                            ret.condition === "Excellent" || ret.condition === "Good"
                              ? "green"
                              : ret.condition === "Worn"
                              ? "amber"
                              : "red"
                          }`}
                        >
                          {ret.condition}
                        </span>
                      </td>
                      <td>
                        {ret.fine > 0 ? (
                          <span style={{ color: "var(--red)", fontWeight: 700, fontFamily: "var(--mono)" }}>
                            ${ret.fine}.00
                          </span>
                        ) : (
                          <span style={{ color: "var(--green)", fontSize: "12px" }}>$0 (Cleared)</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: PULSE & ALERTS */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* CIRCULATION PULSE */}
          <div className="panel">
            <div className="panel-head">
              <h2>Circulation Pulse</h2>
              <span style={{ fontSize: "11px", fontFamily: "var(--mono)", color: "var(--muted)" }}>
                THIS WEEK
              </span>
            </div>
            <div className="panel-body">
              <div className="pulse">
                <div>
                  <small style={{ color: "var(--muted)", fontWeight: 700, fontSize: "11px", letterSpacing: "0.04em" }}>
                    DAILY CHECKOUT VELOCITY
                  </small>
                  <div className="bars" style={{ marginTop: "10px" }}>
                    {chartData.map((d) => (
                      <div className="bar-col" key={d.day}>
                        <div
                          className={`bar ${d.current ? "dark" : ""}`}
                          style={{ height: `${d.height}px` }}
                          data-val={`${d.val} issues`}
                        />
                        <span className="bar-label">{d.day}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <small style={{ color: "var(--muted)", fontWeight: 700, fontSize: "11px", letterSpacing: "0.04em" }}>
                    CATEGORY DISTRIBUTION
                  </small>
                  <div className="legend">
                    <div>
                      <span className="legend-dot stem" /> STEM <b>46%</b>
                    </div>
                    <div>
                      <span className="legend-dot arts" /> Business <b>28%</b>
                    </div>
                    <div>
                      <span className="legend-dot law" /> Law & Arts <b>26%</b>
                    </div>
                  </div>
                </div>

                <div>
                  <small style={{ color: "var(--muted)", fontWeight: 700, fontSize: "11px", letterSpacing: "0.04em" }}>
                    MOST CIRCULATED TITLES
                  </small>
                  <div style={{ marginTop: "8px" }}>
                    {[
                      { title: "Introduction to Algorithms", count: 48 },
                      { title: "Deep Learning with PyTorch", count: 39 },
                      { title: "Operating Systems Internals", count: 31 },
                    ].map((b) => (
                      <div className="popular-item" key={b.title}>
                        <div className="mini-cover" />
                        <span style={{ fontSize: "13px", fontWeight: 600, flex: 1 }}>{b.title}</span>
                        <span style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--muted)" }}>
                          {b.count} loans
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ACTIVE ALERTS */}
          <div className="panel">
            <div className="panel-head">
              <h2>Operational Alerts</h2>
              <span className="badge amber">{data.alerts.length} Active</span>
            </div>
            <div className="panel-body">
              {data.alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`alert-card ${alert.type}`}
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(alert.target)}
                >
                  <div>
                    <strong>{alert.title}</strong>
                    <p>{alert.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
