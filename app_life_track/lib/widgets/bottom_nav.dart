import 'package:flutter/material.dart';

class CustomBottomNav extends StatefulWidget {
  const CustomBottomNav({Key? key}) : super(key: key);

  @override
  State<CustomBottomNav> createState() => _CustomBottomNavState();
}

class _CustomBottomNavState extends State<CustomBottomNav> {
  int _selectedIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(30)),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.1),
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
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('FAB Clicked!')),
                      );
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
