import 'package:app_life_track/views/screens/auth/register.dart';
import 'package:app_life_track/views/screens/onboarding/onboarding_flow.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:kakao_flutter_sdk_user/kakao_flutter_sdk_user.dart';

class LoginScreen extends StatelessWidget {
  const LoginScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    void signInWithKakao() async {
      // Login combination sample + Detailed error handling callback
      bool talkInstalled = await isKakaoTalkInstalled();
      // If Kakao Talk has been installed, log in with Kakao Talk. Otherwise, log in with Kakao Account.
      if (talkInstalled) {
        try {
          OAuthToken token = await UserApi.instance.loginWithKakaoTalk();
          print('Login succeeded. ${token.accessToken}');
        } catch (e) {
          print('Login failed. $e');

          // After installing Kakao Talk, if a user does not complete app permission and cancels Login with Kakao Talk, skip to log in with Kakao Account, considering that the user does not want to log in.
          // You could implement other actions such as going back to the previous page.
          if (e is PlatformException && e.code == 'CANCELED') {
            return;
          }

          // If a user is not logged into Kakao Talk after installing Kakao Talk and allowing app permission, make the user log in with Kakao Account.
          try {
            OAuthToken token = await UserApi.instance.loginWithKakaoAccount();
            print('Login succeeded. ${token.accessToken}');
          } catch (e) {
            print('Login failed. $e');
          }
        }
      } else {
        try {
          OAuthToken token = await UserApi.instance.loginWithKakaoAccount();
          print('Login succeeded. ${token.accessToken}');
        } catch (e) {
          print('Login failed. $e');
        }
      }
    }

    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(35),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                _AppLogo(theme: theme),
                const SizedBox(height: 30),
                const _CredentialForm(),
                const SizedBox(height: 8),
                Align(
                  alignment: Alignment.centerRight,
                  child: TextButton(
                    onPressed: () {},
                    child: Text(
                      'Forgot your password?',
                      style: GoogleFonts.notoSans(
                        fontSize: 14,
                        fontWeight: FontWeight.w600,
                        fontStyle: FontStyle.italic,
                        color: const Color(0xFFB4B4B4),
                        decoration: TextDecoration.underline,
                      ),
                    ),
                  ),
                ),
                const SizedBox(height: 16),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: () {},
                    style: ElevatedButton.styleFrom(
                      padding: const EdgeInsets.symmetric(vertical: 16),
                      backgroundColor: const Color(0xFFD9D9D9),
                      foregroundColor: Colors.white,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(20),
                      ),
                      elevation: 0,
                    ),
                    child: Text(
                      'Sign In',
                      style: theme.textTheme.titleMedium?.copyWith(
                        color: const Color(0xFF8C8C8C),
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                ),
                const SizedBox(height: 10),
                TextButton(
                  style: TextButton.styleFrom(
                    padding: EdgeInsets.zero,
                    minimumSize: Size.zero,
                    tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                    alignment: Alignment.center,
                  ),
                  onPressed: () {
                    Navigator.of(context).push(
                      MaterialPageRoute<void>(
                        builder: (_) => const RegisterScreen(),
                      ),
                    );
                  },
                  child: Text(
                    'Create new account',
                    style: GoogleFonts.notoSans(
                      fontSize: 16,
                      fontWeight: FontWeight.w600,
                      color: const Color(0xFF646464),
                      decoration: TextDecoration.underline,
                    ),
                  ),
                ),
                const SizedBox(height: 36),
                Center(
                  child: Text(
                    'or',
                    style: GoogleFonts.notoSans(
                      fontSize: 14,
                      fontStyle: FontStyle.italic,
                    ),
                  ),
                ),
                const SizedBox(height: 36),
                _SocialLoginButton(
                  label: 'Sign In with Google',
                  textColor: Colors.black87,
                  backgroundColor: Colors.white,
                  borderColor: Colors.grey.shade300,
                  icon: Image.asset(
                    'assets/icons/google.png',
                    width: 22,
                    height: 22,
                  ),
                  onPressed: () {},
                ),
                const SizedBox(height: 12),
                _SocialLoginButton(
                  label: 'Sign In with Apple',
                  textColor: Colors.black,
                  backgroundColor: Colors.white,
                  borderColor: Colors.grey.shade300,
                  icon: const Icon(Icons.apple, color: Colors.black, size: 22),
                  onPressed: () {},
                ),
                const SizedBox(height: 12),
                _SocialLoginButton(
                  label: 'Sign In with Kakao',
                  textColor: Colors.black,
                  backgroundColor: const Color(0xFFFEE500),
                  borderColor: Colors.transparent,
                  icon: Image.asset(
                    'assets/icons/kakao.png',
                    width: 22,
                    height: 22,
                  ),
                  onPressed: signInWithKakao,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _AppLogo extends StatelessWidget {
  const _AppLogo({required this.theme});

  final ThemeData theme;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Container(
          width: 41,
          height: 41,
          decoration: const BoxDecoration(
            color: Color(0xFF007AFF),
            shape: BoxShape.circle,
          ),
        ),
        const SizedBox(width: 12),
        Text(
          'App Logo',
          style: GoogleFonts.notoSans(
            color: const Color(0xFF007AFF),
            fontWeight: FontWeight.w700,
            letterSpacing: 0.2,
            fontSize: 24,
          ),
        ),
      ],
    );
  }
}

class _CredentialForm extends StatelessWidget {
  const _CredentialForm();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _AuthTextField(
          hintText: 'Enter email...',
          keyboardType: TextInputType.emailAddress,
        ),
        const SizedBox(height: 10),
        const _AuthTextField(hintText: 'Enter password...', obscureText: true),
      ],
    );
  }
}

class _AuthTextField extends StatelessWidget {
  const _AuthTextField({
    required this.hintText,
    this.obscureText = false,
    this.keyboardType,
  });

  final String hintText;
  final bool obscureText;
  final TextInputType? keyboardType;

  @override
  Widget build(BuildContext context) {
    return TextField(
      obscureText: obscureText,
      keyboardType: keyboardType,
      decoration: InputDecoration(
        hintText: hintText,
        hintStyle: GoogleFonts.notoSans(
          fontSize: 14,
          fontStyle: FontStyle.italic,
          fontWeight: FontWeight.w400,
          color: const Color(0xFFB4B4B4),
        ),
        filled: true,
        fillColor: const Color(0xFFF3F3F3),
        contentPadding: const EdgeInsets.symmetric(
          horizontal: 10,
          vertical: 16,
        ),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(8),
          borderSide: BorderSide.none,
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(8),
          borderSide: BorderSide(color: Colors.grey.shade400),
        ),
      ),
    );
  }
}

class _SocialLoginButton extends StatelessWidget {
  const _SocialLoginButton({
    required this.label,
    required this.icon,
    required this.onPressed,
    required this.backgroundColor,
    required this.textColor,
    required this.borderColor,
  });

  final String label;
  final Widget icon;
  final VoidCallback onPressed;
  final Color backgroundColor;
  final Color textColor;
  final Color borderColor;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      child: OutlinedButton(
        onPressed: onPressed,
        style: OutlinedButton.styleFrom(
          padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 16),
          backgroundColor: backgroundColor,
          foregroundColor: textColor,
          side: BorderSide(color: borderColor, width: 1.4),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(28),
          ),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          mainAxisSize: MainAxisSize.min,
          children: [
            icon,
            const SizedBox(width: 12),
            Text(
              label,
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                fontWeight: FontWeight.w600,
                color: textColor,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
