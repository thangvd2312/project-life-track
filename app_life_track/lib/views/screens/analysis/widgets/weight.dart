import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:app_life_track/constants/colors.dart';
import 'package:app_life_track/constants/shadows.dart';
import 'package:app_life_track/constants/sizes.dart';
import 'package:app_life_track/constants/texts.dart';

class Weight extends StatelessWidget {
  const Weight({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
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
                    color: ThemeColors.secondary,
                  ),
                  Text(
                    "0.8kg vs last week",
                    style: ThemeText.textSecondaryThinXs,
                  ),
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
              color: ThemeColors.secondary,
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
