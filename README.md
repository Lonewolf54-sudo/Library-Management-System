# The Archive - University Library Management System

The Archive is a university library management system designed as a connected product ecosystem for students, librarians, and administrators. The project focuses on polished, role-specific interfaces and practical library workflows such as book discovery, issuing, returns, renewals, reservations, fines, inventory, shelves, reports, and analytics.

## Project Goal

The final system will contain three connected interfaces:

- Student Mobile App
- Librarian Web Portal
- Admin Web Portal

All three interfaces are intended to connect later to a shared backend and database. For now, the project is frontend-first and uses mock/local data so the UI, navigation, workflows, and product logic can be designed before backend integration.

## Current Status

### Student App

Location:

```txt
student_app/
```

Technology:

```txt
Flutter
```

Current focus:

- Student login
- Home screen
- Explore / virtual bookshelf concept
- Book preview and book details flow
- Borrow duration and pickup pass concept
- My Shelf
- Scan screen
- Profile / digital library card

The Student app is intended to be the most immersive interface. Its signature feature is the virtual bookshelf, where students browse books as physical objects rather than as a normal ecommerce-style grid.

### Librarian Portal

Location:

```txt
librarian_portal/
```

Technology:

```txt
React + Vite
React Router
Lucide React icons
Mock frontend state
```

Implemented / in progress:

- Login page
- Dashboard layout
- Dark navy sidebar
- Topbar with global search, quick scan, notifications, and profile menu
- Dashboard cards
- Recent issues and recent returns
- Operational alerts
- Issue Book workflow
- Return Book workflow
- Renewals page
- Books page
- Copies / Inventory page
- Students page
- Reservations page
- Fines page
- Shelves page
- Reports page
- Floating quick action button
- Modal system
- Toast system
- Global frontend state through `LibraryContext`

The Librarian Portal is being shaped as an operational system. It should prioritize speed, clarity, barcode/QR-driven workflows, dense information, and minimal clicks.

### Admin Portal

Location:

```txt
admin_portal/
```

Technology:

```txt
React + Vite
```

The Admin Portal is present as a separate frontend area and is intended to become the control center for users, catalogue, inventory, settings, reports, analytics, announcements, and audit logs.

## Repository Structure

```txt
Library Managment Software/
|
|-- student_app/
|   |-- lib/
|   |-- android/
|   |-- ios/
|   |-- web/
|   |-- test/
|   |-- pubspec.yaml
|   `-- README.md
|
|-- librarian_portal/
|   |-- src/
|   |   |-- components/
|   |   |-- context/
|   |   |-- data/
|   |   |-- layouts/
|   |   |-- pages/
|   |   |-- App.jsx
|   |   |-- main.jsx
|   |   `-- index.css
|   |-- index.html
|   |-- package.json
|   |-- package-lock.json
|   `-- vite.config.js
|
|-- admin_portal/
|   |-- src/
|   |-- index.html
|   |-- package.json
|   |-- package-lock.json
|   `-- vite.config.js
|
|-- reference-ui/
|   `-- extracted UI reference screens and generated designs
|
|-- index.html
|-- app.js
|-- styles.css
`-- README.md
```

The root `index.html`, `app.js`, and `styles.css` are an older static Student prototype. The main Student implementation is now the Flutter app in `student_app/`.

## How To Run

### Run Student Flutter App

Because the original workspace path contains non-ASCII characters, Flutter/Android may fail on Windows when building from the OneDrive Japanese path. A copied ASCII-safe path was also used during development.

Main project path:

```cmd
cd /d "C:\Users\chinm\OneDrive\ドキュメント\Library Managment Software\student_app"
flutter run
```

If Android build fails because of the path, use the ASCII-safe copy:

```cmd
set JAVA_HOME=C:\Program Files\Java\jdk-17
set PATH=%JAVA_HOME%\bin;%PATH%

cd /d C:\Users\chinm\.codex\visualizations\2026\07\28\019fa873-0338-7020-8cc5-63a95ed47d37\student_app
flutter run
```

Check connected devices:

```cmd
flutter devices
```

### Run Librarian Portal

```cmd
cd /d "C:\Users\chinm\OneDrive\ドキュメント\Library Managment Software\librarian_portal"
npm install
npm run dev
```

Default local URL:

```txt
http://127.0.0.1:5180
```

Build:

```cmd
npm run build
```

### Run Admin Portal

```cmd
cd /d "C:\Users\chinm\OneDrive\ドキュメント\Library Managment Software\admin_portal"
npm install
npm run dev
```

If port `5180` is already used by the Librarian Portal, Vite may choose another port automatically.

## Librarian Portal Architecture

The Librarian Portal is structured to be backend-ready.

```txt
librarian_portal/src/
|
|-- components/
|   |-- DataTable.jsx
|   |-- FloatingButton.jsx
|   |-- Modal.jsx
|   |-- Sidebar.jsx
|   |-- StatCard.jsx
|   |-- Toast.jsx
|   `-- Topbar.jsx
|
|-- context/
|   `-- LibraryContext.jsx
|
|-- data/
|   `-- initialData.js
|
|-- layouts/
|   `-- DashboardLayout.jsx
|
|-- pages/
|   |-- Books.jsx
|   |-- Dashboard.jsx
|   |-- Fines.jsx
|   |-- Inventory.jsx
|   |-- IssueBook.jsx
|   |-- Login.jsx
|   |-- Renewals.jsx
|   |-- Reports.jsx
|   |-- Reservations.jsx
|   |-- ReturnBook.jsx
|   |-- Shelves.jsx
|   `-- Students.jsx
|
|-- App.jsx
|-- main.jsx
`-- index.css
```

### Important Frontend Concepts

- `LibraryContext.jsx` manages mock application state.
- Pages read and update shared state through context.
- Issue and return workflows update dashboard counters and records.
- Toasts are used for action feedback.
- Modals are reused for quick scan, notifications, profile, logout, and add-book flows.
- React Router controls page navigation.
- Mock data can later be replaced by backend API calls.

## Core Workflows

### Issue Book

Flow:

```txt
Enter Student ID
Enter Copy Barcode
Load and Validate
Check student eligibility
Check copy availability
Confirm Issue
Update frontend state
Show toast
```

Frontend state updates:

- Copy status becomes `Issued`
- Student active loan count increases
- Available copy count decreases
- Issued book count increases
- Recent issues list updates

### Return Book

Flow:

```txt
Enter Copy Barcode
Select condition
Find Active Loan
Calculate fine or damage charge
Confirm Return
Update frontend state
Show toast
```

Frontend state updates:

- Loan status becomes `Returned`
- Copy status becomes `Available`, `Damaged`, or `Lost`
- Issued book count decreases
- Available copy count increases when condition is good
- Pending fine total increases if damaged or lost

### Reservations

Current frontend behavior:

- View reservation records
- Approve or deny status through state action
- Toast feedback

Planned backend behavior:

- Maintain queue order
- Generate pickup pass
- Expire old reservations
- Hold returned copy for next waiting student

### Fines

Current frontend behavior:

- View fine records
- Collect fine
- Update fine status to paid
- Decrease pending fines
- Show toast

## Design System

The project follows the visual direction established by the generated UI references:

- Dark navy sidebar
- White cards
- Light gray workspace background
- Blue primary actions
- Red urgent alerts
- Yellow warning alerts
- Light blue information alerts
- Thin borders
- Strong headings
- Operational dashboard density for librarian/admin
- Immersive book-focused visuals for student app

Core palette used in the portal:

```css
--navy
--navy-deep
--navy-ink
--paper
--card
--line
--ink
--muted
--green
--amber
--red
--blue
```

## Backend Integration Plan

The frontend is currently mock-data based. To connect a backend later, replace context actions with API service calls.

Suggested API areas:

```txt
auth
students
books
copies
loans
returns
renewals
reservations
fines
shelves
reports
notifications
audit logs
settings
```

Example future endpoints:

```txt
POST /auth/login
GET  /dashboard/stats
GET  /books
POST /books
PATCH /books/:id
GET  /students/:id
GET  /copies/:barcode
POST /loans/issue
POST /loans/return
POST /renewals/:loanId
POST /reservations/:id/approve
POST /reservations/:id/deny
POST /fines/:id/collect
GET  /reports/circulation
```

## Planned Database Concepts

The system should eventually separate book titles from physical copies.

```txt
Book
  |
  | 1 to many
  v
Copy
```

Recommended entities:

- Users
- Students
- Librarians
- Admins
- Books
- Authors
- Publishers
- Categories
- BookAuthors
- BookCategories
- Copies
- Shelves
- Loans
- Reservations
- Fines
- Payments
- Notifications
- Reviews
- ReadingList
- Announcements
- AuditLogs
- Settings

## Development Roadmap

### Phase 1 - Frontend Foundation

- Student app prototype
- Librarian portal layout
- Admin portal foundation
- Shared design direction

### Phase 2 - Librarian Workflows

- Issue Book
- Return Book
- Renewals
- Books
- Copies / Inventory
- Students
- Reservations
- Fines
- Shelves
- Reports

### Phase 3 - Student Experience

- Improve Flutter virtual bookshelf
- Add realistic book pull-out animation
- Add open-book details UI
- Add pickup pass
- Add My Shelf states
- Add notifications and fines

### Phase 4 - Admin Portal

- Dashboard analytics
- Student management
- Librarian management
- Catalogue and inventory oversight
- Settings
- Announcements
- Audit logs

### Phase 5 - Backend

- Authentication
- Database schema
- REST or GraphQL APIs
- Role-based access
- Barcode/QR handling
- Reporting endpoints

### Phase 6 - Integration And Polish

- Connect all frontends to backend
- Add loading, error, and empty states
- Add accessibility improvements
- Add responsive polish
- Add export/report features
- Add final testing

## Notes For Developers

- Keep `Book` and `Copy` separate.
- Do not let the Student app directly issue a physical book without librarian confirmation.
- Use reservation/pickup-pass flow for student requests.
- Librarian workflows should be fast and scanner-friendly.
- Admin screens should be analytical and management-focused.
- Keep branding consistent as `The Archive`.

## Useful Commands

From repository root:

```cmd
git status
```

Run Librarian Portal:

```cmd
cd librarian_portal
npm run dev
```

Build Librarian Portal:

```cmd
cd librarian_portal
npm run build
```

Run Student App:

```cmd
cd student_app
flutter run
```

Run Flutter checks:

```cmd
cd student_app
flutter analyze
flutter test
```

## Project Identity

Name:

```txt
The Archive
```

Short description:

```txt
A polished university library management system with immersive student discovery, operational librarian workflows, and admin analytics.
```

