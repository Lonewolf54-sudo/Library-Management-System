import 'package:athenaeum_student_app/main.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  testWidgets('student app opens login and enters home', (tester) async {
    await tester.pumpWidget(const AthenaeumStudentApp());

    expect(find.text('The Archive'), findsWidgets);
    expect(find.text('Login to Archive'.toUpperCase()), findsOneWidget);

    await tester.tap(find.text('Login to Archive'.toUpperCase()));
    await tester.pumpAndSettle();

    expect(find.text('The Archive'), findsOneWidget);
    expect(find.byIcon(Icons.home_outlined), findsOneWidget);
  });
}
