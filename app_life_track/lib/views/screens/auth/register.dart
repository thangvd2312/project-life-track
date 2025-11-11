import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class RegisterScreen extends StatefulWidget {
  const RegisterScreen({super.key});

  @override
  State<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();

  bool _obscurePassword = true;
  bool _obscureConfirmPassword = true;
  bool _isFormValid = false;

  @override
  void initState() {
    super.initState();
    _emailController.addListener(_validateForm);
    _passwordController.addListener(_validateForm);
    _confirmPasswordController.addListener(_validateForm);
  }

  @override
  void dispose() {
    _emailController
      ..removeListener(_validateForm)
      ..dispose();
    _passwordController
      ..removeListener(_validateForm)
      ..dispose();
    _confirmPasswordController
      ..removeListener(_validateForm)
      ..dispose();
    super.dispose();
  }

  void _validateForm() {
    final email = _emailController.text.trim();
    final password = _passwordController.text;
    final confirm = _confirmPasswordController.text;

    final isValid =
        email.isNotEmpty &&
        password.isNotEmpty &&
        confirm.isNotEmpty &&
        password == confirm &&
        password.length >= 6;

    if (isValid != _isFormValid) {
      setState(() {
        _isFormValid = isValid;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 24),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                const _AppBadge(),
                const SizedBox(height: 32),
                Text(
                  'Register a new account',
                  textAlign: TextAlign.center,
                  style: GoogleFonts.notoSans(
                    fontSize: 24,
                    fontWeight: FontWeight.w700,
                    color: const Color(0xFF3E3E3E),
                  ),
                ),
                const SizedBox(height: 32),
                _FormSection(
                  label: 'Email address',
                  child: _AuthTextField(
                    controller: _emailController,
                    hintText: 'Enter email...',
                    keyboardType: TextInputType.emailAddress,
                  ),
                ),
                const SizedBox(height: 24),
                _FormSection(
                  label: 'Password',
                  child: Column(
                    children: [
                      _AuthTextField(
                        controller: _passwordController,
                        hintText: 'Enter password...',
                        obscureText: _obscurePassword,
                        onToggleVisibility: () {
                          setState(() {
                            _obscurePassword = !_obscurePassword;
                          });
                        },
                      ),
                      const SizedBox(height: 12),
                      _AuthTextField(
                        controller: _confirmPasswordController,
                        hintText: 'Re-enter password...',
                        obscureText: _obscureConfirmPassword,
                        onToggleVisibility: () {
                          setState(() {
                            _obscureConfirmPassword = !_obscureConfirmPassword;
                          });
                        },
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 32),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: _isFormValid ? () {} : null,
                    style: ElevatedButton.styleFrom(
                      padding: const EdgeInsets.symmetric(vertical: 16),
                      backgroundColor: _isFormValid
                          ? const Color(0xFF007AFF)
                          : const Color(0xFFD9D9D9),
                      foregroundColor: Colors.white,
                      disabledBackgroundColor: const Color(0xFFD9D9D9),
                      disabledForegroundColor: const Color(0xFF8C8C8C),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(24),
                      ),
                      elevation: 0,
                    ),
                    child: Text(
                      'Create account',
                      style: theme.textTheme.titleMedium?.copyWith(
                        fontWeight: FontWeight.w600,
                        color: _isFormValid
                            ? Colors.white
                            : const Color(0xFF8C8C8C),
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _AppBadge extends StatelessWidget {
  const _AppBadge();

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 48,
      height: 48,
      decoration: const BoxDecoration(
        shape: BoxShape.circle,
        color: Color(0xFF007AFF),
      ),
    );
  }
}

class _FormSection extends StatelessWidget {
  const _FormSection({required this.label, required this.child});

  final String label;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: GoogleFonts.notoSans(
            fontSize: 14,
            fontWeight: FontWeight.w600,
            color: const Color(0xFF636366),
          ),
        ),
        const SizedBox(height: 12),
        child,
      ],
    );
  }
}

class _AuthTextField extends StatelessWidget {
  const _AuthTextField({
    required this.controller,
    required this.hintText,
    this.keyboardType,
    this.obscureText = false,
    this.onToggleVisibility,
  });

  final TextEditingController controller;
  final String hintText;
  final TextInputType? keyboardType;
  final bool obscureText;
  final VoidCallback? onToggleVisibility;

  @override
  Widget build(BuildContext context) {
    return TextField(
      controller: controller,
      obscureText: obscureText,
      keyboardType: keyboardType,
      decoration: InputDecoration(
        hintText: hintText,
        hintStyle: GoogleFonts.notoSans(
          fontSize: 14,
          fontStyle: FontStyle.italic,
          color: const Color(0xFFB4B4B4),
        ),
        filled: true,
        fillColor: const Color(0xFFF3F3F3),
        contentPadding: const EdgeInsets.symmetric(
          horizontal: 14,
          vertical: 16,
        ),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: BorderSide.none,
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: Color(0xFF007AFF)),
        ),
        suffixIcon: onToggleVisibility == null
            ? null
            : IconButton(
                icon: Icon(
                  obscureText ? Icons.visibility_off : Icons.visibility,
                  color: const Color(0xFFB4B4B4),
                ),
                onPressed: onToggleVisibility,
              ),
      ),
    );
  }
}
