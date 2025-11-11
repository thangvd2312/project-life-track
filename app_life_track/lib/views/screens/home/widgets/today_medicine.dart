import 'package:app_life_track/constants/colors.dart';
import 'package:app_life_track/constants/shadows.dart';
import 'package:app_life_track/constants/sizes.dart';
import 'package:app_life_track/constants/texts.dart';
import 'package:flutter/material.dart';
import 'package:app_life_track/views/screens/home/medicine_track.dart';

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
        color: ThemeColors.pink_100,
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
              Text("Today's Medicine", style: ThemeText.textPrimaryBoldBase),
              Text("3/5", style: ThemeText.textPrimarySm),
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
                    borderRadius: BorderRadius.circular(ThemeSize.sm),
                  ),
                  padding: EdgeInsets.symmetric(
                    vertical: ThemeSize.xs,
                    horizontal: ThemeSize.sm,
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        medicine.name,
                        style: TextStyle(
                          fontSize: ThemeSize.fontSizeSm,
                          color: isUsed
                              ? ThemeColors.success_100
                              : ThemeColors.error_100,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                      Container(
                        width: ThemeSize.lg,
                        height: ThemeSize.lg,
                        decoration: BoxDecoration(
                          color: isUsed
                              ? ThemeColors.success_100
                              : ThemeColors.error_100,
                          borderRadius: BorderRadius.all(
                            Radius.circular(ThemeSize.lg),
                          ),
                        ),
                        child: Icon(
                          isUsed ? Icons.done : Icons.priority_high,
                          color: Colors.white,
                          size: ThemeSize.fontSizeSm,
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
                              fontSize: ThemeSize.fontSizeSm,
                              color: Colors.white,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                          Icon(
                            Icons.chevron_right,
                            color: Colors.white,
                            size: ThemeSize.fontSizeBase,
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
