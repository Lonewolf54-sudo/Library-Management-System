import { books, copies, fines, loans, reservations, students } from "../data/mockData.js";
import { mockResponse } from "./client.js";

const today = new Date("2026-08-17T00:00:00");

export async function getDashboardStats() {
  return mockResponse({
    totalCatalog: 42850,
    availableCopies: 31204,
    issuedBooks: 11646,
    dueToday: 142,
    overdueItems: 58,
    activeReservations: 24,
    pendingFines: 1480,
  });
}

export async function getStudentById(studentId) {
  return mockResponse(students.find((student) => student.id.toLowerCase() === studentId.toLowerCase()) || null);
}

export async function getCopyByBarcode(barcode) {
  const copy = copies.find((item) => item.barcode.toLowerCase() === barcode.toLowerCase());
  if (!copy) return mockResponse(null);
  return mockResponse({ ...copy, book: books.find((book) => book.id === copy.bookId) });
}

export async function validateIssue({ student, copy }) {
  const errors = [];
  if (!student) errors.push("Student was not found.");
  if (!copy) errors.push("Copy barcode was not found.");
  if (student?.status !== "Active") errors.push("Student membership is not active.");
  if (student && student.loans >= student.limit) errors.push("Borrowing limit has been reached.");
  if (student?.fine > 50) errors.push("Student has blocking fines.");
  if (copy && copy.status !== "Available") errors.push("Copy is not currently available.");
  return mockResponse({ ok: errors.length === 0, errors });
}

export async function createLoan({ student, copy }) {
  return mockResponse({
    id: `LN-${Math.floor(Math.random() * 9000 + 1000)}`,
    studentId: student.id,
    copyId: copy.id,
    issueDate: "2026-08-17",
    dueDate: "2026-08-31",
    status: "Active",
  });
}

export async function getActiveLoanByCopy(barcode) {
  const copy = copies.find((item) => item.barcode.toLowerCase() === barcode.toLowerCase());
  if (!copy) return mockResponse(null);
  const loan = loans.find((item) => item.copyId === copy.id && item.status === "Active");
  if (!loan) return mockResponse(null);
  return mockResponse({
    ...loan,
    copy,
    book: books.find((book) => book.id === copy.bookId),
    student: students.find((student) => student.id === loan.studentId),
  });
}

export async function calculateFine(loan) {
  if (!loan) return mockResponse(null);
  const due = new Date(`${loan.dueDate}T00:00:00`);
  const overdueDays = Math.max(0, Math.round((today - due) / 86400000));
  return mockResponse({ overdueDays, amount: overdueDays * 5 });
}

export async function returnLoan({ loan, condition }) {
  return mockResponse({ loanId: loan.id, returnedAt: "2026-08-17", condition, status: "Returned" });
}

export async function getTableData(type) {
  const map = { books, copies, students, reservations, fines };
  return mockResponse(map[type] || []);
}
