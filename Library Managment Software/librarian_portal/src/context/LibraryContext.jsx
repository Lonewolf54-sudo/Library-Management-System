import { createContext, useContext, useMemo, useState } from "react";
import { initialData } from "../data/initialData.js";

const LibraryContext = createContext(null);

export function LibraryProvider({ children }) {
  const [data, setData] = useState(initialData);
  const [toast, setToast] = useState("");
  const [modal, setModal] = useState(null);

  function notify(message) {
    setToast(message);
    window.setTimeout(() => setToast(""), 3200);
  }

  function issueBook(studentId, copyBarcode, durationDays = 14, notes = "") {
    const student = data.students.find((s) => s.id.toLowerCase() === studentId.trim().toLowerCase());
    const copy = data.copies.find((c) => c.barcode.toLowerCase() === copyBarcode.trim().toLowerCase());
    const book = copy ? data.books.find((b) => b.id === copy.bookId) : null;

    const errors = [];
    if (!student) errors.push("Student record not found");
    if (!copy) errors.push("Book copy barcode not found");
    if (student && student.status === "Blocked") errors.push("Student account is blocked due to outstanding fines or policy violations");
    if (student && student.activeLoans >= student.limit) errors.push(`Borrowing limit reached (${student.activeLoans}/${student.limit})`);
    if (copy && copy.status !== "Available") errors.push(`Copy ${copyBarcode} is currently ${copy.status}`);

    if (errors.length > 0) {
      return { ok: false, errors, student, copy, book };
    }

    const today = new Date();
    const issueDateStr = today.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + Number(durationDays));
    const dueDateStr = dueDate.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

    const newLoan = {
      id: `LN-${Date.now().toString().slice(-5)}`,
      studentId: student.id,
      studentName: student.name,
      copyBarcode: copy.barcode,
      bookTitle: book.title,
      issueDate: issueDateStr,
      dueDate: dueDateStr,
      status: "Active",
      renewalsCount: 0,
      overdueDays: 0,
      notes,
    };

    const newIssueRecord = {
      studentId: student.id,
      studentName: student.name,
      title: book.title,
      barcode: copy.barcode,
      time: "Just now",
    };

    setData((current) => ({
      ...current,
      stats: {
        ...current.stats,
        availableCopies: Math.max(0, current.stats.availableCopies - 1),
        issuedBooks: current.stats.issuedBooks + 1,
      },
      copies: current.copies.map((c) => (c.barcode === copy.barcode ? { ...c, status: "Issued" } : c)),
      books: current.books.map((b) => (b.id === book.id ? { ...b, available: Math.max(0, b.available - 1) } : b)),
      students: current.students.map((s) => (s.id === student.id ? { ...s, activeLoans: s.activeLoans + 1, totalBorrowed: s.totalBorrowed + 1 } : s)),
      loans: [newLoan, ...current.loans],
      recentIssues: [newIssueRecord, ...current.recentIssues.slice(0, 7)],
      activityLog: [`Issued ${copy.barcode} (${book.title}) to ${student.name}`, ...current.activityLog.slice(0, 15)],
    }));

    notify(`Book "${book.title}" successfully issued to ${student.name}!`);
    return { ok: true, student, copy, book, loan: newLoan };
  }

  function returnBook(copyBarcode, condition = "Good", notes = "") {
    const copy = data.copies.find((c) => c.barcode.toLowerCase() === copyBarcode.trim().toLowerCase());
    if (!copy) return { ok: false, errors: ["Copy barcode not found in inventory"] };

    const activeLoan = data.loans.find((l) => l.copyBarcode.toLowerCase() === copy.barcode.toLowerCase() && (l.status === "Active" || l.status === "Overdue"));
    const book = data.books.find((b) => b.id === copy.bookId);
    const student = activeLoan ? data.students.find((s) => s.id === activeLoan.studentId) : null;

    let damageFee = 0;
    if (condition === "Damaged") damageFee = 20;
    if (condition === "Lost") damageFee = 50;

    let overdueFee = 0;
    if (activeLoan && activeLoan.overdueDays > 0) {
      overdueFee = activeLoan.overdueDays * 2; // $2/day
    }

    const totalFee = damageFee + overdueFee;
    const today = new Date();
    const returnTimeStr = today.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const newReturnRecord = {
      studentId: student ? student.id : "Desk",
      studentName: student ? student.name : "Walk-in",
      title: book ? book.title : copy.bookTitle || copyBarcode,
      condition,
      time: returnTimeStr,
      fine: totalFee,
    };

    let newFineObj = null;
    if (totalFee > 0 && student) {
      newFineObj = {
        id: `F-${Date.now().toString().slice(-4)}`,
        studentId: student.id,
        studentName: student.name,
        book: book ? book.title : copy.bookTitle || "Library Material",
        days: activeLoan ? activeLoan.overdueDays : 0,
        amount: totalFee,
        reason: damageFee > 0 ? `Material ${condition} fee + overdue ($${totalFee})` : `${activeLoan.overdueDays} days overdue`,
        status: "Unpaid",
        date: today.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      };
    }

    setData((current) => {
      const nextCopies = current.copies.map((c) =>
        c.barcode === copy.barcode
          ? {
              ...c,
              status: condition === "Lost" ? "Lost" : condition === "Damaged" ? "Maintenance" : "Available",
              condition,
            }
          : c
      );

      const nextBooks = current.books.map((b) => {
        if (book && b.id === book.id) {
          const addAvail = condition === "Good" || condition === "Excellent" ? 1 : 0;
          return { ...b, available: Math.min(b.copies, b.available + addAvail) };
        }
        return b;
      });

      const nextLoans = current.loans.map((l) =>
        activeLoan && l.id === activeLoan.id
          ? { ...l, status: "Returned", returnCondition: condition, returnDate: today.toISOString() }
          : l
      );

      const nextStudents = student
        ? current.students.map((s) =>
            s.id === student.id
              ? {
                  ...s,
                  activeLoans: Math.max(0, s.activeLoans - 1),
                  fine: s.fine + totalFee,
                  status: s.fine + totalFee > 20 ? "Blocked" : s.status,
                }
              : s
          )
        : current.students;

      const nextFines = newFineObj ? [newFineObj, ...current.fines] : current.fines;

      return {
        ...current,
        stats: {
          ...current.stats,
          availableCopies: condition === "Good" || condition === "Excellent" ? current.stats.availableCopies + 1 : current.stats.availableCopies,
          issuedBooks: Math.max(0, current.stats.issuedBooks - 1),
          overdueItems: activeLoan && activeLoan.status === "Overdue" ? Math.max(0, current.stats.overdueItems - 1) : current.stats.overdueItems,
          pendingFines: current.stats.pendingFines + totalFee,
        },
        copies: nextCopies,
        books: nextBooks,
        loans: nextLoans,
        students: nextStudents,
        fines: nextFines,
        recentReturns: [newReturnRecord, ...current.recentReturns.slice(0, 7)],
        activityLog: [`Returned ${copy.barcode} (${book ? book.title : "Book"}) [${condition}]`, ...current.activityLog.slice(0, 15)],
      };
    });

    notify(`Copy ${copyBarcode} returned (${condition})${totalFee > 0 ? ` — $${totalFee} fine applied` : ""}`);
    return { ok: true, copy, book, student, fee: totalFee };
  }

  function renewLoan(loanId, extraDays = 14) {
    const loan = data.loans.find((l) => l.id === loanId);
    if (!loan) return { ok: false, errors: ["Loan record not found"] };
    if (loan.status === "Returned") return { ok: false, errors: ["Loan has already been returned"] };
    if (loan.renewalsCount >= 2) return { ok: false, errors: ["Maximum renewals (2) exceeded for this loan"] };

    const currDue = new Date(loan.dueDate);
    const validDate = isNaN(currDue.getTime()) ? new Date() : currDue;
    validDate.setDate(validDate.getDate() + extraDays);
    const newDueDateStr = validDate.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

    setData((current) => ({
      ...current,
      loans: current.loans.map((l) =>
        l.id === loanId
          ? {
              ...l,
              dueDate: newDueDateStr,
              renewalsCount: l.renewalsCount + 1,
              status: "Active",
              overdueDays: 0,
            }
          : l
      ),
      activityLog: [`Renewed loan ${loanId} for ${loan.studentName} (+${extraDays} days)`, ...current.activityLog.slice(0, 15)],
    }));

    notify(`Loan extended by ${extraDays} days (New due: ${newDueDateStr})`);
    return { ok: true, newDueDate: newDueDateStr };
  }

  function addBook(bookForm) {
    if (!bookForm.title || !bookForm.isbn) {
      return { ok: false, errors: ["Title and ISBN are mandatory"] };
    }
    if (data.books.some((b) => b.isbn === bookForm.isbn.trim())) {
      return { ok: false, errors: ["A book with this ISBN already exists in the catalog"] };
    }

    const copiesCount = Math.max(1, Number(bookForm.copies) || 1);
    const newBookId = `B-${Date.now().toString().slice(-4)}`;
    const newBook = {
      id: newBookId,
      title: bookForm.title.trim(),
      isbn: bookForm.isbn.trim(),
      author: bookForm.author?.trim() || "Unknown Author",
      publisher: bookForm.publisher?.trim() || "Academic Press",
      category: bookForm.category || "General",
      edition: bookForm.edition || "1st Edition",
      year: bookForm.year || "2024",
      copies: copiesCount,
      available: copiesCount,
      shelf: bookForm.shelf || "CS-01",
      rack: bookForm.rack || "Rack A",
      shelfNo: bookForm.shelfNo || "Shelf 01",
      description: bookForm.description || "Archival catalog entry.",
    };

    const newCopies = Array.from({ length: copiesCount }, (_, i) => ({
      barcode: `CP-${Math.floor(10000 + Math.random() * 90000)}`,
      bookId: newBookId,
      bookTitle: newBook.title,
      status: "Available",
      shelf: newBook.shelf,
      condition: "Excellent",
      acquired: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
    }));

    setData((current) => ({
      ...current,
      stats: {
        ...current.stats,
        totalCatalog: current.stats.totalCatalog + 1,
        availableCopies: current.stats.availableCopies + copiesCount,
      },
      books: [newBook, ...current.books],
      copies: [...newCopies, ...current.copies],
      activityLog: [`Cataloged new book "${newBook.title}" (${copiesCount} copies)`, ...current.activityLog.slice(0, 15)],
    }));

    notify(`Book "${newBook.title}" added with ${copiesCount} physical copies!`);
    return { ok: true, book: newBook };
  }

  function addCopy(copyForm) {
    if (!copyForm.barcode || !copyForm.bookId) {
      return { ok: false, errors: ["Barcode and target book are required"] };
    }
    if (data.copies.some((c) => c.barcode.toLowerCase() === copyForm.barcode.trim().toLowerCase())) {
      return { ok: false, errors: ["Barcode already exists in inventory"] };
    }

    const book = data.books.find((b) => b.id === copyForm.bookId);
    const newCopy = {
      barcode: copyForm.barcode.trim(),
      bookId: copyForm.bookId,
      bookTitle: book ? book.title : "Library Material",
      status: copyForm.status || "Available",
      shelf: copyForm.shelf || (book ? book.shelf : "Unassigned"),
      condition: copyForm.condition || "Excellent",
      acquired: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
    };

    setData((current) => ({
      ...current,
      stats: {
        ...current.stats,
        availableCopies: newCopy.status === "Available" ? current.stats.availableCopies + 1 : current.stats.availableCopies,
      },
      copies: [newCopy, ...current.copies],
      books: current.books.map((b) =>
        b.id === copyForm.bookId
          ? {
              ...b,
              copies: b.copies + 1,
              available: newCopy.status === "Available" ? b.available + 1 : b.available,
            }
          : b
      ),
      activityLog: [`Added barcode copy ${newCopy.barcode} to ${book ? book.title : "Book"}`, ...current.activityLog.slice(0, 15)],
    }));

    notify(`Copy ${newCopy.barcode} added to inventory!`);
    return { ok: true, copy: newCopy };
  }

  function updateCopyStatus(barcode, newStatus, newCondition) {
    setData((current) => {
      const copy = current.copies.find((c) => c.barcode === barcode);
      if (!copy) return current;

      const wasAvailable = copy.status === "Available";
      const willBeAvailable = newStatus === "Available";
      const deltaAvail = willBeAvailable && !wasAvailable ? 1 : !willBeAvailable && wasAvailable ? -1 : 0;

      return {
        ...current,
        stats: {
          ...current.stats,
          availableCopies: current.stats.availableCopies + deltaAvail,
        },
        copies: current.copies.map((c) =>
          c.barcode === barcode
            ? { ...c, status: newStatus || c.status, condition: newCondition || c.condition }
            : c
        ),
        books: current.books.map((b) =>
          b.id === copy.bookId ? { ...b, available: Math.max(0, b.available + deltaAvail) } : b
        ),
        activityLog: [`Updated copy ${barcode} status to ${newStatus}`, ...current.activityLog.slice(0, 15)],
      };
    });
    notify(`Copy ${barcode} updated`);
  }

  function addStudent(studentForm) {
    if (!studentForm.id || !studentForm.name) {
      return { ok: false, errors: ["Student ID and Full Name are mandatory"] };
    }
    if (data.students.some((s) => s.id.toLowerCase() === studentForm.id.trim().toLowerCase())) {
      return { ok: false, errors: ["Student ID already registered"] };
    }

    const newStudent = {
      id: studentForm.id.trim().toUpperCase(),
      name: studentForm.name.trim(),
      department: studentForm.department || "General Studies",
      email: studentForm.email || `${studentForm.id.toLowerCase()}@archive.edu`,
      phone: studentForm.phone || "+1 (555) 000-0000",
      activeLoans: 0,
      limit: 5,
      totalBorrowed: 0,
      fine: 0,
      status: "Active",
      year: studentForm.year || "1st Year UG",
    };

    setData((current) => ({
      ...current,
      students: [newStudent, ...current.students],
      activityLog: [`Registered new student ${newStudent.name} (${newStudent.id})`, ...current.activityLog.slice(0, 15)],
    }));

    notify(`Student profile for ${newStudent.name} created!`);
    return { ok: true, student: newStudent };
  }

  function updateStudentStatus(studentId, newStatus) {
    setData((current) => ({
      ...current,
      students: current.students.map((s) => (s.id === studentId ? { ...s, status: newStatus } : s)),
      activityLog: [`Updated student ${studentId} status to ${newStatus}`, ...current.activityLog.slice(0, 15)],
    }));
    notify(`Student ${studentId} status updated to ${newStatus}`);
  }

  function updateReservation(id, newStatus) {
    setData((current) => ({
      ...current,
      reservations: current.reservations.map((r) => (r.id === id ? { ...r, status: newStatus } : r)),
      activityLog: [`Reservation ${id} updated to ${newStatus}`, ...current.activityLog.slice(0, 15)],
    }));
    notify(`Reservation ${id} set to ${newStatus}`);
  }

  function collectFine(fineId, paymentMethod = "Cash") {
    const fine = data.fines.find((f) => f.id === fineId);
    if (!fine || fine.status === "Paid") return { ok: false, errors: ["Invalid fine or already paid"] };

    setData((current) => ({
      ...current,
      stats: {
        ...current.stats,
        pendingFines: Math.max(0, current.stats.pendingFines - fine.amount),
      },
      fines: current.fines.map((f) => (f.id === fineId ? { ...f, status: "Paid", paymentMethod } : f)),
      students: current.students.map((s) =>
        s.id === fine.studentId
          ? {
              ...s,
              fine: Math.max(0, s.fine - fine.amount),
              status: s.fine - fine.amount <= 20 && s.status === "Blocked" ? "Active" : s.status,
            }
          : s
      ),
      activityLog: [`Collected $${fine.amount} fine from ${fine.studentName} via ${paymentMethod}`, ...current.activityLog.slice(0, 15)],
    }));

    notify(`Fine of $${fine.amount} collected for ${fine.studentName}`);
    return { ok: true, fine };
  }

  function waiveFine(fineId, reason = "Administrative waiver") {
    const fine = data.fines.find((f) => f.id === fineId);
    if (!fine) return { ok: false, errors: ["Fine record not found"] };

    setData((current) => ({
      ...current,
      stats: {
        ...current.stats,
        pendingFines: Math.max(0, current.stats.pendingFines - fine.amount),
      },
      fines: current.fines.map((f) => (f.id === fineId ? { ...f, status: "Waived", waiveReason: reason } : f)),
      students: current.students.map((s) =>
        s.id === fine.studentId
          ? {
              ...s,
              fine: Math.max(0, s.fine - fine.amount),
              status: s.fine - fine.amount <= 20 && s.status === "Blocked" ? "Active" : s.status,
            }
          : s
      ),
      activityLog: [`Waived $${fine.amount} fine for ${fine.studentName} (${reason})`, ...current.activityLog.slice(0, 15)],
    }));

    notify(`Fine for ${fine.studentName} waived (${reason})`);
    return { ok: true };
  }

  function addShelf(shelfForm) {
    if (!shelfForm.id || !shelfForm.section) {
      return { ok: false, errors: ["Shelf code and section name are required"] };
    }
    if (data.shelves.some((s) => s.id === shelfForm.id.trim())) {
      return { ok: false, errors: ["Shelf code already exists"] };
    }

    const newShelf = {
      id: shelfForm.id.trim(),
      section: shelfForm.section.trim(),
      capacity: Number(shelfForm.capacity) || 50,
      occupied: 0,
      rack: shelfForm.rack || "Rack A",
      booksCount: 0,
      floor: shelfForm.floor || "Level 1",
    };

    setData((current) => ({
      ...current,
      shelves: [...current.shelves, newShelf],
      activityLog: [`Created new shelf location ${newShelf.id} (${newShelf.section})`, ...current.activityLog.slice(0, 15)],
    }));

    notify(`Shelf ${newShelf.id} configured!`);
    return { ok: true, shelf: newShelf };
  }

  const value = useMemo(
    () => ({
      data,
      toast,
      modal,
      setModal,
      notify,
      issueBook,
      returnBook,
      renewLoan,
      addBook,
      addCopy,
      updateCopyStatus,
      addStudent,
      updateStudentStatus,
      updateReservation,
      collectFine,
      waiveFine,
      addShelf,
    }),
    [data, toast, modal]
  );

  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>;
}

export function useLibrary() {
  return useContext(LibraryContext);
}
