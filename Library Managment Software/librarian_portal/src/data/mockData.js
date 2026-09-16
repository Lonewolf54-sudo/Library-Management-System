export const students = [
  { id: "ST-8821", name: "Alex Morgan", status: "Active", loans: 2, limit: 5, fine: 0, department: "Computer Science" },
  { id: "ST-1094", name: "Nina Patel", status: "Active", loans: 5, limit: 5, fine: 12, department: "Economics" },
  { id: "ST-4432", name: "Omar Reed", status: "Active", loans: 1, limit: 5, fine: 0, department: "Literature" },
  { id: "ST-9218", name: "Maya Sen", status: "Active", loans: 3, limit: 5, fine: 10, department: "Chemistry" },
];

export const books = [
  { id: "B-1001", title: "Deep Learning with PyTorch", isbn: "978-5270297498", category: "STEM", copies: 12 },
  { id: "B-1002", title: "Principles of Macroeconomics", isbn: "978-3830929333", category: "Business", copies: 8 },
  { id: "B-1003", title: "The Great Gatsby Legacy", isbn: "978-1801396839", category: "Arts", copies: 5 },
  { id: "B-1004", title: "Organic Chemistry Vol. 2", isbn: "978-1260149923", category: "Science", copies: 9 },
  { id: "B-1005", title: "Digital Circuitry", isbn: "978-7719052270", category: "Engineering", copies: 14 },
];

export const copies = [
  { id: "CP-20491", barcode: "CP-20491", bookId: "B-1001", shelf: "STEM-A2", condition: "Excellent", status: "Available" },
  { id: "CP-11842", barcode: "CP-11842", bookId: "B-1004", shelf: "SCI-C4", condition: "Worn", status: "Issued" },
  { id: "CP-70014", barcode: "CP-70014", bookId: "B-1005", shelf: "ENG-E1", condition: "Good", status: "Available" },
];

export const loans = [
  { id: "LN-8821", studentId: "ST-8821", copyId: "CP-11842", issueDate: "2026-08-03", dueDate: "2026-08-15", status: "Active" },
];

export const reservations = [
  { id: "R-1023", studentId: "ST-5529", book: "Quantum Field Theory", status: "Ready for pickup" },
  { id: "R-1024", studentId: "ST-3301", book: "Human Anatomy", status: "Waiting #3" },
  { id: "R-1025", studentId: "ST-9218", book: "Digital Circuitry", status: "Expires today" },
];

export const fines = [
  { id: "F-401", studentId: "ST-9218", book: "Organic Chemistry Vol. 2", reason: "2 days overdue", amount: 10, status: "Pending" },
  { id: "F-402", studentId: "ST-1094", book: "Macroeconomics", reason: "Damaged jacket", amount: 18, status: "Pending" },
];
