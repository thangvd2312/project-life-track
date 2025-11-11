import 'package:flutter/material.dart';
import 'package:app_life_track/widgets/avatar_with_indicator.dart';

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
