import { Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout.jsx";
import ActivityLogs from "./pages/ActivityLogs.jsx";
import BookCatalog from "./pages/BookCatalog.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import DatabaseBackup from "./pages/DatabaseBackup.jsx";
import Login from "./pages/Login.jsx";
import ManageLibrarians from "./pages/ManageLibrarians.jsx";
import ManageUsers from "./pages/ManageUsers.jsx";
import Reports from "./pages/Reports.jsx";
import Settings from "./pages/Settings.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<AdminLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<ManageUsers />} />
        <Route path="/librarians" element={<ManageLibrarians />} />
        <Route path="/catalog" element={<BookCatalog />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/backups" element={<DatabaseBackup />} />
        <Route path="/logs" element={<ActivityLogs />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
