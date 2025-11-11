import 'package:app_life_track/providers/onboarding/onboarding_provider.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:google_fonts/google_fonts.dart';

class OnboardingBasicInfoStep extends ConsumerWidget {
  const OnboardingBasicInfoStep({super.key});

  static const _fieldSpacing = SizedBox(height: 24);
  static const _labelStyle = TextStyle(
    fontSize: 14,
    fontWeight: FontWeight.w500,
    color: Color(0xFF3E3E3E),
  );

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final onboardingState = ref.watch(onboardingControllerProvider);
    final basicInfo = onboardingState.basicInfo;
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
              color: const Color(0xff3e3e3e),
            ),
          ),
          _fieldSpacing,
          const Text('How old are you?', style: _labelStyle),
          const SizedBox(height: 12),
          SizedBox(
            width: MediaQuery.of(context).size.width * 0.2,
            child: TextFormField(
              initialValue: basicInfo.age?.toString() ?? '',
              keyboardType: TextInputType.number,
              inputFormatters: [FilteringTextInputFormatter.digitsOnly],
              decoration: _inputDecoration(hintText: '30'),
              onChanged: (value) => notifier.updateBasicInfo(
                age: value.isEmpty ? null : int.tryParse(value),
              ),
            ),
          ),
          _fieldSpacing,
          const Text('What is your gender?', style: _labelStyle),
          const SizedBox(height: 12),
          SizedBox(
            width: MediaQuery.of(context).size.width * 0.3,
            child: DropdownButtonFormField<String>(
              initialValue: basicInfo.gender.isEmpty ? null : basicInfo.gender,
              isExpanded: true,
              items: const [
                DropdownMenuItem(value: 'Male', child: Text('Male')),
                DropdownMenuItem(value: 'Female', child: Text('Female')),
                DropdownMenuItem(value: 'Other', child: Text('Other')),
              ],
              decoration: _inputDecoration(hintText: 'Select gender'),
              onChanged: (value) =>
                  notifier.updateBasicInfo(gender: value ?? basicInfo.gender),
            ),
          ),
          _fieldSpacing,
          const Text('How much do you weigh?', style: _labelStyle),
          const SizedBox(height: 12),
          SizedBox(
            width: MediaQuery.of(context).size.width * 0.6,
            child: Row(
              children: [
                Expanded(
                  child: TextFormField(
                    initialValue: basicInfo.weightKg?.toString() ?? '',
                    keyboardType: const TextInputType.numberWithOptions(
                      decimal: true,
                    ),
                    inputFormatters: [
                      FilteringTextInputFormatter.allow(
                        RegExp(r'^\d*\.?\d{0,2}'),
                      ),
                    ],
                    decoration: _inputDecoration(hintText: 'Enter your weight'),
                    onChanged: (value) => notifier.updateBasicInfo(
                      weightKg: double.tryParse(value),
                    ),
                  ),
                ),
                const SizedBox(width: 16),
                const _UnitBadge(label: 'kg'),
              ],
            ),
          ),
          _fieldSpacing,
          const Text('How tall are you?', style: _labelStyle),
          const SizedBox(height: 12),
          SizedBox(
            width: MediaQuery.of(context).size.width * 0.61,
            child: Row(
              children: [
                Expanded(
                  child: TextFormField(
                    initialValue: basicInfo.heightCm?.toString() ?? '',
                    keyboardType: const TextInputType.numberWithOptions(
                      decimal: true,
                    ),
                    decoration: _inputDecoration(hintText: 'Enter your height'),
                    onChanged: (value) => notifier.updateBasicInfo(
                      heightCm: double.tryParse(value),
                    ),
                  ),
                ),
                const SizedBox(width: 16),
                const _UnitBadge(label: 'cm'),
              ],
            ),
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
      child: const Icon(Icons.person, color: Colors.white),
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
