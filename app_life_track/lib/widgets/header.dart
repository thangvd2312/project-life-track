import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:app_life_track/providers/user_provider.dart';
import 'package:app_life_track/widgets/avatar_with_indicator.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class Header extends ConsumerWidget {
  const Header({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final user = ref.watch(userProvider);

    String formatToday() {
      final now = DateTime.now();
      final formatter = DateFormat('EEE (dd/MM)', 'en_US');
      return formatter.format(now);
    }

    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Column(
          spacing: 7,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              "Good morning, ${user?.name ?? ""}!",
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            Text(
              formatToday(),
              style: TextStyle(fontSize: 14, color: Colors.grey),
            ),
          ],
        ),
        AvatarWithIndicator(),
      ],
    );
  }
}
