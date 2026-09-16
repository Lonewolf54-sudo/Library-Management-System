import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useMemo, useState } from "react";

export default function DataTable({
  columns,
  data = [],
  searchable = true,
  searchPlaceholder = "Filter records...",
  pageSize = 8,
  renderRow,
  emptyMessage = "No matching records found.",
}) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (!query.trim()) return data;
    const q = query.toLowerCase();
    return data.filter((item) =>
      Object.values(item).some(
        (val) => val !== null && val !== undefined && String(val).toLowerCase().includes(q)
      )
    );
  }, [data, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentRows = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  function handleSearch(e) {
    setQuery(e.target.value);
    setPage(1);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      {searchable && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ position: "relative", width: "100%", maxWidth: "340px" }}>
            <Search
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
              value={query}
              onChange={handleSearch}
              placeholder={searchPlaceholder}
              style={{
                width: "100%",
                height: "36px",
                padding: "0 12px 0 36px",
                border: "1px solid var(--line-strong)",
                borderRadius: "var(--radius-sm)",
                fontSize: "13px",
                background: "var(--paper)",
              }}
            />
          </div>
          <div style={{ fontSize: "12px", color: "var(--muted)", fontFamily: "var(--mono)" }}>
            Showing <b>{filtered.length}</b> records
          </div>
        </div>
      )}

      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              {columns.map((col, idx) => (
                <th key={col.key || col.label || idx} style={{ width: col.width }}>
                  {col.label || col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentRows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  style={{ textAlign: "center", padding: "36px", color: "var(--muted)" }}
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              currentRows.map((item, index) => {
                if (renderRow) return renderRow(item, index);
                return (
                  <tr key={item.id || item.barcode || index}>
                    {columns.map((col, cIdx) => {
                      const key = col.key || col;
                      const val = item[key];
                      return (
                        <td key={cIdx}>
                          {col.render ? col.render(item, index) : val !== undefined ? String(val) : "—"}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "8px",
          }}
        >
          <span style={{ fontSize: "12px", color: "var(--muted)", fontFamily: "var(--mono)" }}>
            Page {page} of {totalPages}
          </span>
          <div style={{ display: "flex", gap: "6px" }}>
            <button
              className="secondary"
              style={{ padding: "6px 12px", fontSize: "12px" }}
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              <ChevronLeft size={14} /> Prev
            </button>
            <button
              className="secondary"
              style={{ padding: "6px 12px", fontSize: "12px" }}
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Next <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
