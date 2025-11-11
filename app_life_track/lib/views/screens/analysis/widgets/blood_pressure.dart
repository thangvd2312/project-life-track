import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:app_life_track/constants/colors.dart';
import 'package:app_life_track/constants/shadows.dart';
import 'package:app_life_track/constants/sizes.dart';
import 'package:app_life_track/constants/texts.dart';

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
      child: Column(
        spacing: 10,
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
          HighlightedLineChart(data: [120, 118, 125, 122, 130, 115, 128]),
        ],
      ),
    );
  }
}

class HighlightedLineChart extends StatefulWidget {
  final List<double> data;
  const HighlightedLineChart({super.key, required this.data});

  @override
  State<HighlightedLineChart> createState() => _HighlightedLineChartState();
}

class _HighlightedLineChartState extends State<HighlightedLineChart> {
  @override
  Widget build(BuildContext context) {
    final spots = widget.data
        .asMap()
        .entries
        .map((e) => FlSpot(e.key.toDouble(), e.value))
        .toList();

    return SizedBox(
      width: double.infinity,
      height: 200,
      child: LineChart(
        LineChartData(
          gridData: FlGridData(
            show: true,
            drawVerticalLine: true,
            drawHorizontalLine: true,
            horizontalInterval: 1,
            verticalInterval: 1,
            getDrawingHorizontalLine: (value) => FlLine(
              color: Colors.grey.withOpacity(0.3),
              strokeWidth: 1,
              dashArray: [5, 5],
            ),
            getDrawingVerticalLine: (value) => FlLine(
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
              color: Colors.red,
              barWidth: 3,
              isStrokeCapRound: true,
              dotData: FlDotData(show: false),
              belowBarData: BarAreaData(show: false),
            ),
          ],
        ),
      ),
    );
  }
}
