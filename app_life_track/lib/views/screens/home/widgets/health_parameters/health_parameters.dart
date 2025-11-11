import 'package:flutter/material.dart';
import 'package:app_life_track/views/screens/home/widgets/health_parameters/glucose.dart';
import 'package:app_life_track/views/screens/home/widgets/health_parameters/weight.dart';
import 'package:app_life_track/constants/sizes.dart';

class HealthParameters extends StatelessWidget {
  const HealthParameters({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      spacing: ThemeSize.sm,
      children: [
        Row(spacing: ThemeSize.sm, children: [Glucose(), Weight()]),
      ],
    );
  }
}
