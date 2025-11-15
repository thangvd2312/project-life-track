import 'dart:io';

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:intl/intl.dart';

class MealAnalysisPage extends StatefulWidget {
  final String imagePath;

  const MealAnalysisPage({super.key, required this.imagePath});

  @override
  State<MealAnalysisPage> createState() => _MealAnalysisPageState();
}

class _MealAnalysisPageState extends State<MealAnalysisPage> {
  DateTime selectedDateTime = DateTime.now();
  String mealName = "Kimchi Jjigae";
  bool isConfirmed = false;

  // Hard-coded nutrition data
  final int totalCalories = 500;
  final Map<String, int> nutritionData = {
    'Carbohydrate': 500,
    'Fat': 500,
    'Protein': 500,
    'Sodium': 500,
  };

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 32),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                // Title
                Center(
                  child: Text(
                    'Add a meal',
                    style: GoogleFonts.notoSans(
                      fontSize: 22,
                      fontWeight: FontWeight.w700,
                      color: const Color(0xFF3D3D3D),
                    ),
                  ),
                ),
                const SizedBox(height: 24),

                // Date/Time section
                _buildDateTimeSection(),
                const SizedBox(height: 24),

                // Meal image
                _buildMealImage(),
                const SizedBox(height: 16),

                // AI Analysis complete
                Center(
                  child: Text(
                    'AI Analysis is complete!',
                    style: GoogleFonts.notoSans(
                      fontSize: 14,
                      fontWeight: FontWeight.w500,
                      color: Colors.grey[700],
                    ),
                  ),
                ),
                const SizedBox(height: 16),

                // Meal confirmation
                _buildMealConfirmation(),
                const SizedBox(height: 24),

                // Total calories
                _buildTotalCalories(),
                const SizedBox(height: 20),

                // Nutrition details
                _buildNutritionDetails(),
                const SizedBox(height: 32),

                // Action buttons
                _buildActionButtons(context),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildDateTimeSection() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      decoration: BoxDecoration(
        color: const Color(0xFFF4F4F4),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'When did you have this?',
                style: GoogleFonts.notoSans(
                  fontSize: 12,
                  color: Colors.grey[600],
                  fontWeight: FontWeight.w500,
                ),
              ),
              const SizedBox(height: 4),
              Text(
                DateFormat('EEE, h:mm a').format(selectedDateTime),
                style: GoogleFonts.notoSans(
                  fontSize: 16,
                  fontWeight: FontWeight.w600,
                  color: const Color(0xFF3D3D3D),
                ),
              ),
            ],
          ),
          TextButton(
            onPressed: () {
              // TODO: Show date/time picker
            },
            child: Text(
              'Now',
              style: GoogleFonts.notoSans(
                fontSize: 14,
                fontWeight: FontWeight.w600,
                color: const Color(0xFF0A84FF),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildMealImage() {
    return ClipRRect(
      borderRadius: BorderRadius.circular(16),
      child: AspectRatio(
        aspectRatio: 16 / 9,
        child: Image.file(File(widget.imagePath), fit: BoxFit.cover),
      ),
    );
  }

  Widget _buildMealConfirmation() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(
          'Is this $mealName?',
          style: GoogleFonts.notoSans(
            fontSize: 16,
            fontWeight: FontWeight.w500,
            color: const Color(0xFF3D3D3D),
          ),
        ),
        const SizedBox(width: 16),
        ElevatedButton(
          onPressed: () {
            setState(() {
              isConfirmed = true;
            });
          },
          style: ElevatedButton.styleFrom(
            backgroundColor: const Color(0xFF0A84FF),
            foregroundColor: Colors.white,
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 8),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(20),
            ),
            elevation: 0,
          ),
          child: Text(
            'Yes',
            style: GoogleFonts.notoSans(
              fontSize: 14,
              fontWeight: FontWeight.w600,
              color: Colors.white,
            ),
          ),
        ),
        const SizedBox(width: 8),
        TextButton(
          onPressed: () {
            setState(() {
              isConfirmed = false;
            });
          },
          style: TextButton.styleFrom(
            foregroundColor: Colors.grey[600],
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 8),
          ),
          child: Text(
            'No',
            style: GoogleFonts.notoSans(
              fontSize: 14,
              fontWeight: FontWeight.w600,
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildTotalCalories() {
    return Column(
      children: [
        Text(
          'Total calories',
          style: GoogleFonts.notoSans(
            fontSize: 14,
            fontWeight: FontWeight.w500,
            color: Colors.grey[700],
          ),
        ),
        const SizedBox(height: 8),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.baseline,
          textBaseline: TextBaseline.alphabetic,
          children: [
            Text(
              totalCalories.toString(),
              style: GoogleFonts.notoSans(
                fontSize: 36,
                fontWeight: FontWeight.w700,
                color: const Color(0xFF0A84FF),
              ),
            ),
            const SizedBox(width: 8),
            Text(
              'kcal',
              style: GoogleFonts.notoSans(
                fontSize: 16,
                fontWeight: FontWeight.w500,
                color: Colors.grey[600],
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildNutritionDetails() {
    return Column(
      children: nutritionData.entries.map((entry) {
        return Container(
          margin: const EdgeInsets.only(bottom: 8),
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
          child: Row(
            children: [
              Expanded(
                flex: 2,
                child: Text(
                  entry.key,
                  style: GoogleFonts.notoSans(
                    fontSize: 15,
                    fontWeight: FontWeight.w500,
                    color: const Color(0xFF3D3D3D),
                  ),
                ),
              ),
              Expanded(
                flex: 1,
                child: Text(
                  entry.value.toString(),
                  textAlign: TextAlign.center,
                  style: GoogleFonts.notoSans(
                    fontSize: 18,
                    fontWeight: FontWeight.w700,
                    color: const Color(0xFF0A84FF),
                  ),
                ),
              ),
              Expanded(
                flex: 1,
                child: Text(
                  'g',
                  textAlign: TextAlign.right,
                  style: GoogleFonts.notoSans(
                    fontSize: 14,
                    fontWeight: FontWeight.w400,
                    color: Colors.grey[500],
                  ),
                ),
              ),
            ],
          ),
        );
      }).toList(),
    );
  }

  Widget _buildActionButtons(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: ElevatedButton(
            onPressed: () {
              // TODO: Save meal data
              Navigator.of(context).pop();
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFF0A84FF),
              foregroundColor: Colors.white,
              padding: const EdgeInsets.symmetric(vertical: 12),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(24),
              ),
              elevation: 2,
            ),
            child: Text(
              'Save',
              style: GoogleFonts.notoSans(
                fontSize: 18,
                fontWeight: FontWeight.w600,
                color: Colors.white,
              ),
            ),
          ),
        ),
        const SizedBox(width: 16),
        GestureDetector(
          onTap: () => Navigator.of(context).pop(),
          child: Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(shape: BoxShape.circle),
            child: Image.asset(
              'assets/icons/icon-back.png',
              width: 48,
              height: 48,
            ),
          ),
        ),
      ],
    );
  }
}
