import 'package:flutter/material.dart';
import 'package:app_life_track/views/screens/analysis/widgets/nutrition.dart';
import 'package:app_life_track/views/screens/analysis/widgets/food_intake.dart';
import 'package:app_life_track/views/screens/analysis/widgets/sleep.dart';
import 'package:app_life_track/views/screens/analysis/widgets/weight.dart';
import 'package:app_life_track/views/screens/analysis/widgets/glucose.dart';
import 'package:app_life_track/views/screens/analysis/widgets/blood_pressure.dart';
import 'package:app_life_track/views/screens/analysis/widgets/overall_score.dart';
import 'package:app_life_track/views/screens/analysis/widgets/segmented_button.dart';

class AnalysisScreen extends StatefulWidget {
  const AnalysisScreen({super.key});

  @override
  State<AnalysisScreen> createState() => _AnalysisScreenState();
}

class _AnalysisScreenState extends State<AnalysisScreen> {
  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Padding(
        padding: EdgeInsets.symmetric(vertical: 35, horizontal: 35),
        child: Column(
          spacing: 16,
          children: [
            const CustomSegmentedButton(),
            OverallScore(),
            BloodPressure(),
            Glucose(),
            Weight(),
            Sleep(),
            FoodIntake(),
            Nutrition(),
          ],
        ),
      ),
    );
  }
}
