import 'package:flutter/material.dart';
import 'package:percent_indicator/percent_indicator.dart';
import 'package:app_life_track/constants/colors.dart';

class AccurateProgressBar extends StatelessWidget {
  final double percent;
  final double height;
  final Color progressColor;
  final Color backgroundColor;
  final Color thumbColor;

  const AccurateProgressBar({
    super.key,
    this.percent = 0.76,
    this.height = 12.0,
    this.progressColor = Colors.white,
    this.backgroundColor = const Color(0xFFE0E0E0),
    this.thumbColor = ThemeColors.yellow_100,
  });

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final double barWidth = constraints.maxWidth;
        final double thumbSize = height + 8;
        final double thumbOffset = (barWidth * percent) - (thumbSize / 2);

        return Stack(
          clipBehavior: Clip.none,
          children: [
            LinearPercentIndicator(
              percent: percent,
              lineHeight: height,
              backgroundColor: backgroundColor,
              progressColor: progressColor,
              barRadius: const Radius.circular(6),
              animation: true,
              animationDuration: 1000,
              animateFromLastPercent: true,
            ),

            Positioned(
              left: thumbOffset.clamp(0, barWidth - thumbSize),
              top: (height - thumbSize) / 2,
              child: Container(
                width: thumbSize,
                height: thumbSize,
                decoration: BoxDecoration(
                  color: thumbColor,
                  shape: BoxShape.circle,
                ),
              ),
            ),
          ],
        );
      },
    );
  }
}
