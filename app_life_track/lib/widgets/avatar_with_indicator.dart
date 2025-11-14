import 'package:flutter/material.dart';
import 'package:app_life_track/providers/user_provider.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class AvatarWithIndicator extends ConsumerWidget {
  const AvatarWithIndicator({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final user = ref.watch(userProvider);

    return Stack(
      children: [
        Container(
          width: 50, // = 2 * radius
          height: 50,
          decoration: BoxDecoration(shape: BoxShape.circle, color: Colors.blue),
          child: Center(
            child: FittedBox(
              child: Text(
                user?.name?.substring(0, 1).toUpperCase() ?? "",
                style: TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                  fontSize: 14,
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
