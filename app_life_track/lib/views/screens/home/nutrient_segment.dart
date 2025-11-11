import 'package:flutter/material.dart';

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
