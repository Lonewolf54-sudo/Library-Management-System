import { Outlet } from "react-router-dom";
import Modal from "../components/Modal.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Toast from "../components/Toast.jsx";
import Topbar from "../components/Topbar.jsx";
import { useAdmin } from "../context/AdminContext.jsx";

export default function AdminLayout() {
  const { modal } = useAdmin();

  return (
    <div className="admin-shell">
      <Topbar />
      <div className="main-layout">
        <Sidebar />
        <main className="page-area">
          <Outlet />
        </main>
      </div>
      {modal && <Modal />}
      <Toast />
    </div>
  );
}
