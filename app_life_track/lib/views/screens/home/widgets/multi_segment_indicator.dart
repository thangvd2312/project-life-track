import 'package:app_life_track/views/screens/home/nutrient_segment.dart';
import 'package:flutter/material.dart';
import 'package:percent_indicator/percent_indicator.dart';

class MultiSegmentIndicator extends StatelessWidget {
  final List<NutrientSegment> segments;
  final double totalTarget;
  final bool showLegend;
  final Widget? centerWidget;
  final double lineWidth;

  const MultiSegmentIndicator({
    super.key,
    required this.segments,
    required this.totalTarget,
    this.showLegend = true,
    this.centerWidget,
    this.lineWidth = 10,
  });

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final availableWidth = constraints.maxWidth;

        final chartSize = (availableWidth * 0.45).clamp(80.0, 160.0);
        final legendWidth = availableWidth - chartSize - (chartSize * 0.15);

        final shouldShowLegend = showLegend && legendWidth > 80;

        final dynamicLineWidth = (chartSize * 0.07).clamp(6.0, 12.0);
        final legendFontSize = (chartSize * 0.09).clamp(10.0, 14.0);

        double sumValues = segments.fold(0, (sum, seg) => sum + seg.value);
        double remaining = (totalTarget - sumValues).clamp(0.0, totalTarget);

        List<Widget> indicators = [];
        indicators.add(
          CircularPercentIndicator(
            radius: chartSize / 2,
            lineWidth: dynamicLineWidth,
            percent: 1.0,
            progressColor: Colors.grey.shade300,
            backgroundColor: Colors.transparent,
          ),
        );

        double startAngle = 0.0;
        for (var seg in segments) {
          double percent = seg.value / totalTarget;
          indicators.add(
            CircularPercentIndicator(
              radius: chartSize / 2,
              lineWidth: dynamicLineWidth,
              percent: percent,
              startAngle: startAngle,
              progressColor: seg.color,
              backgroundColor: Colors.transparent,
              circularStrokeCap: CircularStrokeCap.round,
              animation: true,
            ),
          );
          startAngle += percent * 360;
        }

        if (remaining > 0) {
          indicators.add(
            CircularPercentIndicator(
              radius: chartSize / 2,
              lineWidth: dynamicLineWidth,
              percent: remaining / totalTarget,
              startAngle: startAngle,
              progressColor: Colors.grey.shade300,
              backgroundColor: Colors.transparent,
              circularStrokeCap: CircularStrokeCap.round,
            ),
          );
        }

        // === LEGEND ===
        List<Widget> legendItems = shouldShowLegend
            ? segments.map((seg) {
                return Padding(
                  padding: const EdgeInsets.symmetric(vertical: 2.0),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Container(
                        width: legendFontSize * 0.9,
                        height: legendFontSize * 0.9,
                        decoration: BoxDecoration(
                          color: seg.color,
                          shape: BoxShape.circle,
                        ),
                      ),
                      SizedBox(width: legendFontSize * 0.4),
                      Flexible(
                        child: Text(
                          seg.name,
                          style: TextStyle(fontSize: legendFontSize),
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                    ],
                  ),
                );
              }).toList()
            : [];

        return ConstrainedBox(
          constraints: BoxConstraints(maxWidth: availableWidth),
          child: FittedBox(
            fit: BoxFit.contain,
            alignment: Alignment.centerLeft,
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                SizedBox(
                  width: chartSize,
                  height: chartSize,
                  child: Stack(
                    alignment: Alignment.center,
                    children: [...indicators, centerWidget ?? Container()],
                  ),
                ),

                if (shouldShowLegend) ...[
                  SizedBox(width: chartSize * 0.15),
                  SizedBox(
                    width: legendWidth,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisSize: MainAxisSize.min,
                      children: legendItems,
                    ),
                  ),
                ],
              ],
            ),
          ),
        );
      },
    );
  }
}
