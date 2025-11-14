import 'package:app_life_track/models/user.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class UserProvider extends StateNotifier<User?> {
  UserProvider() : super(User(id: 0, name: '', email: '', token: ''));

  User? get user => state;

  void setUser(String userJson) {
    state = User.fromJson(userJson);
  }

  void signOut() {
    state = null;
  }
}

final userProvider = StateNotifierProvider<UserProvider, User?>((ref) {
  return UserProvider();
});
