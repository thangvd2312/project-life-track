import 'package:flutter/foundation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

enum OnboardingStep {
  basicInfo,
  address,
  chronic,
  measurements,
  allergy,
  goals,
}

@immutable
class BasicInfo {
  const BasicInfo({
    this.age,
    this.gender = 'Male',
    this.weightKg,
    this.heightCm,
  });

  final int? age;
  final String gender;
  final double? weightKg;
  final double? heightCm;

  BasicInfo copyWith({
    int? age,
    String? gender,
    double? weightKg,
    double? heightCm,
  }) {
    return BasicInfo(
      age: age ?? this.age,
      gender: gender ?? this.gender,
      weightKg: weightKg ?? this.weightKg,
      heightCm: heightCm ?? this.heightCm,
    );
  }
}

@immutable
class ChronicConditions {
  const ChronicConditions({
    this.hasDiabetes = false,
    this.hasHypertension = false,
    this.hasHeartDisease = false,
    this.hasKidneyDisease = false,
  });

  final bool hasDiabetes;
  final bool hasHypertension;
  final bool hasHeartDisease;
  final bool hasKidneyDisease;

  ChronicConditions copyWith({
    bool? hasDiabetes,
    bool? hasHypertension,
    bool? hasHeartDisease,
    bool? hasKidneyDisease,
  }) {
    return ChronicConditions(
      hasDiabetes: hasDiabetes ?? this.hasDiabetes,
      hasHypertension: hasHypertension ?? this.hasHypertension,
      hasHeartDisease: hasHeartDisease ?? this.hasHeartDisease,
      hasKidneyDisease: hasKidneyDisease ?? this.hasKidneyDisease,
    );
  }
}

@immutable
class OnboardingState {
  const OnboardingState({
    this.currentStep = OnboardingStep.basicInfo,
    this.basicInfo = const BasicInfo(),
    this.address = '',
    this.chronicConditions = const ChronicConditions(),
    this.latestBloodPressureMmHg,
    this.latestGlucoseMgDl,
    this.allergies = const [],
    this.dietaryRestrictions = const [],
    this.goals = const [],
    this.isSubmitting = false,
  });

  final OnboardingStep currentStep;
  final BasicInfo basicInfo;
  final String address;
  final ChronicConditions chronicConditions;
  final double? latestBloodPressureMmHg;
  final double? latestGlucoseMgDl;
  final List<String> allergies;
  final List<String> dietaryRestrictions;
  final List<String> goals;
  final bool isSubmitting;

  int get currentIndex => OnboardingStep.values.indexOf(currentStep);
  bool get isLastStep => currentStep == OnboardingStep.values.last;
  bool get canGoBack => currentIndex > 0;

  OnboardingState copyWith({
    OnboardingStep? currentStep,
    BasicInfo? basicInfo,
    String? address,
    ChronicConditions? chronicConditions,
    double? latestBloodPressureMmHg,
    bool updateLatestBloodPressure = false,
    double? latestGlucoseMgDl,
    bool updateLatestGlucose = false,
    List<String>? allergies,
    List<String>? dietaryRestrictions,
    List<String>? goals,
    bool? isSubmitting,
  }) {
    return OnboardingState(
      currentStep: currentStep ?? this.currentStep,
      basicInfo: basicInfo ?? this.basicInfo,
      address: address ?? this.address,
      chronicConditions: chronicConditions ?? this.chronicConditions,
      latestBloodPressureMmHg: updateLatestBloodPressure
          ? latestBloodPressureMmHg
          : this.latestBloodPressureMmHg,
      latestGlucoseMgDl: updateLatestGlucose
          ? latestGlucoseMgDl
          : this.latestGlucoseMgDl,
      allergies: allergies ?? this.allergies,
      dietaryRestrictions: dietaryRestrictions ?? this.dietaryRestrictions,
      goals: goals ?? this.goals,
      isSubmitting: isSubmitting ?? this.isSubmitting,
    );
  }
}

class OnboardingController extends StateNotifier<OnboardingState> {
  OnboardingController() : super(const OnboardingState());

  void goToStep(OnboardingStep step) {
    state = state.copyWith(currentStep: step);
  }

  void nextStep() {
    final currentIndex = state.currentIndex;
    if (currentIndex < OnboardingStep.values.length - 1) {
      final nextStep = OnboardingStep.values[currentIndex + 1];
      state = state.copyWith(currentStep: nextStep);
    }
  }

  void previousStep() {
    final currentIndex = state.currentIndex;
    if (currentIndex > 0) {
      final prevStep = OnboardingStep.values[currentIndex - 1];
      state = state.copyWith(currentStep: prevStep);
    }
  }

  void updateBasicInfo({
    int? age,
    String? gender,
    double? weightKg,
    double? heightCm,
  }) {
    state = state.copyWith(
      basicInfo: state.basicInfo.copyWith(
        age: age,
        gender: gender,
        weightKg: weightKg,
        heightCm: heightCm,
      ),
    );
  }

  void updateAddress(String address) {
    state = state.copyWith(address: address);
  }

  void updateChronicConditions({
    bool? hasDiabetes,
    bool? hasHypertension,
    bool? hasHeartDisease,
    bool? hasKidneyDisease,
  }) {
    state = state.copyWith(
      chronicConditions: state.chronicConditions.copyWith(
        hasDiabetes: hasDiabetes,
        hasHypertension: hasHypertension,
        hasHeartDisease: hasHeartDisease,
        hasKidneyDisease: hasKidneyDisease,
      ),
    );
  }

  void updateMeasurements({
    double? bloodPressureMmHg,
    bool setBloodPressure = false,
    double? glucoseMgDl,
    bool setGlucose = false,
  }) {
    state = state.copyWith(
      latestBloodPressureMmHg: bloodPressureMmHg,
      updateLatestBloodPressure: setBloodPressure,
      latestGlucoseMgDl: glucoseMgDl,
      updateLatestGlucose: setGlucose,
    );
  }

  void toggleAllergy(String value) {
    final updated = [...state.allergies];
    if (updated.contains(value)) {
      updated.remove(value);
    } else {
      updated.add(value);
    }
    state = state.copyWith(allergies: updated);
  }

  void toggleDietaryRestriction(String value) {
    final updated = [...state.dietaryRestrictions];
    if (updated.contains(value)) {
      updated.remove(value);
    } else {
      updated.add(value);
    }
    state = state.copyWith(dietaryRestrictions: updated);
  }

  void toggleGoal(String value) {
    final updated = [...state.goals];
    if (updated.contains(value)) {
      updated.remove(value);
    } else {
      updated.add(value);
    }
    state = state.copyWith(goals: updated);
  }

  Future<void> submit() async {
    state = state.copyWith(isSubmitting: true);
    try {
      await Future<void>.delayed(const Duration(milliseconds: 600));
    } finally {
      state = state.copyWith(isSubmitting: false);
    }
  }
}

final onboardingControllerProvider =
    StateNotifierProvider<OnboardingController, OnboardingState>(
      (ref) => OnboardingController(),
    );
