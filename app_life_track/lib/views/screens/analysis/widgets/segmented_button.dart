import 'package:flutter/material.dart';

class CustomSegmentedButton extends StatefulWidget {
  final Function(int)? onChanged;
  const CustomSegmentedButton({Key? key, this.onChanged}) : super(key: key);

  @override
  State<CustomSegmentedButton> createState() => _CustomSegmentedButtonState();
}

class _CustomSegmentedButtonState extends State<CustomSegmentedButton> {
  int _selectedIndex = 0; // Bắt đầu từ Day
  final List<String> _labels = ['Day', 'Week', 'Month'];

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final buttonWidth = (constraints.maxWidth - 8) / 3; // 8 = 2 * padding 4
        final leftPosition = _selectedIndex * buttonWidth + 4;

        return Container(
          height: 40,
          decoration: BoxDecoration(
            color: Colors.grey[200],
            borderRadius: BorderRadius.circular(20),
          ),
          child: Stack(
            children: [
              // Nền trắng trượt mượt
              AnimatedPositioned(
                left: leftPosition,
                top: 4,
                width: buttonWidth,
                height: 32,
                duration: const Duration(milliseconds: 200),
                curve: Curves.easeInOut,
                child: Container(
                  margin: const EdgeInsets.symmetric(horizontal: 0),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(16),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withOpacity(0.1),
                        blurRadius: 4,
                        offset: const Offset(0, 1),
                      ),
                    ],
                  ),
                ),
              ),

              // Các nút
              Row(
                children: List.generate(_labels.length, (index) {
                  return Expanded(
                    child: GestureDetector(
                      onTap: () {
                        setState(() => _selectedIndex = index);
                        widget.onChanged?.call(index);
                      },
                      child: Center(
                        child: Text(
                          _labels[index],
                          style: TextStyle(
                            color: _selectedIndex == index
                                ? Colors.black
                                : Colors.grey[600],
                            fontWeight: _selectedIndex == index
                                ? FontWeight.bold
                                : FontWeight.normal,
                            fontSize: 14,
                          ),
                        ),
                      ),
                    ),
                  );
                }),
              ),
            ],
          ),
        );
      },
    );
  }
}
