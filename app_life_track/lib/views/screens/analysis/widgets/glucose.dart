import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:app_life_track/constants/colors.dart';
import 'package:app_life_track/constants/shadows.dart';
import 'package:app_life_track/constants/sizes.dart';
import 'package:app_life_track/constants/texts.dart';

class Glucose extends StatelessWidget {
  const Glucose({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(8),
        boxShadow: [ThemeShadow.primary],
      ),
      padding: EdgeInsets.all(ThemeSize.lg),
      child: Column(
        spacing: ThemeSize.sm,
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
                    child: Text("mg/dL", style: ThemeText.textSecondaryBoldSm),
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
          DotOnlyLineChart(data: [5.2, 4.8, 6.1, 5.5, 4.9, 5.8, 5.3]),
        ],
      ),
    );
  }
}

class DotOnlyLineChart extends StatelessWidget {
  final List<double> data; // ← CHỈ CẦN CÁI NÀY!

  const DotOnlyLineChart({Key? key, required this.data}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final spots = data
        .asMap()
        .entries
        .map((e) => FlSpot(e.key.toDouble(), e.value))
        .toList();

    return SizedBox(
      width: double.infinity,
      height: 200,
      child: LineChart(
        LineChartData(
          // Grid xám, dấu chấm chấm
          gridData: FlGridData(
            show: true,
            drawHorizontalLine: true,
            drawVerticalLine: true,
            horizontalInterval: 1,
            verticalInterval: 1,
            getDrawingHorizontalLine: (_) => FlLine(
              color: Colors.grey.withOpacity(0.3),
              strokeWidth: 1,
              dashArray: [5, 5],
            ),
            getDrawingVerticalLine: (_) => FlLine(
              color: Colors.grey.withOpacity(0.3),
              strokeWidth: 1,
              dashArray: [5, 5],
            ),
          ),
          borderData: FlBorderData(
            show: true,
            border: Border.all(width: 1, color: ThemeColors.grey_100),
          ),
          titlesData: FlTitlesData(show: false),

          lineBarsData: [
            LineChartBarData(
              spots: spots,
              isCurved: false,
              color: Colors.transparent,
              barWidth: 0,
              dotData: FlDotData(
                show: true,
                getDotPainter: (_, __, ___, ____) => FlDotCirclePainter(
                  radius: 6,
                  color: Colors.purple,
                  strokeWidth: 2,
                  strokeColor: Colors.white,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
