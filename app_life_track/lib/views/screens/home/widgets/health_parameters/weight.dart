import 'package:flutter/material.dart';
import 'package:app_life_track/constants/colors.dart';
import 'package:app_life_track/constants/shadows.dart';
import 'package:app_life_track/constants/sizes.dart';
import 'package:app_life_track/constants/texts.dart';

class Weight extends StatelessWidget {
  const Weight({super.key});

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Container(
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(8),
          boxShadow: [ThemeShadow.primary],
        ),
        padding: EdgeInsets.only(
          top: ThemeSize.lg,
          left: ThemeSize.lg,
          right: 0,
          bottom: ThemeSize.lg,
        ),
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
                          image: AssetImage("assets/icons/ic-weight.png"),
                          width: ThemeSize.lg,
                          height: ThemeSize.lg,
                        ),
                        Text("Weight", style: ThemeText.textPrimaryBoldSm),
                      ],
                    ),
                    Container(
                      height: 1,
                      color: ThemeColors.yellow_100,
                      width: 80,
                    ),
                  ],
                ),
                Row(
                  spacing: 4,
                  children: [
                    Baseline(
                      baseline: 24.0,
                      baselineType: TextBaseline.alphabetic,
                      child: Text("65.2", style: ThemeText.textPrimaryBoldMd),
                    ),
                    Baseline(
                      baseline: 24.0,
                      baselineType: TextBaseline.alphabetic,
                      child: Text("kg", style: ThemeText.textSecondaryBoldSm),
                    ),
                  ],
                ),
                Row(
                  spacing: ThemeSize.xxs,
                  children: [
                    Icon(
                      Icons.arrow_downward,
                      size: 14,
                      color: ThemeColors.error_100,
                    ),
                    Text(
                      "0.8kg vs last week",
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
