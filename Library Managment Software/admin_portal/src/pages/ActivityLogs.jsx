import { Clock, Filter, History, Search } from "lucide-react";
import { useMemo, useState } from "react";
import DataTable from "../components/DataTable.jsx";
import { useAdmin } from "../context/AdminContext.jsx";

export default function ActivityLogs() {
  const { data } = useAdmin();
  const [search, setSearch] = useState("");

  const filteredLogs = useMemo(() => {
    return data.activityLogs.filter(
      (l) =>
        search === "" ||
        `${l.user} ${l.action} ${l.type}`.toLowerCase().includes(search.toLowerCase())
    );
  }, [data.activityLogs, search]);

  const columns = [
    { label: "Log ID", width: "120px" },
    { label: "Actor / Operator", width: "180px" },
    { label: "Administrative Action", width: "360px" },
    { label: "Category", width: "160px" },
    { label: "Timestamp", width: "140px" },
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>System Activity Logs</h1>
          <p>Chronological audit log tracking administrative transactions, patron account updates, and catalog changes.</p>
        </div>
      </div>

      <div className="table-controls">
        <div className="search-input-wrap">
          <Search size={15} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search audit trail..."
          />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredLogs}
        totalEntries={filteredLogs.length}
        renderRow={(log) => (
          <tr key={log.id}>
            <td><input type="checkbox" /></td>
            <td><span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-muted)" }}>{log.id}</span></td>
            <td><strong>{log.user}</strong></td>
            <td><span style={{ color: "var(--text-main)" }}>{log.action}</span></td>
            <td><span className="badge-pill" style={{ background: "#f1f5f9", color: "#334155" }}>{log.type}</span></td>
            <td><small style={{ color: "var(--text-muted)" }}><Clock size={11} style={{ verticalAlign: "middle", marginRight: "3px" }} />{log.timestamp}</small></td>
          </tr>
        )}
      />
    </div>
  );
}
