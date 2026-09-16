import { createContext, useContext, useMemo, useState } from "react";
import { adminInitialData } from "../data/adminInitialData.js";

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  const [data, setData] = useState(adminInitialData);
  const [toast, setToast] = useState("");
  const [modal, setModal] = useState(null);

  function notify(message) {
    setToast(message);
    window.setTimeout(() => setToast(""), 3000);
  }

  function addUser(userForm) {
    if (!userForm.name || !userForm.email) {
      return { ok: false, errors: ["Name and Email are required"] };
    }

    const colors = ["blue", "green", "orange", "purple"];
    const newUser = {
      id: userForm.id || `ARC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      name: userForm.name.trim(),
      email: userForm.email.trim(),
      role: userForm.role || "Student",
      department: userForm.department || "General Studies",
      registrationDate: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      status: userForm.status || "Active",
      avatarColor: colors[Math.floor(Math.random() * colors.length)],
    };

    setData((curr) => ({
      ...curr,
      stats: {
        ...curr.stats,
        totalUsers: curr.stats.totalUsers + 1,
        activeUsers: newUser.status === "Active" ? curr.stats.activeUsers + 1 : curr.stats.activeUsers,
      },
      users: [newUser, ...curr.users],
      activityLogs: [
        {
          id: `LOG-${Date.now().toString().slice(-4)}`,
          user: "Admin",
          action: `Registered new ${newUser.role} "${newUser.name}" (${newUser.id})`,
          timestamp: "Just now",
          type: "User Account",
        },
        ...curr.activityLogs.slice(0, 15),
      ],
    }));

    notify(`User "${newUser.name}" registered successfully!`);
    return { ok: true, user: newUser };
  }

  function updateUserStatus(id, newStatus) {
    setData((curr) => ({
      ...curr,
      users: curr.users.map((u) => (u.id === id ? { ...u, status: newStatus } : u)),
      activityLogs: [
        {
          id: `LOG-${Date.now().toString().slice(-4)}`,
          user: "Admin",
          action: `Updated user status for ${id} to ${newStatus}`,
          timestamp: "Just now",
          type: "User Account",
        },
        ...curr.activityLogs.slice(0, 15),
      ],
    }));
    notify(`User status set to ${newStatus}`);
  }

  function deleteUser(id) {
    setData((curr) => ({
      ...curr,
      users: curr.users.filter((u) => u.id !== id),
      stats: { ...curr.stats, totalUsers: Math.max(0, curr.stats.totalUsers - 1) },
      activityLogs: [
        {
          id: `LOG-${Date.now().toString().slice(-4)}`,
          user: "Admin",
          action: `Removed user account ${id}`,
          timestamp: "Just now",
          type: "User Account",
        },
        ...curr.activityLogs.slice(0, 15),
      ],
    }));
    notify(`User account ${id} removed`);
  }

  function addLibrarian(staffForm) {
    if (!staffForm.name || !staffForm.role) {
      return { ok: false, errors: ["Staff name and assigned role are mandatory"] };
    }

    const initials = staffForm.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    const newStaff = {
      id: `ARC-${Math.floor(1000 + Math.random() * 9000)}`,
      name: staffForm.name.trim(),
      role: staffForm.role.trim(),
      status: staffForm.status || "ACTIVE SHIFT",
      empId: `ARC-${Math.floor(1000 + Math.random() * 9000)}`,
      specialty: staffForm.specialty || "Academic Cataloging",
      shift: staffForm.shift || "Morning Desk",
      email: staffForm.email || `${staffForm.name.toLowerCase().replace(/\s+/g, ".")}@archive.edu`,
      avatarType: "initials",
      avatarInitials: initials || "ST",
      rating: "5.0 / 5.0",
      activeLoansManaged: 0,
    };

    setData((curr) => ({
      ...curr,
      stats: {
        ...curr.stats,
        totalStaff: curr.stats.totalStaff + 1,
        activeShift: newStaff.status === "ACTIVE SHIFT" ? curr.stats.activeShift + 1 : curr.stats.activeShift,
      },
      librarians: [newStaff, ...curr.librarians],
      activityLogs: [
        {
          id: `LOG-${Date.now().toString().slice(-4)}`,
          user: "Admin",
          action: `Appointed staff member ${newStaff.name} as ${newStaff.role}`,
          timestamp: "Just now",
          type: "Staff Management",
        },
        ...curr.activityLogs.slice(0, 15),
      ],
    }));

    notify(`Librarian "${newStaff.name}" added to staff roster!`);
    return { ok: true, staff: newStaff };
  }

  function updateLibrarianShift(id, newStatus) {
    setData((curr) => {
      const staff = curr.librarians.find((s) => s.id === id);
      if (!staff) return curr;
      const wasActive = staff.status === "ACTIVE SHIFT";
      const nowActive = newStatus === "ACTIVE SHIFT";
      const delta = nowActive && !wasActive ? 1 : !nowActive && wasActive ? -1 : 0;

      return {
        ...curr,
        stats: { ...curr.stats, activeShift: Math.max(0, curr.stats.activeShift + delta) },
        librarians: curr.librarians.map((s) => (s.id === id ? { ...s, status: newStatus } : s)),
        activityLogs: [
          {
            id: `LOG-${Date.now().toString().slice(-4)}`,
            user: "Admin",
            action: `Changed shift status for ${staff.name} to ${newStatus}`,
            timestamp: "Just now",
            type: "Staff Management",
          },
          ...curr.activityLogs.slice(0, 15),
        ],
      };
    });
    notify(`Shift status updated`);
  }

  function addBook(bookForm) {
    if (!bookForm.title || !bookForm.isbn) {
      return { ok: false, errors: ["Title and ISBN are required"] };
    }

    const copies = Number(bookForm.copies) || 5;
    const newBook = {
      id: `B-${Date.now().toString().slice(-4)}`,
      title: bookForm.title.trim(),
      isbn: bookForm.isbn.trim(),
      author: bookForm.author || "Institutional Archivist",
      category: bookForm.category || "General",
      copies,
      available: copies,
      shelf: bookForm.shelf || "GEN-01",
    };

    setData((curr) => ({
      ...curr,
      books: [newBook, ...curr.books],
      stats: { ...curr.stats, totalCatalogVolumes: curr.stats.totalCatalogVolumes + copies },
      activityLogs: [
        {
          id: `LOG-${Date.now().toString().slice(-4)}`,
          user: "Admin",
          action: `Cataloged volume "${newBook.title}" (${newBook.isbn})`,
          timestamp: "Just now",
          type: "Catalog Update",
        },
        ...curr.activityLogs.slice(0, 15),
      ],
    }));

    notify(`Cataloged "${newBook.title}"!`);
    return { ok: true, book: newBook };
  }

  function createInstantBackup() {
    const today = new Date();
    const dateStr = today.toISOString().slice(0, 10).replace(/-/g, "");
    const newBackup = {
      id: `BAK-${Date.now().toString().slice(-4)}`,
      filename: `The_Archive_Snapshot_${dateStr}_${today.getHours()}${today.getMinutes()}.sql.gz`,
      size: `${(48 + Math.random() * 2).toFixed(1)} MB`,
      createdBy: "Admin (Manual Snapshot)",
      date: `${today.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}, ${today.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`,
      status: "Healthy",
    };

    setData((curr) => ({
      ...curr,
      backups: [newBackup, ...curr.backups],
      activityLogs: [
        {
          id: `LOG-${Date.now().toString().slice(-4)}`,
          user: "Admin",
          action: `Generated instant database snapshot: ${newBackup.filename}`,
          timestamp: "Just now",
          type: "Automated Backup",
        },
        ...curr.activityLogs.slice(0, 15),
      ],
    }));

    notify("Database snapshot created and verified!");
    return { ok: true, backup: newBackup };
  }

  function updateInstitutionSettings(settingsForm) {
    setData((curr) => ({
      ...curr,
      institution: {
        ...curr.institution,
        ...settingsForm,
      },
      activityLogs: [
        {
          id: `LOG-${Date.now().toString().slice(-4)}`,
          user: "Admin",
          action: "Modified core institutional parameters and settings",
          timestamp: "Just now",
          type: "System Configuration",
        },
        ...curr.activityLogs.slice(0, 15),
      ],
    }));
    notify("System configuration parameters saved!");
    return { ok: true };
  }

  const value = useMemo(
    () => ({
      data,
      toast,
      modal,
      setModal,
      notify,
      addUser,
      updateUserStatus,
      deleteUser,
      addLibrarian,
      updateLibrarianShift,
      addBook,
      createInstantBackup,
      updateInstitutionSettings,
    }),
    [data, toast, modal]
  );

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  return useContext(AdminContext);
}
