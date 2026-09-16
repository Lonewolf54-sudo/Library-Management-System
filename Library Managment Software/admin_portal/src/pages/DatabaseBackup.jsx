import { ArrowDownToLine, Cloud, Database, HardDrive, RefreshCw } from "lucide-react";
import DataTable from "../components/DataTable.jsx";
import { useAdmin } from "../context/AdminContext.jsx";

export default function DatabaseBackup() {
  const { data, createInstantBackup, notify } = useAdmin();

  const columns = [
    { label: "Snapshot Filename", width: "320px" },
    { label: "Size", width: "120px" },
    { label: "Initiator", width: "180px" },
    { label: "Created Timestamp", width: "200px" },
    { label: "Status", width: "120px" },
    { label: "Action", width: "100px" },
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Database Backup & Recovery</h1>
          <p>Create live database snapshots, manage automated cron retention, and ensure institutional data continuity.</p>
        </div>
        <button className="btn-primary" onClick={createInstantBackup}>
          <Cloud size={15} /> Create Instant Backup
        </button>
      </div>

      <DataTable
        columns={columns}
        data={data.backups}
        totalEntries={data.backups.length}
        renderRow={(bak) => (
          <tr key={bak.id}>
            <td><input type="checkbox" /></td>
            <td>
              <strong style={{ color: "var(--navy-primary)", fontFamily: "var(--font-mono)", fontSize: "13px" }}>
                {bak.filename}
              </strong>
            </td>
            <td><span style={{ fontFamily: "var(--font-mono)" }}>{bak.size}</span></td>
            <td>{bak.createdBy}</td>
            <td><span style={{ fontSize: "12.5px", color: "var(--text-muted)" }}>{bak.date}</span></td>
            <td><span className="badge-pill active">● {bak.status}</span></td>
            <td>
              <button
                className="btn-secondary"
                style={{ padding: "4px 8px", fontSize: "11.5px" }}
                onClick={() => notify(`Downloaded snapshot ${bak.filename}`)}
              >
                <ArrowDownToLine size={12} /> Download
              </button>
            </td>
          </tr>
        )}
      />
    </div>
  );
}
