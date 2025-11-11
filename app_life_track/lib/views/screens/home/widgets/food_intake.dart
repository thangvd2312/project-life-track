import 'package:app_life_track/constants/colors.dart';
import 'package:app_life_track/constants/shadows.dart';
import 'package:app_life_track/constants/sizes.dart';
import 'package:app_life_track/constants/texts.dart';
import 'package:flutter/material.dart';
import 'package:app_life_track/views/screens/home/widgets/multi_segment_indicator.dart';
import 'package:app_life_track/views/screens/home/nutrient_segment.dart';

class FoodIntake extends StatelessWidget {
  const FoodIntake({super.key});

  @override
  Widget build(BuildContext context) {
    final data = [
      NutrientSegment(name: 'Fat', value: 33, color: Colors.blue.shade500),
      NutrientSegment(name: 'Protein', value: 11, color: Colors.blue.shade300),
      NutrientSegment(
        name: 'Carbonhydrate',
        value: 22,
        color: Colors.blue.shade100,
      ),
    ];

    return Container(
      padding: EdgeInsets.all(ThemeSize.lg),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(ThemeSize.sm),
        boxShadow: [ThemeShadow.primary],
      ),
      child: Column(
        spacing: 10,
        children: [
          Row(
            children: [
              Text("Food Intake", style: ThemeText.textPrimaryBoldBase),
            ],
          ),
          MultiSegmentIndicator(
            segments: data,
            totalTarget: 100,
            centerWidget: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Text('1174 kcal', style: ThemeText.textPrimaryBoldBase),
                Text('75% intake', style: ThemeText.textPrimaryLightXs),
              ],
            ),
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.end,
            children: [
              GestureDetector(
                onTap: () {},
                child: Container(
                  padding: EdgeInsets.zero,
                  child: Row(
                    children: [
                      Text(
                        "View details",
                        style: ThemeText.textSecondaryBoldSm,
                      ),
                      Icon(
                        Icons.chevron_right,
                        color: ThemeColors.textSecondary,
                        size: 16,
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
