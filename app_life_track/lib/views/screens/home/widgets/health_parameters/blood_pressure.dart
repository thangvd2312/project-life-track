import 'package:flutter/material.dart';
import 'package:app_life_track/constants/colors.dart';
import 'package:app_life_track/constants/shadows.dart';
import 'package:app_life_track/constants/sizes.dart';
import 'package:app_life_track/constants/texts.dart';
import 'package:app_life_track/views/screens/home/widgets/dynamic_wave_line_chart.dart';

class BloodPressure extends StatelessWidget {
  const BloodPressure({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(ThemeSize.sm),
        boxShadow: [ThemeShadow.primary],
      ),
      padding: EdgeInsets.all(ThemeSize.lg),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Column(
            spacing: ThemeSize.sm,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                spacing: ThemeSize.xxs,
                children: [
                  Row(
                    spacing: ThemeSize.xs,
                    children: [
                      Image(
                        image: AssetImage("assets/icons/ic-heart-fill.png"),
                        width: ThemeSize.lg,
                        height: ThemeSize.lg,
                      ),
                      Text(
                        "Blood Pressure",
                        style: ThemeText.textPrimaryBoldSm,
                      ),
                    ],
                  ),
                  Container(
                    height: ThemeSize.px,
                    color: ThemeColors.error_100,
                    width: 130,
                  ),
                ],
              ),
              Row(
                spacing: ThemeSize.xs,
                children: [
                  Baseline(
                    baseline: 24.0,
                    baselineType: TextBaseline.alphabetic,
                    child: Text("120/78", style: ThemeText.textPrimaryBoldMd),
                  ),
                  Baseline(
                    baseline: 24.0,
                    baselineType: TextBaseline.alphabetic,
                    child: Text("mmHg", style: ThemeText.textSecondaryBoldSm),
                  ),
                ],
              ),
              Row(
                spacing: 8,
                children: [
                  Container(
                    width: 8,
                    height: 8,
                    decoration: BoxDecoration(
                      color: Colors.green,
                      boxShadow: [
                        BoxShadow(
                          color: Color(0x8034C759),
                          blurRadius: 4,
                          offset: Offset(0, 0),
                          spreadRadius: 0,
                        ),
                      ],
                      borderRadius: BorderRadius.circular(200),
                    ),
                  ),
                  Text("Normal", style: ThemeText.textPrimaryThinSm),
                ],
              ),
            ],
          ),
          DynamicWaveLineChart(
            data: [1.0, 2, 1, 3, 2.8, 3, 3.5, 4, 4.5, 5],
            height: 80,
            width: 140,
          ),
        ],
      ),
    );
  }
}
