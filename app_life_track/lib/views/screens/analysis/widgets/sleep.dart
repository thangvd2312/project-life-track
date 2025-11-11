import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:app_life_track/constants/colors.dart';
import 'package:app_life_track/constants/shadows.dart';
import 'package:app_life_track/constants/texts.dart';
import 'package:app_life_track/constants/sizes.dart';

class Sleep extends StatelessWidget {
  const Sleep({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: ThemeColors.success_300,
        borderRadius: BorderRadius.circular(ThemeSize.sm),
        boxShadow: [ThemeShadow.primary],
      ),
      padding: EdgeInsets.all(ThemeSize.lg),
      child: Column(
        spacing: ThemeSize.sm,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text("Sleep", style: ThemeText.textPrimaryBoldBase),
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
          Container(
            padding: EdgeInsets.all(ThemeSize.fontSizeBase),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(ThemeSize.sm),
            ),
            child: SleepNapBarChart(
              sleepData: [7, 7.5, 8, 6, 7, 8, 6.5],
              napData: [1, 1.5, 0.5, 1, 0, 0.5, 1],
            ),
          ),
        ],
      ),
    );
  }
}

class SleepNapBarChart extends StatelessWidget {
  final List<double> sleepData;
  final List<double> napData;

  const SleepNapBarChart({
    Key? key,
    required this.sleepData,
    required this.napData,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final groups = sleepData.asMap().entries.map((e) {
      final index = e.key;
      return BarChartGroupData(
        x: index,
        barRods: [
          // Sleep (xanh đậm)
          BarChartRodData(
            toY: sleepData[index],
            color: const Color(0xFF4CAF50),
            width: 16,
            borderRadius: const BorderRadius.vertical(top: Radius.circular(4)),
          ),
          // Nap (xanh nhạt)
          BarChartRodData(
            toY: napData[index],
            color: const Color(0xFFB9F6CA),
            width: 16,
            borderRadius: const BorderRadius.vertical(top: Radius.circular(4)),
          ),
        ],
      );
    }).toList();

    return Column(
      children: [
        SizedBox(
          height: 200,
          child: BarChart(
            BarChartData(
              gridData: FlGridData(
                show: true,
                drawVerticalLine: true,
                drawHorizontalLine: true,
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

              barGroups: groups,
            ),
          ),
        ),

        const SizedBox(height: 16),

        // Legend
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            _legendItem(color: const Color(0xFF4CAF50), label: 'Sleep'),
            const SizedBox(width: 24),
            _legendItem(color: const Color(0xFFB9F6CA), label: 'Nap'),
          ],
        ),
      ],
    );
  }

  Widget _legendItem({required Color color, required String label}) {
    return Row(
      children: [
        Container(
          width: 12,
          height: 12,
          decoration: BoxDecoration(color: color, shape: BoxShape.circle),
        ),
        const SizedBox(width: 8),
        Text(
          label,
          style: const TextStyle(fontSize: 14, color: Colors.black87),
        ),
      ],
    );
  }
}
