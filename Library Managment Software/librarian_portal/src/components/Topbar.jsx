import { Bell, Book, LogOut, QrCode, Search, Shield, UserCheck, UserRound } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLibrary } from "../context/LibraryContext.jsx";

export default function Topbar() {
  const { data, setModal } = useLibrary();
  const [query, setQuery] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const searchRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  // Close menus on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        // keep query but dismiss on next click or clear
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const bookMatches = data.books
      .filter((b) => `${b.title} ${b.isbn} ${b.author}`.toLowerCase().includes(q))
      .map((b) => ({
        type: "Book",
        label: b.title,
        meta: `ISBN: ${b.isbn} (${b.available}/${b.copies} avail)`,
        path: "/books",
        id: b.id,
      }));

    const studentMatches = data.students
      .filter((s) => `${s.id} ${s.name} ${s.department}`.toLowerCase().includes(q))
      .map((s) => ({
        type: "Student",
        label: `${s.name} (${s.id})`,
        meta: `${s.department} • Loans: ${s.activeLoans}/5`,
        path: "/students",
        id: s.id,
      }));

    const copyMatches = data.copies
      .filter((c) => c.barcode.toLowerCase().includes(q))
      .map((c) => ({
        type: "Copy Barcode",
        label: `${c.barcode} - ${c.bookTitle}`,
        meta: `Status: ${c.status} • Shelf: ${c.shelf}`,
        path: "/inventory",
        id: c.barcode,
      }));

    return [...bookMatches, ...studentMatches, ...copyMatches].slice(0, 7);
  }, [data, query]);

  return (
    <header className="topbar">
      <div className="searchBox" ref={searchRef}>
        <Search size={18} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by Title, ISBN, Copy Barcode (e.g. CP-20491), or Student ID..."
        />
        {query.trim().length > 0 && (
          <div className="searchResults">
            <strong>Matching Archive Records ({results.length})</strong>
            {results.length === 0 ? (
              <div style={{ padding: "10px 14px", fontSize: "13px", color: "var(--muted)" }}>
                No records matching "{query}"
              </div>
            ) : (
              results.map((item) => (
                <button
                  key={`${item.type}-${item.id}`}
                  onClick={() => {
                    navigate(item.path);
                    setQuery("");
                  }}
                >
                  <span>{item.type}</span>
                  <b>{item.label}</b>
                  <small>{item.meta}</small>
                </button>
              ))
            )}
          </div>
        )}
      </div>

      <button className="quick-scan" onClick={() => setModal({ type: "quickScan" })}>
        <QrCode size={16} /> Quick Scan
      </button>

      <button
        className="notice"
        title="Operational Alerts"
        onClick={() => setModal({ type: "notifications" })}
      >
        <Bell size={18} />
        {data.alerts?.length > 0 && <span className="notice-badge">{data.alerts.length}</span>}
      </button>

      <div style={{ position: "relative" }} ref={profileRef}>
        <button className="profileButton" onClick={() => setProfileOpen((prev) => !prev)}>
          <div>
            <strong>Prof. Elena Vance</strong>
            <small>Chief Librarian</small>
          </div>
          <div className="avatar">EV</div>
        </button>

        {profileOpen && (
          <div className="profileMenu">
            <strong>Prof. Elena Vance</strong>
            <button
              onClick={() => {
                setProfileOpen(false);
                setModal({ type: "profile" });
              }}
            >
              <UserRound size={15} /> Librarian Profile
            </button>
            <button
              onClick={() => {
                setProfileOpen(false);
                setModal({ type: "activity" });
              }}
            >
              <Shield size={15} /> Activity Audit Log
            </button>
            <button
              className="danger"
              onClick={() => {
                setProfileOpen(false);
                setModal({ type: "logout" });
              }}
            >
              <LogOut size={15} /> Sign Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
