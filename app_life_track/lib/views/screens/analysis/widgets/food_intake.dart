import 'package:flutter/material.dart';
import 'package:percent_indicator/percent_indicator.dart';
import 'package:app_life_track/constants/shadows.dart';
import 'package:app_life_track/constants/sizes.dart';
import 'package:app_life_track/constants/texts.dart';
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

          Column(
            spacing: ThemeSize.sm,
            children: [
              ...data.map((item) {
                double percent = item.value / item.total;

                return Column(
                  spacing: ThemeSize.xs,
                  children: [
                    Row(children: [Text(item.name)]),
                    Stack(
                      alignment: Alignment.center,
                      children: [
                        LinearPercentIndicator(
                          lineHeight: 26,
                          percent: percent,
                          backgroundColor: Colors.grey.shade200,
                          progressColor: item.color,
                          barRadius: const Radius.circular(20),
                          padding: EdgeInsets.zero,
                        ),
                        Text(
                          "${item.value} ${item.unit}",
                          style: TextStyle(
                            color: item.color,
                            fontSize: 12,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ],
                    ),
                  ],
                );
              }),
            ],
          ),
        ],
      ),
    );
  }
}
