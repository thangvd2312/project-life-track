import 'package:app_life_track/constants/colors.dart';
import 'package:app_life_track/constants/shadows.dart';
import 'package:app_life_track/constants/sizes.dart';
import 'package:app_life_track/constants/texts.dart';
import 'package:flutter/material.dart';
import 'package:app_life_track/views/screens/home/widgets/accurate_progress_bar.dart';

class AverageSleepInWeek extends StatelessWidget {
  const AverageSleepInWeek({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: ThemeColors.success_300,
        borderRadius: BorderRadius.circular(ThemeSize.sm),
        boxShadow: [ThemeShadow.primary],
      ),
      padding: EdgeInsets.symmetric(vertical: ThemeSize.lg),
      child: Column(
        spacing: 10,
        children: [
          // Row 1
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: ThemeSize.lg),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  "Average Sleep this week",
                  style: ThemeText.textPrimaryBoldBase,
                ),
                SizedBox(
                  width: ThemeSize.xl,
                  height: ThemeSize.xl,
                  child: IconButton(
                    onPressed: () {},
                    iconSize: ThemeSize.fontSizeSm,
                    style: IconButton.styleFrom(backgroundColor: Colors.white),
                    icon: Icon(Icons.add),
                    color: Colors.black,
                  ),
                ),
              ],
            ),
          ),

          // Row 2
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: ThemeSize.lg),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text("6 hours 45 minutes", style: ThemeText.textPrimaryBoldMd),
                Text("73/100", style: ThemeText.textPrimarySm),
              ],
            ),
          ),

          // Row 3
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: ThemeSize.sm),
            child: AccurateProgressBar(),
          ),
        ],
      ),
    );
  }
}
