import { Building, Database, Save, Shield } from "lucide-react";
import { useState } from "react";
import { useAdmin } from "../context/AdminContext.jsx";

export default function Settings() {
  const { data, updateInstitutionSettings } = useAdmin();
  const [activeTab, setActiveTab] = useState("general");

  const [form, setForm] = useState({
    name: data.institution.name || "The Archive",
    shortCode: data.institution.shortCode || "ARC",
    contactEmail: data.institution.contactEmail || "admin@archive.edu",
    phone: data.institution.phone || "+1 (555) 019-4820",
    sessionTimeoutMins: data.institution.sessionTimeoutMins || 30,
    twoFactorRequired: data.institution.twoFactorRequired ?? true,
    autoBackupDaily: data.institution.autoBackupDaily ?? true,
    backupRetentionDays: data.institution.backupRetentionDays || 90,
  });

  function handleSubmit(e) {
    e.preventDefault();
    updateInstitutionSettings(form);
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>System Settings</h1>
          <p>Configure core institutional parameters, security protocols, and database operations.</p>
        </div>
      </div>

      <div className="settings-container">
        {/* LEFT TAB MENU */}
        <div className="settings-nav">
          <button
            className={`settings-nav-item ${activeTab === "general" ? "active" : ""}`}
            onClick={() => setActiveTab("general")}
          >
            <Building size={16} color="var(--navy-primary)" />
            <span>General Info</span>
          </button>
          <button
            className={`settings-nav-item ${activeTab === "security" ? "active" : ""}`}
            onClick={() => setActiveTab("security")}
          >
            <Shield size={16} />
            <span>Security</span>
          </button>
          <button
            className={`settings-nav-item ${activeTab === "database" ? "active" : ""}`}
            onClick={() => setActiveTab("database")}
          >
            <Database size={16} />
            <span>Database</span>
          </button>
        </div>

        {/* RIGHT SETTINGS PANE */}
        <div className="settings-pane">
          <form onSubmit={handleSubmit}>
            {activeTab === "general" && (
              <div>
                <h2>General Information</h2>

                <div className="form-row">
                  <div className="form-group">
                    <label>Institution Name</label>
                    <input
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Short Code / Acronym</label>
                    <input
                      value={form.shortCode}
                      onChange={(e) => setForm({ ...form, shortCode: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Primary Contact Email</label>
                  <input
                    type="email"
                    value={form.contactEmail}
                    onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Institutional Helpdesk Contact</label>
                  <input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div>
                <h2>Security & Access Protocols</h2>

                <div className="form-group">
                  <label>Session Inactivity Timeout (Minutes)</label>
                  <input
                    type="number"
                    value={form.sessionTimeoutMins}
                    onChange={(e) => setForm({ ...form, sessionTimeoutMins: e.target.value })}
                  />
                </div>

                <div className="form-group" style={{ flexDirection: "row", alignItems: "center", gap: "10px", marginTop: "12px" }}>
                  <input
                    type="checkbox"
                    id="twoFactor"
                    style={{ width: "18px", height: "18px", cursor: "pointer" }}
                    checked={form.twoFactorRequired}
                    onChange={(e) => setForm({ ...form, twoFactorRequired: e.target.checked })}
                  />
                  <label htmlFor="twoFactor" style={{ cursor: "pointer", fontSize: "14px" }}>
                    Enforce Two-Factor Authentication (2FA) for All Librarian Accounts
                  </label>
                </div>
              </div>
            )}

            {activeTab === "database" && (
              <div>
                <h2>Database & Retention Configuration</h2>

                <div className="form-group" style={{ flexDirection: "row", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                  <input
                    type="checkbox"
                    id="autoBackup"
                    style={{ width: "18px", height: "18px", cursor: "pointer" }}
                    checked={form.autoBackupDaily}
                    onChange={(e) => setForm({ ...form, autoBackupDaily: e.target.checked })}
                  />
                  <label htmlFor="autoBackup" style={{ cursor: "pointer", fontSize: "14px" }}>
                    Enable Automated Daily Midnight Database Snapshots
                  </label>
                </div>

                <div className="form-group">
                  <label>Snapshot Retention Window (Days)</label>
                  <input
                    type="number"
                    value={form.backupRetentionDays}
                    onChange={(e) => setForm({ ...form, backupRetentionDays: e.target.value })}
                  />
                </div>
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "28px" }}>
              <button type="submit" className="btn-primary" style={{ padding: "10px 24px" }}>
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
