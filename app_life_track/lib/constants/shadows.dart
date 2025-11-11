import 'package:flutter/material.dart';

class ThemeShadow {
  ThemeShadow._();

  static final primary = BoxShadow(
    color: Color(0x1A000000),
    offset: Offset(1, 1),
    blurRadius: 4,
    spreadRadius: 0,
  );
}
