import 'package:flutter/material.dart';
import 'package:app_life_track/constants/colors.dart';
import 'package:app_life_track/constants/shadows.dart';
import 'package:app_life_track/constants/sizes.dart';
import 'package:app_life_track/constants/texts.dart';

class Glucose extends StatelessWidget {
  const Glucose({super.key});

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Container(
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(8),
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
                          image: AssetImage("assets/icons/ic-candy-fill.png"),
                          width: ThemeSize.lg,
                          height: ThemeSize.lg,
                        ),
                        Text("Glucose", style: ThemeText.textPrimaryBoldSm),
                      ],
                    ),
                    Container(
                      height: 1,
                      color: ThemeColors.purple_200,
                      width: 90,
                    ),
                  ],
                ),
                Row(
                  spacing: ThemeSize.xs,
                  children: [
                    Baseline(
                      baseline: 24.0,
                      baselineType: TextBaseline.alphabetic,
                      child: Text("85", style: ThemeText.textPrimaryBoldMd),
                    ),
                    Baseline(
                      baseline: 24.0,
                      baselineType: TextBaseline.alphabetic,
                      child: Text(
                        "mg/dL",
                        style: ThemeText.textSecondaryBoldSm,
                      ),
                    ),
                  ],
                ),
                Row(
                  children: [
                    Text(
                      "Before breakfast",
                      style: ThemeText.textSecondaryThinXs,
                    ),
                  ],
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
