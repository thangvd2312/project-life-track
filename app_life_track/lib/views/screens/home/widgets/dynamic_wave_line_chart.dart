import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';

class DynamicWaveLineChart extends StatelessWidget {
  final List<double> data;
  final double height;
  final double? width;
  final bool showBelowArea;
  final Duration animationDuration;

  const DynamicWaveLineChart({
    super.key,
    required this.data,
    this.height = 120,
    this.width,
    this.showBelowArea = true,
    this.animationDuration = const Duration(milliseconds: 1200),
  });

  @override
  Widget build(BuildContext context) {
    if (data.isEmpty) return const SizedBox();

    final spots = data
        .asMap()
        .entries
        .map((e) => FlSpot(e.key.toDouble(), e.value))
        .toList();

    final values = data;
    final minY = values.reduce((a, b) => a < b ? a : b) * 0.8;
    final maxY = values.reduce((a, b) => a > b ? a : b) * 1.2;

    return SizedBox(
      width: width,
      height: height,
      child: LineChart(
        LineChartData(
          minX: 0,
          maxX: (data.length - 1).toDouble(),
          minY: minY,
          maxY: maxY,
          gridData: const FlGridData(show: false),
          borderData: FlBorderData(show: false),
          titlesData: const FlTitlesData(show: false),
          lineTouchData: const LineTouchData(enabled: false),
          lineBarsData: [
            LineChartBarData(
              spots: spots,
              isCurved: true,
              curveSmoothness: 0.35,
              barWidth: 3.5,
              isStrokeCapRound: true,
              dotData: const FlDotData(show: false),

              // ĐƯỜNG CONG: XANH ĐẬM → XANH NHẠT (trái → phải)
              gradient: const LinearGradient(
                begin: Alignment.centerLeft,
                end: Alignment.centerRight,
                colors: [
                  Color(0xFF60A5FA), // Xanh đậm (navy)
                  Color(0xFF60A5FA), // Xanh nhạt (sky blue)
                ],
                stops: [0.0, 1.0],
              ),

              belowBarData: showBelowArea
                  ? BarAreaData(
                      show: true,
                      // PHẦN DƯỚI: MỜ DẦN TỪ XANH NHẠT → TRẮNG
                      gradient: const LinearGradient(
                        begin: Alignment.topCenter,
                        end: Alignment.bottomCenter,
                        colors: [Color(0x4060A5FA), Colors.transparent],
                        stops: [0.0, 1.0],
                      ),
                    )
                  : BarAreaData(show: false),
            ),
          ],
        ),
        duration: animationDuration,
        curve: Curves.easeInOutCubic,
      ),
    );
  }
}
