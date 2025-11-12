import 'package:flutter/material.dart';

class MyInfoScreen extends StatelessWidget {
  const MyInfoScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Text(
        'My Info',
        style: TextStyle(fontSize: 16, color: Colors.grey),
      ),
    );
  }
}
