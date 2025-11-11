import 'package:app_life_track/providers/onboarding/onboarding_provider.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:google_fonts/google_fonts.dart';

class OnboardingMeasurementsStep extends ConsumerWidget {
  const OnboardingMeasurementsStep({super.key});

  static const _labelStyle = TextStyle(
    fontSize: 15,
    fontWeight: FontWeight.w600,
    color: Color(0xFF3E3E3E),
  );

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
          const Text(
            'What is your latest blood pressure measurement?',
            style: _labelStyle,
          ),
          const SizedBox(height: 12),
          Row(
            children: [
              Expanded(
                child: TextFormField(
                  initialValue:
                      state.latestBloodPressureMmHg?.toString() ?? '',
                  keyboardType: const TextInputType.numberWithOptions(
                    decimal: true,
                  ),
                  inputFormatters: [
                    FilteringTextInputFormatter.allow(
                      RegExp(r'^\d*\.?\d{0,2}'),
                    ),
                  ],
                  decoration: _inputDecoration(hintText: 'Enter a number...'),
                  onChanged: (value) => notifier.updateMeasurements(
                    bloodPressureMmHg: double.tryParse(value),
                    setBloodPressure: true,
                  ),
                ),
              ),
              const SizedBox(width: 16),
              const _UnitBadge(label: 'mmHg'),
            ],
          ),
          const SizedBox(height: 28),
          const Text(
            'What is your latest glucose measurement?',
            style: _labelStyle,
          ),
          const SizedBox(height: 12),
          Row(
            children: [
              Expanded(
                child: TextFormField(
                  initialValue: state.latestGlucoseMgDl?.toString() ?? '',
                  keyboardType: const TextInputType.numberWithOptions(
                    decimal: true,
                  ),
                  inputFormatters: [
                    FilteringTextInputFormatter.allow(
                      RegExp(r'^\d*\.?\d{0,2}'),
                    ),
                  ],
                  decoration: _inputDecoration(hintText: 'Enter a number...'),
                  onChanged: (value) => notifier.updateMeasurements(
                    glucoseMgDl: double.tryParse(value),
                    setGlucose: true,
                  ),
                ),
              ),
              const SizedBox(width: 16),
              const _UnitBadge(label: 'mg/dL'),
            ],
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
    filled: true,
    fillColor: const Color(0xFFF3F3F3),
    isDense: true,
    contentPadding: const EdgeInsets.all(12),
    border: OutlineInputBorder(
      borderRadius: BorderRadius.circular(8),
      borderSide: BorderSide.none,
    ),
    focusedBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(8),
      borderSide: const BorderSide(color: Color(0xFF007AFF)),
    ),
    hintStyle: const TextStyle(
      color: Color(0xFFAEB4BE),
      fontStyle: FontStyle.italic,
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

class _UnitBadge extends StatelessWidget {
  const _UnitBadge({required this.label});

  final String label;

  @override
  Widget build(BuildContext context) {
    return Text(
      label,
      style: GoogleFonts.notoSans(
        fontSize: 14,
        fontWeight: FontWeight.w500,
        color: const Color(0xFF3E3E3E),
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

