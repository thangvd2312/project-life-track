import 'package:app_life_track/views/screens/auth/login.dart';
import 'package:app_life_track/views/screens/home/home_screen.dart';
import 'package:app_life_track/views/screens/main/main_screen.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:google_fonts/google_fonts.dart';

void main() {
  runApp(const ProviderScope(child: MyApp()));
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    final baseTheme = ThemeData(
      colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFF007AFF)),
      scaffoldBackgroundColor: Colors.white,
      useMaterial3: true,
    );

    return MaterialApp(
      debugShowCheckedModeBanner: false,
      themeMode: ThemeMode.light,
      theme: baseTheme.copyWith(
        textTheme: GoogleFonts.notoSansTextTheme(baseTheme.textTheme),
        primaryTextTheme: GoogleFonts.notoSansTextTheme(
          baseTheme.primaryTextTheme,
        ),
        colorScheme: baseTheme.colorScheme,
        scaffoldBackgroundColor: baseTheme.scaffoldBackgroundColor,
      ),
      home: const MainScreen(),
    );
  }
}
