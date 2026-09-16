import 'package:flutter/material.dart';

void main() {
  runApp(const AthenaeumStudentApp());
}

class AthenaeumStudentApp extends StatelessWidget {
  const AthenaeumStudentApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'The Archive',
      theme: ThemeData(
        useMaterial3: true,
        scaffoldBackgroundColor: AppColors.paper,
        colorScheme: ColorScheme.fromSeed(
          seedColor: AppColors.gold,
          brightness: Brightness.light,
          surface: AppColors.paper,
        ),
        fontFamily: 'Georgia',
      ),
      home: const StudentShell(),
    );
  }
}

class AppColors {
  static const paper = Color(0xfffbf8f3);
  static const paperDeep = Color(0xfff0ebe3);
  static const ink = Color(0xff111112);
  static const muted = Color(0xff68686f);
  static const line = Color(0xffd9d4cb);
  static const gold = Color(0xffd8ad2e);
  static const goldDark = Color(0xff735c00);
  static const mahogany = Color(0xff402819);
  static const navy = Color(0xff172436);
}

class LibraryBook {
  const LibraryBook({
    required this.id,
    required this.title,
    required this.spine,
    required this.author,
    required this.category,
    required this.shelfCode,
    required this.rack,
    required this.shelfLocation,
    required this.copies,
    required this.isbn,
    required this.publisher,
    required this.edition,
    required this.year,
    required this.color,
    required this.textColor,
    required this.height,
    required this.width,
    required this.description,
    this.queue = 0,
    this.dueLabel,
  });

  final String id;
  final String title;
  final String spine;
  final String author;
  final String category;
  final String shelfCode;
  final String rack;
  final String shelfLocation;
  final int copies;
  final String isbn;
  final String publisher;
  final String edition;
  final String year;
  final Color color;
  final Color textColor;
  final double height;
  final double width;
  final String description;
  final int queue;
  final String? dueLabel;
}

const books = <LibraryBook>[
  LibraryBook(
    id: 'algo',
    title: 'Introduction to Algorithms',
    spine: 'Algorithms Vol 1',
    author: 'Thomas H. Cormen',
    category: 'Computer Science',
    shelfCode: 'CS-01',
    rack: 'Rack C',
    shelfLocation: 'Shelf C04',
    copies: 3,
    isbn: '978-0262033848',
    publisher: 'MIT Press',
    edition: 'Third Edition',
    year: '2009',
    color: Color(0xff101112),
    textColor: Color(0xfffff9d9),
    height: 214,
    width: 62,
    dueLabel: '8 days left',
    description:
        'A rigorous reference for algorithms, data structures, graph theory, dynamic programming and computational thinking.',
  ),
  LibraryBook(
    id: 'os',
    title: 'Operating Systems',
    spine: 'Operating Systems',
    author: 'Silberschatz',
    category: 'Computer Science',
    shelfCode: 'CS-01',
    rack: 'Rack B',
    shelfLocation: 'Shelf B12',
    copies: 2,
    isbn: '978-1118063330',
    publisher: 'Wiley',
    edition: 'Ninth Edition',
    year: '2012',
    color: Color(0xff2b4358),
    textColor: Colors.white,
    height: 230,
    width: 70,
    dueLabel: 'Due tomorrow',
    description:
        'Process management, memory, storage, protection and distributed systems for serious operating-system study.',
  ),
  LibraryBook(
    id: 'clean',
    title: 'Clean Architecture',
    spine: 'Clean Architecture',
    author: 'Robert C. Martin',
    category: 'Computer Science',
    shelfCode: 'CS-01',
    rack: 'Rack A',
    shelfLocation: 'Shelf A03',
    copies: 1,
    isbn: '978-0134494166',
    publisher: 'Pearson',
    edition: 'First Edition',
    year: '2017',
    color: Color(0xfffffde2),
    textColor: Color(0xff151515),
    height: 196,
    width: 54,
    dueLabel: '12 days left',
    description:
        'Design principles for maintainable software systems, boundaries, components and long-lived architecture choices.',
  ),
  LibraryBook(
    id: 'ai',
    title: 'Artificial Intelligence',
    spine: 'Artificial Intelligence',
    author: 'Russell & Norvig',
    category: 'AI',
    shelfCode: 'AI-04',
    rack: 'Rack C',
    shelfLocation: 'Shelf 04',
    copies: 0,
    isbn: '978-0134610993',
    publisher: 'Pearson',
    edition: 'Fourth Edition',
    year: '2020',
    color: Color(0xff050505),
    textColor: Color(0xfffff8d0),
    height: 230,
    width: 72,
    queue: 3,
    description:
        'The classic survey of intelligent agents, search, logic, uncertainty, learning, NLP, perception and robotics.',
  ),
  LibraryBook(
    id: 'deep',
    title: 'Deep Learning',
    spine: 'Deep Learning',
    author: 'Goodfellow',
    category: 'AI',
    shelfCode: 'AI-04',
    rack: 'Rack D',
    shelfLocation: 'Shelf D02',
    copies: 1,
    isbn: '978-0262035613',
    publisher: 'MIT Press',
    edition: 'Adaptive Computation',
    year: '2016',
    color: Color(0xff245735),
    textColor: Colors.white,
    height: 194,
    width: 60,
    description:
        'A modern foundation for neural networks, optimization, sequence modeling and representation learning.',
  ),
  LibraryBook(
    id: 'data',
    title: 'The Silent Data',
    spine: 'Silent Data',
    author: 'Marcus Thorne',
    category: 'Data Science',
    shelfCode: 'DS-02',
    rack: 'Rack F',
    shelfLocation: 'Shelf F07',
    copies: 4,
    isbn: '978-0455012201',
    publisher: 'Athenaeum Press',
    edition: 'Student Folio',
    year: '2024',
    color: Color(0xff711013),
    textColor: Color(0xfffff5f0),
    height: 205,
    width: 52,
    description:
        'A practical introduction to interpreting datasets, finding bias and communicating uncertainty with clarity.',
  ),
  LibraryBook(
    id: 'math',
    title: 'A Treatise on Celestial Mechanics',
    spine: 'Celestial Mechanics',
    author: 'E. Halley',
    category: 'Mathematics',
    shelfCode: 'MATH-03',
    rack: 'Rack H',
    shelfLocation: 'Shelf H01',
    copies: 2,
    isbn: '978-0610011304',
    publisher: 'Archive Classics',
    edition: 'Folio Reprint',
    year: '1894',
    color: Color(0xffe8dfbd),
    textColor: Color(0xff17120b),
    height: 218,
    width: 64,
    description:
        'An archival volume on orbital motion, mathematical models and the geometry of celestial systems.',
  ),
];

enum StudentTab { home, explore, scan, loans, profile }

enum BookStage { preview, details, borrow, pickup }

class StudentShell extends StatefulWidget {
  const StudentShell({super.key});

  @override
  State<StudentShell> createState() => _StudentShellState();
}

class _StudentShellState extends State<StudentShell> {
  bool isLoggedIn = false;
  StudentTab tab = StudentTab.home;
  String category = 'All';
  String search = '';
  bool shelfView = true;
  String? selectedBookId;
  BookStage? stage;
  int duration = 14;
  final saved = <String>{'clean'};
  final borrowed = <String>['algo', 'os', 'clean'];

  LibraryBook get selectedBook =>
      books.firstWhere((book) => book.id == selectedBookId);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: AnimatedSwitcher(
        duration: const Duration(milliseconds: 420),
        child: isLoggedIn ? _buildApp() : _buildLogin(),
      ),
    );
  }

  Widget _buildLogin() {
    return Container(
      key: const ValueKey('login'),
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: [Color(0xffd8c2a2), AppColors.paper],
        ),
      ),
      child: SafeArea(
        child: LayoutBuilder(
          builder: (context, constraints) {
            return SingleChildScrollView(
              child: ConstrainedBox(
                constraints: BoxConstraints(minHeight: constraints.maxHeight),
                child: Padding(
                  padding: const EdgeInsets.all(24),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const CircleAvatar(
                        radius: 42,
                        backgroundColor: Colors.black,
                        child: Icon(
                          Icons.account_balance,
                          color: Colors.white,
                          size: 42,
                        ),
                      ),
                      const SizedBox(height: 24),
                      const Text(
                        'The Archive',
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          fontSize: 34,
                          fontWeight: FontWeight.w800,
                          color: AppColors.ink,
                        ),
                      ),
                      const SizedBox(height: 10),
                      const Text(
                        'University Intellectual Archive',
                        style: TextStyle(
                          fontSize: 18,
                          color: Color(0xff4d5667),
                        ),
                      ),
                      const SizedBox(height: 56),
                      Container(
                        padding: const EdgeInsets.all(22),
                        decoration: BoxDecoration(
                          color: Colors.white.withValues(alpha: 0.9),
                          borderRadius: BorderRadius.circular(18),
                          boxShadow: const [
                            BoxShadow(
                              color: Color(0x22000000),
                              blurRadius: 32,
                              offset: Offset(0, 16),
                            ),
                          ],
                        ),
                        child: Column(
                          children: [
                            _TextFieldBlock(
                              label: 'Registration / Email',
                              icon: Icons.person_outline,
                              value: '24-STUD-8902',
                            ),
                            const SizedBox(height: 18),
                            _TextFieldBlock(
                              label: 'Password',
                              icon: Icons.lock_outline,
                              value: 'archive',
                              obscure: true,
                            ),
                            const SizedBox(height: 14),
                            Row(
                              children: [
                                Checkbox(value: false, onChanged: (_) {}),
                                const Expanded(child: Text('Remember me')),
                                TextButton(
                                  onPressed: () {},
                                  child: const Text('Forgot Password?'),
                                ),
                              ],
                            ),
                            const SizedBox(height: 20),
                            _PrimaryButton(
                              label: 'Login to Archive',
                              icon: Icons.arrow_forward,
                              onPressed: () =>
                                  setState(() => isLoggedIn = true),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            );
          },
        ),
      ),
    );
  }

  Widget _buildApp() {
    return Stack(
      key: const ValueKey('app'),
      children: [
        Column(
          children: [
            const _ArchiveTopBar(),
            Expanded(child: _currentScreen()),
          ],
        ),
        Align(alignment: Alignment.bottomCenter, child: _bottomNav()),
        if (stage != null) _bookOverlay(),
      ],
    );
  }

  Widget _currentScreen() {
    return switch (tab) {
      StudentTab.home => _homeScreen(),
      StudentTab.explore => _exploreScreen(),
      StudentTab.scan => _scanScreen(),
      StudentTab.loans => _myShelfScreen(),
      StudentTab.profile => _profileScreen(),
    };
  }

  Widget _homeScreen() {
    final loanBooks = borrowed.map(_bookById).toList();
    return _ScrollPage(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const _Greeting(),
          const SizedBox(height: 18),
          const _MetricCard(label: 'Currently Borrowed', value: '3'),
          const _MetricCard(
            label: 'Due Soon',
            value: '1',
            accent: AppColors.goldDark,
          ),
          const _MetricCard(
            label: 'Outstanding Fines',
            value: '₹0',
            accent: AppColors.line,
          ),
          _SectionHeader(
            title: 'My Shelf',
            action: 'View All',
            onTap: () => setState(() => tab = StudentTab.loans),
          ),
          SizedBox(
            height: 190,
            child: ListView.separated(
              scrollDirection: Axis.horizontal,
              itemCount: loanBooks.length,
              separatorBuilder: (_, __) => const SizedBox(width: 12),
              itemBuilder: (_, index) => _MiniBookCard(
                book: loanBooks[index],
                onTap: () => _showBook(loanBooks[index], BookStage.preview),
              ),
            ),
          ),
          const _SectionHeader(title: 'Recommended For You'),
          _RecommendationTile(book: _bookById('data'), onTap: _showPreview),
          _RecommendationTile(book: _bookById('deep'), onTap: _showPreview),
          const _SectionHeader(title: 'Popular This Week'),
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(18),
            decoration: BoxDecoration(
              color: Colors.black,
              borderRadius: BorderRadius.circular(8),
            ),
            child: const Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'HOT IN THE ARCHIVE',
                  style: TextStyle(color: AppColors.gold, fontSize: 11),
                ),
                SizedBox(height: 8),
                Text(
                  'Post-Modern\nAesthetics in\nDigital Spaces',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 28,
                    height: 1.05,
                    fontWeight: FontWeight.w700,
                  ),
                ),
                SizedBox(height: 8),
                Text(
                  '42 students reading',
                  style: TextStyle(color: Colors.white70),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _exploreScreen() {
    final categories = [
      'All',
      'Computer Science',
      'AI',
      'Data Science',
      'Mathematics',
    ];
    final visible = _filteredBooks();
    final groupedCategories = categories
        .where((item) => item != 'All')
        .map(
          (item) => MapEntry(
            item,
            visible.where((book) => book.category == item).toList(),
          ),
        )
        .where((entry) => entry.value.isNotEmpty)
        .toList();

    return _ScrollPage(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          TextField(
            onChanged: (value) => setState(() => search = value),
            decoration: InputDecoration(
              hintText: 'Search title, author, ISBN...',
              prefixIcon: const Icon(Icons.search),
              filled: true,
              fillColor: Colors.white,
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(0),
              ),
            ),
          ),
          const SizedBox(height: 16),
          SizedBox(
            height: 44,
            child: ListView.separated(
              scrollDirection: Axis.horizontal,
              itemCount: categories.length,
              separatorBuilder: (_, __) => const SizedBox(width: 10),
              itemBuilder: (_, index) {
                final item = categories[index];
                return ChoiceChip(
                  label: Text(item.toUpperCase()),
                  selected: category == item,
                  selectedColor: Colors.black,
                  labelStyle: TextStyle(
                    color: category == item ? Colors.white : AppColors.ink,
                    fontWeight: FontWeight.w800,
                    fontSize: 12,
                  ),
                  onSelected: (_) => setState(() {
                    category = item;
                    selectedBookId = null;
                  }),
                );
              },
            ),
          ),
          const SizedBox(height: 14),
          SegmentedButton<bool>(
            segments: const [
              ButtonSegment(
                value: true,
                label: Text('Shelf View'),
                icon: Icon(Icons.view_agenda),
              ),
              ButtonSegment(
                value: false,
                label: Text('List View'),
                icon: Icon(Icons.list),
              ),
            ],
            selected: {shelfView},
            onSelectionChanged: (value) =>
                setState(() => shelfView = value.first),
          ),
          const SizedBox(height: 18),
          if (shelfView)
            ...groupedCategories.map(
              (entry) => _ShelfSection(
                category: entry.key,
                books: entry.value,
                search: search,
                selectedBookId: selectedBookId,
                onSelect: _handleShelfTap,
              ),
            )
          else
            ...visible.map(
              (book) => _RecommendationTile(book: book, onTap: _showPreview),
            ),
        ],
      ),
    );
  }

  Widget _myShelfScreen() {
    final loanBooks = borrowed.map(_bookById).toList();
    return _ScrollPage(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'MY LIBRARY',
            style: TextStyle(
              color: AppColors.goldDark,
              fontSize: 12,
              fontWeight: FontWeight.w800,
              letterSpacing: 1.6,
            ),
          ),
          const SizedBox(height: 8),
          const Text(
            'Your Personal Shelf',
            style: TextStyle(fontSize: 34, fontWeight: FontWeight.w800),
          ),
          const SizedBox(height: 20),
          _ShelfWood(
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.end,
              children: loanBooks
                  .map(
                    (book) => Padding(
                      padding: const EdgeInsets.only(right: 8),
                      child: Stack(
                        clipBehavior: Clip.none,
                        alignment: Alignment.topCenter,
                        children: [
                          _BookSpine(
                            book: book,
                            selected: false,
                            dimmed: false,
                            bestMatch: false,
                            onTap: () => _showPreview(book),
                          ),
                          Positioned(
                            top: -16,
                            child: Container(
                              padding: const EdgeInsets.symmetric(
                                horizontal: 8,
                                vertical: 6,
                              ),
                              color: AppColors.gold,
                              child: Text(
                                book.dueLabel ?? 'On loan',
                                style: const TextStyle(
                                  fontSize: 10,
                                  fontWeight: FontWeight.w900,
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  )
                  .toList(),
            ),
          ),
          const _SectionHeader(title: 'Borrowing History'),
          ...loanBooks.map(
            (book) => _RecommendationTile(book: book, onTap: _showPreview),
          ),
        ],
      ),
    );
  }

  Widget _scanScreen() {
    return _ScrollPage(
      child: Container(
        width: double.infinity,
        padding: const EdgeInsets.all(28),
        decoration: _paperPanel(),
        child: Column(
          children: [
            const Icon(Icons.qr_code_scanner, size: 92),
            const SizedBox(height: 20),
            const Text(
              'Scan Physical Book',
              style: TextStyle(fontSize: 30, fontWeight: FontWeight.w800),
            ),
            const SizedBox(height: 12),
            const Text(
              'Scan a shelf QR or copy barcode. The recognized book expands into the floating/open-book interface.',
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 24),
            _PrimaryButton(
              label: 'Demo Scan',
              icon: Icons.auto_awesome_motion,
              onPressed: () => _showPreview(_bookById('algo')),
            ),
          ],
        ),
      ),
    );
  }

  Widget _profileScreen() {
    return _ScrollPage(
      child: Column(
        children: [
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(24),
            decoration: _paperPanel(),
            child: const Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'ATHENAEUM DIGITAL',
                  style: TextStyle(
                    color: AppColors.goldDark,
                    fontWeight: FontWeight.w900,
                    letterSpacing: 1.4,
                  ),
                ),
                SizedBox(height: 16),
                Text(
                  'Alex Morgan',
                  style: TextStyle(fontSize: 34, fontWeight: FontWeight.w800),
                ),
                Text(
                  '24-STUD-8902\nComputer Science - Year 3\nActive Member',
                ),
                SizedBox(height: 24),
                Center(child: _QrMark(size: 140)),
              ],
            ),
          ),
          const SizedBox(height: 14),
          _SecondaryButton(label: 'Change Password', onPressed: () {}),
          const SizedBox(height: 10),
          _SecondaryButton(
            label: 'Logout',
            onPressed: () => setState(() => isLoggedIn = false),
          ),
        ],
      ),
    );
  }

  Widget _bottomNav() {
    return Container(
      height: 78,
      decoration: const BoxDecoration(
        color: Color(0xf4fbf8f3),
        border: Border(top: BorderSide(color: AppColors.line)),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: [
          _NavItem(
            icon: Icons.home_outlined,
            label: 'Home',
            active: tab == StudentTab.home,
            onTap: () => _setTab(StudentTab.home),
          ),
          _NavItem(
            icon: Icons.explore_outlined,
            label: 'Explore',
            active: tab == StudentTab.explore,
            onTap: () => _setTab(StudentTab.explore),
          ),
          _NavItem(
            icon: Icons.qr_code_scanner,
            label: 'Scan',
            active: tab == StudentTab.scan,
            raised: true,
            onTap: () => _setTab(StudentTab.scan),
          ),
          _NavItem(
            icon: Icons.library_books_outlined,
            label: 'Loans',
            active: tab == StudentTab.loans,
            onTap: () => _setTab(StudentTab.loans),
          ),
          _NavItem(
            icon: Icons.person_outline,
            label: 'Profile',
            active: tab == StudentTab.profile,
            onTap: () => _setTab(StudentTab.profile),
          ),
        ],
      ),
    );
  }

  Widget _bookOverlay() {
    final book = selectedBook;
    return AnimatedSwitcher(
      duration: const Duration(milliseconds: 360),
      child: switch (stage) {
        BookStage.preview => _FloatingPreview(
            key: const ValueKey('preview'),
            book: book,
            saved: saved.contains(book.id),
            onClose: _closeOverlay,
            onOpen: () => setState(() => stage = BookStage.details),
            onSave: () => _toggleSaved(book),
            onFind: () => _showLocation(book),
          ),
        BookStage.details => _OpenBookDetails(
            key: const ValueKey('details'),
            book: book,
            saved: saved.contains(book.id),
            onBack: () => setState(() => stage = BookStage.preview),
            onBorrow: () => setState(() => stage = BookStage.borrow),
            onSave: () => _toggleSaved(book),
            onFind: () => _showLocation(book),
          ),
        BookStage.borrow => _BorrowDuration(
            key: const ValueKey('borrow'),
            book: book,
            duration: duration,
            onBack: () => setState(() => stage = BookStage.details),
            onDuration: (value) => setState(() => duration = value),
            onConfirm: () => setState(() => stage = BookStage.pickup),
          ),
        BookStage.pickup => _PickupPass(
            key: const ValueKey('pickup'),
            book: book,
            onDone: () {
              setState(() {
                if (!borrowed.contains(book.id)) borrowed.insert(0, book.id);
                stage = null;
                tab = StudentTab.loans;
              });
            },
          ),
        null => const SizedBox.shrink(),
      },
    );
  }

  void _setTab(StudentTab value) {
    setState(() {
      tab = value;
      stage = null;
    });
  }

  void _handleShelfTap(LibraryBook book) {
    setState(() {
      if (selectedBookId == book.id) {
        stage = BookStage.preview;
      } else {
        selectedBookId = book.id;
      }
    });
  }

  void _showPreview(LibraryBook book) => _showBook(book, BookStage.preview);

  void _showBook(LibraryBook book, BookStage nextStage) {
    setState(() {
      selectedBookId = book.id;
      stage = nextStage;
    });
  }

  void _closeOverlay() => setState(() => stage = null);

  void _toggleSaved(LibraryBook book) {
    setState(() {
      saved.contains(book.id) ? saved.remove(book.id) : saved.add(book.id);
    });
  }

  void _showLocation(LibraryBook book) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          'Floor 2 -> ${book.category} -> ${book.rack} -> ${book.shelfLocation}',
        ),
      ),
    );
  }

  LibraryBook _bookById(String id) => books.firstWhere((book) => book.id == id);

  List<LibraryBook> _filteredBooks() {
    final term = search.trim().toLowerCase();
    return books.where((book) {
      final categoryMatch = category == 'All' || book.category == category;
      final text =
          '${book.title} ${book.author} ${book.category} ${book.isbn} ${book.publisher}'
              .toLowerCase();
      return categoryMatch && (term.isEmpty || text.contains(term));
    }).toList();
  }
}

class _ArchiveTopBar extends StatelessWidget {
  const _ArchiveTopBar();

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      bottom: false,
      child: Container(
        height: 64,
        padding: const EdgeInsets.symmetric(horizontal: 14),
        decoration: const BoxDecoration(
          color: Color(0xf2fbf8f3),
          border: Border(bottom: BorderSide(color: AppColors.line)),
        ),
        child: Row(
          children: [
            IconButton(onPressed: () {}, icon: const Icon(Icons.menu)),
            const Expanded(
              child: Text(
                'The Archive',
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 34, fontWeight: FontWeight.w800),
              ),
            ),
            const CircleAvatar(
              radius: 19,
              backgroundColor: Color(0xff2c2118),
              child: Text('A', style: TextStyle(color: Colors.white)),
            ),
          ],
        ),
      ),
    );
  }
}

class _ScrollPage extends StatelessWidget {
  const _ScrollPage({required this.child});

  final Widget child;

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.fromLTRB(18, 22, 18, 96),
      children: [child],
    );
  }
}

class _Greeting extends StatelessWidget {
  const _Greeting();

  @override
  Widget build(BuildContext context) {
    return const Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Welcome back,',
          style: TextStyle(
            fontSize: 16,
            fontStyle: FontStyle.italic,
            color: AppColors.muted,
          ),
        ),
        SizedBox(height: 6),
        Text(
          'Good evening,\nAlex',
          style: TextStyle(
            fontSize: 36,
            height: 1.04,
            fontWeight: FontWeight.w800,
          ),
        ),
      ],
    );
  }
}

class _MetricCard extends StatelessWidget {
  const _MetricCard({
    required this.label,
    required this.value,
    this.accent = AppColors.ink,
  });

  final String label;
  final String value;
  final Color accent;

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: 0.58),
        border: Border(left: BorderSide(color: accent, width: 3)),
        boxShadow: const [BoxShadow(color: Color(0x10000000), blurRadius: 18)],
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            label.toUpperCase(),
            style: const TextStyle(
              color: AppColors.muted,
              fontSize: 11,
              fontWeight: FontWeight.w900,
              letterSpacing: 1.1,
            ),
          ),
          Text(
            value,
            style: const TextStyle(fontSize: 28, fontWeight: FontWeight.w800),
          ),
        ],
      ),
    );
  }
}

class _SectionHeader extends StatelessWidget {
  const _SectionHeader({required this.title, this.action, this.onTap});

  final String title;
  final String? action;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(top: 30, bottom: 14),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            title,
            style: const TextStyle(fontSize: 24, fontWeight: FontWeight.w800),
          ),
          if (action != null)
            TextButton(onPressed: onTap, child: Text(action!.toUpperCase())),
        ],
      ),
    );
  }
}

class _MiniBookCard extends StatelessWidget {
  const _MiniBookCard({required this.book, required this.onTap});

  final LibraryBook book;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 128,
      child: InkWell(
        onTap: onTap,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(child: _BookCover(book: book)),
            const SizedBox(height: 8),
            Text(
              book.dueLabel ?? 'On loan',
              maxLines: 1,
              style: const TextStyle(color: AppColors.muted),
            ),
          ],
        ),
      ),
    );
  }
}

class _BookCover extends StatelessWidget {
  const _BookCover({required this.book});

  final LibraryBook book;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: book.color,
        border:
            Border.all(color: book.textColor.withValues(alpha: 0.8), width: 2),
        boxShadow: const [
          BoxShadow(color: Color(0x22000000), offset: Offset(6, 8)),
        ],
      ),
      child: Center(
        child: Text(
          book.title,
          textAlign: TextAlign.center,
          style: TextStyle(
            color: book.textColor,
            fontSize: 17,
            height: 1.12,
            fontWeight: FontWeight.w800,
          ),
        ),
      ),
    );
  }
}

class _RecommendationTile extends StatelessWidget {
  const _RecommendationTile({required this.book, required this.onTap});

  final LibraryBook book;
  final ValueChanged<LibraryBook> onTap;

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      child: Material(
        color: Colors.white.withValues(alpha: 0.72),
        shape: RoundedRectangleBorder(
          side: const BorderSide(color: AppColors.line),
          borderRadius: BorderRadius.circular(8),
        ),
        child: InkWell(
          onTap: () => onTap(book),
          child: Padding(
            padding: const EdgeInsets.all(12),
            child: Row(
              children: [
                Container(width: 54, height: 72, color: book.color),
                const SizedBox(width: 14),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        book.category.toUpperCase(),
                        style: const TextStyle(
                          color: AppColors.goldDark,
                          fontSize: 10,
                          fontWeight: FontWeight.w900,
                          letterSpacing: 1.4,
                        ),
                      ),
                      Text(
                        book.title,
                        style: const TextStyle(fontWeight: FontWeight.w800),
                      ),
                      Text(
                        book.author,
                        style: const TextStyle(color: AppColors.muted),
                      ),
                    ],
                  ),
                ),
                const Icon(Icons.chevron_right),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _ShelfSection extends StatelessWidget {
  const _ShelfSection({
    required this.category,
    required this.books,
    required this.search,
    required this.selectedBookId,
    required this.onSelect,
  });

  final String category;
  final List<LibraryBook> books;
  final String search;
  final String? selectedBookId;
  final ValueChanged<LibraryBook> onSelect;

  @override
  Widget build(BuildContext context) {
    final selected = books.where((book) => book.id == selectedBookId).toList();
    return Padding(
      padding: const EdgeInsets.only(bottom: 28),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                '$category - Shelf ${books.first.shelfCode}'.toUpperCase(),
                style: const TextStyle(
                  color: AppColors.muted,
                  fontWeight: FontWeight.w900,
                  letterSpacing: 1.3,
                ),
              ),
              const Text('...', style: TextStyle(fontWeight: FontWeight.w900)),
            ],
          ),
          const SizedBox(height: 12),
          _ShelfWood(
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.end,
              children: books
                  .map(
                    (book) => Padding(
                      padding: const EdgeInsets.only(right: 8),
                      child: _BookSpine(
                        book: book,
                        selected: selectedBookId == book.id,
                        dimmed: _isDimmed(book),
                        bestMatch: _isBestMatch(book),
                        onTap: () => onSelect(book),
                      ),
                    ),
                  )
                  .toList(),
            ),
          ),
          if (selected.isNotEmpty) ...[
            const SizedBox(height: 12),
            _SelectionNote(book: selected.first),
          ],
        ],
      ),
    );
  }

  bool _isDimmed(LibraryBook book) {
    final term = search.trim().toLowerCase();
    if (term.isEmpty) return false;
    return !'${book.title} ${book.author} ${book.category}'
        .toLowerCase()
        .contains(term);
  }

  bool _isBestMatch(LibraryBook book) {
    final term = search.trim().toLowerCase();
    return term.isNotEmpty && book.title.toLowerCase().contains(term);
  }
}

class _ShelfWood extends StatelessWidget {
  const _ShelfWood({required this.child});

  final Widget child;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 270,
      width: double.infinity,
      padding: const EdgeInsets.fromLTRB(18, 38, 18, 28),
      decoration: BoxDecoration(
        color: AppColors.mahogany,
        border: Border.all(color: const Color(0xff160d08), width: 2),
        boxShadow: const [
          BoxShadow(
            color: Color(0x22000000),
            blurRadius: 22,
            offset: Offset(0, 14),
          ),
        ],
      ),
      child: Stack(
        children: [
          Positioned(
            left: -18,
            right: -18,
            bottom: 0,
            child: Container(height: 18, color: const Color(0xff2a160d)),
          ),
          Align(
            alignment: Alignment.bottomLeft,
            child: SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: child,
            ),
          ),
        ],
      ),
    );
  }
}

class _BookSpine extends StatelessWidget {
  const _BookSpine({
    required this.book,
    required this.selected,
    required this.dimmed,
    required this.bestMatch,
    required this.onTap,
  });

  final LibraryBook book;
  final bool selected;
  final bool dimmed;
  final bool bestMatch;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return AnimatedOpacity(
      duration: const Duration(milliseconds: 260),
      opacity: dimmed ? 0.32 : 1,
      child: AnimatedSlide(
        duration: const Duration(milliseconds: 320),
        curve: Curves.easeOutCubic,
        offset: selected || bestMatch ? const Offset(0.12, -0.05) : Offset.zero,
        child: GestureDetector(
          onTap: onTap,
          child: AnimatedContainer(
            duration: const Duration(milliseconds: 320),
            width: book.width,
            height: book.height,
            decoration: BoxDecoration(
              color: book.color,
              border: Border.all(
                color: selected || bestMatch ? AppColors.gold : Colors.black26,
                width: selected || bestMatch ? 2 : 1,
              ),
              gradient: LinearGradient(
                colors: [
                  Colors.black.withValues(alpha: 0.35),
                  book.color,
                  Colors.white.withValues(alpha: 0.08),
                  book.color,
                ],
              ),
              boxShadow: selected
                  ? const [
                      BoxShadow(
                        color: Color(0x55000000),
                        blurRadius: 16,
                        offset: Offset(10, 12),
                      ),
                    ]
                  : null,
            ),
            child: RotatedBox(
              quarterTurns: 3,
              child: Center(
                child: Text(
                  book.spine.toUpperCase(),
                  textAlign: TextAlign.center,
                  maxLines: 2,
                  style: TextStyle(
                    color: book.textColor,
                    fontWeight: FontWeight.w900,
                    fontSize: 16,
                    letterSpacing: 0.6,
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _SelectionNote extends StatelessWidget {
  const _SelectionNote({required this.book});

  final LibraryBook book;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: 0.74),
        border: Border.all(color: AppColors.line),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            book.title,
            style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w800),
          ),
          Text(book.author, style: const TextStyle(color: AppColors.muted)),
          Text(
            book.copies > 0
                ? 'Available - ${book.copies} copies'
                : 'Currently issued - ${book.queue} students waiting',
            style: const TextStyle(color: AppColors.goldDark),
          ),
        ],
      ),
    );
  }
}

class _FloatingPreview extends StatelessWidget {
  const _FloatingPreview({
    super.key,
    required this.book,
    required this.saved,
    required this.onClose,
    required this.onOpen,
    required this.onSave,
    required this.onFind,
  });

  final LibraryBook book;
  final bool saved;
  final VoidCallback onClose;
  final VoidCallback onOpen;
  final VoidCallback onSave;
  final VoidCallback onFind;

  @override
  Widget build(BuildContext context) {
    return _OverlayBase(
      dimmed: true,
      top: _OverlayTop(onClose: onClose),
      child: Column(
        children: [
          const Spacer(),
          TweenAnimationBuilder<double>(
            tween: Tween(begin: 0, end: 1),
            duration: const Duration(milliseconds: 620),
            curve: Curves.easeOutCubic,
            builder: (_, value, child) => Transform(
              alignment: Alignment.center,
              transform: Matrix4.identity()
                ..setEntry(3, 2, 0.001)
                ..rotateY(-0.28 + (0.28 * value))
                ..rotateZ(0.04),
              child: Opacity(opacity: value, child: child),
            ),
            child: SizedBox(
              width: 235,
              height: 326,
              child: _BookCover(book: book),
            ),
          ),
          const SizedBox(height: 34),
          Text(
            book.title,
            textAlign: TextAlign.center,
            style: const TextStyle(
              fontSize: 36,
              height: 1.02,
              fontWeight: FontWeight.w800,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            book.author,
            style: const TextStyle(fontSize: 20, color: Color(0xff46464d)),
          ),
          const SizedBox(height: 18),
          _AvailabilityPill(book: book),
          const SizedBox(height: 28),
          _PrimaryButton(
            label: 'Open Book',
            icon: Icons.menu_book,
            onPressed: onOpen,
          ),
          const SizedBox(height: 14),
          Row(
            children: [
              Expanded(
                child: _SecondaryButton(
                  label: saved ? 'Remove Bookmark' : 'Save',
                  icon: saved
                      ? Icons.bookmark_remove_outlined
                      : Icons.favorite_border,
                  onPressed: onSave,
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _SecondaryButton(
                  label: 'Find',
                  icon: Icons.location_on_outlined,
                  onPressed: onFind,
                ),
              ),
            ],
          ),
          const Spacer(),
        ],
      ),
    );
  }
}

class _OpenBookDetails extends StatelessWidget {
  const _OpenBookDetails({
    super.key,
    required this.book,
    required this.saved,
    required this.onBack,
    required this.onBorrow,
    required this.onSave,
    required this.onFind,
  });

  final LibraryBook book;
  final bool saved;
  final VoidCallback onBack;
  final VoidCallback onBorrow;
  final VoidCallback onSave;
  final VoidCallback onFind;

  @override
  Widget build(BuildContext context) {
    return _OverlayBase(
      top: _OverlayTop(onClose: onBack, closeIcon: Icons.arrow_back),
      child: ListView(
        padding: const EdgeInsets.fromLTRB(18, 18, 18, 24),
        children: [
          Container(
            padding: const EdgeInsets.all(24),
            decoration: _paperPanel(borderWidth: 2),
            child: Column(
              children: [
                SizedBox(
                  width: 150,
                  height: 208,
                  child: _BookCover(book: book),
                ),
                const SizedBox(height: 20),
                Text(
                  book.title,
                  textAlign: TextAlign.center,
                  style: const TextStyle(
                    fontSize: 40,
                    height: 1.04,
                    fontWeight: FontWeight.w800,
                  ),
                ),
                Text(
                  'By ${book.author}',
                  style: const TextStyle(
                    fontSize: 18,
                    fontStyle: FontStyle.italic,
                  ),
                ),
                const SizedBox(height: 12),
                const Text(
                  '☆ ☆ ☆ ☆ ☆   (4.8 / 5)',
                  style: TextStyle(color: AppColors.goldDark),
                ),
                const SizedBox(height: 18),
                Text(book.description, textAlign: TextAlign.center),
                const SizedBox(height: 22),
                Row(
                  children: [
                    _FactBox(label: 'Collection', value: book.category),
                    const SizedBox(width: 10),
                    _FactBox(label: 'Rack', value: book.rack),
                    const SizedBox(width: 10),
                    _FactBox(label: 'Shelf', value: book.shelfLocation),
                  ],
                ),
                const SizedBox(height: 18),
                _DetailLine(
                  label: 'Availability',
                  value: '${book.copies} Copies',
                ),
                _DetailLine(label: 'ISBN-13', value: book.isbn),
                _DetailLine(label: 'Publisher', value: book.publisher),
                _DetailLine(label: 'Edition', value: book.edition),
                _DetailLine(label: 'Year', value: book.year),
                const SizedBox(height: 18),
                _PrimaryButton(
                  label: book.copies > 0 ? 'Borrow / Reserve' : 'Join Waitlist',
                  icon: Icons.arrow_forward,
                  onPressed: onBorrow,
                ),
                const SizedBox(height: 12),
                _SecondaryButton(
                  label: 'Find on Shelf',
                  icon: Icons.map_outlined,
                  onPressed: onFind,
                ),
                TextButton.icon(
                  onPressed: onSave,
                  icon: Icon(
                    saved
                        ? Icons.bookmark_remove_outlined
                        : Icons.favorite_border,
                  ),
                  label: Text(saved ? 'Remove Bookmark' : 'Add Bookmark'),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _BorrowDuration extends StatelessWidget {
  const _BorrowDuration({
    super.key,
    required this.book,
    required this.duration,
    required this.onBack,
    required this.onDuration,
    required this.onConfirm,
  });

  final LibraryBook book;
  final int duration;
  final VoidCallback onBack;
  final ValueChanged<int> onDuration;
  final VoidCallback onConfirm;

  @override
  Widget build(BuildContext context) {
    final issueDate = DateTime(2026, 7, 28);
    final dueDate = issueDate.add(Duration(days: duration));
    return _OverlayBase(
      top: _OverlayTop(onClose: onBack, closeIcon: Icons.arrow_back),
      child: ListView(
        padding: const EdgeInsets.fromLTRB(18, 70, 18, 24),
        children: [
          AnimatedContainer(
            duration: const Duration(milliseconds: 420),
            padding: const EdgeInsets.all(24),
            decoration: _paperPanel(borderWidth: 2),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'SELECTED VOLUME',
                  style: TextStyle(
                    color: AppColors.goldDark,
                    fontWeight: FontWeight.w900,
                    letterSpacing: 1.4,
                  ),
                ),
                const SizedBox(height: 12),
                Text(
                  'How long do you need this book?',
                  style: const TextStyle(
                    fontSize: 34,
                    height: 1.05,
                    fontWeight: FontWeight.w800,
                  ),
                ),
                const SizedBox(height: 6),
                Text(
                  book.title,
                  style: const TextStyle(color: AppColors.muted),
                ),
                const SizedBox(height: 22),
                for (final days in [7, 14, 21])
                  _DurationOption(
                    days: days,
                    selected: duration == days,
                    onTap: () => onDuration(days),
                  ),
                const SizedBox(height: 16),
                Row(
                  children: [
                    _DateCard(label: 'Issue Date', value: _dateText(issueDate)),
                    const SizedBox(width: 12),
                    _DateCard(label: 'Return By', value: _dateText(dueDate)),
                  ],
                ),
                const SizedBox(height: 22),
                _PrimaryButton(
                  label: book.copies > 0
                      ? 'Create Pickup Pass'
                      : 'Confirm Waitlist',
                  icon: Icons.qr_code,
                  onPressed: onConfirm,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _PickupPass extends StatelessWidget {
  const _PickupPass({super.key, required this.book, required this.onDone});

  final LibraryBook book;
  final VoidCallback onDone;

  @override
  Widget build(BuildContext context) {
    return _OverlayBase(
      top: const _ArchiveTopBar(),
      child: ListView(
        padding: const EdgeInsets.fromLTRB(18, 44, 18, 24),
        children: [
          Container(
            padding: const EdgeInsets.all(24),
            decoration: _paperPanel(borderWidth: 2),
            child: Column(
              children: [
                const Text(
                  'LIBRARY PICKUP',
                  style: TextStyle(
                    color: AppColors.goldDark,
                    fontWeight: FontWeight.w900,
                    letterSpacing: 1.4,
                  ),
                ),
                const SizedBox(height: 18),
                _QrMark(size: 140),
                const SizedBox(height: 20),
                Text(
                  book.title,
                  textAlign: TextAlign.center,
                  style: const TextStyle(
                    fontSize: 34,
                    height: 1.04,
                    fontWeight: FontWeight.w800,
                  ),
                ),
                const SizedBox(height: 8),
                const Text(
                  'Request #R1023',
                  style: TextStyle(fontSize: 18, color: AppColors.muted),
                ),
                const SizedBox(height: 24),
                const _DetailLine(
                  label: 'Pickup Before',
                  value: '29 July, 5:00 PM',
                ),
                const _DetailLine(
                  label: 'Bring',
                  value: 'Digital Library Card',
                ),
                const _DetailLine(
                  label: 'Status',
                  value: 'Ready for librarian scan',
                ),
                const SizedBox(height: 22),
                _PrimaryButton(
                  label: 'Go to My Shelf',
                  icon: Icons.library_books_outlined,
                  onPressed: onDone,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _OverlayBase extends StatelessWidget {
  const _OverlayBase({
    required this.child,
    required this.top,
    this.dimmed = false,
  });

  final Widget child;
  final Widget top;
  final bool dimmed;

  @override
  Widget build(BuildContext context) {
    return Positioned.fill(
      child: Material(
        color: dimmed ? Colors.black.withValues(alpha: 0.46) : AppColors.paper,
        child: Column(
          children: [
            top,
            Expanded(child: child),
          ],
        ),
      ),
    );
  }
}

class _OverlayTop extends StatelessWidget {
  const _OverlayTop({required this.onClose, this.closeIcon = Icons.close});

  final VoidCallback onClose;
  final IconData closeIcon;

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      bottom: false,
      child: SizedBox(
        height: 64,
        child: Row(
          children: [
            IconButton(onPressed: onClose, icon: Icon(closeIcon, size: 30)),
            const Expanded(
              child: Text(
                'The Archive',
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 34, fontWeight: FontWeight.w800),
              ),
            ),
            const Padding(
              padding: EdgeInsets.only(right: 14),
              child: CircleAvatar(
                radius: 19,
                backgroundColor: Color(0xff2c2118),
                child: Text('A', style: TextStyle(color: Colors.white)),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _AvailabilityPill extends StatelessWidget {
  const _AvailabilityPill({required this.book});

  final LibraryBook book;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 10),
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: 0.72),
        borderRadius: BorderRadius.circular(999),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          const CircleAvatar(radius: 5, backgroundColor: AppColors.goldDark),
          const SizedBox(width: 8),
          Text(
            book.copies > 0
                ? 'Available (${book.copies} Copies)'
                : '${book.queue} Students Waiting',
          ),
        ],
      ),
    );
  }
}

class _TextFieldBlock extends StatelessWidget {
  const _TextFieldBlock({
    required this.label,
    required this.icon,
    required this.value,
    this.obscure = false,
  });

  final String label;
  final IconData icon;
  final String value;
  final bool obscure;

  @override
  Widget build(BuildContext context) {
    return TextField(
      obscureText: obscure,
      controller: TextEditingController(text: value),
      decoration: InputDecoration(
        labelText: label,
        prefixIcon: Icon(icon),
        filled: true,
        fillColor: const Color(0xfff8f9fb),
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(10)),
      ),
    );
  }
}

class _PrimaryButton extends StatelessWidget {
  const _PrimaryButton({
    required this.label,
    required this.onPressed,
    this.icon,
  });

  final String label;
  final VoidCallback onPressed;
  final IconData? icon;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      height: 58,
      child: FilledButton.icon(
        style: FilledButton.styleFrom(
          backgroundColor: Colors.black,
          foregroundColor: const Color(0xffffe991),
          shape: RoundedRectangleBorder(
            side: const BorderSide(color: AppColors.gold),
            borderRadius: BorderRadius.circular(8),
          ),
        ),
        onPressed: onPressed,
        icon: Icon(icon ?? Icons.arrow_forward),
        label: Text(
          label.toUpperCase(),
          style: const TextStyle(
            fontWeight: FontWeight.w900,
            letterSpacing: 1.1,
          ),
        ),
      ),
    );
  }
}

class _SecondaryButton extends StatelessWidget {
  const _SecondaryButton({
    required this.label,
    required this.onPressed,
    this.icon,
  });

  final String label;
  final VoidCallback onPressed;
  final IconData? icon;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      height: 52,
      child: OutlinedButton.icon(
        onPressed: onPressed,
        icon: Icon(icon ?? Icons.circle_outlined),
        label: Text(label),
        style: OutlinedButton.styleFrom(
          foregroundColor: AppColors.ink,
          backgroundColor: Colors.white,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
          side: const BorderSide(color: AppColors.line),
        ),
      ),
    );
  }
}

class _NavItem extends StatelessWidget {
  const _NavItem({
    required this.icon,
    required this.label,
    required this.active,
    required this.onTap,
    this.raised = false,
  });

  final IconData icon;
  final String label;
  final bool active;
  final VoidCallback onTap;
  final bool raised;

  @override
  Widget build(BuildContext context) {
    final color = active ? AppColors.goldDark : const Color(0xff3c3c44);
    return InkWell(
      onTap: onTap,
      child: SizedBox(
        width: 68,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              width: raised ? 48 : 34,
              height: raised ? 48 : 34,
              decoration: raised
                  ? const BoxDecoration(
                      color: Colors.black,
                      shape: BoxShape.circle,
                    )
                  : null,
              child: Icon(icon, color: raised ? Colors.white : color),
            ),
            Text(label, style: TextStyle(color: color, fontSize: 12)),
          ],
        ),
      ),
    );
  }
}

class _FactBox extends StatelessWidget {
  const _FactBox({required this.label, required this.value});

  final String label;
  final String value;

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Container(
        height: 78,
        padding: const EdgeInsets.all(8),
        decoration: BoxDecoration(
          color: const Color(0xfff5f3f3),
          border: Border.all(color: const Color(0xffcfcbd0)),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              label.toUpperCase(),
              textAlign: TextAlign.center,
              style: const TextStyle(color: AppColors.muted, fontSize: 9),
            ),
            const SizedBox(height: 5),
            Text(value, textAlign: TextAlign.center),
          ],
        ),
      ),
    );
  }
}

class _DetailLine extends StatelessWidget {
  const _DetailLine({required this.label, required this.value});

  final String label;
  final String value;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 11),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Expanded(
            child: Text(
              label.toUpperCase(),
              style: const TextStyle(
                color: AppColors.muted,
                fontSize: 11,
                fontWeight: FontWeight.w900,
                letterSpacing: 1,
              ),
            ),
          ),
          Expanded(
            child: Text(
              value,
              textAlign: TextAlign.right,
              style: const TextStyle(fontWeight: FontWeight.w700),
            ),
          ),
        ],
      ),
    );
  }
}

class _DurationOption extends StatelessWidget {
  const _DurationOption({
    required this.days,
    required this.selected,
    required this.onTap,
  });

  final int days;
  final bool selected;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final subtitle = switch (days) {
      7 => 'Quick reference',
      14 => 'Standard loan period',
      _ => 'Extended study',
    };
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      child: InkWell(
        onTap: onTap,
        child: Container(
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(
            color: Colors.white,
            border: Border.all(
              color: selected ? AppColors.gold : AppColors.line,
            ),
          ),
          child: Row(
            children: [
              AnimatedContainer(
                duration: const Duration(milliseconds: 180),
                width: 22,
                height: 22,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  border: Border.all(
                    color: selected ? AppColors.goldDark : AppColors.muted,
                    width: 2,
                  ),
                ),
                child: Center(
                  child: AnimatedContainer(
                    duration: const Duration(milliseconds: 180),
                    width: selected ? 10 : 0,
                    height: selected ? 10 : 0,
                    decoration: const BoxDecoration(
                      color: AppColors.goldDark,
                      shape: BoxShape.circle,
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 8),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    '$days Days',
                    style: const TextStyle(fontWeight: FontWeight.w900),
                  ),
                  Text(
                    subtitle,
                    style: const TextStyle(color: AppColors.muted),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _DateCard extends StatelessWidget {
  const _DateCard({required this.label, required this.value});

  final String label;
  final String value;

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(
          color: Colors.white,
          border: Border.all(color: AppColors.line),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              label.toUpperCase(),
              style: const TextStyle(
                color: AppColors.muted,
                fontSize: 10,
                fontWeight: FontWeight.w900,
                letterSpacing: 1,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              value,
              style: const TextStyle(fontSize: 19, fontWeight: FontWeight.w800),
            ),
          ],
        ),
      ),
    );
  }
}

class _QrMark extends StatelessWidget {
  const _QrMark({required this.size});

  final double size;

  @override
  Widget build(BuildContext context) {
    return CustomPaint(size: Size.square(size), painter: _QrPainter());
  }
}

class _QrPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()..color = Colors.black;
    final cell = size.width / 9;
    final blocks = <Offset>[
      const Offset(0, 0),
      const Offset(1, 0),
      const Offset(2, 0),
      const Offset(0, 1),
      const Offset(2, 1),
      const Offset(0, 2),
      const Offset(1, 2),
      const Offset(2, 2),
      const Offset(6, 0),
      const Offset(7, 0),
      const Offset(8, 0),
      const Offset(6, 1),
      const Offset(8, 1),
      const Offset(6, 2),
      const Offset(7, 2),
      const Offset(8, 2),
      const Offset(0, 6),
      const Offset(1, 6),
      const Offset(2, 6),
      const Offset(0, 7),
      const Offset(2, 7),
      const Offset(0, 8),
      const Offset(1, 8),
      const Offset(2, 8),
      const Offset(4, 3),
      const Offset(5, 4),
      const Offset(7, 4),
      const Offset(3, 5),
      const Offset(5, 6),
      const Offset(6, 7),
      const Offset(8, 8),
      const Offset(4, 8),
    ];
    canvas.drawRect(Offset.zero & size, Paint()..color = Colors.white);
    for (final block in blocks) {
      canvas.drawRect(
        Rect.fromLTWH(block.dx * cell, block.dy * cell, cell, cell),
        paint,
      );
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

BoxDecoration _paperPanel({double borderWidth = 1}) {
  return BoxDecoration(
    color: const Color(0xfffffdf8),
    border: Border.all(color: AppColors.ink, width: borderWidth),
    boxShadow: const [
      BoxShadow(
        color: Color(0x1f000000),
        blurRadius: 32,
        offset: Offset(0, 18),
      ),
    ],
  );
}

String _dateText(DateTime date) {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  return '${date.day} ${months[date.month - 1]}, ${date.year}';
}
