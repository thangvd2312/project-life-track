import 'dart:io';

import 'package:camera/camera.dart';
import 'package:flutter/material.dart';

class MealCapturePage extends StatefulWidget {
  const MealCapturePage({super.key});

  @override
  State<MealCapturePage> createState() => _MealCapturePageState();
}

class _MealCapturePageState extends State<MealCapturePage>
    with WidgetsBindingObserver {
  CameraController? _cameraController;
  CameraDescription? _activeDescription;
  Future<void>? _initializeFuture;
  XFile? _lastCapture;
  String? _errorMessage;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
    _initializeCamera();
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    _cameraController?.dispose();
    super.dispose();
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    final controller = _cameraController;
    if (controller == null || !controller.value.isInitialized) {
      return;
    }

    if (state == AppLifecycleState.inactive) {
      controller.dispose();
      _cameraController = null;
    } else if (state == AppLifecycleState.resumed) {
      if (_activeDescription != null) {
        _initializeCamera(description: _activeDescription);
      }
    }
  }

  Future<void> _initializeCamera({CameraDescription? description}) async {
    try {
      final cameras = await availableCameras();
      final selected =
          description ??
          cameras.firstWhere(
            (camera) => camera.lensDirection == CameraLensDirection.back,
            orElse: () => cameras.first,
          );

      final controller = CameraController(
        selected,
        ResolutionPreset.high,
        enableAudio: false,
        imageFormatGroup: ImageFormatGroup.jpeg,
      );

      _cameraController = controller;
      _activeDescription = selected;
      _initializeFuture = controller.initialize();
      setState(() {
        _errorMessage = null;
      });
    } on CameraException catch (error) {
      setState(() {
        if (error.code == 'CameraAccessDenied' ||
            error.code == 'CameraAccessDeniedWithoutPrompt') {
          _errorMessage =
              'Camera permission denied. Please enable it in settings.';
        } else if (error.code == 'CameraAccessRestricted') {
          _errorMessage = 'Camera access is restricted on this device.';
        } else {
          _errorMessage =
              'Camera unavailable: ${error.description ?? error.code}';
        }
      });
    } catch (error) {
      setState(() {
        _errorMessage = 'Camera unavailable: $error';
      });
    }
  }

  Future<void> _capturePhoto() async {
    final controller = _cameraController;
    if (controller == null) {
      return;
    }

    try {
      await _initializeFuture;
      if (!controller.value.isInitialized) {
        return;
      }

      final picture = await controller.takePicture();
      setState(() {
        _lastCapture = picture;
      });
    } catch (error) {
      setState(() {
        _errorMessage = 'Failed to capture photo';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 48),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const SizedBox(height: 24),
              Center(
                child: Text(
                  'Add a meal',
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    fontSize: 22,
                    fontWeight: FontWeight.w700,
                    color: const Color(0xFF3D3D3D),
                  ),
                ),
              ),
              const SizedBox(height: 32),
              Expanded(child: _buildCameraPreview()),
              const SizedBox(height: 32),
              _buildBottomRow(context),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildCameraPreview() {
    if (_errorMessage != null) {
      return Center(
        child: Text(
          _errorMessage!,
          style: const TextStyle(color: Colors.redAccent),
        ),
      );
    }

    final controller = _cameraController;
    if (controller == null) {
      return const Center(child: CircularProgressIndicator());
    }

    return FutureBuilder<void>(
      future: _initializeFuture,
      builder: (context, snapshot) {
        if (snapshot.connectionState != ConnectionState.done) {
          return const Center(child: CircularProgressIndicator());
        }

        return ClipRRect(
          borderRadius: BorderRadius.circular(24),
          child: Stack(
            fit: StackFit.expand,
            children: [
              CameraPreview(controller),
              Positioned.fill(
                child: IgnorePointer(
                  child: CustomPaint(
                    painter: _DashedBorderPainter(
                      color: const Color(0xFF0A84FF),
                      borderRadius: 24,
                      strokeWidth: 3,
                      dashWidth: 8,
                      dashSpace: 6,
                    ),
                  ),
                ),
              ),
            ],
          ),
        );
      },
    );
  }

  Widget _buildBottomRow(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        SizedBox(
          width: 64,
          height: 64,
          child: _lastCapture == null
              ? Container(
                  decoration: BoxDecoration(
                    color: const Color(0xFFF4F4F4),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: const Icon(
                    Icons.image_outlined,
                    color: Color(0xFF9FA3AB),
                  ),
                )
              : ClipRRect(
                  borderRadius: BorderRadius.circular(12),
                  child: Image.file(
                    File(_lastCapture!.path),
                    fit: BoxFit.cover,
                  ),
                ),
        ),
        const Spacer(),
        GestureDetector(
          onTap: _capturePhoto,
          child: Container(
            width: 76,
            height: 76,
            decoration: const BoxDecoration(
              shape: BoxShape.circle,
              color: Colors.white,
              boxShadow: [
                BoxShadow(
                  color: Color(0x1A000000),
                  blurRadius: 12,
                  offset: Offset(0, 4),
                ),
              ],
            ),
            child: Center(
              child: Container(
                width: 48,
                height: 48,
                decoration: const BoxDecoration(
                  color: Color(0xFF7A7A7A),
                  shape: BoxShape.circle,
                ),
              ),
            ),
          ),
        ),
        const Spacer(),
        IconButton(
          icon: Image.asset(
            'assets/icons/icon-back.png',
            width: 48,
            height: 48,
          ),
          onPressed: () => Navigator.of(context).pop(),
        ),
      ],
    );
  }
}

class _DashedBorderPainter extends CustomPainter {
  const _DashedBorderPainter({
    required this.color,
    required this.borderRadius,
    this.strokeWidth = 2,
    this.dashWidth = 6,
    this.dashSpace = 4,
  });

  final Color color;
  final double borderRadius;
  final double strokeWidth;
  final double dashWidth;
  final double dashSpace;

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = color
      ..style = PaintingStyle.stroke
      ..strokeWidth = strokeWidth;

    final rect = RRect.fromRectAndRadius(
      Offset.zero & size,
      Radius.circular(borderRadius),
    );

    final path = Path()..addRRect(rect);
    final dashedPath = _createDashedPath(path);
    canvas.drawPath(dashedPath, paint);
  }

  Path _createDashedPath(Path source) {
    final metrics = source.computeMetrics();
    final Path dashedPath = Path();

    for (final metric in metrics) {
      double distance = 0.0;
      while (distance < metric.length) {
        final double next = distance + dashWidth;
        final double end = next > metric.length ? metric.length : next;
        dashedPath.addPath(metric.extractPath(distance, end), Offset.zero);
        distance = next + dashSpace;
      }
    }
    return dashedPath;
  }

  @override
  bool shouldRepaint(covariant _DashedBorderPainter oldDelegate) {
    return oldDelegate.color != color ||
        oldDelegate.borderRadius != borderRadius ||
        oldDelegate.strokeWidth != strokeWidth ||
        oldDelegate.dashWidth != dashWidth ||
        oldDelegate.dashSpace != dashSpace;
  }
}
