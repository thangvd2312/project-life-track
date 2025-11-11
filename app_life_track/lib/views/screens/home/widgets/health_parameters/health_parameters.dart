import 'package:flutter/material.dart';
import 'package:app_life_track/constants/sizes.dart';
import 'package:app_life_track/views/screens/home/widgets/health_parameters/blood_pressure.dart';
import 'package:app_life_track/views/screens/home/widgets/health_parameters/glucose.dart';
import 'package:app_life_track/views/screens/home/widgets/health_parameters/weight.dart';

class HealthParameters extends StatelessWidget {
  const HealthParameters({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      spacing: ThemeSize.sm,
      children: [
        BloodPressure(),
        Row(spacing: ThemeSize.sm, children: [Glucose(), Weight()]),
      ],
    );
  }
}
