import 'package:flutter/material.dart';

class ThemeShadow {
  ThemeShadow._();

  static final primary = BoxShadow(
    color: Color(0x1A000000),
    offset: Offset(1, 1),
    blurRadius: 4,
    spreadRadius: 0,
  );

  static final secondary = BoxShadow(
    color: Color(0x33007AFF), // #007AFF33
    blurRadius: 9,
    spreadRadius: 0,
    offset: Offset(0, 0), // x, y
  );
}
