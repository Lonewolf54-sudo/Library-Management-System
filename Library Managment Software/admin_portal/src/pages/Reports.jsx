import { ArrowDownToLine, FileBarChart, PieChart, Printer } from "lucide-react";
import { useAdmin } from "../context/AdminContext.jsx";

export default function Reports() {
  const { data, notify } = useAdmin();

  function handleExport() {
    notify("Exported Institutional Operations Audit (.CSV)");
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Institutional Reports & Audits</h1>
          <p>Generate compliance audit logs, circulation throughput metrics, and patron demographic analytics.</p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button className="btn-secondary" onClick={() => window.print()}>
            <Printer size={14} /> Print Audit
          </button>
          <button className="btn-primary" onClick={handleExport}>
            <ArrowDownToLine size={14} /> Export Report CSV
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        <div className="card-table" style={{ padding: "24px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 800, color: "var(--navy-primary)", marginBottom: "16px" }}>
            Patron Demographic Utilization
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {[
              { label: "Undergraduate Students", pct: 54, count: 674 },
              { label: "Postgraduate & PhD Scholars", pct: 28, count: 349 },
              { label: "Faculty & Institutional Researchers", pct: 18, count: 225 },
            ].map((item) => (
              <div key={item.label}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "4px" }}>
                  <span style={{ fontWeight: 600 }}>{item.label}</span>
                  <span style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                    <b>{item.count}</b> members ({item.pct}%)
                  </span>
                </div>
                <div style={{ width: "100%", height: "8px", background: "#f1f5f9", borderRadius: "4px", overflow: "hidden" }}>
                  <div style={{ width: `${item.pct}%`, height: "100%", background: "var(--orange-active)", borderRadius: "4px" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card-table" style={{ padding: "24px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 800, color: "var(--navy-primary)", marginBottom: "16px" }}>
            Circulation Health Overview
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "8px", borderBottom: "1px dashed var(--border-line)", fontSize: "13.5px" }}>
              <span>Monthly Issue Volume:</span>
              <strong style={{ fontFamily: "var(--font-mono)" }}>10,240 Loans</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "8px", borderBottom: "1px dashed var(--border-line)", fontSize: "13.5px" }}>
              <span>Return On-Time Velocity:</span>
              <strong style={{ color: "var(--green-badge-text)" }}>95.9%</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "8px", borderBottom: "1px dashed var(--border-line)", fontSize: "13.5px" }}>
              <span>Staff Hours Logged:</span>
              <strong style={{ fontFamily: "var(--font-mono)" }}>3,420 Hours</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13.5px" }}>
              <span>Total Catalog Valuation:</span>
              <strong>$1.42M Insured</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
