import { Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import Books from "./pages/Books.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Fines from "./pages/Fines.jsx";
import Inventory from "./pages/Inventory.jsx";
import IssueBook from "./pages/IssueBook.jsx";
import Login from "./pages/Login.jsx";
import Renewals from "./pages/Renewals.jsx";
import Reports from "./pages/Reports.jsx";
import Reservations from "./pages/Reservations.jsx";
import ReturnBook from "./pages/ReturnBook.jsx";
import Shelves from "./pages/Shelves.jsx";
import Students from "./pages/Students.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<DashboardLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/issue" element={<IssueBook />} />
        <Route path="/return" element={<ReturnBook />} />
        <Route path="/renewals" element={<Renewals />} />
        <Route path="/books" element={<Books />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/students" element={<Students />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/fines" element={<Fines />} />
        <Route path="/shelves" element={<Shelves />} />
        <Route path="/reports" element={<Reports />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
