import 'package:app_life_track/providers/onboarding/onboarding_provider.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:google_fonts/google_fonts.dart';

class OnboardingAddressStep extends ConsumerWidget {
  const OnboardingAddressStep({super.key});

  static const _titleSpacing = SizedBox(height: 12);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(onboardingControllerProvider);
    final notifier = ref.read(onboardingControllerProvider.notifier);
    final theme = Theme.of(context);
    final totalSteps = OnboardingStep.values.length;
    final progressValue =
        (state.currentIndex + 1) / totalSteps.clamp(1, totalSteps);

    return SingleChildScrollView(
      padding: const EdgeInsets.symmetric(horizontal: 28, vertical: 100),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _ProgressIndicator(progress: progressValue),
          const SizedBox(height: 12),
          const _AvatarBadge(),
          _titleSpacing,
          Text(
            'Welcome, Name!',
            style: GoogleFonts.notoSans(
              fontSize: 28,
              fontWeight: FontWeight.w600,
              color: const Color(0xFF3E3E3E),
            ),
          ),
          const SizedBox(height: 28),
          Text(
            'Where do you live?',
            style: theme.textTheme.bodyLarge?.copyWith(
              fontWeight: FontWeight.w600,
              color: const Color(0xFF3E3E3E),
            ),
          ),
          const SizedBox(height: 16),
          TextFormField(
            initialValue: state.address,
            decoration: _inputDecoration(hintText: 'Enter your address...'),
            onChanged: notifier.updateAddress,
          ),
          const SizedBox(height: 48),
          Align(
            alignment: Alignment.centerRight,
            child: FilledButton.icon(
              onPressed: notifier.nextStep,
              style: FilledButton.styleFrom(
                padding: const EdgeInsets.symmetric(
                  horizontal: 24,
                  vertical: 14,
                ),
                backgroundColor: const Color(0xFF007AFF),
                foregroundColor: Colors.white,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(28),
                ),
              ),
              icon: const Icon(Icons.arrow_forward_rounded, size: 18),
              label: const Text(
                'Next',
                style: TextStyle(fontWeight: FontWeight.w600),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

InputDecoration _inputDecoration({required String hintText}) {
  return InputDecoration(
    hintText: hintText,
    hintStyle: const TextStyle(
      color: Color(0xFFAEB4BE),
      fontStyle: FontStyle.italic,
    ),
    filled: true,
    fillColor: const Color(0xFFF6F7FA),
    contentPadding: const EdgeInsets.symmetric(horizontal: 18, vertical: 18),
    border: OutlineInputBorder(
      borderRadius: BorderRadius.circular(16),
      borderSide: BorderSide.none,
    ),
    focusedBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(16),
      borderSide: const BorderSide(color: Color(0xFF0A84FF), width: 1.6),
    ),
  );
}

class _AvatarBadge extends StatelessWidget {
  const _AvatarBadge();

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 40,
      height: 40,
      decoration: const BoxDecoration(
        color: Color(0xFF0A84FF),
        shape: BoxShape.circle,
      ),
    );
  }
}

class _ProgressIndicator extends StatelessWidget {
  const _ProgressIndicator({required this.progress});

  final double progress;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 5,
      child: ClipRRect(
        borderRadius: BorderRadius.circular(8),
        child: LayoutBuilder(
          builder: (context, constraints) {
            final width = constraints.maxWidth;
            return Stack(
              children: [
                Container(
                  width: width,
                  decoration: BoxDecoration(
                    color: const Color(0xFFE8EBF0),
                    borderRadius: BorderRadius.circular(8),
                  ),
                ),
                Align(
                  alignment: Alignment.centerLeft,
                  child: AnimatedContainer(
                    duration: const Duration(milliseconds: 300),
                    width: width * progress.clamp(0, 1),
                    decoration: BoxDecoration(
                      color: const Color(0xFF0A84FF),
                      borderRadius: BorderRadius.circular(8),
                    ),
                  ),
                ),
              ],
            );
          },
        ),
      ),
    );
  }
}
