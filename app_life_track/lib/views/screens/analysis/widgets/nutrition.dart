import 'package:flutter/material.dart';
import 'package:percent_indicator/percent_indicator.dart';
import 'package:app_life_track/constants/shadows.dart';
import 'package:app_life_track/constants/sizes.dart';
import 'package:app_life_track/views/screens/home/nutrient_segment.dart';

class Nutrition extends StatelessWidget {
  const Nutrition({super.key});

  @override
  Widget build(BuildContext context) {
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

    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(ThemeSize.sm),
        boxShadow: [ThemeShadow.primary],
      ),
      padding: EdgeInsets.only(top: ThemeSize.lg, bottom: ThemeSize.lg),
      child: Column(
        spacing: 16,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          ...dataDetail.map((item) {
            bool isOver = (item.value / item.total) > .8 ? true : false;
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
                                mainAxisSize:
                                    MainAxisSize.min, // rất quan trọng
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
                                    color: isOver ? Colors.amber : Colors.green,
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
                      style: TextStyle(fontSize: 14, color: Colors.red),
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
                      Icon(Icons.chevron_right, color: Colors.grey, size: 16),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
