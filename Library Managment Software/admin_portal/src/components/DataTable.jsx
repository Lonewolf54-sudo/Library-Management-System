import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { useState } from "react";

export default function DataTable({
  columns,
  data = [],
  totalEntries = 1248,
  renderRow,
  selectedIds = [],
  onSelectAll,
  onSelectRow,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;
  const totalPages = Math.ceil(data.length / pageSize) || 1;

  const currentRows = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="card-table">
      <table className="data-table">
        <thead>
          <tr>
            <th style={{ width: "40px" }}>
              <input
                type="checkbox"
                checked={selectedIds.length > 0 && selectedIds.length === data.length}
                onChange={(e) => onSelectAll?.(e.target.checked)}
              />
            </th>
            {columns.map((col, idx) => (
              <th key={idx} style={{ width: col.width }}>
                {col.label || col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row, idx) => {
            if (renderRow) return renderRow(row, idx);
            return null;
          })}
        </tbody>
      </table>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 20px",
          borderTop: "1px solid var(--border-line)",
          fontSize: "13px",
          color: "var(--text-muted)",
        }}
      >
        <span>
          Showing 1 to {currentRows.length} of {totalEntries.toLocaleString()} entries
        </span>

        <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
          <button
            className="btn-secondary"
            style={{ padding: "4px 8px", minWidth: "32px", justifyContent: "center" }}
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          >
            &lt;
          </button>
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "var(--radius-sm)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "13px",
                fontWeight: 700,
                background: currentPage === page ? "var(--navy-primary)" : "transparent",
                color: currentPage === page ? "#ffffff" : "var(--text-main)",
              }}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          <span style={{ padding: "0 4px" }}>...</span>
          <button
            className="btn-secondary"
            style={{ padding: "4px 8px", minWidth: "32px", justifyContent: "center" }}
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
