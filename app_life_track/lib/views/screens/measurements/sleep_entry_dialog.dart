import 'package:app_life_track/controllers/biomarker_controller.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class SleepEntryPage extends StatefulWidget {
  const SleepEntryPage({super.key});

  @override
  State<SleepEntryPage> createState() => _SleepEntryPageState();
}

class _SleepEntryPageState extends State<SleepEntryPage> {
  late DateTime _sleepDate;
  late TimeOfDay _startSleep;
  late TimeOfDay _endSleep;
  late final TextEditingController _dateController;
  late final TextEditingController _startController;
  late final TextEditingController _endController;
  bool _isNap = false;

  @override
  void initState() {
    super.initState();
    final now = DateTime.now();
    _sleepDate = now;
    _startSleep = TimeOfDay.fromDateTime(now);
    _endSleep = TimeOfDay.fromDateTime(now.add(const Duration(hours: 2)));
    _dateController = TextEditingController(text: _formatDate(_sleepDate));
    _startController = TextEditingController(text: _formatTime(_startSleep));
    _endController = TextEditingController(text: _formatTime(_endSleep));
  }

  @override
  void dispose() {
    _dateController.dispose();
    _startController.dispose();
    _endController.dispose();
    super.dispose();
  }

  String _formatDate(DateTime dateTime) {
    const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    final weekday = weekdays[dateTime.weekday - 1];
    final year = dateTime.year.toString().padLeft(4, '0');
    final month = dateTime.month.toString().padLeft(2, '0');
    final day = dateTime.day.toString().padLeft(2, '0');
    return '$weekday, $year/$month/$day';
  }

  String _formatTime(TimeOfDay time) {
    final hour = time.hourOfPeriod == 0 ? 12 : time.hourOfPeriod;
    final minute = time.minute.toString().padLeft(2, '0');
    final period = time.period == DayPeriod.am ? 'AM' : 'PM';
    return '$hour:$minute $period';
  }

  Future<void> _pickDate() async {
    final date = await showDatePicker(
      context: context,
      initialDate: _sleepDate,
      firstDate: DateTime(2000),
      lastDate: DateTime.now(),
    );
    if (date == null) return;
    setState(() {
      _sleepDate = date;
      _dateController.text = _formatDate(_sleepDate);
    });
  }

  Future<void> _pickTime({required bool isStart}) async {
    final initial = isStart ? _startSleep : _endSleep;
    final time = await showTimePicker(context: context, initialTime: initial);
    if (time == null) return;

    setState(() {
      if (isStart) {
        _startSleep = time;
        _startController.text = _formatTime(_startSleep);
      } else {
        _endSleep = time;
        _endController.text = _formatTime(_endSleep);
      }
    });
  }

  void _setNow({required bool isStart}) {
    final now = TimeOfDay.fromDateTime(DateTime.now());
    setState(() {
      if (isStart) {
        _startSleep = now;
        _startController.text = _formatTime(_startSleep);
      } else {
        _endSleep = now;
        _endController.text = _formatTime(_endSleep);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final BiomarkerController biomarkerController = BiomarkerController();
    Future<void> _save() async {
      Map<String, dynamic> body = {
        "type": "blood_sugar",
        "data": {
          "from": int.parse(_startController.text),
          "to": int.parse(_endController.text),
        },
        "measured_at": _sleepDate.toIso8601String(),
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
                  'Add new sleep',
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    fontSize: 22,
                    fontWeight: FontWeight.w700,
                    color: const Color(0xFF3D3D3D),
                  ),
                ),
              ),
              const SizedBox(height: 40),
              TextField(
                controller: _dateController,
                readOnly: true,
                onTap: _pickDate,
                decoration: _inputDecoration(),
              ),
              const SizedBox(height: 28),
              _TimeFieldRow(
                label: 'Start sleep time',
                controller: _startController,
                onTap: () => _pickTime(isStart: true),
                onSetNow: () => _setNow(isStart: true),
              ),
              const SizedBox(height: 20),
              _TimeFieldRow(
                label: 'End sleep time',
                controller: _endController,
                onTap: () => _pickTime(isStart: false),
                onSetNow: () => _setNow(isStart: false),
              ),
              const SizedBox(height: 28),
              Row(
                children: [
                  const Expanded(
                    child: Text(
                      'It was a',
                      style: TextStyle(color: Color(0xFF6F6F6F), fontSize: 15),
                    ),
                  ),
                  Expanded(
                    child: Align(
                      alignment: Alignment.centerLeft,
                      child: _SleepTypeToggle(
                        isNap: _isNap,
                        onChanged: (value) {
                          setState(() {
                            _isNap = value;
                          });
                        },
                      ),
                    ),
                  ),
                ],
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

class _TimeFieldRow extends StatelessWidget {
  const _TimeFieldRow({
    required this.label,
    required this.controller,
    required this.onTap,
    required this.onSetNow,
  });

  final String label;
  final TextEditingController controller;
  final VoidCallback onTap;
  final VoidCallback onSetNow;

  @override
  Widget build(BuildContext context) {
    final labelStyle = Theme.of(
      context,
    ).textTheme.bodyMedium?.copyWith(color: const Color(0xFF6F6F6F));

    return Row(
      children: [
        Expanded(child: Text(label, style: labelStyle)),
        SizedBox(
          width: 180,
          child: Row(
            children: [
              Expanded(
                child: TextField(
                  controller: controller,
                  readOnly: true,
                  onTap: onTap,
                  textAlign: TextAlign.center,
                  decoration: InputDecoration(
                    filled: true,
                    fillColor: const Color(0xFFF7F7F7),
                    contentPadding: const EdgeInsets.symmetric(
                      horizontal: 12,
                      vertical: 12,
                    ),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                      borderSide: BorderSide.none,
                    ),
                  ),
                  inputFormatters: [
                    FilteringTextInputFormatter.deny(RegExp('.')),
                  ],
                ),
              ),
              const SizedBox(width: 8),
              TextButton(
                onPressed: onSetNow,
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
        ),
      ],
    );
  }
}

class _SleepTypeToggle extends StatelessWidget {
  const _SleepTypeToggle({required this.isNap, required this.onChanged});

  final bool isNap;
  final ValueChanged<bool> onChanged;

  @override
  Widget build(BuildContext context) {
    const selectedColor = Color(0xFF0A84FF);
    const unselectedTextColor = Color(0xFF9FA3AB);

    return Container(
      height: 38,
      width: 160,
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(19),
        border: Border.all(color: const Color(0xFFE1E6EF)),
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(19),
        child: Row(
          children: [
            Expanded(
              child: GestureDetector(
                onTap: () => onChanged(false),
                child: Container(
                  decoration: BoxDecoration(
                    color: isNap ? Colors.transparent : selectedColor,
                    borderRadius: const BorderRadius.horizontal(
                      left: Radius.circular(19),
                    ),
                  ),
                  alignment: Alignment.center,
                  child: Text(
                    'Sleep',
                    style: TextStyle(
                      color: isNap ? unselectedTextColor : Colors.white,
                      fontSize: 15,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
              ),
            ),
            Expanded(
              child: GestureDetector(
                onTap: () => onChanged(true),
                child: Container(
                  decoration: BoxDecoration(
                    color: isNap ? selectedColor : Colors.transparent,
                    borderRadius: const BorderRadius.horizontal(
                      right: Radius.circular(19),
                    ),
                  ),
                  alignment: Alignment.center,
                  child: Text(
                    'Nap',
                    style: TextStyle(
                      color: isNap ? Colors.white : unselectedTextColor,
                      fontSize: 15,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
