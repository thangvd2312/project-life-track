import 'package:app_life_track/views/screens/auth/login.dart';
import 'package:app_life_track/views/screens/home/home_screen.dart';
import 'package:app_life_track/views/screens/main/main_screen.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:kakao_flutter_sdk_user/kakao_flutter_sdk_user.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:app_life_track/providers/lang/app_language_provider.dart';
import 'package:app_life_track/l10n/app_localizations.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // kakao login
  KakaoSdk.init(
    nativeAppKey: "deb1b3483cde3a4774d30a861a902ddd",
    javaScriptAppKey: "43bb02fe2bfaeaf96508d76201f1075b",
  );

  runApp(const ProviderScope(child: MyApp()));
}

class MyApp extends ConsumerWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final appLocale = ref.watch(appLanguageProvider);
    final baseTheme = ThemeData(
      colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFF007AFF)),
      scaffoldBackgroundColor: Colors.white,
      useMaterial3: true,
    );

    return MaterialApp(
      debugShowCheckedModeBanner: false,
      themeMode: ThemeMode.light,
      locale: appLocale,
      supportedLocales: const [Locale('en'), Locale('vi'), Locale('ko')],
      localizationsDelegates: const [
        AppLocalizations.delegate,
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      theme: baseTheme.copyWith(
        textTheme: GoogleFonts.notoSansTextTheme(baseTheme.textTheme),
        primaryTextTheme: GoogleFonts.notoSansTextTheme(
          baseTheme.primaryTextTheme,
        ),
        colorScheme: baseTheme.colorScheme,
        scaffoldBackgroundColor: baseTheme.scaffoldBackgroundColor,
      ),
      home: const LoginScreen(),
    );
  }
}
