import 'dart:convert';

class User {
  final int id;
  final String? name;
  final String? email;
  final String token;

  User({required this.id, this.name, this.email, required this.token});

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'id': id,
      'name': name,
      'email': email,
      'token': token,
    };
  }

  String toJson() => json.encode(toMap());

  factory User.fromMap(Map<String, dynamic> map) {
    return User(
      id: map['id'] as int,
      name: map['name']?.toString() ?? "",
      email: map['email']?.toString() ?? "",
      token: map['token']?.toString() ?? "",
    );
  }

  factory User.fromJson(String source) =>
      User.fromMap(json.decode(source) as Map<String, dynamic>);
}
