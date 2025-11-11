import 'package:flutter/material.dart';
import 'package:app_life_track/constants/shadows.dart';
import 'package:percent_indicator/percent_indicator.dart';
import 'package:app_life_track/views/screens/home/nutrient_segment.dart';
import 'package:app_life_track/views/screens/home/widgets/curved_edge.dart';
import 'package:app_life_track/views/screens/home/widgets/multi_segment_indicator.dart';

class WeeklySummary extends StatelessWidget {
  const WeeklySummary({super.key});

  @override
  Widget build(BuildContext context) {
    final data = [
      NutrientSegment(name: 'Protein', value: 76, color: Colors.white),
    ];

    final dataDetail = [
      NutrientSegment(
        name: "Sodium",
        value: 2200,
        color: Colors.yellow,
        total: 2000,
        unit: "mg",
      ),
      NutrientSegment(
        name: "Protein",
        value: 35,
        color: Colors.green.shade100,
        total: 50,
        unit: "g",
      ),
      NutrientSegment(
        name: 'Trans Fat',
        value: 1.2,
        color: Colors.purple.shade100,
        total: 2,
        unit: "g",
      ),
      NutrientSegment(
        name: 'Cholesterol',
        value: 280,
        color: Colors.yellow,
        total: 300,
        unit: "mgg",
      ),
    ];

    return Center(
      child: Container(
        width: double.infinity,
        decoration: BoxDecoration(
          color: Colors.transparent,
          boxShadow: [ThemeShadow.secondary],
          borderRadius: BorderRadius.circular(15),
        ),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(15),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Chart với curved edge
              Container(
                color: Colors.white,
                child: CurvedEdgeWidget(
                  radius: 80,
                  child: Container(
                    width: double.infinity,
                    padding: EdgeInsets.only(
                      top: 20,
                      left: 20,
                      right: 20,
                      bottom: 38,
                    ),
                    decoration: BoxDecoration(color: Colors.blue),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                "Weekly Summary",
                                style: TextStyle(
                                  color: Colors.white,
                                  fontSize: 18,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                              Text(
                                "Keep up the good work! 💪",
                                style: TextStyle(
                                  color: Colors.white,
                                  fontSize: 14,
                                ),
                              ),
                            ],
                          ),
                        ),
                        MultiSegmentIndicator(
                          segments: data,
                          totalTarget: 100,
                          showLegend: false,
                          centerWidget: Column(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Text(
                                '76',
                                style: TextStyle(
                                  fontSize: 34,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.white,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),

              // Detail
              Container(
                width: double.infinity,
                decoration: BoxDecoration(color: Colors.white),
                padding: EdgeInsets.only(bottom: 20),
                child: Column(
                  spacing: 16,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    ...dataDetail.map((item) {
                      bool isOver = (item.value / item.total) > .8
                          ? true
                          : false;
                      double percent = item.value / item.total > 1
                          ? 1
                          : item.value / item.total;

                      return Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        spacing: 6,
                        children: [
                          Container(
                            padding: EdgeInsets.symmetric(horizontal: 20),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              spacing: 6,
                              children: [
                                // Row 1
                                Text(
                                  item.name,
                                  style: TextStyle(
                                    fontSize: 15,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                                // Row 2
                                Row(
                                  children: [
                                    Text(
                                      "${item.value} ${item.unit}",
                                      style: TextStyle(
                                        fontSize: 14,
                                        fontWeight: FontWeight.w600,
                                      ),
                                    ),
                                    Expanded(
                                      child: Center(
                                        child: Row(
                                          mainAxisSize: MainAxisSize
                                              .min, // rất quan trọng
                                          children: [
                                            Text(
                                              isOver ? "Over" : "Safe",
                                              style: TextStyle(
                                                fontSize: 14,
                                                fontWeight: FontWeight.w600,
                                                color: isOver
                                                    ? Colors.amber
                                                    : Colors.green,
                                              ),
                                            ),
                                            SizedBox(
                                              width: 4,
                                            ), // khoảng cách giữa text và icon
                                            Icon(
                                              Icons.warning_amber,
                                              color: isOver
                                                  ? Colors.amber
                                                  : Colors.green,
                                              size: 18,
                                            ),
                                          ],
                                        ),
                                      ),
                                    ),
                                    Text(
                                      "${item.total} ${item.unit}",
                                      style: TextStyle(
                                        fontSize: 14,
                                        fontWeight: FontWeight.w600,
                                        color: Colors.grey,
                                      ),
                                    ),
                                  ],
                                ),
                              ],
                            ),
                          ),
                          // Row 3
                          Padding(
                            padding: const EdgeInsets.symmetric(horizontal: 10),
                            child: LinearPercentIndicator(
                              lineHeight: 14.0,
                              percent: percent,
                              backgroundColor: Colors.grey.shade200,
                              progressColor: item.color,
                              barRadius: Radius.circular(10),
                            ),
                          ),

                          // Row 4
                          if (isOver)
                            Padding(
                              padding: const EdgeInsets.only(left: 20),
                              child: Text(
                                "Message if there is any!",
                                style: TextStyle(
                                  fontSize: 14,
                                  color: Colors.red,
                                ),
                              ),
                            ),
                        ],
                      );
                    }).toList(),

                    Row(
                      mainAxisAlignment: MainAxisAlignment.end,
                      children: [
                        GestureDetector(
                          onTap: () {},
                          child: Container(
                            padding: EdgeInsets.only(right: 16),
                            child: Row(
                              children: [
                                Text(
                                  "View details",
                                  style: TextStyle(
                                    fontSize: 14,
                                    color: Colors.grey,
                                    fontWeight: FontWeight.w600,
                                  ),
                                ),
                                Icon(
                                  Icons.chevron_right,
                                  color: Colors.grey,
                                  size: 16,
                                ),
                              ],
                            ),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
