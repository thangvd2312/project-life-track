import 'package:app_life_track/providers/onboarding/onboarding_provider.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:google_fonts/google_fonts.dart';

class OnboardingAllergyStep extends ConsumerWidget {
  const OnboardingAllergyStep({super.key});

  static const _allergyOptions = [
    'Peanuts',
    'Dairy',
    'Gluten',
    'Seafood',
    'Soy',
    'Eggs',
  ];

  static const _dietaryOptions = [
    'Vegetarian',
    'Vegan',
    'Halal',
    'Kosher',
    'Low carb',
  ];

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(onboardingControllerProvider);
    final notifier = ref.read(onboardingControllerProvider.notifier);
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
          _SectionLabel('Are you allergic to anything?'),
          const SizedBox(height: 12),
          _ChipContainer(
            children: _allergyOptions.map((option) {
              final selected = state.allergies.contains(option);
              return _SelectableChip(
                label: option,
                selected: selected,
                onTap: () => notifier.toggleAllergy(option),
              );
            }).toList(),
          ),
          const SizedBox(height: 28),
          _SectionLabel('Are you restricting any type of food?'),
          const SizedBox(height: 12),
          _ChipContainer(
            children: _dietaryOptions.map((option) {
              final selected = state.dietaryRestrictions.contains(option);
              return _SelectableChip(
                label: option,
                selected: selected,
                onTap: () => notifier.toggleDietaryRestriction(option),
              );
            }).toList(),
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

class _SectionLabel extends StatelessWidget {
  const _SectionLabel(this.text);

  final String text;

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      style: GoogleFonts.notoSans(
        fontSize: 15,
        fontWeight: FontWeight.w600,
        color: const Color(0xFF3E3E3E),
      ),
    );
  }
}

class _ChipContainer extends StatelessWidget {
  const _ChipContainer({required this.children});

  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
      decoration: BoxDecoration(
        color: const Color(0xFFF6F7FA),
        borderRadius: BorderRadius.circular(14),
      ),
      child: Wrap(spacing: 8, runSpacing: 8, children: children),
    );
  }
}

class _SelectableChip extends StatelessWidget {
  const _SelectableChip({
    required this.label,
    required this.selected,
    required this.onTap,
  });

  final String label;
  final bool selected;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
        decoration: BoxDecoration(
          color: selected ? const Color(0xFF0A84FF) : Colors.white,
          borderRadius: BorderRadius.circular(18),
          border: Border.all(
            color: selected ? const Color(0xFF0A84FF) : const Color(0xFFE1E5EB),
          ),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              label,
              style: TextStyle(
                fontWeight: FontWeight.w600,
                color: selected ? Colors.white : const Color(0xFF3E3E3E),
              ),
            ),
            if (selected) ...[
              const SizedBox(width: 6),
              const Icon(Icons.close_rounded, size: 14, color: Colors.white),
            ],
          ],
        ),
      ),
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
