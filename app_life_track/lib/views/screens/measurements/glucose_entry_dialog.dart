import 'package:app_life_track/controllers/biomarker_controller.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class GlucoseEntryPage extends StatefulWidget {
  const GlucoseEntryPage({super.key});

  @override
  State<GlucoseEntryPage> createState() => _GlucoseEntryPageState();
}

class _GlucoseEntryPageState extends State<GlucoseEntryPage> {
  late DateTime _measurementDateTime;
  late final TextEditingController _dateController;
  late final TextEditingController _glucoseController;

  @override
  void initState() {
    super.initState();
    _measurementDateTime = DateTime.now();
    _dateController = TextEditingController(
      text: _formatDateTime(_measurementDateTime),
    );
    _glucoseController = TextEditingController();
  }

  @override
  void dispose() {
    _dateController.dispose();
    _glucoseController.dispose();
    super.dispose();
  }

  String _formatDateTime(DateTime dateTime) {
    const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    final weekday = weekdays[dateTime.weekday - 1];
    final hour = dateTime.hour % 12 == 0 ? 12 : dateTime.hour % 12;
    final minute = dateTime.minute.toString().padLeft(2, '0');
    final period = dateTime.hour >= 12 ? 'PM' : 'AM';
    return '$weekday, $hour:$minute $period';
  }

  Future<void> _pickDateTime() async {
    final date = await showDatePicker(
      context: context,
      initialDate: _measurementDateTime,
      firstDate: DateTime(2000),
      lastDate: DateTime.now(),
    );
    if (date == null) return;

    final timeOfDay = await showTimePicker(
      context: context,
      initialTime: TimeOfDay.fromDateTime(_measurementDateTime),
    );
    if (timeOfDay == null) return;

    setState(() {
      _measurementDateTime = DateTime(
        date.year,
        date.month,
        date.day,
        timeOfDay.hour,
        timeOfDay.minute,
      );
      _dateController.text = _formatDateTime(_measurementDateTime);
    });
  }

  @override
  Widget build(BuildContext context) {
    final BiomarkerController biomarkerController = BiomarkerController();
    Future<void> _save() async {
      Map<String, dynamic> body = {
        "type": "blood_sugar",
        "data": {"systolic": int.parse(_glucoseController.text)},
        "measured_at": _measurementDateTime.toIso8601String(),
      };
      biomarkerController.save_biomarker(body: body, context: context);
    }

    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 48),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const SizedBox(height: 48),
              Center(
                child: Text(
                  'Add new glucose',
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    fontSize: 22,
                    fontWeight: FontWeight.w700,
                    color: const Color(0xFF3D3D3D),
                  ),
                ),
              ),
              const SizedBox(height: 48),
              Text(
                'When did you measure this?',
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  color: const Color(0xFF6F6F6F),
                ),
              ),
              const SizedBox(height: 12),
              Row(
                children: [
                  Expanded(
                    child: TextField(
                      controller: _dateController,
                      readOnly: true,
                      decoration: _inputDecoration(),
                      onTap: _pickDateTime,
                    ),
                  ),
                  const SizedBox(width: 12),
                  TextButton(
                    onPressed: () {
                      setState(() {
                        _measurementDateTime = DateTime.now();
                        _dateController.text = _formatDateTime(
                          _measurementDateTime,
                        );
                      });
                    },
                    child: const Text(
                      'Now',
                      style: TextStyle(
                        color: Color(0xFF9E9E9E),
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 28),
              _LabeledField(
                label: 'Systolic Blood Pressure',
                controller: _glucoseController,
                placeholder: '134',
              ),
              const SizedBox(height: 40),
              Row(
                children: [
                  Expanded(
                    child: SizedBox(
                      height: 40,
                      child: FilledButton(
                        onPressed: () {
                          _save();
                        },
                        style: FilledButton.styleFrom(
                          backgroundColor: const Color(0xFF0A84FF),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(26),
                          ),
                        ),
                        child: const Text(
                          'Save',
                          style: TextStyle(
                            fontWeight: FontWeight.w600,
                            color: Colors.white,
                          ),
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(width: 16),
                  IconButton(
                    icon: Image.asset(
                      'assets/icons/icon-back.png',
                      width: 48,
                      height: 48,
                    ),
                    onPressed: () {
                      Navigator.of(context).pop();
                    },
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  InputDecoration _inputDecoration() {
    return InputDecoration(
      filled: true,
      fillColor: const Color(0xFFF7F7F7),
      contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
        borderSide: BorderSide.none,
      ),
    );
  }
}

class _LabeledField extends StatelessWidget {
  const _LabeledField({
    required this.label,
    required this.controller,
    required this.placeholder,
  });

  final String label;
  final TextEditingController controller;
  final String placeholder;

  @override
  Widget build(BuildContext context) {
    final labelStyle = Theme.of(
      context,
    ).textTheme.bodyMedium?.copyWith(color: const Color(0xFF6F6F6F));

    return Row(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Expanded(child: Text(label, style: labelStyle)),
        const SizedBox(width: 16),
        SizedBox(
          width: 140,
          child: TextField(
            controller: controller,
            textAlign: TextAlign.center,
            keyboardType: TextInputType.number,
            inputFormatters: [FilteringTextInputFormatter.digitsOnly],
            decoration: InputDecoration(
              filled: true,
              fillColor: const Color(0xFFF7F7F7),
              contentPadding: const EdgeInsets.symmetric(
                horizontal: 12,
                vertical: 12,
              ),
              hintText: placeholder,
              hintStyle: const TextStyle(
                color: Color(0xFFB0B0B0),
                fontWeight: FontWeight.w600,
              ),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(12),
                borderSide: BorderSide.none,
              ),
            ),
          ),
        ),
      ],
    );
  }
}
