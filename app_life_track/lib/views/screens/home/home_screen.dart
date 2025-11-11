import 'package:flutter/material.dart';
import 'package:app_life_track/views/screens/home/widgets/average_sleep_in_week.dart';
import 'package:app_life_track/views/screens/home/widgets/food_intake.dart';
import 'package:app_life_track/views/screens/home/widgets/health_parameters/health_parameters.dart';
import 'package:app_life_track/views/screens/home/widgets/today_medicine.dart';
import 'package:app_life_track/views/screens/home/widgets/weekly_summary.dart';
import 'package:app_life_track/widgets/bottom_nav.dart';
import 'package:app_life_track/widgets/header.dart';

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
