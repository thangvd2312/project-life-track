import 'package:app_life_track/views/screens/measurements/blood_pressure_entry_dialog.dart';
import 'package:flutter/material.dart';

class CustomBottomNav extends StatefulWidget {
  const CustomBottomNav({Key? key}) : super(key: key);

  @override
  State<CustomBottomNav> createState() => _CustomBottomNavState();
}

class _ActionSheetButton extends StatelessWidget {
  const _ActionSheetButton({
    required this.backgroundColor,
    required this.iconBackground,
    required this.icon,
    required this.label,
    required this.onTap,
  });

  final Color backgroundColor;
  final Color iconBackground;
  final Widget icon;
  final String label;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(40),
        child: Container(
          decoration: BoxDecoration(
            color: backgroundColor,
            borderRadius: BorderRadius.circular(24),
          ),
          padding: const EdgeInsets.fromLTRB(0, 0, 12, 0),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(
                width: 28,
                height: 28,
                decoration: BoxDecoration(
                  color: iconBackground,
                  borderRadius: BorderRadius.circular(28),
                ),
                alignment: Alignment.center,
                child: icon,
              ),
              const SizedBox(width: 8),
              Text(
                label,
                style: const TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _MeasurementOptionButton extends StatelessWidget {
  const _MeasurementOptionButton({
    required this.borderColor,
    required this.icon,
    required this.label,
    required this.onTap,
  });

  final Color borderColor;
  final Widget icon;
  final String label;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final textStyle = TextStyle(
      fontSize: 14,
      fontWeight: FontWeight.w600,
      color: const Color(0xFF3D3D3D),
      decoration: TextDecoration.none,
    );

    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(28),
      child: Container(
        width: double.infinity,
        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(28),
          border: Border.all(color: borderColor, width: 1),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.max,
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            icon,
            const SizedBox(width: 4),
            Text(label, style: textStyle),
          ],
        ),
      ),
    );
  }
}

class _CustomBottomNavState extends State<CustomBottomNav> {
  int _selectedIndex = 0;

  void _showActionSheet(BuildContext context) {
    showDialog<void>(
      context: context,
      barrierColor: Colors.black.withValues(alpha: 0.35),
      builder: (context) {
        return Center(
          child: Material(
            color: Colors.transparent,
            child: Container(
              width: 300,
              height: 160,
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 28),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(20),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withValues(alpha: 0.12),
                    blurRadius: 24,
                    offset: const Offset(0, 12),
                  ),
                ],
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _ActionSheetButton(
                    backgroundColor: const Color(0xFF0A7BFF),
                    iconBackground: const Color(0x1F0A7BFF),
                    icon: Image.asset(
                      'assets/icons/meal.png',
                      width: 28,
                      height: 28,
                    ),
                    label: 'Enter a meal',
                    onTap: () {
                      Navigator.of(context).pop();
                    },
                  ),
                  const SizedBox(height: 20),
                  _ActionSheetButton(
                    backgroundColor: const Color(0xFF2ECC71),
                    iconBackground: const Color(0x1F2ECC71),
                    icon: Image.asset(
                      'assets/icons/heart.png',
                      width: 28,
                      height: 28,
                    ),
                    label: 'Enter new measurements',
                    onTap: () {
                      Navigator.of(context).pop();
                      Future.microtask(() {
                        if (!mounted) return;
                        _showMeasurementModal(this.context);
                      });
                    },
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }

  void _showMeasurementModal(BuildContext context) {
    showDialog<void>(
      context: context,
      barrierColor: Colors.black.withValues(alpha: 0.35),
      builder: (dialogContext) {
        return Center(
          child: Material(
            color: Colors.transparent,
            child: Container(
              width: 200,
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 24),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(24),
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _MeasurementOptionButton(
                    borderColor: const Color(0xFFFF3B30),
                    icon: const Icon(
                      Icons.favorite,
                      color: Color(0xFFFF3B30),
                      size: 18,
                    ),
                    label: 'Blood Pressure',
                    onTap: () {
                      Navigator.of(dialogContext).pop();
                      Future.microtask(() async {
                        if (!mounted) return;
                        await Navigator.of(context).push(
                          MaterialPageRoute<void>(
                            builder: (_) => const BloodPressureEntryPage(),
                            fullscreenDialog: false,
                          ),
                        );
                        if (!mounted) return;
                        _showMeasurementModal(context);
                      });
                    },
                  ),
                  const SizedBox(height: 12),
                  _MeasurementOptionButton(
                    borderColor: const Color(0xFF6F2CFF),
                    icon: Image.asset(
                      'assets/icons/glucose.png',
                      width: 20,
                      height: 20,
                    ),
                    label: 'Glucose',
                    onTap: () {
                      Navigator.of(dialogContext).pop();
                      // TODO: navigate to glucose entry
                    },
                  ),
                  const SizedBox(height: 12),
                  _MeasurementOptionButton(
                    borderColor: const Color(0xFF34C759),
                    icon: Image.asset(
                      'assets/icons/sleep.png',
                      width: 20,
                      height: 20,
                    ),
                    label: 'Sleep',
                    onTap: () {
                      Navigator.of(dialogContext).pop();
                      // TODO: navigate to sleep entry
                    },
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(30)),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.1),
            blurRadius: 20,
            offset: const Offset(0, -3),
          ),
        ],
      ),
      child: Stack(
        clipBehavior: Clip.none,
        alignment: Alignment.bottomCenter,
        children: [
          // Bottom Nav chính
          BottomNavigationBar(
            currentIndex: _selectedIndex,
            onTap: (index) {
              if (index != 2) {
                // Bỏ qua FAB
                setState(() => _selectedIndex = index);
              } else {
                // Xử lý FAB click
                ScaffoldMessenger.of(
                  context,
                ).showSnackBar(const SnackBar(content: Text('FAB Clicked!')));
              }
            },
            type: BottomNavigationBarType.fixed,
            showSelectedLabels: true,
            showUnselectedLabels: true,
            selectedItemColor: Colors.blue,
            unselectedItemColor: Colors.grey,
            backgroundColor: Colors.transparent,
            elevation: 0,
            items: [
              _buildNavItem(Icons.home, 'Home', 0),
              _buildNavItem(Icons.show_chart, 'Analysis', 1),
              _buildNavItem(Icons.add, '', 2), // FAB placeholder
              _buildNavItem(Icons.person_outline, 'My Info', 3),
              _buildNavItem(Icons.phone_outlined, 'Call', 4),
            ],
          ),

          // FAB nổi lên
          Positioned(
            top: -28,
            child: ClipRRect(
              borderRadius: BorderRadius.circular(50), // SIÊU CONG (gần tròn)
              child: Container(
                width: 64, // Kích thước FAB
                height: 64,
                child: Material(
                  color: Colors.blue,
                  elevation: 8,
                  borderRadius: BorderRadius.circular(50),
                  child: InkWell(
                    borderRadius: BorderRadius.circular(50),
                    onTap: () {
                      _showActionSheet(context);
                    },
                    child: const Center(
                      child: Icon(Icons.add, size: 32, color: Colors.white),
                    ),
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  BottomNavigationBarItem _buildNavItem(
    IconData icon,
    String label,
    int index,
  ) {
    return BottomNavigationBarItem(
      icon: index == 2
          ? const SizedBox(width: 60, height: 50) // Khoảng trống cho FAB
          : Icon(icon),
      label: index == 2 ? '' : label,
    );
  }
}

class BottomNavCutoutPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()..color = Colors.white;

    final path = Path();
    // Bắt đầu từ góc trái trên
    path.moveTo(0, 0);
    path.lineTo(size.width * 0.35, 0);

    // Vẽ nửa vòng tròn lõm vào (khoét lỗ)
    final centerX = size.width / 2;
    final radius = 35.0; // Bán kính lỗ
    path.arcTo(
      Rect.fromCircle(center: Offset(centerX, 0), radius: radius),
      3.14159, // 180 độ (π)
      3.14159, // 180 độ
      false,
    );

    // Tiếp tục vẽ phần còn lại
    path.lineTo(size.width, 0);
    path.lineTo(size.width, size.height);
    path.lineTo(0, size.height);
    path.close();

    canvas.drawPath(path, paint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
