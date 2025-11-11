import 'package:flutter/material.dart';

class CurvedEdgeWidget extends StatelessWidget {
  final Widget? child;
  final double radius;
  final double height;

  const CurvedEdgeWidget({
    super.key,
    this.child,
    this.radius = 40,
    this.height = 80,
  });

  @override
  Widget build(BuildContext context) {
    return ClipPath(clipper: TCustomCurvedEdges(), child: child);
  }
}

class TCustomCurvedEdges extends CustomClipper<Path> {
  @override
  Path getClip(Size size) {
    var path = Path();
    path.lineTo(0, size.height);

    final firstCurve = Offset(0, size.height - 20);
    final lastCurve = Offset(30, size.height - 20);

    path.quadraticBezierTo(
      firstCurve.dx,
      firstCurve.dy,
      lastCurve.dx,
      lastCurve.dy,
    );

    final secondFirstCurve = Offset(0, size.height - 20);
    final secondLastCurve = Offset(size.width - 30, size.height - 20);

    path.quadraticBezierTo(
      secondFirstCurve.dx,
      secondFirstCurve.dy,
      secondLastCurve.dx,
      secondLastCurve.dy,
    );

    final thirdFirstCurve = Offset(size.width, size.height - 20);
    final thirdLastCurve = Offset(size.width, size.height);

    path.quadraticBezierTo(
      thirdFirstCurve.dx,
      thirdFirstCurve.dy,
      thirdLastCurve.dx,
      thirdLastCurve.dy,
    );

    path.lineTo(size.width, 0);
    path.close();
    return path;
  }

  @override
  bool shouldReclip(covariant CustomClipper<Path> oldClipper) {
    return true;
  }
}
