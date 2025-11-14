import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:app_life_track/services/manage_http_response.dart';
import 'package:http/http.dart' as http;
import 'package:app_life_track/global_variable.dart';
import 'package:shared_preferences/shared_preferences.dart';

class BiomarkerController {
  Future<void> save_biomarker({
    required Map<String, dynamic> body,
    required BuildContext context,
  }) async {
    final SharedPreferences preferences = await SharedPreferences.getInstance();
    String access_token = preferences.getString("access_token") ?? '';
    try {
      http.Response response = await http.post(
        Uri.parse("$uri/biomarker"),
        body: jsonEncode(body),
        headers: {
          'Content-Type': 'application/json',
          "Authorization": "Bearer $access_token",
        },
      );
      manageHttpResponse(
        response: response,
        context: context,
        onSuccess: () async {
          if (!context.mounted) return;
          showSnackBar(context, "Added successfully");
        },
      );
      print("response. ${response.body.toString()}");
    } catch (e) {
      if (!context.mounted) return;
      showSnackBar(context, '$e');
    } finally {
      Navigator.of(context).pop();
    }
  }
}
