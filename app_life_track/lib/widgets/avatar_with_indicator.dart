import 'package:flutter/material.dart';

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
