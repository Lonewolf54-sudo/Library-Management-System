import {
  Activity,
  AlertCircle,
  Bell,
  BookOpen,
  CheckCircle2,
  Clock,
  Database,
  Flag,
  HardDrive,
  LogOut,
  Plus,
  Server,
  Shield,
  UserCheck,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext.jsx";

export default function Modal() {
  const {
    modal,
    setModal,
    data,
    addUser,
    addLibrarian,
    addBook,
    createInstantBackup,
    updateUserStatus,
    deleteUser,
  } = useAdmin();
  const navigate = useNavigate();

  if (!modal) return null;
  const close = () => setModal(null);

  let content = null;

  switch (modal.type) {
    case "addUser":
      content = <AddUserModal close={close} addUser={addUser} />;
      break;
    case "addLibrarian":
      content = <AddLibrarianModal close={close} addLibrarian={addLibrarian} />;
      break;
    case "addBook":
      content = <AddBookModal close={close} addBook={addBook} />;
      break;
    case "newEntry":
      content = <NewEntryModal close={close} setModal={setModal} />;
      break;
    case "systemStatus":
      content = <SystemStatusModal close={close} stats={data.stats} />;
      break;
    case "staffPerformance":
      content = <StaffPerformanceModal close={close} staff={modal.staff} />;
      break;
    case "userActions":
      content = (
        <UserActionsModal
          close={close}
          user={modal.user}
          updateUserStatus={updateUserStatus}
          deleteUser={deleteUser}
        />
      );
      break;
    case "notices":
      content = <NoticesModal close={close} notices={data.notices} />;
      break;
    case "alerts":
      content = <AlertsModal close={close} />;
      break;
    case "logout":
      content = <LogoutModal close={close} navigate={navigate} />;
      break;
    default:
      content = <div>Modal Content</div>;
  }

  return (
    <div className="modal-overlay" onClick={close}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={close}>
          <X size={18} />
        </button>
        {content}
      </div>
    </div>
  );
}

function NewEntryModal({ close, setModal }) {
  return (
    <div>
      <h2 style={{ fontSize: "20px", fontWeight: 800, color: "var(--navy-primary)", marginBottom: "6px" }}>
        + Create New Entry
      </h2>
      <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "20px" }}>
        Select the administrative resource you wish to register into The Archive.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        <button
          className="btn-secondary"
          style={{ padding: "16px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "8px" }}
          onClick={() => setModal({ type: "addUser" })}
        >
          <Users size={20} color="var(--orange-active)" />
          <strong style={{ fontSize: "14px" }}>Register Member</strong>
          <small style={{ color: "var(--text-muted)" }}>Student or Faculty patron account</small>
        </button>

        <button
          className="btn-secondary"
          style={{ padding: "16px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "8px" }}
          onClick={() => setModal({ type: "addLibrarian" })}
        >
          <UserCheck size={20} color="var(--navy-primary)" />
          <strong style={{ fontSize: "14px" }}>Appoint Staff</strong>
          <small style={{ color: "var(--text-muted)" }}>Librarian, archivist, or desk officer</small>
        </button>

        <button
          className="btn-secondary"
          style={{ padding: "16px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "8px" }}
          onClick={() => setModal({ type: "addBook" })}
        >
          <BookOpen size={20} color="var(--green-badge-text)" />
          <strong style={{ fontSize: "14px" }}>Catalog Volume</strong>
          <small style={{ color: "var(--text-muted)" }}>Add bibliographic title & copies</small>
        </button>

        <button
          className="btn-secondary"
          style={{ padding: "16px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "8px" }}
          onClick={() => setModal({ type: "systemStatus" })}
        >
          <Activity size={20} color="var(--blue-badge-text)" />
          <strong style={{ fontSize: "14px" }}>System Health</strong>
          <small style={{ color: "var(--text-muted)" }}>Monitor database and server status</small>
        </button>
      </div>
    </div>
  );
}

function AddUserModal({ close, addUser }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Student",
    department: "Computer Science",
    status: "Active",
  });
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const res = addUser(form);
    if (!res.ok) setError(res.errors.join(", "));
    else close();
  }

  return (
    <div>
      <h2 style={{ fontSize: "20px", fontWeight: 800, color: "var(--navy-primary)", marginBottom: "4px" }}>
        Add New User
      </h2>
      <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "18px" }}>
        Register a new student or faculty member into The Archive directory.
      </p>

      {error && (
        <div style={{ padding: "10px", background: "var(--red-badge-bg)", color: "var(--red-badge-text)", marginBottom: "14px", borderRadius: "6px", fontSize: "13px" }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name *</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="e.g. Aarav Sharma"
            required
          />
        </div>

        <div className="form-group">
          <label>Email Address *</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="e.g. aarav.s@university.edu.in"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Member Role</label>
            <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
              <option value="Student">Student</option>
              <option value="Faculty">Faculty</option>
              <option value="Researcher">Researcher</option>
            </select>
          </div>

          <div className="form-group">
            <label>Membership Status</label>
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Academic Department</label>
          <input
            value={form.department}
            onChange={(e) => setForm({ ...form, department: e.target.value })}
            placeholder="e.g. Computer Science & AI"
          />
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "24px" }}>
          <button type="button" className="btn-secondary" onClick={close}>
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            Register Member
          </button>
        </div>
      </form>
    </div>
  );
}

function AddLibrarianModal({ close, addLibrarian }) {
  const [form, setForm] = useState({
    name: "",
    role: "Reference Desk Lead",
    specialty: "Ancient Manuscripts",
    shift: "Morning Desk (08:00 - 16:00)",
    status: "ACTIVE SHIFT",
    email: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    const res = addLibrarian(form);
    if (res.ok) close();
  }

  return (
    <div>
      <h2 style={{ fontSize: "20px", fontWeight: 800, color: "var(--navy-primary)", marginBottom: "4px" }}>
        Appoint Librarian Staff
      </h2>
      <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "18px" }}>
        Add a professional librarian, curator, or desk manager to staff assignments.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name & Title *</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="e.g. Dr. Meera Sharma"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Assigned Role *</label>
            <input
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              placeholder="e.g. Head of Archives"
              required
            />
          </div>

          <div className="form-group">
            <label>Specialty Field</label>
            <input
              value={form.specialty}
              onChange={(e) => setForm({ ...form, specialty: e.target.value })}
              placeholder="e.g. Ancient Manuscripts"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Shift Schedule</label>
            <select value={form.shift} onChange={(e) => setForm({ ...form, shift: e.target.value })}>
              <option>Morning Desk (08:00 - 16:00)</option>
              <option>Evening Desk (16:00 - 00:00)</option>
              <option>Central Research Bay</option>
              <option>Procurement & ISBN Bay</option>
            </select>
          </div>

          <div className="form-group">
            <label>Shift Status</label>
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <option value="ACTIVE SHIFT">ACTIVE SHIFT</option>
              <option value="OFF SHIFT">OFF SHIFT</option>
              <option value="ON LEAVE">ON LEAVE</option>
            </select>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "24px" }}>
          <button type="button" className="btn-secondary" onClick={close}>
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            Confirm Staff Appointment
          </button>
        </div>
      </form>
    </div>
  );
}

function AddBookModal({ close, addBook }) {
  const [form, setForm] = useState({
    title: "",
    isbn: "",
    author: "",
    category: "Computer Science",
    copies: 5,
    shelf: "CS-01",
  });

  function handleSubmit(e) {
    e.preventDefault();
    const res = addBook(form);
    if (res.ok) close();
  }

  return (
    <div>
      <h2 style={{ fontSize: "20px", fontWeight: 800, color: "var(--navy-primary)", marginBottom: "4px" }}>
        Catalog Book Volume
      </h2>
      <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "18px" }}>
        Add a title to the central institutional catalog and generate barcode inventory.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Book Title *</label>
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="e.g. Introduction to Algorithms"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>ISBN-13 *</label>
            <input
              value={form.isbn}
              onChange={(e) => setForm({ ...form, isbn: e.target.value })}
              placeholder="978-0262033848"
              required
            />
          </div>

          <div className="form-group">
            <label>Primary Author</label>
            <input
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              placeholder="Thomas H. Cormen"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Academic Category</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              <option>Computer Science</option>
              <option>AI & Data</option>
              <option>Business & Econ</option>
              <option>Manuscripts</option>
              <option>Natural Sciences</option>
            </select>
          </div>

          <div className="form-group">
            <label>Initial Copies</label>
            <input
              type="number"
              min="1"
              value={form.copies}
              onChange={(e) => setForm({ ...form, copies: e.target.value })}
            />
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "24px" }}>
          <button type="button" className="btn-secondary" onClick={close}>
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            Catalog Volume
          </button>
        </div>
      </form>
    </div>
  );
}

function SystemStatusModal({ close, stats }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
        <Activity size={24} color="var(--green-badge-text)" />
        <h2 style={{ fontSize: "20px", fontWeight: 800, color: "var(--navy-primary)", margin: 0 }}>
          System Health & Status
        </h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div style={{ padding: "12px 16px", background: "var(--bg-page)", borderRadius: "var(--radius-sm)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <strong style={{ display: "block", fontSize: "13.5px" }}>Database Cluster</strong>
            <small style={{ color: "var(--text-muted)" }}>PostgreSQL 16 High-Availability</small>
          </div>
          <span className="badge-pill active">● HEALTHY</span>
        </div>

        <div style={{ padding: "12px 16px", background: "var(--bg-page)", borderRadius: "var(--radius-sm)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <strong style={{ display: "block", fontSize: "13.5px" }}>API Gateway & Auth</strong>
            <small style={{ color: "var(--text-muted)" }}>Average latency: 24ms</small>
          </div>
          <span className="badge-pill active">● OPERATIONAL</span>
        </div>

        <div style={{ padding: "12px 16px", background: "var(--bg-page)", borderRadius: "var(--radius-sm)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <strong style={{ display: "block", fontSize: "13.5px" }}>Storage Utilization</strong>
            <small style={{ color: "var(--text-muted)" }}>{stats.storageUsedGb} GB of {stats.storageTotalGb} GB Used</small>
          </div>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: 700 }}>14.8%</span>
        </div>
      </div>

      <div style={{ marginTop: "24px", display: "flex", justifyContent: "flex-end" }}>
        <button className="btn-primary" onClick={close}>
          Done
        </button>
      </div>
    </div>
  );
}

function StaffPerformanceModal({ close, staff }) {
  if (!staff) return null;
  return (
    <div>
      <h2 style={{ fontSize: "20px", fontWeight: 800, color: "var(--navy-primary)", marginBottom: "4px" }}>
        Staff Evaluation: {staff.name}
      </h2>
      <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "18px" }}>
        Employee ID: <b>{staff.empId}</b> • {staff.role}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "16px", background: "var(--bg-page)", borderRadius: "var(--radius-md)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13.5px" }}>
          <span>Current Shift:</span>
          <strong>{staff.shift}</strong>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13.5px" }}>
          <span>Patron Rating:</span>
          <strong style={{ color: "var(--orange-active)" }}>★ {staff.rating}</strong>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13.5px" }}>
          <span>Loans Handled:</span>
          <strong>{staff.activeLoansManaged} Volumes</strong>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13.5px" }}>
          <span>Specialty:</span>
          <strong>{staff.specialty}</strong>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "24px" }}>
        <button className="btn-secondary" onClick={close}>
          Close
        </button>
        <button className="btn-primary" onClick={close}>
          Approve Standing
        </button>
      </div>
    </div>
  );
}

function UserActionsModal({ close, user, updateUserStatus, deleteUser }) {
  if (!user) return null;
  return (
    <div>
      <h2 style={{ fontSize: "18px", fontWeight: 800, color: "var(--navy-primary)", marginBottom: "4px" }}>
        Manage Member: {user.name}
      </h2>
      <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "18px" }}>
        ID: <b>{user.id}</b> • {user.email}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <button
          className="btn-secondary"
          style={{ justifyContent: "flex-start", padding: "10px 14px" }}
          onClick={() => {
            updateUserStatus(user.id, user.status === "Active" ? "Inactive" : "Active");
            close();
          }}
        >
          Toggle Status to <b>{user.status === "Active" ? "Inactive" : "Active"}</b>
        </button>
        <button
          className="btn-secondary"
          style={{ justifyContent: "flex-start", padding: "10px 14px", color: "var(--red-badge-text)" }}
          onClick={() => {
            deleteUser(user.id);
            close();
          }}
        >
          Remove Account Record
        </button>
      </div>
    </div>
  );
}

function NoticesModal({ close, notices = [] }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
        <Flag size={20} color="var(--orange-active)" />
        <h2 style={{ fontSize: "20px", fontWeight: 800, color: "var(--navy-primary)", margin: 0 }}>
          Public Library Notices
        </h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {notices.map((n) => (
          <div key={n.id} style={{ padding: "14px", border: "1px solid var(--border-line)", borderRadius: "var(--radius-md)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
              <strong style={{ fontSize: "14px" }}>{n.title}</strong>
              <small style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{n.date}</small>
            </div>
            <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: 0 }}>{n.body}</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "20px", display: "flex", justifyContent: "flex-end" }}>
        <button className="btn-primary" onClick={close}>Close</button>
      </div>
    </div>
  );
}

function AlertsModal({ close }) {
  return (
    <div>
      <h2 style={{ fontSize: "20px", fontWeight: 800, color: "var(--navy-primary)", marginBottom: "16px" }}>
        Operational Notifications
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ padding: "12px", background: "var(--amber-badge-bg)", color: "var(--amber-badge-text)", borderRadius: "var(--radius-sm)", fontSize: "13px" }}>
          <strong>Staff Shift Handover:</strong> Evening circulation desk shift starts in 45 mins.
        </div>
        <div style={{ padding: "12px", background: "var(--blue-badge-bg)", color: "var(--blue-badge-text)", borderRadius: "var(--radius-sm)", fontSize: "13px" }}>
          <strong>Backup Successful:</strong> Snapshot <code>The_Archive_Production_20260826.sql.gz</code> verified.
        </div>
      </div>
      <div style={{ marginTop: "20px", display: "flex", justifyContent: "flex-end" }}>
        <button className="btn-primary" onClick={close}>Dismiss</button>
      </div>
    </div>
  );
}

function LogoutModal({ close, navigate }) {
  return (
    <div>
      <h2 style={{ fontSize: "20px", fontWeight: 800, color: "var(--navy-primary)", marginBottom: "8px" }}>
        End Admin Console Session?
      </h2>
      <p style={{ fontSize: "13.5px", color: "var(--text-muted)", marginBottom: "24px" }}>
        Are you sure you want to log out of The Archive administrative console?
      </p>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
        <button className="btn-secondary" onClick={close}>Cancel</button>
        <button
          className="btn-primary"
          style={{ background: "var(--red-badge-text)" }}
          onClick={() => {
            close();
            navigate("/login");
          }}
        >
          <LogOut size={14} /> Logout
        </button>
      </div>
    </div>
  );
}
