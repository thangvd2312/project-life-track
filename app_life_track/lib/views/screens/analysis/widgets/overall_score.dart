import 'package:flutter/material.dart';
import 'package:percent_indicator/percent_indicator.dart';
import 'package:app_life_track/views/screens/analysis/widgets/dashinfo_card.dart';
import 'package:app_life_track/constants/colors.dart';
import 'package:app_life_track/constants/sizes.dart';
import 'package:app_life_track/constants/shadows.dart';

class OverallScore extends StatelessWidget {
  const OverallScore({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        boxShadow: [ThemeShadow.secondary],
        borderRadius: BorderRadius.circular(ThemeSize.sm),
      ),
      padding: EdgeInsets.only(
        top: ThemeSize.sm,
        bottom: 13,
        left: 15,
        right: 15,
      ),
      child: Column(
        spacing: 10,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Center(
            child: Text(
              "Overall Score",
              style: TextStyle(
                color: ThemeColors.primary,
                fontSize: ThemeSize.fontSizeMd,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
          Stack(
            alignment: Alignment.center,
            children: [
              // Thanh progress
              LinearPercentIndicator(
                lineHeight: 26,
                percent: 0.72,
                backgroundColor: Colors.grey.shade200,
                progressColor: ThemeColors.primary,
                barRadius: const Radius.circular(20),
                padding: EdgeInsets.zero,
              ),

              // Số ở giữa
              Text(
                '72',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],
          ),
          DashedInfoCard(
            message:
                'Your score is 72 out of 100! This is the message about your health. This is the message about your health. This is the message about your health. This is the message about your health.',
          ),
        ],
      ),
    );
  }
}
