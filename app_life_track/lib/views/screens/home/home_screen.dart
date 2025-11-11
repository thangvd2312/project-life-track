import 'package:app_life_track/widgets/bottom_nav.dart';
import 'package:flutter/material.dart';
import 'package:percent_indicator/percent_indicator.dart';
import 'package:fl_chart/fl_chart.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          child: Padding(
            padding: EdgeInsets.symmetric(vertical: 35, horizontal: 35),
            child: Column(
              spacing: 16,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Header(),
                WeeklySummary(),
                AverageSleepInWeek(),
                TodayMedicine(),
                FoodIntake(),
                HealthParameters(),
              ],
            ),
          ),
        ),
      ),
      bottomNavigationBar: const CustomBottomNav(),
    );
  }
}

class HealthParameters extends StatelessWidget {
  const HealthParameters({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      spacing: 10,
      children: [
        BloodPressure(),
        Row(spacing: 10, children: [Glucose(), Weight()]),
      ],
    );
  }
}

class BloodPressure extends StatelessWidget {
  const BloodPressure({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(8),
        boxShadow: [
          BoxShadow(
            color: Color(0x1A000000), // #0000001A
            offset: Offset(1, 1), // x=1, y=1
            blurRadius: 4,
            spreadRadius: 0,
          ),
        ],
      ),
      padding: EdgeInsets.all(20),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Column(
            spacing: 10,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                spacing: 2,
                children: [
                  Row(
                    spacing: 5,
                    children: [
                      Image(
                        image: AssetImage("assets/icons/ic-heart-fill.png"),
                        width: 20,
                        height: 20,
                      ),
                      Text(
                        "Blood Pressure",
                        style: TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ],
                  ),
                  Container(height: 1, color: Colors.red, width: 130),
                ],
              ),
              Row(
                spacing: 4,
                children: [
                  Baseline(
                    baseline:
                        24.0, // Đặt baseline này tùy theo font size của chữ lớn
                    baselineType: TextBaseline.alphabetic,
                    child: Text(
                      "120/78",
                      style: TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                  Baseline(
                    baseline: 24.0, // Đặt cùng baseline để căn chỉnh cho "mmHg"
                    baselineType: TextBaseline.alphabetic,
                    child: Text(
                      "mmHg",
                      style: TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.w600,
                        color: Colors.grey,
                      ),
                    ),
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
                  Text(
                    "Normal",
                    style: TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.w400,
                      color: Colors.grey,
                    ),
                  ),
                ],
              ),
            ],
          ),
          DynamicWaveLineChart(
            data: [1.0, 2, 1, 3, 2.8, 3, 3.5, 4, 4.5, 5],
            height: 80,
            width: 140,
          ),
        ],
      ),
    );
  }
}

class Glucose extends StatelessWidget {
  const Glucose({super.key});

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Container(
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(8),
          boxShadow: [
            BoxShadow(
              color: Color(0x1A000000), // #0000001A
              offset: Offset(1, 1), // x=1, y=1
              blurRadius: 4,
              spreadRadius: 0,
            ),
          ],
        ),
        padding: EdgeInsets.all(20),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Column(
              spacing: 10,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  spacing: 2,
                  children: [
                    Row(
                      spacing: 5,
                      children: [
                        Image(
                          image: AssetImage("assets/icons/ic-candy-fill.png"),
                          width: 20,
                          height: 20,
                        ),
                        Text(
                          "Glucose",
                          style: TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ],
                    ),
                    Container(height: 1, color: Colors.purple, width: 90),
                  ],
                ),
                Row(
                  spacing: 4,
                  children: [
                    Baseline(
                      baseline:
                          24.0, // Đặt baseline này tùy theo font size của chữ lớn
                      baselineType: TextBaseline.alphabetic,
                      child: Text(
                        "85",
                        style: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                    Baseline(
                      baseline:
                          24.0, // Đặt cùng baseline để căn chỉnh cho "mmHg"
                      baselineType: TextBaseline.alphabetic,
                      child: Text(
                        "mg/dL",
                        style: TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.w600,
                          color: Colors.grey,
                        ),
                      ),
                    ),
                  ],
                ),
                Row(
                  spacing: 8,
                  children: [
                    Text(
                      "Before breakfast",
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w400,
                        color: Colors.grey,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

class Weight extends StatelessWidget {
  const Weight({super.key});

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Container(
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(8),
          boxShadow: [
            BoxShadow(
              color: Color(0x1A000000), // #0000001A
              offset: Offset(1, 1), // x=1, y=1
              blurRadius: 4,
              spreadRadius: 0,
            ),
          ],
        ),
        padding: EdgeInsets.only(top: 20, left: 20, right: 0, bottom: 20),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Column(
              spacing: 10,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  spacing: 2,
                  children: [
                    Row(
                      spacing: 5,
                      children: [
                        Image(
                          image: AssetImage("assets/icons/ic-weight.png"),
                          width: 20,
                          height: 20,
                        ),
                        Text(
                          "Weight",
                          style: TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ],
                    ),
                    Container(height: 1, color: Colors.yellow, width: 80),
                  ],
                ),
                Row(
                  spacing: 4,
                  children: [
                    Baseline(
                      baseline:
                          24.0, // Đặt baseline này tùy theo font size của chữ lớn
                      baselineType: TextBaseline.alphabetic,
                      child: Text(
                        "65.2",
                        style: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                    Baseline(
                      baseline:
                          24.0, // Đặt cùng baseline để căn chỉnh cho "mmHg"
                      baselineType: TextBaseline.alphabetic,
                      child: Text(
                        "kg",
                        style: TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.w600,
                          color: Colors.grey,
                        ),
                      ),
                    ),
                  ],
                ),
                Row(
                  spacing: 3,
                  children: [
                    Icon(Icons.arrow_downward, size: 14, color: Colors.red),
                    Text(
                      "0.8kg vs last week",
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w400,
                        color: Colors.grey,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

class DynamicWaveLineChart extends StatelessWidget {
  final List<double> data;
  final double height;
  final double? width;
  final bool showBelowArea;
  final Duration animationDuration;

  const DynamicWaveLineChart({
    Key? key,
    required this.data,
    this.height = 120,
    this.width,
    this.showBelowArea = true,
    this.animationDuration = const Duration(milliseconds: 1200),
  }) : super(key: key);

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

class FoodIntake extends StatelessWidget {
  const FoodIntake({super.key});

  @override
  Widget build(BuildContext context) {
    final data = [
      NutrientSegment(name: 'Fat', value: 33, color: Colors.blue.shade500),
      NutrientSegment(name: 'Protein', value: 11, color: Colors.blue.shade300),
      NutrientSegment(
        name: 'Carbonhydrate',
        value: 22,
        color: Colors.blue.shade100,
      ),
    ];

    return Container(
      padding: EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(8),
        boxShadow: [
          BoxShadow(
            color: Color(0x1A000000), // #0000001A
            offset: Offset(1, 1), // x=1, y=1
            blurRadius: 4,
            spreadRadius: 0,
          ),
        ],
      ),
      child: Column(
        spacing: 10,
        children: [
          Row(
            children: [
              Text(
                "Food Intake",
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
              ),
            ],
          ),
          MultiSegmentIndicatorWithLegend(
            segments: data,
            totalTarget: 100,
            size: 60,
            centerWidget: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  '1174 kcal',
                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                ),
                Text(
                  '75% intake',
                  style: TextStyle(fontSize: 12, fontWeight: FontWeight.w300),
                ),
              ],
            ),
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.end,
            children: [
              GestureDetector(
                onTap: () {},
                child: Container(
                  padding: EdgeInsets.zero,
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

class MedicineTrack {
  final String name;
  final String time;
  final bool isUsed;

  MedicineTrack(this.name, this.time, this.isUsed);
}

class TodayMedicine extends StatelessWidget {
  const TodayMedicine({super.key});

  @override
  Widget build(BuildContext context) {
    final medicines = [
      MedicineTrack("Tylenol", "08:00", false),
      MedicineTrack("Paracetamol", "08:00", false),
      MedicineTrack("Ibuprofen", "08:00", true),
      MedicineTrack("Paracetamol", "08:00", true),
      MedicineTrack("Tylenol", "08:00", true),
    ];

    return Container(
      decoration: BoxDecoration(
        color: Color(0xFFFFD8E4),
        borderRadius: BorderRadius.circular(8),
        boxShadow: [
          BoxShadow(
            color: Color(0x1A000000), // #0000001A
            offset: Offset(1, 1), // x=1, y=1
            blurRadius: 4,
            spreadRadius: 0,
          ),
        ],
      ),
      padding: EdgeInsets.all(20),
      child: Column(
        spacing: 10,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                "Today's Medicine",
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
              ),
              Text("3/5", style: TextStyle(fontSize: 14)),
            ],
          ),
          Column(
            spacing: 6,
            children: [
              ...medicines.map((medicine) {
                bool isUsed = medicine.isUsed;

                return Container(
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(8),
                  ),
                  padding: EdgeInsets.symmetric(vertical: 5, horizontal: 10),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        medicine.name,
                        style: TextStyle(
                          fontSize: 14,
                          color: isUsed ? Colors.green : Colors.red,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                      Container(
                        width: 20,
                        height: 20,
                        decoration: BoxDecoration(
                          color: isUsed ? Colors.green : Colors.red,
                          borderRadius: BorderRadius.all(Radius.circular(200)),
                        ),
                        child: Icon(
                          isUsed ? Icons.done : Icons.priority_high,
                          color: Colors.white,
                          size: 14,
                        ),
                      ),
                    ],
                  ),
                );
              }),
              const SizedBox(height: 4),
              Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  GestureDetector(
                    onTap: () {},
                    child: Container(
                      padding: EdgeInsets.zero,
                      child: Row(
                        children: [
                          Text(
                            "View details",
                            style: TextStyle(
                              fontSize: 14,
                              color: Colors.white,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                          Icon(
                            Icons.chevron_right,
                            color: Colors.white,
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
        ],
      ),
    );
  }
}

class AverageSleepInWeek extends StatelessWidget {
  const AverageSleepInWeek({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Color(0xFFB1E9BF),
        borderRadius: BorderRadius.circular(8),
        boxShadow: [
          BoxShadow(
            color: Color(0x1A000000), // #0000001A
            offset: Offset(1, 1), // x=1, y=1
            blurRadius: 4,
            spreadRadius: 0,
          ),
        ],
      ),
      padding: EdgeInsets.symmetric(vertical: 20),
      child: Column(
        spacing: 10,
        children: [
          // Row 1
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  "Average Sleep this week",
                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
                ),
                SizedBox(
                  width: 32,
                  height: 32,
                  child: IconButton(
                    onPressed: () {},
                    iconSize: 14,
                    style: IconButton.styleFrom(backgroundColor: Colors.white),
                    icon: Icon(Icons.add),
                    color: Colors.black,
                  ),
                ),
              ],
            ),
          ),

          // Row 2
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  "6 hours 45 minutes",
                  style: TextStyle(fontSize: 20, fontWeight: FontWeight.w600),
                ),
                Text(
                  "73 / 100",
                  style: TextStyle(fontSize: 14, fontWeight: FontWeight.w500),
                ),
              ],
            ),
          ),

          // Row 3
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 10),
            child: AccurateProgressBar(),
          ),
        ],
      ),
    );
  }
}

class AccurateProgressBar extends StatelessWidget {
  final double percent;
  final double height;
  final Color progressColor;
  final Color backgroundColor;
  final Color thumbColor;

  const AccurateProgressBar({
    Key? key,
    this.percent = 0.76,
    this.height = 12.0,
    this.progressColor = Colors.white,
    this.backgroundColor = const Color(0xFFE0E0E0),
    this.thumbColor = const Color(0xFFFFEB3B),
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final double barWidth = constraints.maxWidth;
        final double thumbSize =
            height + 8; // Kích thước thumb (lớn hơn thanh một chút)
        final double thumbOffset = (barWidth * percent) - (thumbSize / 2);

        return Stack(
          clipBehavior: Clip.none,
          children: [
            // Thanh tiến độ (dùng percent_indicator)
            LinearPercentIndicator(
              percent: percent,
              lineHeight: height,
              backgroundColor: backgroundColor,
              progressColor: progressColor,
              barRadius: const Radius.circular(6),
              animation: true,
              animationDuration: 1000,
              animateFromLastPercent: true,
              // Không dùng leading/trailing
            ),

            // NÚT VÀNG (THUMB) – ĐÚNG VỊ TRÍ THEO %
            Positioned(
              left: thumbOffset.clamp(
                0,
                barWidth - thumbSize,
              ), // Giới hạn không tràn
              top: (height - thumbSize) / 2, // Căn giữa theo chiều dọc
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
          boxShadow: [
            BoxShadow(
              color: Color(0x33007AFF), // #007AFF33
              blurRadius: 9,
              spreadRadius: 0,
              offset: Offset(0, 0), // x, y
            ),
          ],
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
                child: TCurvedEdgeWidget(
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
                        Column(
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
                        MultiSegmentIndicatorWithLegend(
                          segments: data,
                          totalTarget: 100,
                          size: 40,
                          showLegend: false,
                          centerWidget: Column(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Text(
                                '76',
                                style: TextStyle(
                                  fontSize: 24,
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

class Header extends StatelessWidget {
  const Header({super.key});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Column(
          spacing: 7,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              "Good morning, Leo!",
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            Text(
              "Thu (10/11)",
              style: TextStyle(fontSize: 14, color: Colors.grey),
            ),
          ],
        ),
        AvatarWithIndicator(),
      ],
    );
  }
}

class AvatarWithIndicator extends StatelessWidget {
  const AvatarWithIndicator({super.key});

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Container(
          width: 50, // = 2 * radius
          height: 50,
          decoration: BoxDecoration(shape: BoxShape.circle, color: Colors.blue),
          child: Center(
            child: FittedBox(
              child: Text(
                'JD',
                style: TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                  fontSize: 14, // CỨ ĐỂ LỚN, FittedBox sẽ scale xuống
                ),
              ),
            ),
          ),
        ),
        Positioned(
          top: 0,
          right: 0,
          child: Container(
            width: 12,
            height: 12,
            decoration: BoxDecoration(
              color: Colors.red,
              shape: BoxShape.circle,
            ),
          ),
        ),
      ],
    );
  }
}

class NutrientSegment {
  final String name;
  final double value;
  final Color color;
  final String unit;
  final double total;

  NutrientSegment({
    required this.name,
    required this.value,
    required this.color,
    this.unit = 'g',
    this.total = 100,
  });
}

class MultiSegmentIndicatorWithLegend extends StatelessWidget {
  final List<NutrientSegment> segments;
  final double totalTarget;
  final double size;
  final bool showLegend;
  final Widget? centerWidget;
  final double lineWidth;

  const MultiSegmentIndicatorWithLegend({
    Key? key,
    required this.segments,
    required this.totalTarget,
    this.size = 150,
    this.showLegend = true,
    this.centerWidget,
    this.lineWidth = 5,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    double sumValues = segments.fold(0, (sum, seg) => sum + seg.value);
    double remaining = (totalTarget - sumValues).clamp(0.0, totalTarget);

    List<Widget> indicators = [];
    indicators.add(
      CircularPercentIndicator(
        radius: size,
        lineWidth: lineWidth,
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
          radius: size,
          lineWidth: lineWidth,
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
          radius: size,
          lineWidth: lineWidth,
          percent: remaining / totalTarget,
          startAngle: startAngle,
          progressColor: Colors.grey.shade300,
          backgroundColor: Colors.transparent,
          circularStrokeCap: CircularStrokeCap.round,
        ),
      );
    }

    List<Widget> legendItems = segments.map((seg) {
      return Padding(
        padding: const EdgeInsets.symmetric(vertical: 4.0),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 12,
              height: 12,
              decoration: BoxDecoration(
                color: seg.color,
                borderRadius: BorderRadius.circular(200),
              ),
            ),
            const SizedBox(width: 6),
            Text(seg.name, style: TextStyle(fontSize: 14)),
          ],
        ),
      );
    }).toList();

    return Row(
      mainAxisAlignment: MainAxisAlignment.start,
      children: [
        Stack(
          alignment: Alignment.center,
          children: [...indicators, centerWidget ?? Container()],
        ),
        SizedBox(width: size * 0.2),
        if (showLegend)
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            children: legendItems,
          ),
      ],
    );
  }
}

class TCurvedEdgeWidget extends StatelessWidget {
  final Widget? child;
  final double radius;
  final double height;

  const TCurvedEdgeWidget({
    super.key,
    this.child,
    this.radius = 40,
    this.height = 80,
  });

  @override
  Widget build(BuildContext context) {
    return ClipPath(clipper: TCustomCurvedEdges(), child: child);
  }
}

class TCustomCurvedEdges extends CustomClipper<Path> {
  @override
  Path getClip(Size size) {
    var path = Path();
    path.lineTo(0, size.height);

    final firstCurve = Offset(0, size.height - 20);
    final lastCurve = Offset(30, size.height - 20);

    path.quadraticBezierTo(
      firstCurve.dx,
      firstCurve.dy,
      lastCurve.dx,
      lastCurve.dy,
    );

    final secondFirstCurve = Offset(0, size.height - 20);
    final secondLastCurve = Offset(size.width - 30, size.height - 20);

    path.quadraticBezierTo(
      secondFirstCurve.dx,
      secondFirstCurve.dy,
      secondLastCurve.dx,
      secondLastCurve.dy,
    );

    final thirdFirstCurve = Offset(size.width, size.height - 20);
    final thirdLastCurve = Offset(size.width, size.height);

    path.quadraticBezierTo(
      thirdFirstCurve.dx,
      thirdFirstCurve.dy,
      thirdLastCurve.dx,
      thirdLastCurve.dy,
    );

    path.lineTo(size.width, 0);
    path.close();
    return path;
  }

  @override
  bool shouldReclip(covariant CustomClipper<Path> oldClipper) {
    return true;
  }
}
