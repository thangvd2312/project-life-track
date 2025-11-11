import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:app_life_track/constants/colors.dart';
import 'package:app_life_track/constants/sizes.dart';
import 'package:app_life_track/constants/texts.dart';

class DashedBorderPainter extends CustomPainter {
  final Color color;
  final double strokeWidth;
  final double dashWidth;
  final double dashSpace;
  final double borderRadius;

  DashedBorderPainter({
    this.color = Colors.blue,
    this.strokeWidth = 2.0,
    this.dashWidth = 5.0,
    this.dashSpace = 3.0,
    this.borderRadius = 16.0,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = color
      ..strokeWidth = strokeWidth
      ..style = PaintingStyle.stroke;

    final rrect = RRect.fromRectAndRadius(
      Rect.fromLTWH(0, 0, size.width, size.height),
      Radius.circular(borderRadius),
    );

    final path = Path()..addRRect(rrect);

    final dashPath = Path();
    double distance = 0.0;
    for (PathMetric pathMetric in path.computeMetrics()) {
      while (distance < pathMetric.length) {
        dashPath.addPath(
          pathMetric.extractPath(distance, distance + dashWidth),
          Offset.zero,
        );
        distance += dashWidth + dashSpace;
      }
    }

    canvas.drawPath(dashPath, paint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

class DashedInfoCard extends StatelessWidget {
  final String message;

  const DashedInfoCard({Key? key, required this.message}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return IntrinsicHeight(
      child: CustomPaint(
        painter: DashedBorderPainter(
          color: ThemeColors.primary,
          dashWidth: 6,
          dashSpace: 4,
          borderRadius: 16,
        ),
        child: Container(
          padding: const EdgeInsets.all(ThemeSize.sm),
          decoration: BoxDecoration(
            color: ThemeColors.blue_300,
            borderRadius: BorderRadius.circular(16),
          ),
          child: Text.rich(
            TextSpan(children: [TextSpan(text: message)]),
            style: ThemeText.textPrimaryThinSm,
          ),
        ),
      ),
    );
  }
}
