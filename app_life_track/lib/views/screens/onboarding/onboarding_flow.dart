import 'package:app_life_track/providers/onboarding/onboarding_provider.dart';
import 'package:app_life_track/views/screens/onboarding/steps/address_step.dart';
import 'package:app_life_track/views/screens/onboarding/steps/allergy_step.dart';
import 'package:app_life_track/views/screens/onboarding/steps/basic_info_step.dart';
import 'package:app_life_track/views/screens/onboarding/steps/chronic_step.dart';
import 'package:app_life_track/views/screens/onboarding/steps/goals_step.dart';
import 'package:app_life_track/views/screens/onboarding/steps/measurements_step.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class OnboardingFlow extends ConsumerStatefulWidget {
  const OnboardingFlow({super.key});

  @override
  ConsumerState<OnboardingFlow> createState() => _OnboardingFlowState();
}

class _OnboardingFlowState extends ConsumerState<OnboardingFlow> {
  late final PageController _pageController;
  ProviderSubscription<OnboardingState>? _subscription;

  @override
  void initState() {
    super.initState();
    _pageController = PageController();
    _subscription = ref.listenManual<OnboardingState>(
      onboardingControllerProvider,
      (previous, next) {
        final previousIndex = previous?.currentIndex;
        if (previousIndex != next.currentIndex) {
          _pageController.animateToPage(
            next.currentIndex,
            duration: const Duration(milliseconds: 300),
            curve: Curves.easeInOut,
          );
        }
      },
    );
  }

  @override
  void dispose() {
    _pageController.dispose();
    _subscription?.close();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    ref.watch(onboardingControllerProvider);
    return Scaffold(
      backgroundColor: Colors.white,
      body: PageView(
        controller: _pageController,
        physics: const NeverScrollableScrollPhysics(),
        children: const [
          OnboardingBasicInfoStep(),
          OnboardingAddressStep(),
          OnboardingChronicStep(),
          OnboardingMeasurementsStep(),
          OnboardingAllergyStep(),
          OnboardingGoalsStep(),
        ],
      ),
    );
  }
}
