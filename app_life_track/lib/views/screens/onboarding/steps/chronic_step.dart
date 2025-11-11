import 'package:app_life_track/providers/onboarding/onboarding_provider.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:google_fonts/google_fonts.dart';

class OnboardingChronicStep extends ConsumerWidget {
  const OnboardingChronicStep({super.key});

  static const _conditionsLabels = [
    'Do you have diabetes?',
    'Do you have high blood pressure?',
    'Do you have heart diseases?',
    'Do you have kidney diseases?',
  ];

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final onboardingState = ref.watch(onboardingControllerProvider);
    final chronic = onboardingState.chronicConditions;
    final notifier = ref.read(onboardingControllerProvider.notifier);
    final totalSteps = OnboardingStep.values.length;
    final progressValue =
        (onboardingState.currentIndex + 1) / totalSteps.clamp(1, totalSteps);

    return SingleChildScrollView(
      padding: const EdgeInsets.symmetric(horizontal: 28, vertical: 100),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _ProgressIndicator(progress: progressValue),
          const SizedBox(height: 12),
          const _AvatarBadge(),
          const SizedBox(height: 12),
          Text(
            'Welcome, Name!',
            style: GoogleFonts.notoSans(
              fontSize: 28,
              fontWeight: FontWeight.w600,
              color: const Color(0xFF3E3E3E),
            ),
          ),
          const SizedBox(height: 32),
          _ConditionToggle(
            label: _conditionsLabels[0],
            value: chronic.hasDiabetes,
            onChanged: (value) =>
                notifier.updateChronicConditions(hasDiabetes: value),
          ),
          _ConditionToggle(
            label: _conditionsLabels[1],
            value: chronic.hasHypertension,
            onChanged: (value) =>
                notifier.updateChronicConditions(hasHypertension: value),
          ),
          _ConditionToggle(
            label: _conditionsLabels[2],
            value: chronic.hasHeartDisease,
            onChanged: (value) =>
                notifier.updateChronicConditions(hasHeartDisease: value),
          ),
          _ConditionToggle(
            label: _conditionsLabels[3],
            value: chronic.hasKidneyDisease,
            onChanged: (value) =>
                notifier.updateChronicConditions(hasKidneyDisease: value),
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

class _ConditionToggle extends StatelessWidget {
  const _ConditionToggle({
    required this.label,
    required this.value,
    required this.onChanged,
  });

  final String label;
  final bool value;
  final ValueChanged<bool> onChanged;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 20),
      child: Row(
        children: [
          Expanded(
            child: Text(
              label,
              style: GoogleFonts.notoSans(
                fontSize: 15,
                fontWeight: FontWeight.w500,
                color: const Color(0xFF3E3E3E),
              ),
            ),
          ),
          _YesNoToggle(value: value, onChanged: onChanged),
        ],
      ),
    );
  }
}

class _YesNoToggle extends StatelessWidget {
  const _YesNoToggle({required this.value, required this.onChanged});

  final bool value;
  final ValueChanged<bool> onChanged;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        GestureDetector(
          onTap: () => onChanged(true),
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            decoration: BoxDecoration(
              color: value ? const Color(0xFF0A84FF) : const Color(0xFFE8E8ED),
              borderRadius: BorderRadius.circular(20),
            ),
            child: Text(
              'Yes',
              style: TextStyle(
                color: value ? Colors.white : const Color(0xFF3E3E3E),
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
        ),
        const SizedBox(width: 12),
        GestureDetector(
          onTap: () => onChanged(false),
          child: Text(
            'No',
            style: TextStyle(
              color: value ? const Color(0xFFB0B0B9) : const Color(0xFF0A84FF),
              fontWeight: FontWeight.w600,
            ),
          ),
        ),
      ],
    );
  }
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
