import { Navigate, Outlet } from "react-router-dom";
import FloatingButton from "../components/FloatingButton.jsx";
import Modal from "../components/Modal.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Toast from "../components/Toast.jsx";
import Topbar from "../components/Topbar.jsx";
import { useLibrary } from "../context/LibraryContext.jsx";

export default function DashboardLayout() {
  const authed = sessionStorage.getItem("archive-librarian-auth") === "true";
  const { modal } = useLibrary();

  if (!authed) {
    return <Navigate to="/login" replace />;
  }

  return (
    <section className="portal">
      <Sidebar />
      <main className="workspace">
        <Topbar />
        <section className="dashboard">
          <Outlet />
        </section>
      </main>
      <FloatingButton />
      {modal && <Modal />}
      <Toast />
    </section>
  );
}
