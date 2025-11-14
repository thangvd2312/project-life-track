import 'dart:convert';
import 'package:app_life_track/views/screens/home/home_screen.dart';
import 'package:app_life_track/views/screens/main/main_screen.dart';
import 'package:flutter/material.dart';
import 'package:app_life_track/services/manage_http_response.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:http/http.dart' as http;
import 'package:app_life_track/global_variable.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:app_life_track/providers/user_provider.dart';

final providerContainer = ProviderContainer();

class AuthController {
  Future<void> loginWithKakao({
    required String accessToken,
    required BuildContext context,
  }) async {
    try {
      http.Response response = await http.post(
        Uri.parse("$uri/auth/kakao"),
        body: jsonEncode({'access_token': accessToken}),
        headers: {'Content-Type': 'application/json'},
      );

      if (!context.mounted) return;

      manageHttpResponse(
        response: response,
        context: context,
        onSuccess: () async {
          final SharedPreferences preferences =
              await SharedPreferences.getInstance();
          final Map<String, dynamic> decodedBody =
              jsonDecode(response.body) as Map<String, dynamic>;
          final String token = decodedBody['data']?['token']?.toString() ?? '';
          await preferences.setString('access_token', token);

          final Map<String, dynamic>? userMap =
              decodedBody['data']?['user'] as Map<String, dynamic>?;
          if (userMap != null) {
            final Map<String, dynamic> userData = {
              'id': userMap['id'],
              'name': userMap['name'],
              'email': userMap['email'],
              'token': token,
            };
            final String userJson = jsonEncode(userData);
            providerContainer.read(userProvider.notifier).setUser(userJson);
            await preferences.setString("user", userJson);
          }

          if (!context.mounted) return;

          Navigator.pushAndRemoveUntil(
            context,
            MaterialPageRoute(builder: (context) => const MainScreen()),
            (route) => false,
          );

          showSnackBar(context, 'Login Successful');
        },
      );
    } catch (e) {
      if (!context.mounted) return;
      showSnackBar(context, '$e');
    }
  }
}
